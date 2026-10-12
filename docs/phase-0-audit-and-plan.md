# Bali Bliss Redesign — Phase 0: Research, Audit & Implementation Plan

Prepared: 2026-10-12 · Status: **awaiting approval — no application code has been written**

Legend used throughout:
- **[V]** verified directly (HTTP fetch, parsed HTML, public API response, image inspection or headless-browser render)
- **[U]** unverified / could not be checked with available tooling
- **[R]** recommendation or assumption (not a fact about the current site)

---

## 1. Executive summary

- **Local environment [V]:** `D:\clone1` was empty (no repo, no files). Node 24.13.0, npm 11.6.2, git 2.53 and Chrome are available. Nothing was installed or changed.
- **Source site [V]:** WordPress + Divi theme, with plugins Amelia Booking (v9.9.1) + Amelia DOKU connector (Indonesian payment gateway), WooCommerce (used only as Amelia's checkout), GTranslate, WP WhatsApp, two Google-review widgets (Trustindex/"widget-google-reviews" and Site Reviews), Website Testimonials, WP Statistics. No Google Analytics / Meta pixel detected. Yoast SEO generates the sitemap.
- **Scale [V]:** 42 pages, 85 blog posts, 12 categories, 2 author archives, 307 media-library items (305 images, 1 short MP4, 1 AVIF).
- **Biggest architectural constraint [V]:** Every booking runs through **Amelia inside WordPress**, with deposits paid via WooCommerce → DOKU. A Next.js site cannot run Amelia. The booking engine must stay on WordPress (e.g. a `book.` subdomain) or be replaced by a different system. **This is the key decision I need from you** (§10).
- **Content quality [V]:** Content is rich and authentic (FAQs, schedules, retreat pricing, bios, 85 articles), but there are many inconsistencies: two different WhatsApp/phone numbers, conflicting names, wrong bio links, copy-paste errors, no meta descriptions anywhere, broken links, orphan pages, and back-office pages that search engines can index. All of these are listed in §3.6 for your decision. **None will be silently changed.**
- **Creative direction [R]:** The plan stays close to the real brand: lagoon-teal and orchid-plum from the logo, on warm sand/ivory. The working concept is **"Daily Offering"**: an editorial, ritual-paced layout. The logo's hand-drawn double ring becomes the single recurring motif. It replaces the hypothesis's "forest green + terracotta" because the real brand colours are teal and plum. A restrained clay accent is kept from the photography.
- **Recommended approach [R]:** Use Next.js App Router (JavaScript) with CSS custom-property tokens + CSS Modules and GSAP/ScrollTrigger via `@gsap/react`. Content moves into the repo as structured JS/JSON, and blog posts are migrated once through the open WordPress REST API. All existing URLs are preserved with trailing slashes, so almost no redirects are needed.

---

## 2. Methodology (what was actually done)

| Step | Method | Result |
|---|---|---|
| Discover URLs | `robots.txt` → Yoast `sitemap_index.xml` → 6 child sitemaps | 42 pages, 85 posts, 12 categories, 2 authors, 1 product [V] |
| Fetch pages | `curl` of every page-sitemap URL + insights p2 + a category + the product | All 200; `/checkout/` 302 → `/cart/` [V] |
| Extract | Custom Node script (no packages): titles, meta, canonical, robots, headings, text, links, nav, footer, images, iframes, forms, plugins, fonts | `_summary` per page [V] |
| Link check | Status of all 87 unique internal hrefs | 2 broken (404), 4 missing trailing slash (301) [V] |
| Booking catalogue | Amelia public `entities` endpoint (read-only GET) | Services, prices, durations, locations, staff names [V]. Customer list empty; staff records have no email/phone, so no PII exposure was found. I deleted the local copy anyway. |
| Assets | Downloaded the 105 unique page media + logo symbol to a scratch folder; measured dimensions | §4 [V] |
| Visual review | Headless Chrome screenshots (desktop 1440px; "mobile") | Desktop verified. **Mobile not verifiable:** headless Chrome forces a ≥504px viewport, so true phone layouts are **[U]** |
| REST API | `/wp-json/wp/v2/{posts,pages,media}` | Open; post bodies are Divi shortcode-HTML [V] |

**Not done / not possible here [U]:** true mobile-device emulation, Lighthouse/Core Web Vitals, keyboard/screen-reader testing of the live site, the behaviour of the Amelia widget past step 1, the DOKU payment step, and font licence checks for the logo wordmark. The live site was never modified.

---

## 3. Deliverable A — Source website audit

### 3.1 Navigation [V]

**Header** (Divi mega-menu): logo · **Book Now** (`/book-now/`) · **Wellness Sessions** (`#`), which holds Reiki Healing, Sound Therapy; *Nervous System Regulation* (`#`): Somatic Practices, Soul Full; *Rituals & Ceremonies* (`#`): Sacred Cacao Ceremony, Inner Guidance; *Massage Therapy* (`#`): Facial Reflexology, Intuitive Healing Massage, Chi Nei Tsang Healing; then Mat Pilates, Qigong, Yoga Sessions · **Day Retreats** → hub + 5 retreats · **Workshops** (`#`) → Yoga Alignment & Fundamentals · **Training** (`#`) → Usui Reiki L1, L2 · **About** (`#`) → 5 bios + Our Partners · **Insights** · cart icon (`/checkout/`) · search · GTranslate language switcher · floating WhatsApp "Need Help? Chat with us".

**Footer:** logo + intro paragraph · social (Facebook, Instagram, YouTube `@baliblisswellness`, WhatsApp) · *Info Links* (Make Booking `/bookings/`, Privacy, Terms) · *Wellness* (8 services) · *Facilitators* (5 bios) · "Copyright© 2025 … Designed by Cybernamix".

### 3.2 Page inventory

New-route policy **[R]**: keep every public URL exactly as it is today (trailing slash), so search equity and shared links survive. "Keep" means the same path.

| # | Page | Existing URL | Purpose / key sections | Key assets | Interactions | Proposed route | SEO / a11y notes |
|---|---|---|---|---|---|---|---|
| 1 | Home | `/` | Hero "Wellness and Healing in Ubud"; intro; 5 "Daily Sessions" CTA tiles; 6 service features; 5 facilitators; 2 VIP drivers; "Not sure?" CTA; 2 Google-review widgets | BaliBlissHome800, SoundTherapyTall, Reiki800x600, TarotHome, Facial/Massage, team portraits, drivers 1.png/2.png, Divi stock (meditation-center-04/05/11/39, portrait-square-11) | 7 booking CTAs → `/book-now/`; 2 **broken** "Learn More" | Keep | No meta description, no OG; empty alts |
| 2–15 | 14 service pages | `/reiki/`, `/sound-therapy/`, `/somatic-practices/`, `/soul-full/`, `/sacred_cacao-ceremony/`, `/inner-guidance/`, `/facial-reflexology-massage/`, `/intuitive-healing-massage/`, `/chi-nei-tsang-healing/`, `/mat-pilates/`, `/qigong-session/`, `/yoga/`, `/postural-alignment-therapy/`, `/yoga-alignment-fundamentals/` | A shared pattern: H1 + tagline, 4 intro Q&As, "What to expect", facilitator cards, 7–8 FAQs, 3 testimonials (on some), booking CTAs → `/bookings/` | 2–3 photos each; yoga has 9 class cards | FAQ toggles; CTAs | Keep | FAQs suit FAQPage schema; alt text is copy-pasted ("Reiki with Crystals") on ~20 images; FAQ headings are H5 |
| 16 | Day retreats hub | `/one-day-healing-retreats-in-bali/` | Concept, 6 promises, morning/midday/afternoon journey, 5 retreat cards (duration + "From IDR"), guides (Jero Mangku Artha, Lia), practical info | 2026/04 retreat set, BaliBliss-Retreats-small (1920w hero) | Anchor scroll; WhatsApp "Discuss a Booking Time" | Keep | **No H1**; closing block has no button |
| 17–21 | 5 retreats | `/purification-and-blessing/`, `/sacred-healing-purification-ritual/`, `/sacred-birthday-blessing-ceremony/`, `/sacred-renewal-immersion/`, `/sound-soul-healing-immersion/` | Hero tagline (format • price), "Is this right for you?", step journey, inclusions, priest, details (duration, Friday availability, solo/couple IDR), upsells | 800×500 retreat photos | **No booking CTA on any** | Keep | Product/Offer schema possible |
| 22 | Weekend mini retreat | `/weekend-mini-retreats/` | 1-day Reiki L1 + sound immersion; hourly schedule; IDR 5,000K pp / 9,600K couple; inclusions | none | Divi contact form (name, email-or-WhatsApp, dates, experience, notes, math captcha) | Keep | **Orphan** (not linked anywhere) |
| 23–24 | Reiki training L1, L2 | `/usui-reiki-training-level-1/`, `/usui-reiki-training-level-2/` | Learn / receive / duration (in-person 3h/4h, online 2/3 meetings), FAQs, trainer Lia | WhatsApp-named photos | **No CTA, no price on page** (Amelia: L1 IDR 2,550,000; L2 IDR 3,850,000) | Keep | — |
| 25–29 | 5 facilitator bios | `/about-lia-natali/`, `/about-arsita-putri/`, `/about-kiki-dewi/`, `/about-kadek-yuli/`, `/about-yulia-andriyani/` | Bio, credentials, specialties, "Book a session with X" | 400–1024px portraits | CTA → `/bookings/` | Keep | Person schema; name inconsistencies |
| 30 | Partners | `/partners/` | Copy, 8 partner logos (no names in text), "Become a partner" → `lia@balibliss.net` | 2025/04/1–8.png | mailto | Keep | Logos have empty alt. Identified from the images: Haigha House, Blue Karma Dijiwa, Kampung Uma Dawa, Nyuh Bali, The Alena, Milliways Bali, Samyama, Tulus Hati [V by image] |
| 31 | Insights (blog) | `/insights/` (+`/page/N/`) | 10 cards/page: image, title, date, category, excerpt | featured images 1600×914 | Pagination ("Older Entries" `?et_blog`) | Keep + `/insights/page/[n]/` | Page 2 canonicalised to page 1 (bug) |
| 32 | 85 posts | `/{post-slug}/` (root level) | Articles by Lia Natali, 12 categories | featured images | — | Keep, same slugs | Article schema; no meta descriptions |
| 33 | 12 categories | `/category/{slug}/` | Should list category posts; **loop shows latest posts from all categories** (bug) | — | — | Keep (fixed) | — |
| 34 | Author archives | `/author/jasbir/`, `/author/lia/` | Lia's posts appear under slug "jasbir" | — | — | 301 → `/about-lia-natali/` [R] | — |
| 35 | Book Now | `/book-now/` | Amelia step form (Service / Practitioner / Location → Date & Time → Your Info) + reviews; sidebar shows **+628133659182** and **bookings@balibliss.net** | — | Amelia | 301 → `/bookings/` [R] (two booking URLs today) | **No H1** |
| 36 | Bookings | `/bookings/` | "Make a Booking" Amelia widget + Google Map + reviews | Map iframe | Amelia | Keep: becomes the booking hub (§10 Q1) | — |
| 37 | Thank you | `/thank-you-for-your-booking/` | "we will confirm shortly by email…" | — | — | Keep, **noindex** | Currently indexable |
| 38 | Customer panel | `/customer-panel/` | Amelia customer self-service | — | Amelia | Lives with the booking engine (§10) | Currently indexable |
| 39 | "Facilitators" | `/facilitators/` | **Amelia staff back-office panel** | — | Amelia | Lives with the booking engine; must be noindex | **Indexable today — fix on live site regardless** |
| 40–44 | WooCommerce | `/shop/`, `/cart/`, `/checkout/`, `/my-account/`, `/product/booking-reservation/` | Checkout plumbing for Amelia deposits (Rp 0 placeholder product) | WC placeholder | — | Stay with the booking engine; 301 from new site [R] | `/shop/` + product indexable |
| 45–46 | Legal | `/privacy-policy/`, `/terms-conditions/` | Policies (full text captured) | — | — | Keep | Privacy contact `info@balibliss.net` |
| — | Broken | `/tarot-card-reading`, `/facial-massage` | Linked from home "Learn More" | — | 404 | 301 → `/inner-guidance/`, `/facial-reflexology-massage/` | — |

### 3.3 Business facts captured [V]

**Contact**
- WhatsApp (footer, 45 links): `+62 815-8641-7127`.
- Amelia sidebar + location record: `+62 813-3659-182`.
- Emails: `bookings@balibliss.net` (Amelia), `info@balibliss.net` (privacy), `lia@balibliss.net` (partners).
- Socials: Facebook / Instagram / YouTube `baliblisswellness`.

**Locations** (from Amelia)
1. **Ubud Center @ Mayu House**: Jalan Raya Ubud No.888, opposite Bali Buda.
2. **Mas @ Wana Stay**: Jl. Rapuan, Mas, "brown gate, next to Warung Gurihan BBQ", 15 min outside centre.
3. **Singakerta, Ubud**: Evina Villa.
4. **Kuta / Seminyak / Kerobokan**: at the client's hotel or villa.
5. **Online**: Google Meet.
6. **Collaborators only**.

The T&C names only Mayu House and Wana Stay, and says that location details are shared on confirmation. Google listings: "Ubud Center" (133 reviews) and "Mas" (45 reviews, 5.0).

**Session catalogue & prices** (Amelia, IDR, visible services)

| Group | Services and prices |
|---|---|
| Reiki | 60' Regular 1,050,000 · 60' + Crystals 1,250,000 · 90' + Sound 1,650,000 · 90' + Inner Guidance 1,650,000 |
| Sound | Chakra & Meridian Massage Therapy 90' 1,650,000 · Deep Reset Journey by Lia 60' 1,350,000 · Vibrations & Energy Renewal by Yuli 60' 1,350,000 · Chakra Balancing single 75' 1,050,000 / couple 1,950,000 · Full-body Reset Activation 90' 1,650,000 · Energy Alignment 60' 1,050,000 · Singing Bowl Training 180' 3,050,000 |
| Massage | Chi Nei Tsang 60' 1,800,000 · Facial Reflexology 60' 350,000 · Postural Alignment 60' 1,050,000 · Intuitive Healing Massage 75' 550,000 |
| Nervous system | Somatic Practices 60' 1,700,000 · Soul Full 90' 1,050,000 |
| Ritual | Sacred Cacao Ceremony 90' 1,050,000 (1–4 people) |
| Movement | Yoga classes (Beginners & Seniors, Gentle Deep Stretch, Hatha, Vinyasa, Yoga Sculpt, Restorative, Yin) 60' 550,000 · Mat Pilates 550,000 · Qigong 550,000 · Yoga Alignment & Fundamentals workshop 90' 2,200,000 |
| Training | Usui Reiki L1 180' 2,550,000 · L2 240' 3,850,000 |
| Programs | Pathway to Balance (2 sessions) 2,500,000 · Inner Alignment Series (4 sessions) 5,200,000 |
| Online | Reiki 1,050,000 · Reiki + Crystals 1,250,000 · Yoga Nidra 550,000 · Breathwork + Sound 45' 350,000 · Qigong 550,000 |

- Deposits vary per service (25%, 40%, 50%, or a fixed 200,000/500,000).
- **Note:** service pages show *no* prices today. Prices appear only inside the booking widget.
- **Not linked from any page:** "Pathway to Balance", "Inner Alignment Series" and "Singing Bowl Training" exist only in Amelia.

**Retreats (on pages)**

| Retreat | Duration | Solo (IDR) | Couple (IDR) |
|---|---|---|---|
| Purification & Blessing | 3h, Fri 10:00–13:00 | 1,700,000 | 2,800,000 |
| Sacred Healing & Purification | ~4h, Fri 10:00–14:00 | 2,200,000 | 3,800,000 |
| Birthday Blessing | ~2h | 2,300,000 | 3,900,000 |
| Sacred Renewal Immersion | full day, Fri | 3,900,000 | 6,500,000 |
| Sound & Soul Immersion | full day, Fri | 4,200,000 | 7,000,000 |
| Weekend mini retreat | 1 day | "5,000K" pp | "9,600K" couple |

**People**
- **Facilitators:** Lia Natali (founder; Reiki trainer), Arsita Putri (yoga), Kiki Dewi (yoga, Mat Pilates, Reiki, spa), Kadek Yuli (massage, Reiki, sound), Yulia Andriyani (Qigong, EFT).
- **Also named:** priest Jero Mangku Artha; drivers Pak Likko and Pak Kadek.
- **Amelia also lists** staff with no public page: Akia M., Corina R., EunSeong C., Guru G, and a "jasbir singh test" account.

**Policies** (T&C, full text captured)
- All booking communication goes through WhatsApp.
- Bookings need ≥2h advance notice.
- A non-refundable deposit is required; the balance can be paid in cash.
- One reschedule is allowed, with ≥2h notice (24h for Chi Nei Tsang, Somatic and Yoga Alignment).
- Clients must disclose health conditions.

### 3.4 Booking & enquiry mechanisms [V]

1. **Amelia widget** on `/bookings/` and `/book-now/`. The flow is service → practitioner → location → date/time → details. Required custom fields are "Intentions for your session" and a T&C acceptance radio. Payment goes through WooCommerce checkout ("PLACE ORDER") → DOKU gateway. The thank-you page follows, and customers manage bookings at `/customer-panel/`. *Steps beyond the first screen and the payment step are [U].*
2. **WhatsApp**: footer icon, floating widget, and "Discuss a Booking Time" on the retreat hub.
3. **Divi contact form** on the orphan weekend-retreat page.
4. **mailto** to `lia@` for partnerships.
5. **No contact page exists.** "Contact Us" on the homepage points to `/book-now/`.

### 3.5 Visual & UX observations (desktop render [V]; mobile [U])

- The brand palette is coherent (teal, plum, warm sand), but **Divi's default blue `#2ea3f2` leaks into CTAs** ("View Booking Options").
- The type stack is crowded: Lora, Crimson Text, Cinzel, Open Sans, plus Amelia's own font.
- The homepage is a long, uniform stack of image+text rows (6 near-identical "Learn More" features). The hierarchy between "book now" and "learn more" is unclear, and seven CTAs all go to the same booking page.
- Mega-menu parents are `href="#"` (non-navigable).
- The Amelia widget is visually foreign: Open Sans, different blue buttons.
- Two different review carousels sit stacked, each with its own branding.
- The floating WhatsApp bubble overlaps content near the footer.
- Many images are small (400–800px) and get stretched in wide layouts.
- **Unverified:** real mobile behaviour, touch targets, menu usability on phones, and actual CLS/LCP. These need proper device emulation (Playwright) in Phase 1.

### 3.6 Issues, conflicts & uncertain facts (for your review — nothing will be silently "fixed")

**Business-critical conflicts**
1. Two contact numbers: WhatsApp `+62 815-8641-7127` vs Amelia `+62 813-3659-182`. *Which is primary?*
2. Confirmation channel: T&C says WhatsApp; thank-you page says email.
3. Fees: T&C says prices include all fees; the retreat hub says "online payment fees may apply" and "additional transport fees may apply".
4. Locations: T&C lists 2 venues in Ubud; Amelia lists 6, including Kuta/Seminyak in-villa visits. Mat Pilates is south-Bali only.
5. Retreat availability: three pages say "Fridays", the birthday page doesn't, and the hub says "by appointment".
6. Weekend retreat: lunch is "included" in the schedule but not in the inclusions list. Prices are written in "5,000K" notation.
7. Inner Guidance: the page says both "uses oracle cards" and "doesn't rely on… cards". Testimonials and alts say "tarot", and the footer says "Intuitive Readings".
8. Facial Reflexology: Yuli is listed as facilitator, but all 3 testimonials are about Lia.
9. Credentials: Yuli lists only Usui Reiki Level 1 while offering paid Reiki. Kiki states no Pilates certification. *I will not add or alter credentials; this is for your awareness.*
10. Prices exist in Amelia but not on pages. *Should prices be shown on the new service pages?*

**Content defects (copy-paste / typos)**
- Sacred Renewal's afternoon heading says "Sound Healing Immersion" over Reiki content.
- The Birthday "Closing & Reflection" text duplicates the blessing text.
- Chi Nei Tsang's CTA uses the Qigong line.
- Soul Full has a duplicate FAQ.
- Sound & Soul has a duplicated sentence.
- Typos: "Relaxe", "Rejuventating", "undertsand", "Whats Included" ×5, "en d", "offer s", "r escheduled", "inEmotional" (also in a post slug), a stray "}", "Soul FUll", "It highlight".

**Links & IA**
- 2 broken links (`/tarot-card-reading`, `/facial-massage`).
- Kiki's card links to Yulia's bio (on the Mat Pilates and Yoga pages); several cards have no bio link.
- 2 orphan pages: `/postural-alignment-therapy/`, `/weekend-mini-retreats/`.
- 6 nav parents are `#`.
- 8 pages have no booking CTA (both training pages, all 5 retreats, and the hub's closing block).
- "Message us for personalised recommendations" is unlinked everywhere.

**SEO**
- 0/42 pages have a meta description or OG tags.
- No H1 on `/book-now/` or the retreat hub.
- `/facilitators/` (staff panel), `/customer-panel/`, `/shop/`, the Rp 0 product and the thank-you page are indexable.
- Insights page 2 canonicalises to page 1.
- Category archives show unrelated posts.
- Lia's posts sit under author slug `jasbir`.
- A test service ("email testing") and a test staff member exist in Amelia (hidden or visible-without-services).

**Accessibility**
- Wrong or duplicated alt text on ~20 images; empty alts on retreat images, partner logos and portraits.
- Heading levels are skipped (H2 → H5).
- Paragraphs are marked up as H5/H6.
- Icon-font glyph bullets render as a stray "L".

**Health-claim language** (collagen, toxins, sinus, constipation, trauma) should be reviewed by you. I will reproduce it verbatim unless told otherwise.

---

## 4. Deliverable B — Asset inventory

### 4.1 Brand assets [V]

| Asset | File | Size | Notes |
|---|---|---|---|
| Primary logo (horizontal) | `2025/03/Transparent-Logo-1.png` | 1626×512 PNG | Teal ring+leaf mark, italic serif "Bali Bliss", plum sans tagline "reconnect restore renew" |
| Logo symbol | `2025/03/Original-Logo-Symbol.png` / `cropped-…512` | 958×988 / 512×512 | Favicon source (32/180/192 variants exist) |
| **Missing** | Vector (SVG/AI/PDF) logo, wordmark font name, brand guidelines | — | **Needed** for crisp rendering; otherwise I will use the 1626px PNG + symbol PNG [U] |

**Brand colours** (Divi global settings, plus colours sampled from the logo):

| Name | Hex | Where it's used |
|---|---|---|
| Teal | `#2a6371` | link colour + logo |
| Plum | `#825c85` | tagline / headings |
| Gold | `#d8b36a` | global colour |
| Sand | `#d4a373`-ish | footer / tiles |

**Fonts loaded today:** Lora, Cinzel, Crimson Text (Google Fonts, OFL), Open Sans (Amelia). The logo wordmark font is **unidentified** [U].

### 4.2 Photography & graphics (105 page assets + 307 in the media library) [V]

| Group | Files (dims) | Quality tier |
|---|---|---|
| Wide heroes | BaliBliss-Retreats-small 1920×950 (woman on jungle steps); video_call_meditation 1920×1080 (*likely stock*) | A |
| Service photography | Chi-Nei-Tsang ×2 (1535/1024), Somatic-Experiences ×2, Yoga-Alignment ×2, Cacao 1448×1086 + 768×1024, Soul-Full ×3, Intuitive-reading 1536×1024, Qigong WA photos 1280×853, Mat Pilates WA 1024×1536, Postural ×3 | A/B |
| Older service set | Reiki/Sound/Facial/Massage/Tarot "LS" 1100×~540; tall 428–867w; yoga class cards 400×445 ×9 | B/C |
| Retreats | 2026/04 set, 800×500 ×7 (Jero Mangku, sound, birthday, Lia) | B |
| People | lia.jpeg 1024×1536; liaa 400²; Arsita 400²; dewi 600²; Yuli 400²; Yulia 800²; drivers 1024² ×2 | B/C |
| Partners | 8 logos, 650×650 PNG | — |
| Blog featured images | ~85 at 1600×914 / 1659×948 (many are designed graphics) | A |
| Video | `2026/06/cacao-4.mp4`: 5s, 1024×576, unused on pages | B |

**Tiers:** A ≥1400px wide, suitable for full-bleed · B 800–1399px, suitable for half-width · C <800px, suitable for cards/portraits only.

**Flagged assets**
- `meditation-center-04/05/11/39`, `portrait-square-11`: these filenames match Divi layout-pack demo images. Their licence is tied to Divi, so **reuse on a non-Divi site is uncertain** [U]. I recommend not using them unless you confirm the rights.
- `ChatGPT-Image-Mar-4-2026…png` (Mat Pilates) is AI-generated on the source site. It is a source asset, but it conflicts with the "authentic imagery" goal. *Keep or drop?*
- `woocommerce-placeholder` must not be used.
- Many filenames are raw (`WhatsApp-Image-…`, `IMG-…-WA…`, `New-Project.png`). They will be renamed descriptively in the new repo, with an originals map kept.
- **Resolution gap:** most service and retreat photos are ≤1100px. Full-bleed editorial layouts need originals. **Request:** original-resolution photo files from the client, if they exist.
- **No YouTube embeds** exist on any page, although a channel is linked.

---

## 5. Deliverable C — Proposed sitemap

All paths keep today's slugs, with `trailingSlash: true`.

```
/                                        Home
/wellness-sessions/                      NEW hub (replaces the "#" menu parent) — all sessions grouped
  /reiki/  /sound-therapy/  /somatic-practices/  /soul-full/  /sacred_cacao-ceremony/
  /inner-guidance/  /facial-reflexology-massage/  /intuitive-healing-massage/
  /chi-nei-tsang-healing/  /mat-pilates/  /qigong-session/  /yoga/  /postural-alignment-therapy/
/one-day-healing-retreats-in-bali/       Retreats hub
  /purification-and-blessing/  /sacred-healing-purification-ritual/
  /sacred-birthday-blessing-ceremony/  /sacred-renewal-immersion/  /sound-soul-healing-immersion/
  /weekend-mini-retreats/                (de-orphaned; linked from hub + training)
/yoga-alignment-fundamentals/            Workshop
/usui-reiki-training-level-1/  /usui-reiki-training-level-2/   Training
/about/                                  NEW: story + team + drivers + locations (replaces "#" parent)
  /about-lia-natali/ … /about-yulia-andriyani/   (5 bios)
  /partners/
/insights/  /insights/page/[n]/  /category/[slug]/  /[post-slug]/  (85 posts, same slugs)
/bookings/                               Booking hub: how booking works, CTA into booking engine, WhatsApp, locations, map
/contact/                                NEW (none exists; "Contact Us" currently points to booking)
/thank-you-for-your-booking/             noindex
/privacy-policy/  /terms-conditions/
/not-found (404)                         custom
```

**Proposed additions:**
- `/wellness-sessions/` and `/about/` turn the current dead `#` menu parents into real pages for keyboard, touch and SEO.
- `/contact/` gives enquiries a home separate from booking.

Optional (needs your approval): pages for the Amelia-only programs (Pathway to Balance, Inner Alignment Series, Singing Bowl Training). **I will not create them without your content approval.**

**Redirects (301)**

| From | To |
|---|---|
| `/book-now/` | `/bookings/` |
| `/tarot-card-reading` | `/inner-guidance/` |
| `/facial-massage` | `/facial-reflexology-massage/` |
| `/author/*` | `/about-lia-natali/` |
| `/shop/`, `/cart/`, `/checkout/`, `/my-account/`, `/product/*`, `/customer-panel/`, `/facilitators/` | equivalent booking-engine URL, or `/bookings/` (depends on Q1) |

**Route count:** ~38 static routes + 85 posts + 12 categories + paginated insights.

---

## 6. Deliverable D — Original creative direction: "Daily Offering"

**Idea.** Bali Bliss is not a spa menu. It is small, repeated acts of care: a Reiki hour, a Friday water blessing, a breath practice from the journal. The site should read like a calm printed field guide to those rituals. It is editorial and paced, with each page unfolding the way a session does: *arrive → understand → feel safe → choose → book*. This structure is grounded in the content that already exists (intro Q&As → what to expect → facilitator → FAQs → booking). The design gives that sequence a deliberate rhythm instead of stacked Divi rows.

**Signature motif (one only).** The logo's **hand-drawn double ring**, redrawn as an SVG stroke. It is used in three places: as an organic image mask on portraits, as a section marker, and as a subtle stroke-draw animation on the hero. There are no blobs, no gradients and no glassmorphism.

**Colour strategy [R]** (validated against the real logo, not the hypothesis)

| Token | Value | Role | Contrast note |
|---|---|---|---|
| `--c-lagoon-700` | `#2a6371` | Primary brand / buttons / links | ≈6.2:1 on ivory, passes AA text (to be re-verified with tooling) |
| `--c-lagoon-900` | `#173e48` | Dark sections, footer, heading ink | high |
| `--c-orchid-600` | `#825c85` | Secondary: eyebrows, italic display accents | ≈5:1 on ivory, AA |
| `--c-clay-600` | `#9a4f31` | Restrained accent from the photography (offerings, temple brick, red dress); used for small highlights and hover rules | to verify |
| `--c-gold-300` | `#d8b36a` | Hairlines/ornament **only** | fails text contrast, so never used for text |
| `--c-ivory-50` | `#faf6ef` | Page background | — |
| `--c-sand-100` | `#f1e8da` | Alternate surface | — |
| `--c-ink-900` / `--c-ink-600` | `#1f2526` / `#53605f` | Body / muted text | AA |
| success / warning / error | `#2f6b45` / `#8a5a00` / `#a1322b` | Form states, always with icon+text | — |

Hypothesis check: "forest green" is replaced by the brand's **lagoon teal**, and "terracotta" is kept as a *restrained clay accent*.

**Typography direction [R]** (two options; your choice)
- **Option 1, editorial (recommended):** Display **Fraunces** (variable, OFL, soft optical sizing, used in light weights with italic accents that echo the logo's italic serif) + body **Instrument Sans** (OFL, highly legible, calm geometry that pairs with the tagline's sans).
- **Option 2, continuity:** Display **Lora** (already on the site) + body **Source Sans 3**. This is the safer choice, but less distinctive.

Both are self-hosted via `next/font` (no runtime Google request). The logo stays an image. The wordmark font is unidentified, so it will not be imitated in live text.

**Layout approach**
- A 12-column editorial grid with asymmetric image/text pairings: 7/5 splits, offset captions, and occasional full-bleed Tier-A images.
- A "ritual index": numbered sections (01 Arrive, 02 What happens, 03 Your guide, 04 Questions, 05 Book).
- The homepage organises sessions by **intention** (Release & Restore / Move & Strengthen / Ritual & Ceremony / Learn) rather than by a card grid.
- Retreats use a horizontal **day-timeline** (Morning / Midday / Afternoon) built from the real schedules.
- Section patterns are deliberately varied (no "three cards everywhere"). Square corners or a small radius; pill shapes only for tags.

**Imagery strategy**
- Authentic on-site photography leads. People are shown in place (verandas, offerings, the water temple with Jero Mangku).
- Tier A images go full-bleed; Tier B go at half-width; Tier C only as portraits or cards inside the ring mask.
- Images are never upscaled beyond ~1.25×.
- Consistent art-directed crops via `object-position` per image.
- Partner logos are shown in a monochrome-on-hover strip with real names as alt text.

**Motion principles (GSAP + ScrollTrigger)**
- Motion is used sparingly:
  - the hero ring draws itself once;
  - images reveal with a soft clip-path from a mask;
  - headings and paragraph groups get gentle staggered fade-ups;
  - one pinned sequence only: the retreat day-timeline on desktop.
  - Small parallax (≤8% translate) on two or three hero images.
- All motion is disabled under `prefers-reduced-motion`. Content is visible by default: the no-JS / pre-hydration state is fully readable, with no hidden-until-animated content. Mobile drops pinning and parallax.

---

## 7. Deliverable E — UI/UX standards checklist

**Tokens**
- [ ] All colours, type, spacing (4px base: 4/8/12/16/24/32/48/64/96/128), radii (0/4/8/999), shadows (2 levels), widths (prose 68ch; content 1200px; wide 1440px), breakpoints (480/768/1024/1280/1536), motion (120/240/480/800ms + 3 easings) and z-index layers live in `styles/tokens.css`. No magic numbers in components.

**Typography**
- [ ] Fluid `clamp()` scale: hero 2.5→5rem, H1 2.25→3.75, H2 1.75→2.75, H3 1.375→1.75, H4 1.125→1.25, body 1.0625rem/1.65, small 0.875, label 0.75 uppercase +0.08em tracking.
- [ ] Line length ≤ 70ch.
- [ ] No heading level skipping.
- [ ] Hero headings tested at 320px with no overflow.

**Buttons / links**
- [ ] Variants: primary (lagoon), secondary (outline), text-link with arrow, WhatsApp (brand-consistent, not green bubble-styled).
- [ ] Every variant has default, hover, active, focus-visible (2px offset ring, ≥3:1), disabled, and loading (for the contact form).
- [ ] One primary per section.
- [ ] Links look like links.

**Forms (contact / weekend-retreat enquiry): frontend-only, per the §15 workflow rules**
- [ ] No backend, API route or server action. Each form is an **enquiry composer**: it validates on the client, then opens WhatsApp (`wa.me` with a prefilled message) or the user's email client (`mailto:` with a prefilled subject and body).
- [ ] The submit button says exactly what happens ("Continue in WhatsApp" / "Open email"). There is **no fake "Sent!" state**; the confirmation reads "Your message is ready in WhatsApp — press send there".
- [ ] Labels bound to inputs; correct `type`/`autocomplete`; required marked in text.
- [ ] Inline + summary errors announced via `aria-live`. Duplicate-open guard.
- [ ] Booking CTAs link to the **existing live booking system** (Amelia on balibliss.net) and never simulate availability or payment.

**Booking**
- [ ] Booking buttons deep-link to the real booking engine (or WhatsApp with a prefilled service message). No fake availability, no fake payment.

**Navigation**
- [ ] Desktop: disclosure-pattern dropdowns (button + `aria-expanded`), opening on click/Enter/Space as well as hover, closing on Esc/outside click.
- [ ] Mobile: full-screen dialog menu with focus trap, scroll lock, return focus, and accordion groups.
- [ ] Header shrinks on scroll down and reappears on scroll up.
- [ ] Skip link. Breadcrumbs on service, retreat, bio and post pages.
- [ ] Footer mirrors the IA.

**Accessibility (WCAG 2.2 AA)**
- [ ] Semantic landmarks; logical headings.
- [ ] Contrast verified with tooling.
- [ ] Meaningful alts are rewritten from image content, and corrected where the source is wrong (needs your OK); decorative images get `alt=""`.
- [ ] Touch targets ≥24px (aim 44px).
- [ ] Focus-not-obscured by the sticky header (`scroll-padding-top`).
- [ ] FAQ uses `<details>`/`<summary>` or an accessible accordion.
- [ ] Reduced motion respected. Language attribute set; GTranslate replacement decision in §10.

**Responsive**
- [ ] Tested at 320, 375, 414, 768, 1024, 1280, 1440 and 1920.
- [ ] Crops art-directed; no horizontal overflow; pinned sections off below 1024px; buttons full-width on phones where appropriate.

**Animation**
- [ ] `useGSAP` with scoped context; ScrollTrigger refresh after images and fonts load; cleanup on unmount; no layout shift; reduced-motion path.

**Testing**
- [ ] Playwright route crawl (status, console errors, failed requests, broken images, overflow check, screenshots at 3 widths).
- [ ] axe-core scan.
- [ ] Keyboard pass.
- [ ] Lighthouse on a production build.
- [ ] Metadata/robots/sitemap assertions.

---

## 8. Deliverable F — Technical implementation plan

**Stack [R]**
- Next.js (latest stable at install time), App Router, **JavaScript**; React (bundled).
- `gsap` + `@gsap/react`.
- Styling: CSS custom properties + **CSS Modules** (no Tailwind, which keeps tokens canonical and avoids utility sprawl).
- Linting: ESLint (Next config) + Prettier.
- Dev-only: **Playwright** + `@axe-core/playwright` for QA; `sanitize-html` for the one-off post migration script.

*Dependency installs need your approval.*

**Structure**
```
app/
  layout.js            fonts, <Header/>, <Footer/>, skip link, default metadata
  page.js              home
  wellness-sessions/page.js
  [slug]/page.js       resolves: services | retreats | trainings | bios | legal | posts (static params)
  one-day-healing-retreats-in-bali/page.js   about/  partners/  insights/  insights/page/[n]/
  category/[slug]/page.js   bookings/  contact/  thank-you-for-your-booking/
  sitemap.js  robots.js  not-found.js  opengraph-image (optional)
components/
  layout/   Header, NavMenu, MobileMenu, Footer, Breadcrumbs, SkipLink
  ui/       Button, Link, Eyebrow, RingMask, Tag, Accordion(FAQ), PriceLine, Figure
  sections/ Hero, IntroQA, ExpectSteps, FacilitatorStrip, FAQSection, Testimonials,
            BookingCTA, DayTimeline, Inclusions, DetailsCard, PartnerStrip, PostCard, Pagination
  motion/   Reveal, ParallaxImage, RingDraw (client components, reduced-motion aware)
content/
  site.js (contact, socials, locations) · services/*.js · retreats/*.js · trainings/*.js
  people/*.js · partners.js · testimonials.js · posts/*.json (migrated) · categories.js
lib/        seo.js (metadata + JSON-LD builders), booking.js (deep-link builder), content.js (loaders)
styles/     tokens.css, globals.css, typography.css
public/media/{brand,home,services/<slug>,retreats,people,partners,blog}/   renamed source assets
scripts/    migrate-posts.mjs, fetch-assets.mjs (+ assets-map.json original→new)
tests/      e2e/*.spec.js (Playwright)
```

**Frontend-only constraint (§15):**
- No backend, database, auth or API infrastructure is created.
- Every page is statically generated.
- External services are only *linked* (Amelia booking on the live site, WhatsApp, email, Google Maps, social profiles).
- The post migration script is a one-off local build tool that reads the public REST API. It is not a runtime backend.

**Server/client boundaries:** pages and sections are Server Components (rendered at build time). Only `Header`/`MobileMenu`, `Accordion` (if not `<details>`), `motion/*` and `EnquiryForm` are client components.

**Content:**
- Service, retreat and people data are transcribed **verbatim** from the audit into JS modules. Corrections are applied only where you approve them.
- Posts are migrated once through the REST API (85 posts): Divi wrappers are stripped, the content is sanitised to clean semantic HTML, images are rewritten to local files, and the posts are stored as JSON with title, slug, date, modified, category, excerpt, featured image and author.

**Images:** `next/image` with explicit width/height, `sizes`, AVIF/WebP, and `priority` on the hero only. Below-the-fold images lazy-load.

**SEO:**
- Per-route `generateMetadata` (title template "… | Bali Bliss Wellness & Healing", new descriptions written from existing copy, for your review).
- Canonical, Open Graph and Twitter tags.
- JSON-LD: `LocalBusiness`/`HealthAndBeautyBusiness` ×locations, `Service`, `FAQPage`, `Person`, `Article`, `BreadcrumbList`.
- `sitemap.js` and `robots.js` disallow utility pages; thank-you is noindex; redirects go in `next.config.js`.

**Third parties:**
- Google Map: a click-to-load facade (privacy + performance).
- Reviews: a static, curated selection rather than the Trustindex script (§10 Q6).
- WhatsApp: a plain `wa.me` link (no plugin script).
- No analytics unless requested.

**QA approach:** Playwright crawler over every route in `sitemap.js` + axe + screenshots at 375/768/1440 + a keyboard script for nav/menu/accordion/form + Lighthouse on `next build && next start`. Results are recorded in `docs/qa-report.md`, with untested items marked as such.

---

## 9. Deliverable H — Recommended implementation order

1. **Foundation** (after approval):
   - Scaffold Next.js (JS).
   - Tokens, fonts, global styles, layout shell (Header with full nav, MobileMenu, Footer), SEO helpers.
   - Asset import script (renamed files + map) and content data model.
   - A noindex `/styleguide/` page showing tokens and every component state.
   - **Review gate 1** (you approve the look on real components).
2. **Homepage**, built on the system. **Review gate 2.**
3. **Service template using Reiki first** (the most complete page: Q&As, expect, facilitators, 8 FAQs, testimonials). Then the other 13 services from the same template with per-service data. Variations are limited to approved section toggles, which keeps them consistent.
4. **Retreats**: hub + detail template (Purification first) → the other 4 + weekend retreat.
5. **Training & workshop** pages (reusing the retreat "details" and service FAQ sections).
6. **People**: `/about/`, 5 bios, partners.
7. **Insights**: migration script → index, pagination, categories, post template.
8. **Booking hub, contact, legal, thank-you, 404.**
9. **SEO pass**: metadata, JSON-LD, sitemap, robots, redirects.
10. **Full QA** (§8) on the running dev server at `http://localhost:3000`, fixing what turns up → **local review package** (URL, pages, interactions, test results, known issues) → **stop for your review.**

Publication follows the mandatory §15 order:
- **(a)** You approve GitHub publication → I confirm the repository with you, check `.gitignore` and that no secrets are included, then commit and push. Visibility is never changed without your approval.
- **(b)** You separately approve deployment → I connect GitHub to Vercel, deploy, and verify the live URL.
- Domain/DNS changes need their own approval.

**Consistency is maintained by:**
- one token file;
- section components that only accept content props, not ad-hoc styles;
- every page composed from the styleguide's components;
- templates that are data-driven;
- a Playwright visual snapshot per template to catch drift.

---

## 10. Deliverable G — Risks & open questions (decisions needed)

| # | Question / risk | Options | My recommendation |
|---|---|---|---|
| **Q1** | **Booking engine.** Amelia + WooCommerce + DOKU only run in WordPress. Under the frontend-only rule, the new site must *link to* this existing system, not rebuild it. | **During build:** booking CTAs open the live `https://balibliss.net/bookings/`, and retreats/trainings use WhatsApp with a prefilled message, as they do today. **At launch (needs a decision before deployment):** if the new site takes over `balibliss.net`, the WordPress booking engine must move to a subdomain (e.g. `book.balibliss.net`), or the new site must live on a different domain. Replacing Amelia with a SaaS is out of scope. | Linking now; the subdomain plan decided at the deployment gate. DNS changes only with your explicit approval. |
| Q2 | Primary phone/WhatsApp: `+62 815-8641-7127` or `+62 813-3659-182`? And the primary email (`info@` / `bookings@` / `lia@`)? | — | You confirm; I will not guess. |
| Q3 | Show prices (from Amelia) on service pages? | Yes, with "from IDR…" + duration / No | Yes. It removes friction, but the prices must be kept in sync with Amelia (they are manual data). |
| Q4 | Copy corrections: fix obvious typos and copy-paste errors listed in §3.6, or keep verbatim? | Fix the listed items only / verbatim | Fix only the typos and clear copy-paste errors listed, after your approval of that list. Business facts, credentials and claims stay unchanged unless you instruct otherwise. |
| Q5 | Contact & weekend-retreat forms. | **Resolved by §15 (frontend-only):** enquiry composers that open WhatsApp/email with a prefilled message (see §7). No backend. | — confirm only which number/email they target (Q2). |
| Q6 | Reviews: the live widgets show changing counts (133 Google / 45 at 5.0). | Keep the Trustindex embed (third-party JS) / static quotes from existing on-page testimonials + "Read our Google reviews" link | Static quotes + link. No hard-coded rating counts unless you want an "as of" date. |
| Q7 | Typography option 1 (Fraunces + Instrument Sans) or 2 (Lora + Source Sans 3)? | — | Option 1 |
| Q8 | Divi demo stock images (`meditation-center-*`, `portrait-square-11`) and the AI image on Mat Pilates: use or drop? | — | Drop the stock (licence uncertainty); keep the AI image only if you approve. |
| Q9 | GTranslate (multilingual) — replicate? | Machine-translate widget / none / proper i18n later | None at launch (reviews show international clients, but a machine-translation widget hurts accessibility and performance). Revisit. |
| Q10 | Can you supply the vector logo and higher-resolution photo originals? | — | Strongly preferred. |
| Q11 | Amelia-only programs (Pathway to Balance, Inner Alignment Series, Singing Bowl Training): give them pages? | — | Only with your copy approval. |
| Q12 | `/facilitators/` (staff panel) and `/customer-panel/` are publicly indexable on the **live** site today. | — | Outside this project's write scope, but I recommend you set them to noindex now. |

**Other risks**
- Amelia prices duplicated in the new site can drift.
- Deep-linking to a specific Amelia service needs per-service shortcode pages or URL parameters on the WordPress side [U].
- Post HTML from Divi may contain layout artefacts that need manual review.
- Small source images limit full-bleed use.
- Mobile behaviour of the current site is unverified.
- Vercel image optimisation quotas (on deployment).

---

## 11. Exact approval needed before coding begins

Please confirm:
1. **Plan and sitemap** (§5), including the three new pages (`/wellness-sessions/`, `/about/`, `/contact/`) and the redirects.
2. **Booking approach:** Q1. During the build, booking CTAs link to the live Amelia booking page and WhatsApp; the launch-time domain/subdomain plan is decided at the deployment gate.
3. **Answers to Q2–Q11**, or "use your recommendations".
4. **Permission to install dependencies** in `D:\clone1`: `create-next-app` scaffold (Next.js, React, ESLint), `gsap`, `@gsap/react`, and dev-only `prettier`, `@playwright/test` (+ Chromium download), `@axe-core/playwright`, `sanitize-html`.
5. **Permission to copy source assets** from balibliss.net into `public/media/` (renamed, with an originals map), and to migrate the 85 posts via the REST API (read-only).
6. **Creative direction "Daily Offering"** and the palette in §6, as the basis for the styleguide (review gate 1).

GitHub push and Vercel deployment remain **out of scope until you explicitly approve them separately**.
