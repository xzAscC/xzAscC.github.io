---
title: "AbsTopK: Rethinking Sparse Autoencoders For Bidirectional Features"
collection: publications
category: conferences
excerpt: 'Sparse autoencoders (SAEs) are widely used for LLM interpretability, but existing variants often impose non-negativity that prevents single features from representing bidirectional concepts. We derive SAE variants from unrolled proximal gradient updates, identify this structural limitation, and propose AbsTopK SAE with magnitude-based hard thresholding. Across four LLMs and seven probing/steering tasks, AbsTopK improves reconstruction and interpretability while enabling single features to encode contrasting concepts.'
date: 2026-01-01
venue: 'ICLR 2026'
paperurl: 'https://openreview.net/forum?id=EEs6I4cO7S&referrer=%5BAuthor%20Console%5D(%2Fgroup%3Fid%3DICLR.cc%2F2026%2FConference%2FAuthors%23your-submissions)'
citation: 'Zhu X, Khalili M M, Zhu Z. AbsTopK: Rethinking Sparse Autoencoders For Bidirectional Features. ICLR 2026.'
---

Sparse autoencoders (SAEs) have emerged as powerful techniques for interpretability of large language models (LLMs), aiming to decompose hidden states into meaningful semantic features. While several SAE variants have been proposed, there remains no principled framework to derive SAEs from the original dictionary learning formulation. In this work, we introduce such a framework by unrolling the proximal gradient method for sparse coding. We show that a single-step update naturally recovers common SAE variants, including ReLU, JumpReLU, and TopK. Through this lens, we reveal a fundamental limitation of existing SAEs: their sparsity-inducing regularizers enforce non-negativity, preventing a single feature from representing bidirectional concepts (e.g., male vs. female). This structural constraint fragments semantic axes into separate, redundant features, limiting representational completeness. To address this issue, we propose AbsTopK SAE, a new variant derived from the $\ell_0$ sparsity constraint that applies hard thresholding over the largest-magnitude activations. By preserving both positive and negative activations, AbsTopK uncovers richer, bidirectional conceptual representations. Comprehensive experiments across four LLMs and seven probing and steering tasks show that AbsTopK improves reconstruction fidelity, enhances interpretability, and enables single features to encode contrasting concepts. Remarkably, AbsTopK matches or even surpasses the Difference-in-Mean method, a supervised approach that requires labeled data for each concept and has been shown in prior work to outperform SAEs.

OpenReview: https://openreview.net/forum?id=EEs6I4cO7S
