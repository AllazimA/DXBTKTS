# DXB TKTS — Website Audit Report

**Report 1 of 7** · Audit date: 18 November 2026 · Site audited: `http://localhost:3006/` (project folder `DXBTKTS/`)
**Status:** Audit only. No website file was modified, no dependency installed, nothing deployed, no form submitted.

### Evidence labels used in all seven reports

| Label | Meaning |
|---|---|
| **[V] Verified** | Seen directly in the code, in the running local site, or on a competitor's live page on 18 Nov 2026 |
| **[O] Observation** | My professional reading of verified evidence |
| **[R] Recommendation** | What DXB TKTS should do |
| **[A] Assumption** | Taken as true for planning; must be confirmed |
| **[U] Unverified** | Claimed somewhere but could not be checked |

### How this audit was done

- Read the full source tree: `app/`, `components/`, `messages/`, `data/`, `lib/`, configuration, git history and the existing project docs.
- Browsed every route on the running dev server (port 3006, already running) at desktop (≈800–1024 px pane) and mobile (375 × 812) widths.
- Fetched every route programmatically to record HTTP status, `<title>`, meta description, H1 count, canonical tag, hreflang and structured data.
- Read the browser console and checked for broken images and horizontal overflow.
- Ran a TypeScript check (`tsc --noEmit`): **no type errors** [V].
- **Not done (by instruction):** the request and contact forms were inspected but not submitted. One earlier test record (`"Verify Test"`, 3 July 2026) already exists in `data/enquiries.jsonl`, which shows the request form has worked locally before [V].

---

## 1. Executive verdict

**Overall score: 4.1 / 10.** The site is a well-made *brand brochure* for an invitation-only UHNW concierge. It is not yet a business that can sell anything.

| Area | Score /10 | One-line reason |
|---|---|---|
| Visual craft and polish | 7 | Coherent ink/gold/ivory system, good type pairing, smooth motion, no console errors |
| Brand positioning fit with your new vision | 3 | "By invitation", "never sold", UHNW language contradicts a bookable marketplace |
| Commercial capability (catalogue, prices, booking, payment) | 0.5 | No products, no prices, no availability, no checkout. Only one request form |
| Trust and credibility | 2 | Unverifiable stats and testimonials, no company identity, placeholder social links, broken WhatsApp link |
| Technical SEO | 2.5 | Every page canonicalises to the homepage, no sitemap, no robots.txt, no structured data, untranslated metadata |
| Technical foundation (Next.js app) | 6 | Modern, type-clean, i18n-ready; but carries three other projects' code and assets |
| Mobile experience | 5.5 | No overflow; but the homepage is 14,600 px long, the hero text animates in late, and the main nav is a hamburger below 1,280 px |
| Lead handling and operations | 1.5 | Enquiries are written to a local file with no notification; no CRM; no DXB TKTS back office exists |
| Accessibility basics | 6 | All images have alt text, one H1 per page, labelled form fields; motion-heavy, gold-on-ivory contrast to be checked |
| Legal and policy pages | 2.5 | Generic three-section stubs; no cancellation, refund or booking terms; no company name or licence |

---

## 2. What the project actually is

| Item | Finding |
|---|---|
| Framework | Next.js **14.2.5** App Router, React 18, TypeScript, Tailwind CSS 3, Framer Motion 11, `next-intl` 4 [V] |
| Languages | English (default, no prefix), Arabic (RTL, `/ar`), French (`/fr`) — `localePrefix: 'as-needed'` [V] |
| Fonts | Cormorant Garamond (display) + Inter (body), via `next/font` [V] |
| Content source | `messages/en.json`, `ar.json`, `fr.json` and `data/journal.ts` [V] |
| Data store | None. Enquiries are appended to `data/enquiries.jsonl` [V] |
| Hosting config | `.vercel/project.json` still names the Vercel project **`ahmed-allazim-portfolio`**; `netlify.toml` also present [V] |
| Live domain | `dxbtkts.com` is referenced in metadata. I could not resolve the domain from this machine (DNS lookups timed out), so whether it is registered and live is **[U]** |
| Git | Repository present, last commit renames `Portfolio → DXBTKTS`; 20+ modified and 9 untracked files uncommitted [V] |

### 2.1 Foreign code and assets inside the DXB TKTS project [V]

The folder is a former personal portfolio that also hosted other projects. This is the single biggest technical-hygiene issue.

