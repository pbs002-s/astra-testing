# Bangladesh Citizen/Patient Health Pain Points and Proven Patient-Facing Global Digital-Health Innovations (with Bangladesh-presence check)

Scope note: research done 2026-10-26 via web search plus targeted fetches. Many findings come from search-result summaries of the named pages. Treat numbers marked [uncertain] or "company-reported" with care. Event context: MoHFW + WHO E-Health Hackathon & Symposium, 3–5 Dec 2026, Dhaka. It is built around the national e-Health Card.

---

## Key Question A: What are the main health pain points for Bangladeshi citizens and patients (rural/urban, low-income, women, elderly, chronic-disease, disability)?

### Takeaway
Bangladeshi patients pay about 79% of health costs out of pocket (WB/WHO, 2023). They get very short consultations (48 seconds on average, the shortest of 67 countries; BMJ Open 2017). They face a thin, urban-concentrated doctor workforce, paper records that get lost, self-referral to overcrowded tertiary hospitals, unregulated antibiotic sales (about 45–51% sold without a prescription), counterfeit drugs, ambulance syndicates with no centralized EMS, and very large untreated burdens: about 92% of mental-health cases untreated, and large shares of hypertension and diabetes undiagnosed. Climate shocks add to this: the 2023 dengue outbreak was the worst on record (1,705 deaths) and the 2024 heatwave was severe. Digital reach is limited (about 26–41% smartphone use per GSMA 2024; 73% of households own a smartphone per BBS 2026), and literacy is uneven (77.7%), so Bangla voice, SMS and low-literacy design matter.

### Cited Findings

**Consultation time (the "48-second" figure is verified)**
- Average primary-care consultation length ranged from **48 seconds in Bangladesh** to 22.5 minutes in Sweden. The review (Irving et al., BMJ Open, Nov 2017) covered 178–179 studies, 67 countries and more than 28.5 million consultations. 18 countries, home to about 50% of the world's population, average 5 minutes or less (the press release says 15) — [BMJ Open blog 2017](https://blogs.bmj.com/bmjopen/2017/11/08/primary-care-consultations-last-less-than-5-minutes-for-half-the-worlds-population/); [BMJ news 2017](https://www.bmj.com/content/359/bmj.j5172.full); [Oxford PHC 2017](https://www.phc.ox.ac.uk/news/primary-care-consultations-last-less-than-5-minutes-for-half-the-worlds-population)
- Caveat: the Bangladesh figure is a pooled average from the included studies, not a national time-and-motion survey.

