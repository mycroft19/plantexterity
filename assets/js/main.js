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

  // Animated stat counters (run once when scrolled into view)
  var stats = document.querySelectorAll(".stat .num[data-to]");
  if (stats.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target;
        var to = parseInt(el.getAttribute("data-to"), 10) || 0;
        var suffix = el.getAttribute("data-suffix") || "";
        var start = null, dur = 1200;
        function step(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var val = Math.floor((1 - Math.pow(1 - p, 3)) * to); // ease-out cubic
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = to + suffix;
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    stats.forEach(function (s) { io.observe(s); });
  } else {
    // No IO support: just show final values
    stats.forEach(function (s) { s.textContent = (s.getAttribute("data-to") || "") + (s.getAttribute("data-suffix") || ""); });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
      a.style.maxHeight = open ? a.scrollHeight + "px" : null;
    });
  });

  // Testimonial carousel arrows
  var track = document.querySelector(".carousel-track");
  if (track) {
    var prev = document.querySelector("[data-carousel-prev]");
    var next = document.querySelector("[data-carousel-next]");
    function scrollBy(dir) {
      var card = track.querySelector(".quote");
      var amt = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
      track.scrollBy({ left: dir * amt, behavior: "smooth" });
    }
    if (prev) prev.addEventListener("click", function () { scrollBy(-1); });
    if (next) next.addEventListener("click", function () { scrollBy(1); });
  }
})();
