const copyButton = document.querySelector('[data-copy-citation]');
if (copyButton && navigator.clipboard) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('.project-copy-status');
    try {
      await navigator.clipboard.writeText(document.querySelector('#project-bibtex').textContent.trim());
      status.textContent = 'BibTeX copied.';
    } catch (error) {
      status.textContent = 'Select the citation text to copy it.';
    }
  });
}

// Highlight the navigation link of the section being read.
const navLinks = [...document.querySelectorAll('.project-nav > div a')];
const sections = navLinks.map((link) => document.querySelector(link.hash)).filter(Boolean);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
      navLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach((section) => observer.observe(section));
}
