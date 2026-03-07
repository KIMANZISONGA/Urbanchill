/* ================================================= */
/* URBANCHILL COMPLETE STYLESHEET */
/* ================================================= */

*{
margin:0;
padding:0;
box-sizing:border-box;
}

html{
scroll-behavior:smooth;
}

body{
font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
background:#f3e7da;
color:#2b2b2b;
font-size:19px;
line-height:1.7;
}

.container{
max-width:1200px;
margin:auto;
padding:0 30px;
}

/* HEADER */

.site-header{
background:#111;
color:white;
position:sticky;
top:0;
width:100%;
z-index:1000;
}

.nav{
display:flex;
justify-content:space-between;
align-items:center;
padding:16px 0;
gap:20px;
}

.logo{
display:flex;
align-items:center;
gap:10px;
}

.logo-mark{
width:30px;
height:30px;
object-fit:contain;
opacity:.85;
}

.logo-text strong{
display:block;
font-size:17px;
line-height:1.1;
}

.logo-text span{
display:block;
font-size:12px;
opacity:.7;
margin-top:2px;
}

.nav-links{
display:flex;
gap:26px;
flex-wrap:wrap;
}

.nav-links a{
color:white;
text-decoration:none;
font-size:15px;
opacity:.9;
}

.nav-links a:hover{
opacity:1;
}

/* HERO */

.hero{
min-height:92vh;
display:flex;
align-items:center;
color:white;
background:
linear-gradient(rgba(0,0,0,.68), rgba(0,0,0,.84)),
url("nairobi-skyline-night.jpg");
background-size:cover;
background-position:center;
}

.hero-inner{
max-width:820px;
}

.brand-block{
margin-bottom:25px;
}

.brand-name{
font-size:18px;
letter-spacing:.08em;
text-transform:uppercase;
opacity:.9;
}

.brand-tagline{
font-size:14px;
opacity:.72;
font-style:italic;
margin-top:3px;
}

.hero h1{
font-size:60px;
line-height:1.08;
margin-bottom:25px;
}

.hero-sub{
margin-bottom:20px;
font-size:20px;
max-width:800px;
}

.hero-mantra{
margin:28px 0;
font-style:italic;
font-size:22px;
}

.hero-buttons{
display:flex;
gap:15px;
flex-wrap:wrap;
}

/* BUTTONS */

.btn{
padding:14px 26px;
border-radius:10px;
text-decoration:none;
font-size:16px;
display:inline-block;
}

.btn-primary{
background:#c07a3b;
color:white;
}

.btn-secondary{
background:white;
color:black;
}

/* SECTIONS */

section{
padding:120px 0;
}

h2{
font-size:40px;
margin-bottom:20px;
line-height:1.15;
}

h3{
font-size:22px;
line-height:1.2;
}

.section-intro{
max-width:760px;
margin-bottom:38px;
font-size:20px;
}

/* TEXT */

.text-card{
max-width:780px;
font-size:20px;
}

.text-card p{
margin-bottom:20px;
}

/* SIGNATURE */

.signature{
text-align:center;
padding:80px 0;
}

.signature-text{
font-size:28px;
letter-spacing:.05em;
margin-bottom:10px;
}

.signature-sub{
opacity:.78;
max-width:760px;
margin:auto;
}

/* LOUNGE */

.lounge{
color:white;
background:
linear-gradient(rgba(0,0,0,.64), rgba(0,0,0,.80)),
url("nairobi-rooftop.jpg");
background-size:cover;
background-position:center;
}

.lounge-inner{
text-align:center;
}

/* CITY IMAGE */

.city-image{
min-height:320px;
background-size:cover;
background-position:center;
}

.city-image-evening{
background:
linear-gradient(rgba(0,0,0,.18), rgba(0,0,0,.18)),
url("nairobi-evening.png");
background-size:cover;
background-position:center;
}

/* GRID */

.grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:35px;
margin-top:36px;
}

/* CARDS */

.card,
.district-card,
.service-card,
.form-card{
background:white;
padding:40px;
border-radius:16px;
box-shadow:0 20px 45px rgba(0,0,0,.12);
}

.card p,
.district-card p,
.service-card p{
margin-top:14px;
}

/* DISTRICTS */

.district-grid{
display:grid;
grid-template-columns:repeat(2,1fr);
gap:35px;
}

/* SERVICES */

.services-grid{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:35px;
margin-top:35px;
}

/* FORMS */

.contact-grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:40px;
}

.form-card{
display:flex;
flex-direction:column;
gap:14px;
}

input,
textarea,
select{
width:100%;
padding:14px;
border-radius:8px;
border:1px solid #ddd;
font-family:inherit;
font-size:16px;
}

textarea{
resize:vertical;
min-height:120px;
}

button{
padding:14px;
background:#c07a3b;
color:white;
border:none;
border-radius:10px;
cursor:pointer;
font-size:16px;
}

button:disabled{
opacity:.7;
cursor:not-allowed;
}

.form-message{
margin-top:10px;
font-size:14px;
}

/* HONEYPOT */

.honeypot{
position:absolute !important;
left:-9999px !important;
width:1px !important;
height:1px !important;
opacity:0 !important;
}

/* FOOTER */

.site-footer{
background:#0e1b27;
color:white;
padding:70px 0;
}

.footer-inner{
display:flex;
justify-content:space-between;
gap:40px;
flex-wrap:wrap;
align-items:flex-end;
}

.signature-image{
max-width:200px;
margin-bottom:6px;
}

/* LOADER */

#loader{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:#0e1b27;
display:flex;
align-items:center;
justify-content:center;
z-index:9999;
transition:opacity .6s ease;
}

.loader-content{
text-align:center;
color:white;
}

.loader-brand{
font-size:32px;
letter-spacing:.08em;
}

.loader-tagline{
margin-top:8px;
opacity:.72;
font-style:italic;
}

/* RESPONSIVE */

@media(max-width:1000px){

.services-grid{
grid-template-columns:1fr;
}

.contact-grid{
grid-template-columns:1fr;
}

.district-grid{
grid-template-columns:1fr;
}

.grid{
grid-template-columns:1fr;
}

}

@media(max-width:900px){

.hero h1{
font-size:44px;
}

.container{
padding:0 20px;
}

.nav{
flex-direction:column;
align-items:flex-start;
}

}
