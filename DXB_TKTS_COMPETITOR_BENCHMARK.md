# DXB TKTS — Competitor Benchmark

**Report 2 of 7** · Research date: 18 November 2026 · Evidence labels: **[V]** verified on the live site on this date · **[O]** observation · **[R]** recommendation · **[A]** assumption · **[U]** unverified

### Method

Each site was opened in a real browser. I read the homepage and navigation, opened category and product pages, read the page source for the platform and scripts, inspected forms (field names, required fields), clicked booking buttons up to — never past — the point of sending anything, and checked footer, legal and trust information. **No booking, enquiry or WhatsApp message was sent.** Where a feature could not be reached, that is stated.

**Important correction to the brief:** the brief describes La Conciergerie Dubai as having a shopping cart, checkout and deposit payments. **As of 18 Nov 2026 it does not take any payment online.** Its `/cart/` and `/checkout/` URLs return 404, every product page says *"Nothing to pay online"*, and the booking flow ends in a pre-filled WhatsApp message [V]. The site still loads WooCommerce conversion-tracking scripts and shows a "0,00 AED" cart widget in its French header, which suggests it previously used a WooCommerce checkout and moved away from it [O]. This matters: the reference you liked most for "direct booking" has deliberately chosen **request-to-book, pay after confirmation**. Report 3 explains why, and how DXB TKTS should go one step further.

---

## 1. Classification: who DXB TKTS actually competes with

| Type | Businesses | What it means for DXB TKTS |
|---|---|---|
| **Direct competitors** (Dubai concierge selling experiences to visitors and residents) | La Conciergerie Dubai, TopUp Concierge, VIP Platinum Concierge, Sabrage, Private Concierge UAE (membership end), ABJ Agency (top end), Le Concierge (services end) | Compete on service, curation, language and trust |
| **Distribution platforms / marketplaces** | GetYourGuide, Headout, Platinumlist (also Viator, Klook, Tripadvisor) | Unbeatable on price, reviews and choice for commodity products. **Do not fight them on a AED 120 shared safari.** They are also a possible *sales channel* later |
| **Inspiration references only** | ABJ (editorial brand), VIP Platinum (video) | Borrow presentation, not model |

---

## 2. The eight mandatory references

### 2.1 La Conciergerie Dubai — https://laconciergeriedubai.com/en/ — *best commercial model for DXB TKTS's stage*

**Who and what [V]:** French-run Dubai concierge, operated by **LCD ORYZIA FZCO, Business Bay** (named on every page). Bilingual FR (default) / EN. Positioning: *"Your private concierge in Dubai — Dubai, the private edition."*

**Platform [V]:** WordPress 6.6 + Breakdance page builder; scripts include GA4/GTM, Google Ads conversion tags (two accounts), Snapchat pixel, Hotjar, WooCommerce Google Ads conversion plugin and a custom "wemanage-app-worker" plugin.

**Catalogue [V]:** Four "universes" — **Desert** (buggy, quad, safari & dinner, flying-dress photoshoot, horse riding), **Sea** (private yacht, jet ski, jet car, eFoil, scuba, Oman Dibba day trip), **Sky** (helicopter, paramotor), **City** (private driver, Abu Dhabi day trip, private zoo, theme parks). About 19 products. Navigation is only four items: Experiences · Desert · Yachts · Find my experience.

**Pricing presentation [V] — the best of the eight:**
- Every card shows *"from 1,000 AED"*; the French site adds a euro conversion (*"≈ 240 €"*).
- Product pages list **every variant with its own price and a per-person translation**: *"Polaris RZR XP 1000, 2 seats — 1,100 AED · AED 550 each for 2"*; *"Can-Am Maverick X3 Turbo RR, 4 seats — 1,500 AED · AED 375 each for 4"*.
- Price-type is stated in plain words: *"Prices are per buggy, not per person"*; yacht *"The price is for the whole yacht, not per person. The bigger your group, the better the value."*
- An **"Our pick"** badge on the middle variant (classic anchoring).
- **Extras with prices:** yacht decoration and cake (6–8 people) AED 690; BBQ on board AED 100/person; jet ski delivered to the yacht AED 750/hour.
- Rules: *"The Majesty 50 has a 2-hour minimum."* Worked example: *"Two hours at sunset on the Majesty 50: AED 1,800 for your whole group."*
- Yacht prices: Majesty 50 AED 900/h, Majesty 56 AED 1,000/h, Majesty 88 AED 2,000/h.

