/* Plantexterity — shared client-side behavior. No dependencies. */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close menu when a link is clicked (mobile)
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  // Footer year
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // Contact form: prefill subject from ?subject= query param
  var params = new URLSearchParams(window.location.search);
  var subjectField = document.getElementById("subject");
  var subjectParam = params.get("subject");
  if (subjectField && subjectParam) subjectField.value = subjectParam;

  // Contact form: client-side validation + mailto fallback.
  // If the form has a real action (not the REPLACE_ME placeholder), let it submit normally.
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var message = form.querySelector("#message");
      var msg = document.getElementById("form-msg");

      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email.value || "").trim());
      if (!name.value.trim() || !emailOk || !message.value.trim()) {
        e.preventDefault();
        msg.textContent = "Please enter your name, a valid email, and a message.";
        msg.style.color = "#b3261e";
        return;
      }

      // No backend configured yet -> fall back to mailto so nothing is lost.
      if (form.getAttribute("action") === "REPLACE_ME") {
        e.preventDefault();
        var subj = encodeURIComponent((subjectField && subjectField.value) || "Website inquiry");
        var body = encodeURIComponent(
          "Name: " + name.value + "\nEmail: " + email.value + "\n\n" + message.value
        );
        msg.textContent = "Opening your email app… (set up a form endpoint to receive these on the site).";
        msg.style.color = "var(--green-dark)";
        window.location.href = "mailto:REPLACE_EMAIL?subject=" + subj + "&body=" + body;
      }
      // else: real action present -> normal submit proceeds
    });
  }
})();
