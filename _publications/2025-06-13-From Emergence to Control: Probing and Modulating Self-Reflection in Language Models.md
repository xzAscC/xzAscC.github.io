---
title: "From Emergence to Control: Probing and Modulating Self-Reflection in Language Models"
collection: publications
category: conferences
excerpt: 'We study the emergence and control of self-reflection in large language models. Our probing method reveals that pretrained models already contain a latent capacity for reflection, which can be amplified without additional training. By identifying and manipulating a “self-reflection vector” in activation space, we achieve bidirectional control over reflective behavior, improving reasoning accuracy or reducing computation as needed. This work deepens understanding of self-reflection and demonstrates how model internals can enable precise behavioral modulation.'
date: 2025-06-13
venue: 'arxiv preprint'
authors:
  - Xudong Zhu
  - Jiachen Jiang
  - Mohammad Mahdi Khalili
  - Zhihui Zhu
cover: /assets/images/publications/self-reflection.png
paperurl: 'https://arxiv.org/abs/2506.12217'
codeurl: 'https://github.com/xzAscC/ProbingReflection'
citation: 'Zhu X, Jiang J, Khalili M M, et al. From Emergence to Control: Probing and Modulating Self-Reflection in Language Models[J]. arXiv preprint arXiv:2506.12217, 2025.'
---

Self-reflection -- the ability of a large language model (LLM) to revisit, evaluate, and revise its own reasoning -- has recently emerged as a powerful behavior enabled by reinforcement learning with verifiable rewards (RLVR). While self-reflection correlates with improved reasoning accuracy, its origin and underlying mechanisms remain poorly understood. In this work, {\it we first show that self-reflection is not exclusive to RLVR fine-tuned models: it already emerges, albeit rarely, in pretrained models}. To probe this latent ability, we introduce Reflection-Inducing Probing, a method that injects reflection-triggering reasoning traces from fine-tuned models into pretrained models. This intervention raises self-reflection frequency of Qwen2.5 from 0.6\% to 18.6\%, revealing a hidden capacity for reflection. Moreover, our analysis of internal representations shows that both pretrained and fine-tuned models maintain hidden states that distinctly separate self-reflective from non-reflective contexts. Leveraging this observation, {\it we then construct a self-reflection vector, a direction in activation space associated with self-reflective reasoning}. By manipulating this vector, we enable bidirectional control over the self-reflective behavior for both pretrained and fine-tuned models. Experiments across multiple reasoning benchmarks show that enhancing these vectors improves reasoning performance by up to 12\%, while suppressing them reduces computational cost, providing a flexible mechanism to navigate the trade-off between reasoning quality and efficiency without requiring additional training. Our findings further our understanding of self-reflection and support a growing body of work showing that understanding model internals can enable precise behavioral control.
