/* main.js — UrbanChill/Kimanzi (client site)
   Panels: intake/contact + "meer weten" accordions
   Form security: time-trap + honeypot (privacy-first, no external calls)
*/

(() => {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function safeScrollIntoView(el) {
    if (!el) return;
    try {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      // Fallback (very old browsers)
      el.scrollIntoView();
    }
  }

  /* ---------- Panels (open/close) ---------- */
  function openPanel(name) {
    const panel = document.getElementById(`${name}-panel`);
    if (panel) panel.classList.add("open");
  }

  function closePanel(name) {
    const panel = document.getElementById(`${name}-panel`);
    if (panel) panel.classList.remove("open");
  }

  function wirePanelTriggers() {
    // Buttons/links that open intake
    $$("[data-action='intake'], [data-open='intake']").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openPanel("intake");
        safeScrollIntoView(document.getElementById("intake"));
      });
    });

    // Links that open contact
    $$("[data-open='contact']").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openPanel("contact");
        safeScrollIntoView(document.getElementById("contact"));
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

  /* ---------- "Meer weten" accordions ---------- */
  function wireAccordions() {
    $$(".mw-toggle").forEach((btn) => {
      const panel = btn.nextElementSibling;
      if (!panel) return;

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = panel.classList.contains("open");

        // Close current if open
        if (isOpen) {
          panel.classList.remove("open");
          return;
        }

        // Close all others
        $$(".mw-panel.open").forEach((p) => p.classList.remove("open"));

        // Open clicked
        panel.classList.add("open");
      });
    });
  }

  /* ---------- Form security (time-trap + honeypot) ---------- */
  function ensureHiddenInput(form, name, value = "") {
    let input = form.querySelector(`input[name='${name}']`);
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.prepend(input);
    }
    return input;
  }

  function addHoneypot(form) {
    // Honeypot field (bots tend to fill it; humans won't see it)
    // Using a name that doesn't scream "honeypot"
    const hpName = "company_website"; // benign-looking
    let hp = form.querySelector(`input[name='${hpName}']`);
    if (hp) return hp;

    hp = document.createElement("input");
    hp.type = "text";
    hp.name = hpName;
    hp.autocomplete = "off";
    hp.tabIndex = -1;
    hp.inputMode = "text";
    hp.setAttribute("aria-hidden", "true");

    // Visually hidden but still in DOM (privacy-first, no external CSS needed)
    hp.style.position = "absolute";
    hp.style.left = "-9999px";
    hp.style.top = "0";
    hp.style.width = "1px";
    hp.style.height = "1px";
    hp.style.opacity = "0";

    form.appendChild(hp);
    return hp;
  }

  function wireFormSecurity() {
    $$("form").forEach((form) => {
      // Time trap
      const timeField = ensureHiddenInput(form, "form_load_time", "");
      timeField.value = String(Date.now());

      // Honeypot
      const hp = addHoneypot(form);

      form.addEventListener("submit", (e) => {
        // If honeypot has value -> bot
        if (hp && typeof hp.value === "string" && hp.value.trim().length > 0) {
          e.preventDefault();
          return false;
        }

        // If time trap missing -> allow (fail-open)
        if (!timeField || !timeField.value) return;

        const loadedAt = parseInt(timeField.value, 10);
        if (!Number.isFinite(loadedAt)) return;

        const elapsed = Date.now() - loadedAt;

        // Under 2 seconds -> likely bot
        if (elapsed < 2000) {
          e.preventDefault();
          return false;
        }
      });
    });
  }

  /* ---------- Deep-link behavior (#intake / #contact) ---------- */
  function openFromHash() {
    const hash = (location.hash || "").replace("#", "").trim();
    if (hash === "intake" || hash === "contact") {
      openPanel(hash);
      safeScrollIntoView(document.getElementById(hash));
    }
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    wirePanelTriggers();
    wireAccordions();
    wireFormSecurity();
    openFromHash();

    // Also respond to hash changes
    window.addEventListener("hashchange", openFromHash);
  });
})();
