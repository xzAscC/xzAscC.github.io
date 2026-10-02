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