**Booking journey [V] (tested to the step before sending):**
1. Product page → choose variant, date, time-of-day (Any / Morning / Afternoon / Evening), quantity → **live "Estimated total"** (e.g. AED 1,100).
2. Two actions: **"Send my request on WhatsApp"** or **"+ Add to my plan"**. Fallback link: *"No WhatsApp? Send by email."*
3. "Add to my plan" shows a toast (*"Dune buggy added to your plan · View"*) and a header counter. The **My plan** drawer collects name, hotel, number of people and every item with its own date/time/quantity, a running **Estimated total**, and *"Prices are indicative and confirmed on WhatsApp before any payment."*
4. "Send my plan on WhatsApp" composes one message with everything.
5. Team confirms availability and price on WhatsApp → sends payment details → customer pays **by card or crypto**.
- Homepage quiz *"Find your perfect plan — Who are you travelling with? Couple / Family / Friends / Solo"* proposes three activities.
- "Pair it with" cross-sell block on every product page (e.g. yacht → jet ski, jet car, helicopter).

**Trust [V]:** four-point strip repeated sitewide — *Nothing to pay before confirmation · A team that replies on WhatsApp · A Dubai-based company (LCD ORYZIA FZCO, Business Bay) · Prices shown upfront*. Named equipment brands (Polaris, Can-Am, Majesty yachts). Phone, email, WhatsApp, area. "More than ten years of Dubai" family story.
**Gaps [V]:** no reviews or ratings shown; I could not find terms, privacy or cancellation pages (`/terms-and-conditions/`, `/privacy-policy/` → 404); cancellation answer is *"Conditions depend on the activity and are shown before you pay."* No online payment, no deposit mechanism visible, no instant confirmation for anything.

**Adopt:** priced variants, per-person translation, extras, minimums, the plan basket, the trust strip, the entity name, pair-it-with, the quiz.
**Improve on:** take payment online once confirmed (payment link → hosted checkout), add instant-confirm products, publish real terms and cancellation rules, show genuine reviews, add secondary currency on the English site.

---

### 2.2 VIP Platinum Concierge — https://www.vipplatinum-club.com/ — *the hero-video reference*

**Platform [V]:** WordPress 7.1, custom theme `vip`; fonts **Avenir LT Std** (body) and **Marcellus** (display). English + Arabic.
**Hero video [V], measured:**
- File `VIPPC-Comp.mp4`, **1920 × 1080, 39.9 s, 15.5 MB**, `autoplay muted loop`, **`controls` visible**, `preload="metadata"`, **no poster image**.
- At a 1,024 px viewport it is **framed with margins (908 × 511 px), not full-bleed**, sits below a centred crest logo and a thin bar (ENG | عربي · Tel +971 4 4204176 · burger menu). Native player controls (0:00 / 0:39) are visible on the video.
- Sampled frames: Emirates A380 landing (0–6 s) → doorman and guest at a hotel entrance (~8 s) → camel caravan in the desert (~16 s) → aerial of a superyacht deck (~25 s) → spa hot stones (~34 s). It is a **lifestyle montage across travel, hospitality, desert, sea and wellness**, with **no text over the video**; the headline "Welcome to VIP Platinum Concierge" sits beneath it.
- A WhatsApp chat widget pops over the video on load.
**What works [O]:** pacing — one idea per 5–8 s shot; real Dubai signifiers (Emirates, desert, yacht); calm, premium mood; muted autoplay loop.
**What does not [O]:** 15.5 MB file with no poster means a blank box on slow mobile connections; visible controls break the cinematic illusion; inset framing loses the full-screen impact; the footage looks like licensed stock rather than VIP Platinum's own clients and is generic to any luxury brand; no CTA over the video.
**Commercial model [V]:** membership-led. Individual Membership (families of 1–6) and Corporate Membership, "Join Now" — **no prices**. Claims: *"Proud member of the VIRTUOSO network since 2018"*, *"exclusive benefits at over 6,500 five-star hotels"* [U — not independently verified]. Office: VIP Platinum Concierge DMCC (Google Maps embed), plus a London map.
**Adopt:** muted looping cinematic film with real Dubai icons, sequence logic. **Avoid:** heavy file, controls, no poster, popup over the hero, unpriced membership.

---

