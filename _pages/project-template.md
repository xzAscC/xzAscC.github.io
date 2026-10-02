---
layout: project
sitemap: false
noindex: true                # linked only from the templates blog post
permalink: /blog/2026/research-templates/project/
project_name: Project Name
title: "Your research, in focus."
description: "A concise statement of your main contribution. One sentence that tells the reader what changed, and why it matters."
venue: "Research project · Template preview"
accent: "#a83024"            # one color; hover, soft, and dark-mode shades follow
# social_image: /assets/images/social.png   # 1200×630 PNG or JPG for link previews
# favicon: /assets/images/favicon.svg       # defaults to a dot in the accent color
project_authors:
  - name: Author One
    affiliations: [1]
    equal: true
  - name: Author Two
    affiliations: [1, 2]
    equal: true
  - name: Author Three
    affiliations: [2]
    corresponding: true
    url: https://example.com
affiliations:
  - University One
  - Research Institute
nav:                         # body sections; Video, Paper, and Cite are added when present
  - id: overview
    label: Overview
  - id: method
    label: Method
  - id: results
    label: Results
resources:                   # the first one is highlighted
  - label: Paper
    url: /files/arxiv-template-example.pdf
  - label: arXiv
    url: https://arxiv.org/abs/2601.00000
  - label: Code
    url: https://github.com/your-name/your-project
  - label: Data
    url: https://huggingface.co/datasets/your-name/your-dataset
teaser: /assets/images/project-template-overview.svg
teaser_alt: "A placeholder method diagram: inputs flow through your method to outputs."
teaser_caption: "A visual summary of the idea. Replace this diagram with your main figure."
# teaser_width: 1200          # the image's intrinsic size; prevents layout shift
# teaser_height: 410
# video: YOUTUBE_VIDEO_ID      # adds a Video section
project_pdf: /files/arxiv-template-example.pdf
pdf_preview: /assets/images/arxiv-template-preview.svg
pdf_title: Example paper
pdf_pages: 7
pdf_caption: "The arXiv template is included as a sample PDF. Replace it with your paper."
footer_note: "A starting point for your next research project."
bibtex: |
  @article{one2026project,
    title         = {Your Paper Title},
    author        = {One, Author and Two, Author and Three, Author},
    journal       = {arXiv preprint arXiv:2601.00000},
    year          = {2026},
    eprint        = {2601.00000},
    archivePrefix = {arXiv},
    primaryClass  = {cs.LG}
  }
---

<section id="overview" class="project-section" markdown="1">
## The idea

Start with the problem your paper addresses. Explain what is missing from existing approaches, then introduce your central idea in a few sentences. Write this for a reader who has not yet opened the paper.

<div class="project-takeaway"><span>In one sentence</span><p>State the main takeaway here, including the scope in which it holds.</p></div>
</section>

<section id="method" class="project-section" markdown="1">
## How it works

<div class="project-steps">
  <div><span>01 / Setup</span><h3>Define the problem</h3><p>Describe the inputs, assumptions, and setting your method works in.</p></div>
  <div><span>02 / Method</span><h3>Show the key idea</h3><p>Explain the operation that makes your approach different.</p></div>
  <div><span>03 / Outcome</span><h3>Connect to evidence</h3><p>Explain what the output lets you measure, predict, or control.</p></div>
</div>
</section>

<section id="results" class="project-section" markdown="1">
## What the evidence shows

Use this section for a small number of results that support your main claim. State the evaluation setting and link to the paper for the full protocol.

<figure class="project-figure">
  <div class="project-result-placeholder"><span class="project-label">Result figure</span><p>Your main comparison belongs here.</p></div>
  <figcaption><strong>Figure 2.</strong> Replace the placeholder with an image and say what the axes, metric, and error bars show.</figcaption>
</figure>

<div class="project-table-wrap">
<table class="project-table">
  <caption><strong>Table 1.</strong> Placeholder numbers. Mean ± standard deviation over 5 seeds; the best value is in bold.</caption>
  <thead><tr><th scope="col">Method</th><th scope="col">Accuracy ↑</th><th scope="col">Relative cost ↓</th></tr></thead>
  <tbody>
    <tr><th scope="row">Baseline A</th><td>61.2 ± 0.4</td><td>1.00×</td></tr>
    <tr><th scope="row">Baseline B</th><td>64.8 ± 0.6</td><td>1.35×</td></tr>
    <tr class="project-table__ours"><th scope="row">Ours</th><td><strong>71.5 ± 0.3</strong></td><td><strong>0.42×</strong></td></tr>
  </tbody>
</table>
</div>

Include limitations alongside the results: where the method was tested, what the evidence supports, and what remains open.
</section>
