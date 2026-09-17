# Upgrade Astra Portfolio — Skills Showcase & GSAP Animation Enhancement

Merge the rich content, editorial skills presentation, and animation patterns from the source Portfolio-master into the modern Vite+React Astra portfolio.

---

## Comparison Summary

| Feature | Astra (current) | Portfolio-master (source) |
|---|---|---|
| **Framework** | Vite + React 19 + GSAP + R3F + Tailwind | Vanilla JS + Babel JSX + Lenis + custom motion engine |
| **Skills UI** | 3D node graph (`SceneShell`) + tabbed skill list | Horizontal scroll-pinned panels with category cards, CLI-style headers, chip tags |
| **Animations** | Basic GSAP `reveal` (fade+slide), hero stagger | Full rAF loop: parallax, magnetic buttons, aurora BG, marquee, sticky-stack, counters, 3D tilt |
| **Sections** | Hero, Work, Systems (skills), Log, Contact | Hero, Profile, Skills (horiz), Skill Graph, GitHub, Work (sticky-stack), Reel, Experience, Console, Credentials, CV, Contact |
| **Missing in Astra** | Tech marquee, horizontal scroll skills, counter animations, magnetic hover, theme studio, cmd-K palette, Lenis smooth scroll |

---

## Proposed Changes

### 1. Data Layer — `src/data.js`

- Add `flatSkills[]` — 4-category skill data (Core Languages, Frameworks & Mobile, AI & Automation, Engineering & Tools) with `cat`, `cmd`, and `items[]`.
- Add `marqueeWords[]` — tech keywords for the auto-scrolling strip.
- Enrich `projects[]` — add `highlights[]`, `role`, and `reel` fields from source.
- Sync identity roles: `["App & Web Developer", "AI Explorer", "Competitive Programmer", "Full-Stack Developer", "Software Engineer"]`.

### 2. New Components

#### `src/components/SkillsMarquee.jsx` [NEW]
- Auto-scrolling tech keyword strip with duplicated chips.
- Pause/play button (WCAG 2.2.2).
- Gradient fade edges, accent-colored alternating items.

#### `src/components/HorizontalSkills.jsx` [NEW]
- Horizontal scroll-pinned skill panels via GSAP ScrollTrigger.
- Each category = full-viewport card with index, title, CLI command badge, chip-tag grid.
- Respects `prefers-reduced-motion` — falls back to vertical stack.

#### `src/hooks/useMagnetic.js` [NEW]
- Magnetic hover effect hook (buttons pull toward cursor).

#### `src/hooks/useCountUp.js` [NEW]
- ScrollTrigger-driven animated counter hook.

### 3. GSAP Animation Upgrades — `src/App.jsx`

- **Counter animations** — metrics count up from 0 on scroll enter.
- **Mask-reveal staggers** — enhanced clip-path section reveals.
- **Parallax scroll** — subtle translateY on hero visual and decorative elements.
- **Magnetic hover** — CTA buttons and nav links pull toward cursor.
- **Lenis smooth scroll** — buttery scroll feel synced with ScrollTrigger.

### 4. App Layout — `src/App.jsx`

- Insert `<SkillsMarquee />` between metrics and work sections.
- Add `<HorizontalSkills />` as new section between marquee and existing 3D graph.
- Update navigation: add `{ id: "skills", label: "Skills" }`.

### 5. Styles — `src/styles.css`

- `.marquee` — infinite translateX animation, gradient masks, pause state.
- `.skills-section` — horizontal scroll container, pinned sticky for GSAP.
- `.skill-panel` — category cards with grid layout, CLI badge, chip items.
- `.chip` — skill tag pills (border, rounded, hover glow).
- Counter number styling (tabular-nums, display font).
- Magnetic button utility class.
- Mask-reveal clip-path keyframes.
- Lenis body scroll overrides.
- Responsive: horizontal scroll → vertical stack below 981px.

### 6. Dependencies — `package.json`

- Add `"lenis": "^1.1.14"`.
- GSAP (`^3.12.7`) + ScrollTrigger already installed.

---

## Open Decisions

- [ ] Keep both horizontal panels + 3D graph, or replace?
- [ ] Add Lenis smooth scroll or keep native?
- [ ] Add cmd-K command palette?
- [ ] Add theme studio (accent colour picker)?

---

## Verification

- `npm run build` — no errors.
- `npm run dev` — visually confirm all animations, responsiveness, reduced-motion fallback.
