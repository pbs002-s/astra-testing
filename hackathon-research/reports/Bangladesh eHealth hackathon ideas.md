# Build the loop the e-Health Card lacks

**Bottom line.** Bangladesh's first government-run E-Health Hackathon (Ministry of Health and Family Welfare with WHO, 3–5 December 2026, Dhaka) has one stated goal: to find "**solutions that power the national e-Health Card**". The research says the winning move is to make that card *do something useful at a real service point*. Three ideas stand out:

- a **closed-loop e-referral** service, where the specialist replies and the patient is sent back with a note;
- **QR scan-and-share registration** at the outpatient (OPD) counter;
- a **shared national radiotherapy waiting list**.

Each one targets a measured Bangladeshi failure:

- **59% of tertiary-hospital patients self-refer**, and wards run at up to 148% occupancy.
- Paper records get lost, so patients repeat tests.
- **About 7,500 cancer patients are waiting** while 4 of NICRH's 6 radiotherapy machines are down.

Each also copies a model that works elsewhere: South Africa's Vula, India's ABDM Scan & Share, and Brazil's central-regulation lessons.

Two warnings before you start. First, the official site was blocked by Cloudflare. Only **6 of its 15 "priority areas"** could be read (primary care, electronic records, referrals, pharmacy, labs and ambulance services), and **no judging criteria or deliverables** were published on the pages we could open. Second, the site allows teams of **at most 3 people**, not the 3–5 your brief assumed. The ten ideas below are sized for that, ranked, and bundled into one portal concept, "CareLoop".

The detailed companion files are in the parent folder: [01 hackathon intel](../01_hackathon_intel.md), [02 problems by stakeholder](../02_bangladesh_problems.md), [03 global gap table](../03_global_gap_analysis.md), [04 education and institutions](../04_medical_education_and_institutions.md), and [05 final ideas](../05_final_ideas.md).

## The hackathon rewards MVPs that make the e-Health Card useful

