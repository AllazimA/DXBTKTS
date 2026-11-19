# DXB TKTS — Website Structure and Customer Journey

**Report 5 of 7** · 18 November 2026 · Labels: **[V]** verified · **[O]** observation · **[R]** recommendation · **[A]** assumption · **[U]** unverified

---

## 1. Navigation

### 1.1 Today [V]
Home · About · Services · Membership · Request · Journal · Contact + language + "Enquire". Seven items, none of which is a product. Desktop nav appears only from 1,280 px wide. Corporate is not in the nav.

### 1.2 Recommended main navigation [R]

**Desktop (≤ 6 items):**
```
[DXB TKTS]   Experiences ▾   Private Concierge   Transfers   Corporate & Groups   |  EN ▾  AED ▾   ♡ Plan (2)   [WhatsApp]
```
- **Experiences ▾** opens a mega-menu: Desert · On the Water · Sky · Attractions & Tickets · Dining & Nights Out · Wellness · Day Trips — plus "Browse by occasion": Couples · Family · Friends · Celebrations — plus one featured product card.
- **Transfers** is a top-level item because it is the most frequent purchase and a gateway product.
- **About, Help & FAQ, Journal, Partners, Contact** move to the footer and the mobile menu.
- **Membership** is not in the navigation at launch (Report 6 §5). **My bookings** appears once accounts exist (Stage 6).

**Mobile:** header = logo · Plan icon · menu. Menu opens a full-screen sheet: search field → category list with icons → Private Concierge → Transfers → Corporate → Help → language/currency. Category chips also appear under the hero.

### 1.3 Your proposed structure vs the recommendation

| Your starting point | Recommendation | Reason |
|---|---|---|
| EXPERIENCES with 9 sub-items | Keep, merge Adventure & Outdoor into Desert/Sky, Water Sports into On the Water, Beach Clubs into Dining & Nights Out | Fewer, clearer buckets; each must have ≥ 3 products before it is shown |
| CONCIERGE (4 sub-items) | One page "Private Concierge" with sections (Celebrations, Dining, VIP, Itineraries, Events) | Quote-based work converts through one strong brief form, not four thin pages |
| TRANSPORT (3 sub-items) | "Transfers" top-level with Airport, Chauffeur, Intercity; Luxury car rental via partner later | Frequency and simplicity |
| MEMBERSHIP | Hidden until justified | Avoid selling what cannot be staffed |
| CORPORATE & PARTNERS | Split: "Corporate & Groups" (buyers) in nav; "Partners" (suppliers, hotels, agents) in footer | Different audiences |
| ABOUT, JOURNAL, CONTACT | Footer + mobile menu | Not purchase paths |
| BOOKING / MY ACCOUNT | "Plan" icon now; "My bookings" via emailed magic link later | Guest checkout converts better |

---

## 2. Sitemap

```
/                                   Home
/experiences                        All experiences (filters)
/experiences/desert                 Category
/experiences/desert/private-desert-safari     Product
/experiences/on-the-water           Category
/experiences/on-the-water/private-yacht-charter-dubai-marina
/experiences/sky
/experiences/attractions
/experiences/dining
/experiences/wellness
/experiences/day-trips
/occasions/couples | family | friends | celebrations   Occasion landing pages
/abu-dhabi                          Destination page (Stage 5), later /ras-al-khaimah
/transfers                          Transfers hub
/transfers/airport-dxb | airport-dwc | chauffeur-hourly | dubai-abu-dhabi
/private-concierge                  Concierge proposition + brief form
/corporate                          Corporate & groups (team events, client entertainment, incentives)
/partners                           For suppliers, hotels, travel advisors (application form)
/plan                               Plan (basket)
/checkout                           Details → Review → Pay (hosted)
/booking/[ref]                      Booking status & voucher (magic link)
/help                               FAQ, how booking works, payments, cancellations
/about                              Company, team, licences, how we choose partners
/contact
/journal  /journal/[slug]           Practical guides
/legal/terms  /legal/booking-conditions  /legal/cancellation  /legal/privacy  /legal/cookies
/ar/...  /fr/...                    Localised mirrors
```
Removed: `/membership` (redirect to `/private-concierge` for now), `/services` (301 → `/experiences`), `/request` (301 → `/private-concierge`), `/portal`, `/supplier`, `/styleguide` (not public), `/lavish-morocco`, `/sec-*`.

---

## 3. Homepage, top to bottom — with the commercial purpose of each section

