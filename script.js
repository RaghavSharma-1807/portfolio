/* Edit these to make the page yours. */
var CONFIG = {
  brand: "Canvas & Ink",
  email: "your-email@example.com",   /* replace with your email; the Email button stays hidden until you do */
  whatsapp: "+91 8951378113",
  instagram: "_.sneha.__.sharma"
};

var WORKS = [
  { id: "cottage",  file: "cottage.jpg",  w: 816, h: 824, kind: "painting", title: "Cottage by the Sea",    medium: "Acrylic on canvas", alt: "Painting of a cream stone cottage with a blue tiled roof, pink hydrangeas, gulls and the sea behind." },
  { id: "peacock",  file: "peacock.jpg",  w: 844, h: 700, kind: "painting", title: "Peacock Mandala",       medium: "Acrylic and dot work on canvas", alt: "Peacock perched on a branch inside a yellow circle, framed by a blue dot-work mandala on a deep blue ground." },
  { id: "roots",    file: "roots.jpg",    w: 963, h: 698, kind: "drawing",  title: "Roots",                 medium: "Ink on paper", alt: "Black ink drawing of an upside-down face with mandala circles, patterned leaves and flowing roots." },
  { id: "coupe",    file: "coupe.jpg",    w: 477, h: 629, kind: "painting", title: "Blue Coupe", medium: "Painting on canvas", alt: "A blue sports sedan on a winding road through green hills under a blue sky." },
  { id: "sunset",   file: "sunset.jpg",   w: 497, h: 484, kind: "painting", title: "Sunset Tree",           medium: "Acrylic on miniature canvas", alt: "Black silhouette of a tree against an orange sunset reflected on still water." },
  { id: "flamingo", file: "flamingo.jpg", w: 452, h: 548, kind: "painting", title: "Flamingo",              medium: "Acrylic on canvas", alt: "Pink flamingo with a curved neck against a dark charcoal background." },
  { id: "bloom",    file: "bloom.jpg",    w: 780, h: 1025, kind: "drawing", title: "Bloom and Bone",        medium: "Ink and graphite on paper", alt: "Ink and pencil drawing of a skull, one half covered in roses, flowers and vines." }
];

function $(id) { return document.getElementById(id); }
function pad(n) { return (n < 10 ? "0" : "") + n; }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
function idx(id) { for (var i = 0; i < WORKS.length; i++) if (WORKS[i].id === id) return i; return 0; }

/* Brand + footer */
$("brand").innerHTML = esc(CONFIG.brand).replace("&amp;", "<i>&amp;</i>");
$("foot").textContent = "© 2026 " + CONFIG.brand + ". All artworks are originals.";

/* Featured work */
(function () {
  var w = WORKS[idx("peacock")];
  $("feature").innerHTML =
    '<div class="mat"><button type="button" data-open="' + w.id + '" aria-label="View ' + esc(w.title) + ' larger">' +
    '<img src="' + w.file + '" width="' + w.w + '" height="' + w.h + '" alt="' + esc(w.alt) + '"></button></div>' +
    '<figcaption class="label"><h3>' + esc(w.title) + '</h3><p class="mono">' + esc(w.medium) + '</p></figcaption>';
})();

