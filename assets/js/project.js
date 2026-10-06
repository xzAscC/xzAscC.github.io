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

// Switch themes; the choice is saved under the same key as the rest of the site.
const themeToggle = document.querySelector('[data-theme-toggle]');
const root = document.documentElement;
const updateThemeToggle = () => {
  const isDark = root.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
};
if (themeToggle) {
  updateThemeToggle();
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    updateThemeToggle();
    try {
      localStorage.setItem('theme', root.dataset.theme);
    } catch (error) {
      // Private browsing can block storage; the theme still applies to this page.
    }
  });
}

// Highlight the link of the section being read: the last one whose top has passed 40% of the viewport.
// The sidebar index stays hidden until the reader reaches the first section.
const navLinks = [...document.querySelectorAll('.project-nav > div a, .project-toc a')];
const sections = [...new Set(navLinks.map((link) => document.querySelector(link.hash)).filter(Boolean))];
const toc = document.querySelector('.project-toc');
let spyQueued = false;
const updateCurrentSection = () => {
  spyQueued = false;
  const line = innerHeight * 0.4;
  const current = sections.filter((section) => section.getBoundingClientRect().top <= line).pop();
  navLinks.forEach((link) => {
    if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  if (toc) toc.toggleAttribute('data-hidden', !current);
};
addEventListener('scroll', () => {
  if (!spyQueued) { spyQueued = true; requestAnimationFrame(updateCurrentSection); }
}, { passive: true });
addEventListener('resize', updateCurrentSection);
updateCurrentSection();
