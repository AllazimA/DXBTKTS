# DXB TKTS — Brand and Hero Video Direction

**Report 4 of 7** · 18 November 2026 · Labels: **[V]** verified · **[O]** observation · **[R]** recommendation · **[A]** assumption · **[U]** unverified

---

## 1. Assessment of the existing brand [V]

| Element | Today | Verdict |
|---|---|---|
| Name | **DXB TKTS** (wordmark: "DXB" white, "TKTS" gold), tagline "Luxury Concierge" | The name is an asset for a booking platform: *DXB* = Dubai, *TKTS* = tickets/booking. It is a liability for an "invitation-only private circle" story. **Keep the name; change the story.** |
| Palette | Ink `#0E1B2C`, Navy `#13294B`, antique Gold `#B08D3F`, Ivory `#FBFAF7`, Band `#F3F1EC`, Slate `#5A6B7B` | Tasteful, but gold is the primary CTA colour on almost every section — the "generic luxury" look you asked to avoid |
| Typography | Cormorant Garamond (light, italic gold accents) + Inter | Elegant, but light serif at large sizes reads "wedding/hotel"; Cormorant has no Arabic, so Arabic falls back to a system font |
| Logo | Text wordmark only, no symbol, no favicon set | Needs a compact mark for favicon, app icon, WhatsApp avatar, vouchers |
| Voice | "By invitation", "never sold", "custodians of your lifestyle", "A Circle Kept Deliberately Small" | Exclusive and distant — tells 95% of potential buyers the site is not for them |
| Imagery | Unsplash stock (Dubai skyline, yacht, dining) + one Lavish Morocco desert image | Generic; one image is from another country and brand |
| Motion | Framer Motion fade/slide on every section, Ken Burns hero | Smooth but excessive; content invisible until scrolled into view |
| Buttons | Square, uppercase, tracked, gold fill | Consistent; gold-on-ivory small text likely fails contrast |

---

## 2. Brand positioning

**[R] Positioning line:** *Dubai's private concierge — bookable online.*
**Promise:** *Real prices. Private experiences. A real team on WhatsApp before, during and after.*

**Brand personality:** contemporary · confident · warm · precise. Premium through **clarity and service**, not through gold and adjectives.

**Tone of voice rules [R]:**
- Say what it is, what it costs, what happens next. ("Private yacht, 2 hours, from AED 1,800 for the whole boat. Confirmed within 2 hours.")
- One evocative line per page, maximum. The rest is useful.
- No unprovable superlatives ("the standard others aspire to", "doors that open only by name").
- Address everyone: couples, families, friends, residents, companies. Premium ≠ exclusive.

**Suggested taglines (pick one):** *"Book Dubai, privately."* (recommended — short, ownable, ties "TKTS" to booking) · *"Dubai, arranged."* · *"Your private side of Dubai."*

---

## 3. Visual identity

### 3.1 Colour palette [R]
Move from "ink + gold" to "night + sand + sea", with one energetic accent reserved for actions.

| Token | Hex (proposed) | Use |
|---|---|---|
| `night` | `#0B1320` | Header, hero overlays, footer, dark sections |
| `sand-50` | `#FAF6EF` | Page background (warmer than ivory) |
| `sand-200` | `#EADFCB` | Cards, bands |
| `stone` | `#5B6470` | Secondary text |
| `sea` | `#0F5E66` | Links, category accents, "Instant" badges |
| `sunset` | `#E2603A` | **Primary CTA only** (Book / Request to book). Energetic, not gold |
| `brass` | `#A8843F` | Rare detail (logo dot, hairlines, "Our pick" badge) — ≤ 5% of any screen |
| `success` / `warning` / `error` | `#1E7A4C` / `#B7791F` / `#B42318` | Booking statuses |

Check every text/background pair for WCAG AA (4.5:1 body, 3:1 large) before adoption; `sunset` on `night` and `white` on `sunset` must be tested at button size.

### 3.2 Typography [R]
| Role | Proposal | Why |
|---|---|---|
| Display (H1–H2, short) | A modern serif with character, used sparingly — e.g. **Fraunces** or keep **Cormorant** only at ≥ 48 px in medium weight | Keeps premium editorial feel without "wedding" lightness |
| UI and body | **Inter** (keep) or **Manrope** | Legible at small sizes; good numerals for prices |
| Arabic | **IBM Plex Sans Arabic** or **Noto Kufi Arabic** | Current fonts have no Arabic; RTL pages need a matched face |
| Numerals/prices | Tabular figures from the UI font | Prices align in option cards |
Rules: sentence case for buttons (not tracked uppercase), maximum two font families per language.

