/* reveal on scroll */

const reveals = document.querySelectorAll(".reveal")

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("visible")

}

})

})

reveals.forEach(el => observer.observe(el))


/* modal */

function createModal(type){

const modal = document.createElement("div")

modal.className = "uc-modal"

modal.innerHTML = `

<div class="uc-modal-box">

<h2>${type==="intake" ? "Intake aanvraag" : "Vraag stellen"}</h2>

<form>

<input placeholder="Naam" required>

<input placeholder="Email" required>

<textarea placeholder="Bericht"></textarea>

<button class="btn btn-primary">Versturen</button>

</form>

</div>

`

document.body.appendChild(modal)

modal.onclick = e => {
if(e.target === modal) modal.remove()
}

}

document.querySelectorAll(".js-intake").forEach(btn=>{
btn.onclick = () => createModal("intake")
})

document.querySelectorAll(".js-contact").forEach(btn=>{
btn.onclick = () => createModal("contact")
})