### 2.3 Private Concierge UAE — https://privateconcierge.ae/ — *best membership transparency*

**Platform [V]:** static HTML with Tailwind via CDN. Operator in footer: **FWH Holdings LLC**; address Marina Plaza, Al Marsa Street, Levels 27–29 & 32, Dubai. Claims *"25 years crafting extraordinary service in the Middle East"* [U].
**Membership (on `/membership.html`, which is not linked from the homepage nav — the nav uses `#membership` anchors) [V]:**

| Tier | Fee | Who | Key inclusions | Limits / SLA |
|---|---|---|---|---|
| **Ivory** | **AED 18,000 per annum + services** | Resident professionals, families new to UAE | Dedicated lifestyle manager (business hours), restaurant & event access, transport coordination, relocation help, domestic-staff introductions, medical appointments | **Up to 40 service hours/month; response within 4 business hours** |
| **Onyx** | **AED 48,000 per annum + services** | Established residents, international clients | Senior manager, 7am–midnight, aviation, yacht, international property search, travel design, household management | **Unlimited requests; 4-hour response guarantee** |
| **Obsidian** | **By arrangement (retained)** | UHNW, family offices | Relationship director, 24/7, security & privacy advisory, crisis management, collectibles sourcing | **Same-hour response** |

- Comparison table of 10 features across tiers [V].
- **Third-party charges [V]:** *"The annual membership fee covers access, dedicated support, and management time. Third-party services — hotels, charters, transport, tickets — are arranged at cost or at preferential rates … billed to the client at net or with a transparent service margin disclosed in advance."*
- Pro-rata upgrades between tiers; discovery call before joining; one-business-day enquiry response.
- **Gaps [V]:** homepage "View Family Benefits" links to `#contact`; `/privacy.html` and `/terms.html` → 404 although linked in the footer; a separate "Brokerage" desk for jet and yacht sales.
**Adopt:** published fees, hour caps, response SLAs, "fee covers time, third-party at net + disclosed margin" language, comparison table. **Avoid:** broken legal links; launching tiers you cannot staff.

---

### 2.4 Le Concierge UAE — https://leconcierge.ae/ — *service diversification, mostly as a warning*

**Platform [V]:** static HTML/Bootstrap, background video `mov-2.mp4`. Office 4503, Ubora Tower, Business Bay.
**Service architecture [V]:** nine services under one "Services" dropdown — New Business Setup, Visa Services, Banking & Mortgage, Property Management, Accounting/Tax/Insurance, Luxury Car Rental, Luxury Yacht Rental, Private Jet Services, Personal Assistance. Counters: *"100+ business setup · 1250+ citizen by investment · 250+ work visa · 50+ property management"* [U]. One testimonial ("Oliva jems, Investment Banker").
**Product pages [V]:** a paragraph and a "Query Form". No prices, options or images of actual inventory. Instagram, Blog and email links point to `#`; copyright 2023.
**[O]** Its real business is relocation and corporate services; lifestyle is an add-on. The cross-sell idea is valid — **residents who set up a company or move to Dubai later buy lifestyle services** — but its execution shows the cost of a broad, thin catalogue.
**Adopt:** the idea of a *resident relocation partner channel* (Report 6). **Avoid:** listing regulated services (visas, banking, insurance, tax) you do not deliver; dead links; no prices.

---

### 2.5 ABJ Agency — https://abjagency.com/en — *best premium brand and editorial*

**Platform [V]:** Framer; fonts **DM Sans** + **Georgia** with *Italianno* script accent; languages FR, EN, DE, RU. Office 209, Al Fattan Downtown, Dubai.
**Hero [V]:** full-bleed aerial video of a yacht wake, headline **"The world, / on your terms."** (serif, italic second line), CTA *"Tell us your plans ↗"*, a region strip (United States · Europe · Middle East · Africa · Asia) and a **"♪ Sound on"** toggle. A GDPR-style cookie banner with equal-weight **Refuse / Accept** buttons.
**Navigation [V]:** Maison ABJ · Exceptional Services · The ABJ Circle · ABJ Corporate · The Journal · ABJ Moments · Careers & Training.
**What makes it credible [V]:**
- **"ABJ Moments — The work behind the promise"**: dated case studies (e.g. a Bugatti Chiron sourcing *"filmed on 30 October 2023"*; yacht AK Royalty *"filmed on 27 December 2024"*), with what was actually done.
- A three-step process: *Share your vision → Discover your options → Enjoy the experience*.
- Membership ("The ABJ Circle") explained honestly: fees and scope are discussed before joining; no fake tiers.
- Contact form [V]: **Name\*, Email\*, Phone, Service\*** (17-option select from "Exceptional residences" to "Another request"), message, plus hidden source/campaign/reference fields for attribution.
- Destination landing pages: Dubai stays, French Riviera, Marbella.
**Adopt:** editorial restraint, dated proof-of-work case studies, hidden attribution fields, honest membership copy, equal-weight cookie choices. **Avoid:** Framer as a booking platform; a UHNW-only voice.

