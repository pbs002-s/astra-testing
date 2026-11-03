# Module 08: Blood Bank (Prodona / প্রদানা) — Application & Clinical Workflows

## 📋 Table of Contents

- [End-to-End System Flow Architecture](#end-to-end-system-flow-architecture)
- [Flow 1: Voluntary Donor Intake, Health ID Linkage & TTI Screening](#flow-1-voluntary-donor-intake-health-id-linkage--tti-screening)
- [Flow 2: Whole Blood Ingestion, Component Fractionation & Barcoding](#flow-2-whole-blood-ingestion-component-fractionation--barcoding)
- [Flow 3: Real-Time Hospital Stock Aggregation & Regional Visibility](#flow-3-real-time-hospital-stock-aggregation--regional-visibility)
- [Flow 4: Emergency ER Requisition, Electronic Crossmatch & Custody Handover](#flow-4-emergency-er-requisition-electronic-crossmatch--custody-handover)
- [Flow 5: Rare Blood & Bombay Phenotype Emergency Mobilization](#flow-5-rare-blood--bombay-phenotype-emergency-mobilization)
- [Flow 6: Red Alert Emergency Geo-Broadcast (Zero Stock Lifeline)](#flow-6-red-alert-emergency-geo-broadcast-zero-stock-lifeline)
- [Flow 7: FIFO Expiry Tracking, Cold-Chain IoT Logging & Biohazard Discard](#flow-7-fifo-expiry-tracking-cold-chain-iot-logging--biohazard-discard)
- [Flow 8: Adverse Transfusion Reaction & Hemovigilance Investigation](#flow-8-adverse-transfusion-reaction--hemovigilance-investigation)
- [Error Handling & Edge Case Matrix](#error-handling--edge-case-matrix)

---

## End-to-End System Flow Architecture

```mermaid
flowchart TD
    DONOR["Voluntary / Replacement Donor"] --> INTAKE["1. Donor Intake & Health ID Check<br/>(90-Day Deferral Rule Enforced)"]
    INTAKE --> DRAW["2. Phlebotomy (450 mL Bag)"]
    DRAW --> TTI["3. Mandatory 5-Pathogen TTI Testing<br/>(HIV, HBV, HCV, Syphilis, Malaria)"]
    DRAW --> COMP["4. Component Fractionation<br/>(Refrigerated Centrifuge)"]
    
    COMP --> DERIVE["Derived Units:<br/>• PRBC (Red Cells)<br/>• FFP (Plasma)<br/>• Platelets (RDP)"]
    
    TTI --> RELEASE{"TTI Results Clean?"}
    RELEASE -->|No (Positive)| BIOHAZARD["Quarantine & Autoclave Discard"]
    RELEASE -->|Yes (Negative)| INVENTORY["5. Real-Time Hospital Blood Inventory<br/>(Available for Clinical Order)"]
    
    DERIVE --> INVENTORY
    
    PATIENT["ER / OT Patient in Need<br/>(Trauma, PPH, Thalassemia)"] --> REQ["6. Emergency Requisition via Health ID"]
    REQ --> SEARCH["7. Check Hospital Blood Grid"]
    
    SEARCH -->|In Stock Locally| MATCH["8. Crossmatch & Electronic Hold"]
    SEARCH -->|Out of Stock Locally| INTER_HOSP["9. Inter-Hospital Transfer or<br/>Emergency Geo-Broadcast"]
    
    MATCH --> DISPATCH["10. Cold-Chain Verified Handover"]
    INTER_HOSP --> MATCH
    DISPATCH --> TRANSFUSION["11. Bedside Transfusion & Hemovigilance"]

    style DONOR fill:#3498db,color:#fff
    style INVENTORY fill:#27ae60,color:#fff
    style PATIENT fill:#e74c3c,color:#fff
    style BIOHAZARD fill:#c0392b,color:#fff
    style TRANSFUSION fill:#2ecc71,color:#fff
```

---

## Flow 1: Voluntary Donor Intake, Health ID Linkage & TTI Screening

### Overview
This flow ensures that no donor is bled unless medically fit, prevents repeat donations within the mandatory deferral window (90 days for adult males, 120 days for adult females), and binds all laboratory safety tests directly to the national Master Client Index.

```mermaid
sequenceDiagram
    autonumber
    actor D as Donor (রক্তদাতা)
    participant Desk as Blood Bank Receptionist
    participant App as Prodona Terminal
    participant HC as Module 07: Health Card MCI
    participant Lab as Transfusion Serology Lab
    participant Safe as Secure TTI Quarantine Vault

    D->>Desk: Arrives at facility / mobile blood drive
    Desk->>App: Scan Donor Health Card QR / Enter NID
    App->>HC: Validate 9-Series Health ID
    HC-->>App: Demographic Profile & Past Donation History
    
    App->>App: Check Deferral Status (Rule: Last donation > 90 days ago?)
    alt Donor in Deferral Period
        App-->>Desk: ⚠️ REJECT: "রক্তদানের সময় হয়নি। আর [X] দিন পর দিতে পারবেন।"
    else Eligible
        Desk->>App: Record Clinical Triage (Weight > 45kg, BP, Hb > 12.5 g/dL)
        App->>App: Issue Donation Identification Number (DIN / ISBT 128)
        Desk->>D: Directs to Phlebotomy Couch (450 mL CPDA-1 Collection)
        
        par Sample Tubes to Testing
            App->>Lab: Send Pilot Tubes for ABO/Rh Confirmation & 5 TTIs
            Lab->>Lab: Run Automated ELISA/CLIA (HIV, HBsAg, HCV, VDRL, MP)
            Lab->>Safe: Post TTI Lab Results (Cryptographically Signed)
        and Whole Blood to Component Lab
            Desk->>Safe: Transfer Whole Blood Bag to Quarantine Cold Room (4°C)
        end
    end
```

### Preconditions & Eligibility Rules
- **Minimum Weight**: 45 kg (females), 50 kg (males).
- **Hemoglobin Level**: $\ge 12.5\text{ g/dL}$ for females, $\ge 13.0\text{ g/dL}$ for males (screened via copper sulfate specific gravity or digital HemoCue).
- **Pulse & Blood Pressure**: Systolic 100–140 mmHg, Diastolic 60–90 mmHg, regular pulse 60–100 bpm.
- **Permanent Deferrals**: History of jaundice after age 11, chronic hepatitis B/C, HIV, cardiac disease, epilepsy, cancer.
- **Temporary Deferrals**: Recent tattoo/piercing (6 months), malaria treatment (3 months), dengue recovery (6 months), typhoid (12 months), dental extraction (72 hours).

---

## Flow 2: Whole Blood Ingestion, Component Fractionation & Barcoding

### Overview
Modern clinical practice requires that whole blood be fractionated into its sub-components within **8 hours of collection** to preserve labile clotting factors and viable platelets.

```mermaid
flowchart TD
    WB["Fresh Whole Blood Bag (450 mL)<br/>Stored at 20°C–24°C (Max 8 Hours)"] --> SPIN1["Heavy Spin Centrifuge<br/>(4,000 RPM for 10 min at 20°C)"]
    
    SPIN1 --> PLASMA_EXTRACT["Automated Plasma Extractor"]
    PLASMA_EXTRACT --> PRBC["Packed Red Blood Cells (PRBC)<br/>Add 100 mL SAGM Additive Solution<br/>Volume: 250–300 mL | Hct: 55–65%"]
    PLASMA_EXTRACT --> PRP["Platelet-Rich Plasma (PRP)"]
    
    PRBC --> PRBC_STORE["Refrigerated Blood Bank Refrigerator<br/>2°C to 6°C | Shelf Life: 42 Days"]
    
    PRP --> SPIN2["Light Spin Centrifuge<br/>(1,800 RPM for 10 min at 22°C)"]
    SPIN2 --> PLT["Random Donor Platelet (RDP)<br/>Volume: 50–70 mL<br/>Platelet Agitator (20°C–24°C)<br/>Shelf Life: ONLY 5 DAYS"]
    SPIN2 --> PPP["Platelet-Poor Plasma (PPP)"]
    
    PPP --> BLAST_FREEZE["Blast Freezer (-40°C in 45 min)"]
    BLAST_FREEZE --> FFP["Fresh Frozen Plasma (FFP)<br/>Deep Freezer (-25°C or colder)<br/>Shelf Life: 12 Months"]
    
    FFP -.-> THAW_CRYO["Slow Thaw at 4°C -> Centrifuge"]
    THAW_CRYO --> CRYO["Cryoprecipitate (Factor VIII + Fibrinogen)<br/>Shelf Life: 12 Months at -25°C"]

    style WB fill:#c0392b,color:#fff
    style PRBC_STORE fill:#e74c3c,color:#fff
    style PLT fill:#f1c40f,color:#333
    style FFP fill:#f39c12,color:#fff
    style CRYO fill:#3498db,color:#fff
```

### Digital Barcode Generation (National DIN Standard)
Each component bag receives a high-density GS1 / ISBT 128 compliant 2D DataMatrix label encoding:
1. **Donation Identification Number (DIN)**: 16 digits (Country: `050` Bangladesh, Facility: 4 digits, Year: 2 digits, Sequence: 7 digits).
2. **Product Code**: `E0398` (PRBC SAGM), `E0502` (Platelets 5D), `E0879` (FFP).
3. **ABO / Rh Blood Group**: Validated against both tube and forward/reverse automated serology.
4. **Exact Expiration Timestamp**: Calculated dynamically based on additive solution and component chemistry.

---

## Flow 3: Real-Time Hospital Stock Aggregation & Regional Visibility

```mermaid
sequenceDiagram
    autonumber
    actor Tech as Blood Bank Technologist
    participant Scanner as Barcode Imager
    participant LocalDB as Hospital Local Blood Server
    participant Broker as Regional MQTT / WebSocket Broker
    participant Cloud as DGHS National Blood Grid
    actor ERDoc as Emergency Room Doctor

    Tech->>Scanner: Scans ready blood bag barcode
    Scanner->>LocalDB: Ingest Unit (Status: AVAILABLE)
    LocalDB->>Broker: Publish {facilityId, bloodGroup, component, expiry, din}
    Broker->>Cloud: Synchronize Central Blood Registry
    Cloud->>Cloud: Update Regional Aggregate Matrix
    
    Note over ERDoc,Cloud: ER Doctor accesses Bedside Emergency Console
    ERDoc->>Cloud: Search "A- PRBC within 10 km radius"
    Cloud-->>ERDoc: Instant Results:<br/>• DMCH Blood Bank: 0 Units<br/>• BSMMU: 3 Units (2.1 km away)<br/>• BIRDEM: 1 Unit (1.8 km away)
```

---

## Flow 4: Emergency ER Requisition, Electronic Crossmatch & Custody Handover

### Overview
When a trauma patient in hemorrhagic shock arrives at the emergency department, every minute of administrative friction increases mortality. This flow provides paperless requisition, electronic hold, crossmatch validation, and cold-chain transport tracking.

```mermaid
sequenceDiagram
    autonumber
    actor ER as ER Physician / Surgeon
    participant Portal as Clinical Hospital Portal
    participant BB as Blood Bank Management System
    participant Cross as Electronic Crossmatch Engine
    actor Tech as Blood Bank Lab Officer
    actor Runner as Ward Boy / Cold-Box Courier
    actor Nurse as Ward Transfusion Nurse

    ER->>Portal: Create Blood Order (Health ID: 9102837411, Urgency: STAT, 2 Units O+ PRBC)
    Portal->>BB: Transmit Emergency Requisition (FHIR SupplyRequest)
    BB->>Cross: Verify Recipient ABO/Rh & Antibody History
    Cross-->>BB: Match Compatible Available Units (FIFO Selection)
    
    BB->>BB: Reserve Units (Status: RESERVED - 60 Min Hold Lock)
    BB-->>Portal: Order Confirmed: "2 Bags O+ PRBC Reserved at Rack R2-B4"
    
    Tech->>BB: Pulls Bags from Refrigerator -> Scans DIN
    Tech->>Tech: Performs Rapid Major Crossmatch (Gel Card Incubator 15 min)
    Tech->>BB: Logs Crossmatch COMPATIBLE
    
    Runner->>BB: Arrives with Validated Cold-Box (Ice gel packs, 2°C–6°C)
    Tech->>Runner: Scans Runner Badge + Scans Bag Barcodes (Custody Transferred)
    
    Runner->>Nurse: Delivers Cold-Box to OT / ICU
    Nurse->>Nurse: Double-checks Patient Health Card QR vs Bag Label at Bedside
    Nurse->>Portal: Scans Bag DIN -> Confirms "Transfusion Commenced"
    Portal->>BB: Unit Status Updated: TRANSFUSED
```

> [!IMPORTANT]
> **The 60-Minute Holding Lock**: If a reserved blood bag is not picked up within 60 minutes and no crossmatch is underway, the reservation automatically expires, and the unit is released back into the general emergency pool. This prevents hoarding of scarce blood groups.

---

## Flow 5: Rare Blood & Bombay Phenotype Emergency Mobilization

```mermaid
sequenceDiagram
    autonumber
    actor Tech as Blood Bank Serologist
    participant System as Prodona Rare Phenotype Engine
    participant Registry as National Rare Blood Registry (BSMMU Hub)
    participant Cryo as Cryopreserved Red Cell Bank
    actor Donor as Registered Rare Donor (Bombay hh / Rh-null)

    Tech->>System: Flag Serology Discrepancy (Group O forward, but serum lyses all O cells)
    System->>Tech: Mandatory Protocol: Test with Anti-H Lectin (Ulex europaeus)
    Tech->>System: Confirms: Anti-H Negative -> BOMBAY PHENOTYPE ($O_h$) DETECTED
    
    System->>Registry: Trigger Rare Blood Emergency Alert (Patient Health ID: 9104829103)
    
    par Search Cryopreserved Reserves
        Registry->>Cryo: Query Frozen Deglycerolized Red Cell Stock
        Cryo-->>Registry: 1 Unit Bombay PRBC at BSMMU (-80°C Storage)
        Registry-->>Tech: Initiate Thawing & Deglycerolization Protocol (90 Min Process)
    and Mobilize Living Donors
        Registry->>System: Query Registered Living Bombay Donors in Dhaka Division
        System-->>Donor: Priority Automated IVR Call + Urgent SMS in Bangla
        Donor->>System: Acknowledges Availability via 1-Tap Response
        System->>System: Issue Priority Police/Ambulance Transport Pass
    end
```

---

## Flow 6: Red Alert Emergency Geo-Broadcast (Zero Stock Lifeline)

When a hospital emergency room has an active life-threatening case (e.g., massive postpartum hemorrhage or arterial rupture) and **all networked hospital blood banks within a 15 km radius have zero stock** of the matching blood group:

```mermaid
stateDiagram-v2
    [*] --> ZeroStockCondition: Hospital & Regional Stock = 0
    ZeroStockCondition --> RedAlertTriggered: ER Consultant Authorizes Red Alert
    
    state RedAlertTriggered {
        [*] --> GeofenceCalculation: Calculate 10 km Radius from Hospital GPS
        GeofenceCalculation --> DonorFilter: Filter Donors (Matching Blood, Deferral > 90d, Active)
        DonorFilter --> MultiChannelBroadcast: Dispatch Bangla SMS + Push Notification
    }
    
    MultiChannelBroadcast --> DonorResponses: Donors Accept via Mobile App
    
    state DonorResponses {
        [*] --> FirstThreeAccepted: System Locks First 3 Confirmed Responders
        FirstThreeAccepted --> StandbyNotified: Remaining Donors Placed on Standby
    }
    
    DonorResponses --> PhlebotomyQueue: Donor Arrives at Hospital Blood Bank
    PhlebotomyQueue --> UnitCollected: Rapid TTI & Draw Completed (<40 min)
    UnitCollected --> TransfusedToPatient: Emergency Release
    TransfusedToPatient --> [*]
```

### Sample Automated Emergency Bangla SMS
> **জরুরি রক্তদান অনুরোধ (PRODONA RED ALERT)**: ঢাকা মেডিকেল কলেজ জরুরি বিভাগে একজন প্রসূতি মায়ের জন্য অবিলম্বে ১ ব্যাগ **O Negative (O-)** রক্তের প্রয়োজন। আপনার শেষ রক্তদান ৯০ দিনের বেশি আগে হওয়ায় আপনি যোগ্য। সাহায্য করতে চাইলে এখনই লিংকে ট্যাপ করুন অথবা কল করুন: 01713XXXXXX। পরিবহন খরচ ও অগ্রাধিকার নিশ্চিত করা হবে।

---

## Flow 7: FIFO Expiry Tracking, Cold-Chain IoT Logging & Biohazard Discard

```mermaid
flowchart TD
    UNIT["Blood Bag in Storage"] --> SENSOR["Continuous IoT BLE Temperature Logger<br/>(Reads temperature every 60 seconds)"]
    
    SENSOR --> TEMP_CHECK{"Temperature Normal?<br/>PRBC: 2°C–6°C<br/>FFP: < -18°C<br/>PLT: 20°C–24°C"}
    
    TEMP_CHECK -->|Breached > 30 Mins| QUARANTINE["Automatic System Lock:<br/>FLAG AS THERMALLY COMPROMISED"]
    QUARANTINE --> BIO_DISCARD["Biohazard Incineration Protocol"]
    
    TEMP_CHECK -->|Normal| FIFO_TIMER["Cron Scheduler Evaluates Shelf-Life Daily"]
    
    FIFO_TIMER --> EXPIRY_CHECK{"Shelf Life Status?"}
    EXPIRY_CHECK -->|"PRBC > 28 Days (7 Days Left)"| REALLOCATE["Priority Allocation to Elective Surgery / Thalassemia"]
    EXPIRY_CHECK -->|"Platelets > 72 Hours (48 Hours Left)"| DENGUE_ALERT["Inter-Hospital Load-Balancing Alert"]
    EXPIRY_CHECK -->|"Expired"| AUTO_EXPIRE["Mark EXPIRED in System & Lock Rack"]
    
    AUTO_EXPIRE --> BIO_DISCARD

    style UNIT fill:#3498db,color:#fff
    style BIO_DISCARD fill:#c0392b,color:#fff
    style REALLOCATE fill:#f39c12,color:#fff
```

---

## Flow 8: Adverse Transfusion Reaction & Hemovigilance Investigation

### Overview
If a patient develops an acute adverse reaction (fever, chills, hemoglobinuria, dyspnea, hypotension) during transfusion:
1. **Immediate Bedside Stop**: Nurse stops infusion instantly, disconnects line, and leaves IV line open with normal saline.
2. **System Incident Log**: Nurse taps **"REPORT ADVERSE REACTION"** on the hospital console.
3. **Automated Co-Component Quarantine**: If the transfused unit was PRBC, the system **instantly places the sister FFP and Platelet units derived from the same donation ID under quarantine**, locking them from release across any hospital in Bangladesh.
4. **Investigation Pipeline**: Blood bag remnant, post-transfusion patient blood sample, and urine sample are routed to the reference laboratory for direct antiglobulin test (Coombs), repeat crossmatch, and blood culture.
5. **National Directorate Report**: An automated hemovigilance alert is generated for the DGHS National Blood Transfusion Council.

---

## Error Handling & Edge Case Matrix

| Edge Case Scenario | Potential Impact | Automated System Mitigation |
|---|---|---|
| **Donor Conceals Recent Dengue / Fever** | Transfusion-transmitted viral infection to recipient | Mandatory digital cross-reference against national Module 02 (Test Reports) for recent positive NS1 or IgM records |
| **Blood Bank Power Failure Over 4 Hours** | Temperature excursion in storage refrigerators | IoT sensor triggers battery-powered GSM dialer to Duty Medical Officer + auto-quarantines affected units |
| **Emergency O-Negative Stock Completely Depleted** | Uncrossmatched resuscitation impossible in ER trauma | Emergency switch to Low-Titer Group O-Positive (LTOWB) Whole Blood protocol authorized for adult male trauma |
| **Patient Has Rare Irregular Antibodies (Anti-Kell, Anti-E)** | Delayed hemolytic transfusion reaction | Automated antibody screen registry flags patient; crossmatch engine blocks unphenotyped units |
| **Courier Transports Blood Bag Without Ice Box** | Warming above 10°C leads to bacterial proliferation | Digital RFID/BLE data logger placed in transport box verifies temperature continuity upon arrival |
