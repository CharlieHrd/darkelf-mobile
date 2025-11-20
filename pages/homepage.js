// pages/homepage.js – mobilní verze homepage DarkElfa

(function () {
  console.log("DE Mobile: homepage.js běží na", location.href);

  // označíme body
  document.body.classList.add("de-mobile-home");

  // 1) Zabalíme původní obsah do wrapperu, abychom ho mohli schovat
  var desktopWrapper = document.getElementById("de-desktop-root");
  if (!desktopWrapper) {
    desktopWrapper = document.createElement("div");
    desktopWrapper.id = "de-desktop-root";

    while (document.body.firstChild) {
      desktopWrapper.appendChild(document.body.firstChild);
    }
    document.body.appendChild(desktopWrapper);
  }

  // 2) Vytvoříme kořen pro mobilní homepage
  var mobileRoot = document.getElementById("de-mobile-home-root");
  if (mobileRoot) return; // už existuje

  mobileRoot = document.createElement("div");
  mobileRoot.id = "de-mobile-home-root";
  document.body.appendChild(mobileRoot);

  // --- Pomocné funkce ------------------------------------------------------

  function createSection(id, titleText) {
    var sec = document.createElement("section");
    sec.id = id;

    if (titleText) {
      var h = document.createElement("h2");
      h.textContent = titleText;
      sec.appendChild(h);
    }
    return sec;
  }

  // najde blok podle textu nadpisu (např. "Redaktorský sloupek")
  function findBlockByHeadingText(searchText) {
    searchText = searchText.toLowerCase();
    var candidates = Array.from(
      document.querySelectorAll(
        "b, strong, h1, h2, h3, h4, h5, h6, td, div, span"
      )
    );

    var heading = candidates.find(function (el) {
      return el.textContent && el.textContent.toLowerCase().includes(searchText);
    });

    if (!heading) return null;

    var block = heading;
    while (
      block &&
      block !== document.body &&
      !/^(TABLE|DIV)$/i.test(block.tagName)
    ) {
      block = block.parentElement;
    }

    return block || null;
  }

  // --- 3) HLAVNÍ AKCE (Vstoupit / Registrace / atd.) -----------------------

  var actionsSection = createSection(
    "de-mobile-home-actions",
    "Dark Elf – online strategie"
  );

  // najdeme původní tlačítka/odkazy podle cílové URL
  function cloneButton(selector, labelFallback) {
    var link = document.querySelector(selector);
    if (!link) return null;

    var btn = document.createElement("a");
    btn.href = link.href;
    btn.textContent = (link.textContent || labelFallback || "").trim();
    btn.className = "de-mobile-main-btn";
    return btn;
  }

  var btnVstoupit = cloneButton('a[href*="login.asp"]', "Vstoupit");
  var btnRegistrace = cloneButton('a[href*="registrace"],a[href*="reg.asp"]', "Registrace");
  var btnPribeh = cloneButton('a[href*="story"],a[href*="pribeh"]', "Úvodní příběh");
  var btnMapa = cloneButton('a[href*="world"],a[href*="mapa"]', "Mapa světa");
  var btnNapoveda = cloneButton('a[href*="napoveda"],a[href*="help"]', "Nápověda");

  [
    btnVstoupit,
    btnRegistrace,
    btnPribeh,
    btnMapa,
    btnNapoveda
  ].forEach(function (btn) {
    if (btn) actionsSection.appendChild(btn);
  });

  mobileRoot.appendChild(actionsSection);

  // --- 4) REDAKTORSKÝ SLOUPEK ----------------------------------------------

  var redakceBlock = findBlockByHeadingText("redaktorský sloupek");
  if (redakceBlock) {
    var redakceSec = createSection(
      "de-mobile-home-redakce",
      "Redaktorský sloupek"
    );
    var clone = redakceBlock.cloneNode(true);
    redakceSec.appendChild(clone);
    mobileRoot.appendChild(redakceSec);
  }

  // --- 5) NEJČASTĚJŠÍ / NEJAKTIVNĚJŠÍ FÓRA --------------------------------

  // zkusíme najít blok s textem "fór"
  var foraBlock =
    findBlockByHeadingText("fór") ||
    findBlockByHeadingText("nejčastější fóra") ||
    findBlockByHeadingText("nejfrekventovanější fóra");

  if (foraBlock) {
    var foraSec = createSection(
      "de-mobile-home-fora",
      "Nejčastější fóra"
    );
    var cloneF = foraBlock.cloneNode(true);
    foraSec.appendChild(cloneF);
    mobileRoot.appendChild(foraSec);
  }
})();