| Foreign item | Where | Risk |
|---|---|---|
| **Lavish Morocco** site: 6 pages, 13 components, CSS, 25 images, logos | `app/lavish-morocco/`, `components/lavish/`, `public/lavish/`, `lavish-deploy/` | Brand confusion; the route currently returns **404** under the i18n middleware, so it is dead code |
| **Lavish Morocco API routes** that email `contact@lavishmorocco.com` and push leads to the Lavish Concierge CRM on port 3002 | `app/api/contact/route.ts`, `app/api/intake/lavish-morocco/route.ts` | A DXB TKTS deployment would carry another business's lead pipeline and secrets. `/api/contact` also inserts form values into email HTML **without escaping** (HTML-injection risk) |
| **Lavish image used on the DXB TKTS homepage** — `"/lavish/Desert caravan at golden hour.png"` | `components/sections/gallery.tsx` line 20 | A Moroccan desert image presented as "Into the Dunes" in Dubai |
| **WealthOS / Atlas Wealth** finance-app residue | `wealthos-deploy/`, `out/wealthos/`, `lib/alphaVantage.js`, `lib/twelvedata.js`, `lib/coingecko.js`, `lib/firebase*.ts`, `uae-financial-calculator.html`, `ATLAS_WEALTH_DEPLOYMENT.md` | Dead code and env vars for market-data keys |
| **SEC data proxy routes** | `app/sec-data/…`, `app/sec-www/…` | Unrelated open proxy to `data.sec.gov` |
| **Portfolio residue** | `components/About.tsx, Projects.tsx, Skills.tsx, Experience.tsx…`, `data/projects.ts, skills.ts`, `public/images/Ahmed*.png`, `index.html`, `main.js`, `styles.css` | Personal photos and CV content in a commercial site |
| **Third-party brand logos** — Amex, Hilton, FAB, Quintessentially, International SOS | `public/images/logos/` | Not rendered today [V], but shipping them invites someone to display partnerships that do not exist |
| **Unused heavy dependencies** — Firebase + firebase-admin, Stripe, PayPal, Cal.com, Calendly, EmailJS, Resend, jsPDF, html2canvas, xlsx, recharts, moment, lodash, ~35 Radix packages | `package.json` | Bigger installs, more security advisories; none are wired to DXB TKTS features |
| **Broken video file** — `public/videos/about-bg.mp4` is 111 bytes and contains an S3 `AccessDenied` XML error, not video | `public/videos/` | Any future use will fail silently |
| **Wrong launch configs** — `nexus-crm`, `atlas-wealth`, `wealthos-deploy`, `financeos` in `.claude/launch.json`; `nexus-crm/` does not exist | `.claude/launch.json` | Confusion; not a site issue |

**[R]** Before any redesign, remove everything above in one clean-up commit (see Roadmap Stage 1.1). The Lavish Morocco site and its API already live in their own project (`Lavish Morocco/`, `ConciergeCRM/`); nothing in DXB TKTS should reference them.

---

## 3. Page-by-page audit

Every route below returned **HTTP 200** unless stated [V]. Console showed **no errors** on any page tested [V]. No broken images were found on rendered pages [V].

### 3.1 Home `/` — score 4.5/10

**Structure [V]:** Hero (Ken Burns still image, not video) → What We Do (3 promises) → Philosophy → Signature Services (6 image cards) → Experiences (2 editorial stories) → Clientele (3 tiers) → Testimonials (3) → Gallery (5 images) → CTA band.

| Strengths | Weaknesses |
|---|---|
| Strong art direction: dark ink header, generous spacing, a believable luxury tone | **No product, price, date picker or search anywhere.** The visitor cannot see what can be bought or what it costs |
| Copy is well written and consistent in tone | Hero CTA "Request an Invitation" and "Chat on WhatsApp" — both are dead ends for a tourist wanting a safari on Friday |
| Single H1, full alt text, no console errors | **Hero stats "20+ Years of Luxury Service · 500+ Vetted Global Partners · 24/7"** have no evidence in the project — see §5 |
| Mobile has no horizontal scroll | WhatsApp button links to `https://wa.me/971?text=…` because `NEXT_PUBLIC_WHATSAPP_NUMBER` is not set in `.env.local` — **the main conversion channel is broken** |
| | Hero is a still Unsplash image with a 14-second zoom; on mobile the first screenshot shows only the skyline because the text fades in after a delay |
| | Homepage height: ~8,350 px desktop, **~14,630 px on mobile** — too long for a page that sells nothing |
| | Scroll-reveal animations (`whileInView`) leave large blank dark bands when scrolling quickly (seen in testing) |
| | Seven of the images are hot-linked from `images.unsplash.com`; one is a Lavish Morocco image |
| | "Private Aviation", "Exclusive Stays", "Off-market real estate" are promoted although there is no evidence of supplier capability for them |

