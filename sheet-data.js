// sheet-data.js — live database uit Google Sheets.
// Haalt de activiteiten rechtstreeks uit de gedeelde Google Sheet, zodat
// niet-technische redacteuren de Sheet kunnen bijwerken zonder de app opnieuw
// te publiceren. Werkt samen met ideas.js: dat blijft het vangnet als de
// Sheet onbereikbaar is.
//
// Volgorde van bronnen (vers → val terug):
//   1. Live Google Sheet (deze fetch)
//   2. localStorage-cache (laatst succesvol opgehaald)
//   3. Gebundelde ideas.js (offline vangnet)
//
// kiesIdee() (uit ideas.js) leest window.IDEEEN live, dus zodra we die array
// vervangen, gebruikt de generator meteen de nieuwe activiteiten.

(function () {
  var SHEET_ID = "15FjLd3Oo4RNIblMhK_uYh4jaRrYXu2soSnRtz-Z3xSI";
  var CSV_URL =
    "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/export?format=csv&gid=0";
  var CACHE_KEY = "verveel_activiteiten_v1";

  var CATS = ["creatief", "beweeg", "denk", "ontdek", "muziek", "koken", "samen"];
  var VOC = {
    leeftijd: ["4-7", "7-10", "10-12"],
    duur: ["kort", "midden", "lang"],
    plek: ["binnen", "buiten"],
    sociaal: ["alleen", "samen"],
  };

  // ── CSV-parser (quotes + komma's, identiek aan de Beheer-tool) ──
  function parseDelimited(text) {
    var rows = [], row = [], cur = "", q = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (q) {
        if (ch === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; }
        else cur += ch;
      } else {
        if (ch === '"') q = true;
        else if (ch === ",") { row.push(cur); cur = ""; }
        else if (ch === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
        else if (ch === "\r") { /* skip */ }
        else cur += ch;
      }
    }
    if (cur.length || row.length) { row.push(cur); rows.push(row); }
    return rows;
  }

  function splitMany(s) {
    return (s || "").split(/[,;]/).map(function (x) { return x.trim(); }).filter(Boolean);
  }

  // ── CSV → activiteiten in het IDEEEN-schema ──
  function parseActiviteiten(csv) {
    csv = csv.replace(/^\uFEFF/, "").trim();
    var raw = parseDelimited(csv).filter(function (r) {
      return r.some(function (c) { return c.trim() !== ""; });
    });
    if (raw.length < 2) return [];
    var header = raw[0].map(function (h) { return h.trim().toLowerCase(); });
    var col = {};
    ["titel", "uitleg", "categorie", "leeftijd", "duur", "plek", "sociaal", "spullen"]
      .forEach(function (f) { col[f] = header.indexOf(f); });
    if (col.titel < 0 || col.categorie < 0) return []; // verkeerde kop → ongeldig

    var items = [], id = 0;
    raw.slice(1).forEach(function (cells) {
      var get = function (f) { return col[f] >= 0 ? (cells[col[f]] || "").trim() : ""; };
      var titel = get("titel");
      var cat = get("categorie").toLowerCase();
      if (!titel || !get("uitleg") || CATS.indexOf(cat) < 0) return; // sla onvolledige rij over
      var obj = {
        id: ++id,
        titel: titel,
        uitleg: get("uitleg"),
        categorie: cat,
        leeftijd: splitMany(get("leeftijd").toLowerCase()).filter(function (v) { return VOC.leeftijd.indexOf(v) >= 0; }),
        duur: splitMany(get("duur").toLowerCase()).filter(function (v) { return VOC.duur.indexOf(v) >= 0; }),
        plek: splitMany(get("plek").toLowerCase()).filter(function (v) { return VOC.plek.indexOf(v) >= 0; }),
        sociaal: splitMany(get("sociaal").toLowerCase()).filter(function (v) { return VOC.sociaal.indexOf(v) >= 0; }),
        spullen: splitMany(get("spullen")),
      };
      // alleen geldige, volledig gefilterde rijen
      if (obj.leeftijd.length && obj.duur.length && obj.plek.length && obj.sociaal.length) items.push(obj);
    });
    return items;
  }

  function apply(items, bron) {
    if (items && items.length) {
      window.IDEEEN = items;
      window.__ideenBron = bron;
      window.dispatchEvent(new CustomEvent("ideeen-bijgewerkt", { detail: { aantal: items.length, bron: bron } }));
      console.log("[verveel] " + items.length + " activiteiten geladen (" + bron + ")");
    }
  }

  // 1. Cache meteen toepassen (verser dan gebundelde ideas.js)
  try {
    var cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (cached && cached.length) apply(cached, "cache");
  } catch (e) {}

  // 2. Live ophalen
  fetch(CSV_URL, { cache: "no-store" })
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
    .then(function (csv) {
      var items = parseActiviteiten(csv);
      if (!items.length) throw new Error("Sheet leeg of ongeldig");
      apply(items, "live");
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(items)); } catch (e) {}
    })
    .catch(function (err) {
      console.warn("[verveel] Live Sheet niet geladen, vangnet actief:", err.message);
    });
})();
