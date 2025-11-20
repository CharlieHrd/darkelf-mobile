// loader.js – DE Mobile loader / router

(function () {
  // ochrana proti vícenásobnému načtení
  if (window.__DE_MOBILE_LOADER__) return;
  window.__DE_MOBILE_LOADER__ = true;

  console.log('DE Mobile loader: START', location.href);

  // Základní URL repozitáře na GitHub Pages
  var BASE = 'https://charliehrd.github.io/darkelf-mobile/';

  // Přidáme třídu na body – globální "DE Mobile režim"
  function markBody() {
    document.body.classList.add('de-mobile');
  }

  // Přidáme malý badge do rohu, ať vidíme, že to běží
  function addBadge(text) {
    var badge = document.getElementById('de-mobile-badge');
    if (badge) return;

    badge = document.createElement('div');
    badge.id = 'de-mobile-badge';
    badge.textContent = text || 'DE Mobile ON';
    badge.style.position = 'fixed';
    badge.style.bottom = '10px';
    badge.style.left = '10px';
    badge.style.padding = '4px 8px';
    badge.style.fontSize = '12px';
    badge.style.background = 'rgba(0,0,0,0.7)';
    badge.style.color = '#fff';
    badge.style.zIndex = '99999';
    badge.style.borderRadius = '4px';
    badge.style.fontFamily = 'sans-serif';
    badge.style.pointerEvents = 'none';
    document.body.appendChild(badge);
  }

  function loadCss(url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url + '?' + Date.now();
    document.head.appendChild(link);
  }

  function loadScript(url) {
    var s = document.createElement('script');
    s.src = url + '?' + Date.now();
    document.head.appendChild(s);
  }

  function init() {
    markBody();
    addBadge();

    // Načteme společné CSS
    loadCss(BASE + 'common.css');

    // Rozhodneme podle URL, kde jsme
    var path = (location.pathname || '').toLowerCase();

    // homepage – budeme ladit dle potřeby
    if (
      path === '/' ||
      path === '/default.asp' ||
      path === '/index.asp'
    ) {
      console.log('DE Mobile: detekovaná homepage', path);
      loadScript(BASE + 'pages/homepage.js');
    }

    // Další stránky (login, mapa...) přidáme později
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