### 3.2 Services `/services` — 3.5/10
Four pillars (Lifestyle Concierge, Exclusive Access, Travel & Mobility, **Real Estate & Investments**), animated stats (**500+ experiences, 50+ partners, 24/7, 98% client retention**), Featured Experiences carousel, Why Choose Us, testimonials, CTA.
- **[O]** This is a category description page, not a catalogue. Every CTA goes to `/request`.
- **[O]** Real-estate and investment introductions are a different regulated business (RERA brokerage licence in Dubai) and dilute the experiences proposition.
- **[O]** The 98% retention statistic is a quantitative claim with no source.

### 3.3 Membership `/membership` — 3/10
Three tiers, **Signature / Privé / Noir**, "by application / by invitation / by referral only", **no prices**, no service limits, no response-time commitments, CTA to `/request`.
- **[O]** Copy promises "Unlimited lifestyle management", "Dedicated lifestyle manager on a direct personal line", "medical, legal, security specialist network". These are operational commitments a new business cannot yet staff.
- **[O]** Compared with Private Concierge UAE, which publishes AED 18,000 and AED 48,000 annual fees with hour caps and response times (Report 2), this page gives the visitor nothing to decide on.

### 3.4 Corporate `/corporate` — 2.5/10
Hard-coded English (not translated), generic HR benefit copy, and **four stats — "95% Executive Satisfaction", "30% Retention Lift (avg)", "20+ Years", "500+ Vetted Partners"** [V]. The page is not linked in the main navigation (only via the homepage Clientele card).
- **[O]** "30% retention lift" is a measurable business-outcome claim; publishing it without data exposes the company to complaints under UAE consumer-protection rules and damages credibility with procurement teams, who will ask for the source.

### 3.5 About `/about` — 3/10
"Two Decades of Luxury Excellence", "20+ years", "curated network of 500+ partners", "bound by strict data protection protocols". **No founder, no team, no company legal name, no licence number, no address beyond "Dubai, UAE".**
- **[O]** The About page is where an overseas customer decides whether a stranger is safe to pay. Today it answers none of the questions they ask (who are you, are you licensed, where are you, who do I call).

### 3.6 Request `/request` — 5/10 (best page on the site)
Dark page, three promises ("Within the Hour", "Absolute Discretion", "No Request Too Rare"), form with **7 fields: name\*, phone\*, email\*, preferred contact\*, service\*, date, message** [V]. Posts to `/api/enquiry`.
- **Good:** short, mobile-friendly, `dir="ltr"` on phone and email for Arabic users, clear success state.
- **Gaps:** no number of guests, no budget band, no consent checkbox (the contact form has one), no spam protection, no confirmation email to the customer, and **no notification to anyone at DXB TKTS** — the lead is only appended to a file on the server's disk. On serverless hosting the code comments admit the write "fails silently" [V].
- **Promise risk:** "A personal response … within the hour — day or night" while `/contact` promises "within 24 hours" [V]. Two different SLAs on the same site.

### 3.7 Contact `/contact` — 4/10
Email, phone, WhatsApp, "Dubai, UAE", form with membership-tier interest options and a privacy-consent checkbox. Response time "within 24 hours".
- No physical address, no map, no business hours, no company name. Footer social links (Instagram, LinkedIn) point to `#` [V].

### 3.8 Journal `/blog` and `/blog/[slug]` — 5/10
Five well-written, trilingual editorial articles (e.g. "The Tables Worth Crossing the World For", "Dubai After Midnight, Properly Done") [V].
- **[O]** Good craft, wrong commercial intent: none of the articles links to a bookable product or targets a purchase-intent search ("private yacht Dubai Marina price"). Articles say "the address you never see listed" — the opposite of SEO.

### 3.9 Legal `/legal/privacy`, `/legal/terms`, `/legal/cookies` — 2.5/10
Short generic stubs. Terms contain four headings (agreement, membership terms, limitation of liability, governing law UAE) [V]. Missing: legal entity, licence, booking contract formation, pricing and VAT, payment, deposits, cancellation and refunds, supplier liability, force majeure / weather, complaints, data-protection basis under UAE PDPL (Federal Decree-Law 45/2021).

