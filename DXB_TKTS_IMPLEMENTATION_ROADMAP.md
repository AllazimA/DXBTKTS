# DXB TKTS — Implementation Roadmap

**Report 7 of 7** · 18 November 2026 · Labels: **[V]** verified · **[O]** observation · **[R]** recommendation · **[A]** assumption · **[U]** unverified
**Nothing in this roadmap has been started.** Implementation begins only after your written approval.

---

## 1. Technology recommendation

### 1.1 Can the existing technology support booking? — Yes [O]
Next.js 14 App Router + TypeScript + Tailwind + next-intl is a sound base for a catalogue, checkout and admin. Type-check passes [V]. **No re-platforming.** What is missing is not the framework but: a database, a payment integration, an admin, email/WhatsApp messaging, and clean-up.

### 1.2 Target architecture — the simplest reliable option [R]

```
                   ┌─────────────────────────── Next.js app (one codebase, one deploy) ───────────────────────────┐
 Customer  ──────▶ │ Public site (EN/AR/FR): catalogue · product · plan · checkout · booking status · concierge form│
                   │ Route handlers: /api/bookings · /api/quotes · /api/payments/webhook · /api/availability        │
 Staff     ──────▶ │ /admin (auth, roles): products · suppliers · bookings · quotes · customers · payments · reports│
                   └──────────────┬──────────────────────┬───────────────────────┬──────────────────┬─────────────┘
                                  │                      │                       │                  │
                         PostgreSQL (managed)    Payment gateway (hosted    Transactional email   WhatsApp Business
                         single system of record  checkout + payment links  (DXB TKTS domain)     (app now, API later)
                         Prisma or Drizzle ORM    + webhooks; TBD §Report 3)
                                  │
                         Image/video storage + CDN (product media, hero film)
```