/* Gallery */
var filter = "all";
function renderGallery() {
  var html = "";
  WORKS.forEach(function (w, i) {
    html +=
      '<figure class="piece" data-kind="' + w.kind + '" data-id="' + w.id + '">' +
      '<div class="mat"><button type="button" data-open="' + w.id + '" aria-label="View ' + esc(w.title) + ' larger">' +
      '<img loading="lazy" src="' + w.file + '" width="' + w.w + '" height="' + w.h + '" alt="' + esc(w.alt) + '"></button></div>' +
      '<figcaption><div class="label"><h3>' + esc(w.title) + '</h3><span class="mono">No. ' + pad(i + 1) + '</span></div>' +
      '<p class="meta">' + esc(w.medium) + ' · Size and price on request</p>' +
      '<button class="btn small" type="button" data-enq="' + w.id + '">Enquire</button></figcaption></figure>';
  });
  /* Closing tile: fills the last cell so the grid ends on a full row */
  html += '<div class="ask"><div><p class="mono">Commissions</p><h3>Want a piece made for you?</h3>' +
    '<p>Tell me the subject, size and colours you have in mind.</p></div>' +
    '<button class="btn small solid" type="button" data-enq="">Ask about a commission</button></div>';
  $("hang").innerHTML = html;
}
function renderFilters() {
  var counts = { all: WORKS.length, painting: 0, drawing: 0 };
  WORKS.forEach(function (w) { counts[w.kind]++; });
  var defs = [["all", "All"], ["painting", "Paintings"], ["drawing", "Drawings"]];
  $("filters").innerHTML = defs.map(function (d) {
    return '<button class="chip" type="button" data-filter="' + d[0] + '" aria-pressed="' + (filter === d[0]) + '">' + d[1] + '<span>' + counts[d[0]] + '</span></button>';
  }).join("");
}
function applyFilter() {
  var items = document.querySelectorAll("#hang .piece");
  for (var i = 0; i < items.length; i++) items[i].hidden = !(filter === "all" || items[i].getAttribute("data-kind") === filter);
  renderFilters();
}
renderGallery();
renderFilters();

/* Enquiry form */
function buildMsg(w) {
  if (!w) return "Hello, I found your work online and have a question. My name is ____ and I am writing from ____.";
  return 'Hello, I would like to buy "' + w.title + '" (' + w.medium + '). Could you share the price, the size and the delivery options? My name is ____ and I am in ____.';
}
(function () {
  var opts = '<option value="">General question</option>';
  WORKS.forEach(function (w, i) { opts += '<option value="' + w.id + '">No. ' + pad(i + 1) + ' — ' + esc(w.title) + '</option>'; });
  $("piece").innerHTML = opts;
  $("msg").value = buildMsg(null);
})();
function selectPiece(id) {
  $("piece").value = id || "";
  $("msg").value = buildMsg(id ? WORKS[idx(id)] : null);
  updateSend();
}
$("piece").addEventListener("change", function () { selectPiece(this.value); });
$("msg").addEventListener("input", function () { updateSend(); });

/* Send buttons: open WhatsApp, the email app or an Instagram chat with the message filled in */
var hasEmail = CONFIG.email && CONFIG.email.indexOf("example.com") < 0 && CONFIG.email.indexOf("@") > 0;
var waNumber = String(CONFIG.whatsapp || "").replace(/\D/g, "");
var hasWa = waNumber.length >= 10 && !/^(\d)\1+$/.test(waNumber.slice(-10)) && waNumber.slice(-10) !== "0000000000";
var igUser = String(CONFIG.instagram || "").replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "");
var hasIg = igUser && igUser !== "your.handle";

(function () {
  var html = "";
  if (hasWa) html += '<a class="btn solid" id="sendWa" target="_blank" rel="noopener" href="#">Send on WhatsApp</a>';
  if (hasEmail) html += '<a class="btn" id="sendMail" href="#">Send by email</a>';
  if (hasIg) html += '<a class="btn" id="sendIg" target="_blank" rel="noopener" href="#">Message on Instagram</a>';
  $("send").innerHTML = html;
  if (!html) $("sendWrap").hidden = true;
})();
function updateSend() {
  var text = $("msg").value;
  var sel = $("piece").value;
  var subject = sel ? "Enquiry: " + WORKS[idx(sel)].title : "Question about your artwork";
  if ($("sendWa")) $("sendWa").href = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(text);
  if ($("sendMail")) $("sendMail").href = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text);
  if ($("sendIg")) $("sendIg").href = "https://ig.me/m/" + encodeURIComponent(igUser);
}
updateSend();
/* Instagram cannot take a prefilled message, so copy it first and paste it in the chat */
if ($("sendIg")) $("sendIg").addEventListener("click", function () {
  try { navigator.clipboard.writeText($("msg").value); } catch (e) {}
  $("copyHint").textContent = "Message copied. Paste it into the Instagram chat.";
});