**Out-of-pocket (OOP) costs (the user's 69–74% range is outdated or from a different source)**
- World Bank WDI (indicator SH.XPD.OOPC.CH.ZS, source WHO GHED, updated Dec 2025), OOP as % of current health expenditure: **2023: 79.31%**, 2022: 78.25%, 2021: 76.15%, 2020: 76.99%, 2019: 76.47%, 2018: 70.68%, 2017: 70.09% — [World Bank API 2025](https://api.worldbank.org/v2/country/BGD/indicator/SH.XPD.OOPC.CH.ZS?format=json&per_page=10)
- Bangladesh National Health Accounts give a lower figure: **68.5–69% in 2020**. This is the source of the commonly cited "69%" — [TBS](https://www.tbsnews.net/node/564010); [Daily Star 2024 print](https://epfs.thedailystar.net/TDS/2024/08/12/Bangladesh/MAI/5_08/e00a226efa6c91f9_08.pdf). The two series conflict because of different methods and vintages. One paper cites the World Bank at 74% for 2020 — [Brunel repository](https://bura.brunel.ac.uk/bitstream/2438/30441/1/FullText.pdf)
- A DCCI keynote (Dec 2025) put OOP at about 73%. It estimated Bangladeshis spend about **US$5 bn/yr** on treatment abroad and that about 482,000 patients went to India in 2024 (an industry estimate from a United Hospital executive). Reasons given: lack of trust, doubts about diagnosis, sudden bill increases, hidden charges, and fear of counterfeit medicines — [UNB 2025](https://unb.com.bd/category/Bangladesh/usd-5-billion-spent-abroad-annually-due-to-healthcare-gaps-in-bangladesh-dcci/175121); [Jagonews24](https://www.jagonews24.com/en/biz-econ/news/87995)

**Misdiagnosis / delayed diagnosis / trust**
- Opinion and commentary cite wrong diagnosis, poor information-sharing with patients, and unnecessary tests and drugs as reasons for going abroad — [Financial Express op-ed](https://thefinancialexpress.com.bd/views/opinions/why-bangladeshi-patients-choose-india). No national misdiagnosis-rate study was found (see Gaps).

**Doctor shortage and rural access**
- WHO-attributed figure of about **5.26 doctors per 10,000** people (2019 reporting). WHO's benchmark is 10 — [Dhaka Tribune](https://www.dhakatribune.com/bangladesh/health/182728/patient-doctors-nurses-ratio-bangladesh-lags); [CPTU notice 2022](https://cptu.gov.bd/advertisement-services/details-7272.html)
- Rural vs urban: **1.1 doctors per 10,000 in rural areas vs 18.2 in urban areas** — [CPTU procurement notice 2022](https://cptu.gov.bd/advertisement-services/details-7272.html)
- A recent Prothom Alo estimate puts it at 7.2 physicians per 10,000. Only Afghanistan (3.2) and Bhutan (5.5) are lower in the region. This may be overstated because it uses a 180 million population base — [Prothom Alo](https://en.prothomalo.com/bangladesh/cqm7hcigxi)
- A MoHFW–WHO study (2019–20) found 49 providers per 10,000 people, of whom **16 were unqualified** — [WHO Bangladesh 2021](https://www.who.int/bangladesh/news/detail/06-04-2021-from-unqualified-to-professional-medicine-bangladesh-a-promising-journey)

**Fragmented medical records**
- icddr,b qualitative study (2016, n=25 urban-poor patients): medical documents are often damaged or lost (crowded housing, flooding), and paper records are hard to carry, so patients have to repeat diagnostic tests — [ICUH 2016 abstract](https://programme.exordo.com/icuh2016/delegates/presentation/88/)
- Survey of 105 doctors (2021): 51.4% use paper-based records, 20% use digital — [Banglajol](https://www.banglajol.info/index.php/CMOSHMCJ/article/view/87838/57377)
- National e-Health Card: the minister targeted a June 2026 launch. Parliament (10 Jun 2026) was told **every citizen will have a card by 2028**. Rollout starts in Khulna, Noakhali, Bogura, Sirajganj and Narsingdi. It is built on a "Health-Bridge" platform with an NID-linked health ID and Shareable Health Records, with a2i, HSD and ADB involved — [Dhaka Tribune 2026](https://www.dhakatribune.com/amp/bangladesh/parliament/412231/health-minister-every-citizen-to-get-e-health); [TBS tag page 2026](https://www.tbsnews.net/taxonomy/term/328771); [Asia News Network 2026](https://asianews.network/?p=262210); [TBS op-ed](https://www.tbsnews.net/thoughts/bangladeshs-e-health-card-needs-move-beyond-data-delivery-1408186)

**Prescription legibility and errors**
- A High Court order (Jan 2017) required capital letters or printed prescriptions and asked why generic names should not be mandatory. BMDC issued a circular in Feb 2017 — [HuffPost India 2017](https://www.huffingtonpost.in/2017/01/10/bangladesh-court-orders-doctors-to-either-write-legible-prescrip_a_21651643/); [Daily Star](https://www.thedailystar.net/node/1342969)
- In 2019 the practice persisted. A pharmacist estimated about 80% of prescriptions are sloppy and about 20% are rejected as unreadable. About 150 drug names look alike — [Dhaka Tribune 2019](https://www.dhakatribune.com/bangladesh/nation/179662/illegible-prescriptions-continue-despite-high) (anecdotal, not a study)

**Counterfeit / substandard medicines**
- Industry estimate: about **Tk 600 crore of counterfeit medicines** traded yearly in a Tk 18,000 crore market — [Daily Star "Know your medicine"](https://www.thedailystar.net/frontpage/know-your-medicine-1243567)
- Older testing: about 6% of 5,000 samples were counterfeit or substandard (2010), and the share later doubled. 47% of ciprofloxacin samples were under-strength. There may be up to 80,000 unlicensed pharmacies — [SecuringIndustry](https://www.securingindustry.com/pharmaceuticals/bangladesh-carrying-heavy-counterfeit-medicine-burden/s40/a588); [The New Humanitarian](https://www.thenewhumanitarian.org/node/254074) (dated, 2004–2013 data)
- DGDA runs mini-labs (with USP support) that test in about 3 hours vs weeks at NCL — [Daily Star](https://www.thedailystar.net/backpage/news/minilabs-six-districts-1683232)
- Government drives against fake medicines continue (parliamentary statement by the Health Minister; year not shown) — [TBS](https://www.tbsnews.net/node/1487306)
- Pharmacy prices rose 7–140% in a few months of 2024 while mill-gate prices stayed stable. DGDA fixes prices for only about 160 essential drugs. Selling above the fixed price is illegal under the Drugs & Cosmetics Act 2023 — [Financial Express](https://thefinancialexpress.com.bd/trade/yawning-gap-between-mill-gate-and-retail-medicine-prices); [FE editorial](https://today.thefinancialexpress.com.bd/print/where-price-control-is-not-unwanted); [TBS](https://www.tbsnews.net/node/849586)

**Antibiotic misuse / AMR**
- Dhaka observational study (246 pharmacies, published 2025): about **45% of antibiotics dispensed without a prescription**, 19.17% on the dispenser's informal advice, and only 36.24% with a registered physician's prescription. **Only 7.56% of pharmacies had a registered pharmacist** — [PMC 2025](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12744235/)
- icddr,b study (Antibiotics, 2022): **50.9% (327/642)** of antibiotics bought without a prescription — [DOAJ](https://doaj.org/article/b2563a5093494395a07298723c0c4801)

**Public-hospital queues / referral failures**
- BMC HSR 2024 (n=822 at two tertiary hospitals): **59% self-referred** and about 58% unaware of the referral system. Of formal referrals, about 25% came from UHCs and 42% from private clinics. **Bed occupancy is 148.2% (secondary) and 137% (tertiary)** — [BMC Health Serv Res 2024](https://link.springer.com/10.1186/s12913-024-11115-8)
- Referral pilots (Rangpur 2014, then 2016 and 2019) faded. A 2023 study estimated a working referral system could filter about 65% of patients at upazila and district level — [Daily Star 2024](https://www.thedailystar.net/opinion/readers-voice/news/we-need-referral-system-works-3554706)
- Savar UHC dengue referrals were held back by a shortage of ambulances, no feedback loop and staff shortages — [BRAC University](https://dspace.bracu.ac.bd/items/3cfefc17-e696-48d8-80c1-b06aa715a7c0)
- No queue or waiting-time statistic for public outpatient departments was found (see Gaps).

**Maternal and child health**
- MMR **136 per 100,000 live births (SVRS 2023)**. Bangladesh missed its 2020 target of 105 — [UNFPA fistula profile 2024](https://asiapacific.unfpa.org/sites/default/files/pub-pdf/unfpa_fistula_bangladesh_profile_2024.pdf)
- Facility deliveries **65% (BDHS 2022)** — [UNFPA 2024](https://asiapacific.unfpa.org/sites/default/files/pub-pdf/unfpa_fistula_bangladesh_profile_2024.pdf). Home deliveries fell from 68% (2012–13) to **35% (2022)** — [medRxiv 2025](https://www.medrxiv.org/content/10.1101/2025.07.05.25330941v2.full-text)
- **C-section 45% of births (BDHS 2022)**, up from 34% (2017) and 24% (2014). **84% of C-sections were in private hospitals**. About 1.6 million of 3.7 million births in 2022 were C-sections — [TBS](https://www.tbsnews.net/node/615022); [Dhaka Tribune](https://www.dhakatribune.com/others/308818/report-caesarean-delivery-increases-at-abnormal); [PLOS ONE analysis (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12364313/). Caveat: some press figures come from the preliminary BDHS report.

**NCDs**
- BDHS 2017–18 analysis: **undiagnosed diabetes is 6.0%** of adults (age-standardised) — [Frontiers in Public Health 2022](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2022.1066449/epub)
- Same survey: 12.2% diagnosed hypertension vs **15.8% undiagnosed hypertension** (n=11,981), meaning more than half of hypertension is undiagnosed — [DOAJ/BMC 2023](https://doaj.org/article/8e696c7abbe4486187d630b469aa8f43)
- Diabetes plus prediabetes affect more than a quarter of adults — [PLOS GPH 2022 via ACU](https://acuresearchbank.acu.edu.au/item/914v9/prevalence-of-and-risk-factors-for-diabetes-and-prediabetes-in-bangladesh-evidence-from-the-national-survey-using-a-multilevel-poisson-regression-model-with-a-robust-variance)
- Cervical screening (VIA) coverage was about **11.3%** in 2017–22 (about 240k women, 570 centres). Another estimate gives 18.26% of a 30 million target population. A Dhaka survey found only 26% of women aged 30+ had ever had VIA. Barriers: privacy, and the belief that the test must be paid for — [BMC Public Health 2023](https://link.springer.com/article/10.1186/s12889-023-17545-z); [APJCP 2021](https://journal.waocp.org/article_89820.html)
- The national VIA/CBE dashboard recorded **136,022 VIA screenings (3.7% positive) over Sep–Nov 2025** — [BSMMU NCCBCST dashboard](https://nccbcst.bsmmu.ac.bd/viacbesync/dashboard/months)

**Mental health stigma and treatment gap**
- National Mental Health Survey 2018–19: prevalence is **16.8% in adults** and 13.6% in children. **92.3% of adults and 94.5% of children receive no treatment** — [WHO Bangladesh 2019](https://www.who.int/bangladesh/news/detail/27-11-2019-minister-of-health-releases-first-findings-of-national-mental-health-survey); [NIMH report](https://nimh.gov.bd/english/wp-content/uploads/2021/11/Mental-Health-Survey-Report.pdf). Still cited in 2025 with no newer survey — [Dhaka Tribune 2025](https://www.dhakatribune.com/bangladesh/health/421730/world-mental-health-day)

**Emergency response and ambulances**
- The 999 hotline launched in Dec 2017. **The call is free but the ambulance is not**. Press 1 for ambulance — [Dhaka Tribune 2017](https://archive.dhakatribune.com/bangladesh/2017/12/07/999-emergency-hotline-launch); [Daily Star](https://online.thedailystar.net/node/1503907)
- Dhaka has **no centralized EMS** and relies on private ambulances — [University of Toronto study](https://che.utoronto.ca/?p=1102)
- An ambulance owners' syndicate operates at public hospitals and blocks outside vehicles. Example: Tk 6,000 from DMCH vs Tk 3,000 for an outside ambulance — [Daily Star](https://tds-images.thedailystar.net/ds/unheard-voices/news/how-rescue-bangladesh-ambulance-mafia-3973986); [Daily Star editorial](https://www.thedailystar.net/opinion/editorial/news/break-the-syndicate-ambulance-owners-3290056); [Prothom Alo](https://en.prothomalo.com/amp/story/bangladesh/4l3eiqusze)

**Blood donation shortages**
- Demand is about **0.8–1.1 million units/yr**. DGHS (c.2020) put it at 1.0–1.1 million bags, with only about 30% from voluntary donors. UNB (2020): about 25% voluntary, 20–25% paid, 50–55% replacement — [Daily Star](https://www.thedailystar.net/backpage/news/blood-banks-may-run-dry-1890727); [UNB 2020](https://unb.com.bd/category/Special/lockdown-triggers-blood-shortage-in-bangladesh/67968); [MIT Solve](https://solve.mit.edu/challenges/2024-global-health-challenge/solutions/90001)
- There is no single verified national donor platform, and the blood market is unregulated (TBS commentary, 2025) — [TBS](https://www.tbsnews.net/thoughts/blood-donation-goes-digital-lessons-global-best-practices-1164731)
- High prevalence of beta-thalassemia carriers drives transfusion demand — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC9529581)

**Diagnostic-lab quality**
- The 2024 DGHS drive closed **more than 880 unauthorised hospitals, clinics, diagnostic centres and blood banks** — [Daily Star editorial 2024](https://www.thedailystar.net/views/editorial/news/dghs-raids-illegal-clinics-expose-the-rot-health-sector-3035386)
- Older figures: more than 2,000 clinics and diagnostic centres in Dhaka, but only 898 licensed — [Financial Express](https://today.thefinancialexpress.com.bd/print/medical-centres-without-licenses)

**Health-data privacy law status**
- The **Personal Data Protection Ordinance 2025** (57 sections; explicit consent; rules on sensitive and cross-border data) and the National Data Governance Ordinance 2025 (creates a National Data Governance Authority) were approved by the Advisers Council on 9 Oct 2025. Some sections take effect 18 months after gazette notification — [Dhaka Tribune 2025](https://www.dhakatribune.com/bangladesh/393590/bangladesh-government-approves-personal-data); [Daily Star key takeaways](https://www.thedailystar.net/tech-startup/news/bangladeshs-personal-data-protection-ordinance-2025-key-takeaways-4015401). Gazette and enforcement status after the 2026 elected government took over is [uncertain].

**Literacy and digital access**
- BBS literacy is **77.7%** (urban 84.8%, rural 74.6%), per a Dec 2024 report — [Jagonews24](https://www.jagonews24.com/en/sci-tech/news/78924)
- GSMA State of Mobile Internet Connectivity 2024: smartphone use is **41% urban and 26% rural**, mobile internet use 43% and 27%. **28% of urban and 19% of rural non-users cite illiteracy** — [TBS](https://www.tbsnews.net/node/1013061); [Financial Express](https://thefinancialexpress.com.bd/national/bd-bottom-among-12-lmics-in-usage-of-phone-net)
- BBS ICT survey, Jan–Mar 2026: **57.4% of households have internet**, 58.6% of people aged 5+ use the internet, and **73.4% of households own a smartphone** — [Dhaka Tribune 2026](https://www.dhakatribune.com/bangladesh/415972/bbs-survey-over-57%25-of-bangladeshi-households-now)

**Climate health**
- Dengue 2023: **1,705 deaths and 321,179 cases**, the worst year on record (previous high was 281 deaths in 2022). Mainly DENV-2 — [Prothom Alo](https://en.prothomalo.com/amp/story/bangladesh/al1f09qaaf); [Financial Express](https://thefinancialexpress.com.bd/national/dengue-death-toll-rises-to-114-with-record-8-more-deaths-in-24-hours); [Acta Tropica 2024](https://umpir.ump.edu.my/id/eprint/41726/)
- Heatwave April–May 2024: DGHS confirmed 15 heatstroke deaths in 14 days (to 5 May). Recording only started on 22 April, so this is an undercount. IFRC estimated 33 million people affected — [UNB 2024](https://unb.com.bd/category/Bangladesh/heatstroke-claims-15-lives-in-14-days-dghs/135079); [IFRC](https://go-api.ifrc.org/api/downloadfile/87737/MDRBD034dfr.)

**People with disabilities**
- NSPD 2021 (BBS) is the first national disability survey — [Research Square](https://www.researchsquare.com/article/rs-10272671/latest). A study of 150 public facilities in 16 districts (2019) found accessibility measures inadequate — [PMC 2022](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9490997/). A BIDS study found most hospitals lack special arrangements — [Financial Express](https://old.thefinancialexpress.com.bd/national/most-hospitals-in-bangladesh-unable-to-provide-special-care-to-people-with-disabilities-bids-study-1635951919)

**Existing public telehealth line (relevant to the "no generic telemedicine" rule)**
- Shasthyo Batayon 16263 has handled **27.2 million calls** since 2015 (about 11 million during COVID) and 2,346,773 calls in 2025. The operator reports no payment for 22 months and capacity cut to about 3,000–3,500 calls a day (2026) — [Prothom Alo](https://en.prothomalo.com/bangladesh/gdmucoatn3); [Financial Express](https://thefinancialexpress.com.bd/health/natl-telehealth-helpline-16263-faces-shutdown-amid-funding-crisis); [Observer 2026](https://www.observerbd.com/news/565532)

### Inferences
- The strongest problem framing for the e-Health Card is "the record follows the patient". Patients lose paper, repeat tests, self-refer (59%), and pay about 79% out of pocket. A card that only holds data will not fix referral or OOP unless services (referral slots, price transparency, lab-result portability) are built on it (consistent with the TBS critique).
- Low-literacy and voice-first design is not optional. Even in 2024, GSMA shows only about a quarter of rural people use smartphones, and illiteracy is a cited barrier. Household smartphone ownership (73%) is higher than individual use, so shared-device and caregiver-proxy flows are important.
- Pharmacies are the de facto first point of care. With fewer than 8% having a pharmacist, about half of antibiotics sold without a prescription, counterfeits, and price-cap breaches, pharmacy-side and patient-side verification tools address several pain points at once.
- Emergency care is a gap. There is no centralized EMS, 999 ambulances are paid, syndicates operate at hospitals, and there is no first-responder layer.

### Gaps
- No national misdiagnosis or diagnostic-error rate study was found.
- No public-hospital OPD waiting-time or queue statistic was found.
- The latest WHO GHO physician density (2022–2024) was not retrieved directly. The cited figures are 5.26 (older WHO-attributed), 7.2 (Prothom Alo) and 10–15 (minister, 2022). These conflict.
- No STEPS 2022 NCD survey figures were retrieved. NCD numbers above are from BDHS 2017–18.
- Breast-cancer screening (CBE) coverage was not found.
- No recent (post-2015) national prevalence study of counterfeit or substandard medicines was found.
- No official 999 ambulance tariff was found.
- No Bangladesh-specific study of the 2017 prescription-legibility order's compliance was found (only press anecdotes).
- The PDPO 2025 gazette and enforcement status in late 2026 is unverified.

---

## Key Question B: Which proven patient/public-facing digital-health innovations from other countries have documented impact?

### Takeaway
About 20 innovations were verified. The strongest impact evidence comes from: Zipline drone blood delivery (51% fewer in-hospital PPH deaths, Rwanda); Peek school eye screening (follow-up attendance 54% vs 22%, Kenya RCT); Google ARDA diabetic-retinopathy AI (91.4% sensitivity in a prospective Thai national programme); GoodSAM (about 3x adjusted odds of survival when a responder accepts); Flare/Rescue.co (ambulance response cut from about 162 min to 13–18 min, Nairobi); and India's ABDM/ABHA (about 79.7 crore accounts and 65 crore linked records by Jul 2025). Several popular models have weak or negative evidence: the Kilkari RCT found no effect on its primary outcome, the M-TIBA wallet shut in 2026, and Babyl Rwanda collapsed in 2023. These are cautionary data points.

### Cited Findings

1. **Sproxil / mPedigree: scratch-and-SMS medicine authentication (Nigeria/Ghana)**. NAFDAC introduced it in 2010 and made it mandatory for manufacturers from July 2014. Sproxil reports 10 million users within 4 years of its Feb 2010 launch (company-reported). It operates in Ghana, Nigeria, Kenya and India. Awareness and uptake remain low in informal markets. No independent data show reduced counterfeit prevalence — [PCWorld](https://www.pcworld.com/article/435515/mobile-technology-offers-option-to-combat-fake-drugs-in-west-africa.html); [Prime Progress NG](https://primeprogressng.com/prime-health/nigerias-digital-fight-against-deadly-fake-drugs/); [SciTePress 2015](https://www.scitepress.org/PublishedPapers/2015/52152/52152.pdf)

2. **Zipline: drone delivery of blood and medical products (Rwanda, Ghana)**. In 2023 it delivered 28,754 blood units in Rwanda, averaging 42 minutes from order (company). An MSOM peer-reviewed study (Wharton) found **51% lower in-hospital PPH maternal deaths** and 30% lower trauma deaths at served facilities. A Science Robotics paper (Dec 2023) reported **67% less blood wastage** from expiry — [Wharton](https://knowledge.wharton.upenn.edu/article/how-rwanda-is-using-drones-to-improve-health-care/); [UDaily 2023](https://www.udel.edu/udel/en/udaily/2023/december/research-robotics-zipline-drones-deliveries-olga-lebed/); [Zipline](https://www.zipline.com/newsroom/preventing-maternal-deaths-through-faster-blood-delivery). Other cited figures (46%, 88%) are unverified [uncertain].

3. **Swaasa (Salcit, India): cough-sound AI for TB screening**. Scientific Reports 2023 (n=567): 86.82% accuracy, **90.36% sensitivity, 84.67% specificity**, meeting WHO targets for community screening. It is registered with CDSCO (scope [uncertain]). More than 400k screened (company) — [PMC 2023](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10034902/); [BioSpectrum](https://biospectrumindia.com/news/92/22850/first-of-its-kind-ai-based-app-to-detect-active-tb-cases-within-seconds.html). Hyfe: no verifiable data found [uncertain, dropped].

4. **Qure.ai qXR / CAD4TB: AI chest X-ray for TB**. WHO's 2021 CAD recommendation was based on CAD4TB, Lunit and qXR. qXR reportedly runs in about 20 countries (date unclear). Notably, the evaluation used **23,954 Bangladeshi X-rays from icddr,b**: qXR specificity 74.3% and CAD4TB 72.9% at 90% sensitivity, and all five AIs outperformed Bangladeshi radiologists — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8686824); [Stop TB](https://www.stoptb.org/node/348); [Health Policy Watch](https://healthpolicy-watch.news/new-tb-screening-tools/). It is provider-facing, not patient-facing.

5. **Kilkari (India, MoHFW + ARMMAN/BBC Media Action): free weekly voice calls on maternal and child health**. More than 16 million women and children enrolled in FY2024–25, about 60 million cumulative (ARMMAN). The **RCT (Madhya Pradesh, n=2,695; BMJ Global Health 2022) found no effect on exclusive breastfeeding** (RR 1.04, p=0.64). It found +3.7 percentage points in modern reversible contraceptive use, with larger gains among the poorest — [PMC 2022](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9288869/); [ARMMAN impact deck](https://armman.org/wp-content/uploads/2025/07/Q4_24-25_Impact-Deck.pptx.pdf). mMitra effect sizes were not found.

6. **Jacaranda Health PROMPTS (Kenya): two-way SMS with an AI-assisted helpdesk that triages danger-sign questions**. Cluster RCT across 40 facilities and 8 counties (n=6,139) found improved knowledge, care-seeking and newborn care (PLOS Medicine; effect sizes not retrieved). 85% enrolment uptake. Scale is 650k mothers in 2024 (IDRC) to 2.5 million reached (CEGA) — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10967085); [IPA](https://poverty-action.org/impact-digital-health-platform-maternal-and-newborn-care-kenya); [CEGA](https://cega.berkeley.edu/feature/improving-antenatal-care-for-expecting-mothers-in-kenya/)

7. **MomConnect (South Africa NDoH): registration at the first antenatal visit, then SMS/WhatsApp messages plus a helpdesk**. 1.7 million+ women registered by Dec 2017 across more than 95% of public facilities. About 8% use the helpdesk. Compliments outnumbered complaints 8:1 (14,000 vs 1,450), so it also works as a **citizen feedback channel on facility quality**. A WhatsApp symptom-checker trial is under way (NCT06790069) — [PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5922497/); [MEASURE Evaluation](https://www.measureevaluation.org/resources/publications/ja-18-252); [ClinicalTrials.gov](https://clinicaltrials.gov/study/NCT06790069)

8. **Babyl (Rwanda): national telemedicine partnership**. More than 2 million registered users (over 30% of adults) and 1.2 million+ consultations by 2020. **Ceased operations in Sept 2023** after Babylon Health collapsed. This is a cautionary case of vendor dependency — [STL Partners 2020](https://stlpartners.com/wp-content/documents/Articles/Digital%20Health/Telehealth%20in%20Emerging%20markets.pdf); [New Times 2023](https://www.newtimes.co.rw/article/11008/news/rwanda/babyl-rwanda-reportedly-ceases-operations/amp)

9. **India ABDM / ABHA: national health ID, PHR apps and a consent manager**. **79.71 crore ABHA accounts and 65.09 crore linked health records as of 28 Jul 2025** (Lok Sabha). More than 100 crore linked records by May 2026 — [The Week/PTI 2025](https://www.theweek.in/wire-updates/national/2025/08/01/del53-lsq-health-record.html); [IANS 2026](https://ianslive.in/ayushman-bharat-milestone-100-crore-health-records-linked-with-abha-accounts--20260522184803)

10. **Indonesia SATUSEHAT (Mobile + platform)**. Citizens view their outpatient records across facilities (from Nov 2023). **38,288 facilities and 61 million+ patients integrated (Sept 2025)**. An AI personal health assistant has been added — [CAHO presentation](https://www.caho.in/files/Dr%20Hanny.pdf); [Tempo 2023](https://en.tempo.co/read/1795894/health-ministry-launches-integration-of-e-medical-records-into-satusehat-appindeks); [GovInsider](https://govinsider.asia/intl-en/article/indonesias-citizen-health-app-gets-a-boost-with-an-ai-powered-personal-health-assistant)

11. **M-TIBA (Kenya; CarePay/Safaricom/PharmAccess): mobile health wallet**. 500k users within about 6 months of its 2016 launch. In a pilot at 44 clinics, 63% used the wallet. **In 2026 it closed its "My Health Funds" savings wallet and pivoted to insurance management** — [PharmAccess](https://www.pharmaccess.org/update/half-million-people-sign-m-tiba); [TechCabal 2026](https://techcabal.com/2026/04/22/kenyas-m-tiba-refunds-users-after-shutting-health-savings-wallet/)

12. **Flare / Rescue.co (Kenya): ambulance dispatch marketplace aggregating private ambulances with a GPS-tracked 24/7 dispatch centre**. Response time cut **from about 162 min to 13 min urban and under 30 min rural** (2025 peer-reviewed case study). The company says 18 minutes country-wide — [PMC 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12418930); [Bayer Foundation](https://bayer-foundation.com/news-stories/social-innovation/flare-offering-life-saving-ambulance-services-kenyans-country-wide); [MIT Alum](https://alum.mit.edu/node/106471)

13. **GoodSAM (UK): crowdsourced CPR first responders alerted by the ambulance service, including the nearest AED**. When an alert is accepted, the **adjusted odds ratio for survival to discharge is 3.15 (London) and 3.19 (East Midlands)**. But acceptance is low (1.3% of London arrest calls) — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8757292/); [NIHR Evidence](https://evidence.nihr.ac.uk/alert/more-people-survived-cardiac-arrest-first-aiders-goodsam-alert/)

14. **Peek Vision (Kenya, Botswana): smartphone visual acuity screening, plus vision-simulation printouts and SMS reminders to parents**. Lancet Global Health cluster RCT (Rono et al. 2018; 20,000+ children in 50 schools): **referral attendance 54% vs 22%**. Scale-up screened 168,820 students in Trans Nzoia. Botswana screened 12,877 children — [LSHTM 2018](https://www.lshtm.ac.uk/newsevents/news/2018/smartphone-screening-boosts-childrens-eye-health-care); [Peek](https://peekvision.org/resources/news/peek-vision-screening-boosts-childrens-eye-health-care/)

15. **Google ARDA (Thailand national DR programme; also India)**. Prospective study (Lancet Digital Health 2022, n=7,651, 9 sites): **accuracy 94.7%, sensitivity 91.4%, specificity 95.4%**, vs retina specialists' 84.8% sensitivity. "1 million+ screened" (2026) is unverified [uncertain] — [Google Research](https://research.google/pubs/real-time-diabetic-retinopathy-screening-by-deep-learning-in-a-multisite-national-screening-programme-a-prospective-interventional-cohort-study); [DOAJ](https://doaj.org/article/8274737a776e480a9e055f8af77311d8)

16. **Medic Community Health Toolkit (CHT; open source)**. More than **170,000 CHWs in 21 countries** and 170 million+ care moments (2024; self-reported). National adoption in Togo, Kenya, Uganda, Mali and Nepal — [Medic 2024 Annual Report](https://medic.org/2024-annual-report/). It is CHW-facing.

17. **Picterus JP (Norway): smartphone camera neonatal jaundice screening with a calibration card**. CE-certified. One validation reported **94% sensitivity and 71% specificity for severe jaundice**. Trials are running in Botswana, Mexico, Turkey and the US (Intermountain), including dark-skinned newborns — [PMC (Aune et al. 2023)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10015352/); [ClinicalTrials.gov](https://clinicaltrials.gov/study/NCT05955144). Note: the 94/71 figure comes from a search summary of a CE-certified smartphone system study [verify the exact paper].

18. **Sehat Kahani (Pakistan): home-based women doctors serving nurse-run e-clinics and an app**. Over 4.2 million consultations and 65 e-clinics. 7,500+ (mostly female) doctors. GSMA user research (2019) confirmed better access for women (mostly company-reported) — [Brecorder](https://www.brecorder.com/news/amp/40397910); [GSMA](https://www.gsma.com/mobilefordevelopment/blog/using-technology-to-fight-covid-19-a-spotlight-on-telemedicine-start-up-sehat-kahani-in-pakistan/)

19. **mTrac (Uganda MoH/UNICEF): SMS facility reporting plus an anonymous citizen SMS hotline for complaints about health facilities**. **52,946 health workers at 5,684 facilities (2018)**. The hotline led to about **US$400k of misappropriated funds being recovered in 2013**. A 2013 SMS survey found 57.2% of facilities had at least one vaccine stock-out — [SDSN TReNDS 2018](https://files.unsdsn.org/CaseStudy_mTRAC_Sept2018.pdf); [UNSDSN](https://www.unsdsn.org/resources/data-sharing-via-sms-strengthens-uganda-s-health-system/)

20. **Jan Aushadhi Sugam (India, BPPI): app to find generic-medicine outlets and compare generic vs branded prices**. Generics are 50–90% cheaper. Estimated **savings of Rs 20,000+ crore over 9 years** (parliamentary reply, 2023). 9,668 kendras (Jul 2023), more than 14,000 later — [Lok Sabha reply](https://eparlib.nic.in/bitstream/123456789/2500814/1/AU3806.pdf); [Drishti IAS](https://www.drishtiias.com/daily-updates/daily-news-analysis/janaushadhi-sugam-mobile-app/print_manually)

Dropped or not verified: Swasthya Slate, EyeNetra, BiliCam, Dawa Mkononi, mHero, Hyfe, and HealthifyMe (generic). They were not searched in depth for lack of time, so there is no verified impact data in these notes.

### Inferences
- The best-evidenced, non-generic transfers for Bangladesh are on the emergency and logistics side (Flare-style dispatch, GoodSAM-style responders, Zipline-style blood logistics) and in AI screening at the point of contact (Peek, ARDA, Swaasa, Picterus). These meet the "not plain telemedicine" rule.
- The ABDM and SATUSEHAT patterns (ID + PHR + consent manager + citizen record viewer) are the closest analogue to Bangladesh's e-Health Card. The lesson from India is that the citizen-facing PHR and consent layer is where third parties plug in.
- Several closures (M-TIBA wallet, Babyl) show that sustainability and vendor-lock risks should be addressed in any pitch.
- A key MomConnect and mTrac design element is a citizen feedback and complaint channel tied to facilities. This is a low-cost, high-accountability add-on.

### Gaps
- Effect sizes for PROMPTS (PLOS Medicine) and mMitra were not retrieved.
- Exact Picterus accuracy figures per study were not retrieved.
- Current Qure.ai country and screening totals and the WHO 2025 CAD update status were not confirmed.
- No independent evaluation of Sproxil's impact on counterfeit prevalence was found.

---

## Key Question C: Does Bangladesh already have an equivalent of each innovation? (Verdict: NOT PRESENT / EARLY-STAGE / SATURATED)

### Takeaway
Bangladesh is crowded in teleconsultation (16263, plus private apps), blood-donor matching (Bloodman/Facebook) and CHW data tools (BRAC OpenSRP). It has early-stage or pilot versions of medicine authentication (Panacea, DGDA QR/SMS), voice maternal messaging (Aponjon), AI TB X-ray (in the NTP algorithm), DR AI (icddr,b CARA, Cybersight at BIRDEM), app-based ambulances (URAL EMS) and the national health ID/SHR (e-Health Card, rollout to 2028). There is no evidence of drone blood logistics, crowdsourced CPR responders, cough-AI screening, smartphone jaundice screening, a two-way AI-triaged maternal helpdesk, a citizen anonymous facility-complaint SMS hotline, or a consumer health-savings wallet.

### Cited Findings (verdict matrix)

| # | Global innovation | Bangladesh equivalent found | Verdict | Evidence |
|---|---|---|---|---|
| 1 | Sproxil/mPedigree SMS medicine authentication | **Panacea** (9-digit code on strips, SMS to 2777, with Renata, c.2016). **DGDA app** (a2i/Techno Vista) with QR on top-selling drugs and antibiotics, plus SMS to 333 for feature phones (pilot moving to scale c.2019). Beacon Pharma guide refers to DGDA QR verification | **EARLY-STAGE** (exists, low visibility, no uptake data) | [Dhaka Tribune 2016](https://www.dhakatribune.com/feature/health-wellness/973/a-panacea-for-counterfeit-medicines); [Daily Star](https://www.thedailystar.net/frontpage/know-your-medicine-1243567); [ITU](https://cocreate.itu.int/post/3441800); [Beacon](https://global.beaconpharma.com.bd/how-to-verify-authentic-medicines-in-bangladesh) |
| 2 | Zipline drone blood/medicine | Only an NSU student design project (2023) and Robolution field tests (food drone) | **NOT PRESENT** | [NSU repository](https://repository.northsouth.edu/bitstreams/353b61bc-1b0f-4752-9803-9cc1b27965b9/download); [Robolution LinkedIn](https://bd.linkedin.com/in/robolutionbd) |
| 3 | Swaasa cough-AI TB screening | None found | **NOT PRESENT** [uncertain; single search] | — |
| 4 | Qure.ai / CAD4TB X-ray AI | icddr,b screening centres (655,751 screened 2013–15). CAD with ultraportable X-ray in the NTP algorithm, rolled out to NW/NE districts (Dec 2023). qXR used in Mymensingh paediatric TB | **EARLY-STAGE → scaling** (provider-facing; low hackathon novelty) | [Stop TB](https://stoptb.org/file/10022/download); [Stop TB NTP brief 2023](https://www.stoptb.org/sites/default/files/intp_bangladesh_-_xray_cad_dec_2023.pdf) |
| 5 | Kilkari / mMitra voice maternal messages | **Aponjon** (Dnet + MAMA): weekly voice/SMS plus a 24/7 doctor call centre. 427,284 subscribers (Mar 2014). Observational evaluations show mixed effects. Current scale unknown | **EARLY-STAGE / legacy** (exists; not saturated) | [Harvard MAMA slides 2014](https://content.sph.harvard.edu/wwwhsph/sites/2413/2014/05/Whats-new-in-mHealth-for-maternal-health.pdf); [PMC 2019](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6727538/) |
| 6 | Jacaranda PROMPTS (two-way SMS + AI triage of danger signs) | Aponjon is mostly one-way plus a call centre. No AI-triaged two-way danger-sign helpdesk found | **NOT PRESENT** (as a two-way AI triage model) [uncertain] | [PMC 2019 (Aponjon)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6658262/) |
| 7 | MomConnect (registry at ANC plus a feedback/complaint helpdesk) | Aponjon for messaging. No national ANC-linked registration with citizen feedback found | **EARLY-STAGE** (partial) | as above |
| 8 | Babyl / Sehat Kahani telemedicine | Shasthyo Batayon 16263 (27.2 million calls), DocTime, Maya, etc. Excluded as generic by the hackathon | **SATURATED** | [Prothom Alo](https://en.prothomalo.com/bangladesh/gdmucoatn3) |
| 9 | ABDM/ABHA, SATUSEHAT (ID + PHR + consent + citizen record view) | e-Health Card / Health-Bridge / Shareable Health Record. Five-district start, all citizens by 2028. PDPO 2025 consent rules | **EARLY-STAGE** (government building the core; citizen PHR and consent layer is open) | [Dhaka Tribune 2026](https://www.dhakatribune.com/amp/bangladesh/parliament/412231/health-minister-every-citizen-to-get-e-health); [TBS](https://www.tbsnews.net/taxonomy/term/328771) |
| 10 | M-TIBA health wallet | Shasthyo Surokkha Karmasuchi (SSK) health card for BPL households: Tk 50,000/yr inpatient cover for a Tk 1,000 premium, about 100k households in 3 Tangail upazilas (pilot). No consumer health-savings wallet found | **NOT PRESENT** (wallet); **EARLY-STAGE** (insurance card) | [PMC (SSK)](https://pmc.ncbi.nlm.nih.gov/articles/PMC9270808); [Daily Star](https://www.thedailystar.net/node/1199365) |
| 11 | Flare/Rescue.co ambulance dispatch marketplace | URAL EMS app-based ambulance (2018). 999 (paid ambulances). No centralized EMS. Syndicates at hospitals | **EARLY-STAGE** | [Financial Express 2018](https://old.thefinancialexpress.com.bd/public/print/ural-ems-launches-first-app-based-ambulance-service-in-country-1534684735); [U of T](https://che.utoronto.ca/?p=1102) |
| 12 | GoodSAM crowdsourced CPR responders | None found | **NOT PRESENT** [uncertain; single search] | — |
| 13 | Peek Vision school eye screening | "Dristi" Bengali-adapted acuity app (validated Jun–Sep 2022; research stage) | **EARLY-STAGE** (research) | [PMC 2024](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11664268/) |
| 14 | ARDA DR AI | icddr,b CARA AI DR grading with tele-ophthalmology (c.2019). Cybersight AI at BIRDEM-2 (CHILDSTAR 2023). iHealthScreen bus (press) | **EARLY-STAGE** | [Financial Express](https://thefinancialexpress.com.bd/health/ai-based-diabetic-retinopathy-detection-now-at-icddrb-1557745922); [PMC 2023](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10563496/); [TBS](https://www.tbsnews.net/node/194635) |
| 15 | Medic CHT for CHWs | BRAC mHealth on OpenSRP (about 4,300 CHWs with tablets; database covering 64 million people). OpenSRP endorsed by MoHFW. Dishari learning app | **SATURATED** (for CHW data tools; provider-facing) | [Transform Health](https://transformhealthcoalition.org/insights/digitally-equipped-community-health-workers-fight-covid-19-in-bangladesh-2/); [IPS](https://www.ipsnews.net/?p=178307) |
| 16 | Picterus smartphone jaundice | SLAB4 study: plastic "Bili-ruler" icterometer plus mCNC newborn job-aid app (Sylhet; 790 newborns). No camera-based app found | **EARLY-STAGE** (research, non-smartphone) | [PRF BD SLAB4](https://prfbd.org/study/studydetails/slab4-study) |
| 17 | mTrac anonymous citizen complaint SMS + stock reporting | WHO MedMon price/availability data collection (DGHS MIS, 2019). DGDA app allows overpricing complaints (pilot). No citizen anonymous facility-complaint hotline found | **NOT PRESENT** (complaint hotline) [uncertain]; **EARLY-STAGE** (stock monitoring) | [WHO Bangladesh 2019](https://www.who.int/bangladesh/news/detail/25-11-2019-bangladesh-employs-digital-health-for-monitoring-access-to-essential-medicines); [ITU](https://cocreate.itu.int/post/3441800) |
| 18 | Jan Aushadhi Sugam (generic price lookup) | DGDA app price verification (pilot). DGDA caps only about 160 drugs. 2024 retail price surges of 7–140%. E-pharmacies (Arogga, MedEasy, Osudpotro) list prices [not verified in this research] | **EARLY-STAGE** | [ITU](https://cocreate.itu.int/post/3441800); [FE](https://thefinancialexpress.com.bd/trade/yawning-gap-between-mill-gate-and-retail-medicine-prices) |
| 19 | Blood-donor matching (Bloodman/Rokto apps) | Bloodman plus Facebook Blood Donations (11 million BD sign-ups by Jun 2021). Rokto.org (2004). No verified national donor registry or blood-inventory platform (TBS 2025) | **SATURATED** (matching); **NOT PRESENT** (national inventory/registry) | [Dhaka Tribune](https://www.dhakatribune.com/bangladesh/249565/facebook-urges-more-people-in-bangladesh-to-be); [TBS 2025](https://www.tbsnews.net/thoughts/blood-donation-goes-digital-lessons-global-best-practices-1164731) |
| 20 | Mental-health digital support | Kaan Pete Roi helpline (since 2013), Moner Bondhu, Relaxy (25k downloads, 11k active; dated) | **EARLY-STAGE** | [TBS](https://www.tbsnews.net/node/182695); [Daily Star](https://www.thedailystar.net/tech-startup/news/relaxy-the-mental-health-platform-thats-here-help-3341696) |

### Inferences
- The most "white-space plus proven elsewhere" candidates for a non-generic shortlist are:
  - (a) an e-Health-Card-linked emergency layer: a Flare-style dispatch aggregator with transparent fares against syndicates, plus GoodSAM-style responders;
  - (b) a blood-inventory and logistics layer (national registry with real-time stock; Zipline is a logistics model, a drone pilot is less feasible);
  - (c) point-of-care AI screening tied to the health ID: cough-TB, smartphone jaundice, school vision with Peek-style SMS follow-up to parents;
  - (d) a two-way, AI-triaged Bangla maternal helpdesk (PROMPTS/MomConnect) upgrading Aponjon-style one-way messaging;
  - (e) an mTrac-style anonymous citizen feedback/complaint SMS linked to facilities;
  - (f) a citizen PHR and consent app on Health-Bridge, aligned with PDPO 2025 consent rules (ABDM pattern);
  - (g) pharmacy-side verification and price-cap lookup that merges DGDA QR/SMS authentication with legal price data (Jan Aushadhi Sugam pattern). This also addresses AMR (antibiotic sales tracking).
- Avoid or reposition: teleconsultation (saturated), donor matching (saturated), CHW data collection (saturated via BRAC/OpenSRP).

### Gaps
- Local players listed in the brief were not individually verified in this research: Shukhee, Praava, Maya, Doctorola, Arogga, Jeeon, DocTime, Sebaghar, Amar Daktar, Tonic, Pulse, MedEasy, Osudpotro and Lazz Pharma. Their exact features (e.g., e-pharmacy price display, lab-report storage) need checking before final verdicts on #8, #9 and #18.
- The current operating status and usage of the DGDA verification app, Panacea and Aponjon in 2025–2026 were not found.
- NOT PRESENT verdicts for #3, #6, #12 and #17 rest on single searches. Do a quick check against Bangladeshi news before pitching an idea as "first in Bangladesh".
- No Bangladesh-specific LightCastle or Future Startup landscape report was fetched.