| # | Section | Content | Commercial purpose |
|---|---|---|---|
| 1 | **Cinematic hero** | Concept A film, H1 "Book Dubai, privately.", sub, "Explore experiences" + "Plan with a concierge", chapter strip | Immediate impression + two paths (self-serve vs assisted) |
| 2 | **Search / discovery bar** | "What do you want to do?" (autocomplete across products and categories) + date (optional) + guests | Gets intent visitors to a product in one step |
| 3 | **Categories** | 6 tiles, "From AED X" | Browsing path; signals price level early |
| 4 | **Most-booked experiences** (labelled "Popular" until real sales data exists) | 8 cards | Direct product entry; highest click-through |
| 5 | **How booking works** | 3 steps + "nothing charged until confirmed" / "instant on selected experiences" | Removes the main fear for overseas buyers |
| 6 | **Shop by occasion** | Couples · Family · Friends · Celebrations · Corporate | Emotional entry; good ad landing targets |
| 7 | **Private Concierge band** | "Something more personal?" + 4 examples + CTA | Captures high-value quotes |
| 8 | **Featured packages** | 2–3 bundles (e.g. "Sunset yacht + dinner + chauffeur") | Raises basket size |
| 9 | **Why DXB TKTS** | Licensed Dubai company (name), real prices, a team on WhatsApp, vetted licensed partners | Trust — facts only |
| 10 | **Reviews** (only when genuine) or **"Moments"** case studies | Google/Tripadvisor widget or dated stories | Social proof |
| 11 | **Corporate & groups strip** | One line + CTA | B2B lead capture |
| 12 | **Journal** | 3 practical guides | SEO + nurturing |
| 13 | **Final CTA** | "Tell us your dates" form (name, WhatsApp, dates) | Last catch for undecided visitors |
| 14 | **Footer** | Categories, help, company (entity, licence no., address), payment logos, languages, social, legal | Trust and SEO |

**Special offers:** only add a section when an actual partner offer exists; otherwise omit.
**Length target:** ≈ 6 mobile screens to section 9.

---

## 4. Category and search experience

- **Category page:** hero strip (image, one-line intro, product count) → filter chips (Private / Shared · Duration · Price range · Time of day · Family-friendly · Instant confirmation) → sort (Recommended · Price low-high · Duration) → product grid → short SEO intro + FAQ at the bottom.
- **Search:** typeahead across product names, categories, areas and synonyms ("boat" → yacht, "safari" → desert). With fewer than ~60 products, **client-side search is enough**; no search service needed.
- **Filters:** only those with data behind them; hide a filter when < 2 options.

---

## 5. Product page architecture
Defined field-by-field in Report 3 §3–4. Structure: gallery → name/facts → price → options → booking panel → included → itinerary → meeting point → good to know → cancellation → FAQ → reviews → pair-it-with → concierge link.

---

## 6. Customer journey map and friction points

VISITOR → DISCOVERY → PRODUCT → TRUST → CUSTOMISATION → BOOKING → PAYMENT → CONFIRMATION → EXPERIENCE → REVIEW → REPEAT

| Stage | Today on DXB TKTS [V] | Friction | Fix [R] | Metric |
|---|---|---|---|---|
| **Visitor** | Arrives on a brand homepage; no ads, no SEO landing pages | Nothing matches purchase-intent searches | Product and category pages with intent titles; paid search to product pages | Sessions by landing page |
| **Discovery** | No catalogue, search or filters | Cannot find anything to buy | Categories, search, occasions | % sessions reaching a product page |
| **Product** | None | — | Product template with prices | Product → booking-panel interaction rate |
| **Trust** | Unverifiable stats, no entity, broken WhatsApp | Overseas buyer hesitates | Entity, licence, address, team, real reviews, clear policies | Bounce on product pages |
| **Customisation** | Free-text message only | Back-and-forth on WhatsApp | Variants, extras, live total | Add-to-plan rate; extras attach rate |
| **Booking** | Request form (7 fields) | No date/guests/price context | Booking panel → 2-step checkout | Checkout start → submit |
| **Payment** | None | — | Hosted checkout / payment link | Link-sent → paid % (target ≥ 70% [A]) |
| **Confirmation** | Success message only; no email | Customer unsure anything happened | Email + WhatsApp + voucher + "what happens next" | Support contacts per booking |
| **Experience** | — | Pickup confusion | Day-before reminder with driver/captain contact | On-time / incident rate |
| **Review** | — | No review collection | Request at +24 h to Google Business Profile / Tripadvisor | Review rate (target 20–30% [A]) |
| **Repeat** | — | No CRM | Post-trip email: "Next time in Dubai" + resident offers; referral code | Repeat rate, referrals |

### 6.1 Calls to action — one language
- Product: **"Book now"** (instant) or **"Request to book"** (on-request) — never "Enquire" on a priced product.
- Secondary: **"Add to plan"**. Tertiary: **"Ask on WhatsApp"** (prefilled with product name and date).
- Concierge: **"Start a request"**. Corporate: **"Get a proposal"**.

