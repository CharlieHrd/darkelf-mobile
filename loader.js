// loader.js – první testovací verze DE Mobile

(function () {
  // ochrana proti vícenásobnému načtení
  if (window.__DE_MOBILE_LOADER__) return;
  window.__DE_MOBILE_LOADER__ = true;

  console.log('DE Mobile loader: START', location.href);

  // Přidáme malý badge do rohu, ať vidíme, že to běží
  function addBadge(text) {
    var badge = document.createElement('div');
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
    document.body.appendChild(badge);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      addBadge();
    });
  } else {
    addBadge();
  }
})();
