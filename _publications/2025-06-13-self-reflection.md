---
title: "From Emergence to Control: Probing and Modulating Self-Reflection in Language Models"
collection: publications
category: manuscripts
excerpt: 'We study the emergence and control of self-reflection in large language models. Our probing method reveals that pretrained models already contain a latent capacity for reflection, which can be amplified without additional training. By identifying and manipulating a “self-reflection vector” in activation space, we achieve bidirectional control over reflective behavior, improving reasoning accuracy or reducing computation as needed. This work deepens understanding of self-reflection and demonstrates how model internals can enable precise behavioral modulation.'
date: 2025-06-13
order: 2
venue: 'TMLR 2026'
authors:
  - Xudong Zhu
  - Jiachen Jiang
  - Mohammad Mahdi Khalili
  - Zhihui Zhu
cover: /assets/images/publications/self-reflection.webp
paperurl: 'https://arxiv.org/abs/2506.12217'
codeurl: 'https://github.com/xzAscC/ProbingReflection'
permalink: /publications/self-reflection/
redirect_from:
  - "/publications/2025-06-13-From Emergence to Control: Probing and Modulating Self-Reflection in Language Models/"
pdfurl: 'https://arxiv.org/pdf/2506.12217'
bibtex: |
  @article{zhu2026probing,
    title   = {Probing and Controlling Self-Reflection in Language Models},
    author  = {Xudong Zhu and Jiachen Jiang and Mohammad Mahdi Khalili and Zhihui Zhu},
    journal = {Transactions on Machine Learning Research},
    issn    = {2835-8856},
    year    = {2026},
    url     = {https://openreview.net/forum?id=AwVIfBZwy0},
    note    = {}
  }
---

Self-reflection -- the ability of a large language model (LLM) to revisit, evaluate, and revise its own reasoning -- has recently emerged as a powerful behavior enabled by reinforcement learning with verifiable rewards (RLVR). While self-reflection correlates with improved reasoning accuracy, its origin and underlying mechanisms remain poorly understood. In this work, *we first show that self-reflection is not exclusive to RLVR fine-tuned models: it already emerges, albeit rarely, in pretrained models*. To probe this latent ability, we introduce Reflection-Inducing Probing, a method that injects reflection-triggering reasoning traces from fine-tuned models into pretrained models. This intervention raises self-reflection frequency of Qwen2.5 from 0.6% to 18.6%, revealing a hidden capacity for reflection. Moreover, our analysis of internal representations shows that both pretrained and fine-tuned models maintain hidden states that distinctly separate self-reflective from non-reflective contexts. Leveraging this observation, *we then construct a self-reflection vector, a direction in activation space associated with self-reflective reasoning*. By manipulating this vector, we enable bidirectional control over the self-reflective behavior for both pretrained and fine-tuned models. Experiments across multiple reasoning benchmarks show that enhancing these vectors improves reasoning performance by up to 12%, while suppressing them reduces computational cost, providing a flexible mechanism to navigate the trade-off between reasoning quality and efficiency without requiring additional training. Our findings further our understanding of self-reflection and support a growing body of work showing that understanding model internals can enable precise behavioral control.
