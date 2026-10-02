const search = document.querySelector('[data-blog-search]');
if (search) {
  const input = search.querySelector('input');
  const status = search.querySelector('[role="status"]');
  const empty = document.querySelector('[data-search-empty]');
  const links = [...search.querySelectorAll('[data-tag]')];
  const posts = [...document.querySelectorAll('[data-search-text]')].map(element => ({
    element,
    text: element.dataset.searchText.normalize('NFKC').toLocaleLowerCase(),
    tags: JSON.parse(element.dataset.searchTags || '[]'),
  }));
  let tag = '';
  const render = () => {
    const terms = input.value.normalize('NFKC').trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    for (const post of posts) {
      const matches = (!tag || post.tags.includes(tag)) && terms.every(term => post.text.includes(term));
      post.element.hidden = !matches;
      if (matches) count++;
    }
    document.querySelectorAll('.post-archive__year').forEach(year => {
      year.hidden = !year.querySelector('.post-item:not([hidden])');
    });
    links.forEach(link => {
      if (link.dataset.tag === tag) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    status.textContent = `${count} ${count === 1 ? 'post' : 'posts'}${tag ? ` tagged “${tag}”` : ''}`;
    empty.hidden = count !== 0 || posts.length === 0;
  };
  const updateURL = () => {
    const url = new URL(location.href);
    const query = input.value.trim();
    if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
    if (tag) url.searchParams.set('tag', tag); else url.searchParams.delete('tag');
    history.replaceState(null, '', url);
    render();
  };
  const restore = () => {
    const params = new URLSearchParams(location.search);
    input.value = params.get('q') || '';
    tag = params.get('tag') || '';
    render();
  };
  input.addEventListener('input', updateURL);
  links.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    tag = link.dataset.tag;
    updateURL();
  }));
  search.querySelector('[data-search-reset]').addEventListener('click', () => {
    input.value = '';
    tag = '';
    updateURL();
    input.focus();
  });
  window.addEventListener('popstate', restore);
  search.hidden = false;
  restore();
}
