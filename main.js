document.addEventListener("DOMContentLoaded", () => {

const API = "https://cockpit.urbanchill.org/api/intake";

const intakeForm = document.getElementById("intake-form");
const contactForm = document.getElementById("contact-form");



async function sendForm(payload, messageElement) {

try {

const response = await fetch(API, {

method: "POST",

headers: {

"Content-Type": "application/json"

},

body: JSON.stringify(payload)

});

if (!response.ok) {

throw new Error("Server error");

}

messageElement.textContent = "Bericht verzonden.";

} catch (error) {

messageElement.textContent = "Er ging iets mis. Probeer later opnieuw.";

}

}



if (intakeForm) {

intakeForm.addEventListener("submit", e => {

e.preventDefault();

const form = e.target;

if (form.website.value !== "") return;

const payload = {

client_name: form.client_name.value,

client_email: form.client_email.value,

client_phone: form.client_phone.value,

service: form.service.value,

arrival_date: form.arrival_date.value,

notes: form.notes.value

};

sendForm(payload, document.getElementById("intake-message"));

form.reset();

});

}



if (contactForm) {

contactForm.addEventListener("submit", e => {

e.preventDefault();

const form = e.target;

if (form.website.value !== "") return;

const payload = {

client_name: form.client_name.value,

client_email: form.client_email.value,

client_phone: form.client_phone.value,

service: "contact",

arrival_date: "",

notes: form.notes.value

};

sendForm(payload, document.getElementById("contact-message"));

form.reset();

});

}

});
