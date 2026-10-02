---
layout: project
permalink: /projects/prefix-steering/
sitemap: false
noindex: true
project_name: Prefix Steering
title: "One Token Can Be Enough: Bridging Prompting and Activation Steering with Prefix Steering"
hero_title: "One Token Can Be Enough"
subtitle: "Bridging Prompting and Activation Steering with Prefix Steering"
description: "Bridging prompting and activation steering, short initial interventions often retain much of full steering’s behavioral control while better preserving general capabilities."
accent: "#a83024"
project_stylesheet: /assets/css/prefix-project.css
project_authors:
  - name: Xudong Zhu
    affiliations: [1]
    url: https://xudongzhu.com
  - name: Zhihui Zhu
    affiliations: [1]
    url: https://zhihuizhu.github.io/
affiliations:
  - The Ohio State University
nav:
  - id: overview
    label: Duration
  - id: method
    label: Connection
  - id: results
    label: Results
resources:
  - label: Paper
    url: /files/papers/prefix-steering.pdf
  - label: Code
    url: https://github.com/xzAscC/Prefix
teaser: /assets/images/publications/prefix-steering.svg
teaser_width: 479
teaser_height: 166
teaser_alt: "Prompting, full steering, and Prefix Steering: an attention-level connection motivates a brief initial intervention."
teaser_caption: "Control can outlast intervention. Prefix Steering confines intervention to a short initial span, then lets generation continue without further direct intervention. Across the evaluated settings, short prefixes often yield a more favorable control–capability Pareto frontier than full steering, preserving more capability at comparable behavioral control."
project_pdf: /files/papers/prefix-steering.pdf
pdf_preview: /assets/images/publications/prefix-paper-preview.jpg
pdf_title: One Token Can Be Enough
pdf_pages: 32
pdf_caption: "The full analysis, experimental protocol, and proofs."
footer_note: "Xudong Zhu · The Ohio State University"
bibtex:
---

<section id="overview" class="project-section">
  <h2>Less intervention, a better trade-off</h2>
  <figure class="project-figure">
    <a href="{{ '/files/papers/prefix-duration-strength-figure.pdf' | relative_url }}" aria-label="Open figure PDF: Safety–capability trade-off across steering durations and strengths on OLMo 3 7B."><img class="paper-figure" src="{{ '/assets/images/publications/prefix-duration-strength.svg' | relative_url }}" width="325" height="150" alt="Safety–capability trade-off across steering durations and strengths on OLMo 3 7B." loading="lazy"></a>
    <figcaption>OLMo 3 7B · HarmBench safety and MMLU-Pro capability. Point size indicates strength; shading marks a compressed axis interval.</figcaption>
  </figure>
  <p class="figure-conclusion">A short prefix can preserve more capability at comparable control; duration and strength jointly shape the trade-off.</p>
</section>

<section id="method" class="project-section">
  <h2>Connecting prompting and steering</h2>
  <p class="theory-scope">Under fixed-state attention assumptions:</p>
  <div class="matching-points">
    <div><span>Exact matching</span><p class="matching-equation">∃ <i>r</i> : <i>o</i><sub>steer</sub>(<i>h</i>) = <i>o</i><sub>prompt</sub>(<i>h</i>)</p><p>A matching displacement exists under sufficient conditions.</p></div>
    <div><span>Leaving the matching set</span><p class="matching-equation">Error = O(distance)</p><p>A linear error bound in distance from the matching set.</p></div>
    <div><span>More tokens</span><p class="matching-equation">More constraints → harder matching</p><p>Additional prompt or steered tokens can make the match harder to preserve.</p></div>
  </div>
  <figure class="project-figure">
    <a href="{{ '/files/papers/prefix-attention-matching-figure.pdf' | relative_url }}" aria-label="Open figure PDF: Matching-set dimension, error versus distance, and error versus token count."><img class="paper-figure" src="{{ '/assets/images/publications/prefix-attention-matching.svg' | relative_url }}" width="514" height="142" alt="Matching-set dimension, error versus distance, and error versus token count." loading="lazy"></a>
    <figcaption>Matching-set dimension shrinks and attention-output errors tend to increase as token counts grow.</figcaption>
  </figure>
  <div class="dim-comparison">
    <div><h3>From <i>r</i> to DiM</h3><p>The constructed displacement <i>r</i> and DiM direction show positive cosine similarity in the plotted OLMo 3 7B comparison.</p></div>
    <figure class="project-figure">
    <a href="{{ '/files/papers/prefix-dim-alignment-figure.pdf' | relative_url }}" aria-label="Open figure PDF: Cosine similarity between the constructed displacement and DiM across OLMo 3 7B layers."><img class="paper-figure" src="{{ '/assets/images/publications/prefix-dim-alignment.svg' | relative_url }}" width="247" height="179" alt="Cosine similarity between the constructed displacement and DiM across OLMo 3 7B layers." loading="lazy"></a>
    <figcaption>Positive directional alignment across the plotted layers.</figcaption>
  </figure>
  </div>
</section>

<section id="results" class="project-section">
  <h2>A better control–capability frontier</h2>
  <figure class="project-figure">
    <a href="{{ '/files/papers/prefix-models-tasks-figure.pdf' | relative_url }}" aria-label="Open figure PDF: Control and capability across four models, five tasks, and two steering operators."><img class="paper-figure" src="{{ '/assets/images/publications/prefix-models-tasks.svg' | relative_url }}" width="756" height="430" alt="Control and capability across four models, five tasks, and two steering operators." loading="lazy"></a>
    <figcaption>4 models · 5 tasks · Additive steering and COAST. Higher is better on both axes; vertical axes omit empty intervals.</figcaption>
  </figure>
  <p class="figure-conclusion">Across the evaluated settings, short prefixes often offer a more favorable Pareto frontier than full steering, preserving more capability at comparable behavioral control.</p>
</section>
