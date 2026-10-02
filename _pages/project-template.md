---
layout: project
published: false
sitemap: false
permalink: /templates/project/
project_name: Project Name
title: "Your research, in focus."
description: "A concise statement of your main contribution. One sentence that tells the reader what changed, and why it matters."
venue: "Research project · Template preview"
project_authors:
  - name: Author One
    affiliation: 1
  - name: Author Two
    affiliation: 1
  - name: Author Three
    affiliation: 2
affiliations: "¹ University One   ·   ² Research Institute"
resources:
  - label: Paper
    url: /files/arxiv-template-example.pdf
  - label: Code
    url: https://github.com/your-name/your-project
  - label: Data
    url: https://huggingface.co/datasets/your-name/your-dataset
teaser: /assets/images/project-template-overview.svg
teaser_alt: "A placeholder method diagram: inputs flow through your method to outputs."
teaser_caption: "A visual summary of the idea. Replace this diagram with your main figure."
project_pdf: /files/arxiv-template-example.pdf
pdf_title: Example paper
pdf_pages: 7
pdf_caption: "The arXiv template is included as a sample PDF. Replace it with your paper."
footer_note: "A starting point for your next research project."
bibtex: |
  @misc{yourproject2026,
    title  = {Your Paper Title},
    author = {Author One and Author Two and Author Three},
    year   = {2026},
    url    = {https://your-project.example}
  }
---

<section id="overview" class="project-section" markdown="1">
<div class="project-section__heading"><span>01</span><h2>The idea</h2></div>

Start with the problem your paper addresses. Explain what is missing from existing approaches, then introduce your central idea in a few sentences. Write this for a reader who has not yet opened the paper.

<div class="project-takeaway"><span>In one sentence</span><p>State the main takeaway here, including the scope in which it holds.</p></div>
</section>

<section id="method" class="project-section" markdown="1">
<div class="project-section__heading"><span>02</span><h2>How it works</h2></div>

<div class="project-steps">
  <div><span>01 / Setup</span><h3>Define the problem</h3><p>Describe the inputs, assumptions, and setting your method works in.</p></div>
  <div><span>02 / Method</span><h3>Show the key idea</h3><p>Explain the operation that makes your approach different.</p></div>
  <div><span>03 / Outcome</span><h3>Connect to evidence</h3><p>Explain what the output lets you measure, predict, or control.</p></div>
</div>
</section>

<section id="results" class="project-section" markdown="1">
<div class="project-section__heading"><span>03</span><h2>What the evidence shows</h2></div>

Use this section for a small number of results that support your main claim. State the evaluation setting and link to the paper for the full protocol.

<div class="project-result-placeholder"><span>RESULT FIGURE</span><p>Your main comparison belongs here.</p><small>Replace this placeholder with a figure and a caption explaining the metric, setting, and uncertainty.</small></div>

Include limitations alongside the results: where the method was tested, what the evidence supports, and what remains open.
</section>
