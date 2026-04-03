// main.js?v=5
console.log("🔥 FORMS ACTIVE (v5)");

/* ✅ juiste endpoints */
const API_INTAKE  = "https://cockpit.urbanchill.org/api/intake/create";
const API_CONTACT = "https://cockpit.urbanchill.org/api/contact/create";

/* ---------------- UI MESSAGE (CSP-proof) ---------------- */

function setMessage(messageEl, type, text) {
  if (!messageEl) return;

  messageEl.classList.remove("uc-msg", "uc-success", "uc-error");
  messageEl.classList.add("uc-msg");
  if (type === "success") messageEl.classList.add("uc-success");
  if (type === "error") messageEl.classList.add("uc-error");

  messageEl.textContent = text;

  // auto-hide na 6s bij success
  if (type === "success") {
    clearTimeout(messageEl._ucHideTimer);
    messageEl._ucHideTimer = setTimeout(() => {
      messageEl.textContent = "";
      messageEl.classList.remove("uc-msg", "uc-success", "uc-error");
    }, 6000);
  }
}

/* ---------------- SEND PAYLOAD ---------------- */

async function sendPayload(payload, url, messageEl, formEl){
  try{
    console.log("📤 SEND", url, payload);

    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload),
      keepalive: true
    });

    const ct = (res.headers.get("content-type") || "").toLowerCase();
    const text = await res.text();

    console.log("📩 STATUS", res.status, res.statusText, "CT=", ct);
    console.log("📩 BODY", text.slice(0, 300));

    if(!res.ok){
      throw new Error(`HTTP ${res.status}`);
    }

    // probeer JSON te parsen, maar fail-safe
    if (ct.includes("application/json")) {
      try { JSON.parse(text); } catch {}
    }

    setMessage(messageEl, "success", "✅ Ontvangen. UrbanChill reageert meestal binnen 24 uur. Tot snel!");
    if(formEl) formEl.reset();

  }catch(err){
    console.error("❌ ERROR", err);
    setMessage(messageEl, "error", "⚠️ Oeps. Verzenden lukt nu even niet. Probeer het over een minuut nog eens.");
  }
}

/* ---------------- INTAKE FORM ---------------- */

const intakeForm = document.getElementById("intake-form");

if(intakeForm){
  intakeForm.addEventListener("submit", function(e){
    e.preventDefault();

    const messageEl = document.getElementById("intake-message");

    /* honeypot spam check */
    if(intakeForm.website && intakeForm.website.value !== ""){
      return;
    }

    const payload = {
      name: intakeForm.client_name?.value || "",
      email: intakeForm.client_email?.value || "",
      phone: intakeForm.client_phone?.value || "",
      service: intakeForm.service?.value || "",
      arrival_date: intakeForm.arrival_date?.value || "",
      notes: intakeForm.notes?.value || ""
    };

    sendPayload(payload, API_INTAKE, messageEl, intakeForm);
  }, true);
}

/* ---------------- CONTACT FORM ---------------- */

const contactForm = document.getElementById("contact-form");

if(contactForm){
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();

    const messageEl = document.getElementById("contact-message");

    /* honeypot spam check */
    if(contactForm.website && contactForm.website.value !== ""){
      return;
    }

    const payload = {
      name: contactForm.client_name?.value || "",
      email: contactForm.client_email?.value || "",
      phone: contactForm.client_phone?.value || "",
      topic: "website",
      notes: contactForm.notes?.value || ""
    };

    sendPayload(payload, API_CONTACT, messageEl, contactForm);
  }, true);
}

/* ---------------- LOADER ---------------- */

window.addEventListener("load", function(){
  const loader = document.getElementById("loader");
  if(!loader) return;

  loader.style.opacity = "0";
  setTimeout(function(){
    loader.style.display = "none";
  }, 600);
});
