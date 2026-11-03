# ⚡ Functional Specifications & Feature Catalog — Module 04

## Real-Time ICU Bed Registry, Dynamic Triage Engine & Critical Care Dispatch

---

## Table of Contents

- [Functional Architecture Overview](#functional-architecture-overview)
- [Domain 1: Bed Inventory & Telemetric Verification](#domain-1-bed-inventory--telemetric-verification)
  - [Hardware & Telemetry Connectors](#hardware--telemetry-connectors)
  - [Bed Categorization Hierarchy](#bed-categorization-hierarchy)
  - [Nurse Handover & Shift Pulse](#nurse-handover--shift-pulse)
- [Domain 2: Clinical Triage & Algorithmic Allocation](#domain-2-clinical-triage--algorithmic-allocation)
  - [Acuity Scoring Calculation Engine](#acuity-scoring-calculation-engine)
  - [Spatial Multi-Criteria Matching Algorithm](#spatial-multi-criteria-matching-algorithm)
  - [Pediatric & Neonatal Triage Matrix](#pediatric--neonatal-triage-matrix)
- [Domain 3: Anti-Dalal Transparency & Public Dashboards](#domain-3-anti-dalal-transparency--public-dashboards)
  - [Public Live Bed Monitor](#public-live-bed-monitor)
  - [Anti-Extortion SMS Engine](#anti-extortion-sms-engine)
  - [Admission Gatekeeping & Tamper-Proof QR](#admission-gatekeeping--tamper-proof-qr)
- [Domain 4: Emergency Transport & Pre-Hospital Fleet Integration](#domain-4-emergency-transport--pre-hospital-fleet-integration)
  - [999 Emergency Dispatch Webhook Bridge](#999-emergency-dispatch-webhook-bridge)
  - [Dynamic In-Transit GPS Lock & Telemetry](#dynamic-in-transit-gps-lock--telemetry)
- [Domain 5: DGHS Command Center & Epidemic Surge Management](#domain-5-dghs-command-center--epidemic-surge-management)
- [Solving Brazil's SISREG Failures: Architectural Defense Grid](#solving-brazils-sisreg-failures-architectural-defense-grid)
- [Feature Priority & Compliance Matrix](#feature-priority--compliance-matrix)

---

## Functional Architecture Overview

Module 04 organizes critical care orchestration into five interlocking functional domains designed to replace informal phone calls and physical wandering with automated, data-driven workflows.

```mermaid
flowchart TD
    subgraph D1["Domain 1: Bed Inventory & Telemetry"]
        F1["Ventilator Telemetry Connector"]
        F2["Bedside NFC Nurse Handover"]
        F3["Turnaround Housekeeping Timer"]
        F4["Equipment Out-of-Order Alert"]
    end

    subgraph D2["Domain 2: Triage & Allocation"]
        F5["qSOFA & NEWS2 Acuity Engine"]
        F6["Pediatric PIM3 / NICU SNAPPE-II"]
        F7["Spatial Radius Matcher"]
        F8["Multi-Criteria Priority Queue"]
    end

    subgraph D3["Domain 3: Anti-Dalal Transparency"]
        F9["Public Live Web Dashboard"]
        F10["Fixed Tariff Public Ledger"]
        F11["Anti-Extortion SMS Gateway"]
        F12["Biometric/QR Admission Lock"]
    end

    subgraph D4["Domain 4: Transport & Fleet"]
        F13["999 CAD Dispatch Webhook"]
        F14["Ambulance In-Transit GPS Stream"]
        F15["Vital Signs Pre-Arrival Feed"]
        F16["Dynamic Transit Lock TTL"]
    end

    subgraph D5["Domain 5: Command Center"]
        F17["Division Load-Shedding Matrix"]
        F18["Dengue / Surge Mode Converter"]
        F19["Equipment Maintenance Escalator"]
    end

    D1 --> D2
    D2 --> D3
    D2 --> D4
    D1 & D2 & D4 --> D5
```

---

## Domain 1: Bed Inventory & Telemetric Verification

This domain guarantees the physical truth of bed availability, addressing the critical flaw in systems like Brazil's SISREG where beds remained empty but marked occupied, or vice versa.

```mermaid
classDiagram
    class ICUBed {
        +UUID bedId
        +String bedNumber
        +String hospitalId
        +BedType bedType
        +BedStatus status
        +Boolean hasInvasiveVentilator
        +Boolean hasDialysisPort
        +Boolean hasDedicatedNurse
        +DateTime lastHeartbeat
        +updateStatus(newStatus)
        +verifyTelemetryPulse()
    }

    class BedStatus {
        <<enumeration>>
        AVAILABLE
        LOCK_PENDING
        RESERVED_IN_TRANSIT
        OCCUPIED
        CLEANING_DISINFECTION
        OUT_OF_ORDER
    }

    class BedType {
        <<enumeration>>
        GENERAL_ADULT_ICU
        CORONARY_CARE_UNIT_CCU
        HIGH_DEPENDENCY_UNIT_HDU
        PEDIATRIC_ICU_PICU
        NEONATAL_ICU_NICU
    }

    class BedTelemetrySignal {
        +UUID signalId
        +UUID bedId
        +Boolean ventilatorPowerOn
        +Decimal oxygenLinePressurePsi
        +String nfcStaffBadgeId
        +DateTime recordedAt
    }

    ICUBed "1" *-- "1" BedStatus
    ICUBed "1" *-- "1" BedType
    ICUBed "1" *-- "many" BedTelemetrySignal
```

### Hardware & Telemetry Connectors

- **Serial / RS-232 / MQTT Bridge**: Continuously captures running status from bedside ventilators (Servo-air, Mindray, Hamilton, Dräger). Detects active ventilation versus standby state.
- **Oxygen Manifold Pressure Telemetry**: Integrates with central liquid medical oxygen (LMO) pipelines. Disables ventilator-dependent bed matching if line pressure falls below 45 PSI.
- **Turnaround Housekeeping Timer**: When a bed transitions to `CLEANING_DISINFECTION`, an automated 45-minute countdown starts. If not marked `AVAILABLE` within 60 minutes, the charge nurse receives an escalation alert.

### Bed Categorization Hierarchy

1. **General Adult ICU**: Invasive mechanical ventilator, multi-parameter monitor, arterial line capabilities, minimum 1:2 nurse-to-patient ratio.
2. **Coronary Care Unit (CCU)**: Dedicated cardiac telemetry, intra-aortic balloon pump (IABP) readiness, temporary pacemaker pacing facilities.
3. **High Dependency Unit (HDU)**: Step-down care; non-invasive ventilation (BiPAP/CPAP), continuous pulse oximetry, high-flow nasal cannula (HFNC).
4. **Pediatric ICU (PICU)**: Child-specific ventilators, pediatric consumables, pediatric intensivist coverage.
5. **Neonatal ICU (NICU)**: Level 3 incubators, radiant warmers, neonatal ventilators, phototherapy units, surfactant administration capabilities.

---

## Domain 2: Clinical Triage & Algorithmic Allocation

Critical care beds must be allocated based on clinical salvageability and objective severity, not financial influence or personal connections.

```mermaid
flowchart TD
    subgraph INPUT["Clinical Input Variables"]
        V1["Vitals: HR, BP, RR, SpO2, Temp"]
        V2["Organ Support: Inotropes, FiO2, Invasive Vent"]
        V3["Neurology: Glasgow Coma Scale (GCS 3-15)"]
        V4["Biochemistry: Arterial Blood Gas, Creatinine, Lactate"]
    end

    subgraph ENGINE["Dynamic Scoring Algorithm"]
        V1 & V2 & V3 & V4 --> CALC["Combined Severity Calculator\n(Modified qSOFA + NEWS2 + Organ Support Index)"]
        CALC --> FILTER["Exclusion Filter\n(Palliative terminal stage / Brain death confirmed)"]
    end

    subgraph QUEUE["Multi-Criteria Optimization"]
        FILTER --> SCORE["Normalized Acuity Score (0 - 100)"]
        SCORE --> DIST["Geographic Distance & Traffic Matrix (ETA min)"]
        DIST --> COMP["Composite Allocation Index (CAI)"]
    end

    subgraph ALLOCATION["Instant Bed Assignment"]
        COMP --> MATCH["Top 3 Recommended ICU Beds\nRanked by Survival Probability & Transport Time"]
    end
```

### Spatial Multi-Criteria Matching Algorithm

The matching engine computes the **Composite Allocation Index (CAI)**:

$$\text{CAI} = (\text{Acuity Score} \times 0.50) + \left(\frac{1}{\text{Transit Time in Minutes}} \times 0.35\right) + (\text{Hospital Capability Tier} \times 0.15)$$

- Guarantees that a critically unstable patient is routed to the closest capable facility rather than sent across the city to an overcrowded tertiary hospital like DMCH.
- Incorporates live Dhaka traffic conditions via Google Maps Roads API / OpenStreetMap matrix routing.

---

## Domain 3: Anti-Dalal Transparency & Public Dashboards

To dismantle the predatory middleman syndicate (*দালাল চক্র*) that extorts **Tk 30,000 to 100,000** per admission, the platform institutes total operational transparency.

```mermaid
xychart-beta
    title "Reported Family Extortion Incidents by Broker Cartels (Pilot Zones)"
    x-axis ["Pre-System (Baseline)", "Month 1 (SMS Live)", "Month 3 (Dashboard)", "Month 6 (Full Lock)"]
    y-axis "Documented Extortion Cases" 0 --> 120
    bar [112, 64, 21, 4]
```

### Public Live Bed Monitor

- Real-time public interface accessible at `icu.dghs.gov.bd` without login requirements.
- Public metrics displayed:
  - Total Sanctioned ICU Beds by Division
  - Currently Occupied Beds
  - Currently Reserved Beds (In-Transit)
  - Vacant / Disinfecting Beds
  - Hospital Contact Number, Address, and Emergency Gate Directions
  - Maximum Statutory User Fee (Public hospital: Tk 100/day; Accredited private tier caps)
- **Zero Patient Identifiable Information (PII)** is visible on the public page, ensuring compliance with medical privacy laws.

### Admission Gatekeeping & Tamper-Proof QR

```mermaid
sequenceDiagram
    autonumber
    actor Dalal as Unauthorized Broker / Dalal
    actor Nurse as ICU Admission Nurse
    participant POS as ICU Gate Scanner
    participant Server as Module 04 Verification Server

    Dalal->>Nurse: Attempts to force admission of unverified patient
    Nurse->>POS: Prompts for Reservation Token QR Code
    
    alt Broker has NO token or invalid paper
        POS-->>Nurse: 🛑 REJECT: "No Valid Digital Reservation Found"
        Nurse->>Nurse: Admission chart creation locked in hospital EHR
        POS->>Server: Logs security incident & alerts hospital police outpost
    else Legitimate patient with SMS QR
        POS->>Server: Verifies Ed25519 Token + Patient NID
        Server-->>POS: ✅ APPROVED: Patient matches Transfer Dossier #9041
        POS-->>Nurse: Unlocks electronic chart & registers bed occupancy
    end
```

---

## Domain 4: Emergency Transport & Pre-Hospital Fleet Integration

Because patient decompensation en route to Dhaka is a leading cause of mortality, Module 04 links bed reservation directly with emergency transport.

```mermaid
flowchart LR
    BED_LOCK["Bed Reserved in Central Engine"] --> TRIGGER["Webhook Event Emitters"]
    
    TRIGGER --> CAD["999 Emergency Dispatch CAD\nAuto-generates ALS Ambulance Dispatch"]
    TRIGGER --> SMS_FAM["Patient Family Mobile\nSends Route, Bed No. & Direct Dial"]
    TRIGGER --> RECEIVE_ICU["Receiving Intensivist Dashboard\nDisplays Live GPS & Pre-Arrival Vitals"]
    
    CAD --> AMB["ALS Transport Unit"]
    AMB --> STREAM["Paramedic App: Streams SpO2, Pulse, ETA"]
    STREAM --> RECEIVE_ICU
```

### Dynamic In-Transit GPS Lock & Telemetry

- **Adaptive Time-to-Live (TTL)**: The bed lock expiration timer continuously recalculates based on live GPS speed from the ambulance.
- If traffic jams at Gazipur or Gabtoli add 25 minutes of transit delay, the system extends the bed hold time automatically.
- **Pre-Arrival Handshake**: 10 minutes prior to arrival, the receiving ICU receives a final audible siren on the bedside console, prompting the nursing team to draw baseline medications and calibrate the ventilator.

---

## Domain 5: DGHS Command Center & Epidemic Surge Management

The Directorate General of Health Services (DGHS) Command Center monitors national critical care capacity through an executive geospatial dashboard.

```mermaid
flowchart TD
    subgraph SENSORS["National Data Streams"]
        S1["64 Districts Real-Time ICU Feeds"]
        S2["Liquid Medical Oxygen (LMO) Tank Levels"]
        S3["District Epidemic Outbreak Reports (Dengue / Cholera)"]
    end

    subgraph AI_PREDICT["Predictive Engine"]
        S1 & S2 & S3 --> PREDICT["Capacity Forecaster\n(72-hour ICU bed exhaustion prediction)"]
    end

    subgraph ACTIONS["Command Interventions"]
        PREDICT --> ACT1["Inter-Hospital Load Shedding\n(Divert non-emergency cases to Secondary ICUs)"]
        PREDICT --> ACT2["HDU-to-ICU Step-Up Activation\n(Deploy reserve ventilators from NEMEMW&TC)"]
        PREDICT --> ACT3["National Alert Dispatches\n(Warn divisional directors of impending shortages)"]
    end
```

---

## Solving Brazil's SISREG Failures: Architectural Defense Grid

Module 04 was engineered specifically to prevent the catastrophic failure modes documented in Brazil's nationwide bed regulation platform (SISREG).

| Brazil SISREG Vulnerability (TCE-SC Audit) | Why It Happened in SISREG | Module 04 Defense in Bangladesh |
|:---|:---|:---|
| **33% Authorizations Issued Late** | Centralized human bureaucratic committees manually reviewed paper requests during working hours | **Algorithmic Instant Matching (< 15 seconds)**: Machine triage matches bed based on objective clinical equations (qSOFA/NEWS2) 24/7/365. |
| **54% Admissions Bypassed System** | Doctors made verbal agreements over telephone; hospital clerks created local charts without regulator consent | **Cryptographic Lockout**: Hospital billing and clinical EHR cannot create an ICU encounter without an Ed25519-signed central token. |
| **Stale, Inaccurate Bed Availability** | Data was entered manually once a day; empty beds were hidden for favored VIP patients | **Multi-Modal Bed Heartbeat**: Combines ventilator telemetry, oxygen pressure switches, and mandatory nurse handover NFC pulses. |
| **No In-Transit Bed Protection** | Beds were offered on a first-come basis; patients died when arriving at already-filled units | **GPS-Coupled Dynamic Transit Lock**: Bed state shifts to `RESERVED_IN_TRANSIT` with active countdown tied to live ambulance telemetry. |
| **Extortion & Predatory Middlemen** | Bed availability was hidden from the public; brokers sold unofficial information | **Public Real-Time Dashboard (`icu.dghs.gov.bd`)** and automated anti-extortion SMS sent directly to families. |

---

## Feature Priority & Compliance Matrix

| Feature ID | Feature Name | Priority | Protocol / Standard | Target User |
|:---|:---|:---:|:---|:---|
| **F-ICU-01** | Real-Time Telemetric Bed State Engine | P0 (Must Have) | Redis Redlock / WebSockets | Hospital ICU Units |
| **F-ICU-02** | Automated qSOFA & NEWS2 Triage Engine | P0 (Must Have) | Clinical Algorithm | Referring Physicians |
| **F-ICU-03** | Anti-Dalal Public Live Availability Portal | P0 (Must Have) | Responsive Web / W3C | Citizens & Families |
| **F-ICU-04** | Cryptographic Token Admission Gatekeeper | P0 (Must Have) | Ed25519 / FHIR Encounter | ICU Admission Staff |
| **F-ICU-05** | Anti-Extortion SMS Gateway | P0 (Must Have) | Unicode / GSM-7 | Patient Families |
| **F-ICU-06** | 999 Emergency CAD Webhook Connector | P1 (High) | RESTful Webhooks | 999 Dispatchers |
| **F-ICU-07** | In-Transit GPS & Vitals Streaming Engine | P1 (High) | MQTT / WebSockets | Paramedics & Receivers |
| **F-ICU-08** | Bedside Nurse NFC Shift Check Terminal | P1 (High) | NFC Type 4 / Android | ICU Duty Nurses |
| **F-ICU-09** | Ventilator Serial/MQTT Hardware Bridge | P2 (Medium) | RS-232 / MQTT | Biomedical Engineers |
| **F-ICU-10** | Housekeeping UV-C Disinfection Tracker | P2 (Medium) | State Machine | Sanitation Crews |
| **F-ICU-11** | DGHS Command Center Predictive Heatmap | P2 (Medium) | Mapbox / TimescaleDB | DGHS Health Ministry |
| **F-ICU-12** | Dialysis Port & Organ Support Registry | P2 (Medium) | FHIR Device Profile | Nephrologists & ICU |
