# Bangladesh Digital Healthcare Platform — Research Report
*Compiled Nov 4, 2026 · Sources: WHO, World Bank, BBS/BIDS, TIB, TBS, Daily Star, Prothom Alo, Rest of World, Future Startup, peer-reviewed journals (BMC HSR, Scientific Reports, MDPI), BMDC/DGHS official documents. Inline citations. Data gaps flagged.*

---

## 1. PATIENT-SIDE PAIN POINTS

### 1.1 Out-of-pocket (OOP) expenditure
- **OOP = 79% of total current health expenditure (2024)** — highest in South Asia (India 45%, Pakistan 47%, Sri Lanka 45%) (BIDS study reported via The Business Standard/newagebd.net, May 2026; WHO GHED/OurWorldInData: 79.31% in 2023, up from 62% in 2000).
- Households spend **Tk 3,454/month (~11% of total expenditure)** on health; medicines + diagnostics are the biggest cost drivers (BIDS, HIES 2022 data, n=14,400 households).
- Regressive burden: **poorest households spend ~35% of income on healthcare vs 5% for richest** (BIDS 2026).
- ~65% of healthcare needs remain unmet nationally (same BIDS study).
- No universal health insurance; insurance covers **<1% of population** (LightCastle/Future Startup 2024).

### 1.2 Health workforce shortage
- Only **13 health workers per 10,000 population (2022)** vs global median **49** (WHO Bangladesh, Mar 2024).
- **0.7 physicians and ~0.56 nurses per 1,000 people** — among the lowest in South Asia (World Bank/TBS Oct 2025).
- Skill-mix ratio **1 doctor : 0.4 nurse : 0.24 technologist** vs WHO-recommended **1:3:5** (ADB/NSDA labor market study; WIPO case study).
- Nurses: need **310,500, have 56,734 → 82% shortfall** (Health Sector Reform Commission report, reported by Prothom Alo, May 2025).
- Nuance: the *number* of physicians (~101,559 MBBS by JAwMC 2025 count; BMDC registers 134,568) is roughly adequate on paper — **the problem is mal-distribution and 32% unqualified workforce**, not absolute shortage (JAwMC "Physicians in Bangladesh", 2024).
- **~36,000 physicians practicing on unrenewed BMDC registrations; BMDC doesn't track fake-document registrations at all** (Prothom Alo, Nov 2024).

### 1.3 Fake doctors / unqualified providers
- **32% of the national health workforce is unqualified/unrecognized** — drug sellers, village doctors, kabiraj (MOHFW/WHO health workforce assessment 2021). In rural areas only **7.4 of every 146 providers per 10,000 population are qualified**.
- **54% of patients go to drugstore salespersons or self-medicate; only 11.5% use government facilities** (BBS Health & Morbidity Status Survey 2025, via TBS, Dec 2025).
- 60–77% of all care in rural areas delivered by informal "village doctors"; 78% earn nothing from consultation fees — **income depends entirely on selling pharmaceuticals they prescribe themselves** (BMC HSR village doctor national survey, 2023).
- ~**5,000 illegal hospitals, clinics & diagnostic centres** identified; drive ongoing to register + prosecute fake doctors/nurses (Daily New Nation, Aug 2026).
- Drug shops: only 49% claim a license, ~43% of all shops had a valid license at survey time; **only 0.6% of dispensers were pharmacy graduates**; DGDA has far too few inspectors (DGHS/JDTAF Accredited Drug Seller study).

### 1.4 Referral system failure, waiting times, travel to Dhaka
- **59% of inpatients at top tertiary hospitals arrive with no referral; 58% of patients don't even know a referral system exists; only 41% were formally referred** (BMC HSR study, covered by Daily Star Jul 2024, Prothom Alo Jun 2024).
- **2–3 months typical wait for a specialist appointment**; even then the specialist sees **50–60 patients/day in chambers** (Prof. Syed Abdul Hamid, DU IHE, via TBS 2022).
- **Average consultation length: 48 seconds** (Praava Health, CEO article in Physician Leaders J, 2024).
- Bed occupancy: **148% at secondary, 137% at tertiary hospitals vs 79% at primary facilities** — everything funnels upward (J Dhaka Med Coll 2024).
- Gastric/gallstone patients travel 200+ km to Dhaka, wait weeks in public queues, then return and get treated regionally — recurring narrative (Daily Star 2024).
- **~$500M/year spent on treatment in India**; patient outflow 2.5 lakh–10 lakh+/yr (estimates conflict: India tourism data cited as "25 lakh" in TBS Dec 2024 vs "2.5 lakh" in TBS Sep 2023 — treat with caution). 54% of all medical tourists to India in 2020 were Bangladeshi. Only 37 radiotherapy machines exist vs ~300 needed for cancer care (TBS 2024).

