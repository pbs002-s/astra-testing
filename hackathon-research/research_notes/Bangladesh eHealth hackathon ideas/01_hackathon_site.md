# E-Health Hackathon & Symposium (ehealthhackathonbd.org): official-site intelligence

> **ACCESS WARNING:** https://ehealthhackathonbd.org/ is behind a **Cloudflare managed JS challenge** ("Just a moment... Enable JavaScript and cookies to continue"). Direct WebFetch and curl both got **HTTP 403** on every path. Only **two pages** came back, through a third-party crawler cache (Exa, using the `agent-reach read` CLI): the **homepage** and **/about**. Every other route was rate-limited (HTTP 429, then a roughly 1-hour block), returned CRAWL_NOT_FOUND, or was blocked. **The site's "15 priority areas" list, judging criteria, deliverables, prizes and full rules were NOT obtained.** Each item below is labelled:
> - **[SITE]**: verbatim from the official site
> - **[NEWS]**: from press coverage (no official social posts were found)
> - **Not stated on site**: not found in the pages that loaded. It may exist on the pages that could not be fetched.
>
> Note on the Exa text: it is a cached crawl and its date is unknown. One apostrophe came back as a corrupted character ("Bangladesh�s").

## Page fetch log

| URL | Method | Result |
|---|---|---|
| https://ehealthhackathonbd.org/ | WebFetch | FAILED: HTTP 403 (Cloudflare) |
| https://ehealthhackathonbd.org/ , /robots.txt , /sitemap.xml , /wp-sitemap.xml | curl with a browser user agent | FAILED: HTTP 403 Cloudflare challenge page (about 5.5 KB) |
| https://ehealthhackathonbd.org/ | agent-reach (Jina) | FAILED: anti-bot challenge page |
| https://ehealthhackathonbd.org/ | agent-reach (Exa) | **OK** |
| https://ehealthhackathonbd.org/about | agent-reach (Exa) | **OK** |
| /tracks , /themes , /rules , /registration | agent-reach (Exa) | FAILED: CRAWL_NOT_FOUND (page may not exist or is not in the crawler's cache) |
| /faq , /judging , /timeline , /sponsors , /contact , /schedule , /bootcamp , /symposium , /speakers , /partners , /challenges , /register , /priority-areas | agent-reach (Exa) | FAILED: HTTP 429 rate limit, then the channel was blocked for about 1 hour |
| web.archive.org snapshot | WebFetch | FAILED: tool cannot fetch from web.archive.org |
| `site:ehealthhackathonbd.org` web search | WebSearch | No pages from the domain are indexed |
| Official Facebook/LinkedIn | WebSearch | None found |

The crawler returned only plain text, not link URLs, so the site's real internal link map could not be listed. The homepage shows a "Bootcamp Participant ... Register" call to action, but its target URL (form or portal) is unknown.

## Q1. Event identity, organizers, partners, sponsors

### Takeaway
The site presents a government-led national digital-health and AI innovation programme. The Ministry of Health and Family Welfare (MoHFW) organises it, the World Health Organization (WHO) is the strategic partner, ADN Telecom is listed under partners, and it is tied to the national e-Health Card.

### Cited Findings
- [SITE] Page title: "E-Health Hackathon & Symposium | Bangladesh and Outside Bangladesh" (on /about); the homepage title is "E-Health Hackathon & Symposium | Bangladesh" — [About](https://ehealthhackathonbd.org/about), [Home](https://ehealthhackathonbd.org/)
- [SITE] Homepage hero: "E-Health Hackathon& Symposium" / "Bangladesh’s Digital Health & Innovation" / "Outside Bangladesh| Bangladesh" — [Home](https://ehealthhackathonbd.org/)
- [SITE] "The E-Health Hackathon & Symposium is Bangladesh’s government-led national stage for digital health and AI innovation. Organised by the Ministry of Health and Family Welfare with the World Health Organization as strategic partner, this three-day programme at BICC unites innovators, universities, global health communities and industry to spark, test and scale solutions that power the national e-Health Card." — [About](https://ehealthhackathonbd.org/about)
- [SITE] "Strategic Partner" heading, followed by "World Health Organization (WHO)" and "ADN Telecom". The crawl does not show whether ADN Telecom is also labelled a strategic partner or sits under a separate heading. — [Home](https://ehealthhackathonbd.org/)
- [SITE] Footer: "Government of Bangladesh" — [About](https://ehealthhackathonbd.org/about)
- [SITE] Contact: "Hot Line 09611678739", "info@ehealthhackathonbd.org" — [Home](https://ehealthhackathonbd.org/)
- [SITE] Homepage "Messages from PM" section with quotes attributed to "Mr. Tarique Rahman Prime Minister", "Sardar Md. Sakhawat Husain Minister Ministry of Health and Family Welfare", "Dr. M A Muhit State Minister Ministry of Health and Family Welfare" and "Dr. S. M. Ziauddin Hyder Special Assistant on Health Affairs". Policy-relevant quotes:
  - "My government is transforming our health system, guided by a simple principle: 'prevention is better than cure.' We want to build a healthy Bangladesh, where healthcare begins in the home and community"
  - "The government will not tolerate any corruption in the health sector under any circumstances. ... every penny allocated to the health sector will be spent transparently."
  - "...shifting its focus from treatment to prevention, with a proposal to establish a Primary Healthcare Unit in every union and urban ward and recruit 100,000 additional community health workers."
  — [Home](https://ehealthhackathonbd.org/)
- [NEWS] "The Ministry of Health and Family Welfare and Interspeed Activation Limited launched the E-Health Hackathon 2026" on 18 October 2026 in Dhaka — [Lanka Business News](https://www.lankabusinessnews.com/e-health-hackathon-2026-launches-to-build-ai-and-digital-solutions-for-bangladeshs-health-system/)
- [NEWS] The launch press conference was "organised in partnership with the World Health Organization (WHO)". Speakers included representatives of WHO, UNICEF, the World Bank, Invest Bangladesh, ADN Telecom (Founder and Chairman Asif Mahmud), BMRC and the Directorate General of Nursing and Midwifery. Interspeed Advertising Limited's Group Director gave a keynote. — [BSS](https://www.bssnews.net/news/436268)

### Inferences
- The main buyer and adopter is MoHFW, and the explicit goal is solutions that "power the national e-Health Card". Ideas that plug into an NID or birth-registration-linked health ID, prevention, primary care and community health workers are likely to fit official priorities.
- Interspeed appears to be the event operator or agency. This comes from news coverage only; the site does not name it.

### Gaps
- Full sponsor/partner tiers: Not stated on site (in the pages fetched). The /sponsors and /partners pages could not be fetched.
- Organizer roles beyond MoHFW and WHO: Not stated on site.

## Q2. Tracks / themes / priority areas (verbatim)

### Takeaway
The site says there are **15 priority areas** but the fetched pages name only a few of them as examples. **The full verbatim list was NOT obtained.**

### Cited Findings
- [SITE] "We turn scattered pitches into one powerful pipeline. Across 15 priority areas, from primary care and electronic records to referrals, pharmacy, labs and ambulance services, the strongest teams compete, prove and rise, and standout MVPs may become the foundation of official national e-health solutions." — [About](https://ehealthhackathonbd.org/about)
  - The only area wording on the site: "primary care", "electronic records", "referrals", "pharmacy", "labs", "ambulance services" (6 of 15. These are words from a sentence, not official track titles.)
- [NEWS] "Its 15 priority areas reflect the points where patients most often face delay and risk", with examples given as "diagnosis backlogs, unverifiable prescriptions and lost referrals between facilities". The article does not list all 15. — [Lanka Business News](https://www.lankabusinessnews.com/e-health-hackathon-2026-launches-to-build-ai-and-digital-solutions-for-bangladeshs-health-system/)
- [NEWS] The State Minister's remarks mentioned a national health database, an app for booking hospital appointments, QR codes and tracking for the medicine supply chain, and a research fund. These are policy goals, not confirmed tracks. — [BSS](https://www.bssnews.net/news/436268)

### Inferences
- The sentence reads like a patient journey (primary care → records → referral → pharmacy → lab → ambulance), so the other 9 areas probably cover similar service points. This is not confirmed; do not treat it as fact.

### Gaps
- Exact titles of all 15 priority areas: **not obtained** (the site is Cloudflare-blocked and the subpages could not be fetched). Most likely places: the registration form's category dropdown, or a /priority-areas, /tracks or /challenges page. Open the site in a normal browser to get them.
- Separate "channels" or "categories" (for example student vs company): Not stated on site (in the pages fetched).

## Q3. Eligibility and team rules (including outside Bangladesh)

### Takeaway
Individuals or teams of up to 3 can join. Students, health enthusiasts, Bangladeshi private companies, and international companies and students are all eligible.

### Cited Findings (all [SITE], verbatim, from [About](https://ehealthhackathonbd.org/about))
- "Single applicants" — "Individuals may participate and submit an idea on their own."
- "Teams of up to 3" — "Participants may form a team of no more than three people."
- "Students & health enthusiasts" — "Students and people passionate about improving the health sector are welcome."
- "Private companies in Bangladesh" — "Private companies registered or operating in Bangladesh may participate."
- "International companies & students" — "International companies and students from other countries may also submit eligible solutions."
- [SITE] Homepage registration card: "Bootcamp Participant" / "For Innovators" / "Register as an individual or company to submit your healthcare innovation idea and join the national bootcamp." — [Home](https://ehealthhackathonbd.org/)
- [NEWS] "young innovators from all regions of Bangladesh are encouraged to submit digital solutions"; applicants outside Dhaka are welcome — [Lanka Business News](https://www.lankabusinessnews.com/e-health-hackathon-2026-launches-to-build-ai-and-digital-solutions-for-bangladeshs-health-system/)

### Gaps
- Age limits, nationality documents, and whether international participants must attend in person: Not stated on site.
- What "eligible solutions" means for international entrants: Not stated on site.

## Q4. Dates, timeline, venue, format

### Takeaway
The event runs 3–5 December 2026. The venue is described in two different ways on the site (see below). Registration reportedly stays open for one month from the 18 October 2026 launch.

### Cited Findings
- [SITE] "3–5 December 2026 Venue to be announced soon" — [Home](https://ehealthhackathonbd.org/)
- [SITE] "this three-day programme at BICC" — [About](https://ehealthhackathonbd.org/about). **Conflict:** the same /about page footer and the homepage say "Venue to be announced soon".
- [SITE] "Coming soon" / "Schedule will be published soon" / "The full lineup of sessions, speakers, and venues will be published here once confirmed. Please check back for updates." — [Home](https://ehealthhackathonbd.org/)
- [NEWS] "Registration for the national hackathon will remain open for one month" (launched 18 October 2026, so roughly mid to late November 2026; no exact deadline is given) — [Lanka Business News](https://www.lankabusinessnews.com/e-health-hackathon-2026-launches-to-build-ai-and-digital-solutions-for-bangladeshs-health-system/), [BSS](https://www.bssnews.net/news/436268)
- [NEWS] Selected teams attend a "three-day intensive bootcamp in Dhaka" with domestic and international mentors — [BSS](https://www.bssnews.net/news/436268), [Daily Star](https://www.thedailystar.net/health/news/paper-prescriptions-digital-care-new-hope-bangladesh-4306636)

### Inferences
- BICC is presumably Bangabandhu International Conference Center in Dhaka. The site uses only the acronym.
- The format appears to be idea or MVP submission online, then a shortlist, then an onsite 3-day bootcamp. The site does not spell out the online/onsite split.

### Gaps
- Exact registration deadline, shortlist announcement date, and day-by-day schedule: Not stated on site.
- Online/hybrid option for international teams: Not stated on site.

## Q5. Judging criteria, selection process, prizes

### Takeaway
No judging criteria or weights appear on the fetched pages. News reports describe a 10-member screening committee and a 50 → 25 → top-5 funnel. The rewards reported are recognition and possible government adoption of MVPs; no cash prize is mentioned anywhere.

### Cited Findings
- [SITE] "the strongest teams compete, prove and rise, and standout MVPs may become the foundation of official national e-health solutions." — [About](https://ehealthhackathonbd.org/about)
- [NEWS] "A 10-member screening committee of government, private and technical experts will shortlist teams." — [Lanka Business News](https://www.lankabusinessnews.com/e-health-hackathon-2026-launches-to-build-ai-and-digital-solutions-for-bangladeshs-health-system/)
- [NEWS] "The field narrows from 50 teams to 25 and then to the top 5 across the three days." — same source
- [NEWS] "leading ideas may receive recognition from the Prime Minister"; "The Ministry may take selected MVPs forward as foundations for official national e-health solutions." — same source

### Gaps
- Judging criteria and weights: **Not stated on site** (in the pages fetched; /judging could not be fetched).
- Prize amounts: Not stated on site.

## Q6. Submission requirements and deliverables

### Takeaway
The only stated deliverable is to "submit your healthcare innovation idea". Pitch deck, video, prototype, GitHub, abstract and technical constraints were not found.

### Cited Findings
- [SITE] "Register as an individual or company to submit your healthcare innovation idea and join the national bootcamp." — [Home](https://ehealthhackathonbd.org/)
- [SITE] Mentions of "MVPs" ("standout MVPs may become the foundation of official national e-health solutions") — [About](https://ehealthhackathonbd.org/about)

### Inferences
- Stage 1 is probably an idea submission through the registration form. An MVP is expected by or during the bootcamp. This is not confirmed.

### Gaps
- Mandatory pitch deck, video, prototype, GitHub, abstract, word limits, file formats: **Not stated on site** (in the pages fetched).
- Technical constraints (interoperability standards such as HL7 FHIR, data hosting, open source, language): Not stated on site. News coverage stresses interoperability across departments and coordinated platforms ([Lanka Business News](https://www.lankabusinessnews.com/e-health-hackathon-2026-launches-to-build-ai-and-digital-solutions-for-bangladeshs-health-system/)).

## Q7. Symposium content and past editions

### Takeaway
The site gives no symposium programme (it says "Schedule will be published soon") and no past editions.

### Cited Findings
- [SITE] "The full lineup of sessions, speakers, and venues will be published here once confirmed." — [Home](https://ehealthhackathonbd.org/)
- [NEWS] News calls it the "E-Health Hackathon 2026", and no earlier edition was found. The Harvard HSIL hackathon at UIU (April 2026) is a **separate, unrelated** event. — [Lanka Business News](https://www.lankabusinessnews.com/e-health-hackathon-2026-launches-to-build-ai-and-digital-solutions-for-bangladeshs-health-system/)

### Gaps
- Symposium topics and speakers: Not stated on site.
- Past editions: Not stated on site (this appears to be the first edition, but that is not confirmed).
