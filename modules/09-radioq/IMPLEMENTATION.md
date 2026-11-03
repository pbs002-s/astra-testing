# 🛠️ Technical Implementation Blueprint — Module 09 (RadioQ)

## National Radiotherapy Waiting List, Slot Allocator & Dynamic Replan Engine

---

## 1. System Architecture

```mermaid
flowchart TD
    subgraph Client["📱 Frontend Portals"]
        ONC["Oncologist Clinic Portal<br/>(React 19 / Vite)"]
        ADMIN["Hospital Machine Console<br/>(Capacity & Up/Down Panel)"]
        PUBLIC["Patient Tracking View<br/>(PWA / Position Lookup)"]
    end

    subgraph API["⚙️ Application Layer"]
        GATEWAY["FastAPI Gateway / REST API"]
        SCHEDULER["Published-Rule Ranking Engine"]
        REPLAN["One-Tap Replan Event Processor"]
        AUDIT["WORM Compliance Logger"]
    end

    subgraph Data["💾 Persistence & State"]
        PG[("PostgreSQL 16 + PostGIS")]
        REDIS[("Redis 7.2 (Slot Locks & Queue Cache)")]
        FHIR[("BD Core FHIR R4 Sandbox<br/>sandbox.fhir.dghs.gov.bd")]
    end

    Client --> GATEWAY
    GATEWAY --> SCHEDULER
    GATEWAY --> REPLAN
    SCHEDULER --> PG
    SCHEDULER --> REDIS
    GATEWAY --> FHIR
    REPLAN --> AUDIT
```

---

## 2. HL7 FHIR R4 Profile Mapping

RadioQ adheres directly to the Bangladesh Core Implementation Guide (v0.4.6) where profiles exist, falling back to HL7 FHIR R4 standard structures for specialized oncology radiation orders:

| Domain Entity | FHIR R4 Resource | BD Core Profile | Key Extension Fields |
|---|---|---|---|
| **Cancer Patient** | `Patient` | `BDCore-Patient` | Identifier (9-series Health ID, NID, BRN) |
| **Radiation Order** | `ServiceRequest` | Base R4 / Oncology Extension | `code` (SNOMED-CT 33195004 Radiation therapy), `priority` (stat/urgent/routine), `intent` |
| **Cancer Stage** | `Condition` | `BDCore-Condition` | `stage` (TNM 8th Ed), `bodySite` (ICD-O-3 topology) |
| **Radiotherapy Machine** | `Device` / `Location` | Base R4 | Linear Accelerator (LINAC) / Cobalt-60 unit |
| **Treatment Slot** | `Slot` / `Schedule` | Base R4 | `start`, `end`, `status` (free/busy), machine capacity |
| **Patient Notification** | `Communication` | Base R4 | Bangla SMS notification payload |

---

## 3. Published-Rule Ranking Algorithm

To eliminate corruption, favoritism, and middleman bypass (addressing the cautionary lessons of Brazil's SISREG where 54% of patients bypassed the system), RadioQ calculates an objective **Clinical Priority Score (CPS)**:

$$\text{Composite Score} = (W_{\text{clin}} \times S_{\text{clin}}) + (W_{\text{wait}} \times \ln(\text{Days} + 1)) - (W_{\text{dist}} \times D_{\text{km}})$$

```mermaid
flowchart TD
    START["New Decision-to-Treat Logged"] --> C1{"Clinical Urgency Tier"}
    C1 -->|"Tier 1 (STAT - Cord Compression, Bleeding)"| T1["Weight = 100 • Window: < 24 Hours"]
    C1 -->|"Tier 2 (Radical Curative - Rapid Proliferation)"| T2["Weight = 75 • Window: < 14 Days"]
    C1 -->|"Tier 3 (Adjuvant Post-Surgical)"| T3["Weight = 50 • Window: < 30 Days"]
    C1 -->|"Tier 4 (Palliative Non-Emergent)"| T4["Weight = 25 • Window: < 45 Days"]
    
    T1 & T2 & T3 & T4 --> CALC["Add Wait-Time Factor (Logarithmic)"]
    CALC --> GEOMAP["Calculate Nearest Center with Operational LINAC"]
    GEOMAP --> QUEUE["Rank in National Unified List"]
```

---

## 4. Database Schema (PostgreSQL DDL)

```mermaid
erDiagram
    HOSPITAL_CENTERS ||--o{ RADIOTHERAPY_MACHINES : houses
    RADIOTHERAPY_MACHINES ||--o{ CAPACITY_SLOTS : schedules
    PATIENT_RECORDS ||--o{ RADIATION_REQUESTS : orders
    RADIATION_REQUESTS ||--o{ ALLOCATION_RECORDS : assigns
    RADIATION_REQUESTS ||--o{ REPLAN_LOGS : impacts

    HOSPITAL_CENTERS {
        uuid id PK
        string facility_code UK
        string facility_name
        string division
        string district
        point location_lat_long
        boolean is_government
    }

    RADIOTHERAPY_MACHINES {
        uuid id PK
        uuid hospital_id FK
        string machine_model
        string serial_number
        string operational_status
        int daily_slot_capacity
        timestamp last_maintenance_date
    }

    RADIATION_REQUESTS {
        uuid id PK
        string health_id FK
        string cancer_site_code
        string clinical_urgency_tier
        int raw_clinical_score
        timestamp decision_to_treat_date
        string allocation_status
    }

    ALLOCATION_RECORDS {
        uuid id PK
        uuid request_id FK
        uuid machine_id FK
        timestamp scheduled_fraction_date
        int slot_number
        boolean is_completed
    }
```

---

## 5. REST API Specifications

### 5.1 Enqueue Radiotherapy Request
- **Endpoint**: `POST /api/v1/radioq/requests`
- **Headers**: `Authorization: Bearer <JWT>`, `Content-Type: application/json`
- **Request Payload**:
```json
{
  "health_id": "9081245671",
  "patient_name": "Begum Rokeya",
  "bmdc_license": "A-49210",
  "cancer_site": "C50.9 (Malignant neoplasm of breast, unspecified)",
  "clinical_urgency": "CURATIVE_RADICAL",
  "intended_fractions": 25,
  "preferred_division": "Dhaka",
  "decision_to_treat_date": "2026-11-03T10:00:00Z"
}
```
- **Response** (`201 Created`):
```json
{
  "request_id": "req-98234-bd",
  "queue_position": 142,
  "estimated_treatment_start": "2026-11-17",
  "allocated_facility": "NICRH - Machine 02",
  "status": "QUEUED"
}
```

### 5.2 One-Tap Machine Breakdown Event
- **Endpoint**: `POST /api/v1/radioq/machines/{machine_id}/fault`
- **Request Payload**:
```json
{
  "machine_id": "nicrh-linac-03",
  "status": "FAULT_OFFLINE",
  "fault_code": "VACUUM_CHAMBER_LEAK",
  "estimated_downtime_days": 14,
  "reported_by_engineer_id": "ENG-712"
}
```
- **Action**: Triggers background dynamic queue re-plan across 17 national LINACs and private partners within 5 seconds.

---

## 6. Pilot Rollout & 2027 LINAC Allocation

1. **Phase 1 (Months 1–3)**: Apex center pilot at NICRH (Mohakhali, Dhaka) + BSMMU Oncology Department.
2. **Phase 2 (Months 4–6)**: Integrate major divisional medical college oncology departments (DMCH, CMCH, RMCH, SOMCH).
3. **Phase 3 (Target June 2027)**: National onboarding of the **17 newly procured LINAC accelerators** across 6 Dhaka centers and 11 district hospitals.

