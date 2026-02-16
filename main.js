"use strict";

// mailto pas bij klik (privacy-first)
function openMail(u, d, s, b) {
  const to = u + "@" + d;
  const p = [];
  if (s) p.push("subject=" + encodeURIComponent(s));
  if (b) p.push("body=" + encodeURIComponent(b));
  location.href = "mailto:" + encodeURIComponent(to) + (p.length ? "?" + p.join("&") : "");
}

function intakeBody() {
  return [
    "Hoi UrbanChill,",
    "",
    "Ik wil graag een intake aanvragen.",
    "",
    "Reisdatum:",
    "Verblijfsduur:",
    "Nairobi (gebied/wijk indien bekend):",
    "Solo of Adventure:",
    "Wat is voor mij belangrijk (rust/tempo/planning):",
    "",
    "Dank!"
  ].join("\n");
}

function signalBody() {
  return [
    "Hoi UrbanChill,",
    "",
    "Ik wil graag via Signal afstemmen voor vertrouwelijke communicatie.",
    "Kunnen jullie aangeven hoe we kunnen starten?",
    "",
    "Reisdatum:",
    "Verblijfsduur:",
    "Korte toelichting:"
  ].join("\n");
}

const sendIntake = () => openMail("intake", "urbanchill.nl", "Intake aanvraag UrbanChill (Nairobi)", intakeBody());
const sendSignal = () => openMail("intake", "urbanchill.nl", "Signal verzoek UrbanChill", signalBody());

// null-safe attach (crasht nooit)
function on(id, evt, fn) {
  const el = document.getElementById(id);
  if (el) el.addEventListener(evt, fn);
}

on("btnIntake", "click", sendIntake);
on("btnIntake2", "click", sendIntake);
on("btnSignal", "click", sendSignal);
on("btnSignal2", "click", sendSignal);

// Praktische info accordion (1 open tegelijk)
(function () {
  const toggles = Array.from(document.querySelectorAll(".mw-toggle"));
  if (!toggles.length) return;

  function closeAll() {
    toggles.forEach((b) => {
      b.setAttribute("aria-expanded", "false");
      const pid = b.getAttribute("aria-controls");
      const p = pid ? document.getElementById(pid) : null;
      if (p) p.classList.remove("open");
    });
  }

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      closeAll();
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        const panelId = btn.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        if (panel) panel.classList.add("open");
      }
    });
  });
})();