/* Contact rows with copy buttons */
(function () {
  var rows = [];
  if (hasEmail) rows.push(["Email", CONFIG.email]);
  if (hasWa) rows.push(["WhatsApp", CONFIG.whatsapp]);
  if (hasIg) rows.push(["Instagram", "@" + igUser]);
  $("contacts").innerHTML = rows.map(function (r, i) {
    return '<div class="contact"><span class="mono">' + r[0] + '</span><span class="val" id="val' + i + '">' + esc(r[1]) + '</span>' +
      '<button class="btn small" type="button" data-copy="val' + i + '">Copy</button></div>';
  }).join("");
})();

/* Copy helper */
function flash(btn, text) {
  var old = btn.getAttribute("data-label") || btn.textContent;
  btn.setAttribute("data-label", old);
  btn.textContent = text;
  clearTimeout(btn._t);
  btn._t = setTimeout(function () { btn.textContent = old; }, 1600);
}
function copyFrom(el, btn) {
  var text = el.value !== undefined ? el.value : el.textContent;
  function fallback() {
    try {
      if (el.select) { el.focus(); el.select(); }
      else { var r = document.createRange(); r.selectNodeContents(el); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); }
    } catch (e) {}
    flash(btn, "Press Ctrl+C");
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () { flash(btn, "Copied"); }, fallback);
  } else { fallback(); }
}
$("copyMsg").addEventListener("click", function () { copyFrom($("msg"), this); });

/* Lightbox */
var lbList = [], lbPos = 0, lastFocus = null;
function visibleList() {
  var ids = [], els = document.querySelectorAll("#hang .piece");
  for (var i = 0; i < els.length; i++) if (!els[i].hidden) ids.push(els[i].getAttribute("data-id"));
  return ids;
}
function showLb() {
  var w = WORKS[idx(lbList[lbPos])];
  $("lbImg").src = w.file;
  $("lbImg").alt = w.alt;
  $("lbTitle").textContent = w.title;
  $("lbSub").textContent = w.medium + " · Size and price on request";
  $("lbCount").textContent = "No. " + pad(idx(w.id) + 1) + " of " + pad(WORKS.length);
  var single = lbList.length < 2;
  $("lbPrev").hidden = single; $("lbNext").hidden = single;
}
function openLb(id) {
  lbList = visibleList();
  if (lbList.indexOf(id) < 0) lbList = WORKS.map(function (w) { return w.id; });
  lbPos = lbList.indexOf(id);
  lastFocus = document.activeElement;
  showLb();
  $("lb").hidden = false;
  document.body.style.overflow = "hidden";
  $("lbClose").focus();
}
function closeLb() {
  $("lb").hidden = true;
  document.body.style.overflow = "";
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
function step(d) { lbPos = (lbPos + d + lbList.length) % lbList.length; showLb(); }
function goEnquire(id) {
  selectPiece(id);
  var t = $("buy");
  t.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}
$("lbClose").addEventListener("click", closeLb);
$("lbPrev").addEventListener("click", function () { step(-1); });
$("lbNext").addEventListener("click", function () { step(1); });
$("lbEnq").addEventListener("click", function () { var id = lbList[lbPos]; closeLb(); goEnquire(id); });
$("lb").addEventListener("click", function (e) { if (e.target === this || e.target.classList.contains("lb-stage")) closeLb(); });
document.addEventListener("keydown", function (e) {
  if ($("lb").hidden) return;
  if (e.key === "Escape") closeLb();
  else if (e.key === "ArrowLeft" && lbList.length > 1) step(-1);
  else if (e.key === "ArrowRight" && lbList.length > 1) step(1);
});

/* One delegated click handler for the page */
document.addEventListener("click", function (e) {
  var t = e.target.closest("[data-open],[data-enq],[data-filter],[data-copy]");
  if (!t) return;
  if (t.hasAttribute("data-open")) openLb(t.getAttribute("data-open"));
  else if (t.hasAttribute("data-enq")) goEnquire(t.getAttribute("data-enq"));
  else if (t.hasAttribute("data-filter")) { filter = t.getAttribute("data-filter"); applyFilter(); }
  else if (t.hasAttribute("data-copy")) copyFrom($(t.getAttribute("data-copy")), t);
});
