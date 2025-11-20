# Vercel Deployment Guide for GAFIS

This guide walks you through connecting your GAFIS project to Vercel for live, automatic deployments.

## Why Vercel?

- **Automatic deployments**: Every git push to your repo triggers a new deployment.
- **Live preview URLs**: Pull requests get automatic preview deployments.
- **Environment variables**: Securely inject Firebase config at deploy time (no secrets in repo).
- **Global CDN**: Your site is served from edge locations worldwide.

## Step 1: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (or connect your GitHub account if you already have Vercel)
3. Authorize Vercel to access your GitHub repositories

## Step 2: Import Your Repository

1. In Vercel dashboard, click **"Add New..." → "Project"**
2. Select **"Import Git Repository"**
3. Find and select `kipruss00-tech/GAFIS`
4. Click **"Import"**

## Step 3: Configure Environment Variables (Optional but Recommended)

If you want to use local Firebase config instead of Firebase Hosting's runtime injection:

1. In the Vercel project settings, go to **"Environment Variables"**
2. Add a variable named `FIREBASE_CONFIG` with your Firebase web config (as JSON string)
3. Vercel will inject this at deploy time

For now, since your app attempts to fetch `/__/firebase/init.json`, Vercel will serve it automatically if you've configured Firebase Hosting. If not, the app gracefully falls back to Test Mode.

## Step 4: Deploy

Once imported, Vercel will:
- Automatically detect that `public/` is your output directory (defined in `vercel.json`)
- Deploy your site to a URL like `https://gafis-[random].vercel.app`
- Set up a production domain (you can add a custom domain in project settings)

Every time you push to `main`, a new deployment is triggered automatically.

## Step 5: View Live Changes

1. Make a code change in your local repo
2. Commit and push:
   ```powershell
   git add .
   git commit -m "Your message"
   git push origin main
   ```
3. Vercel will start building automatically (check the Vercel dashboard)
4. Once done, your changes are live at your Vercel URL

## Linking Firebase Runtime Config with Vercel

If you want Vercel to serve Firebase's `/__/firebase/init.json`, you have two options:

### Option A: Use Vercel + Firebase Hosting Together (Advanced)

If you want the full Firebase Hosting runtime config injection:

1. Deploy to Firebase Hosting as well (see README.md)
2. In Vercel, add a rewrite to proxy `/firebase/*` requests to your Firebase Hosting domain

This is more complex; I can help if you want it.

### Option B: Simpler — Pass Firebase Config via Vercel Env Vars (Recommended)

1. In Vercel project settings → Environment Variables, add:
   - Key: `FIREBASE_CONFIG`
   - Value: Your Firebase web config as JSON string (e.g., `{"apiKey":"...","projectId":"..."}`)

2. In `public/index.html`, after the module imports, add a small inline script to inject it:

```html
<script>
  // Inject Vercel env var if available (during build this is unavailable, but at runtime the app will try /__/firebase/init.json)
  if (typeof window.__firebase_config === 'undefined' && window.FIREBASE_CONFIG) {
    window.__firebase_config = window.FIREBASE_CONFIG;
  }
</script>
```

For now, your app will work in Test Mode on Vercel (users can enter an email). When you're ready to enable persistence, update `.gitignore` to allow committing `public/firebase-config.js` OR use the Vercel env var approach above.

## Checking Deployment Status

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your **GAFIS** project
3. Under **"Deployments"**, you'll see each build and its status (Building, Ready, Error)
4. Click any deployment to see logs and preview

## Quick Recap

```powershell
# 1. Make sure your changes are committed and pushed
git status
git add .
git commit -m "Your change"
git push origin main

# 2. Check Vercel dashboard for live update
# Dashboard will auto-detect the push and deploy
```

That's it! Your site is now live and updates automatically.

---

**Need Help?**
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Firebase + Vercel: [firebase.google.com/docs/hosting/deployment](https://firebase.google.com/docs/hosting/deployment)
