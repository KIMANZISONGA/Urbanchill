const API_ENDPOINT = "https://cockpit.urbanchill.org/api/intake";

function sendPayload(payload, messageEl, formEl) {

fetch(API_ENDPOINT, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(payload)
})

.then(res => {
if (!res.ok) throw new Error("network");
return res.json().catch(()=>null);
})

.then(() => {

messageEl.textContent = "Bericht verzonden.";
messageEl.style.color = "green";

if(formEl) formEl.reset();

})

.catch(() => {

messageEl.textContent = "Er ging iets mis. Probeer later opnieuw.";
messageEl.style.color = "red";

});

}


/* =========================
   INTAKE FORM
========================= */

const intakeForm = document.getElementById("intake-form");

if (intakeForm) {

intakeForm.addEventListener("submit", function(e){

e.preventDefault();

const message = document.getElementById("intake-message");

if (intakeForm.website && intakeForm.website.value !== "") return;

const payload = {

client_name: intakeForm.client_name.value.trim(),
client_email: intakeForm.client_email.value.trim(),
client_phone: intakeForm.client_phone.value.trim(),
service: intakeForm.service.value,
arrival_date: intakeForm.arrival_date.value,
notes: intakeForm.notes.value.trim()

};

sendPayload(payload, message, intakeForm);

});

}


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

contactForm.addEventListener("submit", function(e){

e.preventDefault();

const message = document.getElementById("contact-message");

if (contactForm.website && contactForm.website.value !== "") return;

const payload = {

client_name: contactForm.client_name.value.trim(),
client_email: contactForm.client_email.value.trim(),
client_phone: contactForm.client_phone.value.trim(),
service: "contact",
arrival_date: "",
notes: contactForm.notes.value.trim()

};

sendPayload(payload, message, contactForm);

});

}
