(function () {
  "use strict";
  var S = window.SITE, P = window.PROJECTS;
  var bySlug = {};
  P.forEach(function (p, i) { p._i = i; bySlug[p.slug] = p; });

  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, props, kids) {
    var n = document.createElement(tag);
    if (props) Object.keys(props).forEach(function (k) {
      if (k === "text") n.textContent = props[k];
      else if (k === "class") n.className = props[k];
      else if (props[k] !== undefined && props[k] !== null) n.setAttribute(k, props[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  function svg(html) { var d = document.createElement("div"); d.innerHTML = html; return d.firstChild; }
  var ARROW = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  var ARROW_BIG = '<svg class="arrow-big" viewBox="0 0 24 24" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var BACK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  function storeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function storeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var saved = storeGet("theme");
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  $("#theme").addEventListener("click", function () {
    var cur = root.getAttribute("data-theme");
    if (!cur) cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next); storeSet("theme", next);
  });

  /* ---------- Static content from data ---------- */
  var parts = S.name.split(" ");
  $("#h-first").textContent = parts[0];
  $("#h-last").textContent = parts.slice(1).join(" ");
  $("#h-pos").textContent = S.positioning;
  $("#h-focus").textContent = S.focus;
  $("#h-statement").textContent = S.statement;
  $("#h-status").textContent = S.status;
  ["#h-resume", "#r-dl", "#r-open"].forEach(function (s) { var n = $(s); if (n) n.setAttribute("href", S.resume); });
  $("#year").textContent = new Date().getFullYear();
  $("#work-count").textContent = P.length + " projects";

  var grid = $("#work-grid");
  P.forEach(function (p) {
    var a = el("a", { class: "card", href: "#/work/" + p.slug, "data-slug": p.slug, "aria-label": p.title + ". " + p.problem }, [
      el("div", { class: "card-media" }, [
        el("img", { src: p.cover, alt: p.coverAlt, loading: "lazy", decoding: "async", class: p.coverFit === "contain" ? "contain" : "cover", style: p.coverPos ? "object-position:" + p.coverPos : null }),
        el("span", { class: "card-tag", text: p.tag }),
      ]),
      (function () { var h = el("h3", { text: p.title + " " }); h.appendChild(svg(ARROW)); return h; })(),
      el("p", { text: p.problem }),
      el("dl", null, [
        el("div", null, [el("dt", { text: "Role" }), el("dd", { text: p.role })]),
        el("div", null, [el("dt", { text: "When" }), el("dd", { text: p.timeline })]),
      ]),
    ]);
    grid.appendChild(a);
  });

  var ac = $("#about-copy");
  S.about.paragraphs.forEach(function (t) { ac.appendChild(el("p", { text: t })); });
  var af = $("#about-facts");
  S.about.facts.forEach(function (f) { af.appendChild(el("div", null, [el("dt", { text: f.label }), el("dd", { text: f.value })])); });

  $("#c-email").textContent = S.email; $("#c-email").setAttribute("href", "mailto:" + S.email);
  $("#c-li").setAttribute("href", S.linkedin);
  var links = $("#c-links");
  links.appendChild(el("a", { class: "btn", href: S.linkedin, target: "_blank", rel: "noopener", text: "LinkedIn" }));
  links.appendChild(el("a", { class: "btn", href: S.github, target: "_blank", rel: "noopener", text: "GitHub" }));
  $("#c-copy").addEventListener("click", function () {
    var t = $("#c-toast");
    function done(msg) { t.textContent = msg; t.classList.add("on"); setTimeout(function () { t.classList.remove("on"); }, 2200); }
    function fallback() {
      var r = document.createRange(); r.selectNodeContents($("#c-email"));
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      done("Press copy to finish");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(S.email).then(function () { done("Copied"); }, fallback);
    } else fallback();
  });

  /* ---------- Case study rendering ---------- */
  var caseEl = $("#case");
  var lastTrigger = null;
  var baseTitle = document.title;

  function fig(b, inGrid) {
    var f = el("figure", { class: "fig" + (b.wide ? " wide" : "") });
    var btn = el("button", { class: "fig-btn", type: "button", "aria-label": "Enlarge image: " + (b.caption || b.alt) });
    var img = el("img", { src: b.src, alt: b.alt, loading: "lazy", decoding: "async", class: b.contain ? "contain" : "" });
    btn.appendChild(img);
    btn.addEventListener("click", function () { openLightbox(b.src, b.alt, b.caption); });
    f.appendChild(btn);
    if (b.caption) f.appendChild(el("figcaption", { text: b.caption }));
    return f;
  }

  function block(b) {
    switch (b.t) {
      case "p": return el("p", { text: b.text });
      case "list": return el("ul", null, b.items.map(function (i) { return el("li", { text: i }); }));
      case "fig": return fig(b);
      case "figs": return el("div", { class: "figs c" + (b.cols || 2) }, b.items.map(function (i) { return fig(i); }));
      case "quote": return (function () {
        var q = el("blockquote", { class: "quote" }, [el("p", { text: "“" + b.text + "”" })]);
        if (b.cite) q.appendChild(el("cite", { text: b.cite }));
        return q;
      })();
      case "cards": return el("div", { class: "cards c" + (b.cols || 2) }, b.items.map(function (i) {
        return el("div", { class: "mini" }, [el("h3", { text: i.title }), el("p", { text: i.text })]);
      }));
      case "steps": return el("ol", { class: "steps" }, b.items.map(function (i) {
        return el("li", null, [el("h3", { text: i.title }), el("p", { text: i.text })]);
      }));
      case "table": return (function () {
        var t = el("table", { class: "tbl" });
        if (b.caption) t.appendChild(el("caption", { text: b.caption }));
        t.appendChild(el("thead", null, [el("tr", null, b.head.map(function (h) { return el("th", { scope: "col", text: h }); }))]));
        t.appendChild(el("tbody", null, b.rows.map(function (r) {
          return el("tr", null, r.map(function (c, i) { return i === 0 ? el("th", { scope: "row", text: c, style: "font-weight:600" }) : el("td", { text: c }); }));
        })));
        return el("div", { class: "tbl-wrap", tabindex: "0", role: "region", "aria-label": b.caption || "Table" }, [t]);
      })();
      case "stats": return (function () {
        var wrap = el("div", { class: "cs-stats", style: "display:grid;gap:14px" });
        wrap.appendChild(el("div", { class: "stats" }, b.items.map(function (i) {
          return el("div", { class: "stat" }, [el("b", { text: i.value }), el("span", { text: i.label })]);
        })));
        if (b.note) wrap.appendChild(el("p", { class: "stats-note", text: b.note }));
        return wrap;
      })();
      case "note": return el("div", { class: "note" }, [el("h3", { text: b.title }), el("p", { text: b.text })]);
      case "links": return el("div", { class: "link-list" }, b.items.map(function (l) {
        return el("a", { href: l.href, target: "_blank", rel: "noopener", text: l.label });
      }));
    }
    return null;
  }

  function buildCase(p) {
    var n = P.length, prev = P[(p._i + n - 1) % n], next = P[(p._i + 1) % n];
    caseEl.textContent = "";

    var bar = el("div", { class: "case-bar" });
    var inner = el("div", { class: "wrap" });
    var back = el("button", { class: "case-back", type: "button", id: "case-back" });
    back.appendChild(svg(BACK)); back.appendChild(document.createTextNode("All work"));
    back.appendChild(el("kbd", { text: "Esc" }));
    back.addEventListener("click", function () { go("#/"); });
    var pos = el("span", { class: "case-pos", text: "Project " + (p._i + 1) + " of " + n });
    var nav = el("div", { class: "case-nav" });
    var bp = el("button", { class: "icon-btn", type: "button", "aria-label": "Previous project: " + prev.title, title: "Previous (left arrow)" });
    bp.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
    var bn = el("button", { class: "icon-btn", type: "button", "aria-label": "Next project: " + next.title, title: "Next (right arrow)" });
    bn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
    bp.addEventListener("click", function () { go("#/work/" + prev.slug); });
    bn.addEventListener("click", function () { go("#/work/" + next.slug); });
    nav.appendChild(bp); nav.appendChild(bn);
    inner.appendChild(back); inner.appendChild(pos); inner.appendChild(nav);
    bar.appendChild(inner); caseEl.appendChild(bar);

    var hero = el("header", { class: "case-hero" });
    var hw = el("div", { class: "wrap" });
    hw.appendChild(el("span", { class: "tagline", text: p.tag }));
    var h1 = el("h1", { id: "case-title", tabindex: "-1", text: p.title });
    hw.appendChild(h1);
    hw.appendChild(el("p", { class: "lede", text: p.problem }));
    var meta = el("dl", { class: "meta" });
    [["Role", p.role], ["Timeline", p.timeline], ["Team", p.team], ["Context", p.context], ["Tools and methods", p.tools]].forEach(function (m) {
      if (m[1]) meta.appendChild(el("div", null, [el("dt", { text: m[0] }), el("dd", { text: m[1] })]));
    });
    hw.appendChild(meta);
    hw.appendChild(el("div", { class: "case-cover" }, [el("img", { src: p.cover, alt: p.coverAlt, class: p.coverFit === "contain" ? "contain" : "cover", decoding: "async" })]));
    hero.appendChild(hw); caseEl.appendChild(hero);

    var cs = el("div", { class: "cs" });
    var cw = el("div", { class: "wrap" });
    p.sections.forEach(function (s) {
      var row = el("section", { class: "cs-row", "aria-labelledby": "s-" + s.id });
      row.style.paddingBlock = "";
      row.appendChild(el("h2", { id: "s-" + s.id, text: s.title }));
      var body = el("div", { class: "cs-body" });
      s.blocks.forEach(function (b) { var node = block(b); if (node) body.appendChild(node); });
      row.appendChild(body); cw.appendChild(row);
    });
    cs.appendChild(cw); caseEl.appendChild(cs);

    var nx = el("div", { class: "case-next" });
    var link = el("a", { href: "#/work/" + next.slug });
    link.appendChild(el("small", { text: "Next project" }));
    var strong = el("strong");
    strong.appendChild(el("span", { class: "t", text: next.title }));
    strong.appendChild(svg(ARROW_BIG));
    link.appendChild(strong);
    nx.appendChild(el("div", { class: "wrap" }, [link]));
    caseEl.appendChild(nx);
  }

  function openCase(slug) {
    var p = bySlug[slug];
    if (!p) return;
    var wasOpen = caseEl.classList.contains("open");
    buildCase(p);
    caseEl.hidden = false;
    caseEl.classList.remove("open");
    void caseEl.offsetWidth;
    caseEl.classList.add("open");
    caseEl.scrollTop = 0;
    root.classList.add("locked");
    document.title = p.title + " | " + S.name;
    var h = $("#case-title");
    if (h) h.focus({ preventScroll: true });
    if (!wasOpen) lastTrigger = document.querySelector('.card[data-slug="' + slug + '"]') || lastTrigger;
  }
  function closeCase() {
    if (!caseEl.classList.contains("open")) return;
    caseEl.classList.remove("open");
    caseEl.hidden = true;
    root.classList.remove("locked");
    document.title = baseTitle;
    if (lastTrigger && document.body.contains(lastTrigger)) lastTrigger.focus({ preventScroll: true });
  }

  /* ---------- Router ---------- */
  function go(hash) {
    try { location.hash = hash; } catch (e) {}
    route(hash);
  }
  var lastRouted = null;
  function route(h) {
    var hash = typeof h === "string" ? h : location.hash;
    if (hash === lastRouted) return;
    lastRouted = hash;
    var m = /^#\/work\/([\w-]+)/.exec(hash);
    if (m && bySlug[m[1]]) openCase(m[1]); else closeCase();
  }
  window.addEventListener("hashchange", function () { route(); });
  grid.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest(".card");
    if (!a) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    lastTrigger = a;
    go("#/work/" + a.getAttribute("data-slug"));
  });
  caseEl.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest(".case-next a");
    if (!a) return;
    e.preventDefault();
    go(a.getAttribute("href"));
  });

  /* ---------- Lightbox: pan and zoom (drag, wheel, pinch, buttons, keys) ---------- */
  var lb = $("#lightbox"), lbStage = $("#lb-stage"), lbImg = $("#lb-img"), lbCap = $("#lb-cap"), lbFrom = null;
  var Z = { s: 1, fit: 1, min: 1, max: 4, x: 0, y: 0, w: 0, h: 0 }, ptrs = {}, pinch = null, drag = null, lastTap = 0;
  function clampZ() {
    var sw = lbStage.clientWidth, sh = lbStage.clientHeight, iw = Z.w * Z.s, ih = Z.h * Z.s;
    Z.x = iw <= sw ? (sw - iw) / 2 : Math.min(0, Math.max(sw - iw, Z.x));
    Z.y = ih <= sh ? (sh - ih) / 2 : Math.min(0, Math.max(sh - ih, Z.y));
  }
  function paint() { clampZ(); lbImg.style.transform = "translate(" + Z.x + "px," + Z.y + "px) scale(" + Z.s + ")"; }
  function fitZ() {
    Z.w = lbImg.naturalWidth || 1; Z.h = lbImg.naturalHeight || 1;
    var sw = lbStage.clientWidth, sh = lbStage.clientHeight;
    Z.fit = Math.min(sw / Z.w, sh / Z.h); Z.min = Z.fit; Z.max = Math.max(Z.fit * 8, 4);
    Z.s = Z.fit; Z.x = 0; Z.y = 0; paint();
  }
  function zoomAt(ns, cx, cy) {
    ns = Math.min(Z.max, Math.max(Z.min, ns));
    var k = ns / Z.s;
    Z.x = cx - (cx - Z.x) * k; Z.y = cy - (cy - Z.y) * k; Z.s = ns; paint();
  }
  function stagePt(e) { var r = lbStage.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function zoomCenter(f) { zoomAt(Z.s * f, lbStage.clientWidth / 2, lbStage.clientHeight / 2); }
  function openLightbox(src, alt, cap) {
    lbFrom = document.activeElement;
    lbImg.onload = fitZ;
    lbImg.alt = alt || ""; lbCap.textContent = cap || "";
    lbStage.setAttribute("aria-label", (alt ? alt + " " : "") + "Zoomable image. Use plus and minus to zoom, arrow keys to move, 0 to fit.");
    lb.classList.add("open");
    lbImg.src = src;
    if (lbImg.complete && lbImg.naturalWidth) fitZ();
    $("#lb-close").focus();
  }
  function closeLightbox() {
    lb.classList.remove("open"); lbImg.removeAttribute("src"); lbImg.style.transform = ""; ptrs = {}; pinch = null; drag = null;
    if (lbFrom && document.body.contains(lbFrom)) lbFrom.focus({ preventScroll: true });
  }
  $("#lb-close").addEventListener("click", closeLightbox);
  $("#lb-in").addEventListener("click", function () { zoomCenter(1.5); });
  $("#lb-out").addEventListener("click", function () { zoomCenter(1 / 1.5); });
  $("#lb-fit").addEventListener("click", fitZ);
  window.addEventListener("resize", function () { if (lb.classList.contains("open")) { var atFit = Math.abs(Z.s - Z.fit) < 1e-6; var keep = Z.s; fitZ(); if (!atFit) { Z.s = Math.min(Z.max, Math.max(Z.min, keep)); paint(); } } });
  lbStage.addEventListener("wheel", function (e) {
    e.preventDefault();
    var p = stagePt(e), f = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0018));
    zoomAt(Z.s * f, p.x, p.y);
  }, { passive: false });
  lbStage.addEventListener("pointerdown", function (e) {
    lbStage.setPointerCapture(e.pointerId); ptrs[e.pointerId] = stagePt(e);
    var ids = Object.keys(ptrs);
    if (ids.length === 2) {
      var a = ptrs[ids[0]], b = ptrs[ids[1]];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s: Z.s }; drag = null;
    } else if (ids.length === 1) {
      drag = { x: ptrs[ids[0]].x, y: ptrs[ids[0]].y, ox: Z.x, oy: Z.y };
      var now = Date.now();
      if (now - lastTap < 320) { var p = stagePt(e); if (Z.s > Z.fit * 1.2) fitZ(); else zoomAt(Math.max(Z.fit * 2.5, 1.5), p.x, p.y); lastTap = 0; }
      else lastTap = now;
    }
  });
  lbStage.addEventListener("pointermove", function (e) {
    if (!ptrs[e.pointerId]) return;
    ptrs[e.pointerId] = stagePt(e);
    var ids = Object.keys(ptrs);
    if (ids.length === 2 && pinch) {
      var a = ptrs[ids[0]], b = ptrs[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y);
      zoomAt(pinch.s * d / pinch.d, (a.x + b.x) / 2, (a.y + b.y) / 2);
    } else if (drag) {
      var p = ptrs[e.pointerId];
      Z.x = drag.ox + (p.x - drag.x); Z.y = drag.oy + (p.y - drag.y); paint();
    }
  });
  function endPtr(e) {
    delete ptrs[e.pointerId]; pinch = null;
    var ids = Object.keys(ptrs);
    drag = ids.length === 1 ? { x: ptrs[ids[0]].x, y: ptrs[ids[0]].y, ox: Z.x, oy: Z.y } : null;
  }
  lbStage.addEventListener("pointerup", endPtr);
  lbStage.addEventListener("pointercancel", endPtr);

  /* ---------- Keyboard ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target, typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    if (e.key === "Escape") {
      if (lb.classList.contains("open")) { closeLightbox(); e.preventDefault(); }
      else if (caseEl.classList.contains("open")) { go("#/"); e.preventDefault(); }
      return;
    }
    if (lb.classList.contains("open") && !typing) {
      var step = 60;
      if (e.key === "+" || e.key === "=") { zoomCenter(1.25); e.preventDefault(); }
      else if (e.key === "-" || e.key === "_") { zoomCenter(0.8); e.preventDefault(); }
      else if (e.key === "0") { fitZ(); e.preventDefault(); }
      else if (e.key === "ArrowLeft") { Z.x += step; paint(); e.preventDefault(); }
      else if (e.key === "ArrowRight") { Z.x -= step; paint(); e.preventDefault(); }
      else if (e.key === "ArrowUp") { Z.y += step; paint(); e.preventDefault(); }
      else if (e.key === "ArrowDown") { Z.y -= step; paint(); e.preventDefault(); }
      return;
    }
    if (typing || !caseEl.classList.contains("open")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      var cur = /^#\/work\/([\w-]+)/.exec(lastRouted || location.hash || "");
      var p = cur && bySlug[cur[1]];
      if (!p) return;
      var n = P.length, d = e.key === "ArrowRight" ? 1 : n - 1;
      go("#/work/" + P[(p._i + d) % n].slug);
      e.preventDefault();
    }
  });

  /* Trap focus inside the open sheet and lightbox */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var scope = lb.classList.contains("open") ? lb : (caseEl.classList.contains("open") ? caseEl : null);
    if (!scope) return;
    var f = scope.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  });

  route();
})();
