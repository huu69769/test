/* =========================================================
   Portfolio interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Hero name: typewriter reveal (left-to-right) ---- */
  var nameEl = document.querySelector(".hl-name");
  if (nameEl) {
    var fullName = nameEl.textContent;
    var reduceMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      nameEl.textContent = "";        // clear first so it doesn't flash
      nameEl.classList.add("typing"); // show blinking caret
      var idx = 0;
      var START_DELAY = 1100;         // wait before typing begins
      var SPEED = 130;                // ms per character
      setTimeout(function tick() {
        nameEl.textContent = fullName.slice(0, idx);
        if (idx < fullName.length) {
          idx++;
          setTimeout(tick, SPEED);
        } else {
          setTimeout(function () { nameEl.classList.remove("typing"); }, 650);
        }
      }, START_DELAY);
    }
  }

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    // close when a link is tapped
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Works category filter ---- */
  var filters = document.querySelectorAll(".filter");
  var modules = document.querySelectorAll(".module");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.dataset.filter;

      filters.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", String(active));
      });

      modules.forEach(function (mod) {
        var show = f === "all" || mod.dataset.group === f;
        mod.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal, .card, .contact-card");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) {
      el.classList.add("reveal");
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Active nav link on scroll ---- */
  var sections = ["works", "about", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = {};
  document.querySelectorAll(".nav a").forEach(function (a) {
    navLinks[a.getAttribute("href").slice(1)] = a;
  });

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            Object.values(navLinks).forEach(function (l) { l.style.color = ""; });
            var link = navLinks[e.target.id];
            if (link) link.style.color = "var(--coral-dk)";
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- Lightbox: click a gallery shot to view it large ---- */
  var shots = Array.prototype.slice.call(document.querySelectorAll(".gp-grid .shot"));
  if (shots.length) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("aria-hidden", "true");
    lb.innerHTML =
      '<button class="lb-close" aria-label="閉じる">✕</button>' +
      '<span class="lb-count"></span>' +
      '<button class="lb-nav lb-prev" aria-label="前の画像">‹</button>' +
      '<figure class="lb-stage"><div class="lb-media"></div><figcaption class="lb-cap"></figcaption></figure>' +
      '<button class="lb-nav lb-next" aria-label="次の画像">›</button>';
    document.body.appendChild(lb);

    var lbMedia = lb.querySelector(".lb-media");
    var lbCap = lb.querySelector(".lb-cap");
    var lbCount = lb.querySelector(".lb-count");
    var lbStage = lb.querySelector(".lb-stage");
    var album = [];
    var cur = 0;

    function render() {
      var fig = album[cur];
      var src = fig.querySelector("svg, img");
      lbMedia.innerHTML = "";
      if (src) lbMedia.appendChild(src.cloneNode(true));
      var c = fig.querySelector("figcaption");
      lbCap.textContent = c ? c.textContent : "";
      lbCount.textContent = cur + 1 + " / " + album.length;
      var proj = fig.closest(".gallery-project");
      var ui = proj ? getComputedStyle(proj).getPropertyValue("--ui").trim() : "";
      lbStage.style.setProperty("--ui", ui || "#FF6B4A");
    }
    function openLb(list, i) {
      album = list; cur = i; render();
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeLb() {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    function step(d) { cur = (cur + d + album.length) % album.length; render(); }

    shots.forEach(function (shot) {
      shot.setAttribute("tabindex", "0");
      shot.setAttribute("role", "button");
      var grid = Array.prototype.slice.call(shot.closest(".gp-grid").querySelectorAll(".shot"));
      function go() { openLb(grid, grid.indexOf(shot)); }
      shot.addEventListener("click", go);
      shot.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
      });
    });

    lb.querySelector(".lb-close").addEventListener("click", closeLb);
    lb.querySelector(".lb-prev").addEventListener("click", function () { step(-1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });
  }
})();
