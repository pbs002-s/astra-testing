# Bangladesh competitor / uniqueness check for 17 candidate e-Health hackathon ideas

Research date: 26 Oct 2026. Method: about 33 web searches plus fetches, run in parallel batches. The session's shared web-search budget (200 calls) ran out partway through, so several planned follow-ups did not happen: most Bangla-language queries, a Google Play sweep for FCPS apps, a check for an online radiotherapy appointment system, and the current status of Panacea Live. Verdicts for those items are marked [uncertain] where relevant. A verdict of "NOT PRESENT" means "not found in public web sources after the listed queries". It does not prove absence.

Verdict key: **NOT PRESENT** = no Bangladesh equivalent found. **EARLY-STAGE** = a pilot, plan, proposal, or partial or adjacent system exists. **SATURATED** = a live government system, or several active players, already covers the core idea.

## Summary table

| # | Idea | Verdict | One-line justification |
|---|------|---------|------------------------|
| 1 | Closed-loop e-referral + back-referral on Health ID | EARLY-STAGE | SHR/Bahmni send records to the referral facility, and NCD/GP pilots include referral. No closed loop with specialist advice and back-referral was found. |
| 2 | Drug-shop POS logging antibiotic sales for AMR | EARLY-STAGE | Pharmacy POS is common (MediPOS, Jeeon, DGDA/MSH software), but none was found feeding antibiotic sales into surveillance. |
| 3 | Protocol CDSS for CC/upazila OPD auto-filling DHIS2 | EARLY-STAGE (IMCI niche taken) | Govt + Save the Children IMCI app covers all 319 Barishal facilities and is linked to DHIS2/OpenSRP/SHR. Adult and NCD protocols are mostly unaddressed. |
| 4 | QR Health-ID scan-and-share OPD registration | NOT PRESENT | Health ID registration at OpenMRS+ counters and the e-appointment portal exist. No QR scan-and-share flow was found. |
| 5 | Medical equipment uptime/maintenance register | NOT PRESENT | 3,331 out-of-order devices were reported in 84 hospitals. Only an ICT-device distribution system and an "asset management" label were found [uncertain scope]. |
| 6 | Essential-drug stock visibility (DGHS facilities) | SATURATED | DGHS eLMIS is live (elmis.dghs.gov.bd), with facility-level dashboards. |
| 7 | National real-time blood stock portal | NOT PRESENT (inventory); SATURATED (donor matching) | No national inventory portal was found. Donor-matching is crowded (Bloodman/Meta, Rokto.org, Facebook groups). |
| 8 | Digital logbook / e-portfolio for interns & PG trainees | EARLY-STAGE | BCPS e-logbook was tendered in 2022 and said in 2024 to be "piloting soon". Trainees still use paper logbooks (BCPS forms, BSMMU PDF logbooks). |
| 9 | Digital OSCE/OSPE scoring | NOT PRESENT | Only a 2026 Bangladeshi review calling for technology-enhanced OSCE was found. No deployment. |
| 10 | Bangla serious game for neonatal resuscitation | NOT PRESENT (game); adjacent SDA exists | Safe Delivery App has a Bangladesh adaptation (videos, not a game). No Bangla game was found. |
| 11 | Volunteer first responders / central ambulance dispatch | SATURATED (concept); gap in integrated dispatch | CriticaLink, TraumaLink, URAL EMS and 999 already exist. A unified fleet-visibility dispatch was not found. |
| 12 | Smartphone cough-AI TB screening | NOT PRESENT | Only chest-X-ray AI (icddr,b TB REACH) was found. No cough-AI pilot in Bangladesh. |
| 13 | Medicine authentication QR/SMS | EARLY-STAGE | Panacea Live + Renata SMS 2777 (2016) and CDrug (2017). No DGDA QR mandate was found [current status uncertain]. |
| 14 | Patient feedback via SMS/IVR | SATURATED (inbound complaints); NOT PRESENT (outbound survey) | DGHS SMS complaint system has run since 2012 at ~700–800 hospitals. No outbound post-visit IVR/SMS survey like Mera Aspataal was found. |
| 15 | Health-worker violence incident reporting / panic tool | EARLY-STAGE | Govt "Pagla Ghonta"/"Code Blue" alarm pilot was announced in May 2026 (DMCH, ShSMCH). No reporting app or incident registry was found. |
| 16 | Adaptive spaced-repetition Q-bank for FCPS-I/residency | EARLY-STAGE (Q-banks exist; adaptive SR not found) | Medical Higher Study (250k+ Qs), Med Ed, and coaching exist. No adaptive or spaced-repetition engine was found [Play Store sweep not done]. |
| 17 | Cross-institution shared radiotherapy/diagnostic waiting list | NOT PRESENT | NICRH has ~7,500 waiting and appointments into 2028, booked in person. No shared list was found. Experts are calling for coordination with private centres. |

