# 🔄 Module 06: Application Flows — Medicine Availability & Inventory Lifecycle

> **Step-by-step operational workflows** covering in-consultation prescribing, dispensary dispensing, community clinic automated restocking, citizen SMS inquiries, cold-chain exception handling, adverse drug reaction (ADR) reporting, and counterfeit verification for Bangladesh.

---

## 📋 Table of Contents

- [End-to-End Patient Dispensing Journey](#end-to-end-patient-dispensing-journey)
- [In-Consultation Stock-Aware Prescribing Flow](#in-consultation-stock-aware-prescribing-flow)
- [Community Clinic Auto-Reorder & Anti-Lapse Flow](#community-clinic-auto-reorder--anti-lapse-flow)
- [Citizen SMS & USSD Stock/Price Inquiry Flow](#citizen-sms--ussd-stockprice-inquiry-flow)
- [Inter-Facility Expiry Balancing & Redistribution Flow](#inter-facility-expiry-balancing--redistribution-flow)
- [Cold-Chain Breach & Automatic Quarantine Flow](#cold-chain-breach--automatic-quarantine-flow)
- [Adverse Drug Reaction (ADR) Pharmacovigilance Flow](#adverse-drug-reaction-adr-pharmacovigilance-flow)
- [Model Pharmacy Onboarding & DGDA Accreditation Flow](#model-pharmacy-onboarding--dgda-accreditation-flow)
- [Anti-Counterfeit Batch Verification Flow](#anti-counterfeit-batch-verification-flow)
- [Audit & Dispense Reconciliation State Machine](#audit--dispense-reconciliation-state-machine)
- [Workflow Performance Indicators & SLA Targets](#workflow-performance-indicators--sla-targets)

---

## End-to-End Patient Dispensing Journey

### Scenario: Abdul Latif at Chaugachha Upazila Health Complex, Jashore

Abdul Latif (62 years old, Health ID: `BD-HID-2026-00812941`) has chronic hypertension and osteoarthritis. In Jashore, where **283 community clinics had zero medicines for 8 months**, Abdul travels to Chaugachha Upazila Health Complex (UHC) after his local clinic was unable to provide his essential medications.

```mermaid
sequenceDiagram
    autonumber
    participant P as "👴 Abdul Latif (Patient)"
    participant PHARM as "👨‍⚕️ UHC Dispensary Pharmacist"
    participant SCAN as "📷 Barcode / NFC Reader"
    participant M06 as "💊 Mod 06: AushodhSheba"
    participant M03 as "📝 Mod 03: Digital Prescription"
    participant M05 as "🏗️ Mod 05: Core Platform"
    participant DGDA as "⚖️ DGDA Price Registry"

    P->>PHARM: Presents Health Card / Token
    PHARM->>SCAN: Scans Health Card QR
    SCAN->>M03: Fetch Active Prescriptions for Health ID
    M03-->>PHARM: Returns Rx #RX-99214 (Amlodipine 5mg, Paracetamol 500mg, Glimepiride 2mg)
    
    PHARM->>M06: Check Live Dispensary Stock
    M06-->>PHARM: Stock Status: Amlodipine (✅ 1,200 tabs), Paracetamol (✅ 850 tabs), Glimepiride (❌ 0 tabs)
    
    Note over PHARM,M06: Automated Generic Substitution Analysis
    PHARM->>M06: Request Equivalent for Glimepiride 2mg
    M06->>DGDA: Lookup Equivalent Molecules & Fixed MRP
    DGDA-->>M06: Equivalent: Gliclazide 80mg (Gov Stock ✅ 400 tabs) OR Private MRP ৳7.50
    M06-->>PHARM: Alert: "বিকল্প হিসেবে গ্লিক্লাজাইড ৮০মিগ্রা উপলব্ধ (সরকারি স্টকে আছে)"
    
    PHARM->>PHARM: Dispenses Amlodipine 5mg (30 tabs) + Paracetamol 500mg (20 tabs) + Gliclazide (30 tabs)
    PHARM->>SCAN: Scans Batch 2D DataMatrix on Dispensed Packets
    SCAN->>M06: Deduct Stock (Batch: B-2026-09A, Exp: 12/2027)
    M06->>M05: Emit FHIR MedicationDispense Event
    M06-->>P: SMS Receipt: "চৌগাছা ইউএইচসি থেকে ৩টি ঔষধ সফলভাবে গ্রহণ করেছেন (মূল্য: ৳০.০০)"
```

> [!NOTE]
> **Resolution of the Jashore Crisis**: Under the old system, Abdul would have waited in line only to be told Glimepiride was out of stock, forcing him to buy from a private retail shop where prices are marked up **7% to 140%**. Module 06 performs point-of-dispense equivalent substitution, ensuring he leaves with complete treatment.

### Detailed Step-by-Step Breakdown

| Step | Actor | Action | System Response |
|------|-------|--------|-----------------|
| 1. Identification | Patient / Pharmacist | Scans Health Card QR or Enters Health ID | Validates demographic and retrieves active prescription queue |
| 2. Stock Verification | Module 06 Engine | Real-time check of dispensary ledger | Flags available vs out-of-stock items |
| 3. Generic Matching | Module 06 Matcher | Runs therapeutic equivalence logic | Recommends in-stock generic substitute with ৳0 cost |
| 4. Verification & FEFO | Pharmacist | Scans blister pack 2D DataMatrix | Confirms batch matches head of FEFO queue |
| 5. Core Reconciliation | Module 05 | Ingests `MedicationDispense` FHIR resource | Appends to patient's lifetime Longitudinal Health Record |
| 6. Citizen Notification | National SMS Gateway | Dispatches confirmation SMS in Bangla | Provides transparency and prevents ghost dispensing |

---

## In-Consultation Stock-Aware Prescribing Flow

Doctors in Bangladesh spend an average of **48 seconds per primary consultation**. They cannot afford to leave their prescribing screen to check stock registers or call the pharmacy. Module 06 injects inventory radar directly into the doctor's prescription interface in Module 03.

```mermaid
flowchart TD
    Doc["Doctor Enters Molecule / Brand Name\n(e.g., 'Amlodipine 5mg')"] --> CheckLocal{"Check UHC Dispensary\nLive Inventory"}
    
    CheckLocal -->|"In Stock (Count > 50)"| Green["🟢 Green Badge: Free Gov Supply\n(Available at Dispensary Counter)"]
    CheckLocal -->|"Low Stock (Count < 50)"| Yellow["🟡 Amber Badge: Low Stock (< 2 Days)\nReserve Slot for Critical Patient"]
    CheckLocal -->|"Zero Stock"| Red["🔴 Red Badge: Out of Stock\n(Trigger Generic Switch)"]

    Red --> GenEngine["Intelligent Generic Engine Analyzes:\n1. Same Molecule, Other Approved Brands\n2. Bioequivalent Molecule in Class\n3. Nearest Model Pharmacy Stock"]

    GenEngine --> Suggest["Display 1-Click Alternate:\n'বিকল্প: Gliclazide 80mg (স্টকে আছে ৪৫০টি)'\n'নিকটস্থ মডেল ফার্মেসি: মেসার্স জনতা ড্রাগ (০.৪ কিমি, মূল্য ৳৭.৫০)'"]

    Suggest --> Prescribe["Doctor Selects Option in 1-Click\nPrescription Encoded with FHIR MedicationRequest"]
    Green --> Prescribe
    Yellow --> Prescribe

    style Green fill:#00b894,color:#fff
    style Yellow fill:#fdcb6e,color:#2d3436
    style Red fill:#d63031,color:#fff
    style GenEngine fill:#0984e3,color:#fff
    style Suggest fill:#6c5ce7,color:#fff
```

### Prescribing Workflow Decision Matrix

| Stock Indicator | Dispensary Status | Action Presented to Physician | Clinical Consequence |
|-----------------|-------------------|--------------------------------|----------------------|
| **🟢 Gov Stock** | Sufficient (> 100 units) | Add directly to free dispensing queue | Patient pays ৳0 at government dispensary |
| **🟡 Low Buffer** | Critical buffer (10–50 units) | Warns doctor; allocates from emergency quota | Prioritized for destitute / high-risk patients |
| **🔴 Gov Depleted** | 0 units at facility | Displays verified alternative generic in stock | Avoids prescribing drugs the patient cannot get |
| **🔵 Private Model** | Verified private partner stock | Attaches DGDA maximum retail price cap (MRP) | Protects patient from private price gouging |

---

## Community Clinic Auto-Reorder & Anti-Lapse Flow

In 2026, **283 community clinics in Jashore were left without medicines for 8 months**, while simultaneously **94% of public health institutions left their procurement budgets unspent**. Module 06 eliminates manual paperwork and procurement paralysis through automated demand-driven requisitions.

```mermaid
stateDiagram-v2
    [*] --> HealthyStock: Dispensary Stock > 30 Days Buffer
    HealthyStock --> ReorderThresholdReached: Daily Dispensing Drops Stock < 20%
    
    state ReorderThresholdReached {
        [*] --> ComputeRunRate: Calculate 90-Day Consumption Velocity
        ComputeRunRate --> CheckUpazilaBuffer: Query UHC Central Store Balance
        CheckUpazilaBuffer --> GenerateDigitalIndent: Create Automated Requisition
    }

    ReorderThresholdReached --> UHFPOApprovalPending: Dispatch Electronic Indent to UHFPO
    UHFPOApprovalPending --> AutoApprovedEscalated: No Action in 72h + Budget Available
    UHFPOApprovalPending --> ManuallyApproved: UHFPO Signs via Digital Certificate

    AutoApprovedEscalated --> CentralWarehousePick: Order Transmitted to DGHS eLMIS Depot
    ManuallyApproved --> CentralWarehousePick: Order Transmitted to DGHS eLMIS Depot

    CentralWarehousePick --> InTransit: Dispatched via Upazila Logistics Vehicle
    InTransit --> DeliveredAtClinic: CHCP Scans Received QR Barcode
    DeliveredAtClinic --> HealthyStock: Reconciled & Restocked
```

### Auto-Reorder Trigger Parameters

- **Safety Stock Threshold**: Reorder automatically triggers when inventory falls below **14 days of average consumption**.
- **Anti-Budget-Lapse Escalation**: If an institution holds more than 30% of its annual medicine budget uncommitted by **March 31 (Q3)**, the system auto-generates bulk replenishment orders for the top 30 essential NCD medicines (Hypertension, Diabetes, Asthma) and notifies the Directorate General of Health Services (DGHS) and the Ministry of Health and Family Welfare (MoHFW).
- **Zero-Touch Indenting**: Eliminates physical paper signatures; approval uses two-factor authentication via the UHFPO's registered mobile device.

---

## Citizen SMS & USSD Stock/Price Inquiry Flow

Recognizing that **74% of rural citizens do not use smartphones**, Module 06 provides instant accessibility via standard SMS and USSD (`*16263#`) across all telecommunication operators (Grameenphone, Robi, Banglalink, Teletalk).

```mermaid
sequenceDiagram
    autonumber
    participant C as "📱 Citizen (Feature Phone)"
    participant TEL as "📡 Telecom SMS Gateway (16263)"
    participant M06 as "💊 Mod 06: Stock Engine"
    participant GEO as "🗺️ PostGIS Geolocation Service"
    participant DGDA as "⚖️ DGDA Price Registry"

    C->>TEL: Sends SMS: "MED Paracetamol 500 Savar"
    TEL->>M06: Ingest Parsed Query (Generic: Paracetamol 500mg, Location: Savar)
    M06->>GEO: Find Public Clinics & Model Pharmacies in Savar Upazila
    GEO-->>M06: 1 UHC (Savar), 3 Community Clinics, 4 Model Pharmacies
    M06->>M06: Check Live Balances
    M06->>DGDA: Fetch Official MRP for Paracetamol 500mg
    DGDA-->>M06: DGDA Fixed MRP: ৳1.20 per tablet
    
    M06-->>TEL: Compile Bilingual SMS Response
    TEL-->>C: SMS Delivery: "সাভার ইউএইচসি: সরকারি স্টক আছে (বিনামূল্যে)। নিকটস্থ মডেল ফার্মেসি: মেসার্স সেবা ড্রাগ (স্টক আছে, সর্বোচ্চ খুচরা মূল্য ১.২০ টাকা/ট্যাবলেট)। অনিয়ম দেখলে ১৬২৬৩ নম্বরে জানান।"
```

> [!TIP]
> **Bangla Voice USSD Alternative**:
> Dialing `*16263*6#` connects illiterate citizens to an Interactive Voice Response (IVR) tree in colloquial Bangla, allowing them to speak the medicine name and listen to nearby availability.

---

## Inter-Facility Expiry Balancing & Redistribution Flow

Under the traditional paper system, medicines frequently expire and are destroyed in one Upazila hospital warehouse, while a neighboring facility runs completely dry. Module 06 implements **Dynamic First-Expired-First-Out (FEFO) Balancing**.

```mermaid
flowchart LR
    A["Facility A (UHC Keshabpur)\nHolds 5,000 tabs Amlodipine\nExpiring in 60 Days\nDaily Consumption: 20 tabs"] -->|"System Detects\nImminent 3,800 tab Wastage"| Broker["Module 06 Redistribution Broker\n(Civil Surgeon Dashboard)"]
    
    Broker -->|"Automated Reallocation Order\nApproved by Civil Surgeon"| B["Facility B (UHC Manirampur)\nDaily Consumption: 120 tabs\nCurrent Stock: 0 tabs\n(Patients Returning Empty)"]
    
    Broker --> Logistics["DGHS Upazila Medical Van\nTransfers 3,500 Tablets\nWithin 48 Hours"]
    Logistics --> B

    style A fill:#fdcb6e,color:#2d3436
    style Broker fill:#0984e3,color:#fff
    style B fill:#00b894,color:#fff
    style Logistics fill:#6c5ce7,color:#fff
```

### Redistribution Rule Hierarchy

1. **60-Day Expiry Window**: Any essential medicine batch with < 60 days to expiry whose local run-rate will consume < 40% of the volume is flagged for mandatory transfer.
2. **Geographic Proximity**: The redistribution engine matches deficit facilities within a 25 km radius first to minimize transport overhead.
3. **Electronic Waybill**: Handover between pharmacists is cryptographically confirmed via digital signature and QR scanning.

---

## Cold-Chain Breach & Automatic Quarantine Flow

Thermolabile medicines—such as human insulins, oxytocin, rabies vaccines, and hepatitis immunoglobulins—lose potency rapidly during Bangladesh's frequent rural power outages. Module 06 enforces automated temperature surveillance.

```mermaid
sequenceDiagram
    autonumber
    participant Sensor as "🌡️ IoT BLE Temperature Sensor"
    participant Gateway as "📡 Hospital Telemetry Gateway"
    participant M06 as "💊 Mod 06 Inventory Core"
    participant Dispenser as "👨‍⚕️ Pharmacy Workstation"
    participant ColdChain_Admin as "🚨 Cold Chain Officer"

    Sensor->>Gateway: Broadcast Temp Telemetry (Current: 14.2°C, Excursion Duration: 42 mins)
    Gateway->>M06: Ingest Excursion Event (Refrigerator #REF-UHC-SAV-02)
    M06->>M06: Check Safe Limits (Threshold: 2.0°C - 8.0°C)
    Note over M06: Breach Confirmed! Temp > 8.0°C for > 30 mins
    
    M06->>M06: Mark Batches as QUARANTINED (Insulin Regular Batch #INS-2026-88)
    M06->>Dispenser: Lock Batch from Dispensing Queue (Audio Alert)
    Dispenser-->>Dispenser: Screen Locked: "কোল্ড-চেইন ত্রুটি! ইনসুলিন ব্যাচ লক করা হয়েছে।"
    M06->>ColdChain_Admin: Dispatch Emergency SMS Alert (Current Temp: 14.2°C)
    ColdChain_Admin->>M06: Inspects Refrigerator, Restores Generator, Submits Biological Assay Sign-off
```

---

## Adverse Drug Reaction (ADR) Pharmacovigilance Flow

When substandard or contaminated medicine batches enter the supply chain, rapid detection and recall are critical to preventing casualties.

```mermaid
flowchart TD
    PatientReaction["Patient Reports Severe Reaction\n(Urticaria / Anaphylaxis / Nausea)"] --> DoctorEntry["Doctor / CHCP Logs Adverse Event\nLinked to Health ID & Rx ID"]
    DoctorEntry --> AutoCorrelate["Module 06 Correlates Batch #\nScanned at Dispensing"]
    
    AutoCorrelate --> ThresholdCheck{"Are >= 3 ADR Reports\nLogged for Same Batch #\nin 7 Days?"}
    
    ThresholdCheck -->|"Yes (Cluster Detected)"| AutoQuarantine["Automatic National Batch Quarantine:\nAll Facilities Instructed to Halt Dispensing"]
    ThresholdCheck -->|"No (Isolated Incident)"| IndividualReview["Logged to Patient Allergy Profile\nReviewed by Hospital Pharmacist"]

    AutoQuarantine --> DGDA_Alert["High-Priority Telemetry Dispatched\nto DGDA Pharmacovigilance Cell"]
    DGDA_Alert --> LaboratoryAssay["Government Drug Testing Lab (DTL)\nConducts Chemical Purity Assay"]

    style PatientReaction fill:#ff7675,color:#fff
    style AutoCorrelate fill:#0984e3,color:#fff
    style ThresholdCheck fill:#fdcb6e,color:#2d3436
    style AutoQuarantine fill:#d63031,color:#fff
    style DGDA_Alert fill:#6c5ce7,color:#fff
```

---

## Model Pharmacy Onboarding & DGDA Accreditation Flow

To ensure private retail pharmacies comply with DGDA price caps and employ certified A-grade pharmacists (addressing the PMC 2025 finding that **only 7.56% of Dhaka pharmacies currently have a registered pharmacist**), Module 06 provides an accreditation onboarding gateway.

```
       ┌────────────────────────────────────────────────────────┐
       │ Retail Pharmacy Submits License & Pharmacist Reg (PC-B)│
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │ DGDA Pharmacy Verification Engine                      │
       │ (Cross-references Pharmacy Council of Bangladesh DB)   │
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │ Physical Geo-Verification by Upazila Drug Inspector    │
       │ (Validates Air Conditioning < 25°C & Digital POS)      │
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │ Accredited as "Model Pharmacy"                         │
       │ (Integrated into Citizen Stock Radar with Verified Tag)│
       └────────────────────────────────────────────────────────┘
```

---

## Anti-Counterfeit Batch Verification Flow

With an estimated **Tk 600 crore in counterfeit drugs** in the market, Module 06 incorporates consumer-driven authentication. Every licensed manufacturer in Bangladesh prints a unique 2D DataMatrix code containing the DGDA National Drug Code (NDC), Batch Number, Expiration Date, and a randomized cryptographic security hash.

```mermaid
sequenceDiagram
    autonumber
    participant Patient as "Citizen / Buyer"
    participant App as "CareLoop Mobile / Kiosk"
    participant M06 as "Mod 06 Anti-Fake Gateway"
    participant DGDA_REG as "DGDA Official Batch Vault"

    Patient->>App: Scans 2D DataMatrix / Scratch Code on Strip
    App->>M06: Verify Hash (NDC: 042-019-021, Batch: B2608, Hash: 9f8a2b...)
    M06->>DGDA_REG: Query Cryptographic Ledger
    alt Batch is Authentic & First Scan
        DGDA_REG-->>M06: Valid: Square Pharmaceuticals, Mfg: 01/2026, Exp: 12/2028
        M06-->>App: 🟢 "আসল ঔষধ: স্কয়ার ফার্মাসিউটিক্যালস, মেয়াদ: ডিসেম্বর ২০২৮, সর্বোচ্চ খুচরা মূল্য: ৳১২.০০"
    else Batch Code Already Scanned Multiple Times
        DGDA_REG-->>M06: Warning: Code Scanned 47 Times in Different Locations!
        M06-->>App: 🔴 "সতর্কতা! এই কোডটি পূর্বে ৪৭ বার স্ক্যান করা হয়েছে। নকল ঔষধের সম্ভাবনা রয়েছে। ক্রয় করবেন না!"
        M06->>M06: Trigger Alert to DGDA Drug Inspector (GPS Pin Logged)
    end
```

---

## Audit & Dispense Reconciliation State Machine

To prevent pilferage from government stocks into private retail channels, every unit entering a facility must be accounted for by an official FHIR `MedicationDispense` record linked to an authenticated Health ID.

```
       ┌────────────────────────┐
       │   Shipment Received    │
       │   (eLMIS Dispatch)     │
       └───────────┬────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │ In Facility Inventory  │◄─────────────┐
       │ (FEFO Batch Registered)│              │
       └───────────┬────────────┘              │
                   │                           │ (Restock / Return)
         ┌─────────┴─────────┐                 │
         │                   │                 │
         ▼                   ▼                 │
   ┌───────────┐       ┌───────────┐           │
   │ Dispensed │       │ Expired / │           │
   │ to Patient│       │ Damaged   │           │
   │ (Linked to│       │ (Audited  │           │
   │ Health ID)│       │ Write-off)│           │
   └───────────┘       └───────────┘           │
         │                   │                 │
         ▼                   ▼                 │
   ┌───────────────────────────────┐           │
   │ Immutable DGHS Audit Ledger   ├───────────┘
   └───────────────────────────────┘
```

---

## Workflow Performance Indicators & SLA Targets

To guarantee reliable operation across all 64 districts, Module 06 enforces strict Service Level Agreements (SLAs) for each lifecycle step.

| Application Workflow | Operational SLA | Fallback Strategy during Network Blackout |
|----------------------|-----------------|------------------------------------------|
| **Doctor Stock Check** | < 15 milliseconds | Local browser storage cache updated hourly |
| **Dispensary FEFO Deduction** | < 100 milliseconds | Offline SQLite ledger synced upon reconnection |
| **Citizen SMS Response** | < 5 seconds | Local telecom aggregator short-circuit cache |
| **Auto-Requisition Dispatch** | Instantaneous upon 20% trigger | Automatic batch queue during nightly maintenance window |
| **Cold-Chain Alert Delivery** | < 60 seconds to officer phone | Hardware buzzer on local refrigeration unit |
| **Counterfeit Scan Result** | < 500 milliseconds | Pre-computed cryptographic bloom filters on edge |
| **ADR Cluster Alarm** | < 10 minutes from 3rd report | Broadcast SMS to all district civil surgeons |