### 6.2 WhatsApp support
WhatsApp is the dominant service channel in the UAE and in every competitor reviewed [V]. Use the **WhatsApp Business** app (later the API via a provider) with: away message with hours, quick replies, labels per booking status, and a pre-filled message from every product page including the product and selected date. WhatsApp **supports** the booking; it is not the booking system — every confirmation and payment lives in the DXB TKTS record.

### 6.3 Cross-selling
- Product page: "Pair it with" (3 items).
- Plan: "Complete your trip" (transfer if none in plan; dinner if yacht is at sunset).
- Confirmation email: one relevant add-on with a direct "Add" link.
- Post-trip: "Next visit" recommendations.

### 6.4 Increasing completed bookings, not visits [R]
1. Prices visible → fewer unqualified chats.
2. Live total + clear "what happens next".
3. Fast confirmation SLA (target ≤ 2 h in service hours) and payment link sent automatically.
4. Abandoned plan recovery: if a customer entered WhatsApp/email and did not submit, one reminder after 1 h (with consent).
5. Payment-link reminders at 6 h and 20 h before expiry.
6. Measure the funnel end-to-end (GA4 events: view_item → add_to_plan → begin_checkout → request_submitted → payment_link_sent → purchase).

---

## 7. Bespoke enquiry form (Private Concierge)

**Visible fields (8, 3 required):**
| Field | Type | Required |
|---|---|---|
| Name | text | ✓ |
| WhatsApp number | phone with country picker | ✓ (email or WhatsApp — at least one) |
| Email | email | ✓ (as above) |
| What should we arrange? | chips: Celebration · Dining · Yacht/boat · Desert · Transfers & chauffeur · Itinerary · Corporate/group · Something else (multi-select) | ✓ |
| Date(s) | date or range, "flexible" toggle | |
| Number of guests | stepper | |
| Budget range (AED) | chips: < 2,500 · 2,500–10,000 · 10,000–25,000 · 25,000+ · Not sure | |
| Tell us more | textarea | |

**Hidden fields:** page URL, product (if from a product page), UTM source/medium/campaign, language, referrer code.
**Consent:** one checkbox for marketing (unticked); privacy notice line under the button.
**After submit:** immediate on-screen + email acknowledgement with reference number and the response promise that the team can actually meet.
**Removed vs today:** "preferred contact method" (implied by which channel they gave), "how did you hear about us" (captured by UTM).

---

## 8. Trust, credibility and customer experience

### 8.1 What an overseas customer must be able to answer before paying [R]
1. **Who am I buying from?** Legal entity, trade licence no., DET licence no. (if applicable), address, named founder/team photo. In the footer, checkout and confirmation email.
2. **What exactly is included?** Product page included/not included, price type.
3. **What happens after I pay?** Status timeline on checkout and in the confirmation.
4. **Who do I call if something goes wrong — on the day?** Named emergency WhatsApp/phone number in the voucher.
5. **Can I cancel?** Exact tiers in plain words, before payment.
6. **Is my card safe?** Hosted payment page by a named gateway, 3-D Secure.

### 8.2 Audit of current trust elements
| Element | Status [V] | Action [R] |
|---|---|---|
| Company information | Missing | Add entity, licence, address |
| Contact details | Email only; WhatsApp broken; phone not shown in footer | Real number, hours, response promise |
| Business identity / About | "20+ years", "500+ partners" without proof | Rewrite with founder story and verifiable facts |
| Customer support | No hours, inconsistent SLAs | One SLA, published hours |
| Provider relationships | Unstated | "How we choose partners" (licence, insurance, inspection) — no partner names without permission |
| Reviews / testimonials | Unverifiable | Remove; start Google Business Profile reviews after first bookings |
| Cancellation policy | None | Publish |
| Terms & conditions | Generic stub | Booking conditions drafted by a UAE lawyer |
| Privacy policy | Generic stub | UAE PDPL-aligned; list processors (gateway, email, WhatsApp, analytics) |
| Payment security | None | Gateway name and logos at checkout |
| Data handling | Leads in a server text file | Database with access control; retention policy |

### 8.3 Building credibility without inventing anything [R]
- Founder profile with photo and Dubai experience (true facts only).
- Licence numbers displayed (verifiable on government portals).
- "Moments": dated, photographed stories of real bookings (with client consent, anonymised).
- Partner standards page (what you check) instead of partner logos.
- Genuine reviews via Google Business Profile once operating.
- Response-time promise you actually meet; show "Typical reply: X min" only when measured.

---

## 9. Mobile requirements (summary)
Sticky "Book" bar · bottom-sheet booking panel · Apple Pay/Google Pay · tap-to-WhatsApp with prefill · category chips · 48 px targets · no hover-only interactions · RTL-checked Arabic layouts · page weight budget ≤ 1.5 MB for product pages (excluding gallery lazy-load).
