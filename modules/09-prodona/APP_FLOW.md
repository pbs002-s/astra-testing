# 🔄 Prodona (প্রদান / অনুদান) — Application Flows & State Machines

## Module 09 — Verified Clinical Lifeline, Organ Pledge Coordination & Circular Asset Exchange

---

## 📋 Table of Contents

- [Architectural Overview of Prodona Flows](#architectural-overview-of-prodona-flows)
- [Journey 1: Fraud-Proof Patient Crowdfunding & Escrow Settlement](#journey-1-fraud-proof-patient-crowdfunding--escrow-settlement)
  - [Workflow Sequence Diagram](#workflow-sequence-diagram)
  - [Step-by-Step Execution Protocol](#step-by-step-execution-protocol)
- [Journey 2: National Organ & Corneal Donation Pledge to Transplant](#journey-2-national-organ--corneal-donation-pledge-to-transplant)
  - [End-to-End Organ Procurement Sequence Diagram](#end-to-end-organ-procurement-sequence-diagram)
  - [Statutory Brain-Death Protocol & NOK Accord](#statutory-brain-death-protocol--nok-accord)
- [Journey 3: Circular Medical Equipment & Surplus Medicine Giving](#journey-3-circular-medical-equipment--surplus-medicine-giving)
  - [Asset Redistribution Sequence Diagram](#asset-redistribution-sequence-diagram)
  - [Quality Control, Sanitization & Dispensing Protocol](#quality-control-sanitization--dispensing-protocol)
- [Journey 4: Emergency Surge & Institutional Zakat Allocation](#journey-4-emergency-surge--institutional-zakat-allocation)
  - [Shariah Tamleek Automated Allocation Sequence Diagram](#shariah-tamleek-automated-allocation-sequence-diagram)
- [Core Lifecycle State Machines](#core-lifecycle-state-machines)
  - [Crowdfunding Campaign State Machine](#crowdfunding-campaign-state-machine)
  - [Organ Pledge & Retrieval State Machine](#organ-pledge--retrieval-state-machine)
  - [Medical Asset & Medicine Inventory State Machine](#medical-asset--medicine-inventory-state-machine)
- [Bangla SMS & Notification Dispatch Engine](#bangla-sms--notification-dispatch-engine)
- [Exception Handling & Rollback Workflows](#exception-handling--rollback-workflows)

---

## Architectural Overview of Prodona Flows

Prodona coordinates complex interactions between four critical entities: impoverished patients seeking medical lifelines, treating clinicians and hospital billing desks, benevolent donors and Zakat foundations, and logistical hubs managing physical medical assets.

```mermaid
flowchart TD
    subgraph "External Actors"
        Patient["Destitute Patient / Family"]
        Doctor["Registered BMDC Physician"]
        Donor["Donor (bKash / Nagad / Card)"]
        NOK["Next-of-Kin (NOK)"]
        TransplantSurgeon["BSMMU / NIO Transplant Board"]
        VolunteerHub["Red Crescent / As-Sunnah Hub"]
    end

    subgraph "Prodona Workflows"
        W1["Journey 1: Clinical Crowdfunding & Escrow"]
        W2["Journey 2: Organ / Cornea Pledge & Transplant"]
        W3["Journey 3: Circular Equipment & Medicine Bank"]
        W4["Journey 4: Shariah Zakat Surge Allocation"]
    end

    Patient --> W1
    Doctor --> W1
    Donor --> W1
    Donor --> W4
    Patient --> W3

    Patient --> W2
    NOK --> W2
    TransplantSurgeon --> W2

    Donor --> W3
    VolunteerHub --> W3
```

---

## Journey 1: Fraud-Proof Patient Crowdfunding & Escrow Settlement

### Workflow Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Patient as Patient / Guardian
    actor Doctor as BMDC Physician
    participant HIS as Hospital System / EHR
    participant Prodona as Prodona Core API
    participant Escrow as National Escrow Ledger
    actor Donor as Philanthropist (MFS)
    participant Vendor as Hospital Accounts / Pharmacy

    Patient->>Doctor: Presents at Emergency / Ward with severe illness
    Doctor->>HIS: Generates Diagnosis (FHIR Condition) & Estimates Cost
    HIS->>Prodona: API Push: Verified Clinical Request (Health ID, Target: ৳150,000)
    Prodona->>Doctor: Requests Cryptographic Sign-off via Provider Portal
    Doctor->>Prodona: Digital Signature (BMDC Registration Verified)
    Note over Prodona: Campaign auto-created in PHYSICIAN_VERIFIED status
    Prodona->>Prodona: Publish to Crowdfunding Feed & Matching Algorithms
    Donor->>Prodona: Selects Patient & donates ৳5,000 via bKash/Nagad
    Prodona->>Escrow: Funds credited to Patient Escrow Sub-Wallet (Zero cash to patient)
    Prodona-->>Donor: SMS & Digital Receipt with Tax Deduction & Tracking Hash
    Note over Escrow: Goal Reached (৳150,000 in Escrow)
    Vendor->>Prodona: Submits Itemized Hospital Voucher & Pharmacy Invoices
    Prodona->>Doctor: Ping: Confirm procedure completed / drugs administered
    Doctor->>Prodona: Confirmation Sign-off
    Prodona->>Escrow: Release Payment directly to Hospital/Pharmacy Bank Account
    Prodona->>Patient: SMS: Hospital Bill Settled (বকেয়া পরিশোধ সম্পন্ন)
    Prodona->>Donor: Transparent Utilization Report & Discharge Summary Notification
```

### Step-by-Step Execution Protocol

1. **Clinical Initiation**: When an indigent patient arrives at a participating medical college (e.g., Dhaka Medical College Hospital), the attending physician creates an electronic treatment plan. If the patient's family cannot afford surgery, chemotherapy, or ICU care, the physician toggles the `Request Prodona Assistance` flag.
2. **Clinical Verification & Evidence Ingestion**:
   - Prodona connects to **Module 07 (Health Card)** to extract socioeconomic status (checking safety-net indicators, BISP data, or hospital social welfare officer recommendation).
   - Prodona pulls verified diagnostic reports from **Module 02 (Test Reports)** and prescriptions from **Module 03 (Prescriptions)**.
   - The treating specialist signs an electronic cost estimate certifying the clinical necessity and estimated duration of treatment.
3. **Automated Campaign Launch**: The campaign is published with an anonymized or consent-approved patient profile, verified diagnosis tags (e.g., `Acute Myeloid Leukemia`, `Tetralogy of Fallot`), itemized cost breakdown, and treating hospital details.
4. **Multi-Channel Fundraising**:
   - Micro-donors contribute via **bKash Tokenized Checkout**, **Nagad**, **Rocket**, or debit/credit cards.
   - Institutional donors (Zakat funds and corporate CSR desks) match donations or fund campaigns in single bulk transactions.
5. **Direct Escrow Payout**:
   - Donated funds accumulate in an escrow bank account supervised by Bangladesh Bank regulations.
   - Funds **never flow into the personal mobile wallet or bank account of the patient or their relatives**, eliminating predatory siphoning by middlemen.
   - When the hospital billing department issues invoices for surgical consumables, bed charges, or medicines, Prodona executes an automated Electronic Funds Transfer (BEFTN/RTGS/NPSB) directly to the verified hospital or pharmacy bank account.

> [!CAUTION]
> Under no circumstances does Prodona disburse un-itemized liquid cash to patients. In the event of emergency prescription purchases from outside pharmacies, disbursement occurs via single-use digital payment vouchers redeemable only at licensed partner pharmacies connected to **Module 06 (Medicine Stock)**.

---

## Journey 2: National Organ & Corneal Donation Pledge to Transplant

### End-to-End Organ Procurement Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Citizen as Citizen (Donor)
    actor NOK as Registered Next-of-Kin
    participant Portal as BD Health Portal
    participant Registry as Organ/Tissue Registry
    actor ICU as ICU Intensivist Board
    participant NTCU as BSMMU Transplant Team
    actor Recipient as Waiting Recipient

    Citizen->>Portal: Authenticates via NID & BD Health Card
    Citizen->>Registry: Submits Digital Organ Pledge (Cornea, Kidney, Liver, Heart)
    Registry->>NOK: Automated SMS & Letter: Donor Pledge Acknowledgment Notice
    NOK-->>Registry: Pre-consents / Confirms Awareness
    Note over Citizen, Registry: Years pass; Citizen experiences critical brain trauma
    ICU->>ICU: Statutory 3-Doctor Board declares Brain Death
    ICU->>Registry: Scans Patient Health ID -> Active Organ Pledge Triggered
    Registry->>ICU: Display Legal Pledge & NOK Direct Contact Details
    ICU->>NOK: Bedside Counseling & Formal Written Re-affirmation
    NOK->>Registry: Statutory Bedside Consent Recorded
    Registry->>NTCU: Urgent Organ Harvest Alert: BSMMU & NIO Eye Bank Dispatched
    NTCU->>Registry: Query Waiting List: HLA & MELD Matching Algorithms
    Registry-->>NTCU: Ranked Recipient Matches (Patient ID: 9942, MELD: 32)
    NTCU->>Recipient: Emergency Alert: Report to BSMMU Transplant Theater
    NTCU->>NTCU: Surgical Harvest, Preservation & Successful Transplantation
    Registry->>NOK: National Certificate of Gratitude (মর্যাদাপূর্ণ নাগরিক সম্মাননা)
```

### Statutory Brain-Death Protocol & NOK Accord

1. **Digital Pledge Registration**: Any Bangladeshi citizen aged 18 or above can register their organ donation pledge via the BD Health Card App. The pledge allows modular selection:
   - *Option A*: Corneas only (চক্ষুদান)
   - *Option B*: Solid organs (Kidneys, Liver, Lungs, Heart, Pancreas)
   - *Option C*: Tissues (Skin, Bone)
   - *Option D*: Full Anatomical Body Donation for Medical Education.
2. **Next-of-Kin (NOK) Socialization**: To resolve the primary hurdle in Bangladesh—where grieving relatives reject a deceased member's pledge—the system automatically registers two immediate family members as legal emergency contacts. A gentle, culturally sensitive confirmation is sent in Bangla, opening family dialogue while the donor is alive and healthy.
3. **ICU Brain-Death Verification**:
   - In accordance with the **Human Organ Transplantation Act (Amendment 2018)**, a patient admitted to an intensive care unit who shows signs of brain stem death undergoes two clinical apnea tests separated by 6 hours.
   - The Brain Death Declaration Committee (comprising a General Physician, a Neurologist/Neurosurgeon, and an Anaesthesiologist, none of whom belong to the transplant surgical team) enters the digital certification into Prodona.
4. **Algorithmic Recipient Matching**:
   - *Kidneys*: Matched by ABO compatibility, HLA-A, B, DR antigen mismatch count, panel reactive antibody (PRA) titers, and waiting time.
   - *Liver*: Matched based on MELD (Model for End-Stage Liver Disease) score and pediatric emergency status.
   - *Corneas*: Allocated to the nearest regional eye bank (Sandhani / NIO&H) for keratoplasty within the statutory 6-hour post-mortem window.

---

## Journey 3: Circular Medical Equipment & Surplus Medicine Giving

### Asset Redistribution Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Donor as Surplus Asset Donor
    participant Prodona as Prodona Asset Portal
    actor Depot as Volunteer Depot (BDRCS / As-Sunnah)
    participant Inventory as Circular Asset Registry
    actor Patient as Impoverished Patient
    actor Doctor as Prescribing Physician

    Donor->>Prodona: Register Item (Photo, Barcode, Expiry Date, Serial Number)
    Prodona->>Donor: Generate Drop-off Pass & Assign Nearest Hub
    Donor->>Depot: Hands over Item (e.g., Oxygen Concentrator / Cancer Drug)
    Depot->>Depot: Pharmacist / Biomedical Tech: QA & Sanitization Protocol
    Depot->>Inventory: QA Passed -> Assign QR Asset Tag & Add to Active Pool
    Patient->>Doctor: Doctor prescribes home oxygen therapy / specialized drug
    Doctor->>Prodona: Requests Equipment / Medication Lifeline for Patient ID
    Prodona->>Inventory: Match Algorithm: Proximity + Socioeconomic Scoring
    Inventory-->>Depot: Match Found: Dispatch Work Order for Patient ID
    Depot->>Patient: Courier Handover / In-Person Collection & Digital Sign-off
    Note over Patient, Inventory: Patient uses equipment during 3-month recovery
    Patient->>Depot: Returns durable equipment upon recovery
    Depot->>Inventory: Re-sterilize & Return to Available Circulation Pool
```

### Quality Control, Sanitization & Dispensing Protocol

```mermaid
flowchart TD
    A["Donor registers Surplus Asset<br/>(Medicine / Equipment)"] --> B{"Asset Type?"}
    
    B -->|Durable Equipment<br/>(Wheelchair, Bed, Concentrator)| C["Biomedical Engineering QA<br/>• Mechanical integrity check<br/>• Electrical safety & motor test<br/>• Deep UV/chemical sterilization"]
    B -->|Prescription Medicine<br/>(Chemotherapy, Inhalers)| D{"Pharmacological Screening<br/>• Unbroken blister/vial seal?<br/>• > 6 months to expiration?<br/>• Temperature strip intact?"}
    
    D -->|Fails Safety Check| E["Safe Hazardous Disposal<br/>(Waste Protocol)"]
    D -->|Passes Safety Check| F["Barcode Tagged & Cold-Chain Vault"]
    C --> G["Affix Dynamic QR Code & Log Serial Number"]
    
    F --> H["Matched to Verified Patient Lifeline Request"]
    G --> H
    H --> I["Secure Tracked Handover with Digital Receipt"]
```

1. **Surplus Medicine Criteria**:
   - Only sealed, blister-packed tablets, capsules, or unopened sterile vials with manufacturer seals are accepted.
   - Medicines must possess a minimum of **180 days of remaining shelf life** at the date of intake.
   - High-risk narcotics and Schedule-II controlled substances (e.g., Morphine, Pethidine) are strictly prohibited from peer-to-peer donation and must follow statutory hospital disposal.
2. **Durable Medical Equipment Lifecycle**:
   - Each donated device (wheelchair, hospital bed, oxygen concentrator, CPAP/BiPAP) is tagged with a durable QR code linked to its maintenance and sanitization history.
   - Equipment is issued on a **rotational loan contract** (3 to 6 months), requiring return upon patient recovery or demise, ensuring infinite cyclic utility.

---

## Journey 4: Emergency Surge & Institutional Zakat Allocation

### Shariah Tamleek Automated Allocation Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Foundation as Zakat Foundation (As-Sunnah / CZM)
    participant Gateway as Prodona Zakat Gateway
    participant Shariah as Shariah Eligibility Engine
    participant Queue as Emergency Treatment Queue
    participant Hospital as Hospital Billing & Pharmacy
    actor Patient as Deserving Patient (Mustahiq)

    Foundation->>Gateway: Disburses Zakat Tranche (e.g., ৳5,000,000)
    Gateway->>Gateway: Funds isolated in Non-Commingled Zakat Vault
    Queue->>Shariah: Stream of Unfunded Emergency Surgery & Cancer Requests
    Shariah->>Shariah: Verify Mustahiq Status (Income < Nisab, Non-Syed, Destitute)
    Shariah->>Patient: Issue Digital Authorization Voucher (Tamleek Contract)
    Patient-->>Shariah: Digital / SMS Acceptance: "I authorize payment of my bills"
    Shariah->>Hospital: Immediate Escrow Settlement of Surgical Kit & Pharmacy Bill
    Hospital->>Patient: Performs Emergency Surgery with zero out-of-pocket cost
    Gateway->>Foundation: Granular Zakat Audit Dossier (Anonymized Patient + Hospital Invoices)
```

1. **The Principle of Tamleek (تمليك)**: To satisfy orthodox Islamic jurisprudence, the ownership of Zakat must be unconditionally transferred to an eligible poor individual (*Mustahiq*). Prodona facilitates this electronically:
   - When a patient is verified as falling below the *Nisab* threshold (verified via Module 07 socioeconomic indicators), Prodona issues a personal digital healthcare grant voucher.
   - By clicking a secure SMS link or biometric confirmation at the hospital desk, the patient accepts ownership of the voucher and immediately executes an agency contract (*Wakalah*) authorizing Prodona to pay the hospital on their behalf.
2. **Non-Commingling of Funds**: Zakat capital is strictly segmented in dedicated Islamic banking escrow accounts, completely separated from secular corporate CSR or general interest-bearing accounts.

---

## Core Lifecycle State Machines

### Crowdfunding Campaign State Machine

```mermaid
stateDiagram-v2
    [*] --> DRAFT : Patient / Social Worker drafts campaign
    DRAFT --> PHYSICIAN_VERIFIED : BMDC Doctor signs clinical diagnosis & cost estimate
    DRAFT --> REJECTED : Clinical claims unverified / duplicate
    
    PHYSICIAN_VERIFIED --> FUNDING_ACTIVE : Published to national platform & social channels
    
    state FUNDING_ACTIVE {
        [*] --> COLLECTING
        COLLECTING --> SURGE_BOOSTED : Highlighted for emergency surgery / Zakat match
        SURGE_BOOSTED --> COLLECTING : Surge window completed
    }
    
    FUNDING_ACTIVE --> FUNDED : 100% target goal achieved
    FUNDING_ACTIVE --> PARTIALLY_DISBURSED : Critical intermediate milestone reached (e.g. Day 3 ICU bill)
    PARTIALLY_DISBURSED --> FUNDING_ACTIVE : Remainder goal continues funding
    PARTIALLY_DISBURSED --> FUNDED : Total target reached
    
    FUNDED --> DISBURSED : Final hospital & pharmacy invoices settled via Escrow
    DISBURSED --> AUDITED : Financial audit & patient clinical outcome logged
    AUDITED --> [*]
    
    FUNDING_ACTIVE --> CANCELLED : Patient expired / Alternative government aid received
    CANCELLED --> REFUNDED_OR_REALLOCATED : Donors choose refund or reallocation to identical emergency
```

### Organ Pledge & Retrieval State Machine

```mermaid
stateDiagram-v2
    [*] --> PLEDGED : Citizen signs digital pledge on BD Health Card
    PLEDGED --> NOK_ACKNOWLEDGED : Next-of-Kin receives notice & confirms awareness
    PLEDGED --> NOK_DISPUTED : Family registers moral objection (Counseling triggered)
    NOK_DISPUTED --> NOK_ACKNOWLEDGED : Resolved through family mediation
    
    NOK_ACKNOWLEDGED --> TRIGGERED_ICU_ALERT : Patient admitted in ICU with Glasgow Coma Scale <= 3
    
    state TRIGGERED_ICU_ALERT {
        [*] --> APNEA_TEST_1
        APNEA_TEST_1 --> APNEA_TEST_2 : 6-hour observation period
        APNEA_TEST_2 --> BRAIN_DEATH_CERTIFIED : 3-Doctor Independent Board sign-off
    }
    
    BRAIN_DEATH_CERTIFIED --> BEDSIDE_RECONFIRMED : Next-of-Kin bedside reaffirmation signed
    BEDSIDE_RECONFIRMED --> RECIPIENT_MATCHED : Algorithmic HLA / MELD matching complete
    RECIPIENT_MATCHED --> HARVESTING : Surgical teams retrieve organs under sterile protocol
    HARVESTING --> TRANSPLANTED : Graft successfully reperfused in recipient
    TRANSPLANTED --> HONORED_ARCHIVE : State memorial tribute logged & family honored
    HONORED_ARCHIVE --> [*]
    
    PLEDGED --> REVOKED : Citizen cancels pledge during lifetime
    REVOKED --> [*]
```

### Medical Asset & Medicine Inventory State Machine

```mermaid
stateDiagram-v2
    [*] --> REGISTERED : Donor submits item details & photographs
    REGISTERED --> LOGISTICS_DROP_OFF : Delivered to BDRCS / As-Sunnah Depot
    
    state LOGISTICS_DROP_OFF {
        [*] --> PHYSICAL_INTAKE
        PHYSICAL_INTAKE --> PHARMACEUTICAL_QA : Chemical / Seal inspection
        PHYSICAL_INTAKE --> BIOMEDICAL_QA : Mechanical / Electrical safety check
    }
    
    PHARMACEUTICAL_QA --> DEFECTIVE_DESTROYED : Expired, open seal, or failed test
    BIOMEDICAL_QA --> DEFECTIVE_DESTROYED : Unsafe motor, broken chassis
    DEFECTIVE_DESTROYED --> [*]
    
    PHARMACEUTICAL_QA --> IN_INVENTORY : QR tagged & sterile storage
    BIOMEDICAL_QA --> IN_INVENTORY : Sterilized & tested functional
    
    IN_INVENTORY --> ALLOCATED : Matched to verified patient prescription
    ALLOCATED --> DISPATCHED : Out for delivery / ready for pickup
    DISPATCHED --> RECEIVED_CONFIRMED : Patient scans QR code & receives asset
    
    RECEIVED_CONFIRMED --> RETURNED_DEPOT : Durable equipment returned after recovery
    RETURNED_DEPOT --> IN_INVENTORY : Re-sanitized & recalibrated for next patient
    RECEIVED_CONFIRMED --> EXHAUSTED : Medicine consumed by patient
    EXHAUSTED --> [*]
```

---

## Bangla SMS & Notification Dispatch Engine

Prodona features an automated, localized omnichannel notification dispatch system supporting Bangla Unicode SMS, push notifications, and automated IVR (Interactive Voice Response) calls.

```mermaid
flowchart LR
    Event["System Trigger Event"] --> Engine["Notification Router"]
    Engine --> SMS["Bangla SMS Gateway (Teletalk / GP)"]
    Engine --> Push["BD Health Card App Push Notification"]
    Engine --> WhatsApp["Prodona Official WhatsApp Bot"]
    
    SMS --> PatientPhone["Patient / Donor Feature Phone"]
    Push --> SmartApp["Smartphone User"]
    WhatsApp --> HighValue["Institutional Zakat / NOK Alert"]
```

### Notification Payload Specifications

| Trigger Event | Recipient | Channel | Bangla Content Template |
|---|---|---|---|
| **Campaign Verified & Live** | Patient / Guardian | SMS | `[প্রদান] আপনার চিকিৎসা অনুদান ক্যাম্পেইন #PR-8821 অনুমোদিত হয়েছে। ডা. রফিকুল ইসলাম ব্যয় নির্ধারণ করেছেন ৳১,৫০,০০০। অনুদান ট্র্যাকিং লিঙ্ক: prodona.gov.bd/c/8821` |
| **Donation Received** | Donor | SMS | `[প্রদান] ধন্যবাদ! শিশু রাফসান (ব্লাড ক্যান্সার)-এর চিকিৎসায় আপনার ৳২,০০০ অনুদান সংরক্ষিত হয়েছে। আপনার টাকা সরাসরি এভারকেয়ার হাসপাতাল বিল হিসেবে ছাড় হবে। TXID: BK-994102` |
| **Hospital Escrow Settled** | Patient & Donor | SMS | `[প্রদান] সুসংবাদ! রাফসানের ৩য় কেমোথেরাপি বিল ৳৪৫,০০০ আজ সরাসরি ল্যাবএইড হাসপাতালকে পরিশোধ করা হয়েছে। ভাউচার দেখতে: prodona.gov.bd/v/4412` |
| **Organ Pledge Acknowledged** | Next-of-Kin (NOK) | SMS | `[জাতীয় অঙ্গদান রেজিস্ট্রি] আপনার পরিবারের সদস্য মোঃ কামরুল হাসান জাতীয় স্বাস্থ্য কার্ডে মরণোত্তর চক্ষু ও কিডনি দানের অঙ্গীকার করেছেন। বিস্তারিত তথ্য: prodona.gov.bd/pledge/info` |
| **Urgent Organ Harvest Alert** | Transplant Surgeon | IVR + App | `[জরুরি অ্যালার্ট] বিএসএমএমইউ আইসিইউ বেড-৪ এ ব্রেইন ডেথ নিশ্চিত হয়েছে। দাতা রক্তের গ্রুপ O+ve, ২ জন শীর্ষ ম্যাচিং গ্রহীতার তালিকা প্রপার্টি ড্যাশবোর্ডে প্রস্তুত। দ্রুত যোগাযোগ করুন।` |
| **Surplus Medicine Matched** | Patient | SMS | `[প্রদান মেডিসিন ব্যাংক] আপনার প্রেসক্রিপশন অনুযায়ী মেরোপেনেম ইনজেকশন (৫টি ভায়াল) প্রস্তুত রয়েছে। অনুগ্রহ করে রেড ক্রিসেন্ট ডিপো, কাকরাইল থেকে সংগ্রহ করুন। কোড: MED-5501` |

---

## Exception Handling & Rollback Workflows

### 1. Patient Demise Before Campaign Completion
- If a patient passes away while a campaign is actively raising funds:
  - The attending physician logs the demise on Module 07, which immediately halts incoming donations.
  - Incurred hospital and morgue fees are settled directly from the accumulated escrow balance.
  - Surplus funds remaining in the escrow sub-wallet are governed by donor consent chosen at payment:
    - *Policy A (Default)*: Transferred to the **Prodona Emergency Pediatric / ICU Reserve Fund** to save an identical matched patient.
    - *Policy B*: Pro-rata refund to the donor's original bKash/Nagad account.

### 2. Overfunding Resolution
- Campaigns automatically close upon reaching **100% of verified clinical cost**.
- If multiple donors checkout concurrently causing overfunding (e.g. 103% achieved):
  - Excess funds are automatically swept into the patient's **Post-Treatment Rehabilitation & Medicine Sub-Account** (up to 15% above estimate) to fund post-operative follow-up visits and rehabilitation.
  - Any amount beyond 115% is automatically transferred to the National Zakat/Emergency Pool with notification sent to the donor.

### 3. Next-of-Kin Bedside Objection During Brain Death
- While the legal framework permits cadaveric retrieval based on prior registered consent, bedside emotional refusal by family members remains a sensitive issue in Bangladesh.
- **Workflow**:
  1. Trigger an immediate bedside visit by a certified **Transplant Grief Counselor** and a certified Islamic scholar from the **Islamic Foundation Bangladesh**.
  2. Educate the family on the posthumous ongoing reward (*Sadaqah Jariyah - সদাকায়ে জারিয়া*) and the legal sanctity of the deceased's personal will (*Wasiyyat*).
  3. If consensus cannot be achieved within 2 hours without exacerbating grief or physical confrontation, the procedure is respectfully stood down and flagged as `NOK_REFUSED`, logging the clinical and sociological rationale for national registry analytics.

---

> [!TIP]
> **Developer Implementation**: All financial transitions between states must be signed using the **Prodona Escrow Ledger Event Bus**. Always verify HMAC-SHA256 signatures on webhooks received from bKash and Nagad before triggering campaign state changes.