### 1.5 Corruption, dalals, informal payments
- **48.7% of households using government health facilities experienced corruption; ~6.2% paid bribes (avg Tk 680)** (TIB National Household Survey 2021). 42.5% in 2017 survey, avg bribe Tk 498.
- Dhaka Medical College Hospital (TIB in-depth study): **31% of outdoor patients used dalals (avg Tk 96)**; 37% paid dalals and got nothing; **32% paid bribes (avg Tk 188) just to get a bed**; 29% paid to jump the queue; **doctors get 30–50% commission** for steering diagnostic tests to Private centres.
- Private-sector broker networks: brokers take **10–30% commission**, doctors 15–50%, Tk 500–5,000 kickback per C-section patient (TIB 2017/TBS; Daily Star 2018 study of 66 private hospitals + 50 diagnostic centres).
- Cause cited by 73–79% of bribe-payers: **"no way to get the service without paying."**

### 1.6 Records / prescriptions
- worldview: patients carry loose paper prescriptions; **no unified medical record**.
- Survey of 104 Bangladeshi physicians: **only 4.81% keep digital records; ~50% keep paper only, 23% hybrid, 22% store nothing at all** (MDPI "Smart Health Gantt Chart" study, 2024). 88.46% struggle with history-taking under load; 93% want a digital aid.
- DGHS is building a Shared Electronic Health Record (SeHR) + National Health ID in its Digital Health Strategy (see §5) — aspirational, not yet deployed at consumer level.

### 1.7 Antibiotics & irrational prescribing
- **56.6% of antibiotic purchases happen without a prescription** from drug sellers/informal providers (n=1,000 dispensing events, 385 customer survey; *Exploring Health Sciences/Journal of Riverine Science?* — study in j.rcsop.2024.100485, Jul 2024).
- 25.9% of all observed pharmacy dispensing events were antibiotics; **73.5% of antibiotics sold were WHO "Watch" class** (2nd/3rd-gen cephalosporins, macrolides).
- Childhood diarrhea hospital study (n=8,294 episodes; Scientific Reports 2025): **55% received antibiotics though only 6% had dysentery; 77% of those antibiotics bought over-the-counter without prescription**; only 7% got ORS+zinc without antibiotics.
- Rural RMP study (BMC HSR 2023): for pneumonia, only **3.2%** gave correct first-line amoxicillin, **93.4%** dispensed broad antibiotics (incl. ceftriaxone), 82% salbutamol, 32% steroids; for diarrhea **94%** dispensed antibiotics.
- Survey of patients treated by quacks: only **27.4% of antibiotic prescriptions rational; 90% given with zero lab investigations** (bjfn.org 2025).
- Self-medication battery: only **25.2% of patients complete a full antibiotic course** (2014 rural survey).
- Regulation exists (antibiotics are legally prescription-only under the Drugs and Cosmetics Act 2023) but is essentially unenforced; 52% of rural antibiotic dispensers operate with no authorization (JOPPP 2020).

### 1.8 Pharmacy / medicine market
- Domestic industry produces ~25,000 brands, Tk ~25,000 crore (~$4B) worth, 97% of demand met locally; **98% of the market concentrated in 31 companies** (DGDA via Asia Post, Jul 2026). 66 registered companies "exist only on paper" and are suspected shell names for counterfeit production.
- **Counterfeit/substandard drugs: Tk 1,500+ crore (~$150M) annual sales (~2–3% of output, up to 20% by player-side estimates)** (TBS 2020; Business Monitor Intl 2010: 6% of 5,000 govt-sampled drugs fake/substandard). One Ittefaq report (Jul 2025) claims "40% of market fake" — **unverified hyperbole, treat as outlier**.
- Rigorous sampling (Kanazawa/Tübingen unis with DU/UAP, Nature-affiliated): **~10% of esomeprazole/cefixime/amox-clav samples in Dhaka counterfeit or substandard; ~20% outside Dhaka; some tablets made of flour/starch** (bd-pratidin Dec 2025). 2024 police raid seized 500,000 fake antibiotic tablets (gang ran ~10 yrs).
- >**250,000 registered + unregistered medicine shops**; antibiotics sold on request everywhere; price variation across brands is extreme and opaque (no unified price/comparison layer except crowdsourced sites like medex.com.bd, bddrugs.com — no transaction engine).
- Drugs & Cosmetics Act 2023 added **life imprisonment for counterfeit medicine** — zero convictions so far (bd-pratidin 2025).

