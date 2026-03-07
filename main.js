const API = "https://cockpit.urbanchill.org/api/intake";

function createModal(type){

const modal = document.createElement("div");
modal.className = "uc-modal";

modal.innerHTML = `
<div class="uc-modal-box">

<h2>${type === "intake" ? "Intake aanvraag" : "Algemene vraag"}</h2>

<form id="uc-form">

<input id="name" placeholder="Naam" required>
<input id="email" placeholder="Email" required>
<input id="phone" placeholder="Telefoon">

<textarea id="notes" placeholder="Bericht"></textarea>

<button class="btn btn-primary" type="submit">
Versturen
</button>

<button class="btn btn-secondary" type="button" id="close">
Sluiten
</button>

</form>

</div>
`;

document.body.appendChild(modal);

document.getElementById("close").onclick = () => modal.remove();

document.getElementById("uc-form").onsubmit = async e => {

e.preventDefault();

const payload = {
service: type,
client_name: document.getElementById("name").value,
client_email: document.getElementById("email").value,
client_phone: document.getElementById("phone").value,
notes: document.getElementById("notes").value
};

const r = await fetch(API,{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(payload)
});

if(r.ok){
alert("Bericht ontvangen");
modal.remove();
}else{
alert("Er ging iets mis");
}

};

}

document.querySelectorAll(".js-intake").forEach(btn=>{
btn.onclick = ()=>createModal("solo");
});

document.querySelectorAll(".js-contact").forEach(btn=>{
btn.onclick = ()=>createModal("contact");
});
