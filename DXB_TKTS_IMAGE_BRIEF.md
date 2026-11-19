# DXB TKTS — Image & Film Production Brief (AI generation)

**Purpose:** every image the website needs, with file name, size and a ready-to-use prompt, so the whole set can be generated with AI and owned outright, with no stock-licence or scraping risk.
**Status:** 18 November 2026. Today the site uses 8 checked Unsplash photos and drawn placeholders for desert and yacht scenes (`lib/images.ts`).
**Delivery:** export each file as **WebP (quality 80–85)** and save it at the path given in the table. Send me the folder when it is ready and I will wire every image into `lib/images.ts` and the product data.

---

## 1. Rules before generating

1. **One visual world.** Every image should look like it comes from the same shoot. Use the *house style* below as a suffix on every prompt.
2. **Show the experience, not a fantasy.** Product images must match what the supplier actually delivers (boat size, vehicle type, camp style). AI images are allowed as **illustrative** visuals until real supplier photos arrive. When you sign a supplier, replace that product's main image with their real photo, or regenerate it to match their boat or vehicle. Showing a product the customer will not get is a consumer-protection risk.
3. **Landmarks:** Burj Khalifa, Burj Al Arab, Atlantis and the Museum of the Future may appear **in the background as part of the skyline**. Do not make a hotel building the hero subject of an advertisement. Jumeirah, for example, protects Burj Al Arab imagery commercially.
4. **No logos, no readable brand names, no text** in any image (on boats, cars, uniforms or signs). The website adds all text.
5. **People:** natural and candid, often seen from behind or in profile. Diverse international guests, GCC families and couples. Modest, respectful clothing in desert and cultural scenes. No celebrity look-alikes, no children's faces in close-up, and no AI "team photos" presented as real staff.
6. **Check every image at 100% zoom** for AI artefacts: hands, extra fingers, warped railings, melted text, impossible reflections, wrong number of yacht decks. Reject anything uncanny. Premium brands are judged on these details.
7. **Licence:** use a generator whose terms grant you commercial rights to the output, and keep a simple log (file, tool, date, prompt) in `public/images/ai/LOG.md`.

### House style (append to every prompt)
> *editorial travel photography, natural golden-hour or blue-hour light, warm sand and deep navy palette, subtle film grain, true-to-life colours, no HDR, no oversaturation, shallow depth of field where appropriate, shot on a full-frame camera with 35mm or 50mm lens, premium magazine quality, photorealistic, no text, no logos, no watermarks*

### Negative prompt (use where the tool supports it)
> *text, letters, logo, watermark, signage, brand names, distorted hands, extra fingers, deformed faces, cartoon, illustration, 3d render, oversaturated, HDR, blurry, low resolution, crowds, plastic skin, fisheye*

---

## 2. Homepage hero

| File | Size | Use |
|---|---|---|
| `public/images/ai/hero-desktop.webp` | 3840×2160 (16:9) | Hero background and video poster, desktop |
| `public/images/ai/hero-mobile.webp` | 1440×2560 (9:16) | Hero background, mobile |

**Prompt (desktop):** *Wide view of the Dubai skyline at blue hour seen from the water off Dubai Marina, a sleek white private yacht in the lower third cutting a soft wake toward the city lights, Burj Khalifa faint on the far horizon, calm sea with warm reflections, cinematic composition with empty dark sky in the upper left for headline text,* + house style.
**Prompt (mobile):** same scene composed vertically, with the yacht in the lower third and the skyline in the middle. Leave the top 40% calm for text.

### Hero film — "Sand · Sea · Sky · City" (recommended concept, Report 4)
Generate four **5-second clips** (AI video tool, 1080p, 24 fps, no audio). Then edit them into one 18–20 s loop. Export **H.264 MP4 ≤ 4 MB** and **WebM**, plus a **720p vertical mobile cut ≤ 2 MB**.