---

### 2.6 TopUp Concierge — https://www.thetopupconcierge.com/ — *catalogue structure, with credibility problems*

**Platform [V]:** built on **Readdy** (AI site builder; "Powered by Readdy" in footer).
**Catalogue [V]:** Tours & Experiences · Dubai Tours · Abu Dhabi Tours · Services · Deals & Combos. Homepage search widget (Tour / Date / City). Category tiles (Desert Safari, City Tours, Airport Transfers, Theme Parks, VIP Concierge, Yacht & Cruises). City tiles: *"Dubai 45+ Tours · Abu Dhabi 28+ · Sharjah 12+."*
**Product cards [V]:** category badge, "Pickup Included", rating and review count, duration, **"View Details"** and **"Contact for Best Offers"** — **no prices anywhere**. Product page: highlights, tabs (Overview / Itinerary / Inclusions / Important Info), FAQ, date + adults + children selector, then *"Chat with us for tour details and pricing"*.
**Booking page [V]:** a 4-step wizard (Tour Details → Your Info → Preferences → Confirmation).
**Credibility problems [V/O]:**
- Review counts such as *"(4156 reviews)"* on a private airport transfer and *"(3521 reviews)"* on Burj Khalifa — with no review source or widget [U]; testimonials from "Sarah Johnson, United Kingdom" etc. read as template content [O].
- Claims **"Instant Confirmation"** and **"Best price guarantee"** while showing **no price** and routing every booking to WhatsApp — a direct contradiction.
- Contact email is a named individual's address.
**Adopt:** category + city browse, product tabs, adults/children selector, 4-step progress indicator, "Deals & Combos" concept. **Avoid:** fake-looking review counts, hidden prices, promises the system cannot keep.

---

### 2.7 Sabrage Concierge — https://sabrageconcierge.com/ — *lifestyle-management and event staffing*

**Platform [V]:** Tilda; EN + RU; hero video hosted on Boomstream.
**Proposition [V]:** *"We celebrate life."* Two concierge types — **Personal** and **Business** (employee-benefit concierge). Services in popups: Travel, Fine dining & nightlife, Jets & yachts, Lifestyle management, Ticketing, Health & wellness; a dedicated **Events** block (venue selection → event staffing → on-site supervision → post-event services); separate **Luxury Transportation** (car sourcing and delivery, chauffeur, limited-edition rentals, yachts, jets) and **Event Staffing** pages.
**Commerce [V]:** none — every action opens "Submit request" popups; no prices.
**Notable [V]:** an "Imagery Rights" popup credits photos to Pinterest, Facebook, Instagram and Tumblr posts — i.e. imagery taken from social media.
**[O]** Commercially relevant ideas: **events and celebrations as a productised line** and **event staffing** as a B2B service. Unique positioning in Russian-speaking demand.
**Adopt:** celebration/event packages, business-concierge-as-employee-benefit idea (later). **Avoid:** using images you do not own; popup-only navigation (poor for SEO and mobile).

---

### 2.8 Other relevant competitors