---

## 1. Closed-loop e-referral with specialist advice and back-referral tied to Health ID

### Takeaway
Pieces exist: SHR record sharing, Bahmni referral data flow, telemedicine "referral services", and NCD/GP pilots with a referral step. No closed-loop system was found where a specialist gives advice and back-refers to the lower facility. EARLY-STAGE, and a good fit with the e-Health Card.

### Cited Findings
- DGHS Shared Health Record (SHR) is the MoHFW's central system. It gives each citizen a record, pulls visit data from care points, and shares records on request with consent. Hospital automation for it began in 2012. — [SHR About](https://info.shr.dghs.gov.bd/about)
- Kaliganj UHC + 2 community clinics piloted Bahmni in 2016. Records moved through a central HIE to Gazipur, Kaliganj's referral hospital (vendor blog). — [Thoughtworks](https://www.thoughtworks.com/en-au/insights/blog/implementing-shared-health-record-platform-rural-bangladesh)
- Parbatipur NCD digital care-coordination platform (records, referral, follow-up). 624 participants. Uncontrolled BP fell from 60% to 26% by month 3. The focus was BP control, not referral performance. — [BMJ Open 2023](https://bmjopen.bmj.com/content/13/11/e073743)
- Digital GP model pilot (UIU/Chowdhury et al.) covered 12,746 people, with referral "to GP and upper-level health facilities as need". — [GP Model PDF](https://iriic.uiu.ac.bd/wp-content/uploads/2025/02/GP-Model.pdf); [MIT Solve](https://solve.mit.edu/solutions/86959)
- DGHS runs 94 telemedicine centres and a National Telehealth Service Centre offering referral services. — [WHO SEARO 2023 slides](https://seaextranet.searo.who.int/meetings/TMwrshp/Shared%20Documents/Presentations/Plenary%20IV%20Telemedicine%20and%20digital%20health%20tools%20for%20COVID-19%20and%20beyond/SEAR%20TLM%20workshop-7-9%20Feb%202023-%20Plenary%20IV%20-%20Bangladesh.pdf)
- A BRAC University thesis notes a "scarcity of proper online referral system" in Bangladesh. — [BRACU dspace](https://dspace.bracu.ac.bd/xmlui/handle/10361/9145)
- An icddr,b/WHO-supported CHW app for hypertension and diabetes includes "effective referral" as an objective (feasibility pilot). — [WHO SEARO research portal](https://researchportal.searo.who.int/index.php/hrp/search/viewProposal/59)

### Inferences
- The differentiator is the loop itself: specialist reply, back-referral, and a referral status tracked on the Health ID. This was not seen anywhere. The SHR/OpenMRS+ stack gives a natural integration point.

### Gaps
- No search was run in Bangla ("রেফারেল ব্যবস্থা ডিজিটাল"). Internal DGHS OpenMRS+ referral modules may exist without public documentation.

## 2. Drug-shop POS that logs antibiotic sales for AMR surveillance

### Takeaway
Pharmacy POS and digitisation are already crowded. None of these players was found feeding antibiotic sales data into AMR or AMU surveillance, and researchers explicitly flag the pharmacy-data gap. EARLY-STAGE: build the surveillance layer, not another POS.

### Cited Findings
- Jeeon: a social business digitising retail pharmacies since 2015, with a claimed network of 30,000+ pharmacies. — [Crunchbase](https://www.crunchbase.com/organization/jeeon)
- PulseTech: MedBox distribution to 14,000+ pharmacies. MediPOS pharmacy POS launched Dec 2021 (inventory, purchase, sales). — [PulseTech](https://pulsetechltd.com/); [TBS](https://www.tbsnews.net/node/347995)
- Smaller POS vendors: HisabPlus (batch/expiry, barcode billing) and Medidesh (stock, expiry alerts). — [HisabPlus](https://hisabplus.com/pharmacy-software-bangladesh); [Medidesh](https://apkcombo.com/medidesh-pharmacy/com.medidesh.pharmacy/)
- MedEasy (online pharmacy) raised $750k in Sept 2023. Arogga raised $5.5M. Both are consumer e-pharmacies. — [Future Startup](https://futurestartup.com/2023/09/11/online-pharmacy-startup-medeasy-raises-750k-in-seed-funding/); [SecuringIndustry](https://securingindustry.com/pharmaceuticals/bangladeshi-digital-health-startup-arogga-raises-5-5m/s40/a15736)
- DGDA moved pharmacy licensing online, and MSH says licensed owners get access to pharmacy management software. The UK-funded Better Health project asks pharmacies to keep antibiotic-use registries. — [MSH](https://msh.org/story/bangladeshs-pharmacy-registration-system-goes-digital/)
- The Fleming Fund backed a DGDA investigation of antibiotic use, which led to an antibiotic packaging overhaul. The Bangladesh country grant ran 2020–2023 via DAI and icddr,b. — [WHO 2024](https://www.who.int/news/item/25-09-2024-utilizing-data-on-antimicrobial-use-and-knowledge-to-inform-regulatory-changes-to-antibiotic-packaging-and-support-antimicrobial-stewardship-efforts-in-bangladesh); [Fleming Fund PDF](https://www.flemingfund.org/app/uploads/d4f8a783bafefcdf2af05892f9b65e12.pdf)
- Pharmacy-level AWaRe dispensing data are scarce. — [Antibiotics 2022 (MDPI)](https://www.mdpi.com/2079-6382/11/2/247/xml)
- A CAPTURA/IVI study recommends bringing the private sector into national AMR surveillance and standardising pharmacy record-keeping. — [BioSpectrum Asia](https://www.biospectrumasia.com/news/87/22616/study-recommends-heightened-focus-on-quality-amr-data-generation-in-bangladesh.html)
- Dhaka audit (246 pharmacies): ~45% of antibiotics were dispensed without prescription, and only 7.56% of pharmacies had a registered pharmacist present. — [PMC12744235](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12744235/)
- icddr,b has a digital tools project against antibiotic misuse in community settings (stewardship, not a POS feed). — [MIT Solve 81854](https://solve.mit.edu/solutions/81854)

### Inferences
- A pitch that plugs into existing POS systems (MediPOS/Jeeon/DGDA software) via an AWaRe-coded export to IEDCR/DHIS2 avoids competing with these incumbents and is novel.

### Gaps
- "Model Pharmacy" software specifics and ReAct Asia-Pacific's work were not checked once the search budget ran out. Whether Jeeon or PulseTech already sell anonymised sales analytics to pharma is unknown.

## 3. Protocol-based CDSS for community clinics / upazila OPD with DHIS2 auto-fill

### Takeaway
For child illness, the space is taken by a government-owned product: the digital IMCI app runs at all 319 Barishal government facilities, integrates with DHIS2, OpenSRP, OpenMRS and SHR, and has a DGHS dashboard. Adult OPD and NCD protocols at community clinics remain EARLY-STAGE (icddr,b feasibility pilot only).

### Cited Findings
- Save the Children + GoB IMCI app: field-tested in Barishal, Manikganj and Bhola, then rolled out to all 319 govt facilities in Barishal in April 2025. — [Save the Children](https://www.savethechildren.net/bangladesh/stories/over-300-govt-healthcare-facilities-barishal-will-digitize-treatment-plans); [UNB](https://unb.com.bd/category/Bangladesh/over-300-hospitals-in-barishal-to-digitise-treatment-for-children-through-save-the-childrens-health-application/158491)
- Integrated with DHIS2/OpenSRP/OpenMRS/SHR. Supported assessment of more than 11,000 children. Barriers: network, devices, double entry. — [Implementation research 2025](https://resourcecentre.savethechildren.net/document/implementation-research-on-imci-application-integrated-into-national-digital-platforms-dhis2-opensrp-a-study-in-barisal-district-bangladesh-2025); [Lessons learned](https://www.savethechildren.net/news/sharing-lessons-learned-imci-application-integration-national-management-information-system-mis)
- Cost-effectiveness: highly cost-effective. National scale-up is projected to avert ~33,000 DALYs per year. — [CEA 2025](https://resourcecentre.savethechildren.net/document/cost-effectiveness-and-cost-benefit-analysis-of-the-imci-digital-app-in-bangladesh-2025); [Policy brief](https://resourcecentre.savethechildren.net/document/policy-brief-digitalization-of-imci-services-in-bangladesh-implementation-research-at-barishal-district-2025)
- DGHS IMCI dashboard is live. — [imcidash.dghs.gov.bd](https://imcidash.dghs.gov.bd/en)
- icddr,b/WHO CHW app for hypertension and diabetes: feasibility pilot in rural Bangladesh. — [WHO SEARO portal](https://researchportal.searo.who.int/index.php/hrp/search/viewProposal/59)

### Inferences
- Do not pitch IMCI CDSS. An adult OPD or NCD/maternal protocol CDSS (WHO SMART Guidelines) that reuses the IMCI app's DHIS2 integration pattern stays differentiated.

### Gaps
- mPower and CBHC-specific tools and "Smart Health" were not searched once the budget ran out.

## 4. QR Health-ID scan-and-share OPD registration

### Takeaway
NOT PRESENT as a QR flow. The infrastructure it would sit on already exists: Health ID since 2023, registration at OpenMRS+ counters, and the e-appointment portal. The e-Health Card is planned, and a QR code on it is plausible but unconfirmed.

### Cited Findings
- Unique Health ID was introduced in 2023, tied to NID or birth registration number, one per person. It can be issued at OpenMRS+ hospital registration desks. — [DGHS HID doc](https://git.dghs.gov.bd/riaz.somc/chatbot-knowledge/src/branch/main/HID.md); [SHR UHID](https://en.info.shr.dghs.gov.bd/uhidmci/)
- DGHS e-Appointment portal (pilot hospitals) books OPD and can generate a Health ID remotely. — [DGHS eappointment doc](https://git.dghs.gov.bd/mahfuj/chatbot-knowledge/src/branch/openmrs/eappointment.md)
- A Daily Star op-ed (28 Mar 2026) says the government initiated steps to introduce the national e-Health Card by June 2026. QR content is described only generically. — [Daily Star e-paper](https://epfs.thedailystar.net/TDS/2026/03/28/Bangladesh/MAI/5_07/e9a9005c60892ab2_07.pdf)
- A Dhaka Tribune op-ed (Mar 2025) proposes QR codes for portable records. It is opinion, not a deployment. — [Dhaka Tribune](https://www.dhakatribune.com/opinion/op-ed/375435/simple-steps-to-smart-healthcare)
- India comparator: ABDM Scan & Share. — [ABDM standee](https://abdm.gov.in/strapicms/uploads/ABDM_STANDEE_24aabea939.pdf)

### Inferences
- This has the highest alignment with "solutions that power the national e-Health Card". The risk is that DGHS ships it themselves.

### Gaps
- Whether the e-Health Card has launched, and in what format, is unverified as of Oct 2026.

## 5. Medical equipment uptime / maintenance register (CMMS)

### Takeaway
NOT PRESENT publicly. The problem is well documented, but no CMMS or out-of-order tracker was found for NEMEMW&TC or DGHS.

### Cited Findings
- 3,331 pieces of equipment were reported out of order across 84 hospitals, including medical college, specialised and district hospitals. — [Prothom Alo editorial](https://en.prothomalo.com/amp/story/opinion/editorial/96jul2ywm5)
- Local cases: Sher-e-Bangla MCH, where repeated letters to the directorate went unanswered, and Bagerhat, where a biochemistry analyser sat idle for lack of installation support. — [Prothom Alo](https://en.prothomalo.com/amp/story/bangladesh/local-news/important-diagnostic-tools-out-of-order); [Daily Star](https://www.thedailystar.net/opinion/editorial/news/make-bagerhat-district-hospital-fully-functional-4060096)
- NEMEMW&TC appears only as a procuring entity in repair tenders, with no software mentioned. — [BPPA tender](https://www.bppa.gov.bd/advertisement-goods/details-83702.html)
- The DGHS MIS document lists an "ICT Equipment Distribution System" and an "Asset Management and eLMIS" component. Its scope for biomedical equipment is unclear, and the source is low-authority (a chatbot knowledge file). — [DGHS MIS.md](https://git.dghs.gov.bd/mahfuj/chatbot-knowledge/raw/branch/mis-branch/MIS.md)
- UNICEF supports preventive maintenance of newborn-unit equipment (no software mentioned). — [UNGM](https://www.ungm.org/Public/Notice/236113)

### Inferences
- This is a strong candidate. Open-source precedent (openMEDIS) could be adapted, and the pitch would be to link it to the DGHS asset module rather than duplicate it.

### Gaps
- Private hospital CMMS use (e.g., in Evercare or Square) was not checked.

## 6. Essential-drug stock visibility for DGHS facilities

### Takeaway
SATURATED at system level: DGHS eLMIS is live with national, regional and facility dashboards. Community-clinic-level stock reporting is not well documented, but a hackathon entry would largely duplicate a government system.

### Cited Findings
- eLMIS for DGHS describes itself as a web platform that monitors logistics data at national, regional and facility level. — [elmis.dghs.gov.bd](https://elmis.dghs.gov.bd/)
- During COVID, USAID/MTaPS built daily stock reporting, reaching 99% of COVID facilities, and later expanded it. — [GHSC](https://www.ghsupplychain.org/news/digitalization-covid-19-commodities-supply-management-strengthens-health-delivery-bangladesh)
- Community clinic data flows through DGHS and the CC project, with aggregate data in DHIS2. — [MEASURE handout](https://www.measureevaluation.org/our-work/routine-health-information-systems/rhis-curriculum-modules/handout-10-1.2.docx)

### Inferences
- Only a narrow add-on, such as a patient-facing "is drug X available at my UHC" lookup that reads from eLMIS, would be differentiated.

### Gaps
- Community clinic coverage of eLMIS and how often it is used are unknown. UIMS and CMSD systems were not checked.

## 7. National real-time blood stock portal

### Takeaway
Real-time blood-bank inventory: NOT PRESENT. Commentators explicitly note there is no single verified national platform. Donor-matching apps are SATURATED.

### Cited Findings
- A TBS opinion piece says there is "no single, verified national platform" and a gap in government-run blood platforms, with a broker market as the result. — [TBS](https://www.tbsnews.net/thoughts/blood-donation-goes-digital-lessons-global-best-practices-1164731)
- Bloodman works with DGHS and Meta and has trained 200+ hospitals on Facebook Blood Donations (donor side). — [Prothom Alo](https://en.prothomalo.com/bangladesh/bloodman-meta-hold-webinar-on-blood-donation)
- An earlier BIMA online blood app at DMCH is described in a 2015 study, which also reported broker dependence. — [PMC5135104](https://pmc.ncbi.nlm.nih.gov/articles/PMC5135104)
- An MIT Solve proposal for blood bank inventory software in Bangladesh is a proposal only. — [MIT Solve 87188](https://solve.mit.edu/solutions/87188)
- DGHS 2018: 773,383 bags donated (government hospitals plus some organisations). — [Dhaka Tribune](https://www.dhakatribune.com/bangladesh/event/179519/donate-blood-save-life)

### Inferences
- Pitch it as inventory visibility across Safe Blood Transfusion centres, linked to the Health ID for transfusion history, rather than as donor matching.

### Gaps
- Badhan, Sandhani and Red Crescent tools were not individually verified, and no Bangla search was run. The internal systems of the Safe Blood Transfusion Programme are unknown.

## 8. Digital competency logbook / e-portfolio

### Takeaway
EARLY-STAGE. BCPS is building an e-logbook (EOI 2022, cloud move and pilot "soon" in 2024). BSMMU/BMU logbooks are still PDF and paper. A competing pitch would face an incumbent, BCPS's own system, but intern (BMDC) and university residency logbooks may remain open.

### Cited Findings
- BCPS 2022 EOI for an integrated e-logbook platform to track trainee, supervisor and assessment records. — [BPPA 7553](https://www.bppa.gov.bd/advertisement-services/details-7553.html)
- BCPS newsletter: e-logbook moving to Bangladesh Data Center cloud, with piloting with supervisors and trainees to start soon. — [BCPS newsletter](https://bcps.edu.bd/it_inhouse/newsletter)
- BCPS forms still require a paper logbook obtained from BCPS. — [BCPS Regi form](https://www.bcps.edu.bd/Form/Regiform%20A%20and%20B.pdf)
- BSMMU MD Cardiology Phase B logbook is a PDF. — [BSMMU logbook](https://bsmmu.ac.bd/storage/app/public/MD%20Logbook%20Phase-A&B/Cardiology%20Phase-B%20Logbook.pdf)

### Gaps
- Whether the BCPS e-logbook went live in 2025–26 is unverified. Medical college LMSs were not checked.

## 9. Digital OSCE/OSPE scoring platform

### Takeaway
NOT PRESENT. The only Bangladesh item is a 2026 BJME narrative review (Bangladesh Medical University faculty) arguing for technology-enhanced OSCE.

### Cited Findings
- BJME review advocating technology-enhanced OSCE within programmatic assessment. — [BanglaJOL BJME](https://www.banglajol.info/index.php/BJME/article/view/91792)
- International precedent: Aberdeen iPad app, Heidelberg tablets, Saudi COES (97% examiner satisfaction). — [PMC4839015](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4839015/); [PMC4606489](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4606489/); [Dove](https://www.dovepress.com/innovative-method-to-digitize-a-web-based-osce-evaluation-system-for-m-peer-reviewed-fulltext-article-IJGM)

### Inferences
- The idea is unique, but its link to the e-Health Card or service delivery is weak, which is a fit risk for this hackathon.

### Gaps
- Private medical colleges may use Qpercom or Google Forms ad hoc, which would not show up in a web search.

## 10. Bangla serious game for neonatal resuscitation

### Takeaway
NOT PRESENT as a game. The Safe Delivery App (Maternity Foundation) lists a Bangladesh adaptation, but it uses video and guide content, not a game.

### Cited Findings
- The Safe Delivery App includes neonatal resuscitation videos, works offline, and has Bangladesh among its adapted versions. — [Medbox SDA](https://medbox.org/externpage/5e148832db60a2044c2d5813)
- Comparable digital HBB tools exist elsewhere: HBB VR (Nigeria/Kenya), HBB Prompt (Uganda), RETAIN game. — [JMIR Med Educ 2022](https://mededu.jmir.org/2022/3/e37297); [PMC10887167](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10887167/)

### Gaps
- No Bangla search was run. Saving Newborn Lives/icddr,b digital HBB in Bangladesh was not verified, and Bangladesh SDA adoption numbers were not found.

## 11. Volunteer first responders / central ambulance dispatch

### Takeaway
SATURATED at concept level. Volunteer dispatch (CriticaLink, TraumaLink), app-based ambulance booking (URAL EMS), and 999 routing already exist. The remaining gap is a unified dispatch that sees the whole fleet in real time and receives a hospital pre-alert tied to the Health ID.

### Cited Findings
- CriticaLink (Dhaka nonprofit) trains volunteer first responders and dispatches the nearest one by app or hotline. It won the World Summit Award in 2015. — [Future Startup](https://futurestartup.com/2015/10/27/criticalink-wins-the-world-summit-award-in-health/); [ECA](https://2012-2025.eca.state.gov/highlight/fulbright-alumna-develops-app-mobilize-emergency-first-responders.html)
- TraumaLink highway volunteer network expanded from 14 km to 135 km of national highways. — [GHSP](https://www.ghspjournal.org/highwire/citation/6272/medlars); [GlobalGiving](https://www.globalgiving.org/projects/provide-emergency-medical-care-in-bangladesh/)
- URAL EMS: "first app-based ambulance service" (2018), with an app and call centre. — [Financial Express](https://mail.thefinancialexpress.com.bd/trade/ural-ems-launches-first-app-based-ambulance-service-in-country-1534684735?amp=true)
- Another ambulance app launch was reported. — [Prothom Alo](https://en.prothomalo.com/science-technology/App-launched-for-ambulance-services)
- 999 (2017; police-run) connects callers to various ambulance providers, which are paid services. It is not a single-fleet dispatcher. — [Prothom Alo](https://en.prothomalo.com/science-technology/999-launched-in-Bangladesh); [Dhaka Tribune op-ed](https://www.dhakatribune.com/opinion/op-ed/172825/when-to-dial-999)
- Flare (Kenya) materials mention a planned Dhaka pilot (not confirmed live). — [MIT Solve 15277](https://solve.mit.edu/solutions/15277)

### Gaps
- Whether CriticaLink and URAL EMS are still active in 2026 is unverified. Fire Service and Red Crescent volunteer apps were not checked.

## 12. Smartphone cough-AI TB screening

### Takeaway
NOT PRESENT. Bangladesh TB AI work found so far is chest-X-ray CAD (icddr,b TB REACH screening centres). No cough-audio pilot with NTP or icddr,b was found.

### Cited Findings
- icddr,b TB REACH Dhaka screening centres used digital X-ray with AI interpretation. — [Stop TB](https://stoptb.org/file/10022/download)
- Swaasa (India): 90.36% sensitivity and 84.67% specificity in a validation study. — [PMC10034902](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10034902/)
- A cough-AI TB study in Zambia (2025 preprint) had a Bangladesh link only through a BUET co-author on a related review. — [arXiv 2509.09746](https://arxiv.org/html/2509.09746v2)

### Inferences
- Clinical validation risk is high, and a 3-day hackathon cannot validate a model. Pitch it as a triage-to-CXR referral tool, not as a diagnostic.

### Gaps
- No direct search of icddr,b or NTP publication lists was done.

## 13. Medicine authentication QR/SMS

### Takeaway
EARLY-STAGE. Panacea Live (with Renata, SMS 2777, 2016) and CDrug (2017) existed. No DGDA QR or serialisation mandate was found in English or Bangla searches, unlike India's 2026–2028 mandate.

### Cited Findings
- Panacea Live + Renata: unique 9-digit code on strips for Rolac and Maxpro, checked by SMS to 2777. — [Dhaka Tribune 2016](https://www.dhakatribune.com/feature/health-wellness/973/a-panacea-for-counterfeit-medicines)
- An estimated Tk 600 crore of counterfeit medicines circulates in a Tk 18,000 crore market (Daily Star). — [Daily Star](https://www.thedailystar.net/frontpage/know-your-medicine-1243567)
- CDrug (Jibon Health Technologies): SMS/web point-of-sale verification (2017 contest entry). — [TechBriefs](https://contest.techbriefs.com/2017/entries/medical/8414-0701-215256-cdrug-a-webapp-sms-based-point-of-sale-verification-service-to-fight-counterfeit-drugs-in-bangladesh-and-other-lmic)
- Beacon Pharma's consumer guide mentions QR verification (company blog). — [Beacon](https://global.beaconpharma.com.bd/how-to-verify-authentic-medicines-in-bangladesh)
- India made QR codes mandatory for vaccines, cancer drugs and narcotics from July 2026, and for antimicrobials from 2028 (comparator). — [Daily Pioneer](https://www.dailypioneer.com/news/qr-codes-made-mandatory-on-vaccines-antimicrobials-cancer-and-narcotic-drugs-to-curb-counterfeits)

### Gaps
- Panacea Live's current status [uncertain]. DGDA notices were not checked directly at dgda.gov.bd.

## 14. Public-hospital patient feedback via SMS/IVR

### Takeaway
The inbound SMS complaints channel is SATURATED: a DGHS system has run since 2012 across ~700–800 hospitals. An outbound, proactive post-visit survey like Mera Aspataal was NOT found, so that variant counts as EARLY-STAGE or NOT PRESENT.

### Cited Findings
- DGHS SMS complaints and suggestions system, with signboards in public hospitals. — [DGHS old site](https://old.dghs.gov.bd/index.php/en/home/84-english-root/ehealth-eservice/106-complaints-suggestions-through-sms)
- Complaints rose 427% to 4,694 in 2017. — [Financial Express 2018](https://mail.thefinancialexpress.com.bd/sci-tech/sms-based-complaints-about-public-hospitals-spike-1520049781?amp=true)
- Feeds the national health dashboard (2024 DGHS document). — [DGHS complaints.md](https://git.dghs.gov.bd/mahfuj/chatbot-knowledge/src/branch/mis-branch/complaints.md)
- Realist evaluation: low awareness, missing guidelines, and political dynamics limit impact. — [BMJ Global Health 2021](https://gh.bmj.com/content/6/2/e004357)

### Gaps
- a2i GRS and Shasthya Batayon 16263 complaint handling were not checked once the search budget ran out.

## 15. Health-worker violence/safety incident reporting & panic tool

### Takeaway
EARLY-STAGE. The government announced a central emergency alarm ("Pagla Ghonta", also reported as "Code Blue") in May 2026, with pilots at DMCH and ShSMCH. Its launch is unconfirmed. No incident-reporting app or registry was found. Doctors currently document incidents on the "Platform" social network. Topical: the WMA wrote to the government in Sept 2026.

### Cited Findings
- Health Minister announced the alarm pilot at DMCH and Shaheed Suhrawardy MCH after Eid-ul-Azha: "If a doctor or a patient feels insecure… press it". — [Daily Star e-paper 20 May 2026](https://epfs.thedailystar.net/TDS/2026/05/20/Bangladesh/MAI/5_09/f7f3ca47230589ac_09.pdf); [Dhaka Tribune](https://www.dhakatribune.com/bangladesh/health/410642/health-minister-emergency-safety-alarms-to-be); [bdnews24 ("Code Blue")](https://bdnews24.com/health/2c8d74375747)
- WMA letter to the PM and health minister, Sept 2026. — [The Week](https://www.theweek.in/news/world/2026/09/30/world-medical-association-writes-to-bangladesh-authorities-demands-safety-for-healthcare-workers.html)
- 157 incidents analysed from the "Platform" social network. 61% happened at night, and interns and emergency doctors were the most affected. — [Frontiers Psychol 2021](https://www.frontiersin.org/articles/10.3389/fpsyg.2021.787221/full)
- 67.3% of 441 DMCH physicians had experienced workplace violence (BMJ Open 2024, cited in search summary). TBS reports cases settled privately without written complaints. — [TBS](https://www.tbsnews.net/node/1465051)
- Comparator: the West Bengal Doctors' Forum panic app. — [Asia Times](https://asiatimes.com/?p=144076)

### Inferences
- Pitch it as the software layer (incident registry, SOS, police and administration escalation, analytics) that complements the government's hardware alarm.

### Gaps
- Pilot status after June 2026 is unverified. A BMA/BDF app may exist without press coverage.

## 16. Adaptive spaced-repetition question bank for FCPS-I / residency

### Takeaway
EARLY-STAGE. Question-bank apps exist (Medical Higher Study with 250k+ questions, Med Ed) alongside offline and online coaching. No adaptive or spaced-repetition engine was found. The Google Play sweep did not happen (search budget). This idea is also weakly aligned with the e-Health Card theme.

### Cited Findings
- Medical Higher Study (iOS): for FCPS, residency, diploma and MRCP. 250,000+ past questions, live exams, free with in-app purchases. — [App Store](https://apps.apple.com/app/id6451155819)
- Med Ed (iOS): FCPS-I, IMM and FCPS-II question bank and mocks. BCPS-specific scope unclear. — [App Store](https://apps.apple.com/app/id1644524044)
- A Daily Star story describes a doctor preparing for FCPS on mobile through recorded lectures and MCQs (platform not named in snippet). — [Daily Star](https://online91.thedailystar.net/news/tech-startup/news/logging-competing-real-time-4166611)
- FCPS-I is MCQ/SBA only, with no viva. — [BCPS marking](https://bcps.edu.bd/bcpscms/upload/FCPS-I,%20Marking%20system%20(final).pdf)

### Gaps
- Genesis, Platform Academy and similar coaching apps are unverified [uncertain]. Google Play listings were not checked.

## 17. Cross-institution shared waiting list for radiotherapy / diagnostics

### Takeaway
NOT PRESENT, and the need is acute: NICRH has ~7,500 waiting, appointments into 2028, 4 of 6 machines down, and new registrations suspended. Appointments are booked in person. A public-health expert called for coordination with private hospitals. 17 new linacs are due by June 2027, and a shared list would help allocate them.

### Cited Findings
- 20 Oct 2026: ~7,500 waiting (NICRH director), appointments to end-2028, 4 of 6 machines down for more than 2 years, registrations suspended about 6 weeks. 17 linacs planned by June 2027 (6 in Dhaka, 11 outside). An expert urged coordination with private hospitals. — [Dhaka Tribune](https://www.dhakatribune.com/bangladesh/health/422565/7-500-cancer-patients-await-radiotherapy-as)
- 22 Sept 2026: 2 of 6 machines operating, more than 7,000 waiting. — [bdnews24](https://bdnews24.com/health/d18eb3d6ce84)
- 2021: ~37 radiotherapy machines nationally against a need of ~250. — [Daily Star](https://www.thedailystar.net/frontpage/news/cancer-treatment-facilities-scanty-1667677)

### Gaps
- Whether NICRH has any online serial system, and what slot capacity private oncology centres have, was not checked (search budget exhausted).
