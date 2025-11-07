import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } 
  from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4qwyXxD8x6-oBq6Hj2aHJhwdYQw_empE",
  authDomain: "studio-6766352949-446a0.firebaseapp.com",
  projectId: "studio-6766352949-446a0",
  storageBucket: "studio-6766352949-446a0.firebasestorage.app",
  messagingSenderId: "548336738009",
  appId: "1:548336738009:web:58c02e1aa2dbdb837da8c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
function startGame() {
  window.location.href = "game.html";
}
window.startGame = startGame; 
function login() {
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      alert(`Welcome ${user.displayName || "Player"}!`);
      document.getElementById("login-btn").textContent = "Logout";
      document.getElementById("login-btn").onclick = logout;
      localStorage.setItem("userName", user.displayName);
    })
    .catch(error => {
      console.error("Login error:", error);
      alert("Login failed. Check console for details.");
    });
}
window.login = login;
function updateWelcomeMessage() {
  const userName = localStorage.getItem("userName");
  const messageEl = document.getElementById("welcome-message");

  if (!messageEl) return; // safety check
  if (userName) {
    messageEl.textContent = `Welcome back, ${userName.split(" ")[0]} 👋`;
  } else {
    messageEl.textContent = "Welcome to GAFIS 🎮";
  }
}

function logout() {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully!");
      document.getElementById("login-btn").textContent = "Login";
      document.getElementById("login-btn").onclick = login;
      localStorage.removeItem("userName");
    })
    .catch(error => {
      console.error("Logout error:", error);
    });
}
const messages = [
  "Every decision counts. Make it wisely 💡",
  "Financial freedom starts with smart choices 💰",
  "Budgeting is the game of life — play to win 🎯",
  "GAFIS: Where money meets mindset ⚡"
];

const tips = [
  "Start saving 10% of everything you earn.",
  "Avoid impulse buying — wait 24 hours before non-essential purchases.",
  "Track all your expenses for a week to see your habits.",
  "Set a clear savings goal — and give it a deadline.",
  "Separate your wants and needs before spending."
];

function randomMessage() {
  const box = document.getElementById("quote-box");
  if (!box) return;
  const msg = messages[Math.floor(Math.random() * messages.length)];
  box.innerHTML = `<p>${msg}</p>`;
}

function loadTips() {
  const tipsList = document.getElementById("tips-list");
  tipsList.innerHTML = "";
  tips.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.appendChild(li);
  });
}

window.addEventListener("load", () => {
  randomMessage();
  loadTips();
  updateWelcomeMessage();
});

