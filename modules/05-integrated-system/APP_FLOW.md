# 🔄 Module 05: Application Flows — Integrated Digital Healthcare System

> **Complete system-wide flows** showing how all 8 modules work together as one connected healthcare ecosystem.

---

## 📋 Table of Contents

- [Complete Patient Journey (End-to-End)](#complete-patient-journey-end-to-end)
- [Data Flow Architecture](#data-flow-architecture)
- [Referral Flow (ReferLoop)](#referral-flow-referloop)
- [Emergency Flow](#emergency-flow)
- [FHIR Resource Flow](#fhir-resource-flow)
- [Consent & Privacy Flow](#consent--privacy-flow)
- [Offline-to-Online Sync Flow](#offline-to-online-sync-flow)
- [Inter-Facility Data Sharing](#inter-facility-data-sharing)
- [Notification Orchestration Flow](#notification-orchestration-flow)
- [Analytics & Reporting Flow](#analytics--reporting-flow)

---

## Complete Patient Journey (End-to-End)

This is the **gold standard flow** — a single patient visit from arrival to follow-up, touching every module in the system.

### Scenario: Rashida Begum visits Upazila Health Complex, Savar

Rashida (Health ID: `BD-HID-2026-00459832`) has been experiencing persistent headaches and dizziness for 2 weeks. She was screened at her Community Clinic in Ashulia, where the CHCP measured high blood pressure (160/100 mmHg) and referred her to the UHC.

```mermaid
sequenceDiagram
    participant P as "👩 Rashida (Patient)"
    participant K as "🏪 Kiosk/Reception"
    participant M1 as "📝 Mod 01: Health ID"
    participant M2 as "📅 Mod 02: Appointments"
    participant D as "👨‍⚕️ Doctor"
    participant M3 as "💊 Mod 03: Prescription"
    participant M4 as "🧪 Mod 04: Lab"
    participant M6 as "💉 Mod 06: Medicine"
    participant M8 as "🛏️ Mod 08: Beds"
    participant CORE as "🏗️ Mod 05: Core FHIR"

    Note over P,CORE: Phase 1 — Arrival & Registration
    P->>K: Scans Health Card (NFC/QR)
    K->>M1: Verify Health ID
    M1->>CORE: Fetch Patient Resource
    CORE-->>M1: Patient demographics + history
    M1-->>K: Identity confirmed ✅
    K->>M2: Request appointment (Medicine dept)
    M2->>CORE: Check doctor availability
    CORE-->>M2: Dr. Karim available, Token #23
    M2-->>P: "আপনার টোকেন নম্বর ২৩, আনুমানিক সময় ৪৫ মিনিট"

    Note over P,CORE: Phase 2 — Consultation
    P->>D: Enters consultation room
    D->>CORE: Pull Rashida's full record
    CORE-->>D: Past visits, CHCP screening, BP readings, allergies
    D->>D: Reviews CHCP referral note (BP 160/100)
    D->>M3: Creates prescription (Amlodipine 5mg + Losartan 50mg)
    M3->>CORE: Store MedicationRequest resources
    D->>M4: Orders lab tests (CBC, Creatinine, Lipid Profile)
    M4->>CORE: Store ServiceRequest resources

    Note over P,CORE: Phase 3 — Lab & Diagnostics
    P->>M4: Goes to lab, scans Health Card
    M4->>CORE: Fetch pending test orders
    CORE-->>M4: 3 tests ordered by Dr. Karim
    M4->>M4: Collects samples, runs tests
    M4->>CORE: Store DiagnosticReport + Observation resources
    M4-->>P: "রিপোর্ট ২ ঘণ্টার মধ্যে আপনার ফোনে পাঠানো হবে"

    Note over P,CORE: Phase 4 — Medicine Collection
    P->>M6: Goes to pharmacy counter
    M6->>CORE: Fetch prescription
    CORE-->>M6: 2 medicines prescribed
    M6->>M6: Check stock: Amlodipine ✅ Losartan ❌
    M6-->>P: "Losartan নেই, নিকটতম ফার্মেসি: সাভার ঔষধালয় (০.৫ কিমি)"
    M6->>CORE: Record partial dispensing

    Note over P,CORE: Phase 5 — Follow-up Scheduling
    D->>M2: Schedule follow-up in 2 weeks
    M2->>CORE: Create future Appointment resource
    M2-->>P: SMS: "পরবর্তী সাক্ষাৎ: ১৭ নভেম্বর, সকাল ১০টা"
```

> [!NOTE]
> **Total FHIR resources created in this single visit**: Patient (updated), Encounter, Condition, 2x MedicationRequest, 3x ServiceRequest, 3x Observation, 1x DiagnosticReport, 1x MedicationDispense, 1x Appointment. All linked by Rashida's Health ID.

### Step-by-Step Breakdown

| Step | Module | FHIR Resource | Action |
|------|--------|---------------|--------|
| 1. Arrival | 01 - Health ID | Patient | Identity verification |
| 2. Token | 02 - Appointment | Appointment | Queue position assigned |
| 3. History Pull | 05 - Core | Bundle | Aggregate patient record |
| 4. Consultation | 05 - Core | Encounter | Visit record created |
| 5. Diagnosis | 05 - Core | Condition | ICD-11 coded condition |
| 6. Prescription | 03 - Prescription | MedicationRequest | 2 medicines prescribed |
| 7. Lab Order | 04 - Lab | ServiceRequest | 3 tests ordered |
| 8. Sample Collection | 04 - Lab | Specimen | Samples collected |
| 9. Results | 04 - Lab | DiagnosticReport | Results with LOINC codes |
| 10. Dispensing | 06 - Medicine | MedicationDispense | Partial dispensing |
| 11. Stock Alert | 06 - Medicine | SupplyDelivery | Low stock flagged |
| 12. Follow-up | 02 - Appointment | Appointment | Future visit scheduled |

---

## Data Flow Architecture

### How Data Moves Between All 8 Modules Through the FHIR Backbone

```mermaid
flowchart TD
    subgraph UserLayer["🖥️ User-Facing Applications"]
        PA["Patient App (PWA)"]
        DA["Doctor Dashboard"]
        NA["Nurse Station"]
        CA["CHCP App"]
        LA["Lab Portal"]
        PHA["Pharmacy Portal"]
        AA["Admin Dashboard"]
    end

    subgraph APILayer["🔌 API Gateway Layer"]
        AG["API Gateway\n(Rate Limiting, Auth, Versioning)"]
        AUTH["Auth Service\n(Health ID + OTP/PIN)"]
    end

    subgraph CoreLayer["🏗️ Module 05 — Core Platform"]
        FHIR["FHIR R4 Server\n(HAPI FHIR / BD Sandbox)"]
        CONSENT["Consent Manager\n(PDPO 2025)"]
        AUDIT["Audit Trail\n(Immutable Log)"]
        NOTIFY["Notification Engine\n(SMS/Push/In-App)"]
        SYNC["Offline Sync Engine\n(Conflict Resolution)"]
        ANALYTICS["Analytics Engine\n(Real-time + Batch)"]
    end

    subgraph ModuleLayer["📦 Module Services"]
        M01["Mod 01: Health ID\nPatient Registry"]
        M02["Mod 02: Appointments\nScheduling Engine"]
        M03["Mod 03: Prescriptions\nMedication Manager"]
        M04["Mod 04: Lab\nDiagnostics Engine"]
        M06["Mod 06: Medicine\nStock Tracker"]
        M07["Mod 07: Blood Bank\nInventory Manager"]
        M08["Mod 08: Beds\nCapacity Manager"]
    end

    subgraph DataLayer["💾 Data Layer"]
        PG["PostgreSQL\n(Primary Database)"]
        SQLITE["SQLite\n(Offline Local DB)"]
        REDIS["Redis\n(Cache + Queue)"]
        S3["Object Storage\n(Documents, Images)"]
    end

    subgraph ExternalLayer["🌐 External Systems"]
        DHIS2["DHIS2\n(National Reporting)"]
        ELMIS["eLMIS\n(Supply Chain)"]
        DGDA["DGDA\n(Drug Registry)"]
        NID["NID/Birth Reg\n(Identity Verification)"]
    end

    PA & DA & NA & CA & LA & PHA & AA --> AG
    AG --> AUTH
    AUTH --> FHIR
    FHIR --> CONSENT
    FHIR --> AUDIT
    FHIR --> NOTIFY
    FHIR --> SYNC
    FHIR <--> M01 & M02 & M03 & M04 & M06 & M07 & M08
    FHIR --> ANALYTICS
    FHIR --> PG
    SYNC --> SQLITE
    NOTIFY --> REDIS
    ANALYTICS --> DHIS2
    M06 --> ELMIS
    M03 --> DGDA
    M01 --> NID

    style FHIR fill:#0984e3,color:#fff,stroke-width:3px
    style CoreLayer fill:#dfe6e9,stroke:#0984e3
```

### Data Flow Rules

> [!IMPORTANT]
> **Every data access must pass through three gates:**
> 1. **Authentication** — Is this user who they claim to be? (Health ID + PIN/OTP)
> 2. **Consent** — Has the patient authorized this access? (PDPO 2025 consent record)
> 3. **Audit** — Is this access logged immutably? (Audit trail entry created)

### Data Exchange Protocol

| Source Module | Target Module | Data Type | Protocol | Frequency |
|---------------|---------------|-----------|----------|-----------|
| 01 → Core | Patient demographics | FHIR Patient | On registration |
| 02 → Core | Appointment data | FHIR Appointment | On booking |
| Core → 03 | Patient allergies | FHIR AllergyIntolerance | On prescription start |
| 03 → Core | Medication orders | FHIR MedicationRequest | On prescribing |
| 03 → 06 | Prescription data | FHIR MedicationRequest | On prescribing |
| 04 → Core | Lab results | FHIR DiagnosticReport | On result entry |
| 06 → Core | Dispensing records | FHIR MedicationDispense | On dispensing |
| 07 → Core | Transfusion data | FHIR Procedure | On transfusion |
| 08 → Core | Bed assignments | FHIR Encounter | On admission |
| Core → DHIS2 | Aggregate reports | ADX/CSV | Daily batch |

---

## Referral Flow (ReferLoop)

### The Problem Today

Currently, **59% of patients self-refer** to tertiary hospitals, bypassing the referral chain entirely. This causes:
- Tertiary hospitals at **200%+ occupancy**
- Primary and secondary facilities **underutilized**
- Patients traveling **100+ km unnecessarily**
- Specialists overwhelmed with cases that could be handled locally

### The ReferLoop Solution

```mermaid
stateDiagram-v2
    [*] --> PatientVisit: Patient visits Community Clinic
    PatientVisit --> CHCPScreening: CHCP performs screening
    CHCPScreening --> ResolvedLocally: Condition manageable locally
    CHCPScreening --> ReferralCreated: Needs higher care
    
    ResolvedLocally --> FollowUp: Schedule follow-up
    FollowUp --> [*]
    
    ReferralCreated --> ReferralSent: Structured referral to UHC
    ReferralSent --> SpecialistInbox: Appears in specialist queue
    
    SpecialistInbox --> Accepted: Specialist accepts referral
    SpecialistInbox --> Advised: Specialist advises remotely
    SpecialistInbox --> Rejected: Referral not appropriate
    
    Accepted --> PatientNotified: SMS sent to patient
    PatientNotified --> SpecialistVisit: Patient visits specialist
    SpecialistVisit --> Treatment: Treatment at UHC/DH
    Treatment --> BackReferral: Back-referral to CC
    BackReferral --> ContinuityCare: CHCP continues care
    ContinuityCare --> [*]: Loop closed ✅
    
    Advised --> RemoteGuidance: CHCP follows advice
    RemoteGuidance --> ResolvedLocally
    
    Rejected --> AlternativeAction: Different referral or local care
    AlternativeAction --> CHCPScreening
```

### Detailed Referral Sequence

```mermaid
sequenceDiagram
    participant CHCP as "👩‍⚕️ CHCP (Community Clinic)"
    participant CORE as "🏗️ Core Platform"
    participant SPEC as "👨‍⚕️ Specialist (UHC)"
    participant PAT as "👩 Patient"
    participant SMS as "📱 SMS Gateway"

    CHCP->>CORE: Create ReferralRequest (ServiceRequest)
    Note over CHCP,CORE: Includes: reason, urgency, screening data,<br/>vitals, suspected diagnosis
    CORE->>CORE: Validate referral (checklist complete?)
    CORE->>SPEC: Push to specialist inbox
    CORE->>PAT: "রেফারেল তৈরি হয়েছে। বিশেষজ্ঞ শীঘ্রই জানাবেন।"
    
    alt Specialist Accepts
        SPEC->>CORE: Accept referral + set appointment
        CORE->>SMS: Send appointment details
        SMS->>PAT: "আপনার অ্যাপয়েন্টমেন্ট: সাভার UHC, ডাঃ করিম, ১৫ নভেম্বর সকাল ৯টা"
        PAT->>SPEC: Visits specialist (full history available)
        SPEC->>CORE: Treatment + back-referral note
        CORE->>CHCP: Back-referral received
        CHCP->>CORE: Acknowledge + continue care plan
    else Specialist Advises Remotely
        SPEC->>CORE: Remote advice to CHCP
        CORE->>CHCP: "বিশেষজ্ঞ পরামর্শ: Amlodipine 5mg শুরু করুন, ২ সপ্তাহ পর BP চেক"
        CHCP->>CORE: Follow advice, update record
    else Specialist Rejects
        SPEC->>CORE: Rejection + reason + alternative suggestion
        CORE->>CHCP: "রেফারেল প্রত্যাখ্যাত। কারণ: স্থানীয়ভাবে চিকিৎসাযোগ্য।"
    end
```

### Referral Metrics Dashboard

| Metric | Current | With ReferLoop (Y1) | Target (Y3) |
|--------|---------|---------------------|-------------|
| Self-referral rate | 59% | 40% | <20% |
| Referral acceptance rate | N/A | 75% | 85% |
| Back-referral completion | N/A | 50% | 80% |
| Average referral response time | N/A | <24 hours | <4 hours |
| Referral data completeness | N/A | 70% | 95% |

---

## Emergency Flow

### Critical Scenario: Road Traffic Accident, Manikganj Highway

```mermaid
sequenceDiagram
    participant EMT as "🚑 Ambulance/EMT"
    participant M08 as "🛏️ Mod 08: Bed Mgmt"
    participant M07 as "🩸 Mod 07: Blood Bank"
    participant CORE as "🏗️ Core Platform"
    participant ER as "🏥 ER Doctor"
    participant M04 as "🧪 Mod 04: Lab"
    participant M03 as "💊 Mod 03: Prescription"

    Note over EMT,M03: ⚠️ Emergency — Break-Glass Protocol Activated
    
    EMT->>CORE: Emergency scan of patient Health Card
    CORE->>CORE: Break-glass access granted (no consent needed)
    CORE-->>EMT: Patient: Kamal Hossain, Age 42<br/>Blood: B+, Allergies: Penicillin<br/>Conditions: Diabetes Type 2
    
    EMT->>M08: Search ICU beds within 20km
    M08->>CORE: Query available ICU beds
    CORE-->>M08: Manikganj DH: 1 ICU bed, Savar UHC: 0, DMC: 3 ICU beds
    M08-->>EMT: "মানিকগঞ্জ জেলা হাসপাতালে ১টি ICU বেড আছে (৮ কিমি)"
    
    EMT->>M08: Reserve ICU bed at Manikganj DH
    M08->>CORE: Update bed status: Reserved for Kamal
    
    EMT->>M07: Check B+ blood availability
    M07->>CORE: Query blood inventory
    CORE-->>M07: Manikganj DH: 2 units B+, 4 units O-
    M07-->>EMT: "B+ রক্ত আছে: ২ ইউনিট"
    
    Note over EMT,M03: Patient arrives at Manikganj DH ER
    
    ER->>CORE: Access full patient history (emergency)
    CORE-->>ER: Diabetes history, current medications (Metformin),<br/>last lab results, allergies
    ER->>M04: Emergency labs (CBC, Cross-match, Glucose)
    M04->>CORE: Priority lab order created
    ER->>M03: Emergency medications (avoid Penicillin!)
    M03->>CORE: Check drug interactions with Metformin
    CORE-->>M03: ⚠️ Alert: Contrast dye interaction with Metformin
    M03-->>ER: "সতর্কতা: Metformin সাথে কনট্রাস্ট ডাই interaction আছে"
    
    CORE->>CORE: Audit log: Break-glass access by EMT ID #4521<br/>Reason: RTA Emergency, Time: 14:32 BDT
```

> [!CAUTION]
> **Break-Glass Protocol**: In emergencies, the system bypasses patient consent requirements to save lives. However, ALL access is logged, the patient is notified afterward, and the audit trail is reviewed by a compliance officer within 72 hours. This complies with PDPO 2025 Section 27 (vital interest exception).

### Emergency Flow State Diagram

```mermaid
stateDiagram-v2
    [*] --> EmergencyDetected: 999 call / accident
    EmergencyDetected --> PatientIdentified: Health Card scanned
    EmergencyDetected --> UnknownPatient: No Health Card
    
    PatientIdentified --> BreakGlass: Emergency access granted
    UnknownPatient --> TemporaryRecord: Create temporary record
    
    BreakGlass --> HistoryAvailable: Full record loaded
    TemporaryRecord --> BasicTriage: Manual data entry
    
    HistoryAvailable --> BedSearch: Search nearest ICU/bed
    BasicTriage --> BedSearch
    
    BedSearch --> BedReserved: Bed found & reserved
    BedSearch --> Diversion: No beds → route to next facility
    
    BedReserved --> BloodCheck: Check blood availability
    BloodCheck --> BloodAvailable: Blood ready
    BloodCheck --> BloodRequest: Request from blood bank network
    
    BloodAvailable --> Admission: Patient admitted
    BloodRequest --> Admission
    Diversion --> BedSearch: Search next facility
    
    Admission --> Treatment: Active treatment
    Treatment --> Monitoring: Stable → ward transfer
    Monitoring --> Discharge: Recovery
    Discharge --> FollowUp: Follow-up scheduled
    FollowUp --> [*]
    
    Treatment --> Critical: Condition worsens
    Critical --> Transfer: Transfer to tertiary
    Transfer --> BedSearch
```

---

## FHIR Resource Flow

### Which FHIR Resources Are Created at Each Step

```mermaid
flowchart LR
    subgraph Registration["Step 1: Registration"]
        R1["Patient"]
        R2["RelatedPerson"]
    end
    
    subgraph Appointment["Step 2: Booking"]
        A1["Appointment"]
        A2["Schedule"]
        A3["Slot"]
    end
    
    subgraph Encounter["Step 3: Visit"]
        E1["Encounter"]
        E2["Condition"]
        E3["Observation (Vitals)"]
    end
    
    subgraph Prescription["Step 4: Prescribing"]
        P1["MedicationRequest"]
        P2["Medication"]
        P3["AllergyIntolerance"]
    end
    
    subgraph Lab["Step 5: Lab Tests"]
        L1["ServiceRequest"]
        L2["Specimen"]
        L3["DiagnosticReport"]
        L4["Observation (Results)"]
    end
    
    subgraph Pharmacy["Step 6: Dispensing"]
        PH1["MedicationDispense"]
        PH2["SupplyDelivery"]
    end
    
    subgraph Referral["Step 7: Referral"]
        RF1["ServiceRequest (Referral)"]
        RF2["Task"]
        RF3["Communication"]
    end

    Registration --> Appointment --> Encounter --> Prescription --> Lab --> Pharmacy
    Encounter --> Referral

    style Registration fill:#00b894,color:#fff
    style Appointment fill:#00cec9,color:#fff
    style Encounter fill:#0984e3,color:#fff
    style Prescription fill:#6c5ce7,color:#fff
    style Lab fill:#fdcb6e,color:#333
    style Pharmacy fill:#e17055,color:#fff
    style Referral fill:#d63031,color:#fff
```

### Complete FHIR Resource Mapping

| Clinical Action | FHIR Resource | Profile | Module |
|----------------|---------------|---------|--------|
| Patient registration | `Patient` | BD-Core-Patient | 01 |
| Emergency contact | `RelatedPerson` | Base | 01 |
| Book appointment | `Appointment` | Base | 02 |
| Doctor schedule | `Schedule` | Base | 02 |
| Start consultation | `Encounter` | BD-Core-Encounter | 05 |
| Record diagnosis | `Condition` | BD-Core-Condition | 05 |
| Record vitals | `Observation` | BD-Vitals | 05 |
| Prescribe medicine | `MedicationRequest` | BD-Core-MedicationRequest | 03 |
| Drug reference | `Medication` | BD-Medication | 03 |
| Record allergy | `AllergyIntolerance` | Base | 03 |
| Order lab test | `ServiceRequest` | BD-Lab-Order | 04 |
| Collect sample | `Specimen` | Base | 04 |
| Lab result | `DiagnosticReport` | BD-Lab-Report | 04 |
| Result value | `Observation` | BD-Lab-Observation | 04 |
| Dispense medicine | `MedicationDispense` | Base | 06 |
| Track stock | `SupplyDelivery` | Base | 06 |
| Blood unit | `BiologicallyDerivedProduct` | Base | 07 |
| Transfusion | `Procedure` | Base | 07 |
| Bed assignment | `Location` | BD-Facility | 08 |
| Admission | `Encounter` | BD-Inpatient | 08 |
| Referral | `ServiceRequest` | BD-Referral | 05 |
| Consent | `Consent` | BD-Consent | 05 |
| Audit entry | `AuditEvent` | Base | 05 |

---

## Consent & Privacy Flow

### PDPO 2025 Compliance

Bangladesh's **Personal Data Protection Ordinance 2025** (ব্যক্তিগত তথ্য সুরক্ষা অধ্যাদেশ ২০২৫) mandates strict consent requirements for health data processing.

```mermaid
sequenceDiagram
    participant P as "👩 Patient"
    participant APP as "📱 Patient App"
    participant CONSENT as "🔒 Consent Manager"
    participant MOD as "📦 Module (requesting data)"
    participant AUDIT as "📋 Audit Trail"

    Note over P,AUDIT: Scenario: Doctor at Hospital B wants Rashida's records from Hospital A

    MOD->>CONSENT: Request access to Patient BD-HID-2026-00459832
    CONSENT->>CONSENT: Check existing consent records
    
    alt Consent Exists & Valid
        CONSENT->>CONSENT: Verify scope (what data?) + purpose (why?)
        CONSENT->>AUDIT: Log access: granted (consent ID: C-4521)
        CONSENT-->>MOD: Access granted ✅ (scoped data returned)
    else No Consent or Expired
        CONSENT->>APP: Request consent from patient
        APP->>P: "ডাঃ করিম, সাভার UHC আপনার পূর্ববর্তী রিপোর্ট দেখতে চান। অনুমতি দিবেন?"
        
        alt Patient Grants Consent
            P->>APP: Grant consent (select data scope)
            APP->>CONSENT: Consent granted (scope: lab results, duration: 30 days)
            CONSENT->>CONSENT: Create Consent FHIR resource
            CONSENT->>AUDIT: Log: consent granted by patient
            CONSENT-->>MOD: Access granted ✅
        else Patient Denies
            P->>APP: Deny consent
            APP->>CONSENT: Consent denied
            CONSENT->>AUDIT: Log: consent denied by patient
            CONSENT-->>MOD: Access denied ❌
        end
    else Emergency (Break-Glass)
        CONSENT->>CONSENT: Vital interest exception (PDPO S.27)
        CONSENT->>AUDIT: Log: break-glass access (emergency)
        CONSENT-->>MOD: Emergency access granted ⚠️
        CONSENT->>APP: Post-hoc notification to patient
    end
```

### Consent Granularity Levels

| Level | What Patient Controls | Example |
|-------|----------------------|---------|
| **Module-level** | Which modules can access data | "Lab can access, Blood Bank cannot" |
| **Data-type-level** | Which types of data | "Share vitals but not mental health records" |
| **Provider-level** | Which specific providers | "Dr. Karim can access, Dr. Rahman cannot" |
| **Time-limited** | Duration of access | "Access for 30 days only" |
| **Purpose-specific** | Why they need access | "For treatment only, not research" |

> [!WARNING]
> **Consent is revocable at any time.** When a patient revokes consent, all cached copies of their data in the requesting module must be purged within 24 hours. The FHIR Consent resource is updated to status `inactive`.

---

## Offline-to-Online Sync Flow

### The Reality of Bangladesh's Connectivity

| Metric | Value |
|--------|-------|
| Internet penetration (mobile) | ~55% |
| 4G coverage (geographic) | ~45% |
| Community clinics with reliable internet | <20% |
| Average downtime per day (rural) | 4-8 hours |
| Cyclone-related outages per year | 2-5 events |

> [!IMPORTANT]
> **Offline-first is not optional — it's a survival requirement.** A Community Clinic in Sunamganj may have no connectivity for days during monsoon. The system must work without internet and sync when connectivity returns.

### Sync Architecture

```mermaid
flowchart TD
    subgraph OfflineDevice["📱 Offline Device (SQLite)"]
        OQ["Offline Queue\n(Pending Changes)"]
        LS["Local Store\n(Cached FHIR Resources)"]
        CR["Conflict Resolver"]
    end

    subgraph SyncEngine["🔄 Sync Engine"]
        DET["Connectivity Detector\n(Periodic + Event-based)"]
        QUEUE["Sync Queue Manager\n(Priority-ordered)"]
        MERGE["Merge Engine\n(Last-Write-Wins + Manual)"]
        RETRY["Retry Manager\n(Exponential Backoff)"]
    end

    subgraph CloudServer["☁️ Cloud FHIR Server"]
        FHIR["FHIR R4 Server"]
        MASTER["Master Database\n(PostgreSQL)"]
        LOG["Sync Log\n(Version History)"]
    end

    OQ -->|"1. Internet detected"| DET
    DET -->|"2. Queue flush"| QUEUE
    QUEUE -->|"3. Send changes"| FHIR
    FHIR -->|"4. Merge"| MERGE
    MERGE -->|"5a. No conflict"| MASTER
    MERGE -->|"5b. Conflict detected"| CR
    CR -->|"6. Resolution"| MASTER
    MASTER -->|"7. Sync back"| LS
    FHIR -->|"8. Log"| LOG

    style OfflineDevice fill:#fdcb6e,color:#333
    style SyncEngine fill:#74b9ff,color:#333
    style CloudServer fill:#00b894,color:#fff
```

### Conflict Resolution Strategy

| Scenario | Strategy | Example |
|----------|----------|---------|
| Same field edited at two facilities | **Last-write-wins** with timestamp | BP updated at CC and UHC → latest timestamp wins |
| New resource created offline | **Auto-merge** (no conflict) | New prescription created offline → syncs as-is |
| Resource deleted at one, edited at another | **Keep edited version** + flag | Medicine removed from prescription at A, dose changed at B → keep B, flag for review |
| Critical data conflict | **Manual resolution** | Two different diagnoses for same visit → doctor reviews both |

### Sync Priority Order

| Priority | Data Type | Max Offline Age | Sync Order |
|----------|-----------|-----------------|------------|
| 🔴 P0 | Emergency encounters | 1 hour | First |
| 🔴 P1 | Lab results (critical) | 2 hours | Second |
| 🟡 P2 | Prescriptions | 4 hours | Third |
| 🟡 P3 | Appointments | 8 hours | Fourth |
| 🟢 P4 | Vitals / observations | 24 hours | Fifth |
| 🟢 P5 | Administrative data | 48 hours | Last |

---

## Inter-Facility Data Sharing

### How Hospital A's Data Is Visible at Hospital B

```mermaid
sequenceDiagram
    participant HA as "🏥 Hospital A (Savar UHC)"
    participant CORE as "🏗️ Core FHIR Server"
    participant HB as "🏥 Hospital B (Dhaka Medical)"
    participant P as "👩 Patient (Rashida)"

    Note over HA,P: Rashida was treated at Savar UHC last month

    HA->>CORE: Encounter, Condition, Lab Results stored
    Note over CORE: All resources tagged with Patient ID:<br/>BD-HID-2026-00459832

    Note over HA,P: Now Rashida visits Dhaka Medical College Hospital

    HB->>CORE: Query: GET /Patient/BD-HID-2026-00459832/$everything
    CORE->>CORE: Check consent (Rashida granted access to DMCH)
    CORE-->>HB: Bundle containing:<br/>- 3 past encounters (CC, UHC, Lab)<br/>- 2 conditions (Hypertension, Anemia)<br/>- 5 observations (BP, CBC values)<br/>- 1 diagnostic report<br/>- 2 medication requests<br/>- 1 referral note from CHCP

    HB->>HB: Doctor reviews full history
    Note over HB: "Patient already had CBC done 2 weeks ago at Savar.<br/>No need to repeat. ✅ Saved ৳800 and 2 hours."
```

> [!TIP]
> **The `$everything` operation** returns a FHIR Bundle containing all resources linked to a patient. This is the single most powerful interoperability feature — it turns 48-second consultations into informed 5-minute consultations by giving doctors the full picture instantly.

### Data Visibility Matrix

| Data at Hospital A | Visible at Hospital B? | Condition |
|--------------------|-----------------------|-----------|
| Demographics | ✅ Always | Part of Health ID |
| Allergies | ✅ Always | Safety-critical |
| Active medications | ✅ Always | Drug interaction check |
| Past diagnoses | ✅ With consent | Patient must authorize |
| Lab results | ✅ With consent | Patient must authorize |
| Consultation notes | ✅ With consent | Patient must authorize |
| Mental health records | 🔒 Explicit consent only | Higher privacy bar |
| HIV/STI status | 🔒 Explicit consent only | Higher privacy bar |
| Billing information | ❌ Never shared | Facility-internal only |

---

## Notification Orchestration Flow

### Multi-Channel Notification System

```mermaid
flowchart TD
    subgraph Triggers["📌 Notification Triggers"]
        T1["Appointment Reminder"]
        T2["Lab Result Ready"]
        T3["Medicine Back in Stock"]
        T4["Referral Status Update"]
        T5["Emergency Alert"]
        T6["Consent Request"]
        T7["Follow-up Due"]
    end

    subgraph Engine["🔔 Notification Engine"]
        PREF["User Preference Check\n(Channel + Language + Time)"]
        TMPL["Template Engine\n(Bangla/English)"]
        QUEUE["Priority Queue\n(Redis)"]
        RATE["Rate Limiter\n(Max 5/day per user)"]
    end

    subgraph Channels["📡 Delivery Channels"]
        SMS["📱 SMS (Bangla)\nBulkSMS BD / SSL Wireless"]
        PUSH["🔔 Push Notification\nFirebase Cloud Messaging"]
        INAPP["📲 In-App Message\nPersistent, read-tracked"]
        IVR["📞 IVR Voice Call\nFor critical alerts only"]
    end

    T1 & T2 & T3 & T4 & T5 & T6 & T7 --> PREF
    PREF --> TMPL
    TMPL --> QUEUE
    QUEUE --> RATE
    RATE --> SMS & PUSH & INAPP
    T5 --> IVR

    style Engine fill:#a29bfe,color:#fff
    style T5 fill:#d63031,color:#fff
```

### Sample Notification Templates (Bangla)

| Trigger | SMS Template |
|---------|-------------|
| Appointment Reminder | `[স্বাস্থ্য সেবা] আপনার অ্যাপয়েন্টমেন্ট: আগামীকাল সকাল ১০টা, সাভার UHC, ডাঃ করিম। টোকেন: ২৩` |
| Lab Result | `[স্বাস্থ্য সেবা] আপনার রক্ত পরীক্ষার রিপোর্ট তৈরি। দেখতে লগইন করুন: healthbd.gov.bd/r/4521` |
| Medicine Stock | `[স্বাস্থ্য সেবা] আপনার প্রয়োজনীয় Losartan 50mg এখন সাভার UHC তে পাওয়া যাচ্ছে।` |
| Referral Accepted | `[স্বাস্থ্য সেবা] আপনার রেফারেল গৃহীত হয়েছে। ডাঃ আহমেদ, DMCH, ১৫ নভেম্বর সকাল ৯টা।` |

---

## Analytics & Reporting Flow

### From Facility-Level to National Dashboard

```mermaid
flowchart TD
    subgraph FacilityLevel["🏥 Facility Level"]
        FL1["Daily patient count"]
        FL2["Medicine stock status"]
        FL3["Test volumes"]
        FL4["Bed occupancy"]
    end

    subgraph DistrictLevel["🏛️ District Level (64 Districts)"]
        DL1["Aggregated facility metrics"]
        DL2["Disease surveillance"]
        DL3["Resource utilization"]
        DL4["Referral patterns"]
    end

    subgraph DivisionLevel["📊 Division Level (8 Divisions)"]
        DIV1["Cross-district comparison"]
        DIV2["Epidemic detection"]
        DIV3["Budget utilization"]
    end

    subgraph NationalLevel["🇧🇩 National Level (MoHFW)"]
        NL1["DHIS2 Integration"]
        NL2["National Health Dashboard"]
        NL3["Policy Decision Support"]
        NL4["WHO/SDG Reporting"]
    end

    FL1 & FL2 & FL3 & FL4 --> DL1 & DL2 & DL3 & DL4
    DL1 & DL2 & DL3 & DL4 --> DIV1 & DIV2 & DIV3
    DIV1 & DIV2 & DIV3 --> NL1 & NL2 & NL3 & NL4

    style NationalLevel fill:#0984e3,color:#fff
    style DivisionLevel fill:#00b894,color:#fff
    style DistrictLevel fill:#fdcb6e,color:#333
    style FacilityLevel fill:#dfe6e9,color:#333
```

> [!NOTE]
> **DHIS2 auto-fill**: Instead of community health workers manually entering data into DHIS2 (District Health Information Software), the platform automatically generates DHIS2-compatible reports from transactional data. This saves an estimated **2-3 hours per facility per week** of manual reporting time.

---

## Flow Summary

| Flow | Modules Involved | Key FHIR Resources | Primary User |
|------|-----------------|---------------------|-------------|
| Complete Patient Journey | All 8 | Patient, Encounter, MedicationRequest, DiagnosticReport | All users |
| Data Flow Architecture | 05 (Core) | All resources | System architects |
| ReferLoop (Referral) | 01, 02, 05 | ServiceRequest, Task, Communication | CHCPs, Doctors |
| Emergency | 05, 07, 08 | Encounter, Location, BiologicallyDerivedProduct | EMTs, ER Doctors |
| FHIR Resource Flow | All 8 | All 25+ resource types | Developers |
| Consent & Privacy | 05 | Consent, AuditEvent | Patients, Compliance |
| Offline-to-Online Sync | 05 | All (queued) | System, CHCPs |
| Inter-Facility Sharing | 05, all | Bundle ($everything) | Doctors |
| Notification | 05, all | Communication | All users |
| Analytics & Reporting | 05, all | MeasureReport | Admins, MoHFW |

---

*Module 05 — Application Flows | Integrated Digital Healthcare System | Bangladesh Digital Health Initiative*
