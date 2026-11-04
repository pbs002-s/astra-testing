# 00 — Summary: E-Health Hackathon & Symposium 2026 (MoHFW + WHO, 3–5 Dec 2026, Dhaka)

**Tracks found.** Of 15 "priority areas", only 6 were readable: primary care, electronic records, referrals, pharmacy, labs and ambulance services. **The other 9 are missing** (site blocked automated access). No judging criteria or deliverables were found. Press reports describe a 10-member screening committee that narrows **50 → 25 → top 5** teams. The organisers' main goal is "solutions that power the national e-Health Card" ([About](https://ehealthhackathonbd.org/about); [Lanka Business News](https://www.lankabusinessnews.com/e-health-hackathon-2026-launches-to-build-ai-and-digital-solutions-for-bangladeshs-health-system/)).

**Top 3 ideas** (full details in `05_final_ideas.md`):
1. **ReferLoop.** Closed-loop referral: specialist replies or accepts, patient returns with a note. 59% of tertiary patients self-refer (2024); South Africa's Vula replies in a median 16 minutes.
2. **ScanShare OPD.** Health-ID QR registration at the outpatient counter. India's version cut waits from 30–40 to 5–10 minutes.
3. **RadioQ.** One shared national radiotherapy waiting list. About 7,500 patients are waiting at NICRH, where 4 of 6 machines are down (Oct 2026).

**Combined portal: CareLoop.** ScanShare, ReferLoop and lab results by SMS on one Health ID: *register, refer, return results*.

**Stakeholder coverage across the 10 ideas:**
- Patients/citizens: 3 ideas
- Doctors and health workers: 3
- Medical students and teachers: 2
- Hospitals and colleges: 2

All 6 known areas are covered. Rejected as already crowded: telemedicine, booking apps, drug-stock dashboards, child IMCI tools and blood-donor matching.

**Corrections to your brief:**
- **Team size:** the official limit is **3 people**, not 3–5.
- **Out-of-pocket spending:** 79.31% (World Bank, 2023), not 69%.
- **Absenteeism:** 35%, not 40%.
- **Private MBBS cost:** BDT 30–45 lakh in total.

**Do this first:**
1. Open ehealthhackathonbd.org in a normal browser. Copy the **15 priority areas** and any judging or submission rules into `01_hackathon_intel.md`.
2. **Confirm the 3-person team limit**, and register **before about 17 Nov 2026**. Registration opened 18 Oct for one month, and no exact deadline is published.
3. **Test the FHIR sandbox** (`https://sandbox.fhir.dghs.gov.bd/fhir`) this week. Write and read back one `Patient` record with a made-up Health ID starting with "9".
4. Choose ReferLoop or CareLoop; re-rank once you have the 9 missing areas.
5. Build privacy consent (Personal Data Protection Ordinance 2025), offline mode and Bangla SMS into the demo from day one.

**Files:** `reports/Bangladesh eHealth hackathon ideas.md`; details in `01`–`05`.
