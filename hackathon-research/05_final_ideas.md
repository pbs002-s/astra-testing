# 05 — Ten ideas for the E-Health Hackathon (ranked), top 3, and one combined portal

**Rules used to pick these ideas**
- **Team size:** at most 3 people. The official site says "no more than three people", although your brief assumed 3–5.
- **Track names:** ideas use the 6 known priority areas, which are "primary care", "electronic records", "referrals", "pharmacy", "labs" and "ambulance services". They also use "e-Health Card / electronic records". The other 9 of the 15 priority areas were not obtained (see `01_hackathon_intel.md`).
- **Ruled out as generic:** telemedicine, appointment booking, symptom checkers, e-prescription and hospital management systems (HMS).
- **Competition check:** every idea's core was checked against `06_bangladesh_competitor_check` (the competitor notes). No idea is built on a core that is already SATURATED there.

**Integration targets available to everyone (from the notes)**
- **Bangladesh Core FHIR R4 sandbox** (a test server for the national health-data standard): `https://sandbox.fhir.dghs.gov.bd/fhir`. Implementation guide (IG) v0.4.6, status "informative". It covers:
  - identity (UHID/NID/BRN)
  - facility and organisation registry
  - immunisation, lab and condition profiles
  - medication profile coded to the DGDA drug registry
  - terminology (ICD-11, SNOMED subsets)
  - Source: [fhir.dghs.gov.bd](https://fhir.dghs.gov.bd/)
  - Where the guide has no profile for a resource (for example ServiceRequest or Task), use base FHIR R4 and say so in the pitch.
- **Health ID format:** one per person, issued after the NID or Birth Registration Number is verified, and it **begins with "9"**. The SHR (Shared Health Record) Master Client Index creates it — [SHR UHID](https://en.info.shr.dghs.gov.bd/uhidmci/). Use made-up IDs that start with 9. **Never use a real NID.**
- **DHIS2** (the national health-reporting system): Bangladesh runs one of the world's largest deployments — [UNICEF](https://www.unicef.org/rosa/media/3416/file/A%20Case%20Study%20Bangladesh%20Online.pdf). Use the public DHIS2 demo instance (get the current link from dhis2.org) and its standard Web API (`/api/dataValueSets`, `/api/tracker`).
- **Privacy law:** the Personal Data Protection Ordinance (PDPO) 2025 was gazetted on 6 Nov 2025. It treats health data as sensitive and requires explicit consent — [TBS](https://www.tbsnews.net/node/1281356). Enforcement under the 2026 government is [uncertain].

**How the scores work.** Each idea gets 1–5 on five measures: **U**niqueness, **F**easibility in 48h, **I**mpact, **J**udge-appeal and **D**ata availability. Total out of 25.

---

## Idea 1 — ScanShare OPD: QR Health-ID scan-and-share registration

**1. Pitch.** Patients show a QR code of their Health ID at the outpatient (OPD) counter. In about 10 seconds they get a token and their record opens, so staff stop retyping and patients stop repeating tests.

**2. Track / stakeholder.** e-Health Card / electronic records, plus primary care. **Primary: A (patients)**. Also E (hospital registration desks).

**3. Who suffers + evidence.**
- Outpatients queueing at crowded desks. DMCH handles about **7,000 OPD and emergency patients a day** [date uncertain] — [Dhaka Tribune](https://www.dhakatribune.com/bangladesh/health/405950/dmch-remains-busy-providing-services-during).
- Before going live, the Kaliganj UHC registration desk handled **more than 350 patients a day on paper** — [Thoughtworks](https://www.thoughtworks.com/en-gb/insights/blog/implementing-shared-health-record-platform-rural-bangladesh).
- Patients lose paper records and repeat tests (icddr,b, 2016) — [ICUH](https://programme.exordo.com/icuh2016/delegates/presentation/88/).
- **51.4%** of doctors use paper records (2021) — [Banglajol](https://www.banglajol.info/index.php/CMOSHMCJ/article/view/87838/57377).

**4. Foreign precedent.**
- **India, ABDM Scan & Share** (launched Oct 2022): registration wait cut **from 30–40 to 5–10 min**. By Nov 2024 it had issued **6.64 crore tokens at 17,481 facilities**. These are ministry figures, not an independent study — [MoHFW India](https://mohfw.gov.in/press-info/7908).
- Kerala's "Scan and Book" works the same way — [Onmanorama](https://onmanorama.com/news/kerala/2025/04/05/kerala-hospitals-digital-payments.html).
- **Why Bangladesh doesn't have it yet:** the Health ID only started in 2023, and the e-Health Card is still being rolled out. Online booking exists, but no QR registration at the counter. BMU launched online tickets in Oct 2025 — [Prothom Alo](https://en.prothomalo.com/bangladesh/ixcez1o38q).

**5. Uniqueness.** The competitor check rates this **NOT PRESENT**. The infrastructure it needs exists (Health ID, OpenMRS+ desks, e-Appointment portal), but nobody does QR scan-and-share. **Risk: DGHS may build it themselves.** Pitch it as an open-source module they can adopt.

**6. MVP (3 people, 24–48h).**
- **What to build:**
  - Patient app (PWA) shows a QR code containing the Health ID and a short-lived consent token. It works offline.
  - Counter tablet scans the QR, then looks up or creates a FHIR `Patient` on the sandbox (identifier system = Health ID). It creates an `Encounter`, prints a token number and pushes it to a queue display.
  - A "first-visit" fallback lets staff create a Health ID-style record with mock NID verification.
  - Offline mode: the counter issues tokens locally and syncs later.
- **Stack:** HTML/JS PWA (or React + Vite), the `html5-qrcode` library, a small Node/Express or FastAPI proxy to the FHIR sandbox, and SQLite for the offline queue.
- **Data:** the FHIR sandbox and synthetic patients with Health IDs starting with 9.
- **Mock:** NID/BRN verification, the OpenMRS+ desk, and the printer.

**7. Three-minute demo script.**
- 0:00 — Photo of a crowded OPD queue, with the DMCH and Kaliganj numbers.
- 0:30 — Rahima opens the PWA and shows her QR code.
- 0:50 — The counter scans it. The token prints and Rahima's past encounters appear, pulled live from the FHIR sandbox.
- 1:40 — Unplug the Wi-Fi. The next patient still gets a token, and it syncs when the Wi-Fi comes back.
- 2:20 — Dashboard: seconds per registration and percentage of patients with a Health ID.
- 2:45 — The ask: run a pilot at one UHC in the five e-Health Card districts.

**8. Impact, who pays, scaling.**
- **Measures:** registration time per patient, tokens per day, percentage of visits linked to a Health ID, and fewer duplicate registrations.
- **Who pays:** MoHFW/DGHS through the e-Health Card technical-assistance (TA) project, co-financed by ADB — [Bonik Barta](https://en.bonikbarta.com/bangladesh/SyidD595PYwTVnF0).
- **Scaling path:**
  - pilot districts Khulna, Noakhali, Bogura, Sirajganj and Narsingdi
  - then about 100 OpenMRS+ hospitals
  - then the SHR
  - every token becomes a Health-ID-linked encounter feeding the national database

**9. Risks and how to handle them.**
- **Privacy (PDPO 2025):** the QR carries only the ID and a consent token, never medical data. Show a consent screen and an access log.
- **Connectivity:** many sites lack internet (April 2026 readiness report — [Bonik Barta](https://en.bonikbarta.com/bangladesh/SyidD595PYwTVnF0)). Offline token issuing handles this.
- **Adoption:** only 26% of rural people use a smartphone (GSMA 2024 — [TBS](https://www.tbsnews.net/node/1013061)). Offer a printed QR on the e-Health Card or a paper slip as well.
- **Clinical safety:** low, because this is registration only.

**10. Scores.** U4 · F5 · I4 · J5 · D5 = **23/25**

---

## Idea 2 — ReferLoop: closed-loop e-referral with specialist advice and back-referral

**1. Pitch.** A doctor at an upazila health complex (UHC) or a community health care provider (CHCP) sends a structured referral tied to the patient's Health ID. A specialist accepts it or advises "manage here" within minutes. The patient comes back with a back-referral note, so no referral gets lost.

**2. Track / stakeholder.** Referrals. **Primary: B (doctors, CHCPs)**. Also A and E.

**3. Who suffers + evidence.**
- At two tertiary hospitals (BMC HSR 2024, n=822):
  - **59% self-referred**, and 58% did not know a referral system exists
  - occupancy was **148.2% at secondary and 137% at tertiary** level
  - [BMC HSR 2024](https://link.springer.com/10.1186/s12913-024-11115-8)
- Dengue referrals from Savar UHC had **no feedback system**, and 25% of patients were unhappy with communication — [BRACU](https://dspace.bracu.ac.bd/items/3cfefc17-e696-48d8-80c1-b06aa715a7c0).
- A working referral system could filter **about 65%** of patients at upazila and district level — [Daily Star 2024](https://www.thedailystar.net/opinion/readers-voice/news/we-need-referral-system-works-3554706).
- The hackathon's own example problems include **"lost referrals between facilities"** — [Lanka Business News](https://www.lankabusinessnews.com/e-health-hackathon-2026-launches-to-build-ai-and-digital-solutions-for-bangladeshs-health-system/).

**4. Foreign precedent.**
- **South Africa, Vula:**
  - 85.5% of referrals accepted
  - **16 min median specialist reply**
  - inappropriate referrals fell from 6.7% to 4.2%
  - pre-transfer advice given in 35% of cases
  - [PMC8517757](https://pmc.ncbi.nlm.nih.gov/articles/PMC8517757/)
- **Brazil, Telessaúde:** **56–77% of referrals avoided** — [RBMFC](https://rbmfc.org.br/rbmfc/article/download/3364/1815).
- **Thailand, MOPH Refer:** about 400,000 e-referrals [date uncertain] — [Pattaya Mail](https://www.pattayamail.com/thailandnews/thailands-moph-refer-system-revolutionizes-healthcare-by-enabling-secure-efficient-electronic-referrals-between-hospitals-499028).
- **Why Bangladesh doesn't have it yet:** the "Electronic Referral System" is announced as part of the e-Health Card but has not been built. Referral pilots in 2014, 2016 and 2019 faded.

**5. Uniqueness.** The competitor check rates this **EARLY-STAGE**. Pieces exist: SHR record sharing, the Bahmni referral data flow, and NCD/GP pilots that include a referral step. But **no closed loop** (specialist reply, then back-referral, with status tracked on the Health ID) was found. This is not telemedicine: it is clinician-to-clinician and asynchronous.

**6. MVP.**
- **What to build:**
  - Referral form for the medical officer (MO), in Bangla and English: reason, vitals, attachments.
  - The form becomes a FHIR `ServiceRequest` plus a `Task` that moves through requested → accepted / advice-given / rejected → completed.
  - Specialist inbox (web) with a one-tap reply. "Manage locally" counts as an avoided referral.
  - On acceptance, the patient gets a slip with a QR code and a mock SMS.
  - The back-referral note is a FHIR `Communication` sent to the original facility.
  - Dashboard: median reply time, percentage avoided, and loops closed.
- **Stack:** Next.js or Flask, Postgres or SQLite, the FHIR sandbox, and a mock SMS gateway.
- **Data:** synthetic referrals and a facility list (BD Core Organization profile).
- **Mock:** specialist roster, SMS and real attachments.

**7. Demo script.**
- 0:00 — The 59% self-referral statistic, and "lost referrals" quoted from the hackathon.
- 0:30 — A UHC doctor refers a patient with suspected dengue warning signs.
- 1:00 — On a second laptop, a district hospital specialist replies in 2 minutes: "give X, monitor, send if Y".
- 1:40 — A second case is accepted. The patient's QR slip is scanned at the district hospital.
- 2:10 — A back-referral note arrives at the UHC.
- 2:30 — Dashboard showing 1 of 2 referrals avoided and loops closed.
- 2:50 — The ask: plug this into the e-Health Card's Electronic Referral System.

**8. Impact, who pays, scaling.**
- **Measures:** median reply time, percentage managed locally, percentage of back-referrals closed, and the self-referral share at receiving hospitals.
- **Who pays:** MoHFW, as part of the card's Electronic Referral System.
- **Incentive for specialists:** a log of advice given that could count as continuing education (CPD), relevant if BMDC introduces relicensing. Today renewal is paperwork only — [BMDC](https://www.bmdc.org.bd/reg-renewal).
- **Scaling path:** start with UHC → district hospital in the 5 pilot districts, then add medical colleges, then sync referral status to the SHR.

**9. Risks.**
- **Clinical liability:** the specialist gives advice; the treating clinician decides. Keep an audit trail.
- **Specialist time:** use asynchronous replies with an urgency triage.
- **Privacy (PDPO):** consent is captured at the point of referral.
- **Connectivity:** queue offline and send an SMS fallback.
- **Adoption:** Vula's nurses did not use it, so design for CHCPs from day one.

**10. Scores.** U4 · F4 · I5 · J5 · D4 = **22/25**

---

## Idea 3 — ReportReady: lab results pushed to the Health ID and by SMS

**1. Pitch.** When OpenELIS (the lab system in public hospitals) finalises a result, it is filed to the patient's Health ID record. The patient gets a Bangla SMS saying the report is ready, and the doctor who ordered the test is alerted to critical values.

**2. Track / stakeholder.** Labs, plus electronic records. **Primary: A (patients)**. Also lab staff.

**3. Who suffers + evidence.**
- Patients travel back to collect paper reports, then lose them and repeat tests — [ICUH 2016](https://programme.exordo.com/icuh2016/delegates/presentation/88/).
- Lab disruption: reagent shortages 43%, faulty equipment 34% (PPRC 2026) — [Prothom Alo](https://en.prothomalo.com/bangladesh/904ggpi81h).
- OpenELIS runs in **100 public hospitals**, but no SMS or patient result push was found — [SHR DGHS](https://en.info.shr.dghs.gov.bd/hms/).
- The hackathon lists "diagnosis backlogs" as an example problem — [Lanka Business News](https://www.lankabusinessnews.com/e-health-hackathon-2026-launches-to-build-ai-and-digital-solutions-for-bangladeshs-health-system/).

**4. Foreign precedent.**
- **Zambia:** an SMS lab-result system replaced postal delivery, which had a **mean turnaround of 44.2 days**. The post-implementation figure was not retrieved — [Bull WHO 2012](https://scielosp.org/article/bwho/2012.v90n5/348-356).
- **India, ORS:** shows lab reports linked to a UHID — [eHospital NIC](https://ehospital.nic.in/ehospitalsso/aboutus).
- **Why Bangladesh doesn't have it yet:** OpenELIS mostly runs on local servers and was not connected to patient channels.

**5. Uniqueness.** Note 03 rates it **NOT PRESENT** in public facilities. The competitor check (06) did not cover it. Private labs may offer online reports [not verified], so pitch this for **public** hospitals, linked to the Health ID.

**6. MVP.**
- **What to build:**
  - A connector reads a mock OpenELIS export (CSV or HL7-like).
  - It creates FHIR `DiagnosticReport` and `Observation` records (using the BD Core lab profile) linked to `Patient` on the sandbox.
  - A rules file sets critical values. A clinician must sign off the thresholds; do not invent them.
  - SMS template in Bangla: "Your report is ready, show code 4821 at the counter or open link". Flags are shown as words, not numbers.
  - Patient view: a simple "my reports" page.
  - Clinician view: a critical-value alert.
- **Stack:** Python script plus FastAPI, the FHIR sandbox and a mock SMS gateway.
- **Mock:** OpenELIS and SMS delivery.

**7. Demo script.**
- 0:00 — The paper-report problem.
- 0:30 — A lab tech finalises a CBC in the mock OpenELIS.
- 0:45 — The phone buzzes with a Bangla SMS.
- 1:10 — The patient opens the report with a PIN.
- 1:40 — A critical potassium value triggers an alert on the doctor's screen.
- 2:10 — The FHIR record is visible on the sandbox.
- 2:40 — The ask: switch it on in one OpenELIS hospital.

**8. Impact, who pays, scaling.**
- **Measures:** turnaround from result to the patient being notified, trips avoided, percentage of critical values acknowledged within 1 hour, and percentage of repeat tests.
- **Who pays:** DGHS hospital automation, with SMS cost per message borne by the hospital or the card project.
- **Scaling path:** 100 OpenELIS hospitals, then SHR. Results become part of the e-Health Card record.

**9. Risks.**
- **Privacy:** phones are often shared. 73.4% of households own a smartphone, which means phones are shared rather than personal (BBS 2026 — [Dhaka Tribune](https://www.dhakatribune.com/bangladesh/415972/bbs-survey-over-57%25-of-bangladeshi-households-now)). So the SMS never contains values, and the report needs a PIN.
- **Clinical safety:** do not interpret results for patients; just say "see your doctor".
- **Data quality:** handle the case where patient identifiers do not match.

**10. Scores.** U4 · F5 · I4 · J4 · D4 = **21/25**

---

## Idea 4 — AMR Lens: antibiotic-sale data layer for existing pharmacy point-of-sale (POS) systems

**1. Pitch.** We don't build another pharmacy POS. We build a plug-in that turns the POS systems pharmacies already use into anonymous daily antibiotic-sales data for DGDA and IEDCR. The data is coded by the WHO AWaRe antibiotic class and records whether a prescription was presented.

**2. Track / stakeholder.** Pharmacy. **Primary: B (pharmacists and drug sellers)**. Also regulators.

**3. Who suffers + evidence.**
- In 246 Dhaka pharmacies, **~45% of antibiotics were dispensed without a prescription**, and only **7.56%** had a registered pharmacist (2025) — [PMC12744235](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12744235/).
- An icddr,b study found **50.9%** sold without a prescription (2022) — [DOAJ](https://doaj.org/article/b2563a5093494395a07298723c0c4801).
- Pharmacy-level AWaRe data are scarce — [MDPI 2022](https://www.mdpi.com/2079-6382/11/2/247/xml).
- A CAPTURA/IVI study recommends bringing private pharmacies into AMR surveillance — [BioSpectrum Asia](https://www.biospectrumasia.com/news/87/22616/study-recommends-heightened-focus-on-quality-amr-data-generation-in-bangladesh.html).

**4. Foreign precedent.**
- **Kenya / Uganda / Nigeria, Maisha Meds:** a free drug-shop POS that also captures clinical data, in about 4,500–5,000 outlets (company figures). It received a USAID DIV grant of $5.25M (2023). RCT results were not retrieved — [MIT Solve](https://solve.mit.edu/solutions/95587); [Daba Finance](https://dabafinance.com/news/USAID-awards-Maisha-Meds).
- **Why Bangladesh doesn't have it yet:** the local POS vendors (MediPOS, Jeeon) are commercial and have no reporting link to the regulator — [TBS](https://www.tbsnews.net/node/347995).

**5. Uniqueness.** The competitor check rates this **EARLY-STAGE**. POS itself is crowded: Jeeon claims 30,000+ pharmacies — [Crunchbase](https://www.crunchbase.com/organization/jeeon). But none feeds antibiotic sales into surveillance. The core here is the **data layer**, not a POS.

**6. MVP.**
- **What to build:**
  - CSV or JSON ingest from a POS sales export. Write a mock exporter shaped like MediPOS output.
  - A brand → generic → AWaRe lookup. Hand-build a table of the 30–50 most common antibiotic brands, checked against the WHO AWaRe list.
  - A "prescription seen? Y/N" button at sale.
  - Anonymous daily aggregates by upazila × AWaRe class × prescription flag, pushed to the DHIS2 demo via `/api/dataValueSets`.
  - Map dashboard (Leaflet) showing percentage of "Watch"-class antibiotics sold without a prescription.
- **Stack:** Python/pandas, FastAPI, Leaflet and Chart.js.
- **Mock:** POS feed, pharmacy registry and the brand list.

**7. Demo script.**
- 0:00 — The 45% and 7.56% figures.
- 0:30 — Three mock pharmacies sell antibiotics.
- 1:00 — The connector ingests the sales and codes them by AWaRe class.
- 1:30 — The DHIS2 demo shows the new data element.
- 2:00 — The DGDA map highlights an upazila with a spike in "Watch" antibiotics sold without a prescription.
- 2:40 — The ask: pilot with one POS vendor and DGDA.

**8. Impact, who pays, scaling.**
- **Measures:** percentage of antibiotic sales with a prescription, Watch/Reserve share, and pharmacies reporting.
- **Who pays:** DGDA/IEDCR AMR programme and donors. The Fleming Fund backed earlier DGDA antibiotic work — [WHO 2024](https://www.who.int/news/item/25-09-2024-utilizing-data-on-antimicrobial-use-and-knowledge-to-inform-regulatory-changes-to-antibiotic-packaging-and-support-antimicrobial-stewardship-efforts-in-bangladesh).
- **Incentive for pharmacies:** credit toward the Model Pharmacy compliance standard.
- **Scaling path:** POS vendors, then DGDA licensing software, then DHIS2. Linking an optional Health ID later lets a patient's antibiotic history appear on the e-Health Card.

**9. Risks.**
- **Fear of enforcement:** pilot data stay aggregated and anonymous, with no penalties.
- **Privacy:** no patient identifiers in version 1.
- **Data accuracy:** the brand mapping needs a pharmacist to review it.
- **Adoption:** depends on POS vendors, so offer them a free compliance report as the reason to join.

**10. Scores.** U4 · F4 · I4 · J4 · D3 = **19/25**

---

## Idea 5 — RadioQ: one shared national waiting list for radiotherapy and diagnostics

**1. Pitch.** Combine NICRH's and other centres' radiotherapy waiting lists into one Health-ID-keyed list. It shows which machines are up and how many slots each has, so the oncologist's priority, the wait time and spare capacity at other public or private centres decide who goes where.

**2. Track / stakeholder.** Labs/diagnostics ("diagnosis backlogs") plus referrals. **Primary: E (hospitals, cancer-centre administrators)**. Also A (cancer patients).

**3. Who suffers + evidence.**
- At NICRH (Dhaka Tribune, 20 Oct 2026):
  - **4 of 6 machines down** for more than 2 years
  - **about 7,500 patients waiting**, with appointments as late as end-2028
  - new registrations suspended for about 6 weeks
  - 17 new LINACs due by June 2027, 6 in Dhaka and 11 outside
  - an expert urged coordination with private hospitals
  - [Dhaka Tribune](https://www.dhakatribune.com/bangladesh/health/422565/7-500-cancer-patients-await-radiotherapy-as)
- In 2021 the country had about 37 machines against a need of about 250 — [Daily Star](https://www.thedailystar.net/frontpage/news/cancer-treatment-facilities-scanty-1667677).

**4. Foreign precedent.**
- **No direct foreign shared radiotherapy list is in the notes.**
- The closest is Brazil's **SISREG** central regulation of beds and referrals. Its lesson is negative: an audit found 33% of ICU authorisations were late and 54% of admissions bypassed the system — [TCE-SC](https://www.tcesc.tc.br/relatorio-do-tcesc-sobre-utis-no-estado-aponta-para-necessidade-de-melhorias-no-sistema-de).
- The UK's NHS OPEL shows how to standardise capacity reporting — [NHS England](https://www.england.nhs.uk/long-read/integrated-opel-framework-2024-to-2026/).
- **Why Bangladesh doesn't have it yet:** appointments are booked in person at each centre.

**5. Uniqueness.** The competitor check rates this **NOT PRESENT**. The news hook is very fresh: the NICRH story ran 20 Oct 2026, two days after the hackathon launch.

**6. MVP.**
- **What to build:**
  - National list where each patient is a FHIR `ServiceRequest` (radiotherapy) linked to `Patient` (Health ID), with an oncologist-set priority, the decision-to-treat date and the cancer site.
  - Centre capacity panel: machine status up/down and slots per day.
  - Suggestion engine ranks patients by priority, then days waiting, then distance and cost.
  - Patients get a mock SMS with their position and estimated date.
  - "Machine down" button that instantly re-plans the list.
- **Stack:** React, FastAPI, SQLite and the FHIR sandbox.
- **Data:** 7,500 synthetic patients and 6 synthetic NICRH machines plus 3 synthetic private centres. Label it clearly as **synthetic**.
- **Mock:** all capacity data.

**7. Demo script.**
- 0:00 — The 20 Oct headline: 7,500 waiting.
- 0:30 — The national list loads.
- 0:50 — Click "NICRH machine 3 down" and watch the list re-plan.
- 1:20 — A private centre adds 20 slots, and the top-priority patients get offered them, with cost shown.
- 1:50 — The SMS arrives: "your position is 312, estimated date …".
- 2:20 — The 17 new LINACs are added to the map, and the list balances across them.
- 2:45 — The ask: use it to allocate the 2027 LINACs.

**8. Impact, who pays, scaling.**
- **Measures:** median wait from decision to first fraction, percentage of patients starting within the target window, machine uptime, and slots filled.
- **Who pays:** MoHFW/NICRH and the cancer programme. Private centres gain patients, which gives them a reason to join.
- **Scaling path:** start with radiotherapy, then extend to MRI/CT queues (linking to Idea 6, equipment uptime) and to the SHR.

**9. Risks.**
- **Fairness and ethics:** clinicians set priority; the software only orders by those rules, and the rules are published.
- **Out-of-pocket cost:** private slots cost money, so show the cost and never auto-assign.
- **Privacy:** cancer diagnosis is sensitive under the PDPO, so the public view shows only a position number.
- **Data:** centres must update capacity, so keep it to one button.

**10. Scores.** U5 · F4 · I5 · J5 · D3 = **22/25**

---

## Idea 6 — YantraTrack: QR equipment uptime and maintenance register

**1. Pitch.** Every hospital machine gets a QR sticker. Staff scan it to report a breakdown with a photo, the ticket goes to NEMEMW&TC (the national repair centre) with a service-level timer, and patients can check whether the X-ray is working today.

**2. Track / stakeholder.** Labs (diagnostic equipment) and institutional operations. **Primary: E (hospital administrators, biomedical engineers)**.

**3. Who suffers + evidence.**
- PPRC 2026 (22 facilities):
  - **52% of diagnostic equipment was unused** in the past year
  - **malfunctions caused 79% of service gaps**
  - imaging was available 65% of the time but provided regularly only 25% (UHC: 46% and 17%)
  - [Prothom Alo](https://en.prothomalo.com/bangladesh/904ggpi81h)
- **3,331 devices** out of order across 84 hospitals — [Prothom Alo](https://en.prothomalo.com/amp/story/opinion/editorial/96jul2ywm5).
- At Rangpur MCH, repair requests to NEMEMW got no reply — [Prothom Alo](https://en.prothomalo.com/bangladesh/local-news/medical-equipment-mostly-in-disrepair).

**4. Foreign precedent.**
- **Rwanda, MEMMS** (since 2012, with CHAI): national registry covering inventory, spare parts and maintenance. **More than 80% of equipment registered** (2018 review) — [Enabel/VUB](https://www.be-causehealth.be/wp-content/uploads/2019/04/E-Health-academy-2019-04-30-VUB-Enabel-M-Nyssen.pdf); [RBC](https://rbc.gov.rw/wp/?p=8070).
- **Why Bangladesh doesn't have it yet:** repairs go by letter and tender. NEMEMW&TC appears only as a procuring entity — [BPPA](https://www.bppa.gov.bd/advertisement-goods/details-83702.html).

**5. Uniqueness.** The competitor check rates this **NOT PRESENT**. A DGHS "Asset Management" module label exists, but its scope is [uncertain]. Pitch YantraTrack as something that plugs into that module, not a duplicate. The open-source openMEDIS could be adapted (named in the notes; not evaluated).

**6. MVP.**
- **What to build:**
  - Asset register (FHIR `Device` is optional).
  - QR sticker generator.
  - Mobile scan → "report fault" with a photo and Bangla text.
  - Ticket board with statuses open → assigned → part ordered → fixed, plus SLA timers.
  - Dashboard: uptime percentage per facility and per machine type; worst 10 facilities.
  - Public "service available today" page for each UHC.
- **Stack:** Django or Laravel (good at simple admin screens), SQLite and a QR library.
- **Data:** synthetic assets shaped on PPRC categories.
- **Mock:** NEMEMW users.

**7. Demo script.**
- 0:00 — "52% unused".
- 0:30 — Stick a QR on a laptop "X-ray machine".
- 0:45 — A nurse scans it and reports a fault.
- 1:15 — An engineer's phone gets the ticket and the SLA clock starts.
- 1:45 — Mark it fixed; uptime updates.
- 2:10 — The public page now says "X-ray available".
- 2:30 — Ministry view: the ranking of facilities.
- 2:50 — The ask: register all diagnostic equipment in one pilot district.

**8. Impact, who pays, scaling.**
- **Measures:** uptime percentage, mean time to repair, percentage of assets registered (Rwanda reached more than 80%), and idle-equipment value.
- **Who pays:** DGHS/NEMEMW. It saves money because unspent budgets coexist with breakdowns: 94% of institutions had unspent budget — [TBS](https://www.tbsnews.net/bangladesh/health/health-budgets-not-translating-services-due-governance-gaps-pprc-study-1501371).
- **Why judges should care:** it matches the PM's "every penny … transparently" message.
- **Scaling path:** one district, then all UHCs, then the DGHS asset module. Uptime data feeds Idea 5 (RadioQ) capacity.

**9. Risks.**
- **Politics of blame:** frame it as support, not policing.
- **NEMEMW capacity:** the dashboard makes the backlog visible but does not fix it, so pair it with procurement.
- **Privacy:** none (no patient data).
- **Adoption:** keep reporting to a 10-second scan.

**10. Scores.** U5 · F5 · I4 · J4 · D3 = **21/25**

---

## Idea 7 — NCD Sathi: adult hypertension and diabetes protocol assistant for community clinics that auto-fills DHIS2

**1. Pitch.** CHCPs enter a patient's blood pressure and blood sugar once. The app walks them through the national NCD protocol, sets the follow-up date and fills in the DHIS2 report automatically, so better care costs no extra paperwork.

**2. Track / stakeholder.** Primary care. **Primary: B (CHCPs at community clinics)**. Also A.

**3. Who suffers + evidence.**
- **15.8% of adults have undiagnosed hypertension** vs 12.2% diagnosed, and 6.0% have undiagnosed diabetes (BDHS 2017–18) — [DOAJ/BMC](https://doaj.org/article/8e696c7abbe4486187d630b469aa8f43); [Frontiers](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2022.1066449/epub).
- Clinics see about 70 patients a day (2021, researchers' arithmetic) — [DOAJ](https://doaj.org/article/ecd5cdd2b63a49848b10cfe31a41f8ee).
- The NCD desk guide exists only as a **2015 PDF** — [WHO NCD desk guide](https://extranet.who.int/ncdccs/Data/BGD_D1_BGD_NCD%20Desk%20Guide_2015.pdf).
- Running paper and DHIS2 side by side "increases the reporting workload" — [PMC7249629](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7249629/).

**4. Foreign precedent.**
- **Tanzania, ePOCT+:** antibiotic prescribing fell to **23.2% vs 70.1%** with no loss of safety (RCT, 44,306 children) — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10803249).
- **India, CPHC-NCD app:** **26.23 crore enrolled, 14.40 crore screened** (Jan 2023) — [MoHFW NCD portal](https://ncd-test.mohfw.gov.in/ncdlandingassets/aboutus.html).
- **WHO SMART Guidelines:** a standard way to turn guidelines into software — [WHO DAK](https://who.int/publications/i/item/9789240020306).
- **Local proof:** the Parbatipur pilot cut uncontrolled BP **from 60% to 26%** in 3 months — [BMJ Open 2023](https://bmjopen.bmj.com/content/13/11/e073743).

**5. Uniqueness.** The competitor check rates this **EARLY-STAGE**, and **the child IMCI niche is taken**: the government and Save the Children IMCI app runs at all 319 Barishal facilities — [Save the Children](https://www.savethechildren.net/bangladesh/stories/over-300-govt-healthcare-facilities-barishal-will-digitize-treatment-plans). Adult NCD protocols at community clinics are mostly unaddressed; only an icddr,b CHW feasibility pilot exists. Our angle is the **CHCP at the clinic plus DHIS2 auto-fill**, reusing the IMCI app's integration pattern.

**6. MVP.**
- **What to build:**
  - Offline-first Android-friendly PWA in Bangla.
  - Patient found by Health ID.
  - Enter BP and glucose; a protocol engine with thresholds **copied from the 2015 NCD desk guide and signed off by a physician** gives the action: counsel, repeat, refer (hand-off to Idea 2) or follow-up date.
  - Follow-up list and mock SMS reminders.
  - Monthly DHIS2 aggregate or tracker event payload generated and posted to the DHIS2 demo.
- **Stack:** PWA with IndexedDB, rules stored as JSON (structured so a WHO SMART adaptation could reuse them), and the DHIS2 Web API.
- **Mock:** Health ID lookup, SMS and drug stock.

**7. Demo script.**
- 0:00 — "More than half of hypertension is undiagnosed".
- 0:30 — A CHCP screens a 52-year-old: BP high.
- 1:00 — The protocol says repeat and counsel, and books a follow-up.
- 1:20 — On the second visit BP is still high, so the app refers to the UHC through ReferLoop.
- 1:50 — The DHIS2 demo shows the counts filled in automatically.
- 2:20 — Show that no form was typed twice.
- 2:45 — The ask: pilot at 10 clinics in one e-Health Card district.

**8. Impact, who pays, scaling.**
- **Measures:** percentage of adults 40+ screened, percentage controlled at 3 months, follow-up adherence, and DHIS2 minutes saved.
- **Who pays:** DGHS (the CBHC and NCDC programmes).
- **Fit with government plans:** the PM's "Primary Healthcare Unit in every union" and 100,000 new CHWs — [Home](https://ehealthhackathonbd.org/).
- **Scaling path:** 14,000+ clinics already use DHIS2 — [DHIS2.org](https://dhis2.org/expanding-routine-data-use-bangladesh/).

**9. Risks.**
- **Clinical safety (highest of all ten ideas):** a physician must validate the protocol logic; there must be no prescribing beyond CHCP scope; the screen must say "decision support, not diagnosis".
- **Drug stock-outs:** community clinics have gone 8–10 months without supply ([Bonik Barta](https://en.bonikbarta.com/bangladesh/n79GkolkDClJDR5X)), which undermines treatment. Route those patients to referral.
- **Devices and connectivity:** offline mode.
- **Duplication:** coordinate with icddr,b's CKD/HTN digital work — [TBS](https://www.tbsnews.net/node/1385381).

**10. Scores.** U3 · F3 · I5 · J4 · D4 = **19/25**

---

## Idea 8 — InternLog: competency e-logbook for MBBS internship

**1. Pitch.** Interns log each procedure on their phone. The supervisor confirms it with a one-time code (OTP) and a 1–5 rating, and the internship committee finally sees who has actually done what, instead of just collecting signatures.

**2. Track / stakeholder.** e-Health Card / electronic records. This is the closest fit, and it is weak; check whether one of the 9 missing priority areas covers workforce or education. **Primary: C (interns)**. Also D (supervisors).

**3. Who suffers + evidence.**
- A logbook signature is the main assessment for **more than 66% of interns** and 72% of doctors.
- About 54% of interns get no assessment after major rotations (8 colleges) — [BJME](https://banglajol.info/index.php/BJME/article/view/32243).
- About 56% are negative about logbook use — [BJME](https://www.banglajol.info/index.php/BJME/article/view/36233).
- Counterpoint: one survey of 400 interns rated the programme above 4 out of 5 — [BJME](https://www.banglajol.info/index.php/BJME/article/view/63680).
- Teaching posts are 41–43% vacant — [Daily Star](https://www.thedailystar.net/opinion/news/ensure-quality-medical-education-4034436).

**4. Foreign precedent.**
- **UK, Horus ePortfolio:** used by all foundation schools in England — [KSS Deanery](https://kss.hee.nhs.uk/horus-eportfolio/).
- **India, PGMER-2023 e-logbook:** a mandate according to a vendor; the regulator's notice was not verified — [eportfolios.in](https://eportfolios.in/resources/guides/logbooks-vs-eportfolios).
- **Why Bangladesh doesn't have it yet:** the BMDC rotatory logbook is paper — [BMDC](https://www.bmdc.org.bd/docs/RotatoryInternshipProgramme.pdf).

**5. Uniqueness.** The competitor check rates this **EARLY-STAGE**, because **the BCPS postgraduate e-logbook is in pilot** — [BCPS newsletter](https://bcps.edu.bd/it_inhouse/newsletter). So target **MBBS internship (BMDC)** instead, which has no digital logbook.

**6. MVP.**
- **What to build:**
  - Competency list per rotation, typed in from the BMDC rotatory internship document.
  - Intern logs an entry with no patient identifiers.
  - Supervisor gets an OTP or scans a QR on the intern's screen, then rates and comments.
  - Rotation-completion heatmap for the committee.
  - Offline queue.
- **Stack:** Firebase or Supabase, plus a PWA.
- **Mock:** OTP by SMS, BMDC registration lookup.

**7. Demo script.**
- 0:00 — "66% signature-only".
- 0:30 — An intern logs a cannula insertion.
- 0:50 — The supervisor approves on their phone in 10 seconds with a rating.
- 1:20 — The committee heatmap shows gaps in obstetrics procedures.
- 1:50 — Export the evidence for a BMEAC accreditation criterion.
- 2:30 — The ask: pilot with one college's interns.

**8. Impact, who pays, scaling.**
- **Measures:** percentage of rotations with a recorded assessment, procedures per intern, and supervisor response time.
- **Who pays:** BMDC/DGME and the colleges. It also supports BMEAC accreditation evidence, with about 100 colleges still to be accredited — [Daily Star](https://www.thedailystar.net/news/step-towards-improving-medical-education-quality-4082026).
- **Scaling path:** about 103 colleges. It can later link to BMDC registration and a future CPD/relicensing system.

**9. Risks.**
- **Supervisor time:** keep sign-off under 10 seconds.
- **Fake sign-offs:** OTP plus timestamps.
- **Patient privacy:** no identifiers.
- **Fit with this hackathon:** weak. Lead with the "health workforce records" angle.

**10. Scores.** U3 · F5 · I3 · J3 · D4 = **18/25**

---

## Idea 9 — AmbuSathi: QR ambulance trip record plus ER pre-alert linked to the Health ID

**1. Pitch.** The family scans a QR code inside the ambulance. They see whether the ambulance is registered and what the standard fare is, the trip is logged, and the receiving emergency room (ER) gets the patient's Health ID summary and arrival time before the ambulance arrives.

**2. Track / stakeholder.** Ambulance services. **Primary: A (patients and families in emergencies)**. Also ER staff.

**3. Who suffers + evidence.**
- Dhaka has **no centralised emergency medical service (EMS)** — [U of Toronto](https://che.utoronto.ca/?p=1102).
- The 999 call is free but the ambulance is paid — [Dhaka Tribune](https://archive.dhakatribune.com/bangladesh/2017/12/07/999-emergency-hotline-launch).
- An ambulance syndicate charged **Tk 6,000 from DMCH vs Tk 3,000** for an outside ambulance — [Daily Star](https://tds-images.thedailystar.net/ds/unheard-voices/news/how-rescue-bangladesh-ambulance-mafia-3973986).
- Savar UHC referrals were held back by an ambulance shortage — [BRACU](https://dspace.bracu.ac.bd/items/3cfefc17-e696-48d8-80c1-b06aa715a7c0).

**4. Foreign precedent.**
- **Kenya, Flare/Rescue.co:** dispatch with GPS tracking cut response time **from about 162 to 13 min** in cities — [PMC 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12418930).
- **Why Bangladesh doesn't have it yet:** fleets are private and fragmented, and syndicates operate at hospitals.

**5. Uniqueness.** The competitor check rates the **concept SATURATED**: CriticaLink, TraumaLink, URAL EMS and 999 already cover dispatch and volunteer responders — [Future Startup](https://futurestartup.com/2015/10/27/criticalink-wins-the-world-summit-award-in-health/); [Financial Express](https://mail.thefinancialexpress.com.bd/trade/ural-ems-launches-first-app-based-ambulance-service-in-country-1534684735?amp=true). So **do not build dispatch or booking.** Build only the gap the check identified: **hospital pre-alert linked to the Health ID, plus a transparent registry and trip record.** This is the weakest uniqueness case of the ten; keep it only because "ambulance services" is a named area.

**6. MVP.**
- **What to build:**
  - Ambulance registry (operator, vehicle, standard fare), with a QR code per vehicle.
  - Family scans → the page shows "registered / not registered", fare, and a start-trip button.
  - The paramedic (or family) adds the patient's Health ID and main complaint.
  - The receiving ER screen gets the arrival time (simulated GPS) and the patient summary from the FHIR sandbox, then taps "bed ready".
  - Trip receipt, plus a "report overcharge" button that feeds the regulator.
- **Stack:** PWA, Leaflet and FastAPI.
- **Mock:** registry, GPS and fares.

**7. Demo script.**
- 0:00 — The "Tk 6,000 vs Tk 3,000" quote.
- 0:30 — Scan the QR: "registered, standard fare Tk X".
- 1:00 — The trip starts and the ER laptop pings with the arrival time and the patient's allergies and conditions.
- 1:40 — The ER marks "bed ready".
- 2:00 — On arrival, the receipt is issued.
- 2:20 — Show an overcharge report on the regulator map.
- 2:45 — The ask: pilot the registry at one medical college hospital gate.

**8. Impact, who pays, scaling.**
- **Measures:** percentage of trips by registered vehicles, fare paid compared with the standard fare, ER pre-alert lead time, and door-to-doctor time.
- **Who pays:** hospitals and DGHS.
- **Scaling path:** integrate with 999 and with existing operators (URAL, CriticaLink) as data providers rather than competitors, then attach trips to the e-Health Card record.

**9. Risks.**
- **Pushback from syndicates:** this is political and needs ministry backing.
- **No official tariff exists:** none was found in the research, so the standard fare has to be set by policy.
- **Data:** the registry starts empty.
- **Safety:** the pre-alert is information only.
- **PDPO:** share only a minimal emergency summary.

**10. Scores.** U3 · F4 · I4 · J4 · D2 = **17/25**

---

## Idea 10 — FairOSCE: tablet OSCE/OSPE scoring with examiner-variance analytics

**1. Pitch.** Examiners score OSCE/OSPE stations (timed practical exam stations) on a tablet that works offline. The software flags examiners who mark too hard or too soft and sets pass marks by borderline regression (pass marks based on scores of candidates rated "borderline"), so the same performance gets the same mark in Barishal and in Dhaka.

**2. Track / stakeholder.** e-Health Card / electronic records. This is the closest fit, and it is weak; check the 9 missing areas. **Primary: D (medical faculty and exam boards)**. Also C.

**3. Who suffers + evidence.**
- A study of OSPE vs traditional practicals (400 students, 4 colleges) found **significant differences in scores between colleges** — [IMSEAR](https://imsear.searo.who.int/handle/123456789/217448).
- An evaluation of BCPS exams found traditional assessment "largely subjective", with examiners grading the same performance differently — [BJME](https://banglajol.info/index.php/BJME/article/view/32190).
- Teaching posts are 41–43% vacant, so faculty time is short — [Daily Star Campus](https://www.thedailystar.net/campus/news/do-we-have-too-many-medical-colleges-3724766).

**4. Foreign precedent.**
- **Ireland, Qpercom:** used at Karolinska, Dundee, NUS and Sheffield — [Karolinska](https://staff.ki.se/education-support/assessment-evaluation/assessment-of-learning/digital-osce-and-qpercom).
- **Saudi Arabia, COES:** 97% of examiners satisfied — [Dove](https://www.dovepress.com/innovative-method-to-digitize-a-web-based-osce-evaluation-system-for-m-peer-reviewed-fulltext-article-IJGM).
- **Why Bangladesh doesn't have it yet:** cost, and it was never prioritised. A 2026 local review calls for it — [BJME 2026](https://www.banglajol.info/index.php/BJME/article/view/91792).

**5. Uniqueness.** The competitor check rates this **NOT PRESENT**, but notes that its link to the e-Health Card is weak.

**6. MVP.**
- **What to build:**
  - Station checklist builder.
  - Offline tablet scoring with a global rating.
  - Automatic totals.
  - Examiner-variance chart: each examiner's mean against the station mean, with outliers flagged.
  - Borderline-regression pass mark per station.
  - Student feedback PDF.
- **Stack:** PWA, IndexedDB and Chart.js; the statistics are simple regression in JavaScript or Python.
- **Mock:** students and stations.

**7. Demo script.**
- 0:00 — "Same exam, different colleges, different scores".
- 0:30 — Two judges act as examiners, scoring the same video on two tablets.
- 1:10 — The scores sync and one examiner is flagged as a "hawk" (marks too hard).
- 1:40 — The pass mark is computed.
- 2:10 — Students receive their feedback sheets.
- 2:40 — The ask: one professional exam at one college.

**8. Impact, who pays, scaling.**
- **Measures:** spread between examiners, time to publish results, and percentage of students who receive feedback.
- **Who pays:** colleges, DGME and BCPS. It also supports BMEAC accreditation evidence.
- **Scaling path:** about 103 MBBS colleges, then nursing (453 institutions) and MATS.

**9. Risks.**
- **Exam integrity and device security:** lock-down mode.
- **Adoption by exam boards:** pilot it on formative (practice) exams first.
- **Fit with this hackathon:** weak.

**10. Scores.** U4 · F5 · I3 · J2 · D3 = **17/25**

---

## Ranked table

| Rank | Idea | Track | Primary stakeholder | U | F | I | J | D | Total |
|---|---|---|---|---|---|---|---|---|---|
| 1 | ScanShare OPD (QR Health-ID registration) | e-Health Card / records, primary care | A patients | 4 | 5 | 4 | 5 | 5 | **23** |
| 2 | ReferLoop (closed-loop e-referral) | Referrals | B doctors / CHCPs | 4 | 4 | 5 | 5 | 4 | **22** |
| 3 | RadioQ (shared radiotherapy waiting list) | Labs/diagnostics, referrals | E hospitals | 5 | 4 | 5 | 5 | 3 | **22** |
| 4 | ReportReady (lab results to Health ID + SMS) | Labs, records | A patients | 4 | 5 | 4 | 4 | 4 | **21** |
| 5 | YantraTrack (equipment uptime register) | Labs / institutional operations | E hospitals | 5 | 5 | 4 | 4 | 3 | **21** |
| 6 | AMR Lens (antibiotic-sale data layer) | Pharmacy | B pharmacists | 4 | 4 | 4 | 4 | 3 | **19** |
| 7 | NCD Sathi (adult NCD protocol + DHIS2 auto-fill) | Primary care | B CHCPs | 3 | 3 | 5 | 4 | 4 | **19** |
| 8 | InternLog (MBBS internship e-logbook) | Records (weak fit) | C interns | 3 | 5 | 3 | 3 | 4 | **18** |
| 9 | AmbuSathi (ambulance QR + ER pre-alert) | Ambulance services | A patients | 3 | 4 | 4 | 4 | 2 | **17** |
| 10 | FairOSCE (digital OSCE scoring) | Records (weak fit) | D faculty | 4 | 5 | 3 | 2 | 3 | **17** |

Ties are broken by Impact, then by Judge-appeal.

**Coverage check**
- **Stakeholders:**
  - patients / citizens = ideas 1, 4, 9 (3 ideas)
  - doctors / health workers = ideas 2, 6, 7 (3 ideas)
  - students / teachers = ideas 8, 10 (2 ideas)
  - hospitals / college operations = ideas 3, 5 (2 ideas)
  - Numbers here are ranks in the table above.
- **The 6 known areas:**
  - primary care = ranks 1, 7
  - electronic records = ranks 1, 4
  - referrals = ranks 2, 3
  - pharmacy = rank 6
  - labs = ranks 4, 5
  - ambulance services = rank 9
- **Distinctness:** each idea has a different problem, a different user and a different mechanism (QR identity, asynchronous clinical messaging, queue optimisation, push notification, asset ticketing, data aggregation, rules engine, sign-off workflow, trip registry, psychometrics).

**Reserve ideas** (strong, but they would duplicate coverage or carry more risk):
- **National blood-stock visibility (e-RaktKosh model).** Inventory is NOT PRESENT; donor matching is SATURATED — [TBS](https://www.tbsnews.net/thoughts/blood-donation-goes-digital-lessons-global-best-practices-1164731).
- **Health-worker violence incident registry to sit alongside the "Code Blue" alarm.** Only about 25% of incidents are reported — [TBS](https://www.tbsnews.net/node/1465051).
- **Outbound post-visit patient feedback (Mera Aspataal model).** The inbound DGHS SMS line is SATURATED — [BMJ GH](https://gh.bmj.com/content/6/2/e004357).
- **Bangla neonatal-resuscitation serious game (LIFE model).** NOT PRESENT — [Adv Simul](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8744048/).

**Rejected as generic or covered:**
- telemedicine (16263, DocTime)
- OPD booking (BMU, DGHS e-Appointment)
- symptom checker
- e-prescription (government "close to implementation")
- hospital management system (HMS; OpenMRS+ already in about 100 hospitals)
- essential-drug stock dashboard (DGHS eLMIS is live)
- child IMCI decision support (Barishal app)
- donor matching
- stand-alone ambulance dispatch or volunteer-responder apps

---

## Top 3 recommendations

**1. ReferLoop (rank 2): the best single pitch.**
- It answers the hackathon's own example, "lost referrals between facilities", and plugs into a back-end the government has already named: the e-Health Card's **Electronic Referral System** — [Bonik Barta](https://en.bonikbarta.com/bangladesh/SyidD595PYwTVnF0).
- It has the strongest foreign evidence of the three: Vula's 16-minute replies and Telessaúde's 56–77% of referrals avoided.
- It goes after a measured local failure: 59% self-referral and 137–148% bed occupancy.

**2. ScanShare OPD (rank 1 on score): the best "powers the e-Health Card" demo.**
- It is the most literal match to the event's stated goal, and the easiest to build well in 48h, with a live FHIR sandbox call.
- Its weakness is that DGHS could ship it themselves. So **use it as the entry point of the combined portal** rather than as a stand-alone pitch.

**3. RadioQ (rank 3): the most memorable and most unique.**
- NOT PRESENT anywhere in Bangladesh. The NICRH story (7,500 waiting, 20 Oct 2026) will be fresh in every judge's mind.
- It has a concrete policy use: allocating the 17 LINACs arriving by June 2027.
- Pick it if you want to stand out rather than fit in.

---

## Combined-portal concept: "CareLoop — one Health ID, one patient journey"

Bundle **ScanShare + ReferLoop + ReportReady** (ranks 1, 2 and 4) into one portal built on one data spine: the Health ID and FHIR records on the BD Core sandbox. It is **one patient journey with three screens**, not three products:

1. **Arrive** (ScanShare). Rahima, from a community clinic in a pilot district, shows her Health-ID QR at the UHC. She gets a token in seconds and her history opens.
2. **Move** (ReferLoop). The UHC doctor sends a structured referral. The district specialist advises or accepts within minutes. Rahima's QR slip opens her record at the district hospital, and a back-referral note returns to the UHC.
3. **Know** (ReportReady). Her district-hospital lab result is filed to her Health ID. She gets a Bangla SMS, the UHC doctor sees the result, and the critical-value alert goes to the clinician who ordered the test.

**Why this bundle and not others**
- All three share the same FHIR resources (`Patient`, `Encounter`, `ServiceRequest`/`Task`, `DiagnosticReport`) and the same consent screen.
- So one team of 3 can build them in 48h with one backend. Suggested split: person 1 builds the QR and counter screens, person 2 builds referral, person 3 builds the lab connector, SMS and dashboard.
- Together they cover **4 of the 6 known areas** (primary care, electronic records, referrals, labs).
- They answer **two of the three** example problems from the press ("lost referrals", "diagnosis backlogs").

**How to keep focus**
- The pitch is one sentence: **"CareLoop makes the e-Health Card do three things on day one: register you, refer you, and return your results."**
- RadioQ, YantraTrack and AMR Lens stay out of the bundle. Mention them as "next modules on the same spine" in one slide.

**Pitch metrics (one dashboard)**
- seconds to register
- median specialist reply time
- percentage of referrals managed locally
- percentage of loops closed
- hours from lab result to the patient knowing

**Risks to address on one slide**
- **PDPO consent:** consent token plus access log.
- **Offline mode:** queue and sync.
- **Shared phones:** SMS without results, plus a PIN.
- **Clinical liability:** specialist advice is advisory only.
- **Vendor lock-in** (the Babyl lesson): open source, with ownership handed to DGHS.

✅ 10 ideas detailed (each with 10 sections), ranked table, top-3 and CareLoop combined portal; coverage rules checked against the competitor verdicts + 84 sources used
