const API_ENDPOINT = "https://cockpit.urbanchill.org/api/intake";

/* =========================
SEND PAYLOAD
========================= */

async function sendPayload(payload, messageEl, formEl) {
try {
const res = await fetch(API_ENDPOINT, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(payload)
});

```
if (!res.ok) {
  throw new Error("network");
}

await res.json().catch(() => null);

if (messageEl) {
  messageEl.textContent = "Bericht verzonden.";
  messageEl.style.color = "#2e7d32";
}

if (formEl) {
  formEl.reset();
  formEl.style.opacity = ".6";

  setTimeout(() => {
    formEl.style.opacity = "1";
  }, 400);
}
```

} catch (err) {

```
if (messageEl) {
  messageEl.textContent = "Er ging iets mis. Probeer later opnieuw.";
  messageEl.style.color = "#b71c1c";
}

console.error("Form error:", err);
```

}
}

/* =========================
INTAKE FORM
========================= */

const intakeForm = document.getElementById("intake-form");

if (intakeForm) {

intakeForm.addEventListener("submit", function (e) {

```
e.preventDefault();

const message = document.getElementById("intake-message");

/* honeypot */

if (intakeForm.website && intakeForm.website.value !== "") return;

const payload = {

  client_name: intakeForm.client_name?.value || "",
  client_email: intakeForm.client_email?.value || "",
  client_phone: intakeForm.client_phone?.value || "",
  service: intakeForm.service?.value || "",
  arrival_date: intakeForm.arrival_date?.value || "",
  notes: intakeForm.notes?.value || ""

};

sendPayload(payload, message, intakeForm);
```

});

}

/* =========================
CONTACT FORM
========================= */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

contactForm.addEventListener("submit", function (e) {

```
e.preventDefault();

const message = document.getElementById("contact-message");

/* honeypot */

if (contactForm.website && contactForm.website.value !== "") return;

const payload = {

  client_name: contactForm.client_name?.value || "",
  client_email: contactForm.client_email?.value || "",
  client_phone: contactForm.client_phone?.value || "",
  service: "contact",
  arrival_date: "",
  notes: contactForm.notes?.value || ""

};

sendPayload(payload, message, contactForm);
```

});

}

/* =========================
PAGE LOADER
========================= */

window.addEventListener("load", function () {

const loader = document.getElementById("loader");

if (loader) {

```
loader.style.opacity = "0";

setTimeout(() => {
  loader.style.display = "none";
}, 600);
```

}

});