### 3.10 Portal `/portal`, Supplier `/supplier`, Styleguide `/styleguide` — 1/10
Public mock pages (`noindex`). The portal's three buttons link to `/portal/request`, `/portal/requests`, `/portal/profile`, all **404** [V]. The supplier page shows a "★★★★★" rating with no data. **[R]** Remove from production until real.

### 3.11 Arabic `/ar` and French `/fr` — 4/10
Copy is translated and RTL works (`<html lang="ar" dir="rtl">`) [V]. But page `<title>` and meta description stay in **English** on every localised page [V], and hreflang tags point only to the three homepages.

### 3.12 404s and missing routes [V]
`/experiences`, `/booking`, `/lavish-morocco`, `/portal/*` → 404. There is no catalogue, product, category, cart, checkout, account, FAQ or help route.

---

## 4. Technical SEO audit

| Check | Result | Severity |
|---|---|---|
| **Canonical tag** | `<link rel="canonical" href="https://dxbtkts.com">` is set in the **root layout**, so **every page — services, membership, each article, every Arabic page — declares the homepage as its canonical** [V] | **Critical**: tells Google to ignore every page except the homepage |
| hreflang | Root-level `en-US`, `ar`, `fr` pointing at locale homepages on every page [V]; English URL is unprefixed but hreflang points to `/en` | High |
| `sitemap.xml` | Not generated; request returns the homepage HTML (README claims it exists) [V] | High |
| `robots.txt` | Not present; request returns homepage HTML [V] | Medium |
| Structured data (JSON-LD) | **None** on any page (README claims Organization/LocalBusiness) [V] | High for a booking site (no Product/Offer/FAQ/Breadcrumb rich results) |
| Titles | Present, unique on main pages, but brand-led ("Luxury Concierge Dubai") not intent-led ("Private Yacht Charter Dubai from AED …") [V] | Medium |
| Meta descriptions | Present but generic; legal pages have 4-word descriptions [V] | Low |
| Headings | One H1 per page [V] | OK |
| URLs | Clean, but no product/category URLs exist | — |
| Images | `next/image` with Unsplash remote loader; alt text present [V] | OK |
| `metadata.viewport` / `themeColor` | Declared inside `metadata` — deprecated in Next 14 (should be `export const viewport`) [O] | Low |
| Open Graph image | None defined [V] | Medium (WhatsApp/Instagram link previews will be blank) |
| Analytics / conversion tracking | **None** — no GA4, GTM, Meta pixel or server events [V]. La Conciergerie runs GA4, Google Ads conversion tags, Snap pixel and Hotjar (Report 2) | High |
| Performance | Homepage HTML ≈ 98–100 KB; 7 remote hero/gallery images; dev-mode TTFB 20–95 ms warm, up to 2.4 s cold compile [V]. Core Web Vitals could not be measured reliably on the dev server — **re-measure on a production build** [U] | Unknown |

---

## 5. Trust and credibility audit

### 5.1 Unsupported claims currently published [V]

| Claim | Where | Evidence in project |
|---|---|---|
| "20+ Years of Luxury Service" / "Two Decades of Luxury Excellence" | Hero, About, Corporate | None |
| "500+ Vetted Global Partners" / "Curated network of 500+ partners" | Hero, About, Corporate | None — no supplier list, contract or database exists |
| "500+ Experiences Delivered", "50+ Global Partners", "98% Client Retention" | Services stats | None (and 500 vs 50 partners contradict each other) |
| "95% Executive Satisfaction", "30% Retention Lift (avg)" | Corporate | None |
| Three testimonials incl. "Private Member · Emirates Hills · Member since 2019" | Home, Services | None — these read as placeholder testimonials |
| "Response within the hour, 24/7" | Request, CTA bands | No staffing or rota evidence; contradicts "within 24 hours" on Contact |
| "Off-market penthouses", "private aviation", "family office integration" | Services, Membership | No supplier or licence evidence |

**[O]** These are the most serious finding of the audit. A first-time international visitor, a supplier doing due diligence, or a payment-gateway underwriter reviewing the site can each reject DXB TKTS for them. Fabricated testimonials and statistics can also breach UAE consumer-protection law (Federal Law 15/2020) and platform advertising policies (Google Ads misrepresentation policy).
**[R]** Remove every item in the table before the site is shown to anyone. Replace with verifiable facts (Report 5, §6; Report 6, §8).

### 5.2 Missing trust elements