### 3.3 Logo usage [R]
- Keep the **DXB TKTS** wordmark; redraw in the new display or a custom sans with tighter tracking.
- Add a **compact mark** (e.g. "DT" monogram or a ticket-notch shape) for favicon, social avatar, WhatsApp Business profile, voucher QR frame.
- Variants: light on dark, dark on light, mono. Clear space = height of "D". Minimum 20 px height.
- Never place the logo over busy video without the night gradient.

### 3.4 Components [R]
- **Buttons:** Primary (sunset fill, white text, 12 px radius, sentence case "Book now"), Secondary (night outline), Tertiary (text + arrow), WhatsApp (green icon, neutral fill). 48 px minimum height on mobile.
- **Product card:** 4:3 image · category + area eyebrow · name (2 lines max) · duration + group size · confirmation badge ("Instant" in sea / "Confirmed within 2 h" in stone) · price line "From **AED 1,800** / boat" · heart (save to plan). Whole card clickable.
- **Category tile:** full-bleed image, category name, "From AED X", count of products.
- **Badges:** Instant · Free cancellation 24 h · Private · Our pick · New. No "Best seller" until sales data exists.
- **Booking panel:** white card, sticky on desktop, bottom sheet on mobile, live total.

### 3.5 Photography direction [R]
- **Real product photography first.** Every product needs 5–8 images of *that* boat, *that* vehicle, *that* camp — supplied by the partner with written usage rights, or shot by DXB TKTS.
- Style: natural light, golden hour and blue hour, people from behind or in candid motion (no posed stock smiles), diverse guests, families and couples, Arabic and international.
- Avoid: helicopter-only skyline clichés, gold filters, HDR, images taken from Instagram or competitors.
- Licensing: keep a rights log per asset (source, licence, expiry, model release).

### 3.6 Layout, animation and transitions [R]
- 12-column grid, 1,280 px max content width, 16 px mobile gutter.
- **Motion budget:** hero film + one subtle reveal per section at most; never hide content until it animates; honour `prefers-reduced-motion` everywhere.
- Page transitions: none beyond a fast fade (≤ 200 ms); speed is part of premium.
- Micro-interactions where they help conversion: price total counting, "Added to plan" toast, date picker.

### 3.7 Mobile design [R]
- Sticky bottom bar on product pages: price + "Book" button.
- Category chips scroll horizontally under the hero.
- Plan icon with count in the header; WhatsApp as a floating button **only after** 5 s or on product pages (not over the hero).
- Homepage target length on mobile: **≤ 6 screens** before the footer (today ≈ 18).

---

## 4. Hero video — learning from VIP Platinum