| Business | Type | Verified observations | Lesson for DXB TKTS |
|---|---|---|---|
| **GetYourGuide** — https://www.getyourguide.com/dubai-l173/ | Distribution platform | Dubai filters: Food & drink, Dining cruises, For kids, Private cruises, Entry tickets, Day trips, Private tours, For couples, **Luxury**, Desert safaris, Quads & ATVs, Boat cruises, Water sports, Jet skis; "500+ results". Top sellers with prices **[V]**: Burj Khalifa 124/125 *from $51 (93,125 reviews)*; Desert Safari + quad + camel *from $30*; Jet ski to Burj Al Arab *from $38 per group up to 2*; **shared "Luxury Yacht Tour" from $22**; Aquaventure *from $84*. Discloses that ranking includes *"revenue (including supplier commissions)"*. Supplier commission is set per supplier, published range **20–30%** ([GYG supply site](https://getyourguide.supply/join/how-much-does-getyourguide-charge); increases to 30% reported by [Arival](https://arival.travel/article/getyourguide-commission-increasing-for-some-operators)) | **DXB TKTS cannot win on commodity shared products.** It should sell *private, premium and packaged* versions and the service layer. Suppliers pay marketplaces 20–30%, which is the benchmark for the margin DXB TKTS can negotiate |
| **Headout** — https://www.headout.com/ | Distribution platform | Defaults to **AED** for a UAE visitor; promises *"100% booking protection"*, *"free cancellation and pay-later options on most experiences"*, *"24/7 trip support"*, *"Trusted by over 57 million guests"*; "Sell on Headout" supplier link. Dubai category page redirected to the homepage in my session (limitation) | Pay-later and free-cancellation are now customer expectations; DXB TKTS must match them on at least its entry products |
| **Platinumlist** — https://dubai.platinumlist.net/ | Ticketing marketplace | Events (concerts, shows, comedy, dining, nightlife, festivals) + attractions (Burj Khalifa, Global Village, Dubai Frame, theme parks) + experiences (safaris, dinner cruises, spas); prices in AED; "Refundable tickets"; "PLUS" paid membership with discounts (e.g. "-20% with Plus"); "Trusted by 50M+" (summary via page fetch) | Event ticketing is a separate, low-margin game. DXB TKTS should **not** build a ticketing engine; offer attraction tickets only as add-ons sourced from a ticket supplier |

**Not researched in depth (limitation):** Viator, Klook, Tripadvisor; Dubai yacht operators with own booking engines; chauffeur platforms (e.g. Blacklane). They do not change the recommendations; they reinforce the commodity-price point above.

---

## 3. Competitor comparison matrix

| Competitor | Target customers | Positioning | Categories | Pricing approach | Booking system | Payment | Membership | Visual identity | Homepage | Trust signals | Strengths | Weaknesses | DXB TKTS should adopt | Avoid |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **La Conciergerie Dubai** | French/English tourists, couples, families, friends | Private, bilingual, family-run concierge | Desert, Sea, Sky, City (~19 products) | **Fixed variant prices, from-prices, per-person translation, priced extras** | Plan basket → WhatsApp request → manual confirmation | Card or crypto **after** confirmation; nothing online | No | Warm cream/navy, playful serif, emoji quiz | Promise + 4 universes + priced cards + quiz + trust strip | Legal entity named everywhere; "nothing to pay before confirmation" | Clarity, transparency, low friction | No online payment, no reviews, no legal pages | Product model, plan basket, trust strip, extras, pair-it-with | Crypto (compliance), missing T&Cs |
| **VIP Platinum** | Residents, families, corporates | Membership lifestyle concierge | 6 services | None shown | Contact / WhatsApp | Not shown | Individual, Corporate (unpriced) | Avenir + Marcellus, crest logo, black | 40 s lifestyle film | DMCC entity, Virtuoso claim, phone | Cinematic film | Heavy video, generic copy, no prices | Film direction and sequencing | 15 MB video, controls, popups |
| **Private Concierge UAE** | Residents, executives, UHNW | Discreet membership | Travel, events, dining, lifestyle, brokerage | **Published annual fees** + services at net/margin | Discovery call | Not shown | **Ivory AED 18k, Onyx AED 48k, Obsidian bespoke** | Static, conventional | Text-led | Address, operator name | Transparent fees, SLAs, caps | Broken legal links, unlinked membership page | Fee logic, caps, SLA language | Launching unstaffed tiers |
| **Le Concierge** | Expats, founders | Business + lifestyle services | 9 services incl. visas, banking | None | Query form per page | Not shown | No | Generic template | Video + counters | Address, phone | Relocation cross-sell idea | Thin, dead links, unverified counters | Resident-partner channel | Regulated services, dead links |
| **ABJ Agency** | International HNW (FR/EN/DE/RU) | "The world, on your terms" | Residences, aviation, yachts + more | Quote | Contact form w/ attribution | Not shown | ABJ Circle (terms discussed) | **Editorial, serif + DM Sans, full-bleed video** | Film + 3 worlds + case studies + journal | **Dated case studies**, address | Credibility through proof | No commerce | Editorial craft, case studies, attribution | UHNW-only voice |
| **TopUp Concierge** | Mass tourists | "Bold experiences, premium concierge" | Tours, transfers, parks, yachts by city | **Hidden ("contact for best offers")** | 4-step wizard → WhatsApp | Card logos shown | No | AI template | Search + categories + cards | Review counts [U], T&Cs exist | Catalogue structure, city browse | Contradictory promises, no prices | Category/city browse, product tabs | Unverifiable reviews |
| **Sabrage** | HNW, RU-speaking, corporates | "We celebrate life" | Travel, dining, yachts/jets, events, staffing | Quote | Popup forms | Not shown | Personal/Business concierge | Tilda, bold caps | Video + popups | Instagram, email | Events productised | Images from social media, no SEO | Celebration packages, event staffing | Unlicensed imagery |
| **GetYourGuide** | All travellers | Global marketplace | 500+ Dubai products | **From-price in user currency, strike-through discounts** | Instant booking, calendar, free cancellation | Card, wallets, reserve-now-pay-later | No | Product UI | Search + filters | Huge verified review base | Price, choice, reviews | Commodity, no service | Filters, review UX, cancellation clarity | Price war |
| **Headout** | All travellers | Curated marketplace | Attractions, tours | From-price in AED | Instant | Pay later on most | No | Product UI | Search | Booking protection, 57M guests | Protection promise | Generic | Protection/guarantee framing | — |
| **Platinumlist** | Residents, visitors | Events + attractions | Events, attractions, dining, nightlife | AED, discounts | Ticketing checkout | Not checked | **PLUS paid discount membership** | Product UI | Event grid | 50M+, refundable tickets | Event inventory | Ticketing margin | Resident discount-membership idea (later) | Building ticketing |

