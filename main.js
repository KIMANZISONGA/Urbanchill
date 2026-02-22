function sendIntake(){
  window.location.href="mailto:intake@kimanz.nl?subject=UrbanChill Intake";
}

function sendContact(){
  window.location.href="mailto:info@kimanzi.nl?subject=UrbanChill Vraag";
}

document.addEventListener("DOMContentLoaded", function(){

  document.querySelectorAll(".js-intake").forEach(btn=>{
    btn.addEventListener("click", sendIntake);
  });

  document.querySelectorAll(".js-contact").forEach(btn=>{
    btn.addEventListener("click", sendContact);
  });

});
