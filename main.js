const API_ENDPOINT = "https://cockpit.urbanchill.org/api/intake";

/* =================================================
SEND PAYLOAD
================================================= */

function sendPayload(payload, messageEl, formEl) {

  fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  .then(function(res) {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json().catch(function () {
      return {};
    });
  })

  .then(function () {

    if (messageEl) {
      messageEl.textContent = "Bericht verzonden.";
      messageEl.style.color = "#2e7d32";
    }

    if (formEl) {
      formEl.reset();
    }

  })

  .catch(function (err) {

    console.error("Form error:", err);

    if (messageEl) {
      messageEl.textContent = "Er ging iets mis. Probeer later opnieuw.";
      messageEl.style.color = "#b71c1c";
    }

  });

}

/* =================================================
INTAKE FORM
================================================= */

var intakeForm = document.getElementById("intake-form");

if (intakeForm) {

  intakeForm.addEventListener("submit", function (e) {

    e.preventDefault();

    var message = document.getElementById("intake-message");

    if (intakeForm.website && intakeForm.website.value !== "") {
      return;
    }

    var payload = {
      client_name: intakeForm.client_name ? intakeForm.client_name.value : "",
      client_email: intakeForm.client_email ? intakeForm.client_email.value : "",
      client_phone: intakeForm.client_phone ? intakeForm.client_phone.value : "",
      service: intakeForm.service ? intakeForm.service.value : "",
      arrival_date: intakeForm.arrival_date ? intakeForm.arrival_date.value : "",
      notes: intakeForm.notes ? intakeForm.notes.value : ""
    };

    sendPayload(payload, message, intakeForm);

  });

}

/* =================================================
CONTACT FORM
================================================= */

var contactForm = document.getElementById("contact-form");

if (contactForm) {

  contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    var message = document.getElementById("contact-message");

    if (contactForm.website && contactForm.website.value !== "") {
      return;
    }

    var payload = {
      client_name: contactForm.client_name ? contactForm.client_name.value : "",
      client_email: contactForm.client_email ? contactForm.client_email.value : "",
      client_phone: contactForm.client_phone ? contactForm.client_phone.value : "",
      service: "contact",
      arrival_date: "",
      notes: contactForm.notes ? contactForm.notes.value : ""
    };

    sendPayload(payload, message, contactForm);

  });

}

/* =================================================
PAGE LOADER
================================================= */

window.addEventListener("load", function () {

  var loader = document.getElementById("loader");

  if (loader) {

    loader.style.opacity = "0";

    setTimeout(function () {
      loader.style.display = "none";
    }, 600);

  }

});