---

## 4. Best-in-class answers

| Question | Winner | Why |
|---|---|---|
| Best commercial model | **La Conciergerie Dubai** | Priced catalogue that converts to a confirmed booking with almost no tech, plus a service layer |
| Best booking experience | **La Conciergerie Dubai** among concierges (plan basket, live totals); **GetYourGuide** overall (instant, calendar, pay later) |
| Best pricing presentation | **La Conciergerie Dubai** — variants, per-person translation, extras, minimums, worked example |
| Best hero video | **VIP Platinum** for sequence and Dubai signifiers; **ABJ** for execution (full-bleed, headline over film, sound toggle) |
| Best visual identity | **ABJ Agency** |
| Best membership strategy | **Private Concierge UAE** — published fees, caps, SLAs, third-party pass-through rules |

---

## 5. The 20 strongest transferable ideas, ranked by commercial impact

| # | Idea | Source | Commercial benefit |
|---|---|---|---|
| 1 | **Publish real prices on every product, with variants** ("from AED X") | La Conciergerie | Pre-qualifies buyers, removes the biggest drop-off ("how much?"), cuts WhatsApp back-and-forth; enables paid ads with price in the ad |
| 2 | **State price type in words** (per buggy / per yacht / per person) + per-person translation | La Conciergerie | Makes private products look affordable for groups; reduces disputes |
| 3 | **Priced optional extras** (decoration, cake, BBQ, jet ski, photographer, transfer) | La Conciergerie | Raises average order value without new suppliers |
| 4 | **Plan basket** combining several experiences with one total | La Conciergerie | Multi-item orders; makes DXB TKTS a planner, not a single-ticket seller |
| 5 | **Trust strip naming the legal entity** + "what happens next" | La Conciergerie | Cheapest conversion lift for overseas buyers; required by payment gateways |
| 6 | **Request-to-book with payment after supplier confirmation** for non-instant products | La Conciergerie | Never sells what cannot be delivered; protects refunds and reputation |
| 7 | **Online payment link/checkout once confirmed** (what La Conciergerie lacks) | GetYourGuide / Headout norm | Converts confirmations into cash immediately; card security for foreigners |
| 8 | **Clear free-cancellation / pay-later rules on entry products** | Headout, GYG | Removes risk for first-time buyers; matches market expectation |
| 9 | **Cinematic full-bleed muted film with a poster and headline over it** | VIP Platinum + ABJ | Brand impact without the 15 MB penalty |
| 10 | **"Pair it with" cross-sell** on each product | La Conciergerie | Attach rate on high-margin add-ons |
| 11 | **Dated proof-of-work case studies** ("Moments") instead of statistics | ABJ | Credibility without inventing numbers |
| 12 | **Category + occasion browsing** (couples, family, friends, celebration) | La Conciergerie quiz, GYG filters | Faster discovery; good landing pages for ads |
| 13 | **Published membership fees, hour caps and response SLAs** (when ready) | Private Concierge UAE | Sells recurring revenue honestly; protects margins from unlimited requests |
| 14 | **"Third-party services at net or with a disclosed margin"** rule | Private Concierge UAE | Trust with residents/corporates; clean accounting |
| 15 | **Hidden attribution fields on every form** (source, campaign, page) | ABJ | Know which channel produces revenue |
| 16 | **Short concierge request form with a service select** (Name, Email, WhatsApp, Service, Date, Guests, Budget) | ABJ, existing DXB TKTS form | Higher completion; better routing |
| 17 | **City/destination browse** (Dubai, Abu Dhabi, RAK) | TopUp, ABJ destination pages | SEO entry points and expansion path |
| 18 | **Product tabs: Overview / Itinerary / Included / Good to know / FAQ** | TopUp, GYG | Answers objections on-page |
| 19 | **Celebration packages** (proposal, birthday, anniversary on a yacht or in the desert) | Sabrage, La Conciergerie extras | High-margin, emotionally driven, quote-friendly |
| 20 | **Equal-weight cookie consent and analytics/pixel stack** | ABJ, La Conciergerie | Compliance plus measurable paid acquisition |

