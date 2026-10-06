(function () {
  "use strict";
  var S = window.SITE, MODELS = window.MODELS.filter(function (m) { return m.enabled; });
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var byId = function (id) { return MODELS.filter(function (m) { return m.id === id; })[0]; };

  function inr(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }
  function lakh(n) { return "₹" + (n / 100000).toFixed(2).replace(/\.?0+$/, "") + " L"; }
  function priceRange(m) { return m.to ? lakh(m.from) + " – " + lakh(m.to) : "From " + lakh(m.from); }
  function img(src, label, alt) {
    var i = document.createElement("img");
    i.src = src; i.alt = alt || label; i.loading = "lazy";
    i.onerror = function () {
      var d = document.createElement("div"); d.className = "ph";
      d.textContent = "Add image: " + src.replace(/^assets\/images\//, "");
      if (i.parentNode) i.parentNode.replaceChild(d, i);
    };
    return i;
  }
  function imgHTML(src, alt) {
    return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" onerror="this.outerHTML=\'<div class=&quot;ph&quot;>Add image: ' + esc(src.replace("assets/images/", "")) + '</div>\'">';
  }
  function wa(text, num) { return "https://wa.me/" + (num || S.whatsapp) + "?text=" + encodeURIComponent(text); }
  var toast = (function () {
    var el = $("#toast"), t;
    return function (msg) { el.textContent = msg; el.classList.add("on"); clearTimeout(t); t = setTimeout(function () { el.classList.remove("on"); }, 3500); };
  })();

  /* ---------- static bindings ---------- */
  $("#yr").textContent = new Date().getFullYear();
  $("#dkWa").href = wa("Hi Vignesh Nissan, I'd like to know more about your cars.");
  $("#mbWa").href = $("#dkWa").href;
  var svcWa = $("#svcWa"); if (svcWa) svcWa.href = wa("Hi Vignesh Nissan Service, I'd like to book a service.", S.serviceWhatsapp);
  $("#dkIg").href = S.instagram;
  $("#dkCall").href = "tel:" + S.phones[0].replace(/\s/g, "");
  /* showroom locations: tabs switch the address, timings, call buttons, directions and map */
  var LOCS = (S.locations && S.locations.length) ? S.locations : [{ id: "main", name: "Showroom", address: S.address, phones: S.phones, hours: true, mapLink: S.mapLink, mapEmbed: S.mapEmbed }];
  var curLoc = 0, mapSet = {};
  function locQuery(l) { return encodeURIComponent("Vignesh Nissan, " + l.address); }
  function renderLoc(i) {
    curLoc = i; var l = LOCS[i];
    $("#locTabs").innerHTML = LOCS.length > 1 ? LOCS.map(function (x, k) { return '<button class="tab' + (k === i ? " on" : "") + '" role="tab" aria-selected="' + (k === i) + '" data-loc="' + k + '">' + esc(x.name) + "</button>"; }).join("") : "";
    $("#addr").textContent = l.address;
    $("#hoursLine").innerHTML = l.hours ? "<b>Hours:</b> Mon–Sat 9 AM – 9 PM · Sun 10 AM – 8 PM" : "<b>Timings:</b> Call us to confirm showroom timings.";
    $("#openBadge2").hidden = !l.hours;
    var dir = l.mapLink || ("https://www.google.com/maps/search/?api=1&query=" + locQuery(l));
    $("#visitBtns").innerHTML = '<a class="btn btn-red" target="_blank" rel="noopener" href="' + esc(dir) + '">Get Directions</a>' +
      (l.phones && l.phones.length ? l.phones : S.phones).map(function (p) { return '<a class="btn btn-ghost" href="tel:' + p.replace(/s/g, "") + '">' + esc(p) + "</a>"; }).join("");
    $("#mapFrame").src = l.mapEmbed || ("https://maps.google.com/maps?q=" + locQuery(l) + "&z=16&output=embed");
    $("#mapFrame").title = "Vignesh Nissan " + l.name + " location";
  }
  $("#locTabs").addEventListener("click", function (e) { var t = e.target.closest("[data-loc]"); if (t) renderLoc(+t.dataset.loc); });
  renderLoc(0);
  /* social icon row: Facebook, YouTube, X/Twitter, LinkedIn, Instagram, Google Maps */
  var ICONS = {
    Facebook: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z",
    YouTube: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.7 2 12 2 12s0 3.3.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.5.4-4.8.4-4.8s0-3.3-.4-4.8zM10 15V9l5.2 3L10 15z",
    Twitter: "M18.2 2.5h3.3l-7.2 8.3 8.5 11.2h-6.6l-5.2-6.8-6 6.8H1.7l7.7-8.8L1.3 2.5H8l4.7 6.2 5.5-6.2zm-1.2 17.5h1.8L7.1 4.3H5.2L17 20z",
    LinkedIn: "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.6V9h3.5v11.5z",
    Instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM17.5 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z",
    Google: "M12.2 10.8v3.4h4.8c-.2 1.2-1.5 3.5-4.8 3.5a5.3 5.3 0 0 1 0-10.6c1.7 0 2.8.7 3.4 1.3l2.3-2.2A8.5 8.5 0 0 0 12.2 4a8.5 8.5 0 1 0 0 17c4.9 0 8.1-3.4 8.1-8.3 0-.6-.1-1-.1-1.4h-8z"
  };
  var socialHTML = [["Facebook", S.facebook, "Facebook"], ["YouTube", S.youtube, "YouTube"], ["Twitter", S.twitter, "Twitter / X"], ["LinkedIn", S.linkedin, "LinkedIn"], ["Instagram", S.instagram, "Instagram"], ["Google", S.mapLink, "Find us on Google Maps"]]
    .filter(function (s) { return s[1]; })
    .map(function (s) { return '<a class="soc ' + s[0].toLowerCase() + '" target="_blank" rel="noopener" href="' + esc(s[1]) + '" aria-label="' + esc(s[2]) + '" title="' + esc(s[2]) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="' + ICONS[s[0]] + '"/></svg></a>'; }).join("");
  $("#social").innerHTML = socialHTML;
  $("#visitSocial").innerHTML = socialHTML;

  /* ---------- open now badge (IST) ---------- */
  function updateOpen() {
    // the Open now badge only makes sense for a showroom whose hours we know
    if (!LOCS.some(function (l) { return l.hours; })) { $$("#openBadge,#openBadge2").forEach(function (b) { b.hidden = true; }); return; }
    var p = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", weekday: "short", hour: "numeric", hour12: false }).formatToParts(new Date());
    var day = p.filter(function (x) { return x.type === "weekday"; })[0].value;
    var h = parseInt(p.filter(function (x) { return x.type === "hour"; })[0].value, 10) % 24;
    var w = day === "Sun" ? S.hours.sun : S.hours.mon_sat;
    var open = h >= w[0] && h < w[1];
    $$("#openBadge,#openBadge2").forEach(function (b) {
      b.className = b.className.replace(/\b(on|off)\b/g, "").trim() + (open ? " on" : " off");
      b.textContent = open ? "Open now · closes " + (w[1] > 12 ? w[1] - 12 : w[1]) + " PM" : "Closed · opens " + (w[0] > 12 ? w[0] - 12 : w[0]) + " AM";
    });
  }
  updateOpen(); setInterval(updateOpen, 60000);

  /* ---------- nav ---------- */
  var burger = $("#burger"), menu = $("#menu");
  burger.addEventListener("click", function () {
    var on = menu.classList.toggle("on"); burger.setAttribute("aria-expanded", on);
  });
  $$("#menu a").forEach(function (a) { a.addEventListener("click", function () { menu.classList.remove("on"); burger.setAttribute("aria-expanded", false); }); });

  /* ---------- slideshow: crossfade + slow zoom (interior shots zoom in and out) ---------- */
  function swBG(c) { return c.hex2 ? "linear-gradient(135deg," + c.hex + " 52%," + c.hex2 + " 52%)" : c.hex; }
  function colImg(m, c) { return c.img || "assets/images/colors/" + m.id + "-" + c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".png"; }
  function slidesOf(m) { return m.slides && m.slides.length ? m.slides : [{ src: m.panel, kind: "ext", label: m.name }]; }
  function ssHTML(m, cls, single) {
    var sl = single ? [slidesOf(m)[0]] : slidesOf(m);
    return '<div class="ss ' + (cls || "") + '" data-ss="' + m.id + '">' +
      sl.map(function (s, i) { return '<div class="sl ' + s.kind + (i === 0 ? " on" : "") + '" style="background-image:url(\'' + esc(s.src) + '\')"></div>'; }).join("") +
      (sl.length > 1 ? '<div class="dots" aria-hidden="true">' + sl.map(function (s, i) { return "<i" + (i === 0 ? ' class="on"' : "") + "></i>"; }).join("") + "</div>" +
        '<span class="cap"></span>' : "") + "</div>";
  }
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function initSlides(root) {
    $$(".ss", root).forEach(function (el, n) {
      var m = byId(el.dataset.ss), sl = slidesOf(m), slides = $$(".sl", el), dots = $$(".dots i", el), cap = $(".cap", el), i = 0, vis = true;
      if (slides.length < 2 || el._on) return;
      el._on = true;
      function show(k) {
        slides[i].classList.remove("on"); if (dots[i]) dots[i].classList.remove("on");
        i = k; slides[i].classList.add("on"); if (dots[i]) dots[i].classList.add("on");
        if (cap) { cap.textContent = sl[i].label || ""; cap.classList.remove("in"); void cap.offsetWidth; cap.classList.add("in"); }
      }
      if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; }).observe(el);
      var t = setInterval(function () {
        if (!el.isConnected) { clearInterval(t); return; }
        if (vis && !document.hidden && !reduceMotion && !el.matches(":hover")) show((i + 1) % slides.length);
      }, 4800 + n * 700);
      dots.forEach(function (d, k) { d.addEventListener("click", function (e) { e.stopPropagation(); show(k); }); });
    });
  }

  /* ---------- model panels + detail pages ---------- */
  $("#modelCards").innerHTML = MODELS.map(function (m) {
    return '<button class="panel reveal" data-id="' + m.id + '" aria-label="' + esc(m.title) + ', know more">' +
      ssHTML(m, "static", true) +
      (m.badge === "New Launch" ? '<span class="flag">New launch</span>' : "") +
      '<div class="txt"><h3>' + esc(m.title) + "</h3><p>" + esc(m.blurb) + '</p><p class="pr">' + esc(m.priceLine) +
      " INR " + m.from.toLocaleString("en-IN") + '</p><span class="more">Know more</span></div></button>';
  }).join("");

  var detail = $("#detail"), detailOpen = false, detailTimer = null;
  function detailHTML(m) {
    var mile = (m.claims.filter(function (c) { return /mileage/i.test(c[0]); })[0] || [])[1];
    return '<div class="d-bar"><div class="wrap"><div class="in glass"><button class="d-back" data-dclose>← All models</button>' +
      '<b>' + esc(m.name) + '</b><button class="btn btn-red sm" data-model="' + m.id + '">Book Test Drive</button></div></div></div>' +
      '<section class="d-hero"><div class="wrap d-grid"><div class="d-copy">' +
      '<h1>' + esc(m.title) + "</h1><p>" + esc(m.blurb) + '</p><div class="d-price">' + esc(m.priceLine) + "<b>INR " + m.from.toLocaleString("en-IN") +
      '</b></div><div class="d-cta"><button class="btn btn-red" data-model="' + m.id + '" data-purpose="Test Drive">Book a Test Drive</button>' +
      '<button class="btn btn-ghost" data-model="' + m.id + '" data-purpose="On-Road Price">Get On-Road Price</button>' +
      '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + wa("Hi Vignesh Nissan, I'm interested in the Nissan " + m.name + ". Please share details.") + '">WhatsApp</a></div></div>' + ssHTML(m, "d-pic") + '</div></section>' +
      (m.claims.length ? '<section class="d-sec"><div class="wrap"><h2>Key <em>claims</em></h2><div class="claims">' +
        m.claims.map(function (c) { return '<div class="claim glass"><small>' + esc(c[0]) + "</small><b>" + esc(c[1]) + "</b></div>"; }).join("") +
        '</div><p class="d-note">Mileage is ARAI-claimed. Real-world figures depend on driving conditions.</p></div></section>' : "") +
      (m.engines.length ? '<section class="d-sec"><div class="wrap"><h2>Engine &amp; <em>transmission</em></h2><div class="tbl glass"><table><thead><tr><th>Engine</th><th>Power</th><th>Torque</th><th>Gearbox</th><th>Claimed mileage</th></tr></thead><tbody>' +
        m.engines.map(function (e) { return "<tr><td><b>" + esc(e.name) + "</b></td><td>" + esc(e.power) + "</td><td>" + esc(e.torque) + "</td><td>" + esc(e.gearbox) + "</td><td>" + esc(e.mileage) + "</td></tr>"; }).join("") +
        "</tbody></table></div></div></section>" : "") +
      '<section class="d-sec"><div class="wrap"><h2>Variants &amp; <em>prices</em></h2><div class="tbl glass"><table><thead><tr><th>Variant</th><th>Engine</th><th>Gearbox</th><th>Highlights</th><th>Ex-showroom</th><th></th></tr></thead><tbody>' +
      m.variants.map(function (v) {
        return "<tr><td><b>" + esc(v.trim) + "</b></td><td>" + esc(v.engine) + "</td><td>" + esc(v.gearbox) + '</td><td class="ft">' + esc(v.features || "") + '</td><td class="p">' +
          (v.price ? "From " + inr(v.price) : "Ask for price") + '</td><td><button class="btn btn-red sm" data-model="' + m.id + '" data-variant="' + esc(v.trim) + '">Enquire</button></td></tr>';
      }).join("") + "</tbody></table></div><p class=\"d-note\">" + esc(m.priceNote || "Ex-showroom prices are indicative. Call or WhatsApp for the latest Puducherry on-road price.") + "</p></div></section>" +
      (m.dims.length ? '<section class="d-sec"><div class="wrap"><h2>Dimensions &amp; <em>capacity</em></h2><div class="claims">' +
        m.dims.map(function (c) { return '<div class="claim glass"><small>' + esc(c[0]) + "</small><b>" + esc(c[1]) + "</b></div>"; }).join("") + "</div></div></section>" : "") +
      (slidesOf(m).length > 1 ? '<section class="d-sec"><div class="wrap"><h2>' + (m.gallery ? "Photo <em>highlights</em>" : "Exterior &amp; <em>interior</em>") + '</h2><div class="mosaic">' +
        slidesOf(m).map(function (s, i) {
          return '<figure class="tile ' + s.kind + (i === 0 ? " big" : "") + '" data-src="' + esc(s.src) + '" tabindex="0"><div class="z" style="background-image:url(\'' + esc(s.src) + '\')"></div><figcaption>' + esc(s.label || "") + "</figcaption></figure>";
        }).join("") + '</div><p class="d-note">Tap a photo to view it full screen.</p></div></section>' : "") +
      (m.gallery ? '<section class="d-sec"><div class="wrap"><h2>Full photo <em>gallery</em></h2><div class="tabs" id="dgTabs">' +
        '<button class="tab on" data-gk="exterior">Exterior (' + m.gallery.exterior.length + ')</button><button class="tab" data-gk="interior">Interior (' + m.gallery.interior.length + ')</button></div>' +
        '<div class="gal-grid" id="dgGrid"></div><div class="gal-more"><button class="btn btn-ghost" id="dgMore"></button></div></div></section>' : "") +
      '<section class="d-sec"><div class="wrap"><h2>Colours &amp; <em>look</em></h2><div class="col-detail"><div class="d-img glass" id="dStage">' + imgHTML(colImg(m, m.colors[0]), m.name) + '</div>' +
      '<div><p class="d-cname" id="dCname">' + esc(m.colors[0].name) + '</p><p class="d-note" style="margin:0 0 14px">' + m.colors.length + ' colours available. Tap one to preview.</p><div class="d-swatches big" id="dSw">' +
      m.colors.map(function (c, i) { return '<button class="sw' + (i === 0 ? " on" : "") + '" data-dc="' + i + '" style="background:' + swBG(c) + '" aria-label="' + esc(c.name) + '" title="' + esc(c.name) + '"></button>'; }).join("") +
      '</div></div></div></div></section>' +
      '<section class="d-cta-end"><div class="wrap"><h2>Ready to drive the <em>' + esc(m.name) + '</em>?</h2><div class="d-cta" style="justify-content:center"><button class="btn btn-red" data-model="' + m.id + '" data-purpose="Test Drive">Book a Test Drive</button>' +
      '<button class="btn btn-ghost" data-dclose>Back to all models</button></div></div></section>';
  }
  function showDetail(id, push) {
    var m = byId(id); if (!m) return;
    detail.innerHTML = detailHTML(m); detail.scrollTop = 0; initSlides(detail);
    gState.m = m; gState.k = "exterior"; gState.all = false; if (m.gallery) renderGal();
    detail.classList.add("on"); detail.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock"); detailOpen = true;
    if (push && location.hash !== "#car-" + id) history.pushState(null, "", "#car-" + id);
    clearTimeout(detailTimer);
    if (S.detailPopup) detailTimer = setTimeout(function () { if (detailOpen && !modal.classList.contains("on")) openModal({ model: id }); }, S.detailPopupDelayMs);
    var b = $(".d-back", detail); if (b) b.focus();
  }
  function hideDetail(fromHash) {
    if (!detailOpen) return;
    clearTimeout(detailTimer);
    detail.classList.remove("on"); detail.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lock"); detailOpen = false;
    if (!fromHash && /^#car-/.test(location.hash)) history.replaceState(null, "", location.pathname + location.search);
  }
  function syncHash() {
    var h = location.hash.match(/^#car-(\w+)$/);
    if (h && byId(h[1])) showDetail(h[1], false); else hideDetail(true);
  }
  window.addEventListener("hashchange", syncHash);
  $("#modelCards").addEventListener("click", function (e) { var p = e.target.closest(".panel"); if (p) showDetail(p.dataset.id, true); });
  initSlides(document);
  var lb = document.createElement("div"); lb.className = "lb"; lb.setAttribute("role", "dialog"); document.body.appendChild(lb);
  lb.addEventListener("click", function () { lb.classList.remove("on"); lb.innerHTML = ""; });
  function openTile(t) { var s = t.dataset.src; lb.innerHTML = ""; var i = document.createElement("img"); i.src = s; i.alt = ""; lb.appendChild(i); lb.classList.add("on"); }
  /* full gallery: tabs, show-more and a lightbox with previous / next */
  var gState = { m: null, k: "exterior", all: false, list: [], i: 0 }, G_FIRST = 12;
  function renderGal() {
    var grid = $("#dgGrid", detail); if (!grid || !gState.m) return;
    var list = gState.m.gallery[gState.k], shown = gState.all ? list : list.slice(0, G_FIRST);
    gState.list = list;
    grid.innerHTML = shown.map(function (p, i) { return '<button class="gthumb" data-gi="' + i + '" aria-label="' + esc(p.label) + '"><img loading="lazy" src="' + esc(p.src) + '" alt="' + esc(p.label) + '"><span>' + esc(p.label) + "</span></button>"; }).join("");
    var more = $("#dgMore", detail); more.hidden = list.length <= G_FIRST;
    more.textContent = gState.all ? "Show fewer photos" : "Show all " + list.length + " photos";
  }
  function lbShow(i) {
    var L = gState.list; if (!L.length) return; gState.i = (i + L.length) % L.length; var p = L[gState.i];
    lb.innerHTML = '<button class="lb-nav prev" aria-label="Previous photo">‹</button><img src="' + esc(p.src) + '" alt="' + esc(p.label) + '"><button class="lb-nav next" aria-label="Next photo">›</button><div class="lb-cap">' + esc(p.label) + " · " + (gState.i + 1) + " / " + L.length + "</div>";
    lb.classList.add("on");
  }
  lb.addEventListener("click", function (e) {
    if (e.target.closest(".prev")) { e.stopImmediatePropagation(); lbShow(gState.i - 1); }
    else if (e.target.closest(".next")) { e.stopImmediatePropagation(); lbShow(gState.i + 1); }
  }, true);
  document.addEventListener("keydown", function (e) { if (!lb.classList.contains("on") || !lb.querySelector(".lb-nav")) return; if (e.key === "ArrowRight") lbShow(gState.i + 1); if (e.key === "ArrowLeft") lbShow(gState.i - 1); });
  detail.addEventListener("click", function (e) {
    var t = e.target.closest("[data-gk]"), g = e.target.closest(".gthumb"), mo = e.target.closest("#dgMore"), c = e.target.closest("[data-dc]");
    if (t) { $$("#dgTabs .tab", detail).forEach(function (x) { x.classList.toggle("on", x === t); }); gState.k = t.dataset.gk; gState.all = false; renderGal(); }
    if (mo) { gState.all = !gState.all; renderGal(); }
    if (g) { gState.list = gState.m.gallery[gState.k]; lbShow(+g.dataset.gi); }
    if (c && gState.m) {
      var col = gState.m.colors[+c.dataset.dc];
      $$("#dSw .sw", detail).forEach(function (x) { x.classList.toggle("on", x === c); });
      $("#dCname", detail).textContent = col.name;
      var st = $("#dStage", detail); st.innerHTML = ""; st.appendChild(img(colImg(gState.m, col), col.name, gState.m.name + " " + col.name));
    }
  });
  detail.addEventListener("click", function (e) { var t = e.target.closest(".tile"); if (t) openTile(t); });
  detail.addEventListener("keydown", function (e) { if (e.key === "Enter" && e.target.classList.contains("tile")) openTile(e.target); });
  detail.addEventListener("click", function (e) { if (e.target.closest("[data-dclose]")) { hideDetail(false); var s = $("#models"); if (s) s.scrollIntoView(); } });

  /* ---------- variants ---------- */
  var curVar = MODELS[0].id;
  function renderVariants() {
    $("#variantTabs").innerHTML = MODELS.map(function (m) {
      return '<button class="tab' + (m.id === curVar ? " on" : "") + '" role="tab" aria-selected="' + (m.id === curVar) + '" data-v="' + m.id + '">' + esc(m.name) + "</button>";
    }).join("");
    var m = byId(curVar);
    var vv = $("#varVisual"); vv.classList.toggle("photo", !!m.photo);
    vv.innerHTML = m.photo ? '<div class="vz" style="background-image:url(\x27' + esc(m.photo) + '\x27)"></div><div class="vt"><h3>' + esc(m.name) + "</h3><p>" + priceRange(m) + "</p></div>"
      : imgHTML(m.image, m.name) + "<h3>" + esc(m.name) + "</h3><p>" + priceRange(m) + "</p>";
    $("#varTable").innerHTML = '<div class="vrow h"><span>Variant</span><span>Engine</span><span>Gearbox</span><span>Price</span><span></span></div>' +
      m.variants.map(function (v, i) {
        return '<div class="vrow"><b>' + esc(v.trim) + "</b><span>" + esc(v.engine) + "</span><span>" + esc(v.gearbox) + '</span><span class="p">' +
          (v.price ? "From " + lakh(v.price) : "Ask for price") + '</span><button class="btn btn-red" data-model="' + m.id + '" data-variant="' + esc(v.trim) + '">Enquire</button></div>';
      }).join("");
  }
  $("#variantTabs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-v]"); if (b) { curVar = b.dataset.v; renderVariants(); }
  });
  renderVariants();

  /* ---------- colours ---------- */
  var colModel = MODELS[0].id, colIdx = 0;
  function renderColours() {
    var m = byId(colModel), c = m.colors[colIdx] || m.colors[0];
    $("#colModel").innerHTML = MODELS.map(function (x) { return '<button class="tab' + (x.id === colModel ? " on" : "") + '" data-cm="' + x.id + '">' + esc(x.name) + "</button>"; }).join("");
    $("#swatches").innerHTML = m.colors.map(function (k, i) {
      return '<button class="sw' + (i === colIdx ? " on" : "") + '" data-ci="' + i + '" style="background:' + swBG(k) + '" aria-label="' + esc(k.name) + '" title="' + esc(k.name) + '"></button>';
    }).join("");
    $("#colName").textContent = m.name + " in " + c.name;
    var st = $("#colStage"); st.style.setProperty("--tint", c.hex); st.innerHTML = "";
    st.appendChild(img(colImg(m, c), c.name, m.name + " " + c.name));
  }
  $("#colours").addEventListener("click", function (e) {
    var a = e.target.closest("[data-cm]"), b = e.target.closest("[data-ci]");
    if (a) { colModel = a.dataset.cm; colIdx = 0; renderColours(); }
    if (b) { colIdx = +b.dataset.ci; renderColours(); }
  });
  renderColours();

  /* ---------- offers ---------- */
  $("#offerCards").innerHTML = window.OFFERS.map(function (o) {
    return '<div class="offer glass reveal"><h3>' + esc(o.title) + "</h3><p>" + esc(o.text) + "</p>" +
      (o.ends ? '<div class="cd" data-end="' + esc(o.ends) + '"></div>' : "") +
      '<button class="btn btn-red sm" data-enquire data-purpose="On-Road Price">Claim this offer</button></div>';
  }).join("");
  function tick() {
    $$(".cd").forEach(function (el) {
      var d = new Date(el.dataset.end + "T23:59:59+05:30") - Date.now();
      if (d <= 0) { el.textContent = "Offer ended"; return; }
      el.textContent = "Ends in " + Math.floor(d / 864e5) + "d " + Math.floor(d % 864e5 / 36e5) + "h " + Math.floor(d % 36e5 / 6e4) + "m";
    });
  }
  tick(); setInterval(tick, 30000);

  /* ---------- EMI ---------- */
  var opts = MODELS.map(function (m) { return '<option value="' + m.id + '">' + esc(m.name) + "</option>"; }).join("");
  $("#emiModel").innerHTML = opts;
  function emi() {
    var price = +$("#emiPrice").value || 0, dp = +$("#emiDown").value, yrs = +$("#emiTen").value, rate = +$("#emiRate").value;
    var down = price * dp / 100, loan = price - down, n = yrs * 12, r = rate / 1200;
    var e = loan > 0 ? loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : 0;
    $("#emiDownOut").textContent = dp + "% (" + inr(down) + ")";
    $("#emiTenOut").textContent = yrs + (yrs > 1 ? " years" : " year");
    $("#emiRateOut").textContent = rate + "%";
    $("#emiOut").textContent = inr(e);
    $("#emiSub").textContent = "Loan " + inr(loan) + " · Total interest " + inr(e * n - loan);
    $("#emiWa").href = wa("Hi Vignesh Nissan, I checked EMI for " + byId($("#emiModel").value).name + " (" + inr(price) + "): down payment " + dp + "%, " + yrs + " yrs @ " + rate + "% = " + inr(e) + "/month. Please share the best finance options.");
  }
  function emiModelChange() { $("#emiPrice").value = byId($("#emiModel").value).from; emi(); }
  $("#emiModel").addEventListener("change", emiModelChange);
  $$("#emi input").forEach(function (i) { i.addEventListener("input", emi); });
  emiModelChange();

  /* ---------- compare ---------- */
  /* ---------- compare: every active model side by side ---------- */
  function claim(m, re) { var c = m.claims.filter(function (x) { return re.test(x[0]); })[0]; return c ? c[1] : "–"; }
  function uniq(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }
  function compare() {
    var n = MODELS.length, T = $("#cmpTable");
    var rows = [
      ["Type", function (m) { return m.type; }],
      ["Ex-showroom", priceRange],
      ["Variants", function (m) { return m.variants.length + " trims"; }],
      ["Colours", function (m) { return m.colors.length + " colours"; }],
      ["Engine", function (m) { return uniq(m.engines.map(function (e) { return e.name; })).join(", ") || "–"; }],
      ["Gearbox", function (m) { return uniq(m.engines.map(function (e) { return e.gearbox; })).join(" / ") || "–"; }],
      ["Claimed mileage", function (m) { return claim(m, /mileage/i); }],
      ["Max power", function (m) { return claim(m, /power/i); }],
      ["Max torque", function (m) { return claim(m, /torque/i); }],
      ["Boot space", function (m) { return claim(m, /boot/i); }],
      ["Ground clearance", function (m) { return claim(m, /ground/i); }],
      ["Airbags", function (m) { return claim(m, /airbag/i); }]
    ];
    var cols = "grid-template-columns:150px repeat(" + n + ",minmax(0,1fr));min-width:" + (150 + n * 210) + "px";
    T.innerHTML = '<div class="cmp-scroll"><div class="cmp-grid" style="' + cols + '">' +
      '<div class="ch"></div>' + MODELS.map(function (m) {
        return '<div class="ch car"><div class="cimg">' + imgHTML(m.image, m.name) + "</div><b>" + esc(m.name) + "</b>" + (m.badge ? "<em>" + esc(m.badge) + "</em>" : "") + "</div>";
      }).join("") +
      rows.map(function (r) {
        return '<div class="cl">' + r[0] + "</div>" + MODELS.map(function (m) { return '<div class="cv">' + esc(r[1](m)) + "</div>"; }).join("");
      }).join("") +
      '<div class="cl"></div>' + MODELS.map(function (m) {
        return '<div class="cv"><button class="btn btn-red sm" data-model="' + m.id + '">Enquire ' + esc(m.name) + '</button><button class="cmp-more" data-seecar="' + m.id + '">View details →</button></div>';
      }).join("") + "</div></div>";
  }
  compare();
  $("#compare").addEventListener("click", function (e) { var s = e.target.closest("[data-seecar]"); if (s) showDetail(s.dataset.seecar, true); });

  /* ---------- testimonials ---------- */
  $("#testis").innerHTML = window.TESTIMONIALS.map(function (t) {
    return '<div class="testi glass reveal"><div class="stars">★★★★★</div><p>“' + esc(t.text) + '”</p><div class="who"><div class="av">' +
      imgHTML(t.photo, t.name).replace('<img ', '<img style="display:block" ') + "</div><div><b>" + esc(t.name) + "</b><small>" + esc(t.car) + " owner</small></div></div></div>";
  }).join("");
  $$(".testi .av").forEach(function (av, i) {   // show initial if photo missing
    var im = av.querySelector("img"); if (!im) return;
    im.addEventListener("error", function () { av.textContent = window.TESTIMONIALS[i].name.charAt(0); });
  });

  /* ---------- enquiry modal ---------- */
  var modal = $("#modal"), form = $("#enqForm"), fModel = $("#fModel"), fVar = $("#fVariant"), lastFocus = null, autoDone = false;
  fModel.innerHTML = opts;
  function fillVariants(sel) {
    var m = byId(fModel.value);
    fVar.innerHTML = '<option value="">Any variant</option>' + m.variants.map(function (v) { return '<option>' + esc(v.trim) + "</option>"; }).join("");
    if (sel) fVar.value = sel;
  }
  fModel.addEventListener("change", function () { fillVariants(); });
  function openModal(o) {
    o = o || {};
    if (o.model && byId(o.model)) fModel.value = o.model;
    fillVariants(o.variant);
    if (o.purpose) $$('input[name=purpose]', form).forEach(function (r) { r.checked = r.value === o.purpose; });
    $("#mTitle").textContent = o.purpose === "On-Road Price" ? "Get Your On-Road Price" : "Book Your Test Drive";
    $("#fErr").textContent = "";
    lastFocus = document.activeElement;
    modal.classList.add("on"); modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(function () { form.name.focus(); }, 250);
  }
  function closeModal() {
    modal.classList.remove("on"); modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = detailOpen ? "hidden" : "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  modal.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) closeModal(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (modal.classList.contains("on")) closeModal(); else if (detailOpen) hideDetail(false); lb.classList.remove("on"); }
    if (e.key === "Tab" && modal.classList.contains("on")) {
      var f = $$("button,input,select", form).filter(function (x) { return x.offsetParent !== null && x.type !== "radio" || x.checked; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // Any "select model" action re-opens the popup with that model chosen.
  document.addEventListener("click", function (e) {
    var v = e.target.closest("[data-variants]");
    if (v) { curVar = v.dataset.variants; renderVariants(); $("#variants").scrollIntoView(); return; }
    var t = e.target.closest("[data-model],[data-enquire]");
    if (t) openModal({ model: t.dataset.model, variant: t.dataset.variant, purpose: t.dataset.purpose });
  });
  // Auto popup on load (once); cancelling keeps it closed until a model is selected.
  setTimeout(function () { if (!autoDone && !modal.classList.contains("on")) { autoDone = true; openModal({}); } }, S.popupDelayMs);

  function sendLead(payload, subject, waText, num) {
    var w = window.open(wa(waText, num), "_blank");           // synchronous: avoids popup blocking
    if (!w) location.href = wa(waText, num);
    if (S.web3formsKey) {
      payload.access_key = S.web3formsKey; payload.subject = subject;
      fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) }).catch(function () {});
    }
  }
  var validPhone = function (p) { return /^[6-9]\d{9}$/.test(p); };
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.name.value.trim(), phone = form.phone.value.trim(), err = $("#fErr");
    if (name.length < 2) { err.textContent = "Please enter your name."; form.name.focus(); return; }
    if (!validPhone(phone)) { err.textContent = "Enter a valid 10-digit Indian mobile number."; form.phone.focus(); return; }
    var m = byId(fModel.value), variant = fVar.value, purpose = form.purpose.value;
    var text = "Hi Vignesh Nissan, I'm " + name + " (" + phone + "). I'd like a " + purpose + " for the Nissan " + m.name + (variant ? " " + variant : "") + ".";
    sendLead({ name: name, phone: phone, model: m.name, variant: variant, purpose: purpose }, "New enquiry: " + m.name + " – " + purpose, text);
    form.reset(); closeModal(); toast("Thanks " + name.split(" ")[0] + "! We'll contact you shortly.");
  });
  var sf = $("#svcForm");
  sf.addEventListener("submit", function (e) {
    e.preventDefault();
    var n = sf.name.value.trim(), p = sf.phone.value.trim();
    if (n.length < 2 || !validPhone(p)) { toast("Please enter your name and a valid 10-digit mobile."); return; }
    var text = "Hi Vignesh Nissan, I'm " + n + " (" + p + "). Service request: " + sf.type.value + (sf.reg.value ? " for " + sf.reg.value.trim() : "") + ".";
    sendLead({ name: n, phone: p, vehicle: sf.reg.value, service: sf.type.value }, "Service request", text, S.serviceWhatsapp);
    sf.reset(); toast("Service request sent. We'll confirm your slot.");
  });

  /* ---------- hero video: play, pause, sound ---------- */
  var hv = $("#heroVideo"), sb = $("#soundBtn") || { hidden: true, addEventListener: function () {} }, pb = $("#playBtn"), userPaused = false;
  var lastSrc = $$("source", hv).pop();
  // hide the video only if every source failed (a failed WebM must not hide the MP4 fallback)
  if (lastSrc) lastSrc.addEventListener("error", function () { hv.style.display = "none"; if (pb) pb.hidden = true; });
  hv.muted = true; hv.defaultMuted = true; hv.setAttribute("muted", "");
  function tryPlay() { var p = hv.play(); if (p && p.catch) p.catch(function () { /* autoplay blocked: retry on first touch */ }); }
  function syncBtns() { if (pb) { pb.textContent = hv.paused ? "▶" : "⏸"; pb.setAttribute("aria-label", hv.paused ? "Play video" : "Pause video"); } }
  hv.addEventListener("playing", function () { sb.hidden = false; if (pb) pb.hidden = false; syncBtns(); });
  hv.addEventListener("pause", syncBtns);
  if (!hv.paused && hv.readyState > 2) { sb.hidden = false; if (pb) pb.hidden = false; syncBtns(); }   // already playing before this script ran
  sb.addEventListener("click", function () { hv.muted = !hv.muted; sb.textContent = hv.muted ? "🔇" : "🔊"; });
  if (pb) pb.addEventListener("click", function () { if (hv.paused) { userPaused = false; tryPlay(); } else { userPaused = true; hv.pause(); } });
  if (reduceMotion) { userPaused = true; hv.pause(); if (pb) pb.hidden = false; syncBtns(); }   // respect reduced-motion, but offer a Play button
  else {
    tryPlay();
    var kick = function () { if (hv.paused && !userPaused) tryPlay(); };
    ["pointerdown", "keydown", "scroll", "touchstart"].forEach(function (ev) { window.addEventListener(ev, kick, { once: true, passive: true }); });
    document.addEventListener("visibilitychange", function () { if (!document.hidden) kick(); });
  }

  syncHash();

  /* ---------- reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { threshold: .12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); }
})();

/* hero stats count-up */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  Array.prototype.forEach.call(document.querySelectorAll("[data-count]"), function (el) {
    var to = +el.dataset.count, t0 = performance.now() + 1500;
    el.textContent = "0";
    (function step(t) {
      var p = Math.max(0, Math.min(1, (t - t0) / 1100));
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  });
})();

/* Always open on the hero. A leftover #hash or the browser's saved scroll position used to land visitors mid-page. */
(function () {
  var isCar = function () { return /^#car-/.test(location.hash); };
  var top = function () { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); };
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!isCar()) { if (location.hash) history.replaceState(null, "", location.pathname + location.search); top(); }
  window.addEventListener("pageshow", function (e) { if (e.persisted && !isCar()) top(); });
  // in-page menu links scroll smoothly and leave no #hash in the address bar
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a) return;
    var id = a.getAttribute("href"); if (id === "#" || /^#car-/.test(id)) return;
    var t = document.querySelector(id); if (!t) return;
    e.preventDefault(); t.scrollIntoView({ behavior: "smooth" });
  });
})();
