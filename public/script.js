
const tips = [
  "Start saving 10% of everything you earn.",
  "Avoid impulse buying — wait 24 hours before non-essential purchases.",
  "Track your expenses for a week to see your habits.",
  "Set a clear savings goal — and give it a deadline.",
  "Invest in learning before investing in markets.",
  "A budget tells your money where to go instead of wondering where it went.",
  "Pay yourself first — make saving automatic.",
  "Every big goal begins with one consistent small habit."
];


const tipsSection = document.querySelector(".tips p");
if (tipsSection) {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  tipsSection.textContent = randomTip;
}


const playButton = document.querySelector("button:nth-of-type(1)");
const loginButton = document.querySelector("button:nth-of-type(2)");

if (playButton) {
  playButton.addEventListener("click", () => {
    alert("🎮 Starting the GAFIS Simulation...");
    window.location.href = "simulation.html"; 
  });
}

if (loginButton) {
  loginButton.addEventListener("click", () => {
    alert("🔑 Redirecting to Login Page...");
    window.location.href = "login.html"; 
  });
}
