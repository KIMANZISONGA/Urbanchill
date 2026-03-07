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

function sendIntake() {

  const payload = {
    service: "solo",
    client_name: "",
    client_email: "",
    client_phone: "",
    notes: "Website intake button clicked"
  };

  sendRequest(
    payload,
    "Intake verzoek ontvangen. We nemen contact met je op."
  );

}

function sendContact() {

  const payload = {
    service: "contact",
    client_name: "",
    client_email: "",
    client_phone: "",
    notes: "Website contact button clicked"
  };

  sendRequest(
    payload,
    "Bericht ontvangen. We nemen contact met je op."
  );

}

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".js-intake").forEach(btn => {
    btn.addEventListener("click", sendIntake);
  });

  document.querySelectorAll(".js-contact").forEach(btn => {
    btn.addEventListener("click", sendContact);
  });

});
