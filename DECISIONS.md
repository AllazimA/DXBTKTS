# DXB TKTS Build Decisions

## Project Scope & Architecture

### 1. i18n Implementation
**Decision:** Use `next-intl` with app router localization pattern.
**Why:** Best-in-class Next.js 14 i18n support, automatic language routing, minimal boilerplate. Full RTL support for Arabic built-in.
**Implications:** Requires middleware for locale detection and routing; all pages nested under `[locale]` folder.

### 2. Styling Approach
**Decision:** Tailwind CSS with DXB theme tokens in `tailwind.config.ts`.
**Why:** Keeps design tokens centralized and editable. Atomic utilities ensure consistency across components.
**Implications:** All colors use `dxb-*` namespace; ensures luxury brand is maintained throughout codebase.

### 3. Typography
**Decision:** Cormorant Garamond (serif, via `next/font`) for headlines; Inter (sans) for body.
**Why:** Cormorant is elegant and restrained—befits luxury brand. Inter ensures readable body copy at small sizes. Both loaded from Google Fonts with subsetting.
**Implications:** Slight initial font load, but cached by browser; negligible performance impact.

### 4. Theme Colors
**Decision:** Palette locked to 7 core colors + neutral variants:
- `ink` (#0E1B2C) — primary text
- `navy` (#13294B) — section backgrounds, footer
- `gold` (#B08D3F) — accent, CTAs
- `ivory` (#FBFAF7) — page background
- `band` (#F3F1EC) — card/section backgrounds
- `slate` (#5A6B7B) — secondary text
- `white` — premium negative space

**Why:** Adheres to the copy/assets spec exactly. Antique gold (not bright) signals luxury restraint.
**Implications:** All new components must use only these tokens; ensures visual cohesion.

### 5. Copy & Imagery
**Decision:** Created `DXB_TKTS_Homepage_Copy_and_Assets.md` as single source of truth for all marketing text, testimonials, partner logos, and image URLs.
**Why:** Non-technical founder can edit copy without touching components. Images stored in manifest for easy swapping.
**Implications:** Components reference a structured copy file; requires discipline to not hardcode marketing text in JSX.

### 6. Component Structure
**Decision:** Atomic component hierarchy:
```
components/
  ui/               — Reusable primitives (buttons, cards, badges)
  sections/         — Full-width page sections (hero, services, testimonials)
  layout/           — Header, footer, locale switcher
  forms/            — Enquiry, request forms
```

**Why:** Enables rapid page assembly; clear reusability patterns.
**Implications:** Each component self-contained with props; minimal prop drilling.

### 7. Content Management
**Decision:** Copy in `messages/` (i18n) and `lib/content/` (editable structured data); no CMS yet.
**Why:** Fast iteration; no backend dependency for initial launch. Later: integrate Sanity or similar.
**Implications:** Every content change requires code commit; suitable for launch phase, not long-term.

### 8. Authentication (Portals)
**Decision:** Scaffold only—no real auth yet. Placeholder layout + mock data in `/lib/mock/`.
**Why:** Allows route structure and UI design without backend dependency; ready for NextAuth or Clerk later.
**Implications:** Portal routes are public but look gated; auth logic will drop in later.

### 9. Form Handling
**Decision:** React Hook Form + Zod for validation; forms post to typed API routes.
**Why:** Lightweight, type-safe, minimal dependencies. Zod ensures shared validation logic.
**Implications:** API routes mock success now; ready to wire to Zoho CRM via env vars.

### 10. Animations
**Decision:** Framer Motion for scroll-triggered and entrance animations only.
**Why:** Library already in deps; scroll detection via native Intersection Observer; respects `prefers-reduced-motion`.
**Implications:** No looping or constantly-running animations (violates luxury restraint principle).

### 11. SEO Strategy
**Decision:** Next.js Metadata API (per-page metadata); JSON-LD structured data for org/service/local business; automatic sitemap via Next.js 14.
**Why:** Built-in, no extra deps. Avoids hard-coding same metadata in multiple places.
**Implications:** Each page must export metadata object; add `sitemap.ts` to `app/` root for dynamic generation.

### 12. Accessibility
**Decision:** WCAG 2.1 AA target. Semantic HTML, ARIA where needed, visible focus states, color-contrast checked (gold-on-light passes at AAA).
**Why:** Luxury brand signals competence, including to assistive-tech users. Legal compliance.
**Implications:** All images require meaningful alt text; forms must have explicit labels; test with axe.

### 13. Deployment Target
**Decision:** Vercel.
**Why:** Next.js native; auto-deploys from git; free tier sufficient for launch; serverless API routes run at edge.
**Implications:** Env vars managed in Vercel dashboard; `vercel.json` can override defaults if needed.

### 14. Branching & Versioning
**Decision:** No versioning on main. Main = production branch; all work on feature branches; PRs reviewed before merge.
**Why:** Keeps deployment simple. Squashing commits keeps history clean.
**Implications:** No `v1.0.0` tagging until post-launch review.

---

## Page Decisions

### Homepage
- **Hero design:** Full-bleed, parallax-friendly. Eyebrow label (all-caps, gold). Headline in Cormorant Light, 7xl on desktop.
- **Trust stats:** 3-column, sticky until scroll past. Uses large serif numbers.
- **Services grid:** 7 cards; image + heading + 1-line description. Hover state lifts card slightly.
- **Testimonials:** 3 real-client quotes (placeholders now); no star ratings (luxury doesn't need five-star affirmation).
- **Partner logos strip:** Horizontal scroll or static grid; partners marked as "Trusted by" not "Powered by."

### Services
- **Index:** Grid of 7 service cards (from copy file). Links to individual detail pages.
- **Detail page:** Problem → Solution → What's Included → CTA. Regulated services flagged with partner-delivered note.

### Membership
- **3-tier comparison:** Signature (entry) / Privé (mid) / Noir (UHNWI). 
- **Pricing:** Displayed as "From X" or "On Application"—never retail pricing.
- **Benefits:** Bulleted, but no "vs. competitor" language.

### Corporate
- **Headline:** Focus on executive wellness + retention + duty of care.
- **Form:** Company name, role, team size, custom message. Routed to corporate enquiry API.

### About
- **Story:** 20+ years, regional credibility, philosophy of anticipation.
- **Founder:** Brief professional bio (placeholder photo). Emphasizes discretion, not celebrity.

### Contact / Application
- **Multi-step form:** Name → Preferred contact → Interest (dropdown) → Message → Submit.
- **Confirmation:** Email + SMS (WhatsApp) confirmation sent to member.

---

## Technical Debt & Future Work

- **CMS Integration:** Replace `content/` structure with Sanity CMS once volume of editable copy grows.
- **Real authentication:** Wire NextAuth or Clerk when portals go live.
- **Zoho CRM:** Replace API stubs with real CRM integration; currently mocked at `/api/enquiry`.
- **CDN for images:** Add Cloudinary or similar for image optimization & A/B testing.
- **Analytics:** Wire Mixpanel or Plausible (privacy-first).
- **SMS/Email templates:** Design HTML email templates for confirmations.
- **Compliance:** Add GDPR banner, DPA, data retention policies.

---

## Testing & QA Gates

- **Lighthouse:** Target ≥95 desktop, ≥90 mobile (Performance, SEO, Accessibility, Best Practices).
- **Axe:** Zero accessibility violations.
- **RTL testing:** Arabic version of homepage renders correctly (direction, text alignment, component mirroring).
- **Mobile:** Responsive from 320px to 2560px; no horizontal scroll.
- **Performance:** First Contentful Paint <2s, Largest Contentful Paint <3.5s on 4G.

---

**Last Updated:** 2026-06-21  
**Next Review:** After Phase 2 (Design System) is complete.
