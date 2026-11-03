# Module 07: Health Card — Application Flows

## 📋 Table of Contents

- [Flow Overview](#flow-overview)
- [Flow 1: Health Card Registration](#flow-1-health-card-registration)
- [Flow 2: QR Code Scan & Lookup](#flow-2-qr-code-scan--lookup)
- [Flow 3: Consent Management](#flow-3-consent-management)
- [Flow 4: Proxy Access](#flow-4-proxy-access)
- [Flow 5: Cross-Facility Data Sharing](#flow-5-cross-facility-data-sharing)
- [Flow 6: Health Card Update](#flow-6-health-card-update)
- [Flow 7: Lost Card Recovery](#flow-7-lost-card-recovery)
- [Flow 8: Emergency Break-Glass Access](#flow-8-emergency-break-glass-access)
- [Flow 9: Offline Registration & Sync](#flow-9-offline-registration--sync)
- [Error Handling & Edge Cases](#error-handling--edge-cases)

---

## Flow Overview

```mermaid
flowchart TD
    A["Patient Arrives<br/>at Facility"] --> B{"Has Health Card?"}
    B -->|Yes| C["Scan QR Code"]
    B -->|No| D{"Has NID/BRN?"}
    
    C --> E["Look Up FHIR Patient"]
    E --> F["Display Patient Summary"]
    F --> G["Create Encounter"]
    
    D -->|Yes| H["Register New Health Card"]
    D -->|No| I["Collect Basic Info<br/>Issue Temporary ID"]
    
    H --> J["Generate Health ID<br/>(starts with 9)"]
    J --> K["Create FHIR Patient"]
    K --> L["Issue Physical Card + Digital"]
    L --> G
    
    I --> M["Advise to Get NID/BRN"]
    M --> G

    G --> N["Clinical Visit Proceeds"]

    style A fill:#0984e3,color:#fff
    style G fill:#00b894,color:#fff
    style N fill:#00b894,color:#fff
```

> [!NOTE]
> All flows assume the **BD Core IG v0.4.6** FHIR profiles and the SHR Master Client Index. The FHIR sandbox endpoint is `sandbox.fhir.dghs.gov.bd/fhir`.

---

## Flow 1: Health Card Registration

### Overview
A new patient visits a healthcare facility for the first time and needs to be registered in the national e-Health system. This is the most critical flow — it creates the patient's digital identity.

### Preconditions
- Patient has a valid NID (National ID, 10 or 17 digits) or BRN (Birth Registration Number, 17 digits)
- Facility has connectivity (or uses offline mode — see Flow 9)
- Registration staff is logged into the system

### Detailed Sequence

```mermaid
sequenceDiagram
    autonumber
    actor P as Patient (রোগী)
    participant S as Registration Staff
    participant APP as Health Card App
    participant NID_API as NID/BRN Verification
    participant MCI as Master Client Index
    participant FHIR as FHIR R4 Server

    P->>S: Arrives at facility, shows NID/BRN
    S->>APP: Enters NID/BRN number
    APP->>NID_API: POST /verify {nid: "XXXXXXXXXX"}
    NID_API-->>APP: 200 OK {name, dob, gender, photo, address}
    
    APP->>APP: Display verified info for staff confirmation
    S->>P: "আপনার নাম কি [Name]? জন্ম তারিখ [DOB]?"
    P->>S: Confirms identity
    S->>APP: Confirms identity match
    
    APP->>MCI: POST /check-duplicate {nid: "XXXXXXXXXX"}
    MCI-->>APP: 200 OK {exists: false}
    
    Note over APP: Generate Health ID<br/>Format: 9XXXXXXXXX (10 digits)<br/>Checksum validated
    
    APP->>FHIR: POST /Patient {healthId, nid, demographics}
    FHIR-->>APP: 201 Created {id: "uuid", healthId: "9XXXXXXXXX"}
    
    APP->>APP: Generate QR Code<br/>(encrypted Health ID + expiry token)
    
    APP->>S: Display: Health ID created successfully
    S->>P: Issues physical card + shows digital card setup
    
    Note over P: Patient receives:<br/>1. Physical card with QR<br/>2. Digital card on phone (if smartphone)<br/>3. SMS with Health ID number
```

### Step-by-Step Details

| Step | Action | System | Bangla Prompt (if applicable) |
|------|--------|--------|-------------------------------|
| 1 | Patient presents NID/BRN | — | — |
| 2 | Staff enters ID number | Health Card App | "জাতীয় পরিচয়পত্র / জন্ম নিবন্ধন নম্বর লিখুন" |
| 3 | System verifies with NID API | NID Verification | — |
| 4 | Staff confirms patient identity | Health Card App | "তথ্য নিশ্চিত করুন" |
| 5 | Check for duplicates | Master Client Index | — |
| 6 | Generate Health ID | ID Generator | — |
| 7 | Create FHIR Patient resource | FHIR Server | — |
| 8 | Generate QR code | QR Engine | — |
| 9 | Issue physical card | Card Printer | — |
| 10 | Set up digital card | PWA | "আপনার ডিজিটাল হেলথ কার্ড তৈরি হয়েছে" |
| 11 | Send confirmation SMS | SMS Gateway | "আপনার স্বাস্থ্য পরিচয় নম্বর: 9XXXXXXXXX" |

### Post-conditions
- Patient has a unique Health ID starting with `9`
- FHIR Patient resource exists on the SHR
- Physical card printed (if printer available)
- Digital card accessible via PWA (if smartphone)
- SMS confirmation sent to registered mobile number
- Consent flow triggered (see Flow 3)

> [!TIP]
> **For rural facilities without printers:** Generate a temporary paper slip with Health ID + QR code. Patient can get a proper card at the next district hospital visit. The digital Health ID works regardless.

---

## Flow 2: QR Code Scan & Lookup

### Overview
A returning patient presents their Health Card (physical or digital) at any facility. The facility scans the QR code to retrieve the patient's record.

```mermaid
sequenceDiagram
    autonumber
    actor P as Patient
    participant SC as QR Scanner
    participant APP as Facility App
    participant FHIR as FHIR Server
    participant ENC as Encounter Service

    P->>SC: Shows QR code (card or phone)
    SC->>APP: Decoded: {healthId: "9XXXXXXXXX", token: "xxx", expiry: "2027-01-01"}
    
    APP->>APP: Validate token & check expiry
    
    alt Token Valid
        APP->>FHIR: GET /Patient?identifier=9XXXXXXXXX
        FHIR-->>APP: 200 OK {Patient resource}
        
        APP->>FHIR: GET /Condition?patient={id}&clinical-status=active
        FHIR-->>APP: 200 OK {active conditions}
        
        APP->>FHIR: GET /AllergyIntolerance?patient={id}
        FHIR-->>APP: 200 OK {allergies}
        
        APP->>APP: Display Patient Summary
        Note over APP: Name, Age, Blood Type<br/>Active Conditions<br/>Allergies<br/>Last Visit
        
        APP->>ENC: POST /Encounter {patient, facility, datetime}
        ENC-->>APP: 201 Created
        
        APP->>APP: "রোগী চিহ্নিত হয়েছে। ভিজিট শুরু করুন।"
    else Token Expired or Invalid
        APP->>APP: "QR কোড মেয়াদোত্তীর্ণ।<br/>জাতীয় পরিচয়পত্র দিয়ে যাচাই করুন।"
        APP->>APP: Fallback to manual NID lookup
    end
```

### QR Code Content Structure

```json
{
  "v": 1,
  "hid": "9XXXXXXXXX",
  "t": "encrypted_token_base64",
  "exp": "2027-06-15T00:00:00Z",
  "sig": "digital_signature_base64"
}
```

> [!IMPORTANT]
> The QR code does **NOT** contain any medical data. It contains only the Health ID, an encrypted verification token, an expiry date, and a digital signature. All medical data is retrieved from the FHIR server after authentication.

---

## Flow 3: Consent Management

### Overview
Bangladesh's PDPO 2025 requires explicit consent for processing health data. On first visit (or when consent is due for renewal), patients are shown a consent screen in Bangla.

```mermaid
sequenceDiagram
    autonumber
    actor P as Patient (রোগী)
    participant S as Staff
    participant APP as Consent UI
    participant FHIR as FHIR Server

    Note over APP: First visit or consent renewal triggered

    APP->>S: Display consent screen (Bangla)
    S->>P: Explains consent in Bangla
    
    Note over APP: Consent Categories:<br/>1. মৌলিক তথ্য (Basic Info) — Required<br/>2. চিকিৎসা ইতিহাস (Medical History)<br/>3. ঔষধের তথ্য (Medication)<br/>4. পরীক্ষার ফলাফল (Lab Results)<br/>5. মানসিক স্বাস্থ্য (Mental Health)<br/>6. প্রজনন স্বাস্থ্য (Reproductive Health)
    
    P->>S: Agrees to categories 1, 2, 3, 4<br/>Declines 5, 6
    S->>APP: Records consent choices
    
    APP->>FHIR: POST /Consent {patient, categories, dateTime, status}
    FHIR-->>APP: 201 Created {consent_id}
    
    APP->>APP: Generate consent receipt
    APP->>P: SMS: "আপনার সম্মতি নিবন্ধিত হয়েছে। রেফারেন্স: CON-XXXXX"
    
    Note over P: Patient can revoke any<br/>category anytime via app or facility
```

### Consent Data Categories

| Category | Bangla | Required | Default |
|----------|--------|----------|---------|
| Basic Demographics | মৌলিক তথ্য | ✅ Yes | Granted |
| Medical History | চিকিৎসা ইতিহাস | No | Ask |
| Medication Records | ঔষধের তথ্য | No | Ask |
| Lab Results | পরীক্ষার ফলাফল | No | Ask |
| Mental Health | মানসিক স্বাস্থ্য | No | Denied |
| Reproductive Health | প্রজনন স্বাস্থ্য | No | Denied |
| Immunization | টিকা তথ্য | No | Ask |
| Emergency Access | জরুরি প্রবেশ | No | Ask |

### Consent Revocation

```mermaid
stateDiagram-v2
    [*] --> NoConsent: Patient not yet consented
    NoConsent --> ConsentPending: Staff initiates consent
    ConsentPending --> ActiveConsent: Patient agrees
    ConsentPending --> ConsentDenied: Patient declines
    ActiveConsent --> PartialRevocation: Patient revokes some categories
    ActiveConsent --> FullRevocation: Patient revokes all
    PartialRevocation --> ActiveConsent: Patient re-grants categories
    FullRevocation --> NoConsent: All consent withdrawn
    ConsentDenied --> ConsentPending: Patient reconsiders
    
    ActiveConsent --> ConsentExpired: 12 months elapsed
    ConsentExpired --> ConsentPending: Renewal required
```

> [!WARNING]
> **Consent revocation must be immediate.** When a patient revokes consent for a category, all future queries for that data type must return empty results within 60 seconds. Historical data is not deleted but is access-blocked.

---

## Flow 4: Proxy Access

### Overview
In rural Bangladesh (~63% of population), many patients — especially elderly, children, and those with disabilities — cannot manage their own digital health records. A proxy (family member) is appointed to manage access.

```mermaid
sequenceDiagram
    autonumber
    actor P as Patient (রোগী)
    actor PR as Proxy (অভিভাবক)
    participant S as Registration Staff
    participant APP as Health Card App
    participant FHIR as FHIR Server
    participant AUTH as Auth Service

    P->>S: Requests proxy access for family member
    S->>APP: Initiate proxy registration
    
    APP->>APP: Verify patient Health ID
    APP->>S: "অভিভাবকের জাতীয় পরিচয়পত্র দিন"
    PR->>S: Shows NID
    S->>APP: Enter proxy NID
    
    APP->>APP: Verify proxy is NOT the patient
    APP->>APP: Record relationship (parent, child, spouse, guardian)
    
    APP->>AUTH: Create proxy credential
    AUTH-->>APP: Proxy PIN generated
    
    APP->>FHIR: POST /RelatedPerson {patient, proxy, relationship}
    FHIR-->>APP: 201 Created
    
    APP->>FHIR: POST /Consent {patient, proxy_scope, categories}
    FHIR-->>APP: 201 Created
    
    APP->>PR: SMS: "আপনি [Patient Name]-এর প্রতিনিধি হিসেবে নিবন্ধিত হয়েছেন। PIN: XXXX"
    
    Note over PR: Proxy can now:<br/>- View patient records (with PIN)<br/>- Give consent on behalf<br/>- All access is logged separately
```

### Proxy Access Rules

| Rule | Details |
|------|---------|
| Maximum proxies per patient | 3 |
| Proxy must have NID | Required for identity verification |
| Proxy PIN | 4-digit, separate from patient's credentials |
| Access logging | Every proxy access logged with proxy ID |
| Patient notification | Patient notified of every proxy access (SMS) |
| Revocation | Patient can revoke proxy access anytime |
| Automatic expiry | Proxy access expires after 12 months, requires renewal |
| Restricted categories | Proxy cannot access mental health or reproductive health by default |

---

## Flow 5: Cross-Facility Data Sharing

### Overview
A patient registered at Facility A visits Facility B. Facility B needs to access the patient's history from Facility A.

```mermaid
sequenceDiagram
    autonumber
    actor P as Patient
    participant FB as Facility B (New)
    participant FHIR as Central FHIR Server
    participant FA as Facility A (Original)

    P->>FB: Arrives, shows Health Card QR
    FB->>FB: Scan QR, extract Health ID
    
    FB->>FHIR: GET /Patient?identifier=9XXXXXXXXX
    FHIR-->>FB: 200 OK {Patient resource}
    
    FB->>FHIR: GET /Consent?patient={id}&status=active
    FHIR-->>FB: 200 OK {consent scopes}
    
    Note over FB: Check: Does patient consent<br/>cover data sharing with<br/>this facility type?
    
    alt Consent Granted
        FB->>FHIR: GET /Encounter?patient={id}&_sort=-date&_count=10
        FHIR-->>FB: 200 OK {recent encounters}
        
        FB->>FHIR: GET /Condition?patient={id}&clinical-status=active
        FHIR-->>FB: 200 OK {active conditions}
        
        FB->>FHIR: GET /MedicationRequest?patient={id}&status=active
        FHIR-->>FB: 200 OK {current medications}
        
        FB->>FHIR: GET /AllergyIntolerance?patient={id}
        FHIR-->>FB: 200 OK {allergies}
        
        FB->>FB: Display patient summary with history
        
        FB->>FHIR: POST /AuditEvent {who: "Facility B", what: "Patient data accessed"}
        
        Note over FB: Doctor sees:<br/>- Previous diagnoses from Facility A<br/>- Current medications<br/>- Allergies<br/>- Last lab results
    else Consent Denied
        FB->>FB: Display: "রোগী এই ধরনের তথ্য শেয়ারে সম্মতি দেননি"
        FB->>FB: Proceed with fresh intake
    end
```

> [!TIP]
> **For districts with poor connectivity:** The system caches the patient's summary locally (encrypted) for 24 hours after a successful fetch. If the next facility visit happens within 24 hours and connectivity fails, the cached summary can be used (with appropriate audit logging).

---

## Flow 6: Health Card Update

### Overview
When patient information changes (address, phone number, emergency contacts, marital status, etc.), a verified update flow ensures data integrity.

```mermaid
flowchart TD
    A["Patient Requests Update"] --> B{"What type of update?"}
    
    B -->|"Demographics<br/>(address, phone)"| C["Staff enters new info"]
    B -->|"Medical<br/>(blood type, allergy)"| D["Clinician enters new info"]
    B -->|"Identity<br/>(name correction)"| E["Requires supervisor approval"]
    
    C --> F["Patient confirms via PIN/OTP"]
    D --> G["Clinician verifies & signs"]
    E --> H["Supervisor reviews<br/>NID document check"]
    
    F --> I["FHIR Patient UPDATE"]
    G --> I
    H --> I
    
    I --> J["Audit Event Created"]
    J --> K["Previous version retained<br/>(version history)"]
    K --> L["SMS: তথ্য আপডেট হয়েছে"]

    style A fill:#0984e3,color:#fff
    style L fill:#00b894,color:#fff
```

### Update Authorization Matrix

| Field Category | Who Can Update | Requires |
|---------------|---------------|----------|
| Phone number | Patient, Staff | OTP verification |
| Address | Patient, Staff | Patient confirmation |
| Emergency contacts | Patient, Staff | Patient confirmation |
| Blood type | Clinician only | Lab report reference |
| Allergies | Clinician only | Clinical documentation |
| Name correction | Supervisor + Patient | NID document review |
| Date of birth correction | System admin only | NID/BRN verification |
| NID/BRN linkage | System admin only | Identity documents |

---

## Flow 7: Lost Card Recovery

### Overview
A patient who has lost their physical Health Card can recover their Health ID and get a new card issued.

```mermaid
flowchart TD
    A["Patient reports lost card<br/>at any facility"] --> B["Staff asks for NID/BRN"]
    B --> C{"NID/BRN available?"}
    
    C -->|Yes| D["Verify NID/BRN against system"]
    C -->|No| E["Verify via:<br/>1. Name + DOB + Father's name<br/>2. Biometric (if available)<br/>3. Mobile OTP"]
    
    D --> F["Patient identity confirmed"]
    E --> F
    
    F --> G["Deactivate old card QR token"]
    G --> H["Generate new QR token"]
    H --> I["Issue new physical card"]
    I --> J["Update digital card token"]
    J --> K["Audit log: Card reissued"]
    K --> L["SMS: নতুন হেলথ কার্ড ইস্যু হয়েছে।<br/>পুরানো কার্ড নিষ্ক্রিয় করা হয়েছে।"]

    style A fill:#e17055,color:#fff
    style L fill:#00b894,color:#fff
```

> [!IMPORTANT]
> The **Health ID number itself does NOT change** when a card is reissued. Only the QR token and physical card are replaced. This ensures continuity of all linked medical records.

---

## Flow 8: Emergency Break-Glass Access

### Overview
When a patient is unconscious, unresponsive, or otherwise unable to provide consent, ER doctors can invoke "break-glass" emergency access to retrieve minimal critical health information.

```mermaid
sequenceDiagram
    autonumber
    actor DOC as ER Doctor
    participant APP as Emergency System
    participant AUTH as Auth Service
    participant FHIR as FHIR Server
    participant AUDIT as Audit Service
    participant P as Patient (Notified Later)

    Note over DOC: Patient unconscious,<br/>Health Card found on person

    DOC->>APP: Scan patient's QR code
    APP->>APP: Normal access → Consent check
    
    Note over APP: Consent not obtainable<br/>(patient unconscious)

    DOC->>APP: Invoke BREAK GLASS 🔓
    APP->>AUTH: Verify doctor credentials + emergency role
    AUTH-->>APP: Doctor verified: Dr. [Name], Reg# [BMDC]
    
    APP->>APP: Require reason selection:<br/>1. Patient unconscious<br/>2. Life-threatening emergency<br/>3. Unable to communicate

    DOC->>APP: Selects: "Patient unconscious"
    
    APP->>FHIR: GET /Patient/{id} [EMERGENCY FLAG]
    FHIR-->>APP: Minimal record only
    
    Note over APP: Break-glass returns ONLY:<br/>- Name, Age, Gender, Blood Type<br/>- Active allergies (CRITICAL)<br/>- Current medications<br/>- Chronic conditions<br/>- Emergency contacts<br/><br/>Does NOT return:<br/>- Full medical history<br/>- Mental health records<br/>- Reproductive health<br/>- Financial information

    APP->>AUDIT: POST /AuditEvent {type: "break-glass", doctor, patient, reason, timestamp}
    
    APP->>APP: Start 30-min access timer
    
    Note over P: When patient recovers:<br/>SMS: "আপনার জরুরি চিকিৎসার জন্য<br/>Dr. [Name] আপনার স্বাস্থ্য তথ্য<br/>দেখেছেন। বিস্তারিত: [link]"
```

### Break-Glass Parameters

| Parameter | Value |
|-----------|-------|
| Access duration | 30 minutes (auto-expires) |
| Data scope | Allergies, medications, chronic conditions, blood type, emergency contacts |
| Excluded data | Mental health, reproductive health, full history |
| Required credentials | BMDC-registered doctor with ER privileges |
| Audit level | Full audit trail — doctor ID, time, data accessed, reason |
| Patient notification | SMS + in-app notification when patient recovers |
| Review process | All break-glass events reviewed by hospital ethics within 48 hours |
| Abuse penalty | Account suspension, BMDC notification |

---

## Flow 9: Offline Registration & Sync

### Overview
Many rural facilities in Bangladesh lack reliable internet connectivity. The system supports full offline registration with intelligent sync when connectivity is restored.

```mermaid
stateDiagram-v2
    [*] --> Online: Internet available
    [*] --> Offline: No internet
    
    Online --> Registration: Normal registration flow
    Registration --> FHIRSync: Direct FHIR write
    FHIRSync --> [*]: Complete
    
    Offline --> OfflineReg: Offline registration
    OfflineReg --> LocalDB: Save to IndexedDB
    LocalDB --> QueuedSync: Added to sync queue
    
    QueuedSync --> ConnCheck: Periodic connectivity check
    ConnCheck --> QueuedSync: Still offline
    ConnCheck --> SyncProcess: Internet restored
    
    SyncProcess --> ConflictCheck: Check for conflicts
    ConflictCheck --> AutoResolve: No conflicts
    ConflictCheck --> ManualResolve: Conflicts found
    
    AutoResolve --> FHIRSync
    ManualResolve --> StaffReview: Staff reviews conflicts
    StaffReview --> FHIRSync
```

### Offline Capabilities

| Capability | Offline Support | Sync Strategy |
|-----------|----------------|---------------|
| New patient registration | ✅ Full | Queue + auto-sync |
| QR code generation | ✅ Temporary QR (valid 72h) | Replace with permanent on sync |
| Health ID generation | ✅ Provisional ID (prefix `P9`) | Replace with permanent ID on sync |
| Patient lookup (cached) | ✅ If previously cached | Auto-refresh on sync |
| Patient lookup (new) | ❌ Not available | Requires connectivity |
| Consent recording | ✅ Full | Queue + auto-sync |
| Encounter creation | ✅ Full | Queue + auto-sync |
| Cross-facility lookup | ❌ Not available | Requires connectivity |

### Conflict Resolution Rules

| Conflict Type | Resolution Strategy |
|--------------|-------------------|
| Duplicate Health ID | Server ID takes precedence; provisional ID mapped |
| Demographics mismatch | Latest timestamp wins; both versions retained for audit |
| Consent conflict | Most restrictive consent wins (patient protection) |
| Duplicate registration | Master Client Index deduplication; records merged |

> [!CAUTION]
> **Provisional Health IDs (prefix `P9`) are valid for a maximum of 72 hours.** If a facility remains offline for more than 72 hours, new registrations are paused and patients are given paper-only records until connectivity is restored.

---

## Error Handling & Edge Cases

### Common Error Scenarios

| Scenario | System Response | User Message (Bangla) |
|----------|----------------|----------------------|
| NID verification API down | Fallback to manual verification + offline queue | "NID যাচাই সাময়িকভাবে অনুপলব্ধ। ম্যানুয়াল যাচাই করুন।" |
| Duplicate NID detected | Block registration, show existing record | "এই NID দিয়ে ইতিমধ্যে নিবন্ধন আছে।" |
| QR code damaged/unreadable | Fallback to NID manual lookup | "QR কোড পড়া যাচ্ছে না। NID নম্বর দিন।" |
| FHIR server timeout | Retry 3x, then offline mode | "সার্ভারে সংযোগ হচ্ছে না। অফলাইন মোডে চলছে।" |
| Consent service down | Cache consent locally, sync later | "সম্মতি সাময়িকভাবে স্থানীয়ভাবে সংরক্ষিত হবে।" |
| Break-glass abuse detected | Alert hospital admin + BMDC | Internal alert only |
| Proxy PIN forgotten | OTP to proxy's registered mobile | "PIN ভুলে গেছেন? OTP পাঠানো হচ্ছে।" |
| Card printer offline | Generate digital QR only | "কার্ড প্রিন্টার অনুপলব্ধ। ডিজিটাল কার্ড তৈরি হয়েছে।" |

### Rate Limits

| Operation | Rate Limit | Reason |
|-----------|-----------|--------|
| NID verification | 10/min per facility | API provider limit |
| Patient lookup | 100/min per facility | Server load management |
| Break-glass access | 5/hour per doctor | Abuse prevention |
| Consent updates | 20/min per patient | Prevent rapid toggling |
| QR code scans | 200/min per facility | Normal clinical throughput |

### Data Validation Rules

| Field | Validation | Error Message |
|-------|-----------|---------------|
| NID | 10 or 17 digits, numeric only | "NID ১০ বা ১৭ সংখ্যার হতে হবে" |
| BRN | 17 digits, starts with birth year | "জন্ম নিবন্ধন নম্বর সঠিক নয়" |
| Mobile | 11 digits, starts with 01 | "মোবাইল নম্বর ০১ দিয়ে শুরু হতে হবে" |
| Health ID | 10 digits, starts with 9 | System-generated only |
| Date of Birth | Cannot be future, age ≤ 130 | "জন্ম তারিখ সঠিক নয়" |
| Blood Type | One of: A+, A-, B+, B-, AB+, AB-, O+, O- | "রক্তের গ্রুপ সঠিক নয়" |

---

> [!NOTE]
> **Document Version:** 1.0.0 | **Last Updated:** November 2026 | **Diagrams:** 9 Mermaid diagrams
> All flows follow FHIR R4 standards and BD Core IG v0.4.6 specifications.
