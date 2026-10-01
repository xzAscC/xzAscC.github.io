---
title: "Templates for Research"
description: "A small collection of templates for writing papers, giving talks, and sharing research. Starting with the paper."
date: 2026-10-01
tags: [template, research-tools]
permalink: /blog/2026/research-templates/
read_time: false
---

I am putting the layouts I use for research in one place, so that each new paper or presentation starts with the content. This collection begins with an arXiv template; slides, posters, and project pages will follow.

<div class="template-feature">
  <div class="template-feature__eyebrow"><span>01 / Paper</span><span class="template-status">Available</span></div>
  <h2>arXiv, with the details in place.</h2>
  <p>A compact LaTeX template for machine learning papers, with a title page that brings the abstract, authors, and research resources together.</p>
  <div class="template-actions">
    <a class="template-action template-action--primary" href="https://github.com/xzAscC/arxiv-template">Get the template <span aria-hidden="true">↗</span></a>
    <a class="template-action" href="{{ '/files/arxiv-template-example.pdf' | relative_url }}">Read the example PDF <span aria-hidden="true">↗</span></a>
  </div>
  <figure class="template-preview">
    <iframe src="{{ '/files/arxiv-template-example.pdf' | relative_url }}#view=FitH&amp;navpanes=0" title="Full seven-page arXiv template example" loading="lazy"></iframe>
    <figcaption>Explore the full seven-page example. <a href="{{ '/files/arxiv-template-example.pdf' | relative_url }}" target="_blank" rel="noopener">Open in a new tab</a> or <a href="{{ '/files/arxiv-template-example.pdf' | relative_url }}" download="arxiv-template-example.pdf">download the PDF</a>.</figcaption>
  </figure>
  <dl class="template-details">
    <div><dt>A useful first page</dt><dd>Optional links for code, data, models, slides, and more, followed by an abstract box and a teaser figure.</dd></div>
    <div><dt>Room for the details</dt><dd>An optional outline, a separate appendix with its own contents, and matching theorem, prompt, and takeaway environments.</dd></div>
    <div><dt>An example you can edit</dt><dd>The sample paper doubles as a guide, with figures, tables, algorithms, code listings, and customization examples.</dd></div>
  </dl>
</div>

## Start with your paper

Download the [repository](https://github.com/xzAscC/arxiv-template), edit `main.tex` and `reference.bib`, and replace the example logo and affiliations with your own. Compile locally with:

```sh
latexmk -pdf main.tex
```

You can also upload the source files to an Overleaf project and select `main.tex` as the main document. A Gallery listing is planned.

The template code and documentation use the [MIT License](https://github.com/xzAscC/arxiv-template/blob/main/LICENSE). The OSU logo shown in the example is excluded from that license. Before sharing a finished paper, hide review comments by commenting out `\showcommentstrue` in `macro.tex`.

## Next in the collection

The rest of the research workflow deserves the same attention. These are the next templates I plan to add.

<div class="template-roadmap">
  <div class="template-roadmap__item"><span class="template-roadmap__number">02 / Planned</span><h3>Slides</h3><p>A clear starting point for research talks and presentations.</p></div>
  <div class="template-roadmap__item"><span class="template-roadmap__number">03 / Planned</span><h3>Poster</h3><p>A layout for presenting a paper at a glance.</p></div>
  <div class="template-roadmap__item"><span class="template-roadmap__number">04 / Planned</span><h3>Project page</h3><p>A home for the paper, results, code, and other resources.</p></div>
</div>
