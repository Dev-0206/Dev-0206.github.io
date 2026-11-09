/* Refinements layer. Everything here is additive: if this file fails, the site still works. */
(function () {
  "use strict";
  var P = window.PROJECTS || [];
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Hero showcase ---------- */
  var host = document.getElementById("h-visual");
  if (host && P.length) {
    var wrap = document.createElement("div");
    wrap.className = "hv";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-roledescription", "carousel");
    wrap.setAttribute("aria-label", "Selected projects");
    var stage = document.createElement("div"); stage.className = "hv-stage";
    var ctrl = document.createElement("div"); ctrl.className = "hv-ctrl";
    var slides = [], dots = [], cur = 0, timer = null, paused = reduce, userPaused = reduce;

    P.forEach(function (p, i) {
      var a = document.createElement("a");
      a.className = "hv-slide"; a.href = "#/work/" + p.slug;
      a.setAttribute("aria-label", p.title + ". Open case study.");
      var f = document.createElement("div"); f.className = "media-frame";
      var img = document.createElement("img");
      img.src = p.cover; img.alt = p.coverAlt || ""; img.decoding = "async";
      if (i > 0) img.loading = "lazy";
      f.appendChild(img); a.appendChild(f);
      var cap = document.createElement("span"); cap.className = "hv-cap";
      var b = document.createElement("span"); b.textContent = p.title;
      var s = document.createElement("small"); s.textContent = p.tag;
      cap.appendChild(b); cap.appendChild(s); a.appendChild(cap);
      stage.appendChild(a); slides.push(a);

      var d = document.createElement("button");
      d.className = "hv-dot"; d.type = "button";
      d.setAttribute("aria-label", "Show " + p.title);
      d.addEventListener("click", function () { show(i); userPause(); });
      ctrl.appendChild(d); dots.push(d);
    });

    var pb = document.createElement("button");
    pb.className = "hv-pause"; pb.type = "button";
    ctrl.appendChild(pb);

    function show(i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (a, k) {
        var on = k === cur;
        a.classList.toggle("on", on);
        a.setAttribute("aria-hidden", on ? "false" : "true");
        a.tabIndex = on ? 0 : -1;
        dots[k].setAttribute("aria-current", on ? "true" : "false");
      });
    }
    function tick() { if (!paused && !userPaused) show(cur + 1); }
    function start() { if (!timer && !reduce) timer = setInterval(tick, 5500); }
    function label() { pb.textContent = userPaused ? "Play" : "Pause"; pb.setAttribute("aria-label", userPaused ? "Play slideshow" : "Pause slideshow"); }
    function userPause() { userPaused = true; label(); }
    pb.addEventListener("click", function () { userPaused = !userPaused; label(); });
    wrap.addEventListener("mouseenter", function () { paused = true; });
    wrap.addEventListener("mouseleave", function () { paused = false; });
    wrap.addEventListener("focusin", function () { paused = true; });
    wrap.addEventListener("focusout", function () { paused = false; });
    document.addEventListener("visibilitychange", function () { paused = document.hidden; });

    wrap.appendChild(stage); wrap.appendChild(ctrl); host.appendChild(wrap);
    show(0); label(); start();
  }
})();
