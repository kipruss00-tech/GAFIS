// Example Firebase config (do NOT commit real credentials).
// Copy this file to `public/firebase-config.js` and replace the placeholder
// values with your Firebase web app's config if you prefer a local config file.

window.__firebase_config = JSON.stringify({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASURE_ID"
});

// Optional friendly app id used by the app to build Firestore paths.
window.__app_id = "your-app-id-or-project-id";

// Note: For real deployments it's recommended to rely on Firebase Hosting's
// runtime-injection (`/__/firebase/init.json`) which avoids storing config
// in your repository. See README.md for instructions.
