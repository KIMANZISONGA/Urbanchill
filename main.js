const API_ENDPOINT = "https://cockpit.urbanchill.org/api/intake";

/* ---------------- SEND PAYLOAD ---------------- */

async function sendPayload(payload,messageEl,formEl){

try{

const res = await fetch(API_ENDPOINT,{
method:"POST",
mode:"cors",
credentials:"omit",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(payload)
})

if(!res.ok){
throw new Error("network")
}

await res.json().catch(()=>({}))

if(messageEl){
messageEl.textContent="Bericht verzonden."
messageEl.style.color="#2e7d32"
}

if(formEl){
formEl.reset()
}

}catch(err){

console.error(err)

if(messageEl){
messageEl.textContent="Er ging iets mis."
messageEl.style.color="#b71c1c"
}

}

}

/* ---------------- INTAKE FORM ---------------- */

const intakeForm=document.getElementById("intake-form")

if(intakeForm){

intakeForm.addEventListener("submit",function(e){

e.preventDefault()

const message=document.getElementById("intake-message")

/* honeypot spam check */

if(intakeForm.website && intakeForm.website.value!==""){
return
}

const payload={
name:intakeForm.client_name.value,
email:intakeForm.client_email.value,
phone:intakeForm.client_phone.value,
service:intakeForm.service.value,
arrival_date:intakeForm.arrival_date.value,
notes:intakeForm.notes.value
}

sendPayload(payload,message,intakeForm)

})

}

/* ---------------- CONTACT FORM ---------------- */

const contactForm=document.getElementById("contact-form")

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault()

const message=document.getElementById("contact-message")

/* honeypot spam check */

if(contactForm.website && contactForm.website.value!==""){
return
}

const payload={
name:contactForm.client_name.value,
email:contactForm.client_email.value,
phone:contactForm.client_phone.value,
service:"contact",
arrival_date:"",
notes:contactForm.notes.value
}

sendPayload(payload,message,contactForm)

})

}

/* ---------------- LOADER ---------------- */

window.addEventListener("load",function(){

const loader=document.getElementById("loader")

if(loader){

loader.style.opacity="0"

setTimeout(function(){
loader.style.display="none"
},600)

}

})
