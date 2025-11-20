# GAFIS — Firebase Hosting & Local Run Instructions

This project is set up for Firebase Hosting (the `public/` directory is the hosting root). The app prefers runtime-injected Firebase configuration so you don't have to commit credentials to the repo.

Two recommended ways to run the site:

1) Recommended — Deploy to Firebase Hosting (runtime injection)

- Why: Firebase Hosting provides a runtime config at `/__/firebase/init.json` which the app will fetch automatically. This enables Google Sign-In and Firestore persistence without committing secrets.

Steps (PowerShell):

```powershell
npx -y firebase-tools --version || npm install -g firebase-tools

# login to Firebase
firebase login

# initialize hosting if you haven't already (choose 'public' for the public directory)
cd C:\Users\russk\OneDrive\Desktop\GAFIS
firebase init hosting

# deploy to hosting
firebase deploy --only hosting
```

After deploy, open your hosted site. The app will automatically fetch `/__/firebase/init.json` and enable Google Sign-In + Firestore persistence.

You can also preview locally using the emulator:

```powershell
firebase emulators:start --only hosting
```

2) Quick local test — copy a config file (not recommended for production)

- Why: Fast for development if you don't want to deploy. Keep credentials out of version control.

Steps:

1. Copy `public/firebase-config.example.js` to `public/firebase-config.js` and paste your web app config values.
2. Add `public/firebase-config.js` to `.gitignore` to avoid committing it.
3. Serve the `public/` directory with a local static server, for example:

```powershell
# using Python (if installed)
python -m http.server 8000 --directory public

# or using npx to run a simple static server
npx http-server public -p 8000
```

Open `http://localhost:8000` in your browser. With `public/firebase-config.js` present the app will initialize Firebase and enable Google Sign-In.

Security note
- Firebase web app config values (apiKey, projectId, etc.) are not secret in the same sense as server keys, but do not commit service account keys or private tokens to source control.

If you'd like, I can:
- Create `public/firebase-config.js` for you (you'll need to paste real values),
- Run a local preview or help you deploy to Firebase Hosting,
- Add `public/firebase-config.js` to `.gitignore` for you.
