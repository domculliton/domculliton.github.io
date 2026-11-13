/* ============================================================
   Monthly offer bar + outbound click tracking.
   To change the offer each month, edit OFFER below only.
   ============================================================ */
(function () {
  var OFFER = {
    id: 'nov-2026',
    // Hide automatically after 11:59pm PT on Nov 30, 2026
    expires: '2026-12-01T08:00:00Z',
    text: '<strong>Black Friday Deal:</strong> Add a 2nd TM7 Mixing Bowl for just $100 (save $199) + 0% APR for up to 18 months. Ends Nov 30.',
    shortText: '<strong>Black Friday:</strong> 2nd bowl $100 + 0% APR. Ends Nov 30.',
    cta: 'See the offer',
    href: 'buy.html#november-offer'
  };

  var expired = Date.now() > new Date(OFFER.expires).getTime();

  // Hide on-page offer sections once the offer ends
  if (expired) {
    document.querySelectorAll('[data-offer="' + OFFER.id + '"]').forEach(function (el) {
      el.hidden = true;
    });
  } else {
    var nav = document.querySelector('.site-nav');
    if (nav) {
      var bar = document.createElement('div');
      bar.className = 'offer-bar';
      bar.innerHTML = '<span class="offer-long">' + OFFER.text + '</span><span class="offer-short">' + OFFER.shortText + '</span> <a href="' + OFFER.href + '">' + OFFER.cta + ' &#8594;</a>';
      nav.insertAdjacentElement('afterend', bar);
    }
  }

  // Send clicks on Thermomix shop, consultant sign-up and WhatsApp links to Google Analytics
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href]');
    if (!link || typeof gtag !== 'function') return;
    var href = link.href;
    var event = null;
    if (href.indexOf('shop.thermomix.com') !== -1) event = 'click_buy_thermomix';
    else if (href.indexOf('register.thermomix.com') !== -1) event = 'click_consultant_signup';
    else if (href.indexOf('wa.me') !== -1) event = 'click_whatsapp';
    if (event) gtag('event', event, { link_url: href, page_path: location.pathname, offer_id: expired ? 'none' : OFFER.id });
  });
})();
