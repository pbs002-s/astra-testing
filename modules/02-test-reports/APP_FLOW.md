# 🔄 Application Flow — Digital Diagnostic Test Reports & Alert System

## Module 02 — End-to-End Diagnostic Lifecycles, State Machines, Critical Alerting & Exception Handling

---

## Table of Contents

- [Workflow Architecture Overview](#workflow-architecture-overview)
- [Flow 1: Test Ordering & Barcode Accessioning](#flow-1-test-ordering--barcode-accessioning)
- [Flow 2: Specimen Collection & Phlebotomy Check-In](#flow-2-specimen-collection--phlebotomy-check-in)
- [Flow 3: OpenELIS Analyzer Ingestion & Result Capture](#flow-3-openelis-analyzer-ingestion--result-capture)
- [Flow 4: Two-Tier Review & Pathologist Electronic Sign-Off](#flow-4-two-tier-review--pathologist-electronic-sign-off)
- [Flow 5: Critical Panic Value Detection & Clinician Escalation](#flow-5-critical-panic-value-detection--clinician-escalation)
- [Flow 6: Privacy-Preserving Patient Notification & PIN Retrieval](#flow-6-privacy-preserving-patient-notification--pin-retrieval)
- [Flow 7: Clinician Trend Review in the 48-Second Consultation](#flow-7-clinician-trend-review-in-the-48-second-consultation)
- [Flow 8: Offline Laboratory Operation & Cloud Synchronization](#flow-8-offline-laboratory-operation--cloud-synchronization)
- [Exception Workflows: Rejections, Stockouts & Failures](#exception-workflows-rejections-stockouts--failures)

---

## Workflow Architecture Overview

Module 02 governs the entire diagnostic pipeline inside public health facilities, bridging the gap between isolated laboratory instruments and the national health ecosystem. It operates in environments where **OpenELIS is deployed in approximately 100 public hospitals**, yet where **52% of diagnostic equipment sits idle** and **43% of laboratories suffer reagent shortages** (PPRC 2026).

```mermaid
flowchart TD
    subgraph ORDER["1. Order & Accessioning"]
        A1["Doctor Creates Test Order\n(FHIR ServiceRequest)"]
        A2["Patient Presents at Phlebotomy\n(Health ID 9801... Scanned)"]
        A3["1D Barcode Printed & Affixed\n(Accession ID Generated)"]
    end

    subgraph LAB["2. Specimen Processing (OpenELIS)"]
        B1["Analyzer Direct Interfacing\n(Sysmex / Mindray / Erba)"]
        B2["Manual Bench Entry / Rapid Kit\n(Dengue NS1 / Malarial Antigen)"]
        B3["Quality Control (QC) Validation"]
    end

    subgraph VERIFY["3. Verification & Safety Engine"]
        C1["Lab Technologist Preliminary Review"]
        C2["Consultant Pathologist Electronic Sign-Off"]
        C3{"Critical Value Breached?\n(Panic Rule Evaluation)"}
    end

    subgraph DISPATCH["4. Multi-Channel Distribution"]
        D1["Critical Audio-Visual Alert\n(Doctor Screen + SMS < 3 min)"]
        D2["Privacy Bangla SMS + 4-Digit PIN\n(Patient Shared-Phone Safe)"]
        D3["Central FHIR Cloud Sync\n(sandbox.fhir.dghs.gov.bd)"]
    end

    A1 --> A2 --> A3
    A3 --> B1 & B2 --> B3
    B3 --> C1 --> C2 --> C3
    C3 -- Yes --> D1
    C3 -- No --> D2
    C2 --> D2
    C2 --> D3
```

---

## Flow 1: Test Ordering & Barcode Accessioning

### 1.1 Trigger & Pre-Conditions
During an outpatient consultation (Module 01) or inpatient ward round, the Medical Officer identifies clinical indications for diagnostic evaluation (e.g., suspected Dengue Hemorrhagic Fever, chronic kidney disease, severe anemia).

```mermaid
sequenceDiagram
    autonumber
    actor Doctor as Medical Officer (MO)
    participant OPD as OPD Consultation Screen
    participant Gateway as Local Hospital Gateway
    participant Lab as Lab Accessioning Desk
    actor Tech as Phlebotomist / Lab Clerk

    Doctor->>OPD: Selects Tests (e.g., CBC + Dengue NS1 + Serum Creatinine)
    OPD->>Gateway: POST /api/v1/orders (ServiceRequest)
    Gateway-->>OPD: 201 Created (Order UUID, Billing/Waiver Tag)
    OPD-->>Doctor: Test Order Acknowledged (Slip Printed with Token)
    
    Note over Doctor,Tech: Patient walks to Hospital Lab / Phlebotomy Room
    Tech->>Lab: Scan Patient e-Health Card QR / Token Slip
    Lab->>Gateway: GET /api/v1/orders/pending?health_id=9801...
    Gateway-->>Lab: Returns Active Orders + Required Specimen Tube Types
    Tech->>Lab: Click "Generate Specimen Barcodes"
    Lab-->>Tech: Print Label (Code 128 / DataMatrix Barcode)
```

> [!NOTE]
> **Automated Exemption for Freedom Fighters & Indigent Patients**: Under DGHS hospital regulations, Freedom Fighters (*Muktijoddha*) and destitute patients receive 100% diagnostic fee waivers. The system automatically reads the exemption flag encoded on the Health ID, preventing administrative delays at the cashier window.

---

## Flow 2: Specimen Collection & Phlebotomy Check-In

### 2.1 Tube Labeling & Specimen Identity
The phlebotomist draws blood or collects bodily fluids into barcoded vacutainer tubes:
- **Purple Top (EDTA)**: Complete Blood Count (CBC), ESR, Malaria.
- **Red/Gold Top (Serum Clot Activator)**: Electrolytes, Dengue NS1, LFT, Creatinine.
- **Grey Top (Sodium Fluoride)**: Fasting Blood Glucose (FBG).

```mermaid
sequenceDiagram
    autonumber
    actor Patient as Rural Patient
    actor Tech as Phlebotomist
    participant Scanner as USB Barcode Scanner
    participant Edge as Edge Lab Gateway

    Tech->>Patient: Verify Identity (Ask Name & Birth Year against Screen)
    Tech->>Tech: Collect Blood / Specimen into Appropriate Tubes
    Tech->>Scanner: Scan Barcode Label on Tube
    Scanner->>Edge: POST /api/v1/specimens/collect (Specimen ID: LAB-20261103-0941)
    Edge-->>Scanner: Specimen Status: COLLECTED (Timestamped)
    Tech->>Patient: "আপনার রক্ত সংগ্রহ করা হয়েছে। রিপোর্ট প্রস্তুত হলে এসএমএস পাবেন।"<br/>(Your sample is collected. You will receive an SMS when ready).
```

---

## Flow 3: OpenELIS Analyzer Ingestion & Result Capture

### 3.1 Interfacing with Automated Analyzers
In facilities where automated analyzers are present (e.g., Sysmex XN-350 hematology, Mindray BS-240 biochemistry), the analyzer reads the tube barcode and fetches the test requisition via bidirectional ASTM 1381/1394 or HL7 v2.5.1 protocols.

### 3.2 Manual & Semi-Automated Bench Entry
Where analyzers are absent or during reagent stockouts (affecting **43% of public labs**), lab technologists enter manual test strip readings (e.g., rapid immunochromatographic Dengue NS1/IgG/IgM kits or urine dipsticks) through an optimized keyboard-first interface:

```mermaid
sequenceDiagram
    autonumber
    participant Analyzer as Sysmex / Mindray Analyzer
    participant OpenELIS as Local OpenELIS Server
    participant Worker as ReportReady Ingestion Worker
    participant DB as Local Lab Database

    Analyzer->>OpenELIS: ASTM E1394 Result Packet (Plt: 18,000, Hb: 8.2, WBC: 2,100)
    OpenELIS->>OpenELIS: Map Analyzer Channel to LOINC Codes
    OpenELIS->>DB: Store Raw Laboratory Results (Status: PRELIMINARY)
    OpenELIS->>Worker: Trigger Event: RESULT_INGESTED (Accession: LAB-0941)
    Worker->>DB: Enrich with Normal Reference Ranges by Age & Gender
```

---

## Flow 4: Two-Tier Review & Pathologist Electronic Sign-Off

### 4.1 Medical Verification Responsibility
To prevent diagnostic errors, public hospital protocols mandate two distinct verification checkpoints:
1. **Tier 1 (Technical Verification)**: Conducted by the Medical Technologist (Laboratory). Confirms analyzer calibration, control runs, and absence of clotted samples.
2. **Tier 2 (Clinical Sign-off)**: Conducted by the Consultant Pathologist / Biochemist. Evaluates cross-parameter clinical plausibility and authorizes external release.

```mermaid
stateDiagram-v2
    [*] --> SpecimenCollected: Phlebotomy Complete
    SpecimenCollected --> InAnalysis: Analyzer Ingested
    InAnalysis --> TechnicalReview: Technologist Checked
    TechnicalReview --> ClinicalVerification: Passed Technical QC
    TechnicalReview --> RejectedSample: Clotted / Hemolyzed
    ClinicalVerification --> SignedOff: Pathologist Digital Approval
    ClinicalVerification --> RetestRequested: Discrepancy Found
    RetestRequested --> InAnalysis
    RejectedSample --> [*]
    SignedOff --> ReadyForDispatch: Immutable FHIR Created
    ReadyForDispatch --> [*]
```

---

## Flow 5: Critical Panic Value Detection & Clinician Escalation

### 5.1 Defining Life-Threatening Panic Thresholds
When an observation violates defined critical safety boundaries, the system bypasses standard batched reporting and triggers the **Immediate Panic Protocol**.

| Test Parameter | LOINC Code | Critical Low Threshold | Critical High Threshold | Clinical Risk |
|---|---|---|---|---|
| **Platelet Count** | `777-3` | **< 20,000 /µL** | — | Spontaneous Dengue Shock / Hemorrhage |
| **Serum Potassium (K+)** | `2823-3` | **< 2.8 mEq/L** | **> 6.2 mEq/L** | Fatal Cardiac Arrhythmia / Asystole |
| **Hemoglobin (Hb)** | `718-7` | **< 6.5 g/dL** | — | Acute Decompensated Severe Anemia / Shock |
| **Serum Creatinine** | `2160-0` | — | **> 6.0 mg/dL** | Acute Kidney Injury / Uremic Encephalopathy |
| **Blood Glucose** | `2345-7` | **< 2.8 mmol/L** | **> 25.0 mmol/L** | Severe Hypoglycemic Coma / DKA |

```mermaid
flowchart TD
    subgraph EVALUATION["Result Evaluation"]
        R["Pathologist Signs Report"]
        C{"Observation in<br/>Critical Range?"}
    end

    subgraph ESCALATION["Multi-Tier Escalation Hierarchy"]
        E1["Flash Red Alert on Ordering Doctor's Screen\n(Audio Siren Chime on Local LAN)"]
        E2["Dispatch Priority Flash SMS to Doctor\n('URGENT: Plt 18,000 for Patient 9801...')"]
        E3{"Doctor Acknowledges<br/>Within 10 Minutes?"}
        E4["Escalate to On-Duty RMO / Medical Superintendent"]
        E5["Logged as 'Clinician Acknowledged'\n(Audit Trail Complete)"]
    end

    R --> C
    C -- Yes --> E1
    C -- Yes --> E2
    E1 & E2 --> E3
    E3 -- No --> E4
    E3 -- Yes --> E5
    C -- No --> DISP["Standard Patient Notification Queue"]
```

> [!CAUTION]
> **Strict Clinician Accountability**: If the ordering Medical Officer fails to click "Acknowledge Panic Alert" within **10 minutes**, the system automatically triggers a secondary escalation SMS to the **Residential Medical Officer (RMO)** and the Hospital Duty Superintendent, preventing avoidable deaths during busy night shifts.

---

## Flow 6: Privacy-Preserving Patient Notification & PIN Retrieval

### 6.1 Addressing the Shared Family Phone Challenge
Because **73.4% of households own a phone** but individual smartphone use in rural areas is **only 26%** (BBS 2026, GSMA 2024), phones are routinely accessed by husbands, in-laws, and neighbors. Sending explicit clinical findings via unencrypted SMS represents an acute privacy violation.

```mermaid
sequenceDiagram
    autonumber
    participant Engine as ReportReady Dispatcher
    participant SMSGW as National SMS Gateway (Teletalk/GP)
    actor Patient as Patient / Family Phone
    participant PWA as ReportReady Patient Portal (PWA)
    participant Edge as Hospital Cloud Server

    Engine->>Engine: Generate Cryptographic 4-Digit PIN (e.g., '4821')
    Engine->>Engine: Generate Short Link: 'https://dghs.care/r/7K9xQ'
    Engine->>SMSGW: Send Bangla Unicode SMS (Zero Medical Values)
    SMSGW-->>Patient: Dispatches SMS to 017XXXXXXXX

    Note over Patient: SMS: "কেরানীগঞ্জ ইউএইচসি: আপনার রিপোর্ট প্রস্তুত।<br/>রিপোর্ট দেখতে লিংকে ক্লিক করুন অথবা কাউন্টারে পিন দিন: 4821"

    alt Case A: Patient Has Smartphone
        Patient->>PWA: Clicks https://dghs.care/r/7K9xQ
        PWA-->>Patient: Prompts for Birth Year + 4-Digit PIN
        Patient->>PWA: Enters '1984' + '4821'
        PWA->>Edge: POST /api/v1/reports/verify
        Edge-->>PWA: 200 OK (Decrypts Bilingual Report PDF/HTML)
    else Case B: Basic Feature Phone / Low Literacy
        Patient->>Patient: Walks to Hospital Delivery Counter / Community Clinic
        Patient->>Tech: Shows SMS with PIN '4821' or Mentions Health ID
        Tech->>Edge: Enter PIN '4821' on Hospital Desk
        Edge-->>Tech: Instant Thermal Printout of Verified Diagnostic Summary
    end
```

---

## Flow 7: Clinician Trend Review in the 48-Second Consultation

### 7.1 Addressing the BMJ Consultation Constraint
With doctors constrained to an average of **48 seconds per patient** in public OPDs (BMJ Global Health), physicians have zero time to leaf through crumpled paper records.

When a returning patient presents their e-Health Card token in the consultation room, the clinician's workstation instantly renders a **Longitudinal Diagnostic Sparkline**:

```mermaid
xychart-beta
    title "Patient Platelet Count Trend Across 4 Days (Dengue Monitoring)"
    x-axis ["Day 1 (Admission)", "Day 2 (Morning)", "Day 3 (Critical)", "Day 4 (Recovery)"]
    y-axis "Platelets (x10^3 / uL)" 0 --> 160
    line [145, 78, 18, 55]
```

- **Visual Cues**: Trends are rendered with automated clinical color-coding:
  - 🟢 Normal Range (Green)
  - 🟡 Borderline / Moderately Abnormal (Yellow)
  - 🔴 Panic / Critical Threshold (Flashing Red)
- The doctor absorbs the patient's entire diagnostic trajectory in **under 3 seconds**, enabling rapid therapeutic decisions (e.g., ordering immediate platelet transfusion or IV fluids).

---

## Flow 8: Offline Laboratory Operation & Cloud Synchronization

### 8.1 Resilience Against Fiber Severance & Outages
At rural Upazila Health Complexes, local laboratory testing must continue unabated even when internet backhaul is down:
1. **Local Accessioning & Printing**: Barcode issuance, analyzer ingestion, and local paper slip generation function entirely on the hospital's local edge server.
2. **Transaction Spooling**: Reports signed during network outages are committed to the local encrypted SQLite datastore and tagged as `SYNC_PENDING`.
3. **Automated Resumption**: Once 3G/4G connectivity is re-established, the sync daemon streams batched FHIR bundles to the DGHS central repository and dispatches queued SMS notifications.

---

## Exception Workflows: Rejections, Stockouts & Failures

```mermaid
flowchart TD
    subgraph EXCEPTIONS["Operational & Diagnostic Exceptions"]
        EX1["Sample Rejected\n(Hemolyzed, Clotted, Insufficient)"]
        EX2["Reagent Stockout\n(43% of Public Labs)"]
        EX3["Analyzer Machine Breakdown\n(52% Idle Equipment)"]
        EX4["Doctor Unreachable\n(Critical Panic Alert Unacknowledged)"]
    end

    subgraph ACTIONS["Automated Protocol Interventions"]
        AC1["Flag in OpenELIS -> Trigger SMS to Patient:\n'নমুনা বাতিল হয়েছে। অনুগ্রহ করে ল্যাবে এসে পুনরায় রক্ত দিন।'"]
        AC2["Auto-Reroute Order to Nearest District Lab\n& Flag Shortage to DGHS eLMIS Logistics System"]
        AC3["Switch Modality to Manual Backup Protocol\n& Create Emergency Maintenance Ticket in YantraTrack"]
        AC4["Auto-Escalate to Residential Medical Officer (RMO)\n& Duty Sister-in-Charge via Urgent Flash Call"]
    end

    EX1 --> AC1
    EX2 --> AC2
    EX3 --> AC3
    EX4 --> AC4
```

### Exception Detail: Handling the 43% Reagent Shortage
When a lab technologist marks a reagent as *Out of Stock* (e.g., Dengue NS1 reagents during peak monsoon season), the system:
1. Instantly greys out the test on the OPD consultation screens of all Medical Officers at that facility, preventing doctors from ordering tests that cannot be performed.
2. Suggests alternate diagnostic strategies (e.g., Complete Blood Count + Hematocrit monitoring).
3. Transmits an automated requisition alert upstream to the DGHS Central Medical Stores Depot (CMSD) and eLMIS portal.