### 1.9 Maternal & child health
- MMR: **123 per 100,000 live births (2020, World Bank)** — official trend; but a 2025 national survey-based reanalysis puts current MMR at **196** (haemorrhage 31%, eclampsia 23% of deaths) — methods differ, flag ambiguity. Rural 204 vs urban 147 (BMMS 2016).
- SDG target 70. Progress has *stalled* (World Bank 2023 review).
- Quality ANC: **45% urban vs 25% rural women; only 12% in poorest quintile** get quality ANC (World Bank).
- Over-medicalization: high/over-use of C-sections; poor referral of complications; **33% of women who died shuttled between 3+ facilities** without a functional referral pathway (The Lancet/PMC maternal death analysis, Apr 2025).
- >75% of doctors/nurses sit in tertiary facilities vs ~10% at primary level → rural maternity care thin.

### 1.10 NCD burden
- **NCDs = 68% of deaths, 64% of disease burden** (World Bank 2023).
- Diabetes: **~14% adults** (some sources 16.1% age-std, NCD-RisC 2022). Hypertension: **~29% adults** (STEPS 2018: women 25.2%, men 19.8%).
- Care cascade broken: **only ~half of hypertensive women (a third of men) know they have it; only ~1/3 of those treated get controlled** (World Bank continuum-of-care report).
- CVD deaths: **415,286 (2024)** — 34.4% of all deaths; age-std CVD mortality 371/100k vs world 212 (World Heart Observatory).
- DALY growth 2009–2019: Ischemic Heart Disease +47.2%, Diabetes +45.9%, COPD +23.7% (ADB NCD landscape 2024). Only half of public facilities offer standard NCD services; "NCD corners" exist at some UHCs with the Simple App (16 urban centers, ~740 hypertension/diabetes entries by Mar 2024 — ARK Foundation).

### 1.11 Telemedicine & digital readiness
- **Shastho Batayon 16263** (national telehealth call centre, DGHS + Synesis IT, since 2015/16): **2.72 crore (27.2M) cumulative calls** by Jun 2026; 2.35M calls in 2025; ~5,500–6,500 calls/day; 1.09 crore calls during COVID; ~100 MBBS doctors, SMS e-prescribe + video consult. **Currently in crisis: provider unpaid 22 months, staff halved, only ~3,000–3,500 calls answered/day** (Daily Star Jun 2026; Financial Express; jagonews Feb 2026).
- Government DGHS rural telemedicine centres (est. 2011/2012): **234 centres treating >100,000 patients/yr by 2024 → collapsed to ~35 after USAID funding cuts (Jan 2025) + non-payment by the ministry** (Rest of World, Jul 2025).
- Connectivity: mobile connections ~**188M (106% of population)**; **BTRC internet subscriptions ~133.6M (Jun 2025) but actual user penetration ≈44.5% (77.7M users)** — double-counting inflates banner numbers (BTRC; DataReportal Digital 2025).
- Households: **72.8% have a smartphone (up from 63.3% in 2023)**; 98.8% mobile phone access; 48.6% of individuals age 5+ use the internet (BBS ICT Use Survey 2024-25, TBS Aug 2025). Urban-rural + gender gaps remain; ~only 15% of rural health workers digitally literate (Digital Dhaka News 2025).

---

## 2. DOCTOR / SUPPLIER-SIDE PAIN POINTS

