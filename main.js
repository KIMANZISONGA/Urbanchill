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

  const intakeForm = document.getElementById("intake-form");
  const contactForm = document.getElementById("contact-form");


  if (intakeForm) {

    intakeForm.addEventListener("submit", function (e) {

      e.preventDefault();

      const name = document.getElementById("client_name").value.trim();
      const email = document.getElementById("client_email").value.trim();
      const phone = document.getElementById("client_phone").value.trim();
      const service = document.getElementById("service").value;
      const notes = document.getElementById("notes").value.trim();

      if (!name || !email) {
        alert("Naam en email zijn verplicht.");
        return;
      }

      const payload = {
        service: service,
        client_name: name,
        client_email: email,
        client_phone: phone,
        notes: notes
      };

      sendRequest(
        payload,
        "Intake verzoek ontvangen. We nemen contact met je op."
      );

      intakeForm.reset();

    });

  }


  if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

      e.preventDefault();

      const name = document.getElementById("contact_name").value.trim();
      const email = document.getElementById("contact_email").value.trim();
      const message = document.getElementById("contact_message").value.trim();

      if (!name || !email || !message) {
        alert("Vul alle velden in.");
        return;
      }

      const payload = {
        service: "contact",
        client_name: name,
        client_email: email,
        client_phone: "",
        notes: message
      };

      sendRequest(
        payload,
        "Bericht ontvangen. We nemen contact met je op."
      );

      contactForm.reset();

    });

  }

});
