const API_BASE = "https://cockpit.urbanchill.org/api";

async function sendRequest(endpoint, payload, successMessage){

  try{

    const response = await fetch(`${API_BASE}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if(!response.ok){
      throw new Error("API request failed");
    }

    const result = await response.json();

    alert(successMessage);

    console.log("API response:", result);

  }catch(err){

    console.error(err);
    alert("Er ging iets mis. Probeer het later opnieuw.");

  }

}

function sendIntake(){

  const payload = {
    source: "urbanchill.nl",
    service: "unknown",
    client_name: "",
    client_email: "",
    client_phone: "",
    notes: "Website intake button clicked"
  };

  sendRequest(
    "intake",
    payload,
    "Intake verzoek ontvangen. We nemen contact met je op."
  );

}

function sendContact(){

  const payload = {
    source: "urbanchill.nl",
    message: "Website contact button clicked"
  };

  sendRequest(
    "contact",
    payload,
    "Bericht ontvangen. We nemen contact met je op."
  );

}

document.addEventListener("DOMContentLoaded", function(){

  document.querySelectorAll(".js-intake").forEach(btn=>{
    btn.addEventListener("click", sendIntake);
  });

  document.querySelectorAll(".js-contact").forEach(btn=>{
    btn.addEventListener("click", sendContact);
  });

});
