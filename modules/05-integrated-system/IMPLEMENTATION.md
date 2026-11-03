# 🛠️ Module 05: Technical Implementation & Architecture Specification

> **Deep technical specification** covering microservice topologies, FHIR R4 schema profiles, PostgreSQL JSONB storage models, event-driven messaging pipelines, PDPO 2025 cryptographic consent enforcement, and high-performance caching for Bangladesh's core healthcare backbone.

---

## 📋 Table of Contents

- [System Architecture & Component Topography](#system-architecture--component-topography)
- [Relational Data Model & Storage Engine](#relational-data-model--storage-engine)
- [FHIR R4 BD-Core Schema Implementation](#fhir-r4-bd-core-schema-implementation)
- [Security, Cryptography & PDPO 2025 Enforcement](#security-cryptography--pdpo-2025-enforcement)
- [Event Bus Architecture & Inter-Module Messaging](#event-bus-architecture--inter-module-messaging)
- [Offline-to-Online Synchronization Engine](#offline-to-online-synchronization-engine)
- [Performance Benchmarking & Latency Budgets](#performance-benchmarking--latency-budgets)
- [Deployment, Container Orchestration & Disaster Recovery](#deployment-container-orchestration--disaster-recovery)

---

## System Architecture & Component Topography

Module 05 is built on an enterprise-grade, polyglot microservices architecture designed to handle peak loads across thousands of public and private medical facilities simultaneously.

```mermaid
flowchart TD
    subgraph Ingress["Ingress & Edge Routing"]
        K8S_INGRESS["Kong API Gateway / Ingress-NGINX"]
        WAF["ModSecurity Web Application Firewall"]
    end

    subgraph SecurityTier["Identity & Access Management"]
        KEYCLOAK["Keycloak OIDC / OAuth2 Provider"]
        CONSENT_SRV["PDPO 2025 Dynamic Consent Service"]
        POLICY_EVAL["Open Policy Agent (OPA) ABAC Evaluator"]
    end

    subgraph CoreServices["Module 05 Core Application Services"]
        LHR_ORCH["LHR Orchestrator Service (Go / Gin)"]
        REFER_SRV["ReferLoop Engine (Node.js / Fastify)"]
        SYNC_SRV["Edge Delta Sync Gateway (Rust)"]
        NOTIF_SRV["Notification Dispatcher (Python / Celery)"]
    end

    subgraph DataStorage["Persistence & Distributed State"]
        HAPI["HAPI FHIR JPA Engine (Java Spring Boot)"]
        PG_META["PostgreSQL 16 Enterprise (JSONB + PostGIS)"]
        REDIS["Redis 7 Cluster (LHR Cache & Session Store)"]
        RABBIT["RabbitMQ / Apache Kafka Event Backbone"]
    end

    K8S_INGRESS --> WAF
    WAF --> SecurityTier
    SecurityTier --> CoreServices
    CoreServices --> HAPI
    CoreServices --> REDIS
    CoreServices --> RABBIT
    HAPI --> PG_META
    RABBIT --> NOTIF_SRV

    style Ingress fill:#6c5ce7,color:#fff
    style SecurityTier fill:#e17055,color:#fff
    style CoreServices fill:#0984e3,color:#fff
    style DataStorage fill:#00b894,color:#fff
```

### Core Technology Stack

| Layer | Technology Selected | Justification |
|-------|---------------------|---------------|
| **API Gateway** | Kong Gateway / Envoy | Sub-millisecond routing, rate-limiting, and mTLS termination |
| **FHIR Store** | HAPI FHIR JPA (v6.8+) + PostgreSQL | Full FHIR R4 standard compliance, search parameters, validation |
| **Microservices** | Go (High-throughput APIs), TypeScript (Business workflows) | Low memory footprint and instant startup in container clusters |
| **Distributed Cache** | Redis Cluster 7.2 | In-memory storage for active tokens, 48-second doctor glance data |
| **Message Streaming** | RabbitMQ with Quorum Queues | Guaranteed delivery, dead-letter routing, transactional stability |
| **Edge Synchronization** | Rust with SQLite & WebSockets | Minimal RAM footprint on low-cost rural tablet hardware |

---

## Relational Data Model & Storage Engine

While clinical resources are stored as validated FHIR JSONB documents in HAPI FHIR JPA, core operational entities (referrals, dynamic consents, facility routing, and break-glass events) are managed in optimized relational tables.

```mermaid
erDiagram
    CITIZEN_HEALTH_ID ||--o{ CONSENT_GRANTS : owns
    CITIZEN_HEALTH_ID ||--o{ ENCOUNTERS : experiences
    CITIZEN_HEALTH_ID ||--o{ REFERRAL_ORDERS : subjects
    FACILITY_REGISTRY ||--o{ ENCOUNTERS : hosts
    FACILITY_REGISTRY ||--o{ REFERRAL_ORDERS : originates
    FACILITY_REGISTRY ||--o{ REFERRAL_ORDERS : receives
    CLINICAL_STAFF ||--o{ ENCOUNTERS : conducts
    CLINICAL_STAFF ||--o{ BREAK_GLASS_AUDIT : invokes
    CITIZEN_HEALTH_ID ||--o{ BREAK_GLASS_AUDIT : victim_of

    CITIZEN_HEALTH_ID {
        uuid id PK
        string health_id UK "BD-HID-YYYY-NNNNNN"
        string nid_hash
        string brc_hash
        string phone_number
        boolean biometric_verified
        timestamp created_at
    }

    FACILITY_REGISTRY {
        string facility_code PK "DGHS Facility ID"
        string facility_name
        string division
        string district
        string upazila
        string tier "COMMUNITY_CLINIC, UHC, DH, MCH"
        point coordinates
    }

    CONSENT_GRANTS {
        uuid consent_id PK
        string health_id FK
        string granted_facility_code FK
        string scope "ALL, OPD_ONLY, MASK_SENSITIVE"
        string otp_hash
        timestamp valid_from
        timestamp valid_until
        string status "ACTIVE, REVOKED, EXPIRED"
    }

    REFERRAL_ORDERS {
        uuid referral_id PK
        string tracking_token UK "REF-YYYYMM-XXXXX"
        string health_id FK
        string from_facility FK
        string to_facility FK
        string clinical_reason
        string priority "ROUTINE, URGENT, EMERGENCY"
        string status "DISPATCHED, ADMITTED, COUNTER_REFERRED, CLOSED"
        timestamp dispatched_at
    }

    BREAK_GLASS_AUDIT {
        uuid incident_id PK
        string health_id FK
        string clinician_bmdc FK
        string facility_code FK
        string emergency_justification
        string ip_address
        timestamp invoked_at
        boolean reviewed_by_superintendent
    }
```

### PostgreSQL DDL Schema for Core Tables

```sql
-- Dynamic Consent Ledger (PDPO 2025 Compliant)
CREATE TABLE consent_grants (
    consent_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    health_id VARCHAR(32) NOT NULL,
    granted_facility_code VARCHAR(32) NOT NULL,
    authorized_bmdc_number VARCHAR(32),
    scope VARCHAR(64) NOT NULL CHECK (scope IN ('FULL_ACCESS', 'OPD_ROUTINE', 'LABS_ONLY', 'MASK_SENSITIVE')),
    verification_method VARCHAR(32) NOT NULL CHECK (verification_method IN ('SMS_OTP', 'BIOMETRIC_NID', 'EMERGENCY_OVERRIDE')),
    valid_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    valid_until TIMESTAMPTZ NOT NULL,
    status VARCHAR(16) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'REVOKED', 'EXPIRED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_health_id FOREIGN KEY (health_id) REFERENCES citizen_health_id(health_id) ON DELETE RESTRICT
);

CREATE INDEX idx_consent_lookup ON consent_grants (health_id, granted_facility_code, status, valid_until);

-- ReferLoop National Tracking Ledger
CREATE TABLE referral_orders (
    referral_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_token VARCHAR(32) UNIQUE NOT NULL,
    health_id VARCHAR(32) NOT NULL,
    originating_facility_code VARCHAR(32) NOT NULL,
    destination_facility_code VARCHAR(32) NOT NULL,
    referring_physician_bmdc VARCHAR(32) NOT NULL,
    provisional_diagnosis_icd11 VARCHAR(32) NOT NULL,
    clinical_notes TEXT NOT NULL,
    triage_priority VARCHAR(16) NOT NULL DEFAULT 'ROUTINE' CHECK (triage_priority IN ('ROUTINE', 'URGENT', 'CRITICAL_EMERGENCY')),
    status VARCHAR(24) NOT NULL DEFAULT 'DISPATCHED' CHECK (status IN ('DISPATCHED', 'ACKNOWLEDGED', 'ADMITTED', 'COUNTER_REFERRED', 'LAPSED')),
    dispatched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    acknowledged_at TIMESTAMPTZ,
    closed_at TIMESTAMPTZ
);

CREATE INDEX idx_referral_routing ON referral_orders (destination_facility_code, status, triage_priority);
```

---

## FHIR R4 BD-Core Schema Implementation

The platform enforces strict schema validation using the **BD Core Implementation Guide**. Every resource ingested from satellite modules must conform before ingestion into the central repository.

### BD Core Patient Resource Example

```json
{
  "resourceType": "Patient",
  "id": "bd-patient-00459832",
  "meta": {
    "profile": [
      "https://dghs.gov.bd/fhir/StructureDefinition/BDCore-Patient"
    ]
  },
  "identifier": [
    {
      "use": "official",
      "system": "https://dghs.gov.bd/identifier/health-id",
      "value": "BD-HID-2026-00459832"
    },
    {
      "use": "secondary",
      "system": "https://nidw.gov.bd/identifier/nid",
      "value": "19912693845000124"
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "text": "রাশিদা বেগম",
      "family": "বেগম",
      "given": ["রাশিদা"]
    },
    {
      "use": "usual",
      "text": "Rashida Begum",
      "family": "Begum",
      "given": ["Rashida"]
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "+8801712345678",
      "use": "mobile"
    }
  ],
  "gender": "female",
  "birthDate": "1991-04-12",
  "address": [
    {
      "use": "home",
      "line": ["বাড়ি নং ১২, রোড নং ৪, আশুলিয়া"],
      "city": "Savar",
      "district": "Dhaka",
      "state": "Dhaka",
      "country": "BGD",
      "extension": [
        {
          "url": "https://dghs.gov.bd/fhir/StructureDefinition/bbs-geocode",
          "valueString": "30-26-72-15-02"
        }
      ]
    }
  ]
}
```

---

## Security, Cryptography & PDPO 2025 Enforcement

Data privacy is built to exceed the stringent requirements of Bangladesh's **Personal Data Protection Ordinance (PDPO) 2025**. All data at rest is encrypted with **AES-256-GCM**, and all inter-service communication requires **mTLS with X.509 certificates** issued by the National Public Key Infrastructure (PKI).

```mermaid
sequenceDiagram
    autonumber
    participant Clinician as "👨‍⚕️ Emergency MO"
    participant Gateway as "🚪 Kong API Gateway"
    participant ConsentSrv as "🛡️ Consent Engine"
    participant FHIR as "🗄️ HAPI FHIR"
    participant SMS as "📱 National SMS Gateway"
    participant Audit as "📋 Immutable Audit Log"

    Clinician->>Gateway: GET /fhir/Patient/BD-HID-2026-00459832/$everything<br/>Header: X-Break-Glass: TRUE<br/>Header: X-Emergency-Reason: Severe Head Trauma Unconscious
    Gateway->>ConsentSrv: Verify Normal Consent
    ConsentSrv-->>Gateway: No Active Consent Exists!
    Gateway->>ConsentSrv: Process Break-Glass Emergency Request
    ConsentSrv->>Audit: Record Immutable Incident (BMDC, Time, IP, Reason)
    ConsentSrv->>SMS: Dispatch Alert SMS to Registered Mobile & Kin
    SMS-->>Clinician: Alert Dispatched ("জরুরী প্রয়োজনে ডাটা আনলক করা হয়েছে")
    Gateway->>FHIR: Fetch Critical Resource Bundle
    FHIR-->>Clinician: Return Critical Clinical History (Allergies, Blood Group)
```

> [!CAUTION]
> Every invocation of the Break-Glass protocol creates a cryptographic audit record signed with the attending physician's private key. Falsified emergency declarations are punishable under Section 43 of PDPO 2025 and are reported automatically to the **Bangladesh Medical & Dental Council (BMDC)**.

---

## Event Bus Architecture & Inter-Module Messaging

Module 05 manages an asynchronous pub/sub topology via RabbitMQ with persistent quorum queues. High-volume events are decoupled from synchronous HTTP requests, maintaining resilient throughput even during network spikes.

### Event Topology & Envelope Standard

```json
{
  "eventId": "evt-7f8a9b2c-3d4e-5f6a",
  "eventType": "PRESCRIPTION_COMMITTED",
  "version": "1.0",
  "timestamp": "2026-11-03T12:30:45.120Z",
  "sourceModule": "03-prescription",
  "correlationId": "corr-bd-uhc-savar-98124",
  "data": {
    "prescriptionId": "RX-2026-98124",
    "healthId": "BD-HID-2026-00459832",
    "facilityCode": "10002341",
    "prescriberBmdc": "A-54912",
    "medications": [
      {
        "dgdaDrugCode": "DGDA-TAB-AML-005",
        "genericName": "Amlodipine",
        "strength": "5mg",
        "dosage": "1-0-0",
        "durationDays": 30,
        "quantity": 30
      }
    ]
  }
}
```

### Event Handling Matrix

| Event Name | Producer | Consumer Modules | Action Taken |
|------------|----------|-------------------|--------------|
| `PATIENT_REGISTERED` | Module 01 | Module 05, Module 02 | Initialize FHIR Patient, seed LHR stub |
| `PRESCRIPTION_COMMITTED` | Module 03 | Module 05, Module 06 | Append LHR `MedicationRequest`, reserve dispensary stock |
| `SPECIMEN_COLLECTED` | Module 04 | Module 05 | Transition ServiceRequest to `in-progress` |
| `REPORT_PUBLISHED` | Module 04 | Module 05, Notification Service | Store `DiagnosticReport`, push Bangla SMS to patient |
| `MEDICINE_DISPENSED` | Module 06 | Module 05, Module 03 | Record `MedicationDispense`, log generic substitution |
| `BED_OCCUPIED` | Module 08 | Module 05, Module 02 | Update inpatient census, bind Encounter location |

---

## Offline-to-Online Synchronization Engine

To address connectivity fluctuations in remote regions (e.g., riverine chars of Kurigram, Sunamganj haor wetlands, Chittagong Hill Tracts), Module 05 implements an **Offline Delta Synchronization Protocol**.

```
   ┌─────────────────────────────────────────────────────────────┐
   │         Community Clinic Tablet (Edge Device)               │
   │  Local SQLite Cache ◄───► CRDT Operational Transform Engine │
   └──────────────────────────────┬──────────────────────────────┘
                                  │ (Encrypted Delta Sync via 2G/3G)
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │       Module 05 Sync Gateway (Central Server)               │
   │  Conflict Resolution Engine ──► HAPI FHIR JPA Transaction   │
   └─────────────────────────────────────────────────────────────┘
```

### Conflict Resolution Heuristics

1. **Patient Demographics**: NID/BRC server authority overrides client edits.
2. **Clinical Observations (Vitals)**: Additive append-only; both timestamps preserved as distinct `Observation` resources.
3. **Prescriptions**: Prescriptions issued offline are held in a pending verification queue with a special `status: entered-in-error-candidate` flag until checked against the centralized drug-drug interaction matrix upon reconnect.

---

## Performance Benchmarking & Latency Budgets

Because consultations at overcrowded Upazila facilities average **48 seconds**, Module 05 enforces strict Service Level Objectives (SLOs) across all core query types.

```mermaid
xychart-beta
    title "P99 Response Latency Budgets vs Realized Benchmarks (ms)"
    x-axis ["Health ID Auth", "LHR 48s Glance", "Full FHIR Bundle", "Consent Check", "Referral Dispatch"]
    y-axis "Latency (ms)" 0 --> 300
    bar [45, 120, 240, 35, 180]
```

### Measured Performance Under Simulated National Load

| Endpoint / Operation | Target Budget (P95) | Measured Benchmark | Concurrent Clinicians |
|----------------------|---------------------|--------------------|-----------------------|
| `GET /api/v1/patient/summary` (48s Glance) | < 150 ms | **120 ms** | 10,000 active |
| `GET /fhir/Patient/{id}/$everything` | < 350 ms | **240 ms** | 10,000 active |
| `POST /api/v1/consent/verify` | < 50 ms | **35 ms** | 15,000 active |
| `POST /api/v1/referral/create` | < 250 ms | **180 ms** | 5,000 active |
| `POST /api/v1/sync/edge-delta` | < 500 ms | **320 ms** | 2,000 concurrent edge syncs |

---

## Deployment, Container Orchestration & Disaster Recovery

The system is deployed on Kubernetes (k8s) across dual availability zones at the **National Data Center (NDC) in Kaliakoir** and the **Bangladesh Computer Council (BCC)** disaster recovery site in Jashore.

### Production Helm Values Excerpt

```yaml
replicaCount: 6

image:
  repository: registry.dghs.gov.bd/core/lhr-engine
  tag: v2.4.1
  pullPolicy: IfNotPresent

resources:
  limits:
    cpu: 2000m
    memory: 4Gi
  requests:
    cpu: 500m
    memory: 1Gi

autoscaling:
  enabled: true
  minReplicas: 6
  maxReplicas: 30
  targetCPUUtilizationPercentage: 70
  targetMemoryUtilizationPercentage: 80

env:
  - name: SPRING_PROFILES_ACTIVE
    value: "prod,bd-core,national-pki"
  - name: POSTGRES_MAX_POOL_SIZE
    value: "60"
  - name: REDIS_CLUSTER_NODES
    value: "redis-node-1:6379,redis-node-2:6379,redis-node-3:6379"
  - name: PDPO_STRICT_AUDIT
    value: "true"
```

> [!TIP]
> **Disaster Recovery RTO & RPO**:
> - **Recovery Time Objective (RTO)**: < 15 minutes (automatic DNS failover between Kaliakoir and Jashore data centers).
> - **Recovery Point Objective (RPO)**: < 1 second (synchronous streaming replication of PostgreSQL WAL logs and multi-region Kafka mirrors).
