# 🔄 Application Flow — Hospital Appointment & Queue System

## Complete User Journeys, State Machines & Edge Case Handling

---

## Table of Contents

- [Overview](#overview)
- [Patient Registration Flow](#patient-registration-flow)
- [QR Code Scan Process](#qr-code-scan-process)
- [Appointment Lifecycle](#appointment-lifecycle)
- [Queue Management Flow](#queue-management-flow)
- [Token Calling System](#token-calling-system)
- [Offline Mode Flow](#offline-mode-flow)
- [Emergency Bypass Flow](#emergency-bypass-flow)
- [Edge Cases](#edge-cases)
- [Data Synchronization](#data-synchronization)

---

## Overview

This document describes every user journey and system flow within the Hospital Appointment & Queue Management System. Each flow is designed for **Bangladesh's public healthcare context** — intermittent connectivity, shared phones, paper-to-digital transition, and the reality of **~7,000 patients/day** at facilities like DMCH.

> [!NOTE]
> All flows are designed **offline-first**. The system must function even when internet connectivity drops — a common occurrence at rural UHCs and community clinics across Bangladesh.

### Flow Architecture Overview

```mermaid
flowchart TD
    subgraph ENTRY["Patient Entry Points"]
        E1["QR Health Card Scan"]
        E2["Manual Registration\n(New Patient)"]
        E3["Phone Number Lookup\n(Returning Patient)"]
        E4["Advance Booking\n(Phone/Web)"]
        E5["Emergency Entry\n(Bypass Queue)"]
    end

    subgraph CORE["Core Processing"]
        C1["FHIR Patient\nLookup/Create"]
        C2["Token Generation\nEngine"]
        C3["Queue Manager"]
        C4["Department Router"]
    end

    subgraph OUTPUT["Output Channels"]
        O1["Digital Token\n(QR + Number)"]
        O2["Queue Display\nScreen"]
        O3["SMS Notification"]
        O4["Doctor Dashboard"]
        O5["Analytics Engine"]
    end

    E1 --> C1
    E2 --> C1
    E3 --> C1
    E4 --> C1
    E5 --> C4

    C1 --> C2
    C2 --> C3
    C3 --> C4

    C4 --> O1
    C4 --> O2
    C3 --> O3
    C3 --> O4
    C3 --> O5
```

---

## Patient Registration Flow

### Flow 1: New Patient Registration (First Visit)

This is the most common flow at facilities without prior digital records. The patient has **no e-Health Card** and has never been registered digitally.

```mermaid
sequenceDiagram
    actor Patient
    participant Counter as OPD Counter Staff
    participant System as Registration System
    participant FHIR as FHIR Server
    participant SMS as SMS Gateway
    participant Queue as Queue Manager

    Patient->>Counter: Arrives at OPD counter
    Counter->>Patient: Asks for Health Card
    Patient-->>Counter: No Health Card (first visit)
    
    Counter->>System: Opens "New Patient" form
    System->>Counter: Displays registration form
    
    Counter->>System: Enters patient data<br/>(Name, Age, Gender, Phone,<br/>Guardian, Address, NID if available)
    
    System->>System: Validates data<br/>(phone format, age range, required fields)
    
    System->>FHIR: POST /Patient<br/>(Create FHIR Patient resource)
    FHIR-->>System: Patient ID + Health ID generated
    
    System->>System: Generate QR code<br/>with Health ID encoded
    
    System->>Counter: Asks for department selection
    Counter->>Patient: Which department?
    Patient->>Counter: Medicine / Surgery / etc.
    Counter->>System: Selects department
    
    System->>FHIR: POST /Encounter<br/>(Create OPD Encounter)
    FHIR-->>System: Encounter ID
    
    System->>Queue: Add to department queue
    Queue-->>System: Token Number assigned<br/>(e.g., MED-047)
    
    System->>Counter: Display token + QR
    Counter->>Patient: Gives printed token slip<br/>with QR code
    
    System->>SMS: Send token SMS<br/>"আপনার টোকেন নম্বর MED-047,<br/>আনুমানিক সময় ৪৫ মিনিট"
    SMS-->>Patient: SMS received
    
    Note over Patient,Queue: Total time: < 2 minutes<br/>(vs. 15+ minutes paper)
```

### Flow 2: Returning Patient with Health Card (QR Scan)

This is the **fastest flow** — the target experience for all patients once Health IDs are widely issued.

```mermaid
sequenceDiagram
    actor Patient
    participant Scanner as QR Scanner/Kiosk
    participant System as Registration System
    participant FHIR as FHIR Server
    participant Queue as Queue Manager
    participant Display as Queue Display

    Patient->>Scanner: Presents Health Card QR
    Scanner->>System: Decoded Health ID string
    
    System->>FHIR: GET /Patient?identifier={healthId}
    FHIR-->>System: Patient resource<br/>(name, DOB, gender, phone, history)
    
    System->>System: Display patient summary<br/>for staff confirmation
    
    System->>FHIR: GET /Encounter?patient={id}&_sort=-date&_count=5
    FHIR-->>System: Last 5 encounters<br/>(previous visits, departments)
    
    System->>System: Auto-suggest department<br/>based on past visits
    
    System->>FHIR: POST /Encounter<br/>(new OPD encounter)
    FHIR-->>System: Encounter created
    
    System->>Queue: Add to queue
    Queue-->>System: Token MED-023
    
    System->>Display: Update queue display
    System->>Patient: Token printed + SMS sent
    
    Note over Patient,Display: Total time: < 30 seconds!
```

### Flow 3: Returning Patient Without Card (Phone Lookup)

When a patient has visited before but doesn't have their Health Card. Uses phone number as the lookup key.

> [!TIP]
> Since **73.4% of Bangladeshi households** own at least one mobile phone, phone number is the most reliable secondary identifier after the Health Card QR code.

```mermaid
sequenceDiagram
    actor Patient
    participant Counter as OPD Counter
    participant System as Registration System
    participant FHIR as FHIR Server

    Patient->>Counter: No Health Card available
    Counter->>Patient: Asks for phone number
    Patient->>Counter: Provides phone number
    
    Counter->>System: Search by phone number
    System->>FHIR: GET /Patient?telecom={phone}
    
    alt Single match found
        FHIR-->>System: One Patient resource
        System->>Counter: Display patient details
        Counter->>Patient: Confirms identity<br/>(name, father's name, age)
        Patient->>Counter: Confirms correct
        Note over System: Proceed with token generation
    else Multiple matches
        FHIR-->>System: Multiple patients (shared phone)
        System->>Counter: Show list with names + ages
        Counter->>Patient: Which one are you?
        Patient->>Counter: Selects their record
        Note over System: Proceed with selected patient
    else No match found
        FHIR-->>System: No results
        System->>Counter: Redirect to New Patient flow
        Note over System: Falls back to Flow 1
    end
```

---

## QR Code Scan Process

### Detailed QR Scan Flow

The QR code on the e-Health Card encodes the patient's **Health ID** in a structured format. The scan flow validates, looks up, and creates an encounter in under 30 seconds.

```mermaid
flowchart TD
    A["QR Code Scanned\n(Camera/Scanner)"] --> B{"QR Data\nValid Format?"}
    
    B -->|"Invalid"| C["Show Error:\n'অকার্যকর QR কোড'\n(Invalid QR Code)"]
    C --> D["Prompt manual entry\nor rescan"]
    D --> A
    
    B -->|"Valid"| E["Extract Health ID\nfrom QR payload"]
    E --> F{"Network\nAvailable?"}
    
    F -->|"Yes (Online)"| G["FHIR GET /Patient\nby Health ID"]
    G --> H{"Patient\nFound?"}
    
    H -->|"Yes"| I["Display Patient\nSummary"]
    I --> J["Staff confirms\nidentity"]
    J --> K["Select Department"]
    K --> L["Create FHIR\nEncounter"]
    L --> M["Generate Token"]
    M --> N["Print Token +\nSend SMS"]
    
    H -->|"No"| O["Health ID valid but\nno FHIR record"]
    O --> P["Create FHIR Patient\nfrom Health Card data"]
    P --> K
    
    F -->|"No (Offline)"| Q["Check Local\nSQLite Cache"]
    Q --> R{"Found in\nLocal Cache?"}
    
    R -->|"Yes"| S["Display cached\npatient data"]
    S --> T["Generate offline\ntoken (prefix: OFF-)"]
    T --> U["Queue for sync\nwhen online"]
    
    R -->|"No"| V["Prompt manual\ndata entry"]
    V --> W["Store locally with\nHealth ID reference"]
    W --> T

    style C fill:#ffcccc,stroke:#cc0000
    style N fill:#ccffcc,stroke:#00aa00
    style U fill:#ffffcc,stroke:#aaaa00
```

### QR Payload Structure

| Field | Format | Example |
|-------|--------|---------|
| Health ID | `BD-HID-XXXXXXXXXXXXX` | `BD-HID-2024051500123` |
| Version | Numeric | `1` |
| District Code | 2-digit | `33` (Dhaka) |
| Issue Date | YYYYMMDD | `20240515` |
| Checksum | CRC-16 | `A3F2` |

> [!WARNING]
> QR codes from **damaged or worn cards** may produce partial reads. The system must handle partial decodes by prompting the staff to enter the printed Health ID number manually (visible on card below the QR code).

---

## Appointment Lifecycle

### State Diagram — Complete Appointment Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Booked : Advance booking\n(phone/web/counter)
    [*] --> WalkIn : Walk-in patient\narrives at OPD

    Booked --> CheckedIn : Patient arrives\n& scans QR / confirms
    WalkIn --> CheckedIn : Registration\ncompleted

    CheckedIn --> InQueue : Token issued\n& added to queue

    InQueue --> Called : Queue system\ncalls token number
    InQueue --> Skipped : Patient not present\nwhen called
    
    Skipped --> InQueue : Patient returns\n& re-queued (lower priority)
    Skipped --> NoShow : 3 skips → marked no-show

    Called --> WithDoctor : Patient enters\nconsultation room

    WithDoctor --> Completed : Consultation finished\n(Encounter closed)
    WithDoctor --> Referred : Doctor refers to\nanother department

    Referred --> InQueue : New token for\nreferred department

    Completed --> [*]
    NoShow --> [*]

    note right of Booked
        Advance bookings can be
        made 1–7 days ahead.
        SMS reminder sent 1 day
        and 2 hours before.
    end note

    note right of WithDoctor
        Doctor can see patient
        history, past encounters,
        and allergies from FHIR.
    end note

    note left of Skipped
        Patient hears name/token
        on display but is not
        present. Re-queued with
        next 3 patients, max 3x.
    end note
```

### Appointment Status Codes

| Status | Code | Description | Trigger |
|--------|------|-------------|---------|
| Booked | `BOOKED` | Advance appointment created | Patient/staff books |
| Checked-In | `CHECKED_IN` | Patient confirmed at facility | QR scan / counter confirmation |
| In Queue | `IN_QUEUE` | Token active, waiting | Token generated |
| Called | `CALLED` | Token number announced | Queue system calls next |
| Skipped | `SKIPPED` | Patient not present when called | 2-minute timeout |
| With Doctor | `WITH_DOCTOR` | Consultation in progress | Patient enters room |
| Completed | `COMPLETED` | Visit finished | Doctor marks done |
| Referred | `REFERRED` | Sent to another department | Doctor refers |
| No Show | `NO_SHOW` | Patient never appeared | 3 skips or day ends |
| Cancelled | `CANCELLED` | Appointment cancelled | Patient/staff cancels |

---

## Queue Management Flow

### Queue Processing Logic

```mermaid
sequenceDiagram
    participant QM as Queue Manager
    participant DB as Database
    participant Display as Queue Display
    participant Doctor as Doctor Terminal
    participant SMS as SMS Engine

    loop Every token called
        Doctor->>QM: "Ready for next patient"
        QM->>DB: Get next token<br/>(Priority: Emergency > Elderly > Normal)
        DB-->>QM: Token MED-047<br/>(Patient: রহিম উদ্দিন)
        
        QM->>Display: Update display<br/>NOW SERVING: MED-047
        QM->>SMS: Send SMS to MED-047 patient<br/>"আপনার পালা এসেছে, কক্ষ ৩"
        
        QM->>QM: Start 2-min timer
        
        alt Patient arrives
            Note over Doctor: Patient enters room
            Doctor->>QM: Mark "With Doctor"
            QM->>DB: Update status
        else Patient not present (2 min timeout)
            QM->>QM: Mark as "Skipped"
            QM->>Display: Show "SKIPPED: MED-047"
            QM->>SMS: Send SMS<br/>"আপনাকে ডাকা হয়েছিল, অনুগ্রহ করে কাউন্টারে আসুন"
            QM->>DB: Increment skip count
            
            alt Skip count < 3
                QM->>DB: Re-queue after next 3 patients
            else Skip count >= 3
                QM->>DB: Mark as NO_SHOW
            end
        end
    end
```

### Queue Priority Rules

| Priority Level | Category | Rule |
|---------------|----------|------|
| **P0** | Emergency | Bypass queue entirely, immediate attention |
| **P1** | Elderly (65+) | Auto-elevated, first 20% of queue |
| **P2** | Pregnant women | Auto-elevated from FHIR Patient data |
| **P3** | Disabled / Special needs | Flag at registration |
| **P4** | Advance appointment | Honored at booked time slot |
| **P5** | Normal walk-in | First-come-first-served |
| **P6** | Skipped / Re-queued | After next 3 normal patients |

> [!IMPORTANT]
> Priority elevation is **automatic** for elderly patients (age calculated from FHIR Patient.birthDate) and pregnant women (from active FHIR Condition). Manual override available for staff.

### Estimated Wait Time Calculation

The system calculates estimated wait time using:

```
estimatedWait = (positionInQueue × avgConsultationTime) + bufferTime

Where:
- positionInQueue = number of patients ahead (same department)
- avgConsultationTime = rolling average of last 20 consultations for that doctor
- bufferTime = 2 minutes (for transition between patients)
```

---

## Token Calling System

### Token Number Format

```
[DEPT_CODE]-[PRIORITY_PREFIX][SEQUENCE]

Examples:
  MED-047     → Medicine department, normal patient #47
  SUR-E003    → Surgery department, emergency patient #3
  GYN-P012    → Gynecology, priority patient #12
  ENT-OFF019  → ENT, offline-generated token #19
```

### Display Flow

```mermaid
flowchart LR
    subgraph DisplayBoard["Queue Display Board (TV/Monitor)"]
        D1["NOW SERVING\nMED-047\nRoom: 3"]
        D2["NEXT:\nMED-048, MED-049, MED-050"]
        D3["Department Summary:\nMedicine: 23 waiting\nSurgery: 12 waiting\nGynecology: 8 waiting"]
    end

    subgraph Controls["Doctor Terminal"]
        C1["Call Next"]
        C2["Skip Current"]
        C3["Mark Complete"]
        C4["Emergency Insert"]
    end

    Controls -->|"Updates"| DisplayBoard
```

---

## Offline Mode Flow

### Offline-First Architecture

> [!WARNING]
> Internet connectivity is **unreliable** at many rural UHCs and community clinics in Bangladesh. Power outages are common. The system MUST function fully offline and sync when connectivity returns.

```mermaid
flowchart TD
    A["System Start"] --> B{"Internet\nAvailable?"}
    
    B -->|"Yes"| C["Normal Mode\n(FHIR server connected)"]
    B -->|"No"| D["Offline Mode\n(SQLite local DB)"]
    
    C --> E["All operations\ngo to FHIR server"]
    E --> F{"Connection\nDropped?"}
    F -->|"Yes"| D
    F -->|"No"| E
    
    D --> G["Registration → Local SQLite"]
    D --> H["Token generation → Local sequence"]
    D --> I["Queue management → Local state"]
    D --> J["Patient lookup → Local cache"]
    
    G --> K["Sync Queue\n(stores pending operations)"]
    H --> K
    I --> K
    
    K --> L{"Internet\nRestored?"}
    L -->|"No"| D
    L -->|"Yes"| M["Background Sync\nProcess Starts"]
    
    M --> N["POST new Patients\nto FHIR server"]
    N --> O["POST new Encounters\nto FHIR server"]
    O --> P["Update token mappings\n(local ID → FHIR ID)"]
    P --> Q["Resolve conflicts\n(if any)"]
    Q --> R["Mark sync complete\nfor batch"]
    R --> C

    style D fill:#ffffcc,stroke:#aaaa00
    style C fill:#ccffcc,stroke:#00aa00
```

### Offline Sync Queue Schema

| Field | Type | Description |
|-------|------|-------------|
| `sync_id` | UUID | Unique sync operation ID |
| `operation` | ENUM | `CREATE_PATIENT`, `CREATE_ENCOUNTER`, `UPDATE_TOKEN` |
| `payload` | JSON | Full FHIR resource JSON |
| `created_at` | DATETIME | When operation was queued |
| `synced_at` | DATETIME | When successfully synced (null if pending) |
| `retry_count` | INT | Number of sync attempts |
| `status` | ENUM | `PENDING`, `SYNCING`, `SYNCED`, `FAILED` |
| `error_message` | TEXT | Error details if failed |

### Conflict Resolution Rules

| Conflict Type | Resolution |
|--------------|------------|
| Patient exists on server (same Health ID) | Merge: keep server record, update local reference |
| Encounter already created (duplicate) | Skip: mark local as synced, use server Encounter ID |
| Token number collision | Re-map: assign new token number from server sequence |
| Phone number changed on server | Keep server version (more recent update wins) |

---

## Emergency Bypass Flow

### Emergency Patient Registration

Emergency patients **bypass the regular queue entirely**. This flow is triggered when a patient arrives via ambulance, emergency department referral, or staff identifies a critical case.

```mermaid
sequenceDiagram
    actor Emergency as Emergency Patient
    participant Triage as Triage Nurse
    participant System as Registration System
    participant Queue as Queue Manager
    participant Doctor as On-Duty Doctor
    participant Display as Queue Display

    Emergency->>Triage: Patient arrives (critical)
    Triage->>Triage: Assess severity (RED/YELLOW/GREEN)
    
    alt RED - Immediately Life-Threatening
        Triage->>Doctor: Direct to resuscitation
        Triage->>System: Register post-stabilization
        Note over Doctor: Treatment first,<br/>paperwork later
    else YELLOW - Urgent
        Triage->>System: Emergency registration<br/>(minimal data: name + age + gender)
        System->>Queue: Insert at FRONT of queue<br/>(Priority P0)
        Queue->>Display: EMERGENCY TOKEN: EMR-001
        Queue->>Doctor: Alert: Emergency patient incoming
        System->>Doctor: Patient sent immediately
    else GREEN - Non-Urgent
        Triage->>System: Normal registration
        Note over System: Redirected to regular OPD flow
    end
```

### Emergency Triage Categories

| Category | Color | Description | Queue Action |
|----------|-------|-------------|-------------|
| **Immediate** | 🔴 RED | Life-threatening | Bypass queue, direct to doctor |
| **Urgent** | 🟡 YELLOW | Serious but stable | Insert at front of queue |
| **Non-urgent** | 🟢 GREEN | Can wait safely | Normal queue with priority flag |

---

## Edge Cases

### Edge Case 1: Invalid QR Code

**Scenario**: Patient presents a damaged, expired, or non-standard QR code.

| Step | Action |
|------|--------|
| 1 | Scanner attempts to decode QR |
| 2 | Decoding fails or format doesn't match `BD-HID-*` pattern |
| 3 | System displays: "অকার্যকর QR কোড — অনুগ্রহ করে ম্যানুয়ালি নম্বর দিন" |
| 4 | Staff enters the Health ID number printed below QR on card |
| 5 | If manual entry also fails → fall back to phone number lookup |
| 6 | If phone lookup fails → create new patient record |
| 7 | Log the failed scan for quality monitoring |

### Edge Case 2: First-Time Patient with No Phone

**Scenario**: Patient (often elderly, rural) has no mobile phone.

| Step | Action |
|------|--------|
| 1 | Registration form allows phone field to be empty |
| 2 | System asks for guardian/family member phone (optional) |
| 3 | If no phone at all → token printed only, no SMS |
| 4 | Queue display becomes the primary notification channel |
| 5 | Patient advised to watch the display board |

### Edge Case 3: Shared Phone / Proxy Registration

**Scenario**: In Bangladesh, multiple family members often share one phone. A family member registers on behalf of another.

> [!NOTE]
> **73.4% of Bangladeshi households** own at least one mobile phone, but individual ownership is lower. It's common for one phone to be shared among 3–5 family members.

| Step | Action |
|------|--------|
| 1 | Registering person provides their phone number |
| 2 | System asks: "নিজের জন্য নাকি অন্য কারো জন্য?" (For yourself or someone else?) |
| 3 | If proxy → enter actual patient's name, age, gender separately |
| 4 | Phone number linked as "guardian phone" in FHIR Patient.contact |
| 5 | SMS sent to this number with patient name in message for clarity |
| 6 | Multiple patients can share one phone number (system handles this) |

### Edge Case 4: Multiple Departments Same Visit

**Scenario**: Patient needs to visit Medicine AND then get an X-ray referral.

| Step | Action |
|------|--------|
| 1 | Patient registered for Medicine → Token MED-023 |
| 2 | Doctor refers to Radiology |
| 3 | System auto-generates referral token RAD-015 |
| 4 | Same Encounter ID links both visits |
| 5 | Patient sees new queue position on display |
| 6 | SMS: "রেডিওলজিতে রেফার করা হয়েছে, নতুন টোকেন RAD-015" |

### Edge Case 5: Power Failure Mid-Registration

| Step | Action |
|------|--------|
| 1 | PWA service worker keeps app running |
| 2 | If device has battery → continues offline mode |
| 3 | If device dies → on restart, SQLite recovers uncommitted transactions |
| 4 | Partially entered data saved via auto-save every 5 seconds |
| 5 | Sync queue replays pending operations on reconnection |

### Edge Case 6: Doctor Absent / Leaves Mid-Day

| Step | Action |
|------|--------|
| 1 | Admin marks doctor as unavailable |
| 2 | Queue manager redistributes patients to available doctors |
| 3 | Affected patients get SMS: "আপনার ডাক্তার পরিবর্তন হয়েছে, নতুন কক্ষ ৫" |
| 4 | Token numbers preserved, only room assignment changes |

---

## Data Synchronization

### Sync Architecture

```mermaid
flowchart TD
    subgraph Local["Local Device (PWA + SQLite)"]
        L1["Patient Cache"]
        L2["Token Queue"]
        L3["Encounter Log"]
        L4["Sync Queue"]
    end

    subgraph Sync["Sync Engine"]
        S1["Change Detector"]
        S2["Conflict Resolver"]
        S3["Batch Uploader"]
        S4["ID Mapper"]
    end

    subgraph Server["Central Server (FHIR + PostgreSQL)"]
        R1["FHIR Patient"]
        R2["FHIR Encounter"]
        R3["FHIR Appointment"]
        R4["Analytics DB"]
    end

    L1 --> S1
    L2 --> S1
    L3 --> S1
    S1 --> L4
    L4 --> S2
    S2 --> S3
    S3 --> R1
    S3 --> R2
    S3 --> R3
    S4 --> L1
    S4 --> L2
    R1 --> S4
    R2 --> S4
    S3 --> R4
```

### Sync Frequency & Rules

| Condition | Sync Behavior |
|-----------|--------------|
| Online + WiFi | Real-time sync (every operation) |
| Online + Mobile data | Batch sync every 5 minutes |
| Just came online | Immediate full sync of pending queue |
| Offline | All operations queued locally |
| Sync conflict | Last-write-wins with server authority |
| Failed sync (3 retries) | Alert admin, hold for manual review |

---

## Flow Summary Table

| Flow | Trigger | Duration | Requires Internet | FHIR Resources |
|------|---------|----------|-------------------|----------------|
| New Patient Registration | Walk-in, no card | < 2 min | Preferred, not required | Patient, Encounter |
| QR Scan Registration | Health Card scan | < 30 sec | Preferred, not required | Patient (read), Encounter |
| Phone Lookup | No card, has phone | < 1 min | Preferred, not required | Patient (search), Encounter |
| Advance Booking | Phone/web/counter | < 3 min | Required | Appointment, Schedule, Slot |
| Emergency Bypass | Triage assessment | Immediate | Not required | Patient (minimal), Encounter |
| Queue Processing | Doctor calls next | Continuous | Not required | Encounter (update) |
| Offline Sync | Connectivity restored | Background | Required | All pending resources |

---

> [!IMPORTANT]
> All flows have been designed with input from UHC field staff and DMCH OPD managers. The flows account for the reality of 450–500 patients/day at a typical UHC and up to 7,000/day at DMCH.

---

*Last updated: November 2026 | See also: [FEATURES.md](./FEATURES.md) | [IMPLEMENTATION.md](./IMPLEMENTATION.md)*
