// main_noforms.js — UrbanChill (mailto submit) — to: info@kimanzi.nl
(() => {
  "use strict";

  const EMAIL_TO = "info@kimanzi.nl";

  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  function smoothScroll(el) {
    if (!el) return;
    try {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      el.scrollIntoView();
    }
  }

  // ----------------------------
  // Intake/Contact panels (open/close)
  // ----------------------------
  function openPanel(name) {
    const panel = document.getElementById(`${name}-panel`);
    if (panel) panel.classList.add("open");
  }

  function closePanel(name) {
    const panel = document.getElementById(`${name}-panel`);
    if (panel) panel.classList.remove("open");
  }

  function wirePanels() {
    // Hero button + nav "Intake"
    $$("[data-action='intake'], [data-open='intake']").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openPanel("intake");
        smoothScroll(document.getElementById("intake"));
      });
    });

    // Nav "Contact"
    $$("[data-open='contact']").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openPanel("contact");
        smoothScroll(document.getElementById("contact"));
      });
    });

    // Close buttons inside panels
    $$(".toggle-close").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = btn.getAttribute("data-close");
        if (target) closePanel(target);
      });
    });
  }

  // ----------------------------
  // "Meer weten" accordion (.mw-toggle -> .mw-panel)
  // ----------------------------
  function wireMeerWetenAccordion() {
    $$(".mw-toggle").forEach((btn) => {
      const panel = btn.nextElementSibling;
      if (!panel || !panel.classList.contains("mw-panel")) return;

      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const isOpen = panel.classList.contains("open");

        // close all
        $$(".mw-panel.open").forEach((p) => p.classList.remove("open"));

        // open clicked
        if (!isOpen) panel.classList.add("open");
      });
    });
  }

  // ----------------------------
  // "Diensten" accordion (buttons with [data-accordion], panels #panel-<key>)
  // ----------------------------
  function wireServiceAccordion() {
    const buttons = $$("[data-accordion]");
    if (buttons.length === 0) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = (btn.getAttribute("data-accordion") || "").trim();
        if (!key) return;

        const panel = document.getElementById(`panel-${key}`);
        if (!panel) return;

        const isOpen = !panel.hasAttribute("hidden");

        // Close all service panels
        $$(".service-panel").forEach((p) => p.setAttribute("hidden", ""));

        // Reset aria-expanded for all service buttons
        buttons.forEach((b) => b.setAttribute("aria-expanded", "false"));

        // Toggle clicked
        if (!isOpen) {
          panel.removeAttribute("hidden");
          btn.setAttribute("aria-expanded", "true");

          // Optional: keep the opened panel in view on mobile
          // (voelt "snappy" zonder te springen)
          // smoothScroll(btn);
        }
      });
    });
  }

  // ----------------------------
  // Mailto form submit (NO paid forms)
  // ----------------------------
  function encode(str) {
    return encodeURIComponent((str ?? "").toString());
  }

  function fieldLabel(el) {
    // Prefer <label for="...">
    const id = el.getAttribute("id");
    if (id) {
      const label = document.querySelector(`label[for="${CSS.escape(id)}"]`);
      if (label && label.textContent) return label.textContent.trim();
    }
    // Fallback to name
    const name = (el.getAttribute("name") || "").trim();
    if (name) return name;
    return "";
  }

  function formToLines(form) {
    const fields = form.querySelectorAll("input, textarea, select");
    const lines = [];

    fields.forEach((el) => {
      const name = (el.getAttribute("name") || "").trim();

      // Skip irrelevant/internal fields
      if (!name) return;
      if (name === "company_website") return;
      if (name === "form_load_time") return;
      if (name === "_redirect") return; // you had this in HTML; not needed for mailto

      // radio/checkbox rules
      if (el.type === "checkbox" || el.type === "radio") {
        if (!el.checked) return;
      }

      const value = (el.value || "").toString().trim();
      if (!value) return;

      const label = fieldLabel(el) || name;
      lines.push(`${label}: ${value}`);
    });

    return lines.join("\n");
  }

  function openMail(subject, body) {
    const href = `mailto:${encode(EMAIL_TO)}?subject=${encode(subject)}&body=${encode(body)}`;
    window.location.href = href;
  }

  function wireFormsMailto() {
    $$("form").forEach((form) => {
      // set timestamp (simple bot filter)
      let timeField = form.querySelector("input[name='form_load_time']");
      if (!timeField) {
        timeField = document.createElement("input");
        timeField.type = "hidden";
        timeField.name = "form_load_time";
        form.appendChild(timeField);
      }
      timeField.value = String(Date.now());

      // Ensure honeypot exists (optional but handy)
      let hp = form.querySelector("input[name='company_website']");
      if (!hp) {
        hp = document.createElement("input");
        hp.type = "text";
        hp.name = "company_website";
        hp.autocomplete = "off";
        hp.tabIndex = -1;
        hp.setAttribute("aria-hidden", "true");
        // visually hidden
        hp.style.position = "absolute";
        hp.style.left = "-9999px";
        hp.style.width = "1px";
        hp.style.height = "1px";
        hp.style.opacity = "0";
        hp.style.pointerEvents = "none";
        form.appendChild(hp);
      }

      form.addEventListener("submit", (e) => {
        // honeypot: if filled -> drop
        if (hp.value.trim().length > 0) {
          e.preventDefault();
          return;
        }

        // minimum 2s since page load -> reduces basic bots
        const start = parseInt(timeField.value || "0", 10);
        if (Number.isFinite(start)) {
          const elapsed = Date.now() - start;
          if (elapsed < 2000) {
            e.preventDefault();
            return;
          }
        }

        e.preventDefault();

        const formType =
          (form.querySelector("input[name='formType']")?.value || "").trim();

        const subject =
          formType === "klant-intake"
            ? `UrbanChill intake — ${new Date().toISOString().slice(0, 10)}`
            : formType === "klant-contact"
              ? `UrbanChill contact — ${new Date().toISOString().slice(0, 10)}`
              : `UrbanChill bericht — ${new Date().toISOString().slice(0, 10)}`;

        const body =
          "Nieuw bericht via urbanchill.nl\n\n" +
          formToLines(form) +
          "\n\n—";

        openMail(subject, body);
      });
    });
  }

  // ----------------------------
  // Boot
  // ----------------------------
  document.addEventListener("DOMContentLoaded", () => {
    wirePanels();
    wireMeerWetenAccordion();
    wireServiceAccordion();
    wireFormsMailto();
  });
})();
