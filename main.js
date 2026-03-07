const API = "https://cockpit.urbanchill.org/api/intake";

async function send(payload){

  try{

    const response = await fetch(API,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    });

    const result = await response.json();

    if(!result.ok){
      throw new Error(result.error || "API error");
    }

    alert("Bedankt. We nemen snel contact met je op.");

  }catch(e){

    console.error(e);
    alert("Er ging iets mis. Probeer het later opnieuw.");

  }

}

function sendIntake(){

  send({
    source:"urbanchill.nl",
    service:"intake",
    client_name:"website visitor",
    client_email:"unknown",
    client_phone:"unknown",
    notes:"Intake button"
  });

}

function sendContact(){

  send({
    source:"urbanchill.nl",
    service:"contact",
    client_name:"website visitor",
    client_email:"unknown",
    client_phone:"unknown",
    notes:"Contact button"
  });

}

document.addEventListener("DOMContentLoaded",()=>{

  document.querySelectorAll(".js-intake").forEach(btn=>{
    btn.addEventListener("click",sendIntake);
  });

  document.querySelectorAll(".js-contact").forEach(btn=>{
    btn.addEventListener("click",sendContact);
  });

});
