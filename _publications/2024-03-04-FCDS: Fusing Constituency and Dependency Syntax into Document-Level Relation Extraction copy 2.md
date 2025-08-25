---
title: "FCDS: Fusing Constituency and Dependency Syntax into Document-Level Relation Extraction"
collection: publications
category: conferences
excerpt: 'We introduce FCDS, a document-level relation extraction model that fuses constituency and dependency syntax. By combining sentence-level aggregation from constituency trees with dependency-based graph reasoning, FCDS better captures cross-sentence relations between entities. Experiments across multiple domains show significant performance gains, highlighting the effectiveness of integrating both syntactic views.'
date: 2024-03-04
venue: 'LREC-COLING 2024'
paperurl: 'https://aclanthology.org/anthology-files/anthology-files/pdf/lrec/2024.lrec-main.627.pdf'
citation: 'Xudong Zhu, Zhao Kang, and Bei Hui. 2024. FCDS: Fusing Constituency and Dependency Syntax into Document-Level Relation Extraction. In Proceedings of the 2024 Joint International Conference on Computational Linguistics, Language Resources and Evaluation (LREC-COLING 2024), pages 7141–7152, Torino, Italia. ELRA and ICCL.'
---

Document-level Relation Extraction (DocRE) aims to identify relation labels between entities within a single document. It requires handling several sentences and reasoning over them. State-of-the-art DocRE methods use a graph structure to connect entities across the document to capture dependency syntax information. However, this is insufficient to fully exploit the rich syntax information in the document. In this work, we propose to fuse constituency and dependency syntax into DocRE. It uses constituency syntax to aggregate the whole sentence information and select the instructive sentences for the pairs of targets. It exploits the dependency syntax in a graph structure with constituency syntax enhancement and chooses the path between entity pairs based on the dependency graph. The experimental results on datasets from various domains demonstrate the effectiveness of the proposed method. The code is publicly available at this url.