**What to keep from VIP Platinum [V/O]:** muted autoplay loop; Dubai icons in sequence (arrival → hospitality → desert → sea → wellness); one idea per shot (5–8 s); calm luxury pace.
**What to do differently:** full-bleed (ABJ-style) not inset; **no player controls**; **poster image** so something appears instantly; a fraction of the weight (VIP Platinum's file is 15.5 MB, 40 s at 1080p [V]); headline and CTA **over** the film; footage of *bookable* DXB TKTS experiences rather than generic lifestyle; no chat popup over it.

### 4.1 Three concepts

#### Concept A — "Sand · Sea · Sky · City" *(recommended)*
- **Visual direction:** four chapters, each a 4–5 s shot that is literally a product DXB TKTS sells. Bold, kinetic, editorial.
- **Sequence (≈ 18–20 s loop):** (1) Sand — low tracking shot of a buggy cresting a red dune at sunrise, sand spray backlit → (2) Sea — drone pull-back from a yacht's bow in Dubai Marina at golden hour, skyline revealed → (3) Sky — helicopter-window POV over Palm Jumeirah turning towards Burj Al Arab → (4) City — night: chauffeur door opening, reflection of Burj Khalifa on the car's black paint → hard cut back to sand.
- **Mood:** energetic but controlled; warm golden hour into deep blue night.
- **Music/sound:** muted by default (autoplay rules); optional "Sound on" toggle with a licensed percussive-electronic track with an oud texture, 100–110 bpm; no voice-over.
- **Text treatment:** left-aligned on desktop, bottom-third on mobile. H1: **"Book Dubai, privately."** Sub: "Yachts, desert, sky and chauffeurs — real prices, confirmed by a real team." Under it a **chapter strip "Sand · Sea · Sky · City"** that highlights in sync with the film; each label is a link to its category.
- **CTA placement:** primary "Explore experiences" (sunset button) + secondary "Plan with a concierge" (outline) + a compact search field ("What do you want to do?") directly under the CTAs on desktop; on mobile the search becomes category chips.
- **Mobile:** separate **9:16 (or 4:5) edit**, 12–15 s, 720p; poster frame = the yacht shot.
- **Why it wins:** the hero *is* the catalogue — every second shows something the visitor can buy, and the chapter strip turns the film into navigation. It also differs clearly from VIP Platinum's generic lifestyle reel and from any other project's "one day" narrative.

#### Concept B — "Arrival"
- **Direction:** first-person journey of a guest's first evening. Airport meet & greet → chauffeur on Sheikh Zayed Road at dusk → hotel arrival → rooftop view → yacht deck at night.
- **Duration:** 20–24 s. **Mood:** calm, intimate, reassuring. **Sound:** ambient city + soft piano.
- **Text:** "From the gate to the good part." CTA "Book your arrival" + "Explore experiences".
- **Mobile:** vertical POV edit. **Use case:** strong for transfers and first-time visitors; weaker for showing breadth.

#### Concept C — "Golden Hour, Every Hour"
- **Direction:** one continuous light arc in Dubai — balloon at sunrise, beach club noon, desert at sunset, Marina at blue hour — colour-graded as one gradient from pale gold to night.
- **Duration:** 24 s. **Mood:** dreamy, aspirational. **Sound:** ambient pads.
- **Text:** "Dubai, at its best moment." CTA "Find your moment".
- **Risk:** beautiful but closer to generic tourism advertising; slower; more expensive to shoot (four time-of-day set-ups).

**Recommendation: Concept A**, with Concept B's airport-to-chauffeur shot reused later as the hero of the Transfers landing page.

### 4.2 Performance requirements (all concepts) [R]

| Requirement | Target |
|---|---|
| Formats | H.264 MP4 (fallback) + **AV1 or VP9 WebM** |
| Desktop file | **≤ 4 MB** for 18–20 s at 1080p (≈ 1.5–2 Mbps) |
| Mobile file | **≤ 2 MB**, 720p vertical, served via `media` query |
| Poster | AVIF/WebP still, ≤ 120 KB, rendered immediately (counts as LCP) |
| Attributes | `autoplay muted loop playsinline preload="none"` with JS start after poster paints; **no `controls`** |
| Data saving | Do not load video when `Save-Data` is on or on 2G/3G effective type; show poster only |
| Reduced motion | `prefers-reduced-motion: reduce` → poster only, plus a "Play film" button |
| Accessibility | Pause control (WCAG 2.2.2 for >5 s moving content); text never baked into the video |
| Hosting | Serve from CDN with range requests (Vercel/Cloudflare/Mux); never hot-link |
| Core Web Vitals | LCP < 2.5 s on 4G mid-range Android; CLS 0 (fixed aspect box) |

### 4.3 Footage sourcing [R]
1. **Phase 1 (weeks):** licensed stock from a reputable library with commercial licence (filter for 4K, Dubai-specific, model-released), **plus** clips supplied by launch partners (yacht and desert operators usually have drone footage) with a written usage licence.
2. **Phase 2 (after first 50 bookings):** a one-day DXB TKTS shoot with two partners (yacht at sunset, buggy at sunrise) — owned footage for hero, ads and social.
3. **Never** use competitors' or social-media footage; keep a rights log.

---

## 5. Homepage design (visual summary)

The full section-by-section purpose is in Report 5 §3. Visually:

1. **Hero film** (Concept A), H1, sub, two CTAs, chapter strip, search.
2. **Category row** — 6 tiles with "From AED".
3. **Most-booked / Featured experiences** — 8 product cards, horizontal scroll on mobile.
4. **How it works** — 3 steps (Choose → We confirm → Enjoy) with the payment/confirmation promise.
5. **Occasions** — Couples · Family · Friends · Celebrations · Corporate.
6. **Private Concierge band** — night background, one image, short form CTA.
7. **Why DXB TKTS** — 4 verifiable reasons (legal entity, real prices, WhatsApp team, licensed partners).
8. **Reviews** — only when genuine; until then, "Moments" case studies with dates.
9. **Journal teaser** — 3 practical guides.
10. **Final CTA** + footer.

---

## 6. Brand do / don't

| Do | Don't |
|---|---|
| Real prices in the design system (price is a design element) | Gold everywhere, gold gradients, crowns, diamonds |
| Real partner photography with rights | Stock smiles, scraped images, another country's desert |
| One cinematic moment (the hero), then fast and useful | Animations that hide content |
| Arabic typography designed, not defaulted | English-only metadata on Arabic pages |
| Proof (entity, licence, dated case studies, genuine reviews) | "20+ years", "500+ partners", anonymous testimonials |
