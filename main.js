/* ================================= */
/* URBANCHILL MAIN.JS */
/* Definitive Intake + Contact Flow */
/* ================================= */

const API_ENDPOINT = "/api/intake"

/* ================================= */
/* HELPERS */
/* ================================= */

function disableButton(form, state){

const btn = form.querySelector("button")

if(!btn) return

btn.disabled = state

if(state){
btn.dataset.original = btn.textContent
btn.textContent = "Versturen..."
}else{
btn.textContent = btn.dataset.original || "Versturen"
}

}

function showMessage(form, text){

let msg = form.querySelector(".form-message")

if(!msg){

msg = document.createElement("div")

msg.className = "form-message"

msg.style.marginTop = "12px"

msg.style.fontSize = "14px"

form.appendChild(msg)

}

msg.textContent = text

}

/* ================================= */
/* SEND FUNCTION */
/* ================================= */

async function sendIntake(payload){

const response = await fetch(API_ENDPOINT,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify(payload)

})

if(!response.ok){
throw new Error("Server error")
}

return response.json()

}

/* ================================= */
/* INTAKE FORM */
/* ================================= */

const intakeForm = document.getElementById("intake-form")

if(intakeForm){

intakeForm.addEventListener("submit", async function(e){

e.preventDefault()

const website = intakeForm.querySelector('[name="website"]').value

/* Honeypot spam check */

if(website){
return
}

disableButton(intakeForm,true)

const payload = {

client_name: intakeForm.querySelector('[name="client_name"]').value,

client_email: intakeForm.querySelector('[name="client_email"]').value,

client_phone: intakeForm.querySelector('[name="client_phone"]').value,

service: intakeForm.querySelector('[name="service"]').value,

arrival_date: intakeForm.querySelector('[name="arrival_date"]').value,

notes: intakeForm.querySelector('[name="notes"]').value,

website: ""

}

try{

await sendIntake(payload)

showMessage(intakeForm,"Bedankt. Je aanvraag is ontvangen.")

intakeForm.reset()

}catch(err){

showMessage(intakeForm,"Er ging iets mis. Probeer later opnieuw.")

}

disableButton(intakeForm,false)

})

}

/* ================================= */
/* CONTACT FORM */
/* ================================= */

const contactForm = document.getElementById("contact-form")

if(contactForm){

contactForm.addEventListener("submit", async function(e){

e.preventDefault()

const website = contactForm.querySelector('[name="website"]').value

if(website){
return
}

disableButton(contactForm,true)

const payload = {

client_name: contactForm.querySelector('[name="client_name"]').value,

client_email: contactForm.querySelector('[name="client_email"]').value,

client_phone: contactForm.querySelector('[name="client_phone"]').value || "",

service: "contact",

arrival_date: "",

notes: contactForm.querySelector('[name="notes"]').value,

website: ""

}

try{

await sendIntake(payload)

showMessage(contactForm,"Bericht ontvangen. We nemen contact op.")

contactForm.reset()

}catch(err){

showMessage(contactForm,"Er ging iets mis. Probeer later opnieuw.")

}

disableButton(contactForm,false)

})

}

/* ================================= */
/* LOADER FADE */
/* ================================= */

window.addEventListener("load",()=>{

const loader = document.getElementById("loader")

if(!loader) return

setTimeout(()=>{

loader.style.opacity = "0"

setTimeout(()=>{
loader.style.display = "none"
},600)

},800)

})
