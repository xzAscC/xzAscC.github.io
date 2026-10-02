---
title: "Templates for Research"
description: "Templates for the paper and the project page, with slides and posters to follow."
date: 2026-10-01
tags: [template, research-tools]
permalink: /blog/2026/research-templates/
read_time: false
---

I am putting the layouts I use for research in one place, so that each new project starts with the content. Two templates are available here: a LaTeX paper template and a matching research project page. Use them together to connect the paper, code, and results, or adapt either one on its own.

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

<div class="template-feature" id="project-template">
  <div class="template-feature__eyebrow"><span>02 / Project page</span><span class="template-status">Preview available</span></div>
  <h2>A home for the research.</h2>
  <p>A standalone project page for presenting a paper and its supporting resources. It follows the same restrained style as the paper template, with warm backgrounds, clear typography, and a shared PDF reader.</p>
  <div class="template-actions">
    <a class="template-action template-action--primary" href="{{ '/templates/project/' | relative_url }}">Preview the project page <span aria-hidden="true">↗</span></a>
    <a class="template-action" href="{{ '/files/project-template.zip' | relative_url }}" download>Download the template <span aria-hidden="true">↓</span></a>
  </div>
  <dl class="template-details">
    <div><dt>The essentials up front</dt><dd>A title, short contribution statement, authors, affiliations, and links to the paper, code, and data.</dd></div>
    <div><dt>The story behind the paper</dt><dd>A teaser figure, an overview of the idea, a method breakdown, and space for results and limitations.</dd></div>
    <div><dt>Read, cite, and reuse</dt><dd>The full paper is embedded in the page, with Open and Download actions and a copyable BibTeX citation. The layout adapts to desktop and mobile screens.</dd></div>
  </dl>
</div>

## Start with your project page

[Download the ZIP]({{ '/files/project-template.zip' | relative_url }}) and unzip it. Edit `index.html` to replace the example title, authors, links, section text, and citation. Replace the sample figure and PDF with your own files; the preview content is a writing guide, not research results.

To preview the folder locally:

```sh
python -m http.server 8000
```

Open `http://localhost:8000/`. The download is plain HTML, CSS, and JavaScript, with no framework or build step. When it is ready, remove the preview's `noindex` meta tag and upload the folder to a static host such as GitHub Pages.

To connect the two templates, set `\projectpage{...}` in the paper's `main.tex` to your project page URL, and link the project page's Paper button and embedded reader to your PDF.

## Next in the collection

The rest of the research workflow deserves the same attention. These are the next templates I plan to add.

<div class="template-roadmap">
  <div class="template-roadmap__item"><span class="template-roadmap__number">03 / Planned</span><h3>Slides</h3><p>A clear starting point for research talks and presentations.</p></div>
  <div class="template-roadmap__item"><span class="template-roadmap__number">04 / Planned</span><h3>Poster</h3><p>A layout for presenting a paper at a glance.</p></div>
</div>
