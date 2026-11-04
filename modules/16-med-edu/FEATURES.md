# ✨ MedEdu — Feature Catalog

## Module 16 — EduSync for Medical Education (MedEdu)

Consolidated list of everything this module ships, adapted from the **EduSync** platform feature set (`edusnycdemo`) to the medical-education context. Each entry names the source feature so nothing is invented silently.

---

## Table of Contents

- [Feature Matrix by Role](#feature-matrix-by-role)
- [Feature Deep-Dives](#feature-deep-dives)
- [Edge Cases & Rules Carried Over from EduSync](#edge-cases--rules-carried-over-from-edusync)
- [Deliberate Exclusions](#deliberate-exclusions)

---

## Feature Matrix by Role

| # | Feature | Student / Intern | Teacher | Registrar | DGME / BMEAC | EduSync source |
|:---:|:---|:---:|:---:|:---:|:---:|:---|
| 1 | Dashboard (course overview, due items, next duty) | ✅ | ✅ | — | — | Student/Teacher dashboard |
| 2 | Course catalog & offerings (phase courses, sections, rotations) | ✅ view/enroll | ✅ create/manage | ✅ CRUD | ✅ read | Course Catalog (§21B) |
| 3 | Enrollment & roster | ✅ self-enroll | ✅ view enrolled | ✅ bulk enroll | ✅ read | Student enrollment |
| 4 | Assignments: create → submit → grade (with late penalty) | ✅ | ✅ | — | — | Assignments hub (§34) |
| 5 | Grading queue (batch, oldest-first, rubric) | — | ✅ | — | — | Submission Grade |
| 6 | **Timed auto-graded quizzes** (MCQ/EMQ, randomized order, server clock, window) | ✅ | ✅ | — | — | Timed Quiz |
| 7 | Quiz authoring (bank, answer keys, per-item analytics) | — | ✅ | — | — | Quiz Authoring |
| 8 | Online lectures (upload/record/stream, view analytics) | ✅ | ✅ | — | — | Online Lectures |
| 9 | Study groups (chat, share boards, join per phase) | ✅ | ✅ | — | — | Study Groups |
| 10 | 1:1 direct chat (Socket.IO realtime) | ✅ | ✅ | ✅ | — | Inbox & Chat |
| 11 | Public resources (versioned guideline/PQ/protocol library) | ✅ | ✅ publish → moderation | ✅ moderation view | ✅ read | Public Resources |
| 12 | GPA/CGPA transcript | ✅ | ✅ per offering | ✅ per batch | ✅ aggregate | GPA/CGPA |
| 13 | Routine & roster view + half-open interval conflict warning | ✅ (own only) | ✅ (own + department) | ✅ | — | Routine (§ invariant) |
| 14 | Duty roster for interns (night shifts, ER blocks) | ✅ own | ✅ department | ✅ tenant | ✅ read | *new*, extends Routine |
| 15 | Audit log viewer (append-only) | — | — | ✅ | ✅ | Audit Log Viewer (§80) |
| 16 | Moderation queue for public uploads | — | — | ✅ | — | Moderation Queue |
| 17 | Account suspension (instant, reason logged) | — | — | ✅ | review | Account Suspensions |
| 18 | User verification (identity → med-college tenant) | — | — | ✅ | ✅ cross-check | User Verification |
| 19 | Super-Admin invisibility in People search (404 not 403) | ✅ enforce | ✅ enforce | subject | — | §80 invariant |
| 20 | Gmail OAuth / SMTP admin mail config | — | — | ✅ | — | Gmail OAuth Config |
| 21 | System health panel | — | — | ✅ | ✅ | System Health |
| 22 | Cross-tenant evidence pack export (signed manifest) | — | — | initiate | ✅ receive | *new, shared spine with Mod. 15* |
| 23 | Case-discussion federation into clinical chat rooms | ✅ | ✅ | — | — | *new, links Modules 02/05* |
| 24 | Grievance / harassment reporting (escalates via Module 14) | ✅ | ✅ | ✅ handle | ✅ review | Authority/Grievance portal |

---

## Feature Deep-Dives

### 1. Timed auto-graded quizzes — the professional-exam mimic
- Window opens by cron (manual override), server-authoritative clock; a dropped connection resumes the same attempt with time running, never resets it.
- Randomized item order per attempt; per-item analytics (`p-value`, discrimination index) auto-computed at close.
- **Why it matters:** it's the first item-analysis tool Bangladeshi quiz banks have ever had — item quality, not guessing.

### 2. Grading queue
- Rubric pane beside submission; batch grade; auto-notification fan-out on publish.
- Late submissions arrive tagged with computed penalty (late-penalty reaper enforces on close + 6h).

### 3. Lectures against the 43% vacancy
- Recorded lecture upload → public resources; view analytics show what was *rewatched* (per-minute engagement optional on file).
- Live-stream fallback for mandatory classes when a section has no full-time teacher.

### 4. Duty roster (the Routine adaptation)
- The student/intern's routine view is strictly the authenticated user's (inherited rule — even a Super-Admin gets, at most, a read-only, de-identified view; § invariant from EduSync).
- Half-open interval conflict warning: `[start, end)` comparison — shift boundary at 08:00 exactly does not collide with the previous shift ending 08:00 the same morning, but any true overlap warns with the clash window shown.
- Interns: exports duty history for Module 15 (procedures happen during shifts → procedure IDs link timestamps to that roster row).

### 5. Public resources with moderation
- Registrar moderates uploads; once approved, an item is *versioned* — the June clinical guideline edit becomes July v2, never an overwrite. Old versions stay linked for citation.

### 6. GPA/CGPA + transcript
- Per-offering grades aggregate into students' cumulative transcript, used by PG shortlisting; BMEAC evidence packs pull the same records.

---

## Edge Cases & Rules Carried Over from EduSync

| Area | Edge cases handled | Rule / invariant |
|---|---|---|
| Enrollment | Re-enroll same offering → idempotent, not duplicate row; closed offering → `403 rather than 400` message clarity | § enrollment invariant |
| Submission | File >25MB, virus-scan pending, wrong-offering post → rejected with reason in response body | Attachment handler |
| Quiz | Attempt window miss → `EXPIRED`, auto-score only answered items; no rebuild of the clock on client crash | Quiz engine |
| Live chat | Rate limit, keep JOIN/PART/UNREAD events out of the historical replay; 30-day scrollback cap | Realtime bridge design |
| People 404 vs 403 | Non-admin querying registrar → **404 Not Found** (never 403) | §80 invariant (feature 19) |
| Audit logs | Any admin write, suspension, config change → append-only row with actor, reason, tariff | §80 invariant (feature 15) |
| Authority scope | DGME officer can never see another tenant unless assigned; fail-closed on filter predicates | Auth portal invariant (feature 24 origin) |
| Suspension | Session-instant invalidation; fresh login attempts get a clear suspension notice + appeal email | Account lifecycle |

---

## Deliberate Exclusions

**Not in scope for MedEdu v1:**

- **Full LMS feature parity with Moodle/Canvas** — video hosting, SCORM packages, enrollment payment rails. We deliberately skip it; the module is *course operations + assessment + resources*, not yet a content engine. Lectures attach; a course site builder waits for post-pilot demand.
- **Super-Admin invisibility override for export** — evidence exports run through a queued job that strips identity in aggregate.
- **Campus-wide social feeds / dating of any lost-and-found style interaction beyond grievance** — the domain is medical training; Lost & Found's portal is a distinct future variant.
- **Native mobile apps in v1** — same PWA strategy as Modules 15's argument: installable, offline-shell for library and schedule; native deferred until Wi-Fi district data proves necessity.

Every exclusion is re-evaluated after the first college-tenant pilot.
