console.log("🔥 FORMS ACTIVE (v4)");

/* ✅ juiste endpoints */
const API_INTAKE  = "https://cockpit.urbanchill.org/api/intake/create";
const API_CONTACT = "https://cockpit.urbanchill.org/api/contact/create";

/* ---------------- SEND PAYLOAD ---------------- */

async function sendPayload(payload, url, messageEl, formEl){
  try{
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

    if(!res.ok){
      throw new Error("network");
    }

    // Response is JSON (maar fail-safe)
    await res.json().catch(()=> ({}));

    if(messageEl){
      messageEl.textContent = "Bericht verzonden.";
      messageEl.style.color = "#2e7d32";
    }

    if(formEl){
      formEl.reset();
    }

  }catch(err){
    console.error(err);

    if(messageEl){
      messageEl.textContent = "Er ging iets mis.";
      messageEl.style.color = "#b71c1c";
    }
  }
}

/* ---------------- INTAKE FORM ---------------- */

const intakeForm = document.getElementById("intake-form");

if(intakeForm){
  intakeForm.addEventListener("submit", function(e){
    e.preventDefault();

    const message = document.getElementById("intake-message");

    /* honeypot spam check */
    if(intakeForm.website && intakeForm.website.value !== ""){
      return;
    }

    const payload = {
      name: intakeForm.client_name.value,
      email: intakeForm.client_email.value,
      phone: intakeForm.client_phone.value,
      service: intakeForm.service.value,
      arrival_date: intakeForm.arrival_date.value,
      notes: intakeForm.notes.value
    };

    sendPayload(payload, API_INTAKE, message, intakeForm);
  });
}

/* ---------------- CONTACT FORM ---------------- */

const contactForm = document.getElementById("contact-form");

if(contactForm){
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();

    const message = document.getElementById("contact-message");

    /* honeypot spam check */
    if(contactForm.website && contactForm.website.value !== ""){
      return;
    }

    const payload = {
      name: contactForm.client_name.value,
      email: contactForm.client_email.value,
      phone: contactForm.client_phone.value,
      topic: "website",
      notes: contactForm.notes.value
    };

    sendPayload(payload, API_CONTACT, message, contactForm);
  });
}

/* ---------------- LOADER ---------------- */

window.addEventListener("load", function(){
  const loader = document.getElementById("loader");

  if(loader){
    loader.style.opacity = "0";

    setTimeout(function(){
      loader.style.display = "none";
    }, 600);
  }
});
