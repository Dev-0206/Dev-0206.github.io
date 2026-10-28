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
  $("#h-pos").textContent = S.ask || S.positioning;
  $("#h-focus").textContent = S.focus;
  $("#h-statement").textContent = S.statement;
  var chips = $("#h-chips");
  (S.chips || []).forEach(function (c) {
    chips.appendChild(el("li", null, [el("a", { href: c.href, text: c.text })]));
  });
  $("#h-status").textContent = S.status;
  ["#h-resume", "#r-dl", "#r-open"].forEach(function (s) { var n = $(s); if (n) n.setAttribute("href", S.resume); });
  $("#year").textContent = new Date().getFullYear();
  $("#work-count").textContent = P.length + " projects";

  var grid = $("#work-grid");
  P.forEach(function (p) {
    var a = el("a", { class: "card", id: "card-" + p.slug, href: "#/work/" + p.slug, "data-slug": p.slug, "aria-label": p.title + ". " + (p.outcome ? p.outcome + " " : "") + p.problem }, [
      el("div", { class: "card-media" }, [
        el("img", { src: p.cover, alt: p.coverAlt, loading: "lazy", decoding: "async", class: p.coverFit === "contain" ? "contain" : "cover", style: p.coverPos ? "object-position:" + p.coverPos : null }),
        el("span", { class: "card-tag", text: p.tag }),
      ]),
      (function () { var h = el("h3", { text: p.title + " " }); h.appendChild(svg(ARROW)); return h; })(),
      p.outcome ? el("p", { class: "card-outcome" }, [el("span", { class: "card-outcome-label", text: "Outcome" }), el("span", { text: p.outcome })]) : null,
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


  /* ---------- Second Spin interactive model ---------- */
  var LCA = window.LCA;
  function fmt(n) { return Math.round(n).toLocaleString("en-US"); }
  var KIND_LABEL = { mat: "Material or energy", em: "Emission or waste", prod: "Product or outcome" };

  function stagesBlock() {
    var cur = 0, tabs = [];
    var root = el("div", { class: "stages" });
    root.appendChild(el("h3", { class: "model-h", id: "stages-h", text: "Explore the life cycle" }));
    root.appendChild(el("p", { class: "model-lead", text: "Pick a stage to see what goes in, what comes out, and what Second Spin changes." }));
    var list = el("div", { class: "stage-tabs", role: "tablist", "aria-labelledby": "stages-h" });
    var panel = el("div", { class: "stage-panel", role: "tabpanel", id: "stage-panel", tabindex: "0" });
    LCA.stages.forEach(function (st, i) {
      var t = el("button", { class: "stage-tab", type: "button", role: "tab", id: "stage-tab-" + i, "aria-controls": "stage-panel", "aria-selected": "false", tabindex: "-1" }, [
        el("span", { class: "sn", text: "0" + (i + 1) }),
        el("span", { class: "nm", text: st.name }),
        st.focus ? el("span", { class: "fc", text: "Our focus" }) : null,
      ]);
      t.addEventListener("click", function () { select(i, false); });
      t.addEventListener("keydown", function (e) {
        var k = e.key, n = LCA.stages.length, j = null;
        if (k === "ArrowRight" || k === "ArrowDown") j = (cur + 1) % n;
        else if (k === "ArrowLeft" || k === "ArrowUp") j = (cur + n - 1) % n;
        else if (k === "Home") j = 0;
        else if (k === "End") j = n - 1;
        if (j !== null) { e.preventDefault(); e.stopPropagation(); select(j, true); }
      });
      tabs.push(t); list.appendChild(t);
    });
    function stickies(items) {
      return el("ul", { class: "stickies" }, items.map(function (x) {
        return el("li", { class: "sticky " + x.k }, [el("span", { class: "vh", text: KIND_LABEL[x.k] + ": " }), document.createTextNode(x.t)]);
      }));
    }
    function select(i, focus) {
      cur = i; var st = LCA.stages[i];
      tabs.forEach(function (t, j) { var on = j === i; t.setAttribute("aria-selected", on ? "true" : "false"); t.tabIndex = on ? 0 : -1; });
      panel.setAttribute("aria-labelledby", "stage-tab-" + i);
      panel.textContent = "";
      panel.appendChild(el("h4", { class: "stage-title", text: st.name }));
      panel.appendChild(el("p", { class: "stage-blurb", text: st.blurb }));
      panel.appendChild(el("div", { class: "io" }, [
        el("div", { role: "group", "aria-label": "Goes in" }, [el("h5", { text: "Goes in" }), stickies(st.inputs)]),
        el("span", { class: "io-arrow", "aria-hidden": "true", text: "→" }),
        el("div", { role: "group", "aria-label": "Comes out" }, [el("h5", { text: "Comes out" }), stickies(st.outputs)]),
      ]));
      panel.appendChild(el("p", { class: "stage-change" }, [el("b", { text: "In Second Spin" }), document.createTextNode(st.change)]));
      var nav = el("div", { class: "stage-nav" });
      var pv = el("button", { class: "btn", type: "button", text: "← Previous stage" });
      var nx = el("button", { class: "btn", type: "button", text: "Next stage →" });
      pv.disabled = i === 0; nx.disabled = i === LCA.stages.length - 1;
      pv.addEventListener("click", function () { select(cur - 1, false); });
      nx.addEventListener("click", function () { select(cur + 1, false); });
      nav.appendChild(pv); nav.appendChild(nx); panel.appendChild(nav);
      if (focus) tabs[i].focus();
    }
    root.appendChild(list); root.appendChild(panel);
    var lg = el("ul", { class: "legend", "aria-label": "Sticky note colors" }, LCA.legend.map(function (l) {
      return el("li", null, [el("i", { class: "sw " + l.k, "aria-hidden": "true" }), document.createTextNode(l.label)]);
    }));
    root.appendChild(lg);
    select(0, false);
    return root;
  }

  function sensBlock() {
    var M = LCA.model;
    var root = el("div", { class: "sens" });
    root.appendChild(el("h3", { class: "model-h", id: "sens-h", text: "Test the main assumption" }));
    root.appendChild(el("p", { class: "model-lead", text: "Our model assumes reprinting emits about " + M.assumedG + " g of CO2 per record. Move the slider to see how much the result depends on that number." }));
    var slider = el("input", { type: "range", id: "sens-g", min: "0", max: "200", step: "0.1", value: String(M.assumedG) });
    var out = el("output", { class: "sens-out", for: "sens-g" });
    var reset = el("button", { class: "btn", type: "button", text: "Reset to " + M.assumedG + " g" });
    root.appendChild(el("div", { class: "sens-ctl" }, [el("label", { for: "sens-g", text: "CO2 per reprinted record" }), slider, out, reset]));
    var chk = el("input", { type: "checkbox", id: "sens-t" });
    root.appendChild(el("label", { class: "chk", for: "sens-t" }, [chk, document.createTextNode("Include collection transport (about " + fmt(M.transport) + " kg a year)")]));
    var bc = el("i", { class: "seg cur" }), bp = el("i", { class: "seg paper" }), br = el("i", { class: "seg rep" }), bt = el("i", { class: "seg trn" });
    var vc = el("span", { class: "bv" }), vs = el("span", { class: "bv" });
    root.appendChild(el("div", { class: "bars", "aria-hidden": "true" }, [
      el("div", { class: "bar-row" }, [el("span", { class: "bl", text: "Current production" }), el("div", { class: "bar" }, [bc]), vc]),
      el("div", { class: "bar-row" }, [el("span", { class: "bl", text: "Second Spin" }), el("div", { class: "bar" }, [bp, br, bt]), vs]),
    ]));
    root.appendChild(el("ul", { class: "legend", "aria-hidden": "true" }, [
      el("li", null, [el("i", { class: "sw cur" }), document.createTextNode("Current production")]),
      el("li", null, [el("i", { class: "sw paper" }), document.createTextNode("Paper sleeve and cover")]),
      el("li", null, [el("i", { class: "sw rep" }), document.createTextNode("Reprinting")]),
      el("li", null, [el("i", { class: "sw trn" }), document.createTextNode("Collection transport")]),
    ]));
    var result = el("p", { class: "sens-result", role: "status", "aria-live": "polite" });
    var facts = el("ul", { class: "sens-facts" });
    root.appendChild(result); root.appendChild(facts);
    root.appendChild(el("p", { class: "stats-note", text: "Current production (" + fmt(M.current) + " kg) and the paper sleeve and cover (" + fmt(M.paper) + " kg) come from our impact assessment and stay fixed here. All figures are estimates for one plant's 2022 volume of " + fmt(M.records) + " records, not measurements." }));
    var t;
    function calc() {
      var g = parseFloat(slider.value) || 0, tr = chk.checked ? M.transport : 0;
      var rep = M.records * g / 1000, total = M.paper + rep + tr, pct = (1 - total / M.current) * 100;
      var be = (M.current / 2 - M.paper - tr) / (M.records / 1000);
      out.textContent = (Math.round(g * 10) / 10) + " g";
      slider.setAttribute("aria-valuetext", (Math.round(g * 10) / 10) + " grams of CO2 per record");
      bc.style.width = "100%";
      bp.style.width = (M.paper / M.current * 100) + "%"; br.style.width = (rep / M.current * 100) + "%"; bt.style.width = (tr / M.current * 100) + "%";
      vc.textContent = fmt(M.current) + " kg"; vs.textContent = fmt(total) + " kg";
      var rp = Math.round(Math.abs(pct));
      var msg = "Second Spin: " + fmt(total) + " kg of CO2 a year, " + rp + "% " + (pct >= 0 ? "lower" : "higher") + " than current production.";
      result.textContent = ""; result.appendChild(el("strong", { text: rp + "% " + (pct >= 0 ? "lower" : "higher") })); result.appendChild(document.createTextNode("Second Spin comes to " + fmt(total) + " kg of CO2 a year, against " + fmt(M.current) + " kg for current production."));
      result.setAttribute("data-msg", msg);
      facts.textContent = "";
      facts.appendChild(el("li", { text: "Paper sleeves and covers make up " + Math.round(M.paper / total * 100) + "% of what is left. That is the next place to look." }));
      facts.appendChild(el("li", { text: "The saving drops to 50% only if reprinting emitted about " + Math.round(be) + " g of CO2 per record. Our assumption is " + M.assumedG + " g." }));
    }
    slider.addEventListener("input", function () { clearTimeout(t); t = setTimeout(calc, 0); calc(); });
    chk.addEventListener("change", calc);
    reset.addEventListener("click", function () { slider.value = String(M.assumedG); calc(); });
    calc();
    return root;
  }

  function block(b) {
    switch (b.t) {
      case "stages": return stagesBlock();
      case "sens": return sensBlock();
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
    var strip = el("div", { class: "case-strip" });
    if (p.outcome) strip.appendChild(el("p", { class: "case-strip-item" }, [el("span", { class: "lbl", text: "Outcome" }), el("span", { text: p.outcome })]));
    if (p.decision) strip.appendChild(el("p", { class: "case-strip-item" }, [el("span", { class: "lbl", text: "A decision I made" }), el("span", { text: p.decision })]));
    if (strip.childNodes.length) hw.appendChild(strip);
    var meta = el("dl", { class: "meta" });
    [["Role", p.role], ["Timeline", p.timeline], ["Team", p.team], ["Context", p.context], ["Tools and methods", p.tools]].forEach(function (m) {
      if (m[1]) meta.appendChild(el("div", null, [el("dt", { text: m[0] }), el("dd", { text: m[1] })]));
    });
    hw.appendChild(meta);
    hw.appendChild(el("div", { class: "case-cover" }, [el("img", { src: p.cover, alt: p.coverAlt, class: p.coverFit === "contain" ? "contain" : "cover", decoding: "async" })]));
    hero.appendChild(hw); caseEl.appendChild(hero);

    var cs = el("div", { class: "cs" });
    var cw = el("div", { class: "wrap" });
    var FOLD = { process: 1, reflection: 1, next: 1 };
    p.sections.forEach(function (s) {
      var folded = !!FOLD[s.id] && !s.open;
      var row = el("section", { class: "cs-row" + (folded ? " cs-fold" : ""), "aria-labelledby": "s-" + s.id });
      row.style.paddingBlock = "";
      row.appendChild(el("h2", { id: "s-" + s.id, text: s.title }));
      var body = el("div", { class: "cs-body" });
      var target = body;
      if (folded) {
        var d = el("details", { class: "cs-details" });
        var label = s.title.toLowerCase();
        var sm = el("summary", { text: "Show " + label });
        var inner = el("div", { class: "cs-body cs-details-body" });
        d.appendChild(sm); d.appendChild(inner); body.appendChild(d);
        d.addEventListener("toggle", function () { sm.textContent = (d.open ? "Hide " : "Show ") + label; });
        target = inner;
      }
      s.blocks.forEach(function (b) { var node = block(b); if (node) target.appendChild(node); });
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
