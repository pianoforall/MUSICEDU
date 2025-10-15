/* === Piano for ALL – Main JS === */

// Mobile navigation toggle
const menuBtn = document.getElementById('menu');
const navLinks = document.getElementById('navlinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Smooth scroll for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      navLinks?.classList.remove('show');
    }
  });
});

// Fade-in animation when elements enter view
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
fadeElements.forEach(el => fadeObserver.observe(el));

// Optional: WhatsApp link tracking (just logs)
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('User opened WhatsApp link:', link.href);
  });
});

// Year auto-update in footer
const footer = document.querySelector('.footer p');
if (footer && footer.textContent.includes('©')) {
  const year = new Date().getFullYear();
  footer.textContent = `© ${year} Piano for ALL`;
}