The event is "Bangladesh's government-led national stage for digital health and AI innovation." It is organised by MoHFW with WHO as strategic partner, and it promises that "standout **MVPs may become the foundation of official national e-health solutions**." An MVP (minimum viable product) here means a simple working prototype. Its 15 priority areas run "from **primary care and electronic records to referrals, pharmacy, labs and ambulance services**" ([About](https://ehealthhackathonbd.org/about)). That sentence is the only one that names any areas. The other nine were not obtained and must be copied from the site in a normal browser.

Press coverage of the 18 October launch adds three example problems: "**diagnosis backlogs, unverifiable prescriptions and lost referrals between facilities**." It also describes how teams will be selected. A **10-member screening committee** narrows the field "from **50 teams to 25 and then to the top 5** across the three days." Winners may receive recognition from the Prime Minister, and the ministry may adopt their work. No cash prize is mentioned ([Lanka Business News](https://www.lankabusinessnews.com/e-health-hackathon-2026-launches-to-build-ai-and-digital-solutions-for-bangladeshs-health-system/)).

Registration stays open "for one month" from 18 October, so plan for a deadline around **mid-November 2026**. The State Minister's own priorities included QR tracking of medicines and app-based appointments ([BSS](https://www.bssnews.net/news/436268)).

The only deliverable stated anywhere is to "submit your healthcare innovation idea." The venue is also described inconsistently: one page says BICC, another says "to be announced" ([Home](https://ehealthhackathonbd.org/)).

### What judges are likely to look for

The political setting tells you what will impress. The e-Health Card is a flagship of the new government. It is linked to a planned "Electronic Referral System" and "Electronic Patient Management System", starting in five districts (Khulna, Noakhali, Bogura, Sirajganj and Narsingdi) ([Bonik Barta](https://en.bonikbarta.com/bangladesh/SyidD595PYwTVnF0)). The goal is to cover every citizen by 2028 ([The Report](https://thereport.live/bangladesh/govt-aims-to-provide-e-health-cards-to-all-citizens-by-2028-health-minister/40417)).

The same April 2026 reporting found that district civil surgeons had **no instructions**. Their facilities also lacked computers, internet and trained staff. A tool that works offline, needs little staff time and plugs into the card answers the ministry's real problem, not an imagined one.

Every team can also reach real infrastructure:

- a **public Bangladesh Core FHIR R4 sandbox** at `sandbox.fhir.dghs.gov.bd/fhir` ([fhir.dghs.gov.bd](https://fhir.dghs.gov.bd/)). FHIR is the international standard for exchanging health records, and a sandbox is a free test server you can send data to.
- a Health ID format: one ID per person, verified against the national ID or birth registration, starting with "9" ([SHR](https://en.info.shr.dghs.gov.bd/uhidmci/)).
- one of the world's largest DHIS2 deployments, the system that collects health statistics from facilities ([UNICEF](https://www.unicef.org/rosa/media/3416/file/A%20Case%20Study%20Bangladesh%20Online.pdf)).

A live call to that sandbox during the demo is the most credible way to show you "power the card."

## Patients pay 79% out of pocket and carry their records on paper

For citizens, the system fails at the moments the hackathon's six known areas describe.

**Cost and consultation time.** Patients pay **79.31% of current health spending out of pocket** (World Bank/WHO, 2023) ([World Bank](https://api.worldbank.org/v2/country/BGD/indicator/SH.XPD.OOPC.CH.ZS?format=json&per_page=10)). The common "69%" figure comes from a different series, the 2020 National Health Accounts ([TBS](https://www.tbsnews.net/node/564010)). Primary-care consultations last **48 seconds**, the shortest of 67 countries ([BMJ Open](https://blogs.bmj.com/bmjopen/2017/11/08/primary-care-consultations-last-less-than-5-minutes-for-half-the-worlds-population/)).

**Records and referrals.** Paper records are lost in crowded or flooded homes, so patients repeat tests ([icddr,b 2016](https://programme.exordo.com/icuh2016/delegates/presentation/88/)). Most patients skip the referral ladder: **59% of tertiary patients self-refer** and 58% do not know a referral system exists ([BMC HSR 2024](https://link.springer.com/10.1186/s12913-024-11115-8)).

**Pharmacies.** The pharmacy acts as the de facto first doctor. About **45% of antibiotics are sold without a prescription**, and only **7.56% of Dhaka pharmacies had a registered pharmacist** ([PMC 2025](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12744235/)).

**Emergencies.** Dhaka has no centralised emergency medical service. Ambulances hired through the 999 hotline are paid, and a syndicate at one hospital charged **Tk 6,000 against Tk 3,000** outside ([Daily Star](https://tds-images.thedailystar.net/ds/unheard-voices/news/how-rescue-bangladesh-ambulance-mafia-3973986)).

**Undiagnosed illness.** Large burdens go unseen. More adults have *undiagnosed* hypertension (15.8%) than diagnosed (12.2%) ([BMC/DOAJ](https://doaj.org/article/8e696c7abbe4486187d630b469aa8f43)). **92.3% of adults with mental illness get no treatment** ([WHO](https://www.who.int/bangladesh/news/detail/27-11-2019-minister-of-health-releases-first-findings-of-national-mental-health-survey)).

**Design limits.** Only **26% of rural people use a smartphone** ([GSMA via TBS](https://www.tbsnews.net/node/1013061)), although 73.4% of households own one ([BBS via Dhaka Tribune](https://www.dhakatribune.com/bangladesh/415972/bbs-survey-over-57%25-of-bangladeshi-households-now)). Phones are therefore shared. Designs need SMS, Bangla and a caregiver or proxy mode.

### Health workers: overloaded, under threat and unsupported

**Workload.** Health workers are the second stakeholder, and their binding constraint is time. One upazila health complex reported **450–500 OPD patients a day**, and 55.2% of upazila medical-officer posts were vacant in 2018 ([Prothom Alo](https://en.prothomalo.com/bangladesh/Unhealthy-state-of-health-services-for-rural)). Doctors, nurses and midwives together number **12.78 per 10,000**, against WHO's 44.5 ([Daily Star 2026](https://www.thedailystar.net/opinion/editorial/news/shortage-nurses-urgent-crisis-4203666)).

**Violence.** **Over 80%** of 1,703 surveyed staff had experienced or witnessed violence, yet only about 25% reported it ([TBS](https://www.tbsnews.net/node/1465051)).

**No learning requirement or decision support.** BMDC licence renewal requires **no continuing medical education** ([BMDC](https://www.bmdc.org.bd/reg-renewal)). Clinical guidelines exist only as PDFs. Running paper and electronic DHIS2 reporting side by side "increases the reporting workload" ([PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7249629/)).

**Who actually delivers first-contact care.** Most of it comes from people with little formal training. More than 65% of rural care starts with village doctors ([JOGH](https://jogha.org/documents/issue201802/jogh-08-020413.htm)), and community clinics are run by community health care providers (CHCPs) seeing about 70 patients a day ([DOAJ](https://doaj.org/article/ecd5cdd2b63a49848b10cfe31a41f8ee)).

**What this means for design.** Any tool that adds typing will fail. Tools that remove a step can succeed: for example, entering data once and having the DHIS2 report filled in automatically.

### Corrections to the brief

The researchers corrected three numbers from the original brief:

- **Absenteeism** is **35% overall**. The "40%" figure applies only to physicians at larger clinics, and the data are from 2003 ([World Bank](https://openknowledge.worldbank.org/entities/publication/bb381354-fd28-5ee4-940f-6171ac390013/full)).
- **A private MBBS** costs about **BDT 30–45 lakh in total**. Of that, 20–24 lakh is paid upfront ([Daily Star](https://www.thedailystar.net/campus/news/do-we-have-too-many-medical-colleges-3724766)).
- **Out-of-pocket spending** is 79.31% (World Bank/WHO, 2023), not 69%; see above.

## Medical schools and hospitals lack workflow, not hardware

**Teaching staff.** Bangladesh trains doctors at about 103 colleges with **11,101 MBBS seats**. 572 seats were cut for 2025–26 because of infrastructure and staff shortages ([Daily Star](https://www.thedailystar.net/news/step-towards-improving-medical-education-quality-4082026)). About **43% of government teaching posts are vacant** ([Daily Star](https://www.thedailystar.net/opinion/news/ensure-quality-medical-education-4034436)).

**Assessment.** Interns are assessed mostly by signature. A **logbook signature is the main assessment for over 66% of interns**, and about 54% get no assessment after major rotations ([BJME](https://banglajol.info/index.php/BJME/article/view/32243)). Practical-exam scores differ significantly between colleges ([IMSEAR](https://imsear.searo.who.int/handle/123456789/217448)). A BCPS evaluation calls traditional assessment "largely subjective" ([BJME](https://banglajol.info/index.php/BJME/article/view/32190)).

**Postgraduate bottleneck.** About 3,500 postgraduate seats compete for more than 11,000 graduates a year.

**Accreditation.** The new accreditor, BMEAC, has accredited **just 2 colleges**. Its own recognition by WFME (the World Federation for Medical Education) is still pending, which puts foreign recognition of Bangladeshi degrees at risk ([Daily Star](https://www.thedailystar.net/news/step-towards-improving-medical-education-quality-4082026)).

**What is already in place.** Hardware is less of a problem than it looks. Eight public colleges received simulation labs with digital dissection tables in 2023 ([Dhaka Tribune](https://www.dhakatribune.com/bangladesh/309069/simulation-labs-e-libraries-at-8-medical-colleges)). One digital logbook is under way: BCPS is piloting a postgraduate e-logbook ([BCPS](https://bcps.edu.bd/it_inhouse/newsletter)). So an MBBS *internship* logbook is the open slot, not a postgraduate one.

### Hospitals have budgets and machines that sit idle

The institutional data are the most recent and the most damning, mostly from a PPRC study presented on 29 July 2026:

- **52% of diagnostic equipment went unused for a year.**
- **Malfunctions caused 79% of service gaps.**
- Essential-medicine availability averaged **22%**.
- **94% of institutions ended the year with unspent budget** ([Prothom Alo](https://en.prothomalo.com/bangladesh/904ggpi81h); [TBS](https://www.tbsnews.net/bangladesh/health/health-budgets-not-translating-services-due-governance-gaps-pprc-study-1501371)).

Money is not the bottleneck; information is. That makes visibility tools, which show where things are broken or stuck, unusually strong pitches.

Cancer care is the sharpest case. On 20 October 2026, NICRH (the national cancer institute) reported:

- 4 of its 6 radiotherapy machines had been down for more than two years;
- about **7,500 patients were waiting**, with some appointments set for end-2028;
- new registrations had been suspended for about six weeks;
- 17 new linear accelerators (LINACs) are due by June 2027 ([Dhaka Tribune](https://www.dhakatribune.com/bangladesh/health/422565/7-500-cancer-patients-await-radiotherapy-as)).

Bangladesh also has **no national hospital accreditation body** and no real-time bed dashboard. COVID-era bed bulletins were self-reported and 24 hours stale ([Prothom Alo](https://en.prothomalo.com/amp/story/bangladesh/patients-rush-from-one-hospital-to-another-for-treatment)).

## Proven abroad, missing at home: where the white space is

Across the notes, **50 foreign innovations** were checked against Bangladesh ([03 gap table](../03_global_gap_analysis.md)). The pattern is clear. Bangladesh is already crowded in:

- teleconsultation (the 16263 hotline, DocTime and others);
- blood-donor matching (Bloodman and Facebook);
- tools for community health workers to collect data (BRAC OpenSRP);
- essential-drug logistics (the live DGHS eLMIS).

A competitor check found that **DGHS eLMIS is already live**, overturning an earlier "not present" verdict ([eLMIS](https://elmis.dghs.gov.bd/)). It also found that **child IMCI decision support is already used at all 319 Barishal facilities**. (IMCI is WHO's protocol for managing childhood illness.) The source is [Save the Children](https://www.savethechildren.net/bangladesh/stories/over-300-govt-healthcare-facilities-barishal-will-digitize-treatment-plans). Two obvious pitches are therefore off the table.

### Models that work elsewhere and are missing here

**Referral.** South Africa's **Vula** got specialist replies in a median **16 minutes** and accepted 85.5% of referrals ([PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8517757/)). Brazil's **Telessaúde** avoided **56–77% of referrals** ([RBMFC](https://rbmfc.org.br/rbmfc/article/download/3364/1815)). No Bangladesh equivalent closes the loop with an advice reply and a back-referral.

**Registration.** India's **Scan & Share** QR registration cut waits from **30–40 to 5–10 minutes** across 17,481 facilities. This is a ministry figure, not an independent study ([MoHFW India](https://mohfw.gov.in/press-info/7908)).

**Equipment.** Rwanda's **MEMMS** has run a national equipment-maintenance registry since 2012 ([Enabel/VUB](https://www.be-causehealth.be/wp-content/uploads/2019/04/E-Health-academy-2019-04-30-VUB-Enabel-M-Nyssen.pdf)).

**Clinical decision support.** Tanzania's **ePOCT+** cut antibiotic prescribing from 70.1% to 23.2% with no loss of safety ([PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10803249)). That precedent supports an *adult* chronic-disease (hypertension and diabetes) protocol tool for community clinics, the space Barishal's child-focused app leaves open.

**Lab results.** Zambia's SMS lab results replaced postal delivery that took 44.2 days on average ([Bull WHO](https://scielosp.org/article/bwho/2012.v90n5/348-356)). Bangladesh's OpenELIS lab system runs in 100 public hospitals with no patient push ([SHR DGHS](https://en.info.shr.dghs.gov.bd/hms/)).

### Failures to learn from

The failures matter as much as the successes:

- India's **Kilkari** reached 16 million women, but its randomised trial found **no effect on exclusive breastfeeding** ([PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9288869/)).
- Kenya's **M-TIBA** shut its health-savings wallet in 2026 ([TechCabal](https://techcabal.com/2026/04/22/kenyas-m-tiba-refunds-users-after-shutting-health-savings-wallet/)).
- **Babyl Rwanda** collapsed with its vendor in 2023 ([New Times](https://www.newtimes.co.rw/article/11008/news/rwanda/babyl-rwanda-reportedly-ceases-operations/amp)).
- A Brazilian state audit of **SISREG**, Brazil's central bed and referral regulation system, found **33% of ICU authorisations late and 54% of admissions bypassing the system** ([TCE-SC](https://www.tcesc.tc.br/relatorio-do-tcesc-sobre-utis-no-estado-aponta-para-necessidade-de-melhorias-no-sistema-de)).

The lesson for the pitch: reach, a wallet or a central register is not enough. Judges should see an outcome measure, a fallback for when the internet drops, and a plan for the government to own the system.

## Ten ideas, ranked: registration, referral and radiotherapy lead

Ten ideas survived the filters. Each one:

- avoids any core the competitor check rated SATURATED;
- rejects generic telemedicine, booking, symptom checkers, e-prescription and hospital management systems;
- covers every one of the six known areas;
- serves every stakeholder group.

Full MVP plans, demo scripts and risk analyses are in [05 final ideas](../05_final_ideas.md). Scores are out of 5 on Uniqueness, Feasibility in 48 hours, Impact, Judge-appeal and Data availability.

| Rank | Idea (one line) | Area | Primary user | Score /25 |
|---|---|---|---|---|
| 1 | **ScanShare OPD** — show your Health-ID QR at the counter, get a token in seconds, record opens | e-Health Card / records, primary care | Patients | 23 |
| 2 | **ReferLoop** — structured referral; specialist advises or accepts; back-referral closes the loop | Referrals | Doctors, CHCPs | 22 |
| 3 | **RadioQ** — one national radiotherapy waiting list with live machine capacity | Labs/diagnostics, referrals | Hospitals | 22 |
| 4 | **ReportReady** — OpenELIS lab results filed to the Health ID, Bangla SMS, critical-value alert | Labs, records | Patients | 21 |
| 5 | **YantraTrack** — QR equipment register, breakdown tickets, uptime dashboard | Labs / operations | Hospitals | 21 |
| 6 | **AMR Lens** — antibiotic-sale data layer on existing pharmacy POS, feeding DHIS2 for DGDA | Pharmacy | Pharmacists | 19 |
| 7 | **NCD Sathi** — adult hypertension/diabetes protocol for community clinics, auto-fills DHIS2 | Primary care | CHCPs | 19 |
| 8 | **InternLog** — MBBS internship e-logbook with OTP supervisor sign-off | Records (weak fit) | Interns | 18 |
| 9 | **AmbuSathi** — ambulance QR registry/fare check plus ER pre-alert with Health-ID summary | Ambulance services | Patients | 17 |
| 10 | **FairOSCE** — tablet OSCE scoring with examiner-variance analytics | Records (weak fit) | Faculty | 17 |

### The recommended top three

**ReferLoop is the best single pitch.** It answers the hackathon's own "lost referrals" example and plugs into the Electronic Referral System the government has already named. It also has the strongest foreign evidence (Vula, Telessaúde, Thailand's MOPH Refer).

**ScanShare scores highest** because it is the most literal way to "power the card" and the easiest to demo against the live FHIR sandbox. Its weakness is that DGHS may simply build it, which makes it a better front door to a bigger product than a stand-alone entry.

**RadioQ is the most original.** No equivalent was found in Bangladesh, the NICRH story is days old, and it has a concrete policy use: deciding where the 17 new LINACs should go.

### Weak spots and how to handle them

Two ideas carry flagged weaknesses that should be stated openly in any pitch. AmbuSathi sits next to a crowded concept: CriticaLink, TraumaLink and URAL EMS already handle dispatch. It survives only by targeting the gap the check identified, a hospital pre-alert linked to the Health ID plus a fare registry. NCD Sathi carries the most clinical-safety risk; a physician must sign off its protocol logic.

### The combined portal: CareLoop

The combined concept, **CareLoop**, bundles ScanShare, ReferLoop and ReportReady on one Health-ID and FHIR backbone as one patient journey with three steps:

- **arrive** by QR at the upazila health complex (UHC);
- **move** by closed-loop referral to the district hospital;
- **know** your result by Bangla SMS, filed to the Health ID.

The three parts share the same records and consent screen, so three people can build them in 48 hours, one module each. Together they cover four of the six known areas (primary care, electronic records, referrals and labs) and two of the three example problems in the press. The pitch fits in one sentence: *CareLoop makes the e-Health Card register you, refer you and return your results on day one.* RadioQ, YantraTrack and AMR Lens appear only as "next modules on the same spine."

Privacy and connectivity apply to every idea:

- **Privacy.** The Personal Data Protection Ordinance 2025, gazetted on 6 November 2025, treats health data as sensitive and requires explicit consent ([TBS](https://www.tbsnews.net/node/1281356)). How it will be enforced under the 2026 government is uncertain.
- **Connectivity.** Sites in the five pilot districts lack internet.

So every MVP needs a consent screen, an access log and an offline queue.

## Conclusion

The research changes the question from "what app can we build?" to "**which service point does the e-Health Card fail at first?**" The government has already funded the plumbing: Health ID, the Shared Health Record, the FHIR guide, DHIS2 and OpenMRS+. What it has not built are the loops through which patients, records and equipment actually move. Bangladesh's health data also show waste more than scarcity: unspent budgets alongside idle machines, and referral systems that fade after every pilot. That makes **visibility and closed feedback loops** a more convincing pitch than another channel for consultations.

Three unknowns could still change the ranking: the nine unread priority areas, the judging criteria, and whether the five-district card pilot has actually started. The first tasks are therefore practical. Copy the 15 areas from the site, confirm the 3-person team limit, register before about **17 November 2026**, and get one FHIR `Patient` written to `sandbox.fhir.dghs.gov.bd/fhir` this week. A team that can show a real Health-ID record moving between facilities on 3 December will be demonstrating the thing the ministry has promised but not yet delivered.