| Layer | Recommendation | Reason |
|---|---|---|
| Framework | Keep Next.js (upgrade to the current major only as a separate, tested step) | Working base |
| Database | **Managed PostgreSQL** (e.g. Neon, Supabase or the hosting provider's Postgres) + **Prisma** or **Drizzle** | Relational data (bookings ↔ suppliers ↔ payments); migrations; backups. **Use migrations only; never reset a database holding real bookings** |
| Admin | Inside the same app at `/admin`, protected by Auth.js (or Clerk) with roles (owner, operator, finance) | One codebase; no sync between systems |
| Payments | Gateway's **hosted checkout and payment links** + webhook to mark bookings paid | PCI scope minimal; works for both instant and on-request flows |
| Email | Transactional provider on a verified DXB TKTS domain (Resend is already a dependency) | Confirmations, payment links, reminders |
| WhatsApp | WhatsApp Business app at launch; WhatsApp Business API via a provider when volume justifies | Templates, labels |
| Media | Object storage + image CDN; `next/image` from own domain, not Unsplash hot-links | Rights control, performance |
| Analytics | GA4 (+ server-side purchase events), Meta/TikTok/Snap pixels behind consent; Search Console | Funnel measurement |
| Hosting | New hosting project named DXB TKTS (the existing Vercel link is named `ahmed-allazim-portfolio` [V]) | Clean separation |

### 1.3 Build vs buy the booking engine
| Option | Fit | Verdict |
|---|---|---|
| Tour-operator SaaS (e.g. Bókun, Rezdy, FareHarbor, TourCMS) | Built for operators managing **their own** inventory; some have reseller marketplaces | **Evaluate in Stage 3** for instant-confirm supplier connections only; features and fees not verified in this audit [U] |
| WooCommerce-style shop | Weak at on-request confirmation, deposits, supplier workflow | No |
| **Lightweight custom engine in the existing app** | Matches the hybrid model (on-request + instant + quotes), DXB TKTS keeps the customer record | **Yes** — scope is modest: ~10 tables, 3 flows |

### 1.4 CRM, finance and booking management
**Finding [V]:** there is **no DXB TKTS CRM, finance or admin application** in the workspace. `ConciergeCRM/` and `LavishFinance/` belong to Lavish Morocco and were not used or assumed. A DXB TKTS back office is therefore an **architectural requirement**, not an existing asset.
**[R]** Build it inside the DXB TKTS app (Stage 4), sharing the same database. *Whether to reuse code patterns from the Lavish CRM is your decision; if so, as a code copy with its own database — never shared data.*

**Core data model:**
`Customer` (one per person; dedupe on email + normalised phone) · `Supplier` (+ contacts, licences, terms, bank details) · `Product` / `Variant` / `Extra` / `PriceRule` / `Availability` (Report 3 §3) · `Booking` (header: customer, status, channel, language, UTM) · `BookingItem` (product/variant/date/qty/extras, **sell price, supplier cost, VAT, margin snapshot at time of sale**) · `Quote` / `QuoteItem` · `Payment` (gateway ID, amount, type deposit/balance/full, status) · `Refund` · `SupplierPayable` (amount due, due date, paid) · `Message` (email/WhatsApp log) · `Task` (follow-ups) · `AuditLog`.

**Workflow mapped to your diagram:**
| Step | System action | Duplicate protection |
|---|---|---|
| Customer selects product / submits request | `Booking` (status `requested`) or `Quote` created | Idempotency key per checkout submission |
| Profile created or matched | Match on email, then phone (E.164) | Unique index; merge tool in admin |
| Availability checked | Instant: allotment decrement in a DB transaction. On-request: operator task | Row lock on allotment |
| Provider confirmation | Operator records supplier ref + confirmation time | Status machine prevents skipping |
| Booking confirmed | After payment webhook (or instant) | Webhook event ID stored; processed once |
| Payment recorded | `Payment` row from webhook only — **never typed manually** except bank transfers (with reference) | Unique gateway transaction ID |
| Provider cost / commission tracked | Snapshot on `BookingItem`; `SupplierPayable` generated on completion | One payable per item |
| Customer notifications | Templates per status, logged in `Message` | Send-once flags per template per booking |
| Service completed | Status `completed` (operator or automatic next day) | — |
| Revenue & performance reported | Reports read from bookings/payments/payables | Single source; no spreadsheets as truth |

---

## 2. Stage plan

Complexity: **S** (days) · **M** (1–2 weeks) · **L** (3–6 weeks) for one developer working with Claude. Priority: **P0** (blocker) · **P1** · **P2** · **P3**.

### STAGE 0 — Business prerequisites (in parallel with Stage 1; owner: you)
| Item | Why | Acceptance |
|---|---|---|
| Confirm legal entity + trade licence activities | Needed for gateway, T&Cs, footer | Licence copy on file |
| **Confirm DET tourism licence requirement** for selling tours online | Launch blocker (Report 3 §7.6) | Written answer from DET or licensed adviser |
| VAT position (register? principal vs agent?) | Changes displayed prices | Adviser memo |
| Business WhatsApp number + domain email | Broken today | Working number on site |
| Sign first suppliers (2 per launch category) | Nothing to sell otherwise | Signed rate sheets + onboarding checklist (Report 6 §6.5) |
| Booking conditions, cancellation, privacy reviewed by UAE lawyer | Consumer protection, PDPL | Final texts |
| Three gateway quotes | Choose provider | Decision recorded |

### STAGE 1 — Brand and website foundation
**Business objective:** a credible, honest, fast site that can be shown to suppliers, gateways and customers.
| Feature / task | Technical tasks | Complexity | Priority |
|---|---|---|---|
| 1.1 Repository clean-up | Remove Lavish Morocco pages/components/assets/API routes, WealthOS, SEC proxies, portfolio files, unused deps, broken video, third-party logos; new hosting project; prune env vars; commit outstanding work first | M | **P0** |
| 1.2 Remove unverifiable claims | Delete stats, testimonials, "by invitation", membership tiers, real-estate pillar, unstaffed SLAs | S | **P0** |
| 1.3 Trust & contact | Entity/licence/address in footer; About rewrite; working WhatsApp; single response promise; real social links or none | S | **P0** |
| 1.4 SEO foundation | Per-page canonical + hreflang; `sitemap.ts`, `robots.ts`; Organization JSON-LD; localised metadata; OG images; `viewport` export | S | **P0** |
| 1.5 Lead pipeline fix | Store enquiries in the database (Stage 3 DB brought forward) or at minimum email notification + acknowledgement; rate limit + bot check | S | **P0** |
| 1.6 Brand system v2 | Tokens, typography incl. Arabic, buttons, cards, badges (Report 4 §3) | M | P1 |
| 1.7 New navigation + homepage skeleton | Report 5 §1–3 | M | P1 |
| 1.8 Cinematic hero | Concept A film (licensed/partner footage), poster, two encodes, reduced-motion & data-saver fallbacks | M | P1 |
| 1.9 Mobile pass | Sticky bars, chips, menu sheet, nav breakpoint | S | P1 |
| 1.10 Analytics + consent | GA4, Search Console, consent banner (equal-weight choices) | S | P1 |
**Dependencies:** Stage 0 entity/licence facts for 1.3; footage licence for 1.8.
**Expected benefit:** removes the reasons a customer, supplier or gateway would reject DXB TKTS; prepares for indexing.
**Acceptance criteria:** no page contains a claim without evidence; every page has a correct self-canonical; `sitemap.xml` and `robots.txt` return XML/text; WhatsApp link opens a real number; Lighthouse mobile ≥ 85 performance on production build; no foreign-project code in the repo; homepage LCP < 2.5 s on 4G throttling.

### STAGE 2 — Product catalogue
**Business objective:** customers can see what DXB TKTS sells and what it costs.
| Feature / task | Technical tasks | Complexity | Priority |
|---|---|---|---|
| 2.1 Data model | Product/Variant/Extra/PriceRule/Availability/CancellationPolicy schema + seed for 12 launch products | M | **P0** |
| 2.2 Category pages | 6 categories, filters, sort, SEO copy | M | **P0** |
| 2.3 Product template | Report 3 §4 layout; variants; extras; price-type wording; secondary currency | L | **P0** |
| 2.4 Plan (basket) | Persisted in local storage + server on checkout; multi-date items; running total | M | P1 |
| 2.5 Search | Client-side typeahead with synonyms | S | P2 |
| 2.6 Occasion pages | Couples, Family, Friends, Celebrations | S | P2 |
| 2.7 Structured data | Product/Offer (AED), FAQ, Breadcrumb | S | P1 |
**Dependencies:** signed suppliers and media for each product; Stage 1.6 components.
**Benefit:** every visit can now reach a priced product; paid search becomes possible.
**Acceptance:** 12 products live with real prices from signed rate sheets; each product passes the Report 6 onboarding checklist; price shown = price charged; Rich Results Test passes for Product and FAQ.

### STAGE 3 — Booking and payments
**Business objective:** turn intent into paid, confirmed bookings.
| Feature / task | Technical tasks | Complexity | Priority |
|---|---|---|---|
| 3.1 Checkout | Details → Review (itemised, VAT, deposit/balance, cancellation) → submit; guest checkout | M | **P0** |
| 3.2 Booking records & status machine | Report 3 §6.4 statuses; idempotency | M | **P0** |
| 3.3 Payment integration | Hosted checkout + payment links + webhook; deposits/balances; refunds API | L | **P0** |
| 3.4 Notifications | Email templates (request received, payment link, confirmed + voucher, reminder D-1, review request); WhatsApp templates | M | **P0** |
| 3.5 Availability rules | Lead time, cut-off, blackout, slots, allotments (for instant products) | M | P1 |
| 3.6 Quotes | Concierge brief form (Report 5 §7) → quote builder → proposal page → deposit link | M | P1 |
| 3.7 Cancellation/refund workflow | Policy evaluation, partial refunds, supplier cancellation path | M | P1 |
| 3.8 End-to-end test | Test-mode payments on localhost and a staging host; each flow: instant, on-request, quote, deposit+balance, cancel, refund, supplier-unavailable | M | **P0** |
**Dependencies:** gateway account approved (needs licence and clean site); legal texts; Stage 2.
**Benefit:** first online revenue; cash collected before service.
**Acceptance:** a test customer can complete all seven flows end to end in test mode; every payment appears exactly once; confirmation never sent before payment/instant; refunds reconcile to the gateway; voucher contains emergency contact.

### STAGE 4 — Administration and providers
**Business objective:** run operations without spreadsheets and know the margin on every booking.
| Feature | Complexity | Priority |
|---|---|---|
| 4.1 Admin auth + roles | S | **P0** (before taking real bookings) |
| 4.2 Booking inbox (by status, today/tomorrow views, supplier confirmation capture, payment link resend) | M | **P0** |
| 4.3 Product & pricing management (variants, extras, price rules, publish/pause) | M | P1 |
| 4.4 Supplier management (contacts, licences with expiry, terms, rate sheets, payables) | M | P1 |
| 4.5 Availability/allotment management | M | P1 |
| 4.6 Customer profiles (history, preferences, consent, merge) | S | P1 |
| 4.7 Commission/margin tracking + supplier payables | M | P1 |
| 4.8 Reports: bookings, revenue, gross contribution by product/supplier/channel, conversion funnel, refunds | M | P2 |
| 4.9 Daily supplier manifests (email/WhatsApp) | S | P1 |
**Dependencies:** Stage 3 records. **Benefit:** scalable operations; accurate margins.
**Acceptance:** an operator can process a request from arrival to completed and paid supplier without leaving `/admin`; the margin report matches the gateway payouts minus supplier payables for a test month.

> Note: 4.1–4.2 are needed *with* Stage 3 go-live; the rest can follow within 4–6 weeks.

### STAGE 5 — Marketing and commercial growth
| Feature | Complexity | Priority |
|---|---|---|
| 5.1 SEO landing pages (Report 6 §8.2 clusters), FR/AR product mirrors | M | P1 |
| 5.2 Journal guides tied to products | S (ongoing) | P2 |
| 5.3 Conversion tracking (server-side purchase events), pixels with consent | S | P1 |
| 5.4 Google Business Profile + review requests | S | P1 |
| 5.5 Paid search pilot (priority-A terms) | S | P1 |
| 5.6 Instagram/TikTok content system (product Reels) | ongoing | P1 |
| 5.7 Partner programme (hotel/advisor links, commission statements) | M | P2 |
| 5.8 Email marketing (post-trip, resident list) | S | P2 |
| 5.9 Retargeting audiences | S | P2 |
**Acceptance:** cost per paid booking measured by channel; ≥ 20% of completed bookings leave a review [A target]; organic sessions to product pages growing month on month.

### STAGE 6 — Advanced development (evidence-gated)
Membership pilot (Report 6 §5.1 gates) · customer accounts and booking history (magic-link) · loyalty/referral credits · supplier API integrations for instant confirmation · personalisation · corporate accounts with invoicing and credit limits · additional languages (DE, RU, ZH) · Abu Dhabi and RAK catalogues · marketplace distribution of own packages.
**Acceptance:** each item has a business case with measured demand before build.

---

## 3. Sequencing and indicative timeline [A]

```
Weeks  1  2  3  4  5  6  7  8  9 10 11 12
S0     ██████████████                         licence, VAT, suppliers, legal, gateway (you)
S1     ███████████                            clean-up, trust, SEO, brand, hero
S2           ███████████                      catalogue (needs signed suppliers)
S3                 ████████████               checkout, payments, notifications, quotes
S4                    ██████ ███████          admin (inbox with S3; rest after)
S5                             ████████████→  growth
```
**First real online booking:** realistic at **week 8–10**, governed by licence, gateway approval and supplier signatures rather than code.

---

## 4. Answers to the 23 executive questions

1. **Current quality?** A polished brochure for an invitation-only UHNW concierge — **4.1/10** as a commercial platform. Good craft, no commerce, and credibility undermined by unverifiable claims.
2. **Biggest weaknesses?** Nothing can be bought (no prices, products, booking or payment); fabricated-looking stats and testimonials; positioning contradicts the business model; every page canonicalised to the homepage; leads not delivered to anyone and WhatsApp broken; other projects' code in the repo; no company identity or booking terms.
3. **Strongest existing features?** Modern type-clean Next.js base with EN/AR/FR and RTL; coherent design system; a short, good request form; quality editorial writing.
4. **Best commercial model?** **La Conciergerie Dubai** — priced catalogue, extras, plan basket, request-to-book, legal entity on every page.
5. **Best booking experience?** Among concierges, **La Conciergerie** (live totals, plan basket); overall, **GetYourGuide** (instant, calendar, pay-later).
6. **Best pricing presentation?** **La Conciergerie** — variants, per-person translation, priced extras, minimums, worked examples.
7. **Best hero video and visual identity?** Hero sequence: **VIP Platinum**; execution and identity: **ABJ Agency**.
8. **Best membership strategy?** **Private Concierge UAE** — published AED 18,000/48,000 tiers with hour caps, SLAs and net pass-through of third-party costs.
9. **Adopt from each:** La Conciergerie — product model, plan, trust strip, extras. VIP Platinum — film sequencing. Private Concierge UAE — fee logic, caps, SLA wording. Le Concierge — resident/relocation partner channel. ABJ — editorial design, dated case studies, attribution fields. TopUp — category/city browse, product tabs. Sabrage — celebration packages, event staffing idea. GetYourGuide/Headout — cancellation clarity, pay-later, filters.
10. **Avoid:** unverifiable stats/reviews; promises the system can't keep; hidden prices; regulated side-services; scraped imagery; heavy video with controls; dead legal links; crypto; competing on commodity price.
11. **Direct online booking?** **Yes** — request-to-book with payment links at launch; instant confirmation where allotments/APIs exist; quotes for bespoke.
12. **10–15 launch products?** Provisional (no supplier data exists in the project): private yacht charter; sunset celebration yacht; jet ski; private desert safari; premium evening safari; dune buggy; hot-air balloon; helicopter tour; airport meet & greet + transfer; private chauffeur; private Abu Dhabi day trip; Burj Khalifa tickets; plus quote services (celebrations/proposals, dining, itineraries, corporate). Each goes live only with a signed supplier.
13. **Fixed-price?** Yachts by hour/boat, jet ski, buggy/quad, safaris, balloon, helicopter, transfers by zone/vehicle, chauffeur by hours, Abu Dhabi day trip by vehicle, tickets, standard extras.
14. **Quotation-based?** Multi-day itineraries, events/venues, large groups, bespoke proposals, restaurant arrangements at full venues, VIP event access, superyachts, corporate programmes.
15. **Membership?** **Not now.** Re-evaluate after the evidence gates in Report 6 §5.1; start with a free residents list.
16. **Final homepage?** Concept A hero film ("Book Dubai, privately.") → search → 6 priced categories → popular experiences → how booking works → occasions → private concierge → packages → why DXB TKTS (facts) → genuine reviews or dated Moments → corporate strip → 3 guides → final CTA → footer with entity and licence.
17. **Final navigation?** Experiences ▾ · Private Concierge · Transfers · Corporate & Groups · language · AED · Plan · WhatsApp. About/Help/Journal/Partners/Contact in footer.
18. **Technology?** Keep Next.js; add managed PostgreSQL + ORM; gateway hosted checkout + payment links + webhooks (provider chosen after quotes; Stripe's published UAE rate is the benchmark); transactional email on DXB TKTS domain; WhatsApp Business; admin inside the same app.
19. **Essential admin?** Booking inbox with status machine; supplier confirmation capture; payment link sending; product/price management; supplier records with licences and payables; customer profiles; margin and revenue reports.
20. **Five most important first changes?** (1) Remove unverifiable claims and foreign-project code; (2) fix canonical/sitemap/robots and the WhatsApp number; (3) resolve licence, VAT and gateway eligibility; (4) sign suppliers and publish 12 priced products; (5) launch request-to-book with payment links and an admin inbox.
21. **What can wait?** Membership, accounts, loyalty, supplier APIs, marketplace distribution, extra languages, extra emirates, ticketing, aviation, villas, real estate.
22. **How to compete with established concierges?** Published prices and online booking (they have neither), Dubai-experience focus, private/premium products marketplaces don't do well, proof instead of claims, fast WhatsApp service in EN/AR/FR.
23. **Most realistic route to first online bookings?** Sign 6–8 suppliers in yachts, desert and transfers → publish priced pages → send payment links after WhatsApp-confirmed availability → drive traffic with exact-match Google Ads on "private yacht charter dubai"-type terms and Instagram Reels of the actual boats → ask every customer for a Google review. Target: first paid booking within 2 weeks of products going live.

---

## 5. Completion checklist (section 21 of the brief)

| # | Check | Result |
|---|---|---|
| 1 | All seven reports exist | ✓ `DXB_TKTS_WEBSITE_AUDIT_REPORT.md`, `DXB_TKTS_COMPETITOR_BENCHMARK.md`, `DXB_TKTS_ONLINE_BOOKING_AND_PRICING_STRATEGY.md`, `DXB_TKTS_BRAND_AND_HERO_VIDEO_DIRECTION.md`, `DXB_TKTS_WEBSITE_STRUCTURE_AND_CUSTOMER_JOURNEY.md`, `DXB_TKTS_COMMERCIAL_AND_PARTNERSHIP_STRATEGY.md`, `DXB_TKTS_IMPLEMENTATION_ROADMAP.md` |
| 2 | All eight supplied websites researched | ✓ La Conciergerie, VIP Platinum, Private Concierge UAE, Le Concierge, ABJ, TopUp, Sabrage + GetYourGuide, Headout, Platinumlist (Report 2) |
| 3 | Original competitor research retained | ✓ Verified quotes, prices, file sizes and form fields recorded with source URLs |
| 4 | Booking and pricing detail | ✓ Data model, journey, confirmation logic, formulas, illustrative examples, payment rules (Report 3) |
| 5 | Dubai/UAE market | ✓ DET 2025 visitor data, UAE VAT/licensing flags, AED gateways |
| 6 | AED primary | ✓ Throughout; secondary currencies indicative only |
| 7 | Operationally realistic | ✓ Request-to-book first; instant only with allotments; staffing and supplier gates |
| 8 | Prioritised, actionable roadmap | ✓ P0–P3, dependencies, acceptance criteria |
| 9 | Limitations | See §6 |
| 10 | Executive summary | In the chat reply accompanying these reports |

## 6. Research limitations

- **No supplier data** exists for DXB TKTS; launch products and all DXB TKTS margins are provisional/illustrative.
- **dxbtkts.com** could not be resolved from this machine (DNS timeouts) — live-site status unverified.
- **Forms were not submitted** on DXB TKTS or competitors; competitors' post-submission and payment steps (confirmation messages, payment pages) could not be observed. La Conciergerie's WhatsApp send step was not triggered.
- **Core Web Vitals** were not measured on a production build of DXB TKTS (dev server only), nor on competitor mobile devices.
- **Keyword volumes** unavailable (SEO-tool connectors not authorised); keyword priorities are intent-based.
- **Headout's Dubai category page** redirected to its homepage in my session; GetYourGuide was reached after a bot check. Viator, Klook and local yacht/chauffeur booking engines were not studied in depth.
- **Licensing, VAT and gateway eligibility** are summarised from official pages and secondary sources and must be confirmed by DET, a tax adviser and the gateways.
- Competitor claims (years in business, network sizes, review counts) are recorded as **[U]** where not independently verifiable.
