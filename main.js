/* ================================= */
/* URBANCHILL MAIN SCRIPT */
/* ================================= */

/* ------------------------------- */
/* LOADER FADE */
/* ------------------------------- */

window.addEventListener("load", () => {

const loader = document.getElementById("loader")

if(loader){

setTimeout(() => {

loader.style.opacity = "0"

setTimeout(()=>{

loader.style.display = "none"

},600)

},900)

}

})

/* ------------------------------- */
/* API ENDPOINT */
/* ------------------------------- */

/* pas dit aan als je backend endpoint anders is */

const API_ENDPOINT = "https://cockpit.urbanchill.org/api/intake"

/* ------------------------------- */
/* INTAKE FORM */
/* ------------------------------- */

const intakeForm = document.getElementById("intake-form")

if(intakeForm){

intakeForm.addEventListener("submit", async (e)=>{

e.preventDefault()

const name = document.getElementById("client_name").value
const email = document.getElementById("client_email").value
const phone = document.getElementById("client_phone").value
const service = document.getElementById("service").value
const notes = document.getElementById("notes").value

const payload = {

type: "intake",

name: name,
email: email,
phone: phone,
service: service,
notes: notes

}

try{

const response = await fetch(API_ENDPOINT, {

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(payload)

})

if(response.ok){

alert("Bedankt. UrbanChill neemt binnenkort contact met je op.")

intakeForm.reset()

}else{

alert("Er ging iets mis. Probeer het later opnieuw.")

}

}catch(error){

console.error(error)

alert("Verbinding met server mislukt.")

}

})

}

/* ------------------------------- */
/* CONTACT FORM */
/* ------------------------------- */

const contactForm = document.getElementById("contact-form")

if(contactForm){

contactForm.addEventListener("submit", async (e)=>{

e.preventDefault()

const name = document.getElementById("contact_name").value
const email = document.getElementById("contact_email").value
const message = document.getElementById("contact_message").value

const payload = {

type: "contact",

name: name,
email: email,
message: message

}

try{

const response = await fetch(API_ENDPOINT, {

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(payload)

})

if(response.ok){

alert("Bericht ontvangen. UrbanChill reageert zo snel mogelijk.")

contactForm.reset()

}else{

alert("Er ging iets mis. Probeer het later opnieuw.")

}

}catch(error){

console.error(error)

alert("Server niet bereikbaar.")

}

})

}

/* ------------------------------- */
/* SMALL UX HELPERS */
/* ------------------------------- */

/* voorkom dubbele submits */

document.querySelectorAll("form").forEach(form=>{

form.addEventListener("submit", ()=>{

const btn = form.querySelector("button")

if(btn){

btn.disabled = true

setTimeout(()=>{

btn.disabled = false

},3000)

}

})

})