| File | Shot prompt |
|---|---|
| `public/videos/hero-01-sand.mp4` | *Low tracking shot following a dune buggy cresting a red sand dune at sunrise, sand spray backlit by the sun, slow motion, Dubai desert* |
| `public/videos/hero-02-sea.mp4` | *Drone pull-back from the bow of a white private yacht in Dubai Marina at golden hour, revealing the marina towers, smooth gimbal movement* |
| `public/videos/hero-03-sky.mp4` | *View from a helicopter window turning over Palm Jumeirah toward the coastline at late afternoon, gentle bank, sun glare on the sea* |
| `public/videos/hero-04-city.mp4` | *Night, a black luxury car door opening slowly on a quiet street, the illuminated Dubai skyline reflected on the polished paintwork, shallow depth of field* |
| `public/videos/hero-loop.mp4` / `.webm` | Final edit: cut 1 → 2 → 3 → 4 → back to 1, hard cuts on motion, no text burned in |
| `public/videos/hero-loop-mobile.mp4` | Vertical 9:16 recrop of the same edit, 12–15 s |

---

## 3. Category images (6)

All `public/images/ai/category-<slug>.webp`, **2400×1800 (4:3)**, subject centred low so the title can sit over the bottom third.

| File | Prompt |
|---|---|
| `category-on-the-water.webp` | *A white 60-foot private yacht anchored off the Dubai coastline at sunset, a few guests relaxing on the bow deck seen from a distance, turquoise water, skyline soft in the background* |
| `category-desert.webp` | *Sweeping red-orange dunes of the Dubai desert at golden hour, a single 4x4 vehicle on a ridge in the distance with a thin trail of sand, long shadows* |
| `category-sky.webp` | *Aerial view from a helicopter over Palm Jumeirah at late afternoon, the fronds and coastline clearly visible, helicopter window frame subtly at the edge* |
| `category-transfers.webp` | *A chauffeur in a dark suit holding a car door open for a guest beside a black premium SUV at a modern hotel entrance in Dubai at dusk, faces not visible, warm lobby light* |
| `category-day-trips.webp` | *Sheikh Zayed Grand Mosque in Abu Dhabi at sunset, white marble domes and reflecting pool, a small group of modestly dressed visitors walking under the arcades, wide shot* |
| `category-attractions.webp` | *Visitors silhouetted against floor-to-ceiling windows on a skyscraper observation deck above Dubai at sunset, city grid far below* |

---

## 4. Product images (12 × 3 = 36)

For each product: **1 main image** `product-<slug>-1.webp` at **2880×1800 (16:10)**, and **2 gallery images** `-2`, `-3` at **2400×1800 (4:3)**.

| Product (slug) | Main image prompt (`-1`) | Gallery `-2` | Gallery `-3` |
|---|---|---|---|
| `private-yacht-charter` | *White 60-ft private yacht cruising past Dubai Marina towers at golden hour, small group of friends on the aft deck, seen from a chase boat* | Aft-deck lounge with cushions, soft drinks on a table, marina in background | Guests swimming off the yacht's swim platform in calm turquoise water |
| `sunset-celebration-yacht` | *Yacht deck decorated for a celebration at sunset, balloons in sand and white tones, a cake on a table, couple seen from behind looking at the sea* | Close-up of a rose-petal and candle setup on the bow at dusk | Group of friends raising glasses (non-alcoholic), faces partly turned |
| `jet-ski-burj-al-arab` | *Two jet skis riding side by side on a bright blue sea off the Jumeirah coast, sail-shaped hotel small in the background, spray, daytime* | Rider in life jacket, action shot, motion blur | Jet skis lined up on a beach at morning with guide briefing |
| `private-desert-safari` | *Private 4x4 parked on a dune crest at sunset, a family of four watching the sun go down, seen from behind, vast dunes* | Low-lit private camp with lanterns, cushions and a dinner table for six under the stars | 4x4 tyres on soft sand with spray, dynamic dune drive |
| `premium-desert-safari` | *Spacious desert camp at twilight with lanterns, low seating and a small number of guests, warm fire glow* | Plated Arabic dinner on a low table | Camel resting near the camp at blue hour |
| `dune-buggy` | *Two-seat dune buggy racing over red dunes in morning light, sand spraying from the rear wheels, driver in helmet* | Four-seat buggy group stopped on a ridge for photos | Close-up of buggy wheel and sand, golden light |
| `hot-air-balloon` | *Several hot-air balloons floating over the Dubai desert at sunrise, soft pastel sky, mist low on the dunes* | Inside a balloon basket looking down over dunes, passengers' hands on the rail | Balloon landing with crew at dawn |
| `helicopter-tour` | *Helicopter flying over the Palm Jumeirah coastline at golden hour, shot from another aircraft* | Passenger view through the window over Dubai Marina | Helicopter on a helipad at a waterfront, morning |
| `airport-transfer` | *Chauffeur holding a blank name sign (no readable text) in a bright modern airport arrivals hall, traveller approaching with a suitcase, seen from behind* | Black premium SUV on a Dubai highway at night with skyline | Interior of a premium car rear seat with water bottle and soft light |
| `private-chauffeur` | *Black premium sedan parked in front of a luxury shopping mall entrance at night, driver waiting beside it* | Driver opening the rear door at a waterfront restaurant at dusk | Rear-seat passenger looking out at Downtown towers |
| `abu-dhabi-day-trip` | *White marble courtyard of Sheikh Zayed Grand Mosque with visitors in modest dress, bright morning light, sense of scale* | Louvre Abu Dhabi-style dome with light filtering through a lattice (generic, no copied architecture details) | Private car on the highway between Dubai and Abu Dhabi, desert landscape |
| `burj-khalifa-at-the-top` | *Couple seen from behind at an observation deck window at sunset, Dubai skyline far below* | Observation deck interior with floor-to-ceiling glass, few visitors | Night view of the city grid from very high above |

