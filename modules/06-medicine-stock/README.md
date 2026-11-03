# 💊 Module 06: Medicine Availability & Stock Tracking System — AushodhSheba (ঔষধ সেবা)

> **Real-time medicine transparency, stock-aware prescribing, automated generic substitution, anti-diversion controls, and anti-lapse procurement for Bangladesh.**

---

## 📋 Table of Contents

- [The Crisis: Why Bangladesh's Medicine Distribution is Broken](#the-crisis-why-bangladeshs-medicine-distribution-is-broken)
- [Divisional Disparities: The Geography of Deprivation](#divisional-disparities-the-geography-of-deprivation)
- [The Systemic Paradox: Unspent Money vs. Empty Shelves](#the-systemic-paradox-unspent-money-vs-empty-shelves)
- [The Price Fixing Disparity: DGDA Regulation vs. Retail Gouging](#the-price-fixing-disparity-dgda-regulation-vs-retail-gouging)
- [Why Standalone eLMIS Fails Patients & Clinicians](#why-standalone-elmis-fails-patients--clinicians)
- [Vision & Core Objectives](#vision--core-objectives)
- [System Architecture & Module Ecosystem](#system-architecture--module-ecosystem)
- [Key Features at a Glance](#key-features-at-a-glance)
- [Target Stakeholders & User Personas](#target-stakeholders--user-personas)
- [Quantitative Impact Metrics & KPIs](#quantitative-impact-metrics--kpis)
- [API & Integration Specifications](#api--integration-specifications)
- [Quick Start Guide](#quick-start-guide)

---

## The Crisis: Why Bangladesh's Medicine Distribution is Broken

Medicines account for over **64% of all out-of-pocket (OOP) healthcare expenditures** in Bangladesh, driving the national OOP rate to an unbearable **79.31%**. While Bangladesh possesses a robust domestic pharmaceutical manufacturing sector that exports to over 150 nations, its public distribution and retail dispensing ecosystems suffer from acute structural failure.

> [!CAUTION]
> **The Public Healthcare Medicine Failure**:
> - **Only 22% average availability** of essential medicines in public healthcare facilities across the country (PPRC 2026 comprehensive study covering 22 facilities in all 8 divisions).
> - **84% of community healthcare providers** report that patients are forced to return home empty-handed or abandon treatment because free government medicines are out of stock (Dhaka Tribune, 2026).
> - In **Jashore district alone, 283 community clinics had ZERO medicines for 8 consecutive months** (Bonik Barta, 2026).
> - **Tk 600 crore in counterfeit and substandard medicines** circulate within Bangladesh's Tk 18,000 crore pharmaceutical market (Industry Estimate, Daily Star).
> - **Only 7.56% of retail pharmacies in Dhaka have a registered A-grade pharmacist** (PMC 2025 Study), with over 45% of antibiotics dispensed over-the-counter without a valid prescription.

### The Anatomy of Medicine Stock Breakdown

```mermaid
flowchart TD
    A["DGHS Central Warehouse / eLMIS"] -->|"Delayed Logistics & Bureaucracy"| B["Upazila Health Complex Store"]
    B -->|"Stock Depleted / Not Dispatched"| C["Community Clinic (14,500+ across BD)"]
    
    C --> D["❌ 22% Essential Medicine Availability"]
    D --> E["84% Patients Return Empty-Handed"]
    
    E --> F["Patient Visits Private Pharmacy"]
    F --> G["💸 Unregulated Retail Price Gouging (7-140% Markup)"]
    F --> H["⚠️ Risk of Counterfeit Drugs (Tk 600 Cr Market)"]
    
    G --> I["💥 Catastrophic Out-of-Pocket Expense (79.31%)"]
    H --> I
    
    style D fill:#d63031,color:#fff
    style E fill:#e17055,color:#fff
    style G fill:#d63031,color:#fff
    style H fill:#d63031,color:#fff
    style I fill:#2d3436,color:#fff
```

---

## Divisional Disparities: The Geography of Deprivation

The crisis of medicine availability does not impact Bangladesh evenly. Rural and riverine divisions suffer catastrophic shortfalls compared to central metropolitan tertiary hospitals.

```mermaid
xychart-beta
    title "Average Essential Medicine Availability in Public Clinics by Division (% - PPRC 2026)"
    x-axis ["Barishal", "Sylhet", "Rangpur", "Mymensingh", "Khulna", "Rajshahi", "Chattogram", "Dhaka"]
    y-axis "Availability (%)" 0 --> 50
    bar [14, 16, 18, 19, 21, 24, 28, 36]
```

### Regional Reality Check

- **Barishal & Coastal Islands (Bhola, Sandwip)**: Extreme isolation during monsoon months leaves facilities at **14% availability**. Patients must undertake 3-hour river journeys to purchase basic paracetamol or rehydration salts.
- **Khulna Division (Jashore, Satkhira)**: Bureaucratic deadlock between Upazila stores and the Directorate General of Health Services (DGHS) left **283 community clinics in Jashore completely unstocked for 8 consecutive months** in 2025–2026.
- **Sylhet & Sunamganj Haor Areas**: Flash floods submerge sub-district stores, destroying non-waterproofed inventory boxes due to poor digital lot management and absent elevated warehousing.

---

## The Systemic Paradox: Unspent Money vs. Empty Shelves

The most tragic reality of Bangladesh's medicine shortage is that **money is not the primary bottleneck—information opacity and administrative paralysis are.**

```mermaid
xychart-beta
    title "PPRC 2026 National Health Facility Assessment Findings (%)"
    x-axis ["Institutions with Unspent Budget", "Service Gaps from Malfunctions", "Diagnostic Equipment Idle", "Essential Medicine Availability"]
    y-axis "Percentage (%)" 0 --> 100
    bar [94, 79, 52, 22]
```

### Key Contradictions Revealed by Independent Audits

1. **The 94% Unspent Budget Paradox**:
   - According to the **PPRC 2026 study**, **94% of public health institutions ended the fiscal year with unspent procurement budgets**, even as shelves stood bare and patients were turned away.
   - Procurement officers delay tenders due to fears of audit scrutiny, lack of real-time consumption data, and disconnected bureaucratic approval channels.

2. **The 48-Second Consultation Dilemma**:
   - Primary care doctors see upwards of 400 patients in a single morning shift (spending **48 seconds on average per consultation**).
   - They do not have time to look up inventory lists or call dispensers. Consequently, they prescribe popular commercial brand names that the facility dispensary does not carry.

3. **Brand-Name Prescribing & Lack of Generic Substitution**:
   - Over **90% of prescriptions written in Bangladesh use private commercial brands** rather than generic international nonproprietary names (INN).
   - When a specific prescribed brand is missing from a government dispensary or a rural drug store, dispensers lack an automated, legally backed generic substitution tool. Patients either walk away without medication or pay 5x–10x more for private alternatives.

---

## The Price Fixing Disparity: DGDA Regulation vs. Retail Gouging

The Directorate General of Drug Administration (DGDA) fixes the Maximum Retail Price (MRP) for **only about 160 essential drugs** out of more than 1,500 registered molecules and 30,000 branded formulations.

### Retail Inflation vs. Factory Gate Stability (2024–2026 Data)

| Therapeutic Class | Sample Medicine | Mill-Gate Price (2024) | Retail Price (2024) | Retail Price (2026) | Price Increase (%) | DGDA Price Controlled? |
|-------------------|-----------------|------------------------|---------------------|---------------------|--------------------|------------------------|
| **Antihypertensive** | Amlodipine 5mg | ৳1.80 | ৳3.50 | ৳6.50 | **+85.7%** | ❌ No |
| **Gastrointestinal** | Esomeprazole 20mg | ৳2.20 | ৳5.00 | ৳9.50 | **+90.0%** | ❌ No |
| **Antibiotic** | Cefuroxime 500mg | ৳18.00 | ৳35.00 | ৳65.00 | **+85.7%** | ❌ No |
| **Analgesic** | Paracetamol 500mg | ৳0.65 | ৳1.00 | ৳1.20 | **+20.0%** | ✅ Yes (Fixed) |
| **Oral Rehydration**| ORS Powder Sachet | ৳3.50 | ৳5.00 | ৳6.00 | **+20.0%** | ✅ Yes (Fixed) |
| **Anti-diabetic** | Metformin 500mg | ৳1.20 | ৳2.50 | ৳6.00 | **+140.0%** | ❌ No |

> [!WARNING]
> While controlled essential drugs saw modest adjustments, non-controlled chronic illness medications surged by **up to 140%**, directly penalizing low-income families managing chronic cardiovascular disease and diabetes.

---

## Why Standalone eLMIS Fails Patients & Clinicians

The Directorate General of Health Services (DGHS) currently operates an **electronic Logistics Management Information System (eLMIS)**. However, eLMIS remains a closed, back-office logistics tool with critical limitations:

```mermaid
pie title "Limitations of Existing eLMIS Deployment"
    "Internal Warehouse Focus Only (No Doctor Visibility)" : 38
    "Zero Citizen / Patient Stock Access" : 32
    "No Point-of-Prescribing Generic Substitution" : 18
    "Batch Expiry & Waste from Poor FEFO" : 12
```

### eLMIS vs. Module 06 (AushodhSheba)

| Operational Dimension | Existing DGHS eLMIS | Module 06: AushodhSheba |
|-----------------------|---------------------|--------------------------|
| **Primary Audience** | Central warehouse managers & procurement clerks | **Doctors, Dispensers, CHCPs, and 170M Citizens** |
| **Prescribing Visibility** | Zero. Doctors prescribe blindly without stock awareness | **Live in-consultation stock badge in Module 03** |
| **Citizen Discovery** | None. Patients travel hours only to find bare shelves | **SMS/USSD & App stock finder within 5 km** |
| **Generic Substitution** | None | **Automated DGDA-matched therapeutic equivalents** |
| **Budget-Lapse Alerts** | None. Budgets lapse quietly on June 30 | **Predictive automated reordering & anti-lapse alerts** |
| **Anti-Counterfeit Check** | None at consumer touchpoint | **2D DataMatrix batch verification via mobile scan** |
| **Interoperability** | Siloed database | **FHIR R4 BD Core (`SupplyDelivery`, `MedicationDispense`)** |

---

## Vision & Core Objectives

```mermaid
flowchart LR
    subgraph Goal["AushodhSheba 2026-2028 Goal"]
        G1["Zero Empty-Handed Patients"]
        G2["100% Budget Utilization"]
        G3["Transparent DGDA Price Caps"]
    end
    
    subgraph Mechanism["Actionable Enablers"]
        M1["In-Prescription Stock Radar"]
        M2["Auto-Requisition Engine"]
        M3["Generic Equivalence Matcher"]
    end
    
    Mechanism --> Goal

    style Goal fill:#00b894,color:#fff
    style Mechanism fill:#0984e3,color:#fff
```

### Core Strategic Mandates

1. **Stock-Aware Prescribing**: Prevent empty dispensary visits by showing doctors live facility inventory inside the digital prescription workflow.
2. **Citizen Stock Radar**: Empower citizens to check medicine availability and official DGDA fixed prices via SMS, USSD (`*16263#`), or Web before traveling to a health center.
3. **Automated Requisition & Anti-Lapse Sentinel**: Ensure no clinic runs out of stock while procurement budgets sit idle, triggering auto-indents when safety thresholds breach.
4. **Intelligent Generic Substitution**: Provide dispensers and patients with chemically identical, DGDA-approved alternative brands when primary stock is exhausted.
5. **Counterfeit Drug Shield**: Provide instant scratch-and-verify batch verification to suppress the Tk 600 crore counterfeit drug market.

---

## System Architecture & Module Ecosystem

Module 06 operates as the pharmaceutical logistics and transparency backbone, connecting seamlessly into the national FHIR R4 Core (Module 05).

```mermaid
flowchart TD
    M05["🏗️ Module 05: Core Platform\n(FHIR R4 Interoperability)"]
    
    subgraph M06["💊 Module 06: AushodhSheba"]
        INV["Multi-Tier Dispensary Ledger\n(FEFO Expiry Management)"]
        GEN["Generic Substitution Engine\n(DGDA Equivalence Matrix)"]
        RADAR["Citizen Stock & Price Radar\n(SMS/USSD/Web API)"]
        AUTO_REQ["Auto-Reorder & Budget Sentinel\n(eLMIS Gateway)"]
    end

    M01["📝 Mod 01: Health ID"] -->|"Patient Identification"| M06
    M03["💊 Mod 03: Digital Prescription"] <-->|"Live Stock Check &\nDispense Reconciliation"| M06
    M06 <-->|"FHIR SupplyDelivery &\nMedicationDispense"| M05
    eLMIS["🏢 Central DGHS eLMIS"] <-->|"Warehouse Depots Sync"| AUTO_REQ
    DGDA["⚖️ DGDA Drug Registry"] -->|"MRP Price Ceilings &\nApproved Generics"| GEN

    style M06 fill:#0984e3,color:#fff,stroke-width:3px
    style M05 fill:#6c5ce7,color:#fff
    style M03 fill:#00b894,color:#fff
    style DGDA fill:#e17055,color:#fff
    style eLMIS fill:#fdcb6e,color:#2d3436
```

---

## Key Features at a Glance

### 1. In-Consultation Stock Radar (for Doctors)
- Displays color-coded inventory tags directly in Module 03 while the doctor types:
  - 🟢 **In-Stock at Hospital Dispensary** (Free Government Supply).
  - 🟡 **Available at Nearby Model Pharmacy** (DGDA MRP Verified).
  - 🔴 **Out of Stock Everywhere Locally** (Prompts instant generic substitute).

### 2. Intelligent Generic Matcher (DGDA-Aligned)
- Instant fallback recommendations: If *Amlodipine 5mg (Amdocal)* is exhausted, the system immediately recommends *Amlodipine 5mg (Amlocard, Camlodin)* or bioequivalent generic alternatives.
- Calculates patient out-of-pocket savings in Bangladeshi Taka (৳).

### 3. Patient SMS & USSD Stock Inquiry
- Low-tech access for the 74% of rural citizens without personal smartphones:
  - Send SMS: `MED <GenericName> <Upazila>` to **16263** (DGHS Shastho Batayan).
  - Instant Bangla reply with nearby clinic stock and official DGDA price.

### 4. Anti-Budget-Lapse Requisition Engine
- Solves the Jashore 283 clinic catastrophe: monitors consumption velocity and safety stock thresholds.
- When stock reaches 20% of monthly average consumption, it auto-generates a signed digital indent to the Upazila Health Complex store and notifies the UHFPO.

### 5. Lot-Level FEFO & Expiration Warning
- **First-Expired-First-Out (FEFO)** rule prevents medicine batches from rotting on dispensary shelves.
- 90-day, 60-day, and 30-day automated alert triggers for inter-facility redistribution before expiration.

---

## Target Stakeholders & User Personas

| Stakeholder | Key Pain Point Today | Solution in Module 06 |
|-------------|----------------------|-----------------------|
| **Rural Patient (e.g., from Jashore/Bhola)** | Travels 10 km to clinic, finds no medicine, pays ৳800 at private store | Checks stock via free SMS, gets free medicine or finds nearest verified store |
| **Community Health Worker (CHCP)** | Endures public anger when 283 clinics run dry for 8 months | Automated requisition triggered before stock hits zero; transparent delivery tracking |
| **Hospital Doctor (MO / Consultant)** | Prescribes medicines that dispensary doesn't have; patients drop out | Live stock badges inside prescribing UI; 1-click generic substitution |
| **Dispensary Pharmacist** | Manual paper registers, blamed for shortages, medicines expire unused | Barcode scanning, automated FEFO queue, digital dispensing logs |
| **UHFPO / Civil Surgeon** | 94% institutions end year with unspent funds; audit paralysis | Real-time district consumption dashboard; one-click tender authorizations |
| **DGDA Drug Inspector** | Cannot monitor 150,000 pharmacies for price gouging or fake drugs | Automated crowd-sourced pricing reports; batch verification scan telemetry |

---

## Quantitative Impact Metrics & KPIs

```mermaid
xychart-beta
    title "Target Outcomes: Baseline (2026) vs Year 1 Target (2027)"
    x-axis ["Essential Med Availability %", "Patients Returning Empty %", "Unspent Health Budget %", "Avg Price Markup %"]
    y-axis "Percentage (%)" 0 --> 100
    bar [22, 84, 94, 65]
```

### National Targets (CareLoop Roadmap)

- **Essential Medicine Availability**: Increase from **22% to >85%** across all public primary care centers.
- **Empty-Handed Patient Rate**: Reduce from **84% to <10%** through proactive stock-aware prescribing and rapid replenishment.
- **Health Procurement Budget Utilization**: Slash unspent procurement funds from **94% to <15%** by automating demand forecasting and tender generation.
- **Counterfeit Detection**: Zero untracked batches dispensed at any accredited public or model pharmacy.

---

## API & Integration Specifications

Module 06 exposes RESTful and FHIR-compliant endpoints secured by OAuth2 and mTLS.

| Endpoint | Method | Purpose | Authorized Caller |
|----------|--------|---------|-------------------|
| `/api/v1/stock/query` | `GET` | Doctor in-consultation inventory lookup | Module 03 (Prescription) |
| `/api/v1/stock/substitute` | `POST` | Algorithmic generic equivalence search | Module 03 / Dispensary |
| `/api/v1/dispense/commit` | `POST` | Commit dispensing and deduct batch balance | Dispensary POS / CHCP App |
| `/api/v1/citizen/sms-query` | `POST` | Ingest and respond to 16263 SMS queries | Telecom Shortcode Gateway |
| `/api/v1/requisition/auto` | `POST` | Trigger automated eLMIS indent dispatch | Scheduled Cron / Sentinel |
| `/fhir/r4/MedicationDispense` | `POST` | Create standard BD Core FHIR record | Module 05 Core Engine |
| `/fhir/r4/SupplyDelivery` | `POST` | Synchronize central warehouse dispatches | DGHS Central eLMIS |

---

## Quick Start Guide

### Prerequisites
- Node.js v20.x or Go 1.22+
- PostgreSQL 16 with PostGIS extension (for geospatial pharmacy indexing)
- Redis 7.2 (for inventory cache and rate limiting)
- Connection to Module 05 Core FHIR Gateway

### Environment Configuration (`.env`)
```bash
# Service Configuration
PORT=4006
NODE_ENV=production
MODULE_NAME=06-medicine-stock

# Inter-Module Communication
CORE_FHIR_URL=https://core.health.gov.bd/fhir/r4
PRESCRIPTION_MODULE_URL=https://rx.health.gov.bd/api/v1

# DGDA & eLMIS Integration
DGDA_REGISTRY_API=https://dgda.gov.bd/api/v2
ELMIS_GATEWAY_URL=https://elmis.dghs.gov.bd/api/integration

# Database
DATABASE_URL=postgresql://med_user:med_pass@localhost:5432/bd_medicine_stock?sslmode=require
REDIS_URL=redis://localhost:6379/2
```

### Run Locally
```bash
# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# Seed DGDA Essential Drugs List (~160 Price-Controlled Molecules)
npm run seed:dgda-essential

# Start service
npm run start:dev
```
