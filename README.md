# DXB TKTS — Luxury Concierge & Lifestyle Management Website

> A production-ready, multilingual luxury brand website for premium concierge services in Dubai.

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Copy environment template and configure
cp .env.example .env.local

# Run development server
npm run dev

# Open http://localhost:3006 in your browser
```

Build for production:
```bash
npm run build
npm start
```

Lint and type-check:
```bash
npm run lint
```

---

## Project Structure

```
DXB TKTS/
├── app/                      # Next.js 14 App Router
│   ├── [locale]/            # Locale-based routing (en, ar, fr)
│   │   ├── layout.tsx       # Page layout (header, footer)
│   │   ├── page.tsx         # Homepage
│   │   ├── services/        # Services pages
│   │   ├── membership/      # Membership tiers
│   │   ├── corporate/       # Corporate programs
│   │   ├── about/           # About/company
│   │   ├── contact/         # Enquiry form
│   │   ├── portal/          # Member portal (auth-gated, scaffolded)
│   │   ├── supplier/        # Supplier portal (scaffolded)
│   │   └── styleguide/      # Design system reference
│   ├── api/                 # API routes
│   │   ├── enquiry/         # Form submission handler
│   │   ├── request/         # Portal request handler
│   │   └── auth/            # Auth stub (NextAuth/Clerk later)
│   ├── layout.tsx           # Root layout (i18n setup)
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Reusable primitives (Button, Card, Badge)
│   ├── sections/            # Full-width sections (Hero, Services, etc)
│   ├── layout/              # Header, Footer, Locale Switcher
│   ├── forms/               # Enquiry, Request, Profile forms
│   └── providers.tsx        # Client context providers
├── lib/
│   ├── content/             # Structured copy & data (editable)
│   ├── mock/                # Mock data for portals & development
│   ├── api/                 # API utilities (Zoho integration stubs)
│   ├── utils.ts             # Helper functions
│   └── types.ts             # Shared TypeScript types
├── messages/                # i18n message catalogs
│   ├── en.json             # English (default)
│   ├── ar.json             # Arabic (RTL)
│   └── fr.json             # French
├── public/                  # Static assets
│   └── images/             # Hero, service, partner images
├── middleware.ts            # i18n routing middleware
├── i18n.config.ts          # Locale configuration
├── DXB_TKTS_Homepage_Copy_and_Assets.md  # Master copy file
├── DECISIONS.md             # Architecture & design decisions
├── CLAUDE.md               # Claude Code instructions (if any)
└── README.md               # This file
```

---

## Key Features

### 🌍 Internationalization (i18n)
- **Supported languages:** English (default), Arabic (RTL), French
- **Locale switcher:** Header dropdown to change language
- **Automatic routing:** URLs prefixed with locale code (`/en`, `/ar`, `/fr`)
- **Message catalogs:** `messages/` JSON files contain all UI copy

**To add a new language:**
1. Create `messages/[locale].json` with translations
2. Add locale to `i18n.config.ts` → `locales` array
3. Update `localeMeta` with language name and direction (ltr/rtl)

### 🎨 Design System
- **Tailwind theme:** DXB-branded colors, typography, spacing in `tailwind.config.ts`
- **Fonts:** Cormorant Garamond (serif, headers); Inter (sans, body)
- **Colors:** Ink, Navy, Gold, Ivory, Band, Slate (see tailwind.config.ts for hex values)
- **Styleguide:** Visit `/styleguide` to preview design system

### 📝 Copy Management
- **Master file:** `DXB_TKTS_Homepage_Copy_and_Assets.md`
  - All homepage copy, service descriptions, testimonials, partner logos, image URLs in one place
  - Non-developers can edit this file and commit changes
  - Components reference this file, not hardcoded text
- **To update copy:** Edit the markdown file, rebuild, deploy

### 🖼️ Image Asset Swapping
1. **Upload new image** to cloud storage (e.g., Unsplash, Cloudinary, S3)
2. **Copy URL** of the image
3. **Edit `DXB_TKTS_Homepage_Copy_and_Assets.md`** → find the section with the old URL
4. **Replace URL** with new one
5. **Commit & push** (images are linked, not embedded)

**Ensure images are:**
- High-resolution (1920×1080+ for hero, 1200×800+ for sections)
- Optimized (WebP format preferred, or compressed JPEG)
- Licensed for use (CC0, purchased, or company-owned)
- Accessible (meaningful alt text in the copy file)

### 🔐 Forms & API Routes
All forms are type-safe and validated with Zod:
- **Enquiry form** → `/api/enquiry` → Mocks success, ready for Zoho CRM
- **Portal request** → `/api/request` → Mocks success
- **Validation:** Server-side via Zod schemas in `lib/api/`

**To connect real backend:**
1. Replace mock handlers in `/api/` routes with actual API calls
2. Use `lib/api/zoho.ts` stubs as starting point
3. Add secrets to `.env.local` (never commit)
4. Update `.env.example` with variable names (no values)

### 💬 WhatsApp Integration
- **Click-to-chat link** in hero and CTA buttons
- **Environment variable:** `NEXT_PUBLIC_WHATSAPP_NUMBER`
- **Default:** Mocked with `+971` (UAE prefix)
- **To configure:** Set actual WhatsApp number in `.env.local`

### 🚪 Portal Scaffolds (Member & Supplier)
- Routes exist at `/portal` and `/supplier` but are not authenticated yet
- Mock data in `lib/mock/` allows UI design and navigation testing
- **To add real auth:** 
  - Install NextAuth or Clerk
  - Update middleware to protect routes
  - Replace mock data with real user data from backend

### 🔍 SEO & Performance
- **Metadata:** Per-page titles, descriptions, OG tags via Next.js Metadata API
- **Sitemap:** Auto-generated at `/sitemap.xml`
- **Robots:** `public/robots.txt` included
- **JSON-LD:** Structured data for Organization, LocalBusiness, Service types
- **Images:** Optimized with `next/image`, responsive srcsets
- **Fonts:** Google Fonts with subsetting and `font-display: swap`
- **Target:** Lighthouse ≥95 (desktop), ≥90 (mobile)

---

## Zoho CRM Integration

### Status
Currently **stubbed**—forms mock success and don't persist data.

### Setup (When Ready)
1. **Get Zoho credentials:**
   - CRM API token
   - Org ID
   - Lead module ID
   - (See Zoho documentation)

2. **Update `.env.local`:**
   ```
   ZOHO_CRM_API_TOKEN=your_token
   NEXT_PUBLIC_ZOHO_ORG_ID=your_org_id
   ```

3. **Uncomment stubs in `lib/api/zoho.ts`:**
   - `createLead()` — converts enquiry form to CRM lead
   - `createTicket()` — converts portal request to support ticket

4. **Test:**
   - Submit enquiry form
   - Verify lead appears in Zoho CRM
   - Check email notifications

---

## Development Workflow

### Adding a New Page
1. Create folder under `app/[locale]/[page]/`
2. Add `page.tsx` with metadata
3. Create section components in `components/sections/`
4. Add navigation link in `Header`
5. Add i18n strings to `messages/*.json`

### Adding a Service
1. Add service data to `lib/content/services.ts`
2. Update `DXB_TKTS_Homepage_Copy_and_Assets.md` with copy
3. Services grid auto-renders from data
4. Detail page pulls copy from same source

### Styling
- Use Tailwind classes with `dxb-` color tokens
- Avoid inline styles
- Reference `tailwind.config.ts` for available tokens
- Test in both light and dark modes (if applicable)

### i18n Workflow
1. Add English copy to component or `messages/en.json`
2. Use `useTranslations()` hook in client components
3. Use `getTranslations()` in server components
4. Add Arabic/French translations to respective JSON files
5. Test RTL rendering on Arabic version

### Performance
- Use `next/image` for all images (never `<img>`)
- Code-split heavy components with `dynamic()` if > 50KB
- Lazy-load below-the-fold sections
- Monitor Lighthouse scores: `npm run build && npx lighthouse http://localhost:3006`

---

## Deployment

### Vercel (Recommended)
1. Push code to GitHub/GitLab
2. Connect repo to Vercel
3. Set environment variables in Vercel dashboard (don't use `.env` files)
4. Auto-deploys on every push to `main`

### Manual Deploy
```bash
npm run build
npm start
```

### Pre-Deployment Checklist
- [ ] All pages render without errors
- [ ] Lighthouse score ≥90 on mobile
- [ ] No console errors or warnings
- [ ] Forms submit and return success
- [ ] Locale switcher works in all pages
- [ ] Mobile responsive (320px+)
- [ ] Images load correctly
- [ ] No hardcoded URLs or secrets in code

---

## Troubleshooting

### "next-intl error: Missing locale"
- Ensure URL includes locale prefix: `http://localhost:3006/en` not `http://localhost:3006`
- Check `middleware.ts` is present and correct

### Images not loading
- Verify image URL is in `next.config.js` `remotePatterns`
- Check image format (WebP, JPEG, PNG)
- Inspect Network tab in DevTools

### Build fails with TypeScript errors
- Run `npx tsc --noEmit` to see full type errors
- Check `tsconfig.json` paths configuration
- Ensure all components have proper type exports

### Slow build times
- Run `npm cache clean --force`
- Delete `.next/` folder and rebuild
- Check for large dependencies in `node_modules`

---

## Contributing

### Git Workflow
1. Create feature branch: `git checkout -b feature/your-feature-name`
2. Make changes, commit often: `git commit -m "Add X feature"`
3. Push to remote: `git push origin feature/your-feature-name`
4. Open PR, describe changes clearly
5. Merge after review (squash commits to keep history clean)

### Code Standards
- **Naming:** camelCase for variables/functions, PascalCase for components
- **Comments:** Only for "why" (non-obvious logic); not for "what"
- **Types:** Full TypeScript, no `any`
- **Formatting:** Prettier auto-formats on save (install VS Code extension)
- **Accessibility:** Run axe DevTools browser extension before committing

---

## Support & Documentation

- **Design System:** Visit `/styleguide` for component reference
- **Copy & Assets:** See `DXB_TKTS_Homepage_Copy_and_Assets.md`
- **Architecture:** See `DECISIONS.md` for design rationale
- **API Reference:** See `lib/api/` for integration stubs

---

## License

© 2024 DXB TKTS. All rights reserved.

---

**Built with Next.js 14, Tailwind CSS, Framer Motion, and next-intl.**  
**Hosted on Vercel. Deployed globally at the edge.**