> **Note for the Abu Dhabi gallery `-2`:** do not try to reproduce the Louvre Abu Dhabi dome exactly. Generate a generic lattice-light scene, or use the museum's official press images under their terms.

---

## 5. Section images

| File | Size | Section | Prompt |
|---|---|---|---|
| `section-philosophy.webp` | 1600×2000 (4:5) | Home "Our philosophy" | *Calm hotel balcony at blue hour overlooking Dubai Marina, two chairs and a small table, no people, warm interior light* |
| `story-evening.webp` | 2400×1650 | Home story "A Table Above the City" | *Elegant dinner table for two by a floor-to-ceiling window high above Downtown Dubai at night, candles, city lights* |
| `story-desert.webp` | 2400×1650 | Home story "Silence, Sand & Starlight" | *Private desert camp at night, lanterns, starry sky, dunes softly lit, no people* |
| `gallery-icons.webp` | 2400×2400 | Home gallery (large) | *Dubai skyline at blue hour from across the water, long exposure, reflections* |
| `gallery-water.webp` | 1600×1200 | Home gallery | *Aerial top-down of a white yacht on turquoise water* |
| `gallery-dunes.webp` | 1600×1200 | Home gallery | *Abstract dune ridges with long shadows at sunset* |
| `gallery-night.webp` | 1600×1200 | Home gallery | *Rooftop terrace at night with soft lights and city view, people out of focus* |
| `gallery-journey.webp` | 1600×1200 | Home gallery | *Car headlights trailing along Sheikh Zayed Road at night, long exposure* |
| `corporate-hero.webp` | 2880×1600 | Corporate page | *Group of professionals in smart-casual dress on a yacht deck at sunset, seen from a distance, Dubai skyline* |
| `request-hero.webp` | 2880×1600 | Plan with us page | *Hands holding a phone with a blank screen beside a coffee on a hotel terrace overlooking the sea, morning* |
| `about-hero.webp` | 2880×1600 | About page | *Quiet Dubai Creek scene at early morning with traditional abra boats and modern towers behind, soft light* |

---

## 6. Social sharing images (Open Graph)

| File | Size | Notes |
|---|---|---|
| `og-default.webp` (+ `.jpg` copy) | 1200×630 | Hero scene cropped wide. I will add the logo and text in code or a design tool; generate it without text |
| `og-experiences.jpg` | 1200×630 | Category collage feel: yacht, desert, sky |

---

## 7. Totals

| Group | Count |
|---|---|
| Hero stills | 2 |
| Hero film clips + edits | 4 clips → 3 exports |
| Categories | 6 |
| Products | 36 |
| Sections | 11 |
| Social | 2 |
| **Total stills** | **57** |

**Suggested order:** hero stills → 6 categories → the 12 product main images (`-1`) → sections → gallery images → film. With the hero, categories and product main images done (20 images), the site already looks complete.
