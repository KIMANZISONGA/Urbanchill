/* ================================================= */
/* URBANCHILL MAIN.JS */
/* Intake + Contact flow for /api/intake */
/* ================================================= */

const API_ENDPOINT = "/api/intake"

/* ================================================= */
/* HELPER: button state */
/* ================================================= */

function setButtonState(form, loading){

const btn = form.querySelector("button")

if(!btn) return

if(loading){

btn.dataset.original = btn.textContent
btn.textContent = "Versturen..."
btn.disabled = true

}else{

btn.textContent = btn.dataset.original || "Versturen"
btn.disabled = false

}

}

/* ================================================= */
/* HELPER: message */
/* ================================================= */

function showMessage(form, message){

let box = form.querySelector(".form-message")

if(!box){

box = document.createElement("div")

box.className = "form-message"

box.style.marginTop = "12px"
box.style.fontSize = "14px"

form.appendChild(box)

}

box.textContent = message

}

/* ================================================= */
/* SEND FUNCTION */
/* ================================================= */

async function sendPayload(payload){

const response = await fetch(API_ENDPOINT,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(payload)

})

if(!response.ok){
throw new Error("Server error")
}

return response.json()

}

/* ================================================= */
/* INTAKE FORM */
/* ================================================= */

const intakeForm = document.getElementById("intake-form")

if(intakeForm){

intakeForm.addEventListener("submit", async function(e){

e.preventDefault()

const honeypot = intakeForm.querySelector('[name="website"]').value

/* spam bot */

if(honeypot){
return
}

setButtonState(intakeForm,true)

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

await sendPayload(payload)

showMessage(intakeForm,"Bedankt. Je aanvraag is ontvangen.")

intakeForm.reset()

}catch(error){

showMessage(intakeForm,"Er ging iets mis. Probeer later opnieuw.")

}

setButtonState(intakeForm,false)

})

}

/* ================================================= */
/* CONTACT FORM */
/* ================================================= */

const contactForm = document.getElementById("contact-form")

if(contactForm){

contactForm.addEventListener("submit", async function(e){

e.preventDefault()

const honeypot = contactForm.querySelector('[name="website"]').value

if(honeypot){
return
}

setButtonState(contactForm,true)

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

await sendPayload(payload)

showMessage(contactForm,"Bericht ontvangen. We nemen contact op.")

contactForm.reset()

}catch(error){

showMessage(contactForm,"Er ging iets mis. Probeer later opnieuw.")

}

setButtonState(contactForm,false)

})

}

/* ================================================= */
/* LOADER FADE */
/* ================================================= */

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
