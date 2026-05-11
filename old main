/* UrbanChill main.js */

/* ---------------- PAGE NAVIGATION ---------------- */

function showPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageName).classList.add('active');

  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  const navBtn = document.querySelector('[data-nav="' + pageName + '"]');
  if (navBtn) navBtn.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event delegation voor alle data-page knoppen (vervangt inline onclick)
document.addEventListener('click', function(e) {
  const btn = e.target.closest('[data-page]');
  if (btn) {
    e.preventDefault();
    showPage(btn.getAttribute('data-page'));
  }
});

document.querySelector('[data-nav="home"]').classList.add('active');

/* ---------------- API ENDPOINTS ---------------- */

const API_INTAKE  = "https://cockpit.urbanchill.org/api/intake/create";
const API_CONTACT = "https://cockpit.urbanchill.org/api/contact/create";

/* ---------------- UI MESSAGE ---------------- */

function setMessage(messageEl, type, text) {
  if (!messageEl) return;
  messageEl.classList.remove("uc-msg", "uc-success", "uc-error");
  messageEl.classList.add("uc-msg");
  if (type === "success") messageEl.classList.add("uc-success");
  if (type === "error")   messageEl.classList.add("uc-error");
  messageEl.textContent = text;

  if (type === "success") {
    clearTimeout(messageEl._ucHideTimer);
    messageEl._ucHideTimer = setTimeout(() => {
      messageEl.textContent = "";
      messageEl.classList.remove("uc-msg", "uc-success", "uc-error");
    }, 6000);
  }
}

/* ---------------- SEND PAYLOAD ---------------- */

async function sendPayload(payload, url, messageEl, formEl, submitBtn) {
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Versturen…"; }
  try {
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true
    });
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    const text = await res.text();
    if (!res.ok) throw new Error("HTTP " + res.status);
    if (ct.includes("application/json")) { try { JSON.parse(text); } catch {} }
    setMessage(messageEl, "success", "✅ Ontvangen. UrbanChill reageert meestal binnen 24 uur. Tot snel!");
    if (formEl) formEl.reset();
  } catch(err) {
    setMessage(messageEl, "error", "⚠️ Oeps. Verzenden lukt nu even niet. Probeer het over een minuut nog eens.");
  } finally {
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Verstuur aanvraag →"; }
  }
}

/* ---------------- INTAKE FORM ---------------- */

const intakeForm = document.getElementById("intake-form");
if (intakeForm) {
  intakeForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const messageEl  = document.getElementById("intake-message");
    const submitBtn  = intakeForm.querySelector('[type="submit"]');

    if (intakeForm.website && intakeForm.website.value !== "") return;

    const userNotes = intakeForm.notes?.value || "";
    const key = (intakeForm.urbanchill_key?.value || "").trim();
    const notesWithKey = key
      ? (userNotes ? userNotes + "\n\n[UrbanChill-key: " + key + "]" : "[UrbanChill-key: " + key + "]")
      : userNotes;

    const payload = {
      name:         intakeForm.client_name?.value  || "",
      email:        intakeForm.client_email?.value || "",
      phone:        intakeForm.client_phone?.value || "",
      service:      intakeForm.service?.value      || "",
      arrival_date: intakeForm.arrival_date?.value || "",
      notes:        notesWithKey
    };

    sendPayload(payload, API_INTAKE, messageEl, intakeForm, submitBtn);
  }, true);
}

/* ---------------- CONTACT FORM ---------------- */

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const messageEl = document.getElementById("contact-message");
    const submitBtn = contactForm.querySelector('[type="submit"]');

    if (contactForm.website && contactForm.website.value !== "") return;

    const payload = {
      name:  contactForm.client_name?.value  || "",
      email: contactForm.client_email?.value || "",
      phone: contactForm.client_phone?.value || "",
      topic: "website",
      notes: contactForm.notes?.value        || ""
    };

    sendPayload(payload, API_CONTACT, messageEl, contactForm, submitBtn);
  }, true);
}

/* ---------------- LOADER ---------------- */

window.addEventListener("load", function() {
  const loader = document.getElementById("loader");
  if (!loader) return;
  loader.style.opacity = "0";
  setTimeout(function() { loader.style.display = "none"; }, 600);
});
