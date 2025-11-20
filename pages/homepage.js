// pages/homepage.js – mobilní úpravy homepage DarkElfa
(function () {
  console.log("DE Mobile: homepage.js běží na", location.href);

  document.body.classList.add("de-mobile-home");

  // --- 1) Hlavní tlačítka (Vstoupit, Registrace, Úvodní příběh, Mapa světa, Nápověda) ---

  function markMainButton(link, fallbackLabel) {
    if (!link) return null;
    link.classList.add("de-mobile-main-btn");
    if (fallbackLabel && !link.textContent.trim()) {
      link.textContent = fallbackLabel;
    }
    return link;
  }

  function findLink(matchHrefContains, matchTextContains) {
    matchHrefContains = (matchHrefContains || "").toLowerCase();
    matchTextContains = (matchTextContains || "").toLowerCase();

    var links = document.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var href = (a.getAttribute("href") || "").toLowerCase();
      var text = (a.textContent || "").toLowerCase();

      if (matchHrefContains && href.indexOf(matchHrefContains) !== -1) {
        return a;
      }
      if (matchTextContains && text.indexOf(matchTextContains) !== -1) {
        return a;
      }
    }
    return null;
  }

  // Vstoupit – pošleme rovnou na výběr lig
  var btnVstoupit = document.createElement("a");
  btnVstoupit.href = "https://www.darkelf.cz/ligy.asp";
  btnVstoupit.textContent = "Vstoupit";
  btnVstoupit.className = "de-mobile-main-btn";

  // Najdeme prvek, kam to vložíme – vezmeme středovou oblast (tam kde jsou původní tlačítka)
  var centerContainer =
    document.querySelector("td[align='center']") ||
    document.body;

  // Vložíme naše tlačítko úplně nahoru do centra
  if (centerContainer && centerContainer.firstChild) {
    centerContainer.insertBefore(btnVstoupit, centerContainer.firstChild);
  } else if (centerContainer) {
    centerContainer.appendChild(btnVstoupit);
  }

  // Registrace, Úvodní příběh, Mapa světa, Nápověda – jen je zvýrazníme
  markMainButton(findLink("registrace", "registrace"), "Registrace");
  markMainButton(findLink("pribeh", "úvodní příběh"), "Úvodní příběh");
  markMainButton(findLink("mapa", "mapa světa"), "Mapa světa");
  markMainButton(findLink("napoveda", "nápověda"), "Nápověda");

  // --- 2) Schováme reklamy (podle textu) -----------------------------------

  var textNodes = document.querySelectorAll("td, div, span");
  Array.prototype.forEach.call(textNodes, function (el) {
    var t = (el.textContent || "").toLowerCase();
    if (t.indexOf("zde může být vaše reklama") !== -1) {
      el.style.display = "none";
    }
  });

  // případně další bannery dole – podle potřeby můžeme doplnit další detekci
})();
