# Vercel Deployment Guide - Atlas Wealth

## ✅ Completed

The landing page has been successfully created and tested locally. All core components are ready for deployment:

- ✅ **Landing Page** (`/app/page.tsx`) - Professional landing page introducing both Lavish Morocco and WealthOS
- ✅ **Routing** (`vercel.json`) - Updated to serve landing page as root
- ✅ **SEO Metadata** (`/app/layout.tsx`) - Updated with Atlas Wealth branding
- ✅ **Development Testing** - Landing page loads successfully on `localhost:3000`

---

## 📋 Deployment Checklist

### Step 1: Configure Environment Variables in Vercel

Go to your Vercel project dashboard and add these environment variables:

**Firebase (WealthOS Authentication):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA5oTl6C94-3GfbnmhCWZ1R6HKkcvrD93M
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=wealthos-cac68.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=wealthos-cac68
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=wealthos-cac68.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=931695057109
NEXT_PUBLIC_FIREBASE_APP_ID=1:931695057109:web:31b71c5ae0df6d72a9aa5c
```

**Payment Processing:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51TG10VRswW2dpQPkd15FUMueC4T8drMzX1atCvjN8o2TJNidC4mhkxXVQzW2sG3qWN5AUWGeDLM3P8boFQum7sFp00hRiWXG3F
STRIPE_SECRET_KEY=STRIPE_KEY_REMOVED
NEXT_PUBLIC_PAYPAL_CLIENT_ID=Afffw2u4QPOT-Q5ELMQ8BILzWN5wV5fcQ0iz-lMdROv2Q29Cq4iX36WKCYzCSa9Vo5fSKn_YUZF_CWgd
```

**Email Service:**
```
RESEND_API_KEY=re_ddNfnAFb_PiHEXfU4oEqaNee8X3BKYRaL
```

**Site Configuration:**
```
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

### Step 2: Deploy to Vercel

Option A: **Automatic Deployment** (Recommended)
```bash
git add .
git commit -m "feat: Add landing page and prepare for Vercel deployment"
git push
```
Vercel will automatically detect the push and deploy your changes.

Option B: **Manual Deployment**
```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Deploy to production
vercel --prod
```

### Step 3: Verify Deployment

After deployment completes:

1. **Test Landing Page**
   - Navigate to your Vercel domain (e.g., `https://atlas-wealth.vercel.app`)
   - Verify all sections load correctly
   - Check responsive design on mobile/tablet/desktop

2. **Test Navigation**
   - Click "Browse Services" button → Should navigate to `/lavish-morocco`
   - Click "Access Dashboard" button → Should navigate to `/wealthos`
   - Verify both apps load properly

3. **Test Sub-Applications**
   - Visit `/lavish-morocco` → Luxuryfronterior site should load
   - Visit `/wealthos` → Wealth dashboard with Firebase login should appear
   - Test Firebase authentication with: `a.allazim@gmail.com`

4. **Check Browser Console**
   - Open DevTools (F12)
   - Check Console tab for any errors
   - Should be clean or only show minor warnings

5. **Test Form Submissions** (if applicable)
   - Test Lavish Morocco contact form
   - Verify Resend email service is working

---

## 🔗 Important URLs

After deployment, you'll have:

| URL | Purpose |
|-----|---------|
| `https://atlas-wealth.vercel.app/` | Landing page (new) |
| `https://atlas-wealth.vercel.app/lavish-morocco` | Luxury concierge site |
| `https://atlas-wealth.vercel.app/wealthos` | Wealth dashboard |

---

## 📊 Demo Credentials

**Email:** `a.allazim@gmail.com`

Display this prominently to users who want to test WealthOS:
- Located on landing page in "Demo Access" section
- Also available on WealthOS login page
- Valid for Firebase authentication

---

## 🚀 Post-Deployment Steps

1. **Monitor Performance**
   - Check Vercel Analytics for page load times
   - Monitor Core Web Vitals
   - Check for any errors in Vercel Logs

2. **Update DNS** (if using custom domain)
   - Go to Vercel project settings
   - Add custom domain
   - Update DNS records according to Vercel instructions

3. **Optional Enhancements**
   - Add Google Analytics
   - Set up error tracking (Sentry)
   - Configure CDN caching headers

4. **Backup Plan**
   - Keep local `.env.local` with all secrets
   - Document all Vercel environment variables
   - Set up alerts for failed deployments

---

## 🛠️ Troubleshooting

### Landing page shows 404
- Check that `/app/page.tsx` exists and has proper exports
- Verify `vercel.json` doesn't have conflicting redirects
- Clear Vercel build cache and redeploy

### Firebase authentication not working
- Verify all Firebase environment variables are set correctly
- Check that Firebase project is not in a restricted region
- Ensure test email account exists in Firebase console

### Stripe payments failing
- Verify API keys are from the correct Stripe account (test vs live)
- Check that webhook endpoints are configured
- Review Stripe dashboard for payment logs

### Sub-applications not loading
- Check that `/app/lavish-morocco/` and `/app/wealthos/` directories exist
- Verify all imports and dependencies are available
- Check Vercel deployment logs for specific errors

---

## 📝 Notes

- This landing page replaces the previous redirect to `/lavish-morocco`
- All existing functionality in Lavish Morocco and WealthOS is preserved
- No database changes required for this deployment
- All authentication handled by Firebase (WealthOS) and Resend (emails)

---

**Ready to Deploy?**

1. Ensure all environment variables are configured in Vercel
2. Push changes to main branch (or use `vercel --prod`)
3. Monitor deployment progress in Vercel dashboard
4. Run verification tests from "Step 3" above
5. Celebrate! 🎉

