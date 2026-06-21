# DXB TKTS — Deployment Guide

> Production deployment checklist and instructions for launching the luxury concierge website.

---

## Pre-Deployment Checklist

### Code Quality
- [ ] `npm run lint` passes with zero errors
- [ ] `npm run build` completes without warnings or errors
- [ ] TypeScript strict mode enabled
- [ ] All environment variables documented in `.env.example`
- [ ] No hardcoded secrets in source code

### Performance & SEO
- [ ] Lighthouse score ≥95 
- [ ] Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- [ ] Sitemap at `/sitemap.xml`
- [ ] `robots.txt` configured
- [ ] Mobile responsive (320px to 2560px)

### Accessibility
- [ ] axe DevTools: zero violations
- [ ] WCAG 2.1 AA compliance
- [ ] Visible focus states
- [ ] Color contrast AAA
- [ ] `prefers-reduced-motion` respected

### Internationalization
- [ ] EN content complete
- [ ] AR translations with RTL verified
- [ ] FR translations complete
- [ ] Locale switcher functional

### Forms & API
- [ ] Contact form validation
- [ ] API endpoints respond correctly
- [ ] Error messages clear
- [ ] Form logging ready for Zoho CRM

### Brand & Design
- [ ] DXB color palette throughout
- [ ] Consistent typography
- [ ] Images optimized
- [ ] No placeholder content visible

### Security
- [ ] HTTPS enabled (Vercel handles)
- [ ] Dependencies clean (`npm audit`)
- [ ] No console errors in production
- [ ] Secrets in env vars, never in code

---

## Deployment to Vercel

### 1. Connect Repository
```bash
# In Vercel dashboard:
# 1. Go to https://vercel.com/new
# 2. Connect GitHub repository
# 3. Select "Next.js" framework
# 4. Review build settings
```

### 2. Configure Environment Variables
Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_APP_URL=https://dxbtkts.com
NEXT_PUBLIC_WHATSAPP_NUMBER=+971XXXXXXXXX
ZOHO_CRM_API_TOKEN=your_token
NEXT_PUBLIC_ZOHO_ORG_ID=your_org_id
```

### 3. Deploy
```bash
# Automatic: Push to main (Vercel auto-deploys)
git push origin main

# Manual: Use Vercel CLI
npm install -g vercel
vercel --prod
```

### 4. Configure Custom Domain
Vercel Dashboard → Settings → Domains:
- Add `dxbtkts.com`
- Configure DNS records
- Wait 24 hours for propagation

### 5. Verify
```bash
curl https://dxbtkts.com/
curl https://dxbtkts.com/ar
curl https://dxbtkts.com/fr
```

---

## Post-Deployment Verification

- [ ] Homepage loads without errors
- [ ] Locale switching works (EN/AR/FR)
- [ ] Contact form submits
- [ ] Images display correctly
- [ ] Lighthouse score visible
- [ ] No console errors

---

## Zoho CRM Integration

1. Get Zoho credentials (API token, Org ID)
2. Add to Vercel env vars (never in code)
3. Uncomment stubs in `lib/api/zoho.ts`
4. Update `/api/enquiry` to call real API
5. Test end-to-end form submission

---

## Ongoing Maintenance

**Weekly:**
- Check error logs
- Verify form submissions to Zoho
- Spot-check for broken links

**Monthly:**
- Lighthouse audit
- Review analytics
- Test forms/API

**Quarterly:**
- Accessibility audit
- Content review
- Performance optimization
- Dependencies security update

---

## Rollback

If deployment breaks site:

```bash
# Vercel Auto-Rollback (easiest)
# Dashboard → Deployments → Click last-good → Promote

# Manual Rollback
git revert <commit-hash>
git push origin main
```

---

## Useful Commands

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # Lint & type check
npm audit            # Security audit
npm audit fix        # Auto-fix vulnerabilities
vercel --prod        # Deploy to production
```

---

**Resources:**
- Vercel: https://vercel.com/support
- Next.js: https://nextjs.org/docs
- Zoho CRM API: https://www.zoho.com/crm/developer/docs/
- Tailwind: https://tailwindcss.com

Last Updated: June 2024
