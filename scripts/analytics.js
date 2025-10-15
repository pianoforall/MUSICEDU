/* === Piano for ALL – Analytics (lightweight, privacy-friendly) === */

/*
  OPTIONS:
  1️⃣ Plausible Analytics  (fast + privacy-focused)
     → https://plausible.io
     Add this script in <head> of index.html:
     <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>

  2️⃣ Google Analytics (GA4)
     → create a GA property, then insert your ID below.
*/

(function() {
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID

  if (!GA_MEASUREMENT_ID) {
    console.log('Analytics disabled: no GA ID configured.');
    return;
  }

  // Load Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Optional page-view logger
  window.addEventListener('load', () => {
    console.log('Analytics loaded for Piano for ALL');
  });

})();