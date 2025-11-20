// pages/homepage.js – mobilní úpravy homepage DarkElfa
(function () {
  console.log("DE Mobile: homepage.js běží na", location.href);

  // jen si označíme, že máme mobilní režim
  document.body.classList.add("de-mobile-home");

  // --- 1) Schovat reklamy --------------------------------------------------
  // Cíl: "zde může být vaše reklama" + spodní bannerový pruh

  // skryjeme bloky, které obsahují text "zde může být vaše reklama"
  var textNodes = document.querySelectorAll("td, div, span");
  Array.prototype.forEach.call(textNodes, function (el) {
    var t = (el.textContent || "").toLowerCase();
    if (t.indexOf("zde může být vaše reklama") !== -1) {
      el.style.display = "none";
    }
  });

  // spodní reklamní pás – typicky obsahuje spoustu log (poki, hry.cz apod.)
  // zkusíme schovat řádek/tabulku, kde je více odkazů s bannery
  var banners = document.querySelectorAll("img");
  Array.prototype.forEach.call(banners, function (img) {
    var src = (img.getAttribute("src") || "").toLowerCase();
    // velmi hrubý filtr: loga partnerů, bannerové obrázky atd.
    if (
      src.indexOf("banner") !== -1 ||
      src.indexOf("reklam") !== -1 ||
      src.indexOf("hry") !== -1 ||
      src.indexOf("poki") !== -1
    ) {
      var cell = img.closest("td, div");
      if (cell) {
        var row = cell.closest("tr");
        if (row) row.style.display = "none";
        else cell.style.display = "none";
      }
    }
  });

  // NIC dalšího neděláme:
  // - neměníme href žádného odkazu
  // - nepřidáváme nové tlačítko
  // - jen schováváme reklamy
})();