- **Workload:** 92.67% of surveyed physicians report high workload; 88.46% struggle with history-taking; ~70% can't complete proper history steps under time pressure (MDPI 2024, n=104). Specialist chambers: 50–60 patients/day; 48-second average consultation. Informal providers see ~26–28 patients/day (MOHFW 2021 assessment).
- **Multi-chamber juggling:** ~44–47% of doctors work outside their district of residence; 23% engage in dual practice (govt job + private chambers); doctors shuttle between district chambers and Dhaka weekly. Existing tools (DoctorKoi etc.) are explicitly built around this multi-chamber reality.
- **Near-zero digitization:** only ~4.8% use any digital records; prescription € = paper on pre-printed letterheads; no scheduling, no EMR, no payment rails; feedback/analysis of own prescribing behaviour is essentially non-existent (31.9% of doctors never receive any antibiotic feedback — ARRB 2014).
- **Chamber economics are opaque:** informal, cash-based; fee collection is manual; diagnostics/pharmacy commissions (15–50%) are verbal, unaudited — software plays here (Prescriply "chamber settlement", Doctors Canvas "income & tax statement") but it's greenfield.
- **Practice-management market is nascent and contested:** DoctorKoi Digital RX (~1,450–2,000 doctors as of 2020–21; site now claims "10K+ doctors, 2M+ prescriptions" — self-reported, unverified), Prescriply, CloudRx, Doctors Canvas all launched ~2024–26 with near-identical feature sets (e-prescription + queue + multi-chamber). TAM context: **16,979 private healthcare institutions** (BBS Survey of Private Healthcare Institutions 2021) and ~134k BMDC-registered physicians.
- **Default chambers = only:** >70% of digital health projects in BD depend on donor funding; no insurance reimbursement infrastructure → doctors can't bill institutional payers, only cash patients.
- **Specialist maldistribution:** Dhaka density >2x national average; >75% of doctors at tertiary level; transfers to rural posting require Tk 1–2 lakh bribes (TIB 2014) → rural posting avoidance is systemic.

**Gap conclusion for planner:** the doctor side has no dominant platform — fragmented single-product vendors, no scheduling+EMR+payments+verified-directory bundle, no integration with the planned national SeHR/NDHIE.

---

## 3. EXISTING DIGITAL HEALTH INITIATIVES (BANGLADESH)

### 3.1 Government
| Initiative | What it is | Scale / status |
|---|---|---|
| **Shastho Batayon 16263** | National telehealth call centre (DGHS/MIS + Synesis IT), free doctor consult, SMS e-prescription, ambulance/complaint line | 27.2M cumulative calls; alive but in funding crisis (2026) — payer failure, not demand failure |
| **DGHS telemedicine centres** | Video-consult rooms in upazila hospitals with remote specialist | 234 centres (2024) → ~35 surviving after USAID cut (Rest of World 2025) |
| **DHIS2 / MIS-DGHS** | Routine aggregate health data | Nationwide, but excludes urban PHC/NGO clinics for NCD data (ARK Foundation) |
| **OpenMRS-based hospital automation** | HMIS in public facilities | Only 62 facilities since 2012 (Digital Health Strategy) |
| **Health cards** | Individual health card/enumeration | ~500,000 users — stalled pilot of a national ID |
| **Smart Health BD app** (MIS, DGHS) | Android app for CHWs: ANC/PNC, immunization, growth monitoring | Government CHW tool |
| **e-MIS (DGFP)** | Family-planning registry, ANC/PNC tracking | Operational for DGFP programs |
| **Simple App / NCD corners** | Resolve to Save Lives + National Heart Foundation + NCDC; hypertension/diabetes registries | 16 urban centres (2024); rural NCD corners at UHCs |
| **IMCI app (Save the Children)** | Digital childhood-illness protocol, linked to DHIS2/OpenSRP/OpenMRS/central SHR | Pilot across 319 facilities in Barishal (Apr 2025) |
| **SeHR + National Health ID + ePrescription (Digital Health Strategy 2023–28)** | Shared microservices-based EH Record, consent-managed, NDHIE exchange, BDHA/BNDA standards | On paper; rollout not consumer-visible yet |
| **114 total digital health initiatives mapped under MOHFW** (54 by DGHS alone) | — | Notoriously fragmented, non-interoperable (Digital Health Strategy 2024) |

### 3.2 Private startups (2024–26 status)
_Funding: BD health-tech raised only **~$32M total disclosed (2015–2023)** — a tiny market._

