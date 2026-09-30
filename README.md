# Xudong Zhu - Academic Website

[![Website](https://img.shields.io/badge/Website-xudongzhu.com-blue?style=flat-square)](https://xudongzhu.com)
[![GitHub](https://img.shields.io/badge/GitHub-xzAscC-green?style=flat-square)](https://github.com/xzAscC)
[![Google Scholar](https://img.shields.io/badge/Google_Scholar-Citations-blue?style=flat-square)](https://scholar.google.com/citations?user=U55yracAAAAJ)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0000--3068--0754-green?style=flat-square)](http://orcid.org/0009-0000-3068-0754)

Welcome to my personal academic website repository! This site showcases my research, publications, and academic journey in Computer Science.

## 🎯 About Me

I am a PhD student in Computer Science at The Ohio State University, advised by Prof. [Zhihui Zhu](https://zhihuizhu.github.io/). My research studies how large language models represent concepts and how these representations evolve during generation and training.

- **Concept representations:** linear structure and bidirectional features, including AbsTopK (ICLR 2026).
- **Generation dynamics:** self-reflection and behavioral steering (TMLR 2026), with ongoing work on [Prefix Steering](https://github.com/xzAscC/RobustDiM-PrefixSteering).
- **Training dynamics:** how SFT and RL reshape representations, investigated in [Post-training Dynamics](https://github.com/xzAscC/PostDyn).

## 🔬 Publications

- **AbsTopK: Rethinking Sparse Autoencoders for Bidirectional Features** (ICLR 2026)
- **From Emergence to Control: Probing and Modulating Self-Reflection in Language Models** (TMLR 2026)
- **Alleviating Subgraph-Induced Oversmoothing in Link Prediction via Coarse Graining** (Neurocomputing 2025)
- **FCDS: Fusing Constituency and Dependency Syntax into Document-Level Relation Extraction** (LREC-COLING 2024)

## 📞 Contact

- **Email**: zhu.3944@osu.edu
- **Location**: Columbus, OH, USA
- **Institution**: The Ohio State University
- **Department**: Computer Science & Engineering

## 📚 Academic Background

- **Ph.D. in Computer Science** (2024-2029) - The Ohio State University
- **B.S. in Computer Science** (2020-2024) - University of Electronic Science and Technology of China
  - GPA: 3.98/4.00

---

## 🚀 本地预览

在仓库根目录启动与正式站点一致的预览（不含草稿）：

```bash
docker rm -f xz-blog-preview
docker run -d --name xz-blog-preview --network host \
  -v "$PWD":/usr/src/app -v xz-bundle:/usr/local/bundle -w /usr/src/app \
  jekyll-site bundle exec jekyll serve -H 127.0.0.1 --livereload --force_polling
```

访问 **http://localhost:4000/**；CV 位于 **http://localhost:4000/cv-json/**，PDF 位于 **http://localhost:4000/files/Xudong_Zhu_CV.pdf**。

```bash
# 查看日志
docker logs -f xz-blog-preview

# 测试与预览都会写入 _site/，运行测试前先停预览
docker stop xz-blog-preview
docker run --rm --network host \
  -v "$PWD":/usr/src/app -v xz-bundle:/usr/local/bundle -w /usr/src/app \
  jekyll-site sh _tests/run.sh
docker start xz-blog-preview
```

## ✍️ 写博客

1. 创建文章目录并复制模板：`mkdir -p _posts`，然后 `cp _drafts/post-template.md _posts/2026-10-01-my-post.md`（文件名中的日期即发布日期）。
2. 修改 front matter：`title`、可选的 `description`、`tags`；中文文章加 `lang: zh`（用于字体和阅读时长估算）。
3. 文章地址为 `/blog/<年份>/<slug>/`，会自动出现在 Blog 页、首页 Writing 栏目和 RSS（`/feed.xml`）中。
4. 草稿放在 `_drafts/`，不会发布；本地预览草稿需给 `jekyll serve` 加 `--drafts`。

支持的写作功能（模板里都有示例）：

- 公式：`$$...$$`（行内和独立成行均可），只有含公式的页面才会加载 MathJax。
- 代码高亮、表格、脚注 `[^1]`、带说明的图片 `<figure>`。
- Mermaid（```` ```mermaid ````）和 Plotly（```` ```plotly ````）代码块，同样按需加载。
- 提示框：在引用块后加一行 `{: .note }` 或 `{: .warning }`。
- 博客图片放在 `assets/images/blog/`，建议使用 WebP 格式。

---

<div align="center">
  <p>Built with ❤️ using <a href="https://jekyllrb.com/">Jekyll</a> and <a href="https://github.com/alshedivat/al-folio">al-folio</a></p>
  <p>Hosted on <a href="https://pages.github.com/">GitHub Pages</a></p>
</div>
