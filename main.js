const API_BASE = "https://cockpit.urbanchill.org/api/intake";

async function sendRequest(payload, successMessage) {

  try {

    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok || result.ok === false) {
      throw new Error(result.error || "API request failed");
    }

    alert(successMessage);
    console.log("API response:", result);

  } catch (err) {

    console.error("API error:", err);
    alert("Er ging iets mis. Probeer het later opnieuw.");

  }

}


document.addEventListener("DOMContentLoaded", function () {

  const intakeForm = document.querySelector("#intake-form");
  const contactForm = document.querySelector("#contact-form");

  if (intakeForm) {

    intakeForm.addEventListener("submit", function(e) {

      e.preventDefault();

      const honeypot = intakeForm.querySelector('input[name="website"]').value;

      if (honeypot !== "") {
        console.warn("Bot blocked");
        return;
      }

      const payload = {
        service: document.querySelector("#service").value,
        client_name: document.querySelector("#client_name").value,
        client_email: document.querySelector("#client_email").value,
        client_phone: document.querySelector("#client_phone").value,
        notes: document.querySelector("#notes").value
      };

      sendRequest(
        payload,
        "Intake verzoek ontvangen. We nemen contact met je op."
      );

      intakeForm.reset();

    });

  }



  if (contactForm) {

    contactForm.addEventListener("submit", function(e) {

      e.preventDefault();

      const honeypot = contactForm.querySelector('input[name="website"]').value;

      if (honeypot !== "") {
        console.warn("Bot blocked");
        return;
      }

      const payload = {
        service: "contact",
        client_name: document.querySelector("#contact_name").value,
        client_email: document.querySelector("#contact_email").value,
        client_phone: "",
        notes: document.querySelector("#contact_message").value
      };

      sendRequest(
        payload,
        "Bericht ontvangen. We nemen contact met je op."
      );

      contactForm.reset();

    });

  }

});
