# Bangladesh Health Institutions, National Digital-Health Systems, and Foreign Institutional-Operations Innovations

Research date: 2026-10-26. Notes on sources: the "chatbot-knowledge" markdown files on git.dghs.gov.bd are informal internal DGHS files, not official publications, so treat their figures as weaker. All "my calc" numbers are my own arithmetic from the cited figures.

## Q1. The national e-Health Card / Health ID / SHR: what it is, dates, pilots, status 2024–2026

### Takeaway
The e-Health Card is a BNP-government flagship (manifesto pledge, part of its 180-day agenda). The PM said it would be piloted in 5 districts (Khulna, Noakhali, Bogura, Sirajganj, Narsingdi), linked to an Electronic Referral System and an Electronic Patient Management System. The stated target is all citizens by 2028, delivered through an ADB-cofinanced TA project. As of July 2026 it was only "close to implementation", and in April 2026 the district facilities said they had no instructions and lacked computers, internet, servers and trained staff. It sits on an existing DGHS stack: SHR/OpenHIE, a Unique Health ID (2023) and a published BD Core FHIR IG. Judges will value ideas that make the card *useful at the facility level* (referral, records, pharmacy, labs), not ideas that just issue cards.

### Cited Findings
**Timeline**
- **4 Mar 2026:** The Daily Star explainer describes the e-Health Card as a BNP manifesto commitment. PM Tarique Rahman ordered its launch at a special committee meeting. The state minister said "all medical records will be stored permanently on the card", with past records accessible at any hospital. Digital data would also show whether doctors are present at their workplaces. The first pilot was to be one (unnamed) district, starting with primary care and then building a referral network up to the district or medical college hospital. — [Daily Star, 4 Mar 2026](https://www.thedailystar.net/news/governance/news/e-health-card-what-it-and-how-will-it-benefit-you-4120806)
- **15 Apr 2026:** The PM told Parliament about the five-district plan. **18 Apr 2026:** At Osmani Memorial Auditorium he said an integrated e-health card would launch "shortly", alongside a phased national health insurance scheme. — [Bonik Barta, 19 Apr 2026](https://en.bonikbarta.com/bangladesh/SyidD595PYwTVnF0)
- **Apr 2026 status:** The rollout target was June 2026, and the project was still awaiting ECNEC approval. It is a Technical Assistance project co-financed by the ADB and the GoB. Planned components:
  - e-health cards linked to an electronic patient management system
  - an electronic referral system, so clinicians can see prior history at any facility
  - door-to-door data collection by rural health workers, uploaded to a central database
  - community health workers, health hubs and union centres merged into one primary-care unit

  — [Bonik Barta, 19 Apr 2026](https://en.bonikbarta.com/bangladesh/SyidD595PYwTVnF0)
- **Readiness gaps (Apr 2026):** District sadar hospitals and UHCs had no directive. Civil surgeons of Bogura, Noakhali, Sirajganj and Khulna confirmed they had no instructions. Many sites lack computers, uninterrupted internet, secure servers and network support. Most hospitals have no staff skilled in data management, cybersecurity or software, and many still keep paper records. Experts warned about data protection; telecom specialist Sumon Ahmed Sabir cited health-data thefts in Singapore and the UK. — [Bonik Barta, 19 Apr 2026](https://en.bonikbarta.com/bangladesh/SyidD595PYwTVnF0)
- **10 Jun 2026:** The PM told Parliament the pilot would be launched in the 5 districts "within 180 days of the formation of the government", connected to the Electronic Referral System and the Electronic Patient Management System. — [BNP news page](https://www.bnpbd.org/all-news/6a296fb5007900e0752f3711) (party site, not independent)
- **10 Jun 2026:** Health Minister Sardar Md. Sakhawat Husain told Parliament the aim is e-health cards across Bangladesh **by 2028**, via a TA project, tied to a digital health ID and a nationwide health database. Related plans: raise health spending gradually to 5% of GDP, consider recruiting 100,000 health workers, and give every district a modern secondary care unit. — [The Report, 10 Jun 2026](https://thereport.live/bangladesh/govt-aims-to-provide-e-health-cards-to-all-citizens-by-2028-health-minister/40417)
- **16 Jul 2026:** State Minister Dr M A Muhit said e-health cards and digital prescriptions are "close to implementation", alongside AI and digital roadmaps. No date was given. — [Dhaka Tribune, 16 Jul 2026](https://www.dhakatribune.com/bangladesh/health/415320/state-minister-e-health-card-near-implementation)
- **18 Oct 2026 (hackathon launch):** The card is tied to a national health database of "nearly 200 million people" that would collect records from doctor visits, dispensary purchases and lab tests. — [BSS, 18 Oct 2026](https://www.bssnews.net/news/436268)
- An earlier Dhaka Tribune headline said "National E-health Card to launch by June". — [Dhaka Tribune](https://www.dhakatribune.com/amp/bangladesh/health/405261/health-minister-national-e-health-card-to-launch) (not fetched; date not confirmed)

**Underlying DGHS stack (pre-existing)**
- **Health ID:** Each person gets only one Health ID, issued after verifying their NID or Birth Registration Number. The ID begins with "9". The SHR's Master Client Index module creates and maintains the unique ID. — [DGHS SHR: UHID & MCI](https://en.info.shr.dghs.gov.bd/uhidmci/)
- Per the SHR portal, Bangladesh introduced a unique Health ID in 2023, covering children through their BRN. SHR is built on the OpenHIE framework, and facilities and providers must enrol through DGHS MIS. — [SHR documentation](https://en.info.shr.dghs.gov.bd/documentation_introduction)
- **Earlier HIE/SHR pilot (c.2013–2016):** Thoughtworks built the HIE/SHR with Bahmni as the EMR at Kaliganj UHC and the Durbati and Chandaya community clinics. Before go-live, a registration desk was handling more than 350 patients a day on paper. — [Thoughtworks blog](https://www.thoughtworks.com/en-gb/insights/blog/implementing-shared-health-record-platform-rural-bangladesh)
- An earlier DGHS health ID / hospital card pilot ran in Muksudpur (Gopalganj) and Singair (Manikganj) upazilas. — [Dhaka Tribune, "Health ID for all"](https://www.dhakatribune.com/bangladesh/333077/health-id-for-all-seamless-medical-information) (via search snippet; date [uncertain])
- **Health Sector Reform Commission (report submitted 5 May 2025, ~32 recommendations)** proposed:
  - "Shasthya-Setu", an integrated digital health information platform connecting all public and private institutions
  - a Unique Health ID linked to a "Shasthya-Chabi" (Health Key Card)
  - a phased, mandatory nationwide e-prescription system
  - a digital grievance redressal system

  The ministry selected 33 recommendations for implementation. Its short-term list includes a digital complaints platform and e-prescription. — [Daily Star](https://www.thedailystar.net/news/governance/news/e-health-card-what-it-and-how-will-it-benefit-you-4120806); [Daily Star, 33 proposals](https://thedailystar.net/news/bangladesh/news/health-sector-reform-33-proposals-set-implementation-3964871); [Prothom Alo](https://en.prothomalo.com/bangladesh/x26rkpa76h)

### Inferences
- The two named back-end systems (Electronic Referral System and Electronic Patient Management System) are where hackathon MVPs can plug in. Referral is explicitly in the government framing, and "lost referrals between facilities" is one of the three example problems.
- "Medical records stored on the card" (minister's phrasing) conflicts with the SHR/central-database architecture. The card is most likely an identifier/token for a central record. An offline-capable "card as key + facility cache" design would address the April 2026 connectivity gaps.
- Readiness gaps (no computers, internet or skilled staff at district level) make low-bandwidth, offline-first, and staff-light workflows a credible differentiator.

### Gaps
- No public confirmation found that the 5-district pilot actually started (the 180-day deadline falls around Aug–Sep 2026). There is no ADB project number or budget in the sources.
- Card form factor (smart chip, QR, or virtual) is not specified in any source found.

## Q2. National digital-health infrastructure (strategy, DHIS2, OpenMRS+, FHIR, call centre, data-protection law)

### Takeaway
Bangladesh has substantial plumbing:
- DHIS2 (often called the world's largest deployment, ~98% reporting, 14,000+ community clinics)
- OpenMRS+/Bahmni hospital automation in ~100 public hospitals (DGHS informal source)
- SHR/OpenHIE with UHID
- a published BD Core FHIR R4 IG with a public sandbox
- the Digital Health Strategy 2023–2027
- a Personal Data Protection Ordinance gazetted 6 Nov 2025 that treats health data as sensitive

The problem is fragmentation, connectivity and staffing, not a missing platform. Shasthya Batayon 16263 is large but financially distressed.

### Cited Findings
- **Bangladesh Digital Health Strategy 2023–2027 (MoHFW):** Its mission is a sustainable, interoperable digital health ecosystem, aligned with WHO's Global Strategy on Digital Health 2020–2025. One pillar is "Infrastructure and interoperability". — [Strategy PDF, DGHS portal](https://dghs.portal.gov.bd/sites/default/files/files/dghs.portal.gov.bd/page/4124d18a_ab99_40e2_8fef_ff4052948739/2024-04-23-07-09-0e2e4af1153a33f0a651103801c4a5ad.pdf); [DigWatch summary](https://dig.watch/resource/the-bangladesh-digital-health-strategy-2023-2027)
- **DHIS2:** DGHS adopted it in 2009. UNICEF's case study calls Bangladesh "the largest DHIS2 deployer in the world", with a 98% average reporting rate and over 13,000 community clinics linked. — [UNICEF ROSA case study](https://www.unicef.org/rosa/media/3416/file/A%20Case%20Study%20Bangladesh%20Online.pdf). A DHIS2.org story (Oct 2025) says data now comes from 14,000+ community clinics plus national programmes. — [DHIS2.org](https://dhis2.org/expanding-routine-data-use-bangladesh/)
- **DHIS2 Android:** A measles-rubella campaign used the Android Capture App with more than 20,000 users, described as the largest Android deployment in DHIS2 history. — [DHIS2.org](https://dhis2.org/bangladesh-immunization-campaign/)
- **OpenMRS+ hospital automation** combines Bahmni, OpenELIS (lab) and an inventory module. It started in 2016 and is "operational across 100 public hospitals": 97 on local servers, 3 on a central online deployment under test. Modules cover IPD, OPD, emergency, billing, pharmacy, lab and inventory. — [DGHS git, openmrs.md (informal)](https://git.dghs.gov.bd/mahfuj/chatbot-knowledge/src/commit/b25b6fd7d637782fdfa7f503c6d031baf6dd734f/openmrs.md)
- **BD Core FHIR Implementation Guide (v0.4.6, DGHS, status "informative"):** It addresses fragmentation across DHIS2, hospital automation, field automation and HRIS. Scope: identity (UHID/NID/BRN), facility/organization registry, immunization, lab and condition profiles, and terminology (ICD-11, SNOMED subsets, local codes). Public sandbox: `https://sandbox.fhir.dghs.gov.bd/fhir` (FHIR R4). Repo commits date from Sep–Oct 2025. — [fhir.dghs.gov.bd](https://fhir.dghs.gov.bd/); [background](https://fhir.dghs.gov.bd/core/background.html)
- **DGHS e-Appointment portal** (eappointment.dghs.gov.bd): OPD booking with Health ID generation, piloted in selected hospitals. — [DGHS git, eappointment.md (informal)](https://git.dghs.gov.bd/mahfuj/chatbot-knowledge/src/branch/openmrs/eappointment.md)
- **Shasthya Batayon 16263:**
  - More than 2.34 million calls in 2025, 5,500–6,500 calls a day currently, and more than 27 million calls since inception.
  - The ministry has not released funds for 17 months, and the operator is owed Tk 112.4 million.
  - The contract was due to expire in April 2026.

  — [Financial Express](https://thefinancialexpress.com.bd/health/natl-telehealth-helpline-16263-faces-shutdown-amid-funding-crisis); [Prothom Alo](https://en.prothomalo.com/bangladesh/gdmucoatn3); [Observer, Jun 2026](https://observerbd.com/news/565532). During COVID, 10,175,080 people were served between Mar and Oct 2020. — [TBS](https://www.tbsnews.net/node/151003)
- **Personal Data Protection Ordinance 2025:** The Council of Advisers gave final approval on 9 Oct 2025 and the gazette was published on 6 Nov 2025. Health records are "sensitive personal data", explicit consent is required before collection, storage, transfer or use, and there are rules on cross-border data. Some sections take effect 18 months after gazette notification (≈ May 2027, my calc). — [TBS](https://www.tbsnews.net/node/1281356); [Prothom Alo](https://en.prothomalo.com/bangladesh/government/teeopu4dfv); [Daily Star key takeaways](https://www.thedailystar.net/tech-startup/news/bangladeshs-personal-data-protection-ordinance-2025-key-takeaways-4015401)
- **DGFP logistics:** WIMS (warehouses), UIMS (upazila stores: stock, supply plans, vouchers, monthly reports) and an eLMIS portal with an SDP dashboard, all built with USAID/SIAPS-MSH. The DGFP Monthly Logistics Report includes a section listing upazilas and warehouses with stock-outs; the latest found covers Mar 2024. — [USAID Learning Lab](https://usaidlearninglab.org/node/15323); [DGFP monthly report PDF, May 2024](https://dgfp.portal.gov.bd/sites/default/files/files/dgfp.portal.gov.bd/monthly_report/30e427a5_af8d_45fd_b06d_19234b44a4e8/2024-05-08-08-50-010bac7e2425bf18584d0a167949b8fa.pdf). So UIMS/eLMIS is **verified as existing under DGFP** (family-planning commodities). I found no evidence of an equivalent live eLMIS for DGHS essential medicines.

### Inferences
- A FHIR sandbox plus the UHID gives hackathon teams a concrete integration target. Demoing a FHIR R4 Bundle against `sandbox.fhir.dghs.gov.bd` would signal "powers the e-Health Card" credibly.
- The DGFP eLMIS covers contraceptives, not DGHS essential drugs. Community clinic drug stock-outs (Q4) appear to have no comparable real-time visibility. This is a gap.
- PDPO consent requirements create a niche for consent management and access logging layered on the card.

### Gaps
- eMIS for community clinics: no source found on its current status.
- I did not find official, current counts of OpenMRS+ hospitals; the 100-hospital figure is from an informal source.
- I found no MaMoni-specific digital-system data in this pass.

## Q3. Reporting on the Oct 2026 E-Health Hackathon itself (15 priority areas)

### Takeaway
The full list of 15 priority areas was **not found** in any accessible source. The BSS and Lanka Business News reports give only examples. The official site (ehealthhackathonbd.org) returned HTTP 403, and agent-reach was rate-limited (wait ~53 min), so the site was not read.

### Cited Findings
- **Launch (18 Oct 2026, Dhaka):**
  - The e-Hackathon was announced by State Minister Dr M A Muhit at a press conference organised in partnership with WHO.
  - Invest Bangladesh Chairman Chowdhury Ashik Mahmud Bin Harun also spoke.
  - Registration is open for one month, followed by a three-day bootcamp in Dhaka.
  - Focus areas mentioned: app-based hospital appointment booking to reduce queues, QR codes and digital tracking in medicine supply chains, a research fund, strengthening BMRC and DGDA, dengue control, and a National Vaccine Research Institute.

  — [BSS, 18 Oct 2026](https://www.bssnews.net/news/436268)
- **Lanka Business News (19 Oct 2026):** Organised by MoHFW with Interspeed Activation Limited. It has "15 priority areas", with examples given: **"diagnosis backlogs, unverifiable prescriptions and lost referrals between facilities."** A 10-member screening committee narrows 50 teams to 25 and then to the top 5. Leading ideas may get recognition from the PM. The Ministry may take selected MVPs forward as foundations for official national e-health solutions. The minister said working in isolation could leave initiatives "confined to separate silos". — [Lanka Business News, 19 Oct 2026](https://www.lankabusinessnews.com/e-health-hackathon-2026-launches-to-build-ai-and-digital-solutions-for-bangladeshs-health-system/)
- Dhaka Magazine also covered the "Call for National Hackathon". — [Dhaka Magazine](https://www.dhakamagazine.com/en/article/5321/call-for-national-hackathon-for-digital-transformation-of-health-system-state-minister-for-health/amp) (not fetched)

### Inferences
- "Unverifiable prescriptions" maps to e-prescription with verification (QR/signature) and pharmacy dispensing. "Lost referrals" maps to the Electronic Referral System. "Diagnosis backlogs" maps to labs, imaging and radiotherapy queues (see Q4). "QR tracking in medicine supply chains" maps to DGDA and supply-chain work.
- Note that the minister himself cited app-based appointment booking. Plain booking is excluded as generic by the participant's own rules, but queue and flow intelligence layered on the card is adjacent and on-message.

### Gaps
- The verbatim 15-area list: retry ehealthhackathonbd.org later (after the rate-limit window) or check its Facebook page. The task brief quotes the site as covering "primary care and electronic records to referrals, pharmacy, labs and ambulance services".

## Q4. Institutional pain points in Bangladesh (beds/ICU, OPD, OT, stock-outs, equipment, waste, billing/licensing, accreditation, referral, specialised institutes, community clinics)

### Takeaway
The evidence is strongest, most recent and most quantified for five problems:
- **Idle or broken equipment:** a 2026 PPRC study found 52% of diagnostic equipment unused and malfunction behind 79% of service gaps.
- **Essential-medicine availability:** 22% across sampled facilities, and community clinics without supply for 8–10 months in several districts.
- **Radiotherapy backlog:** NICRH has 4 of 6 machines down and about 7,500 patients waiting.
- **Referral bypass:** 59% of tertiary patients self-referred; secondary and tertiary occupancy at 148% and 137%.
- **Unlicensed private facilities:** 1,149 sealed in 4 days in 2022, and about 1,027 still without valid licences per a 2024 DGHS report.

ICU data is thin and old. There is no national hospital accreditation body.

### Cited Findings
**Beds / ICU**
- About 1.7 ICU beds per 100,000. 38 of 64 districts have no ICU, and roughly 80–90% of ICU beds are in Dhaka. — [Financial Express opinion](https://thefinancialexpress.com.bd/views/opinions/critical-care-crisis-needs-urgent-action) (year [uncertain]; underlying source not named)
- COVID era: 1,245 ICU beds (508 government, 737 private) for over 160 million people, ≈0.8/100k (my calc). — [Dhaka Tribune, 2020](https://www.dhakatribune.com/bangladesh/health/208907/coronavirus-insufficient-icu-beds-inadequate)
- 2,139 ICU beds (965 public, 1,174 private), attributed to Health Bulletin 2022. — [LinkedIn compilation](https://bd.linkedin.com/in/sadiatasnim019) [uncertain: secondary, unofficial]
- The DGHS COVID bed data came from a daily bulletin, based on hospitals' self-reports, and per a DGHS ADG "24 hours old". Reports noted inconsistent data on vacant beds. — [Prothom Alo](https://en.prothomalo.com/amp/story/bangladesh/patients-rush-from-one-hospital-to-another-for-treatment); [Dhaka Tribune](https://www.dhakatribune.com/bangladesh/health/230356/2-out-of-3-icu-beds-occupied-in-dhaka). **I found no current real-time public bed/ICU dashboard.**

**OPD flow / overcrowding (DMCH)**
- DMCH is a 2,600-bed hospital with 4,000–4,500 inpatients a day on average, and about 7,000 patients a day through OPD and emergency. — [Dhaka Tribune](https://www.dhakatribune.com/bangladesh/health/405950/dmch-remains-busy-providing-services-during) (date [uncertain], likely 2026). Patients are accommodated on floors when beds run out. — [Observer, Dec 2025](https://www.observerbd.com/news/512552)
- BMU (formerly BSMMU) launched online OPD ticketing in Oct 2025, paid through Pubali Bank. In Apr 2026 it urged patients to use online appointments to cut crowding. — [Prothom Alo](https://en.prothomalo.com/bangladesh/ixcez1o38q); [Jago News](https://www.jagonews24.com/en/national/news/91372)

**Referral bypass**
- A 2024 study of 822 patients at 2 tertiary hospitals found:
  - 59% self-referred
  - 58% unaware of the referral system
  - reasons for self-referral: inadequate treatment (28%), inadequate facilities (23%)
  - occupancy cited: secondary ~148.2%, tertiary 137%, primary 79%

  — [Hasan et al., BMC Health Serv Res 2024](https://link.springer.com/10.1186/s12913-024-11115-8)
- Dengue referral barriers at Savar UHC: ambulance shortage and "lack of feedback system". — [BRACU dspace](https://dspace.bracu.ac.bd/items/3cfefc17-e696-48d8-80c1-b06aa715a7c0)

**Drug and supply stock-outs**
- The PPRC study (funded by the MoHFW Health Economics Unit; presented 29 Jul 2026, covering 22 facilities in 8 divisions) found:
  - essential medicine availability averaged 22%
  - 64% of facilities lacked tourniquets, 55% bag-valve masks, 41% cord clamps
  - lab disruption causes: reagents 43%, faulty equipment 34%, staff 19%
  - 85% of the 2024–25 budget was spent, and 94% of institutions had unspent budget at year-end
  - EDCL supplies about 62% of medicines; timely deliveries alone could raise availability to about 90%

  — [Prothom Alo, 30 Jul 2026](https://en.prothomalo.com/bangladesh/904ggpi81h); [TBS](https://www.tbsnews.net/bangladesh/health/health-budgets-not-translating-services-due-governance-gaps-pprc-study-1501371)
- After the 5th HPNSP was dropped, procurement stalled for almost a year, leaving about 14,500 community clinics short of essential drugs. — [Daily Star](https://online.thedailystar.net/node/4071006) (year [uncertain], likely 2025)
- Local reports:
  - Bheramara (Kushtia): 18 clinics down from 27–30 free medicines to 2–3; patients paying Tk 400–500 at pharmacies. — [Observer, Mar 2026](https://www.observerbd.com/news/565452)
  - Fakirhat (Bagerhat): no supply for about 9 months. — [Observer, Jun 2026](https://observerbd.com/news/576883)
  - Jashore: 283 clinics without medicine for about 8 months. — [Bonik Barta](https://en.bonikbarta.com/bangladesh/n79GkolkDClJDR5X)
  - Pirganj (Thakurgaon): 28 clinics hit. — [UNB](https://unb.com.bd/category/Special/patients-turned-away-as-drug-crisis-cripples-28-community-clinics-in-thakurgaons-pirganj/185903)
  - Nationally, about 84% of health workers say patients return because medicines are unavailable. — [Dhaka Tribune, Jun 2026](https://www.dhakatribune.com/bangladesh/health/413839/inside-bangladesh%E2%80%99s-community-clinics-promise)
- Background: a 2020 survey found 72% of 120 public hospitals had experienced medicine shortages. — [TBS](https://www.tbsnews.net/node/810890) (per search summary)

**Equipment maintenance and downtime**
- PPRC 2026 found:
  - 52% of diagnostic equipment was not used at all in the past year
  - imaging was available 65% of the time but provided regularly only 25% of the time (UHC: 46% availability, 17% regular)
  - malfunctioning equipment caused 79% of service gaps
  - 3,892 technologists in post against 6,406 sanctioned (about 40% vacant)

  — [Prothom Alo, 30 Jul 2026](https://en.prothomalo.com/bangladesh/904ggpi81h)
- Specific hospitals:
  - 537 machines out of order at Rangpur MCH. — [Prothom Alo](https://en.prothomalo.com/amp/story/bangladesh/5siazbihf0)
  - 238 machines out of order at DMCH, Suhrawardy and Mitford. — per [Prothom Alo search summary](https://en.prothomalo.com/bangladesh/904ggpi81h) [uncertain article]
  - At Rangpur MCH, repeated repair requests to NEMEMW got no reply, and 14 of 26 dialysis machines were dysfunctional (COVID era). — [Prothom Alo](https://en.prothomalo.com/bangladesh/local-news/medical-equipment-mostly-in-disrepair)
  - The High Court ordered a probe into 28 diagnostic machines left unused at 16 hospitals. — [UNB](https://unb.com.bd/category/Bangladesh/medical-equipment-lying-packed-at-16-hospitals-hc-orders-probe/78682)
  - 80 health facilities lie idle in 18 districts. — [Daily Star](https://www.thedailystar.net/news/80-health-facilities-lie-idle-18-districts-4077256)
- NEMEMW&TC (Mohakhali) is the MoHFW central repair body and runs repair tenders (2023–24). — [BPPA tender](https://www.bppa.gov.bd/advertisement-goods/details-83702.html). I found no backlog data and no digital asset registry.

**Radiotherapy / NICRH**
- NICRH: 4 of 6 machines out for more than 2 years. The 2 working machines treat 250–300 patients a day across shifts from 8am to midnight. About 7,500 patients are waiting, some appointments are set for end-2028, and new registrations have been suspended for about 6 weeks. The plan is 17 new LINACs by June 2027. GLOBOCAN counts about 187,263 new cancers in 2024. — [Dhaka Tribune, 20 Oct 2026](https://www.dhakatribune.com/bangladesh/health/422565/7-500-cancer-patients-await-radiotherapy-as)
- In 2021 NICRH's director said the country needs at least 250 machines and had about 37. — [Daily Star 2021 PDF](https://epfs.thedailystar.net/TDS/2021/02/04/Bangladesh/MAI/5_13/a46210a7bd3dc877_13.pdf) (per search summary)

**Private clinic licensing / billing**
- On 26 May 2022 DGHS ordered unregistered clinics closed within 72 hours. 1,149 facilities were sealed in 4 days (to 1 Jun 2022). The minister cited about 11,000 diagnostic centres. — [Financial Express](https://old.thefinancialexpress.com.bd/national/1149-unauthorised-medical-facilities-sealed-off-in-four-days-1654004277)
- A 2024 DGHS report put about 1,027 facilities without valid licences. — [Daily Star editorial](https://online91.thedailystar.net/opinion/editorial/news/rein-errant-clinics-diagnostic-centres-4135366)
- I found no data source on billing transparency or price-display compliance in this pass.

**Medical waste**
- The Medical Waste (Management and Treatment) Rules 2008 apply. A TIB study found 31% of hospitals non-compliant and 49% lacking needle destroyers. Staff sell reusable waste (syringes, saline and blood bags) to recyclers. — [Financial Express](https://thefinancialexpress.com.bd/views/opinions/messy-clinical-waste-management)
- About 600 health-care establishments in Dhaka generate about 200 t/day (2008 study; 22.6% hazardous). — [BMC Public Health 2008, PMC2254398](https://pmc.ncbi.nlm.nih.gov/articles/PMC2254398)
- A projection of about 50,000 t of medical waste nationally in 2025, 12,435 t of it hazardous. — [Financial Express](https://thefinancialexpress.com.bd/views/opinions/messy-clinical-waste-management) [uncertain projection]
- Hospital waste management "lags sustainable standards". — [UNB/Ittefaq, Jul 2026](https://unb.com.bd/category/Special/hospital-waste-management-in-bangladesh-lags-behind-sustainable-standards/153503)

**Quality / accreditation**
- **I found no national hospital accreditation body.**
  - BMEAC (est. Apr 2024 under the 2023 Act) accredits medical colleges.
  - The Bangladesh Accreditation Board accredits medical laboratories (ISO 15189).
  - Labaid holds Indian NABH accreditation.

  — [Daily Star (BMEAC)](https://www.thedailystar.net/news/step-towards-improving-medical-education-quality-4082026); [ILAC/BAB](https://ilac.org/?p=126207); [Labaid NABH](https://labaid.com.bd/en/about/nabh-accredited)
- A DGHS DG reportedly said a national accreditation system is needed. — [Observer](https://observerbd.com/news/346643) (date [uncertain])

**Blood**
- No national real-time government blood stock portal was found.
- DMCH's BIMA blood information app dates from 2015. — [PMC5135104](https://pmc.ncbi.nlm.nih.gov/articles/PMC5135104)
- ICT Division, Meta and DGHS trained 200+ hospitals on Facebook Blood Donations via the startup Bloodman. — [Daily Star](https://www.thedailystar.net/ict-division-facebook-and-bloodman-join-forces-save-lives-1916593)
- DGHS estimates a need of 1–1.1 million bags a year. — [Financial Express](https://today.thefinancialexpress.com.bd/print/blood-bank-for-every-upazila-1650294132)

### Inferences
- The highest-evidence, non-generic targets:
  - (a) an equipment uptime registry with breakdown ticketing and NEMEMW routing (79% of service gaps are malfunction-driven)
  - (b) community-clinic and UHC essential-drug stock visibility (DGHS has no eLMIS equivalent to DGFP's)
  - (c) referral with closed-loop feedback tied to the Health ID
  - (d) a transparent radiotherapy / diagnostic queue across institutions (NICRH registrations suspended; 17 LINACs coming in 2027 will need cross-site load balancing)
- Unspent budgets (94% of institutions) alongside stock-outs suggest the bottleneck is procurement and information, not funds. That argues for demand signalling from facility consumption data.

### Gaps
- OT scheduling and surgical waitlists in Bangladesh: no data found.
- NICVD, NITOR and NINMAS waiting lists: not found.
- Current ICU totals from an official DGHS Health Bulletin: not retrieved.
- Community clinic count: "13,000+", "14,000+" and "~14,500" all appear in sources ([UNICEF](https://www.unicef.org/rosa/media/3416/file/A%20Case%20Study%20Bangladesh%20Online.pdf), [DHIS2.org](https://dhis2.org/expanding-routine-data-use-bangladesh/), [Daily Star](https://online.thedailystar.net/node/4071006)). Treat as "~14,000+".

## Q5. Proven foreign institutional-operations innovations, with impact evidence and Bangladesh status

### Takeaway
The best-evidenced transferable models:
- **India ABDM Scan-and-Share:** QR OPD registration; wait cut from 30–40 to 5–10 minutes; 66.4M tokens at 17,481 facilities by Nov 2024.
- **Kerala eHealth:** 1,001 institutions; QR "Scan and Book" OP tickets.
- **Zipline Rwanda:** median 41-minute blood delivery; peer-reviewed reduction in wastage.
- **Rwanda MEMMS:** national equipment maintenance registry.
- **Thailand MOPH Refer:** about 400,000 e-referrals.
- **e-RaktKosh:** national blood stock portal.
- **Mera Aspataal:** structured patient feedback; 24% dissatisfied, 2016–19.
- **Singapore NEHR:** mandatory contribution law passed Jan 2026.
- **Indonesia SATUSEHAT:** FHIR mandate.
- **Estonia:** health is almost half of all X-Road traffic.
- **NHS OPEL:** standardised escalation levels.

In Bangladesh, most of these are **NOT PRESENT** or **EARLY-STAGE**. OPD online booking is the only one approaching saturation.

### Cited Findings
**1. India ABDM Scan-and-Share (QR OPD registration)**
- Launched Oct 2022. By Nov 2024: 17,481 facilities in 35 states/UTs, 6.64 crore tokens, about 3.3 crore person-hours saved, about 2 lakh tokens a day. The registration wait fell from 30–40 to 5–10 minutes (ministry figure, not an independent study). — [MoHFW press release](https://mohfw.gov.in/press-info/7908)
- The pilot at Lady Hardinge and Sucheta Kriplani hospitals served 2,200+ patients in 15 days. — [BioVoice](https://biovoicenews.com/?p=46252)
- **BD status: EARLY-STAGE / partly present.** BMU has online OPD tickets (Oct 2025) — [Prothom Alo](https://en.prothomalo.com/bangladesh/ixcez1o38q). DGHS e-Appointment is in pilot hospitals — [DGHS git (informal)](https://git.dghs.gov.bd/mahfuj/chatbot-knowledge/src/branch/openmrs/eappointment.md). I found no QR, Health-ID-based instant registration at the counter.

**2. India ORS / eHospital (NIC)**
- ORS (ors.gov.in) was inaugurated on 1 Jul 2015. It handles appointments, lab reports, blood availability and payment, using an Aadhaar-linked UHID. eHospital runs on NIC cloud in "more than 1000" facilities. — [eHospital NIC about](https://ehospital.nic.in/ehospitalsso/aboutus)
- ORS links to over 400 hospitals. — [IMPRI](https://www.impriindia.com/insights/ors-healthcare-system-for-patients/) [uncertain, dated]
- **BD status: EARLY-STAGE.** OpenMRS+ runs in about 100 hospitals, mostly on local servers. — [DGHS git (informal)](https://git.dghs.gov.bd/mahfuj/chatbot-knowledge/src/commit/b25b6fd7d637782fdfa7f503c6d031baf6dd734f/openmrs.md)

**3. Kerala eHealth**
- 1,001 institutions, including 19 medical college institutions, 33 district/general hospitals, 87 taluk hospitals and 554 family health centres. — [Digital Health News](https://www.digitalhealthnews.com/kerala-brings-1-001-medical-institutions-under-its-statewide-e-health-system)
- About 2.61 crore permanent UHIDs (30.9% of 8.45 crore registrations). History is visible to doctors only with a permanent UHID card. "Scan and Book" QR gives instant OP tickets (2025). — [Kerala Kaumudi](https://keralakaumudi.com/en/kerala/general/treatment-at-your-fingertips-751-hospitals-adopt-e-health-system-in-kerala-1512863); [Onmanorama, Apr 2025](https://onmanorama.com/news/kerala/2025/04/05/kerala-hospitals-digital-payments.html)
- **Lesson for the BD e-Health Card:** a temporary-vs-permanent ID split limits record continuity.

**4. India e-Aushadhi / DVDMS (drug inventory)**
- Automates procurement and distribution across state warehouses. — [Inderscience 2021](https://www.inderscience.com/filter.php?aid=114723)
- The Punjab CAG audit (FY to 31 Mar 2018) found implementation shortcomings and no rollout plan for 360 institutions. — [CAG Punjab](https://www.cag.gov.in/uploads/download_audit_report/2019/Chapter_2_Performance_Audit_of_Report_No_4_of_2019_Social_General_and_Economic_Sectors_Non_PSUs_Government_of_Punjab.pdf)
- **No quantified stock-out reduction found** [gap].
- **BD status: NOT PRESENT for DGHS essential drugs.** DGFP has UIMS/WIMS/eLMIS for family-planning commodities only. — [USAID](https://usaidlearninglab.org/node/15323). The BSS launch cited "QR codes and digital tracking in medicine supply chains" as a minister focus. — [BSS](https://www.bssnews.net/news/436268)

**5. India e-RaktKosh (blood bank inventory)**
- C-DAC built it under NHM and it was inaugurated on 7 Apr 2016. It shows real-time stock by state, district and blood bank. The DCGI required all licensed blood centres to register. The Rare Donor Registry is being integrated (2025). — [Vikaspedia](https://en.vikaspedia.in/health/health-directory/e-blood-banks); [Shankar IAS](https://www.shankariasparliament.com/current-affairs/integration-of-rare-blood-donor-registry-with-e-rakt-kosh)
- **BD status: NOT PRESENT** as a national government stock portal. Only donor-matching exists (Bloodman/Facebook) plus DMCH's BIMA (2015).

**6. India Mera Aspataal (patient feedback)**
- Launched 29 Aug 2016, using SMS, outbound dialling, app and web. From Sep 2016 to Jan 2019, 24% of patients were dissatisfied, mainly over staff behaviour, cost and cleanliness. — [Lok Sabha reply PDF](https://cms.neva.gov.in/NeVA/LS/FileStructure/AssemblyFiles/16/17/20190208/Unstarred/966.pdf); [NHSRC](https://qps.nhsrcindia.org/sites/default/files/2022-04/Mera_Asptaal.pdf)
- The AIIMS survey drew 9,940 responses, with 23% dissatisfied. — [Medical Dialogues](https://medicaldialogues.in/one-third-patients-dissatisfied-with-services-at-aiims-mera-aspataal-survey)
- **BD status: NOT PRESENT (planned).** A digital grievance platform is on the Reform Commission short-term list. — [Daily Star](https://thedailystar.net/news/bangladesh/news/health-sector-reform-33-proposals-set-implementation-3964871)

**7. Thailand MOPH Refer (electronic inter-hospital referral)**
- All hospitals under the Office of the Permanent Secretary are integrated. Nearly 400,000 e-referral forms have been issued, and it extends to 806 sub-district health promoting hospitals. — [Pattaya Mail / NNT](https://www.pattayamail.com/thailandnews/thailands-moph-refer-system-revolutionizes-healthcare-by-enabling-secure-efficient-electronic-referrals-between-hospitals-499028) (date [uncertain], ~2025)
- HIS.SANSAI (Chiang Mai) increased appropriate referrals and cut registration and investigation waits. — [Healthc Inform Res v31(3), 2025](https://synapse.koreamed.org/articles/1516092140)
- **BD status: NOT PRESENT (announced).** The "Electronic Referral System" is part of the e-Health Card plan. 59% of tertiary patients self-refer. — [Bonik Barta](https://en.bonikbarta.com/bangladesh/SyidD595PYwTVnF0); [BMC 2024](https://link.springer.com/10.1186/s12913-024-11115-8)

**8. Brazil SISREG / Central de Leitos (bed and referral regulation)**
- National system since about 2001. — [DOL](https://dol.com.br/noticias/para/noticia-161745-filas-a-espera-de-leitos-perto-do-fim.html)
- Santa Catarina audit court (Nov 2025): 33% of ICU admission authorisations exceeded the 6-hour limit, and 54% of admissions happened without prior authorisation. — [TCE-SC](https://www.tcesc.tc.br/relatorio-do-tcesc-sobre-utis-no-estado-aponta-para-necessidade-de-melhorias-no-sistema-de)
- In Rio Grande do Norte, internet outages pushed hospitals back to phone calls. — [Tribuna do Norte](https://tribunadonorte.com.br/?p=429619)
- **The evidence shows operational weaknesses, not proven impact.**
- **BD status: NOT PRESENT.** COVID-era DGHS bed bulletins were self-reported and 24 hours stale. — [Prothom Alo](https://en.prothomalo.com/amp/story/bangladesh/patients-rush-from-one-hospital-to-another-for-treatment)

**9. UK NHS OPEL (operational pressure escalation)**
- Introduced 2016; the integrated framework now covers 2024–2026. Levels run from 1 (normal) to 4 (cannot deliver safe care). It covers acute, community, mental health and 111 providers, rolling up to ICS, regional and national level. — [NHS England](https://www.england.nhs.uk/long-read/integrated-opel-framework-2024-to-2026/)
- **BD status: NOT PRESENT.** No standardised hospital pressure or escalation reporting was found.

**10. Rwanda MEMMS (medical equipment management and maintenance)**
- Introduced 2012 with CHAI. It covers inventory, spare parts and maintenance at provincial and district hospitals, health centres and some referral hospitals, and the RBC MTI division upgraded it with Enabel. — [RBC](https://rbc.gov.rw/wp/?p=8070); [MoH eLearning](https://elearning.moh.gov.rw/course/info.php?id=191)
- A 2018 review found registration more than 80% complete. — [Enabel/VUB PDF](https://www.be-causehealth.be/wp-content/uploads/2019/04/E-Health-academy-2019-04-30-VUB-Enabel-M-Nyssen.pdf)
- "OpenBME": not found [uncertain whether it exists].
- **BD status: NOT PRESENT.** NEMEMW&TC handles repairs by request and tender. I found no public digital equipment registry, while 52% of diagnostic equipment sits unused. — [Prothom Alo 2026](https://en.prothomalo.com/bangladesh/904ggpi81h)

**11. Rwanda Zipline (drone blood/medical logistics)**
- An independent Lancet Global Health study (Nisingizwe et al.) of about 13,000 orders (2017–2019) found a median drone delivery time of 41 minutes, against at least 2 hours by road, and less blood wastage. — [UDel summary](https://www.psych.udel.edu/news/Pages/Measuring-the-Impact-of-Drone-Deliveries.aspx)
- Maternal-mortality effect: estimates conflict (51% in the 2022 SSRN preprint per Zipline; 46% per a 2026 peer-reviewed study per secondary coverage) [uncertain]. — [Zipline blog](https://www.zipline.com/blog/journal-article-last-mile-delivery-reduces-maternal-mortality-by-51); [HospiMedica, 2026](https://mobile.hospimedica.com/critical-care/articles/294811654/medical-drone-program-improves-blood-access-and-patient-survival.amp.html)
- **BD status: NOT PRESENT** as government logistics; no source found.

**12. Singapore NEHR (mandatory contribution)**
- The Health Information Bill was passed on 12 Jan 2026 [single secondary source]. Contribution becomes mandatory for all licensed providers from early 2027. About 30% of private providers contributed voluntarily (late 2024). Using NEHR data for employment or insurance decisions is banned. — [Captain Compliance](https://captaincompliance.com/education/singapore-mandates-universal-health-data-sharing/); [MOH consultation paper](https://www.reach.gov.sg/docs/default-source/participate/public-consultation/ministry-of-health/paper-for-hib-public-consultation.pdf); [Baker McKenzie](https://insightplus.bakermckenzie.com/bm/healthcare-life-sciences/singapore-ministry-of-health-to-table-health-information-bill-to-support-healthcare-transformations)
- **BD relevance:** private-sector participation in the SHR is the same problem; Bangladesh has no mandate yet.

**13. Indonesia SATUSEHAT (FHIR national platform)**
- DG circular HK.02.02/D/7093/2023 required all facilities (puskesmas, clinics, hospitals, pharmacies) to be FHIR-interoperable by 31 Dec 2023. Server, mapping and profile issues are the commonest problems. — [Hukumonline](https://pro.hukumonline.com/a/lt6459f80a008c3/mandatory-organization-of-mandatory-electronic-medical-records-by-healthcare-facilities-through-satusehat-platform-regulated/); [JMIR Formative 2025](https://formative.jmir.org/2025/1/e51270)
- **BD status: EARLY-STAGE.** BD Core FHIR IG v0.4.6 is "informative", with a sandbox; I found no mandate. — [fhir.dghs.gov.bd](https://fhir.dghs.gov.bd/)

**14. Estonia (X-Road health exchange)**
- e-prescription went live in Jan 2010 and reached 80% of prescriptions within 9 months. — [Helmes PDF, 2019](https://investinestonia.com/wp-content/uploads/helmes-healthcare-nov-2019.pdf)
- 97% of users are satisfied. — [ERR](https://news.err.ee/1608578791/alexander-welscher-diagnosis-e-healthy)
- Dec 2025–May 2026: healthcare is about half of all X-Road calls, and TEHIK alone accounts for about 37%. — [Nortal X-Road insights](https://xroad25.nortal.com/x-road-konsum-gesundheit-en)
- The "99% e-prescriptions" figure was NOT verified [uncertain].

**15. OT scheduling optimisation**
- KCMC Tanzania: an optimisation model for theatre allocation. — [arXiv 1205.2108](https://arxiv.org/pdf/1205.2108)
- Vendor claims: Baptist Health +37% prime-time minutes ([Fujitsu, 2024](https://global.fujitsu/en-us/customer-stories/cs-baptist-health-south-florida-20240617)); Oslo targeting +14% utilisation ([KPMG](https://kpmg.com/xx/en/client-stories/enhancing-patient-care-oslo-university-hospital.html)) [vendor, unverified].
- An academic review notes that few models are ever operationally implemented. — [MODSIM 2023](https://www.mssanz.org.au/modsim2023/files/humphreys.pdf)
- **BD status: NOT PRESENT.** No source found.

**Not verified / not found:** India e-Sushrut (no results sought or found); Kenya or Rwanda national bed/ICU dashboards; Kenya "MedTrack"; Nigeria VaxTrac; Philippines; WHO hospital readiness tool. All are [uncertain] and absent from these notes.

**Bangladesh status summary**

| Innovation | BD status | Evidence |
|---|---|---|
| QR/ID instant OPD registration (ABDM S&S) | EARLY-STAGE (booking exists at BMU and DGHS e-Appointment pilot; no QR counter registration found) | [Prothom Alo](https://en.prothomalo.com/bangladesh/ixcez1o38q) |
| Online OPD booking (ORS) | approaching SATURATED / generic (BMU, DGHS, private apps; minister cited it) | [BSS](https://www.bssnews.net/news/436268) |
| Hospital EMR (eHospital) | EARLY-STAGE (OpenMRS+ in ~100 hospitals) | [DGHS git](https://git.dghs.gov.bd/mahfuj/chatbot-knowledge/src/commit/b25b6fd7d637782fdfa7f503c6d031baf6dd734f/openmrs.md) |
| Essential-drug eLMIS (e-Aushadhi) | NOT PRESENT for DGHS (DGFP FP-only eLMIS exists) | [USAID](https://usaidlearninglab.org/node/15323) |
| Blood stock portal (e-RaktKosh) | NOT PRESENT | [PMC5135104](https://pmc.ncbi.nlm.nih.gov/articles/PMC5135104) |
| Patient feedback (Mera Aspataal) | NOT PRESENT (planned grievance platform) | [Daily Star](https://thedailystar.net/news/bangladesh/news/health-sector-reform-33-proposals-set-implementation-3964871) |
| e-Referral (MOPH Refer) | NOT PRESENT (announced with card) | [Bonik Barta](https://en.bonikbarta.com/bangladesh/SyidD595PYwTVnF0) |
| Bed/ICU regulation (SISREG/OPEL) | NOT PRESENT (COVID bulletin only) | [Prothom Alo](https://en.prothomalo.com/amp/story/bangladesh/patients-rush-from-one-hospital-to-another-for-treatment) |
| Equipment registry (MEMMS) | NOT PRESENT | [Prothom Alo 2026](https://en.prothomalo.com/bangladesh/904ggpi81h) |
| FHIR national exchange (SATUSEHAT) | EARLY-STAGE (IG + sandbox, no mandate) | [fhir.dghs.gov.bd](https://fhir.dghs.gov.bd/) |
| Hospital accreditation | NOT PRESENT | [Daily Star](https://www.thedailystar.net/news/step-towards-improving-medical-education-quality-4082026) |

### Inferences
- The strongest "proven abroad + absent in BD + matches hackathon examples" combinations:
  1. e-referral with closed-loop feedback keyed on the Health ID (Thailand model; "lost referrals")
  2. QR Health-ID counter registration (ABDM model; 30–40 to 5–10 minutes)
  3. an equipment uptime registry with NEMEMW routing (MEMMS model)
  4. a DGHS essential-drug stock visibility layer at UHC and community clinics (e-Aushadhi model, built off the DGFP UIMS precedent)
  5. a national blood stock view (e-RaktKosh)
  6. cross-institution radiotherapy / diagnostic queues ("diagnosis backlogs")
- SISREG shows that bed regulation fails without connectivity and timely data entry. Bangladesh has the same constraints (Bonik Barta), so any bed-status idea needs automatic capture (e.g., derived from admission and discharge events in OpenMRS+) rather than manual updates.

### Gaps
- No independent quantified impact found for e-Aushadhi/DVDMS stock-outs, e-RaktKosh, ORS volumes, or SISREG outcomes.
- The Zipline maternal-mortality effect size conflicts across sources.
- The current SATUSEHAT facility count was not found.
- The Thailand MOPH Refer article date was not confirmed.
