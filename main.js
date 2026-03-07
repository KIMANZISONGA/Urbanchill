const API = "https://cockpit.urbanchill.org/api/intake"


const intake = document.getElementById("intake-form")

if(intake){

intake.onsubmit = async e => {

e.preventDefault()

const payload = {

service: document.getElementById("service").value,

client_name: document.getElementById("client_name").value,

client_email: document.getElementById("client_email").value,

client_phone: document.getElementById("client_phone").value,

notes: document.getElementById("notes").value

}

const r = await fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(payload)
})

if(r.ok){

alert("Intake ontvangen")

intake.reset()

}else{

alert("Er ging iets mis")

}

}

}



const contact = document.getElementById("contact-form")

if(contact){

contact.onsubmit = async e => {

e.preventDefault()

const payload = {

service:"contact",

client_name: document.getElementById("contact_name").value,

client_email: document.getElementById("contact_email").value,

notes: document.getElementById("contact_message").value

}

const r = await fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(payload)
})

if(r.ok){

alert("Bericht ontvangen")

contact.reset()

}else{

alert("Er ging iets mis")

}

}

}
