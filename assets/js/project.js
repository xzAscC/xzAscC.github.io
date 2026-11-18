// Copy the BibTeX from the hero link or the citation box. Without clipboard
// access the hero link falls back to jumping to the citation section.
const copyStatus = document.querySelector('.project-copy-status');
document.querySelectorAll('[data-copy-citation]').forEach((control) => {
  if (!navigator.clipboard) return;
  control.hidden = false;
  const label = control.querySelector('[data-copy-label]');
  const text = label.textContent;
  control.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(document.querySelector('#project-bibtex').textContent.trim());
      label.textContent = 'Copied';
      copyStatus.textContent = 'BibTeX copied.';
      setTimeout(() => { label.textContent = text; }, 1600);
    } catch (error) {
      copyStatus.textContent = 'Select the citation text to copy it.';
      if (control.hash) location.hash = control.hash;
    }
  });
});

// Switch themes; the choice is saved under the same key as the rest of the site.
const themeToggle = document.querySelector('[data-theme-toggle]');
const root = document.documentElement;
const updateThemeToggle = () => {
  const isDark = root.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
};
if (themeToggle) {
  // Until the reader picks a theme, the page follows the system setting, also when that changes later.
  let followsSystem = true;
  try {
    const savedTheme = localStorage.getItem('theme');
    followsSystem = savedTheme !== 'dark' && savedTheme !== 'light';
  } catch (error) {
    // Storage is blocked, so nothing was saved: keep following the system.
  }
  updateThemeToggle();
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    followsSystem = false;
    updateThemeToggle();
    try {
      localStorage.setItem('theme', root.dataset.theme);
    } catch (error) {
      // Private browsing can block storage; the theme still applies to this page.
    }
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!followsSystem) return;
    root.dataset.theme = event.matches ? 'dark' : 'light';
    updateThemeToggle();
  });
  // Follow a theme change made in another tab or in the page that embeds this one.
  addEventListener('storage', (event) => {
    if (event.key === 'theme' && (event.newValue === 'dark' || event.newValue === 'light')) {
      root.dataset.theme = event.newValue;
      followsSystem = false;
      updateThemeToggle();
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
