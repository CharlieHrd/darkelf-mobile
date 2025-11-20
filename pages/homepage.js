// pages/homepage.js – první test DarkElf Mobile pro homepage

(function () {
  console.log('DE Mobile: homepage.js běží na', location.href);

  // Přidáme třídu na body, ať to můžeme stylovat v CSS
  document.body.classList.add('de-mobile-home');

  // Zkusíme lehké zvýraznění hlavního obsahu – tohle je jen start,
  // později to doladíme podle skutečného HTML.
  try {
    // Najdeme první větší tabulku / hlavní obsah
    var mainTable = document.querySelector('table');
    if (mainTable) {
      mainTable.style.maxWidth = '700px';
      mainTable.style.margin = '0 auto';
      mainTable.style.padding = '8px';
    }
  } catch (e) {
    console.warn('DE Mobile homepage: chyba při úpravě layoutu', e);
  }
})();
