---
title: "One Token Can Be Enough: Bridging Prompting and Activation Steering with Prefix Steering"
collection: publications
category: preprints
excerpt: "Bridging prompting and activation steering, short initial interventions often retain much of full steering’s behavioral control while better preserving general capabilities."
date: 2026-10-02
order: 0
venue: 'Manuscript'
noindex: true
sitemap: false
authors:
  - Xudong Zhu
  - Zhihui Zhu
cover: /assets/images/publications/prefix-steering.svg
paperurl: /files/papers/prefix-steering.pdf
pdfurl: /files/papers/prefix-steering.pdf
codeurl: https://github.com/xzAscC/Prefix
projecturl: /projects/prefix-steering/
permalink: /publications/prefix-steering/
bibtex:
---

Prompting guides language model behavior through the initial context, whereas activation steering often intervenes throughout generation. A natural question is whether steering can produce effects on subsequent computation similar to those of prompting. Under fixed-state attention assumptions, we establish sufficient conditions for single- and multi-token steering to match prompt-induced attention-head outputs, and characterize how changes in input representations affect this match and its approximation error. This attention-level connection leads us to ask whether, at the behavioral level, steering can also guide subsequent generation through a brief initial intervention. We study Prefix Steering, which applies existing steering directions and operators over a short span starting at the final prompt token, with no further direct intervention afterward. We examine how intervention duration and strength jointly shape the control–capability trade-off. Across four models and five tasks, intervention over a short span, even a single token, often retains much of full steering's behavioral control while better preserving general capabilities, offering a trade-off competitive with, and in some settings better than, prompting and alternative steering-strength policies. Prefix Steering also remains effective on final-answer formatting tasks after reasoning, suggesting that a brief initial intervention can shape subsequent generation through the context it creates.
