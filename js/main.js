/* ============================================================
   XV AÑOS · MEREDITH — Lógica de la invitación
   ============================================================ */

// -------- 1. Fecha del evento (cámbiala aquí si cambia la fecha/hora) --------
const EVENT_DATE = new Date("2026-09-26T19:30:00-05:00").getTime();

// -------- 2. Fecha límite y datos del formulario ya no aplican --------
// (el RSVP ahora se hace directo por el botón de WhatsApp)

// ============================================================
// Apertura del sobre
// ============================================================
const welcome = document.getElementById("welcome");
const invitation = document.getElementById("invitation");
const welcomeStage = document.getElementById("welcomeStage");
const sealButton = document.getElementById("sealButton");

function openInvitation() {
  if (welcomeStage.classList.contains("is-opening")) return;
  welcomeStage.classList.add("is-opening");
  sealButton.disabled = true;

  setTimeout(() => {
    welcome.style.display = "none";
    invitation.classList.add("open");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, 3500);
}

sealButton.addEventListener("click", openInvitation);

// ============================================================
// Contador regresivo
// ============================================================
function countdown() {
  const difference = Math.max(0, EVENT_DATE - Date.now());
  const values = [
    Math.floor(difference / 864e5),
    Math.floor(difference / 36e5) % 24,
    Math.floor(difference / 6e4) % 60,
    Math.floor(difference / 1e3) % 60
  ];
  ["days", "hours", "minutes", "seconds"].forEach((id, i) => {
    document.getElementById(id).textContent = String(values[i]).padStart(2, "0");
  });
}
countdown();
setInterval(countdown, 1000);

// ============================================================
// Copiar número de cuenta
// ============================================================
document.getElementById("copyAccountBtn").addEventListener("click", async () => {
  const feedback = document.getElementById("copyFeedback");
  const accountNumber = "0032043572";

  try {
    await navigator.clipboard.writeText(accountNumber);
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = accountNumber;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  feedback.textContent = "¡Copiado!";
  feedback.classList.add("show");
  setTimeout(() => feedback.classList.remove("show"), 1800);
});

// ============================================================
// Animación de aparición al hacer scroll
// ============================================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ============================================================
// Iconos (lucide)
// ============================================================
if (window.lucide) {
  lucide.createIcons();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) lucide.createIcons();
  });
}
