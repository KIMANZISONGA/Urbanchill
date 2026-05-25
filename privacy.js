
async function pvVerstuur() {
  const naam    = document.getElementById('pv-naam').value.trim();
  const email   = document.getElementById('pv-email').value.trim();
  const type    = document.getElementById('pv-type').value;
  const bericht = document.getElementById('pv-bericht').value.trim();
  const status  = document.getElementById('pv-status');
  if (!naam || !email || !bericht) { status.textContent = '⚠️ Vul alle velden in.'; return; }
  status.textContent = 'Versturen...';
  try {
    const res = await fetch('https://cockpit.urbanchill.org/api/contact/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: naam, email, message: `[AVG-verzoek: ${type}]\n\n${bericht}`, source: 'privacy_page', topic: type })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      document.getElementById('pv-form').innerHTML = '<p class="pv-success">✅ Verzoek ontvangen. Wij reageren binnen 30 dagen op het opgegeven e-mailadres.</p>';
    } else {
      status.textContent = '❌ ' + (data.message || 'Er ging iets mis. Probeer het later opnieuw.');
    }
  } catch(e) { status.textContent = '❌ Verbindingsfout. Probeer het later opnieuw.'; }
}

