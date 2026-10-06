// Typeset \( … \) and \[ … \] with KaTeX; pages opt in with `katex: true`.
if (window.renderMathInElement) {
  renderMathInElement(document.querySelector('main'), {
    delimiters: [
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false },
    ],
    throwOnError: false,
  });
}