| Startup | Model | Status |
|---|---|---|
| **Praava Health** | "Click-and-brick": owned clinics + patient app + integrated HIS + first patient app in BD; labs meet intl. standards; ~600k patients, NPS 80+; telemedicine + e-pharmacy launched in COVID | Alive; ~$15M raised (angels incl. Petraeus, Dyson); CEO change Apr 2025; uses corporate/employer channel (20% revenue).gpu model study case for trust-first care |
| **Doctorola** | First doctor-appointment marketplace (2015): real-time slots, call center 16484; pivoted to membership "e-Swasthya" care-packages with insurance cashback | **Effectively dormant/shrunk**: 8 employees, ~$310K revenue (Tracxn/LinkedIn 2026); founder moved to Praava in 2022. Publicly not declared "shut down" but near-dead. Lesson: low monetization + brutal CAC (founder: mass-media ads "unbearably expensive"), commission model with hospitals didn't stick |
| **Arogga** | Online pharmacy fighting counterfeit (verified sourcing); delivery + doctor consults | Alive; **$5.6M raised** — top pure e-pharmacy; ~30k orders in a year (2025 profile) |
| **MedEasy** | Online pharmacy for chronic patients, video consult, home sample collection; proprietary inventory/delivery | Alive; $750K seed (2023, Seedstars/Accelerating Asia/others) + $250K SIINC (Biniyog-Briddhi, 2024); 250k orders to 25k chronic customers |
| **Maya** | Anonymous Bangla health/women-health Q&A chat → paid consults | Alive; ~$2.2M raised |
| **CMED Health** | AI-affordable home vitals monitoring + care program | Alive, smaller scale |
| **DocTime** | Video consultation + integrated payments | Alive |
| **AmarLab** | At-home diagnostics collection | Alive; $295.7K |
| **Shombhob Health** | Women-focused online pharmacy | Alive; $300K |
| **BanglaMeds** | e-pharmacy | **Acquired by Chaldal** (2023) |
| **DoctorKoi** | Doctor prescription-writing software (Digital RX) + consults | Alive; 1,500+ verified doctors (2021), self-report 10K+ (2026); $500K Verge HealthTech seed 2021 |
| **Zaynax Health, Jeeon, DoctorKoi, Daktar Bondhu, Osudpotro, Lazz Pharma online, HealthOS (B2B supply), Shukhee (Grameen Digital), LifePlus/Milvik (telehealth+microinsurance)** | Various niche plays | Alive at various scales |
| **AccuMed** | (User listed) — no recent 2024–26 footprint found in searches; possible tiny/dormant. **Data gap.** |

### 3.3 What failed & why (patterns)
- **Funding-side failure, not demand-side failure:** 16263 (unpaid provider, 22 months), 234→35 telemedicine centres (USAID cut + ministry non-payment), rural last-mile dependence on donor money.
- **Marketplace cold-start failure:** Doctorola — patients wouldn't pay for booking, hospitals didn't reliably pay commission, marketing costs crushed seed-funded economics.
- **Structural:** insurance <1% penetration means no payer to subsidize digital care; only 15% rural health workers digitally literate; monetization almost entirely from cash OOP.

---

## 4. GLOBAL REFERENCE MODELS (one-liners)

- **India — ABDA/ABHA (national health ID):** ~**79.91 crore (799M) health accounts by Aug 2025**, 4.18L facilities + 6.8L professionals in registries, 65–67 crore health records linked; consent-gated record sharing (PIB/PIB answer in Rajya Sabha Nov 2025). Model: registries + open APIs, not a closed app.
- **India — eSanjeevani:** state-run hub-and-spoke telemedicine: **43 crore (430M) consultations by Nov 2025**, 224k providers, 719 online OPDs; AB-HWC (doctor-to-doctor via CHW at spoke center) + OPD (patient-to-doctor from home) dual variant — proves assisted-mode telemedicine scales among low literacy populations.
- **India — UHI (Unified Health Interface):** open, interoperable booking network — treat as design pattern (not yet at scale as ABDM).
- **India — Practo / Tata 1mg / PharmEasy:** pure consumer marketplaces: Practo = bookings+consults+HCM for clinics; 1mg = medicine e-commerce + lab booking + credible content; PharmEasy = discount e-pharmacy + diagnostics; all pay-user growth via chronic-medication repeat orders (1mg/PharmEasy 32% rural user share via study).
- **NHS England — GP triage / "101" first-contact practitioner:** every request is triaged to the right level (GP, nurse, pharmacist, self-care) before any slot is consumed — the anti-thesis of Bangladesh's self-refer-to-tertiary chaos (from UK policy, no search done 2026; confirm current post-2024 NHS plan separately).
- **Estonia — e-Health (X-Road):** since 2008: **99% of prescriptions digital (99.8% in 2022), 99% of health data digitized**; patient owns data (can lock/unlock access), blockchain-verified integrity, ~20M health documents; pharmacy dispenses by national ID from central prescription store without paper anywhere (Estonian Health Insurance Fund, WHO 2021). Blueprint for the SeHR architecture BD's strategy already gestures toward.

