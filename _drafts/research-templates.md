---
title: "Research Templates, Part 1: Papers and Project Pages"
description: "A paper template and a project page, built around the details I want to reuse across research projects."
date: 2026-10-01
tags: [template, research-tools]
permalink: /blog/2026/research-templates/
---

A reusable set of templates would make each new research project easier to start. I’m collecting mine here, beginning with a paper template and a project page.

## A paper template for arXiv

The first page is where I wanted the most flexibility. It brings together the authors and affiliations, links to the project's resources, an abstract box, and a teaser figure. The resource links are optional, so a paper with only a code repository does not need empty entries for data, models, or slides.

The rest of the template covers the elements I want to reuse: figures and tables, theorem environments, algorithms, prompt boxes, and an appendix with its own contents. The example PDF also serves as the manual, showing these elements in context alongside the commands that control them.

<div class="template-actions">
  <a class="template-action template-action--primary" href="https://github.com/xzAscC/arxiv-template">Paper source on GitHub <span aria-hidden="true">↗</span></a>
</div>

{% include pdf-viewer.html src="/files/arxiv-template-example.pdf" title="Paper template example" pages=7 caption="The complete example, including layout instructions and sample paper elements." download_name="arxiv-template-example.pdf" %}

## A project page to go with it

Alongside the paper template, I’m putting together a project page to introduce the work, show the main results, and bring the paper and code links together. Readers can also browse the PDF and copy the citation directly from the page.

It uses plain HTML, CSS, and JavaScript, so you can adapt it by editing the files directly. The preview uses example content to show how a project could fit into the layout.

<figure class="web-viewer">
  <div class="pdf-viewer__bar">
    <div class="pdf-viewer__label"><span class="pdf-viewer__title">Project page template</span><span class="pdf-viewer__meta">Live preview</span></div>
    <div class="pdf-viewer__links">
      <a href="{{ '/blog/2026/research-templates/project/' | relative_url }}" target="_blank" rel="noopener" aria-label="Open the project page preview in a new tab">Open <span aria-hidden="true">↗</span></a>
      <a href="{{ '/files/project-template.zip' | relative_url }}" download>Download <span aria-hidden="true">↓</span></a>
    </div>
  </div>
  <iframe src="{{ '/blog/2026/research-templates/project/' | relative_url }}" title="Project page template preview" loading="lazy"></iframe>
  <figcaption>Scroll to explore the page, or open it in a new tab for a full-width preview.</figcaption>
</figure>

## What’s next

This is the first part of my research template collection, covering papers and project pages. In the next part, I’ll share templates for code, posters, and slides.
