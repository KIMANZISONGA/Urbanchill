// main_noforms.js — UrbanChill (mailto submit) — to: info@kimanzi.nl
(() => {
  "use strict";

  const EMAIL_TO = "info@kimanzi.nl";

  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function smoothScroll(el) {
    if (!el) return;
    try { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
    catch { el.scrollIntoView(); }
  }

  function openPanel(name) {
    const panel = document.getElementById(`${name}-panel`);
    if (panel) panel.classList.add("open");
  }

  function closePanel(name) {
    const panel = document.getElementById(`${name}-panel`);
    if (panel) panel.classList.remove("open");
  }

  function wirePanels() {
    $$("[data-action='intake'], [data-open='intake']").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openPanel("intake");
        smoothScroll(document.getElementById("intake"));
      });
    });

    $$("[data-open='contact']").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openPanel("contact");
        smoothScroll(document.getElementById("contact"));
      });
    });

    $$(".toggle-close").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = btn.getAttribute("data-close");
        if (target) closePanel(target);
      });
    });
  }

  function wireAccordions() {
    $$(".mw-toggle").forEach((btn) => {
      const panel = btn.nextElementSibling;
      if (!panel) return;

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = panel.classList.contains("open");
        $$(".mw-panel.open").forEach((p) => p.classList.remove("open"));
        if (!isOpen) panel.classList.add("open");
      });
    });
  }

  // --- Mailto helpers ---
  function encode(str) { return encodeURIComponent((str ?? "").toString()); }

  function formToLines(form) {
    const fields = form.querySelectorAll("input, textarea, select");
    const lines = [];

    fields.forEach((el) => {
      const name = (el.getAttribute("name") || el.getAttribute("id") || "").trim();
      if (!name) return;

      // Skip honeypot + timing fields
      if (name === "company_website") return;
      if (name === "form_load_time") return;

      if (el.type === "checkbox" || el.type === "radio") {
        if (!el.checked) return;
      }

      const value = (el.value || "").toString().trim();
      if (!value) return;

      lines.push(`${name}: ${value}`);
    });

    return lines.join("\n");
  }

  function openMail(subject, body) {
    const href = `mailto:${encode(EMAIL_TO)}?subject=${encode(subject)}&body=${encode(body)}`;
    window.location.href = href;
  }

  function wireFormsMailto() {
    $$("form").forEach((form) => {
      const timeField = form.querySelector("input[name='form_load_time']");
      if (timeField) timeField.value = String(Date.now());

      form.addEventListener("submit", (e) => {
        // Honeypot
        const hp = form.querySelector("input[name='company_website']");
        if (hp && hp.value.trim().length > 0) {
          e.preventDefault();
          return;
        }

        // Minimum 2s on page (simple bot filter)
        const start = parseInt(timeField?.value || "0", 10);
        if (Number.isFinite(start)) {
          const elapsed = Date.now() - start;
          if (elapsed < 2000) {
            e.preventDefault();
            return;
          }
        }

        // Mailto instead of POST
        e.preventDefault();

        const formType = (form.querySelector("input[name='formType']")?.value || "").trim();
        const subject =
          formType === "klant-intake" ? "UrbanChill intake" :
          formType === "klant-contact" ? "UrbanChill contact" :
          "UrbanChill bericht";

        const body =
          "Nieuw bericht via urbanchill.nl\n\n" +
          formToLines(form) +
          "\n\n—";

        openMail(subject, body);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    wirePanels();
    wireAccordions();
    wireFormsMailto();
  });
})();
