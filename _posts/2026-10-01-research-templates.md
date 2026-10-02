---
title: "Research Templates, Part 1: Papers and Project Pages"
description: "A paper template and a project page, built around the details I want to reuse across research projects."
date: 2026-10-01
tags: [template, research-tools]
permalink: /blog/2026/research-templates/
---

Finishing a paper is always a relief, but I’ve started to dread the work that comes after it. Every time, I end up doing things a little differently: asking an AI to draft a poster, fixing it by hand, and figuring out how to put together a project page.

I want to make that process more predictable. My plan is to build a reusable pipeline that takes a finished paper and produces the same set of outputs: an arXiv submission, a code release, a project page, a poster, slides, and a video. With a template for each, neither I nor the AI tools I work with would have to figure out the format and style all over again. This post starts with the paper template and the project page.

## A paper template for arXiv

For the paper, I wanted a format that belonged to my work rather than to any one conference. I started from the NeurIPS style and kept its page layout and type, so a submission moves to arXiv without reflowing. What I redesigned is the title page.

That first page should tell readers what the work is and who made it at a glance. Links to code, data, and other resources are optional, so a paper shows only what it actually has.

The rest of the template holds the pieces I kept rebuilding from paper to paper. The example PDF doubles as the manual: each element appears in context, next to the command that produces it.

<div class="template-actions">
  <a class="template-action template-action--primary" href="https://github.com/xzAscC/arxiv-template">Paper source on GitHub <span aria-hidden="true">↗</span></a>
</div>

{% include pdf-viewer.html src="/files/arxiv-template-example.pdf" title="Paper template example" pages=7 caption="The complete example, including layout instructions and sample paper elements." download_name="arxiv-template-example.pdf" %}

## A project page to go with it

Not every reader will open the PDF, though, and that is why a paper needs a project page. With that in mind, I kept the page as simple as I could: one sentence at the top sums up the work, followed by the main figures and results.

It follows the same style as the paper, and the two point to each other. From the page, readers can still open the full PDF or copy the citation.

Like the paper template, it is meant to be edited rather than configured: plain HTML, CSS, and JavaScript, with no build step. Swap in your own figures, edit `index.html`, and upload it to any static host.

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

This post covers the first two parts: the paper and the project page. The next one will introduce templates for code and posters.