---

## 5. REGULATORY CONTEXT

- **DGHS:** service delivery regulator/operator — runs telehealth (16263), DHIS2, licensing of clinics/diagnostics via field offices; **DGDA:** drug regulator — licenses drug shops/factories, price control, anti-counterfeit enforcement (chronically understaffed; only 43% of shops inspected).
- **Telemedicine is legal.** **BMDC Telemedicine Guidelines (July 2020)**, issued under BMDC Act 2010 modeled on India's 2020 MoHFW guidelines: registered-MBBS doctors only, no anonymity, patient identity verification, drug-prescribing matrix by consultation mode (video > audio > text), doctor must transmit a signed scan or e-prescription, **platforms must verify + display BMDC registration numbers**, AI/chatbots may not counsel or prescribe (bmdc.org.bd PDF).
- **National Telehealth Guideline (DGHS)** layer on top: telehealth providers need a licence; must publish a price list; must use the **national Health ID** (registries keyed to NID/BRN); must connect to NDHIE and follow BDHA/BNDA data standards.
- **e-prescription:** permitted (yes) and planned to become the standard — Digital Health Strategy 2023–28 gets it as "an integral part of the shared electronic health record". Legal gap per TRW Law (Oct 2026): **no statutory e-prescription standard, no telemedicine licence in force yet, no dedicated patient-redress tribunal** — guidelines exist, statute lags.
- **Digital Health Act** — the strategy (objective 6.1.1) pledges a "Digital Health Act" for data security/privacy/accountability; **not yet enacted** (data gap: monitor).
- **Medical Practice & Private Clinics/Labs regulation:** the operative regime derives from the **Medical Practice and Private Clinics and Laboratories (Regulation) Ordinance 1982** + the planned **Health Care and Safety Ordinance 2024** (interim govt, announced Sept 2024) which would, for the first time, cover digital medical services (TBS Sep 2024). Licensure drives against 5,000 illegal institutions ongoing (2026).
- **Drugs and Cosmetics Act 2023:** replaced 1940 Drug Act framework; prescription-only sales + life imprisonment for counterfeits; enforcement weak (zero life sentences).
- **Bangladesh Digital Health Strategy 2023–2028 (DGHS/MOHFW, WHO-supported):** commitments include SeHR (SaaS, patient-consent-driven, developed from nationally accepted ID), NDHIE (national exchange, open API for private providers), eLearning, telemedicine-as-SaaS, ePIS (electronic immunization with e-cards/GIS), and interconnection of private HMIS vendors. Practical takeaway: **any new platform should be BDHA/BNDA standards-compliant and NDHIE-API-ready from day one** to avoid the 114-initiative fragmentation trap.

---

## 6. DATA GAPS / CAVEATS (honest list)

1. **Terminology note:** "Weaver cosaDHI / CityTred / HCP (Health Care Plus)" from the brief could not be identified in any 2024–26 source — likely OCR garble of other initiative names; flag for original-doc check.
2. **OOP exact %:** 78% (2022) / 79.31% (2023) / 79% (2024) — all consistent-ish (WHO GHED); use "~79%".
3. **Medical tourists to India:** 2.5 lakh vs "25 lakh" per year cited in different TBS pieces — unresolved.
4. **MMR:** World Bank official 123 (2020) vs fresh survey reanalysis 196 (2025) — different methods; cite both.
5. **Doctorola "shutdown":** no public shutdown announcement; evidence = near-dormancy (8 staff, founder exit, tiny revenue).
6. **Counterfeit share of pharmacy market:** 2–3% (industry), 6% (govt lab), 10–20% (academic sampling), "40%" (tabloid) — spread is wide; reliable figure is 6–20% by sampling method.
7. **Dalal/informal-payment stats rely on TIB 2012/2017/2021 household surveys** — no newer national survey found.
8. **Startup funding figures** are pre-2024 self/company disclosures; post-2024 valuations/runway unknown.
9. **Estonia/NHS one-liners** reflect well-documented 2021–2024 baseline; NHS post-2024 policy details not re-verified in this search.
10. **Smart-phone list:** BBS "smartphone adoption 72.8%" is household-level (2024-25), not individual penetration (which is ~44–48% internet).
