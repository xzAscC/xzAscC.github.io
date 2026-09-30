---
title: "Alleviating subgraph-induced oversmoothing in link prediction via coarse graining"
collection: publications
category: manuscripts
excerpt: 'We address the oversmoothing problem in link prediction caused by repetitive high-degree nodes across subgraphs. Our method introduces a coarse-graining strategy that merges strongly correlated nodes, yielding more diverse receptive fields and reducing subgraph size. This not only mitigates oversmoothing but also improves scalability and efficiency of GNN-based link prediction.'
date: 2025-06-20
order: 4
venue: 'Neurocomputing, 2025'
authors:
  - Xudong Zhu
  - Dong Hao
  - Ziqin Gao
  - Liming Pan
cover: /assets/images/publications/coarse-graining.svg
paperurl: 'https://www.sciencedirect.com/science/article/abs/pii/S0925231225013384'
codeurl: 'https://github.com/xzAscC/coarsen'
permalink: /publications/coarse-graining/
redirect_from:
  - "/publications/2025-06-20-Alleviating subgraph-induced oversmoothing in link prediction via coarse graining/"
bibtex: |
  @article{zhu2025alleviating,
    title   = {Alleviating subgraph-induced oversmoothing in link prediction via coarse graining},
    author  = {Zhu, Xudong and Hao, Dong and Gao, Ziqin and Pan, Liming},
    journal = {Neurocomputing},
    volume  = {649},
    pages   = {130666},
    year    = {2025},
    doi     = {10.1016/j.neucom.2025.130666}
  }
---

State-of-the-art link prediction methods often rely on extracting an enclosing subgraph for each target link and subsequently encoding these subgraphs into a Graph Neural Network (GNN). However, a fundamental challenge for extracting subgraphs is that statistically, high-degree nodes appear more frequently in subgraphs for different target links, yet the number of these high-degree nodes is small. Therefore, enclosing subgraphs for different target links tend to be quite similar, resulting in similar receptive fields for the GNN. Traditional methods, such as residual blocks or multiple hops, cannot solve this issue.
We propose a simple coarse-graining-based subgraph representation for GNN. For each local subgraph, it merges nodes that are most strongly correlated in the correlation matrix, which ensures the GNN obtains diverse and informative receptive fields. This effectively mitigates the issue of over-smoothing. Additionally, it reduces the GNN’s training time by decreasing subgraph size, thereby enhancing the scalability of GNN for link prediction on large-scale graphs. Our experiments on widely used benchmark datasets highlight the adverse impact of high-degree nodes on LP tasks. The experiments also demonstrate the effectiveness of our proposed method in addressing this challenge.