Legal entity name · trade licence number · DET tourism licence (if required, see Report 3 §9) · physical office address · named founder/team · working WhatsApp number · real social profiles · booking terms · cancellation and refund policy · payment security statement · "what happens after you pay" explanation · genuine reviews (Google Business Profile, Tripadvisor) · complaints contact.

**Benchmark:** La Conciergerie states its legal entity (*LCD ORYZIA FZCO, Business Bay*) in its trust strip, on every product page and in the footer [V]. ABJ shows real past assignments with dates [V]. Both cost nothing and do more than any statistic.

---

## 6. Functional and operational audit

| Function | Status |
|---|---|
| Product catalogue | Absent |
| Prices | Absent (none on any page) |
| Availability / date selection | Only a free-text date field on the request form |
| Cart / plan / checkout | Absent |
| Payments | Absent. Stripe, PayPal SDKs installed; `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_PAYPAL_CLIENT_ID` names exist in `.env.local`; nothing uses them for DXB TKTS [V]. Values were not read |
| Lead capture | `/api/enquiry` validates 5 fields and appends JSON to a file [V] |
| Lead notification | None |
| Customer confirmation email | None |
| Spam / rate limiting | None on `/api/enquiry` |
| CRM | **None exists for DXB TKTS.** The Lavish Morocco Concierge CRM (`ConciergeCRM/`, port 3002) and Lavish Finance (`LavishFinance/`) belong to Lavish Morocco and were not used or assumed for DXB TKTS [V] |
| Admin / back office | None |
| WhatsApp | Broken (no number configured) |
| Analytics | None |

---

## 7. Accessibility and mobile

- **Good [V]:** alt text on all images; labelled inputs; `aria-label` on the mobile menu button; RTL handled with logical properties (`start-0`, `rtl:rotate-180`); no horizontal scroll at 375 px.
- **To fix [O]:** 
  - Desktop nav appears only at ≥1,280 px (`xl:`), so most laptops (1,024–1,279 px) and all tablets get a hamburger with seven text links.
  - Small gold uppercase text (`text-[10px]`/`[11px]`, letter-spaced) on ink and ivory is likely below WCAG AA contrast for small text; measure.
  - Heavy entrance motion; check `prefers-reduced-motion` is honoured in every `motion` component (DECISIONS.md says it is; not verified in each component).
  - The locale switcher is a non-semantic button with no `aria-expanded`.
  - No skip-to-content link.

---

## 8. Security basics

| Issue | Severity |
|---|---|
| `/api/contact` (Lavish) inserts unescaped user input into HTML email; CORS `*` | High (remove the route) |
| `/api/enquiry` has no rate limit, no bot protection, no input length limits | Medium |
| `/sec-data/*` proxy to an external API | Medium (remove) |
| `.env.local` holds keys for six unrelated services (values not read) | Medium — rotate any key that has ever been committed; keep only DXB TKTS keys |
| No security headers configured (CSP, HSTS, frame-ancestors) | Low–Medium |
| Portal/supplier pages public | Low |

---

## 9. Strongest existing features (keep)

1. **A modern, type-safe Next.js App Router base** with i18n and RTL already working — a correct foundation for a booking site; no reason to re-platform.
2. **A real visual system** (tokens, type scale, components) and a calm, premium tone that can be evolved rather than replaced.
3. **The request form and its UX** — short, mobile-friendly, the right pattern for quote-based concierge services.
4. **Trilingual content workflow** (EN/AR/FR) — French is commercially relevant (Western Europe is Dubai's largest source market, 21% of 2025 visitors [V, DET via WAM]).
5. **Editorial Journal** quality — reusable once re-pointed at bookable products.

## 10. Biggest weaknesses (fix first)

1. Nothing can be bought: no catalogue, prices, availability or payment.
2. Unverifiable statistics and testimonials across five pages.
3. Positioning ("by invitation", UHNW-only) contradicts the business model.
4. Every page canonicalised to the homepage; no sitemap, robots or structured data.
5. Leads are not delivered to anyone; WhatsApp link is broken.
6. Three other projects' code, assets and secrets live in the DXB TKTS repository.
7. No company identity, licence or booking terms.

## 11. Opportunities

- Convert the existing design language into a **catalogue + product template** quickly (Report 3, Report 5).
- Use the trilingual base for **French- and Arabic-speaking demand**, which the large marketplaces serve generically.
- Use the existing request flow as the **quote engine** for concierge requests, and add a fast **request-to-book** path for priced products.

Next: Report 2 benchmarks these findings against the eight reference sites.
