# Problem → Solution
## Why Bangladesh needs CareLoop, and how each problem is solved

> This is the dedicated problem-and-solution file for the digital medicare platform planned in [`UNIFIED_PLATFORM_PLAN.md`](./UNIFIED_PLATFORM_PLAN.md).
>
> **Format for every entry:** The problem → the evidence (numbers + source) → who suffers → the root cause → the solution (which module/feature) → how it works → the outcome we measure.

---

## Table of contents

- [Part A — Patient problems](#part-a--patient-problems)
- [Part B — Doctor problems](#part-b--doctor-problems)
- [Part C — Hospital and system problems](#part-c--hospital-and-system-problems)
- [Part D — Medicine and pharmacy problems](#part-d--medicine-and-pharmacy-problems)
- [Part E — Workforce and education problems](#part-e--workforce-and-education-problems)
- [Part F — Trust, corruption and governance problems](#part-f--trust-corruption-and-governance-problems)
- [Part G — Why previous digital efforts failed](#part-g--why-previous-digital-efforts-failed)
- [Part H — Master problem → solution matrix](#part-h--master-problem--solution-matrix)

---

## Part A — Patient problems

### A1. Health costs are destroying household budgets

- **Problem:** Patients pay for nearly everything out of their own pocket — at the point of illness, when the family has the least capacity.
- **Evidence:** **79.31%** of total health spending is out-of-pocket (World Bank, 2023) — the worst in South Asia (India ~45%). The poorest quintile spends **~35% of income** on health vs 5% for the richest; insurance covers **<1%** of the population.
- **Root cause:** No prepaid protection, no cost transparency, and cash systems dominated by brokers who inflate prices.
- **Solution:** Price transparency everywhere (C-listing fees, diagnostic and medicine prices shown before booking) + **Prodona** (verified medical crowdfunding with direct-to-hospital billing, so donations can't be diverted) + corporate/RMG health wallets so employees pre-pay at salary time.
- **Measured outcome:** Median price quoted vs median price paid (variance should be ~zero); % of episodes with a pre-known total cost; crowdfund dollars reaching hospital invoices (100% target).

### A2. Getting seen: queues, hours, no booking

- **Problem:** Patients arrive, queue for hours, nobody can say when they'll be seen; doctors give **~48-second** consultations (shortest of 67 countries, BMJ Open).
- **Evidence:** DMCH ~7,000 OPD/day; Keraniganj UHC 450–500/day; India's equivalent (Scan & Share) cut waits from 30–40 min to 5–10 min.
- **Root cause:** No digital check-in; the queue lives in a paper register.
- **Solution:** **Module 01 (Scan & Share)** — patient's Health-ID QR → instant token → live queue on a screen → doctor sees the history alongside.
- **How it works:** Patient scans at counter or books online; the counter tablet resolves the Health ID, issues a numbered token, and the doctor's screen loads consent-gated history — no form-filling, no "which hospital were you at again?"
- **Measured outcome:** Median minutes from arrival to token; token-to-consult time; % of consults that started with a full history available.

### A3. Wrong door: self-referral chaos

- **Problem:** Patients skip the local system and storm tertiary hospitals directly — or shuttle between 3+ facilities in a crisis.
- **Evidence:** **59%** of tertiary inpatients self-referred; **58%** didn't know a referral system exists; **33%** of women who died from pregnancy causes had shuttled between 3+ facilities.
- **Root cause:** Referral is a paper slip with no reply, no tracking, no return path.
- **Solution:** **ReferLoop / Module 02's referral state machine** — structured referral; specialist replies asynchronously ("manage locally, here's the advice") or accepts and offers a slot; *back-referral note* returns the patient with a plan.
- **Measured outcome:** % of referrals answered within agreed SLA; % managed at first-line level without travel; % received with a back-referral note (the loop-closure rate).

### A4. Test results: delayed, repeated, lost

- **Problem:** Reports come days later on paper; many patients re-pay for re-tests because the report vanished.
- **Evidence:** OpenELIS runs in ~100 hospitals but never notifies; patients repeat tests routinely; 52% of diagnostic equipment sits idle (worsening delays).
- **Root cause:** The machine speaks LIS, the patient speaks paper — nobody bridges.
- **Solution:** **Module 02 (ReportReady)** — results auto-file to the Health ID; patient gets a Bangla SMS with a PIN; physicians get **critical-value alerts** in real time.
- **Measured outcome:** Hours from result-ready to patient-knowing (Zambia's SMS model replaced a 44.2-day postal pipeline); re-test rate.

### A5. Records: every visit starts from zero

- **Problem:** Nobody, anywhere in the country, can see the patient's history.
- **Evidence:** 51.4% paper records; only **4.81%** of physicians keep digital records; **22%** store nothing at all.
- **Root cause:** No identifier, no spine, no habit.
- **Solution:** **Health ID (07) + Integrated Core (05)** — one NID/BRN-keyed ID; every encounter, Rx, report and admission writes to one longitudinal FHIR record; consent-gated access with a patient-visible audit.
- **Measured outcome:** % of new encounters with ≥1 prior record visible; record completeness score.

### A6. Emergency capacity is hidden behind phone calls (ICU, blood, radiotherapy)

- **Problem:** Families beg by phone across hospitals while their patient decompensates.
- **Evidence:** **1.7 ICU beds per 100,000**; **38 of 64 districts have zero ICU beds**; 148%/137% bed occupancy; **7,500 radiotherapy patients waiting** with 4 of 6 NICRH machines down; blood banks hold stock nobody can see (1M+ bags/yr needed, only ~30% voluntary donation).
- **Root cause:** Capacity exists but is invisible; brokers (dalals) charge for what should be public information.
- **Solution:** **Modules 04 (ICU Beds), 08 (Blood Bank), 09R (RadioQ)** — verified real-time dashboards, anti-gaming audit logs, ambulance pre-alert, published-rule priority lists, rare-blood donor network.
- **Measured outcome:** Time-to-located-bed; % radiotherapy patients informed of position + estimated date; units wasted at expiry (blood FIFO).

### A7. Chronic disease: diagnosed late, followed up never

- **Problem:** NCDs (hypertension, diabetes, heart disease) kill quietly — over two-thirds of deaths — but are diagnosed late and never followed up.
- **Evidence:** 15.8% of adults have *undiagnosed* hypertension vs 12.2% diagnosed; NCDs cause **68% of deaths**; 415,286 CVD deaths in 2024 alone.
- **Root cause:** Community clinics have no protocol support, no register, no recall system.
- **Solution:** **Module 12 (NCD Sathi)** — offline Bangla protocol assistant for CHCPs, risk classification, auto-registry, recall reminders; combined with chronic-medicine refill subscriptions (the retention engine: refills bring patients back *before* they decompensate).
- **Measured outcome:** % HTN/diabetes patients detected; % on treatment with a visit/refill in last 90 days; BP/GLU control rates.

### A8. Shared phones, low literacy, no English

- **Problem:** The health-illiterate rural patient can't use a typical health app.
- **Evidence:** 73% of households own smartphones but only **26% of rural individuals** use one — phones are shared; internet-user penetration ~44%.
- **Root cause:** Apps assume a personal smartphone, literacy, and English.
- **Solution:** **Bangla-first, voice-first, icon-first design + IVR/USSD parity + agent-assisted channel + printed QR cards + family profiles with proxy access** (full matrix in §7.5 of the plan).
- **Measured outcome:** Task-completion rate for low-literacy users in testing; % of transactions done via assisted/IVR channels.

---

## Part B — Doctor problems

### B1. The 48-second consult is a system failure, not a character flaw

- **Problem:** Doctors must finish history, exam, diagnosis and prescription in under a minute — quality is structurally impossible.
- **Evidence:** **92.7%** of physicians report high workload; **70%** can't complete proper history-taking; specialists see 50–60 patients/day.
- **Root cause:** No triage upstream, no records downstream — every patient is "fresh paper."
- **Solution:** The whole loop: **triage routes to the right level (C2)**, the scan-and-share check-in delivers **pre-loaded history**, the **structured e-Rx (03)** removes write-time, and **teleconsult offloads straightforward cases** to graded channels.
- **Measured outcome:** Median consult length for engaged doctors; % history pre-loaded.

### B2. Practicing in 2026 with zero digital tools

- **Problem:** No scheduling, no EMR, no analytics, manual fee collection across multiple chambers.
- **Evidence:** ~**4.8%** EMR adoption; chamber-software market is fragmented and tiny (DoctorKoi, Prescriply, CloudRx — competing on nearly identical features).
- **Root cause:** Nothing integrated, nothing verified, nothing cheap.
- **Solution:** **Chamber-in-a-box (Doctor tools)** — token+queue, structured e-Rx with DGDA-catalog autocomplete and interaction safety, teleconsult income, analytics. Free tier seeds supply (the Practo pattern); paid tiers add analytics and volume.
- **Measured outcome:** # of doctor-days digitized; e-Rx share of listed doctors' consults.

### B3. Prescriptions: legibility, safety, rationality

- **Problem:** Handwritten Rx is the system's core data object — and it's unreadable, uncheckable, and unenforceable.
- **Evidence:** ~80% of handwriting illegible; **56.6%** of antibiotic purchases happen without any prescription; only **27.4%** of rural prescriptions are rational.
- **Root cause:** The prescription was never data; it was ink.
- **Solution:** **Module 03** — structured digital Rx, signed, QR-verifiable; **AWaRe antibiotic guardrails**; drug-interaction checks against the DGDA catalog; dispense events feed back to prescribers (only 31.9% of doctors get *any* prescribing feedback today).
- **Measured outcome:** % antibiotic Rx with an AWaRe-consistent choice; interaction warnings acknowledged; antibiotics-sales-without-Rx rate (Part D).

### B4. Referrals eat doctor time on both sides

- **Problem:** Specialists answer unmanageable direct flows; first-line doctors fax hope into the void.
- **Solution:** **Asynchronous referral inbox** (9→B flows in §7.4) — specialists triage their own inbox by urgency, answer in "advice vs accept" modes, get every back-referral note; CPD-credit logging rewards participation.
- **Measured outcome:** Median specialist reply time (South Africa's Vula achieves ~16 min); % of first-line cases resolved without physical referral.

### B5. Rural posts nobody wants and specialists concentrated in Dhaka

- **Problem:** Doctors cluster in cities; rural stations can't hold staff (Tk 1–2 lakh bribes to escape postings).
- **Root cause:** Professional isolation is the real objection, not only pay.
- **Solution:** **Teleconsult gives rural-serving doctors metropolitan clientele and income**; a rural-based physician's tele-practice and recorded case-mix build a tracked professional profile; NCD Sathi gives CHCP-level staff real decision support so the platform doesn't wait for a doctor to arrive.
- **Measured outcome:** % of teleconsult minutes delivered to non-Dhaka patients; # of rural facilities with platform-supported staff.

---

## Part C — Hospital and system problems

### C1. Equipment is down, and hospitals don't budget to fix it

- **Problem:** Expensive machines sit dead; service gaps dominate; money exists but is unspent.
- **Evidence:** **52%** of diagnostic equipment unused for 1+ year; **79%** of service gaps trace to breakdowns; **94%** of institutions ended the year with unspent budgets.
- **Root cause:** No uptime visibility, no SLA clock, nobody upstream sees the aggregate waste.
- **Solution:** **Module 10 (YantraTrack)** — QR sticker on every device; one-scan fault report → task ticket → SLA timer (NEMEMW&TC) → public uptime per facility.
- **Measured outcome:** Mean time-to-repair; % device fleet reporting uptime; equipment-in-service rate.

### C2. Medicine shelf is empty even when money was allocated

- **Problem:** Essential medicines are chronically unavailable at the exact facilities designed to serve the poor.
- **Evidence:** **22%** average availability; **84%** of patients return empty-handed from public facilities.
- **Root cause:** No stock transparency at facility level; no alternative guidance to patients.
- **Solution:** **Module 06 (Medicine Stock)** — geolocated finders for patients ("nearest facility with it"), generic-equivalent advisor, eLMIS bridge so supply planners see the truth.
- **Measured outcome:** Fill-rate per item per facility; % of prescriptions findable within 5 km.

### C3. Infectious-disease surveillance happens in spreadsheets, months late

- **Solution:** Admin dashboards built as a by-product of real transactions (consultations, dispenses, test results) — never a "please report" burden; DHIS2/NDHIE-compatible exports.

---

## Part D — Medicine and pharmacy problems

### D1. Counterfeit and substandard medicine

- **Problem:** A large fake-drug market thrives in plain sight.
- **Evidence:** Academic testing finds **~10% substandard in Dhaka / ~20% outside Dhaka**; ~66 of 324 licensed manufacturers may exist only on paper; counterfeit sales estimated **Tk 600–1,500 crore/yr**.
- **Root cause:** No consumer-verifiable authenticity; shell manufacturers laundered past weak inspections.
- **Solution:** **Module 13 (DrugVerify)** — scan the 2D DataMatrix/batch: DGDA registration, manufacturer existence, expiry; one-tap "report suspicious drug" feeding DGDA enforcement queues.
- **Measured outcome:** # scans; % flagged batches escalated; pharmacy listing revocations.

### D2. Antibiotics dispensed like sweets

- **Problem:** Antibiotic resistance is being manufactured at the pharmacy counter.
- **Evidence:** **56.6%** of antibiotic purchases without prescription; **73.5%** of sold antibiotics are WHO "Watch"-class; rural quacks prescribe correctly first-line in pneumonia **3.2%** of the time.
- **Root cause:** No Rx-verification gate on dispensing; no economic upside for compliance.
- **Solution:** **Module 11 (AMR Lens)** + the §8 Drug Gate: Rx-only drugs can't be dispensed without a valid e-Rx (platform or verified upload); every dispense event feeds AWaRe dashboards; pharmacies in compliance get verified-badges (and the order flow privileges compliant pharmacies).
- **Measured outcome:** Watch-class sale rate trend; % dispense events with valid Rx; reduction vs baseline.

### D3. Pharmacies that can't hire pharmacists

- **Problem:** Shops legally can't run safely.
- **Evidence:** Only **7.56%** of Dhaka pharmacies have a registered pharmacist; 0.6% of dispensers nationwide are pharmacy graduates; >250,000 shops, many unlicensed.
- **Solution:** DGDA-catalog POS **prompts** dosage/safety and locks Rx-only items behind verification — raising the floor even where human expertise is absent, while flagging shops that persist in violation.

---

## Part E — Workforce and education problems

### E1. 32% of the "health workforce" has no qualification

- **Problem:** Informal providers dominate rural care — and they prescribe and profit off the drugs they sell (**78%** earn from medicines they dispense).
- **Root cause:** Nothing distinguishes qualified from unqualified at the point of choice; enforcement can't inspect 5,000+ illegal facilities.
- **Solution:** **Verified-doctor registry + visible badges + report-a-quack flow** (BMDC reconciliation queue in §6.6 of the plan); price comparison crowds out unverified providers from the demand side; platform listings become the de-facto public facing directory.
- **Measured outcome:** % of listed practitioners with verified registrations; fake-practitioner reports trend.

### E2. Medical training is under-assessed

- **Problem:** Interns and students pass without demonstrated competencies.
- **Evidence:** **66%+** of interns assessed only by signature; ~**54%** no assessment after major rotations; ~43% of teaching posts vacant; only 2 colleges BMEAC-accredited.
- **Solution:** **Module 15 (InternLog)** — competency e-logbook; each recorded procedure needs supervisor OTP/QR sign-off; becomes accreditation evidence for BMEAC instead of fiction.
- **Measured outcome:** % interns with signed procedure logs; % rotations assessed.

### E3. Health workers face violence and stay silent

- **Solution:** **Module 14 (FeedbackLoop)** — bidirectional: patients rate facilities; staff report incidents into a registry (today **>80%** experienced/witnessed violence, only ~**25%** reported) with escalation, building the evidence base the HRM system lacks.

### E4. Medical colleges run their entire campus on WhatsApp and notice boards

- **Problem:** The teaching hospital is a *campus AND a hospital* — but only the hospital gets technology. Courses, assignments, quizzes, lectures, grades, duty rosters and academic records all live in chat threads and photocopies.
- **Evidence:** ~103 colleges (only **2** BMEAC-accredited); **43% of teaching posts vacant** with no tool to amplify the teachers who do exist; >66% of interns assessed by signature alone; zero per-item assessment analytics anywhere; **28.8% depression** prevalence among students with no institutional monitoring.
- **Root cause:** No campus system was ever built for medical colleges specifically — generic university LMSes don't understand rotations, procedures, ward duty, or accreditation evidence.
- **Solution:** **Module 16 (MedEdu)** — an EduSync-derived multi-tenant campus layer embedded in the platform: course offerings and rotations as enrollable units, assignments with grading queues, **timed auto-graded quizzes** (server-authoritative clock, randomized order, per-item `p-value`/discrimination analytics), study groups and 1:1 real-time chat (Socket.IO + Redis bridge), lecture publishing against the faculty shortage, duty rosters with half-open-interval overlap warnings, GPA/CGPA transcripts, append-only audit chains feeding BMEAC evidence packs, and a fail-closed DGME/BMEAC cross-tenant read console.
- **How it works with the rest of the platform:** students and interns share one identity (Module 15/07) — a rotation *is* an enrollment, a graded case write-up is *credit*, and the procedure the student performed during that ward shift auto-links to their InternLog ledger. Nothing is a second account.
- **Measured outcome:** median grading turnaround (< 7 days for ≥80%); % quizzes with published item analytics; lecture rewatch hours; duty-roster collisions (target 0); accreditation evidence packs generated on demand.

---

## Part F — Trust, corruption and governance problems

### F1. Brokers and bribes at every door

- **Evidence:** **48.7%** of government-facility users experienced corruption (avg bribe Tk 680); **31%** used dalals at DMCH; doctors take 30–50% diagnostic commissions; C-section kickbacks Tk 500–5,000.
- **Root cause:** Information asymmetry is monetized by intermediaries.
- **Solution:** Transparency is the anti-dalal: published prices (booking, tests, medicine), digital queue tokens (impossible to charge for what's free and instant), verified-capacity dashboards, and **Module 14 grievance escalation** with an audit trail.
- **Measured outcome:** Bribe-encounter reporting rate; queue-token "paid for" incidents (target ~0); price variance reporting.

### F2. 114 fragmented digital initiatives that talk to nothing

- **Evidence:** MOHFW maps **114** fragmented e-health initiatives (54 by DGHS alone); DHIS2 excludes urban NCD data; OpenMRS automation at only 62 facilities since 2012.
- **Root cause:** Each initiative built its own island.
- **Solution:** **Everything speaks BD Core FHIR from day one** (one spine, one consent engine, one audit log); every module exports to DHIS2/NDHIE; modules are open-source so government can adopt rather than commission (Babyl's lesson).

### F3. Privacy risk under PDPO 2025

- **Solution:** Consent artifacts everywhere (granular, purpose-locked, time-boxed), patient-visible access log, break-glass for emergencies but always audited + patient-notified, breach-notification workflow, DPO role, regional data residency.

---

## Part G — Why previous digital efforts failed

Learning from real failures — this platform's design decisions exist *because* of these:

| Failed effort | What happened | What it teaches here |
|---|---|---|
| **Shastho Batayon 16263** (govt telehealth) | 27.2M calls; then provider unpaid 22 months, staff halved, ~3,000–3,500 calls/day answered out of ~6,500 | Don't run demand on donor/political funding — every channel needs its own revenue (agent commissions) |
| **DGHS rural telecentres** | 234 centres → ~35 after USAID cut | Same lesson, plus: assisted agents must be *market actors*, not grantees |
| **Doctorola** (booking marketplace) | Went dormant: patients wouldn't pay commissions, hospitals wouldn't either; CAC brutal | Build the **retention loop** (refills, vault) so value doesn't depend on booking commissions alone |
| **Babyl Rwanda** | Collapsed with its private vendor (2023) | Open-source the spine; design the government-ownership handover early |
| **Kenya M-TIBA** | Health wallet shut 2026 | Payment rails ≠ product moat; use bKash/Nagad/SSLCommerz, don't build a wallet |
| **Brazil SISREG** | Central ICU register bypassed: 33% late authorizations, 54% admissions bypass | Central lists (RadioQ, ICU beds) need published rules + audits + stakeholder buy-in, not just a database |
| **India Kilkari** | 16M reach, no behavioral outcome change | Track **outcomes** (loops closed, referrals answered), not reach badges |
| **Babylon-style symptom checker overclaims** | Regulatory backlash for "AI diagnosis" | Triage routes; it never diagnoses; LLMs never speak medicine directly to patients |

---

## Part H — Master problem → solution matrix

| # | Problem (with the killer number) | Solution module | Phase |
|---|---|---|---|
| 1 | 79.31% out-of-pocket spending | Price transparency + Prodona + corporate wallets | P2/P4 |
| 2 | 48-second consults, hours-long queues | Module 01 Scan & Share + triage | **P0** |
| 3 | 59% self-referral, no return path | Module 02/ReferLoop state machine | **P0** |
| 4 | Lost/lated/repeated lab reports | Module 02 ReportReady (SMS + vault) | **P0** |
| 5 | 51.4% paper records, 22% nothing | Modules 07+05 (Health ID + FHIR spine) | P1 |
| 6 | 1.7 ICU beds/100k, invisible | Module 04 + ambulance pre-alert | P3 |
| 7 | Blood bank invisibility | Module 08 | P3 |
| 8 | 7,500 waiting on radiotherapy | Module 09R RadioQ | P3 |
| 9 | 22% essential-drug availability | Module 06 stock finder + eLMIS | P3 |
| 10 | ~80% illegible Rx, 56.6% antibiotics without Rx | Module 03 e-Rx + AWaRe | **P0** |
| 11 | Tk 600–1,500 crore counterfeit drugs | Module 13 DrugVerify | P4 |
| 12 | 52% equipment idle, 94% unspent budget | Module 10 YantraTrack | P4 |
| 13 | 15.8% undiagnosed hypertension | Module 12 NCD Sathi + refill loop | P2/P4 |
| 14 | 48.7% facility corruption, dalals | FeedbackLoop (14) + transparency tokens | P2/P4 |
| 15 | 32% unqualified workforce, fake doctors | BMDC verification gate + registry reconciliation | P1 |
| 16 | 66% signature-only intern assessment | Module 15 InternLog | P4 |
| 17 | Telehealth dying from funding politics | Agent-commission model (sustainability, §9) | P1 |
| 18 | No complaint channel, violence unreported | Module 14 bidirectional feedback | P4 |
| 19 | 114 data islands | One FHIR spine + NDHIE exports (all modules) | foundation |
| 20 | Shared phones / literacy barrier | IVR+USSD+agent parity, Bangla-first, print QR | foundation |
| 21 | Medical colleges on WhatsApp & notice boards; no assessment analytics; accreditation blind | Module 16 MedEdu (courses · quizzes · groups · lectures · rosters · evidence chains) | post-P4 |

**Phase key** (from rollout roadmap §11): **P0** = hackathon wedge · P1 = records + verification · P2 = access/treatment commerce · P3 = supply visibility · P4 = governance layer.

---

### The closing argument

Every solution above hides inside someone's daily transaction — scanning a QR at a counter, writing a prescription, dispensing a strip of tablets, reporting a dead machine. That is deliberate: the system doesn't ask Bangladesh to *adopt* new behavior; it rides the behavior people already have (they come to facilities, they buy medicine, they get tests) and makes those exact moments produce data, transparency, and closed loops as a by-product.

The problems are documented. The solutions exist, proven elsewhere, legal now, and un-built here. That window is the entire opportunity.