---

## 6. What DXB TKTS should avoid (consolidated)

1. Unverifiable statistics, review counts and testimonials (TopUp; and currently DXB TKTS itself).
2. "Instant confirmation" or "best price guarantee" claims the system cannot honour (TopUp).
3. Hiding prices behind "contact for best offers" for standard products (TopUp, VIP Platinum, Sabrage).
4. Regulated services outside the core (visas, banking, property, investments) (Le Concierge; DXB TKTS's own real-estate pillar).
5. Imagery taken from social media or competitors (Sabrage).
6. Heavy, control-bar hero video without a poster (VIP Platinum).
7. Dead legal links (Private Concierge UAE, La Conciergerie).
8. Crypto payments at launch — adds AML/KYC and refund complexity for little demand [O].
9. Competing on price with GetYourGuide on shared commodity tours.

---

## 7. Sources

- La Conciergerie Dubai: https://laconciergeriedubai.com/en/ · https://laconciergeriedubai.com/en/dune-buggy-dubai/ · https://laconciergeriedubai.com/en/yacht-rental-dubai/ · https://laconciergeriedubai.com/en/#faq
- VIP Platinum Concierge: https://www.vipplatinum-club.com/ · https://www.vipplatinum-club.com/membership/ · https://www.vipplatinum-club.com/service/
- Private Concierge UAE: https://privateconcierge.ae/ · https://privateconcierge.ae/membership.html · https://privateconcierge.ae/brokerage.html · https://privateconcierge.ae/sitemap.xml
- Le Concierge UAE: https://leconcierge.ae/ · https://leconcierge.ae/luxury-yacht-rental.html · https://leconcierge.ae/personal-assistance.html
- ABJ Agency: https://abjagency.com/en · https://abjagency.com/en/club · https://abjagency.com/en/contact
- TopUp Concierge: https://www.thetopupconcierge.com/ · https://www.thetopupconcierge.com/tour/premium-desert-safari-with-bbq-dinner · https://www.thetopupconcierge.com/booking
- Sabrage Concierge: https://sabrageconcierge.com/ · https://sabrageconcierge.com/luxury-transportation
- GetYourGuide Dubai: https://www.getyourguide.com/dubai-l173/ · supplier commission: https://getyourguide.supply/join/how-much-does-getyourguide-charge · https://arival.travel/article/getyourguide-commission-increasing-for-some-operators
- Headout: https://www.headout.com/
- Platinumlist: https://dubai.platinumlist.net/
- Dubai 2025 visitor statistics (19.59 m international overnight visitors; Western Europe 21%, GCC 15%, UK 1.47 m): https://www.mediaoffice.ae/en/news/2026/february/09-02/dubais-tourism-industry-achieves-third-successive-record-breaking-year · https://www.khaleejtimes.com/business/dubai-tourism-hits-record-1959m-visitors-in-2025-marking-third-year-of-growth
