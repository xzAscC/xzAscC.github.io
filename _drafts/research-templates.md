---
title: "Templates for Research"
description: "A small collection of templates for writing papers, giving talks, and sharing research. Starting with the paper."
date: 2026-10-01
tags: [template, research-tools]
permalink: /blog/2026/research-templates/
read_time: false
---

I am putting the layouts I use for research in one place, so that each new paper or presentation starts with the content. The arXiv template is ready to use, and a matching project page is available to preview. Slides and posters will follow.

<div class="template-feature">
  <div class="template-feature__eyebrow"><span>01 / Paper</span><span class="template-status">Available</span></div>
  <h2>arXiv, with the details in place.</h2>
  <p>A compact LaTeX template for machine learning papers, with a title page that brings the abstract, authors, and research resources together.</p>
  <div class="template-actions">
    <a class="template-action template-action--primary" href="https://github.com/xzAscC/arxiv-template">Get the template <span aria-hidden="true">↗</span></a>
  </div>
  {% include pdf-viewer.html src="/files/arxiv-template-example.pdf" title="Inside the template" pages=7 caption="Scroll to explore the complete example." download_name="arxiv-template-example.pdf" %}
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

## A home for the project

The project page template brings the paper, authors, code, and results together in one place. It includes a method overview, a full PDF reader, and a copyable BibTeX citation. The preview uses example content that you can replace with your own research.

<div class="template-actions">
  <a class="template-action template-action--primary" href="{{ '/templates/project/' | relative_url }}">Preview the project page <span aria-hidden="true">↗</span></a>
  <a class="template-action" href="{{ '/files/project-template.zip' | relative_url }}" download>Download the template <span aria-hidden="true">↓</span></a>
</div>

The download is plain HTML, CSS, and JavaScript, ready for a static host. No framework is required.

## Next in the collection

The rest of the research workflow deserves the same attention. These are the next templates I plan to add.

<div class="template-roadmap">
  <div class="template-roadmap__item"><span class="template-roadmap__number">02 / Planned</span><h3>Slides</h3><p>A clear starting point for research talks and presentations.</p></div>
  <div class="template-roadmap__item"><span class="template-roadmap__number">03 / Planned</span><h3>Poster</h3><p>A layout for presenting a paper at a glance.</p></div>
</div>
