const container = document.querySelector('#waline');
if (container) {
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = 'https://unpkg.com/@waline/client@3.16.0/dist/waline.css';
  document.head.append(style);
  try {
    const { init } = await import('https://unpkg.com/@waline/client@3.16.0/dist/waline.js');
    init({
      el: container,
      serverURL: container.dataset.serverUrl,
      path: container.dataset.path,
      lang: 'en',
      login: 'enable',
      meta: ['nick', 'mail'],
      requiredMeta: ['nick'],
      dark: 'html[data-theme="dark"]',
      imageUploader: false,
      search: false,
      pageview: false,
      comment: false,
      locale: { placeholder: 'Share a thought or ask a question…' },
    });
  } catch (error) {
    document.querySelector('#comments-error').hidden = false;
  }
}
