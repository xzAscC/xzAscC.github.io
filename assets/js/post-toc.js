// Build the "On this page" outline from the post's h2 and h3 headings.
const toc = document.querySelector('[data-post-toc]');
const headings = [...document.querySelectorAll('.post__content :is(h2, h3)')];

const slugify = (text) => text.toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');

if (toc && headings.length >= 2) {
  const list = toc.querySelector('ol');
  const links = new Map();

  headings.forEach((heading) => {
    if (!heading.id) {
      let id = slugify(heading.textContent) || 'section';
      while (document.getElementById(id)) id += '-';
      heading.id = id;
    }
    const item = document.createElement('li');
    item.className = `post-toc__item post-toc__item--${heading.tagName.toLowerCase()}`;
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.dataset.tocLabel || heading.textContent.trim();
    item.append(link);
    list.append(item);
    links.set(heading, link);
  });
  toc.hidden = false;

  // The current section is the last heading above the top 30% of the screen.
  let frame = 0;
  const update = () => {
    frame = 0;
    const line = window.innerHeight * 0.3;
    const current = headings.findLast((heading) => heading.getBoundingClientRect().top <= line) || headings[0];
    links.forEach((link, heading) => {
      if (heading === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  addEventListener('scroll', () => { frame ||= requestAnimationFrame(update); }, { passive: true });
  update();
}
