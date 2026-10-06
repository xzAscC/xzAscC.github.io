# Xudong Zhu - Academic Website

[![Website](https://img.shields.io/badge/Website-xudongzhu.com-blue?style=flat-square)](https://xudongzhu.com)
[![GitHub](https://img.shields.io/badge/GitHub-xzAscC-green?style=flat-square)](https://github.com/xzAscC)
[![Google Scholar](https://img.shields.io/badge/Google_Scholar-Citations-blue?style=flat-square)](https://scholar.google.com/citations?user=U55yracAAAAJ)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0000--3068--0754-green?style=flat-square)](http://orcid.org/0009-0000-3068-0754)

Welcome to my personal academic website repository! This site showcases my research, publications, and academic journey in Computer Science.

## 🎯 About Me

I am a PhD student in Computer Science at The Ohio State University, advised by Prof. [Zhihui Zhu](https://zhihuizhu.github.io/). My research studies how large language models represent concepts and how these representations evolve during generation and training.

- **Concept representations:** linear structure and bidirectional features, including AbsTopK (ICLR 2026).
- **Generation dynamics:** self-reflection and behavioral steering (TMLR 2026), and [Prefix Steering](https://arxiv.org/abs/2610.04967) (arXiv 2026).
- **Training dynamics:** how SFT and RL reshape representations, investigated in [Post-training Dynamics](https://github.com/xzAscC/PostDyn).

## 🔬 Publications

- **One Token Can Be Enough: Bridging Prompting and Activation Steering with Prefix Steering** (arXiv 2026)
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

1. 创建文章目录并复制模板：`mkdir -p _posts`，然后 `cp post-template.md _posts/2026-10-01-my-post.md`（文件名中的日期即发布日期）。
2. 修改 front matter：`title`、可选的 `description`、`tags`；中文文章加 `lang: zh`（用于字体和阅读时长估算）。
3. 文章地址为 `/blog/<年份>/<slug>/`，会自动出现在 Blog 页、首页 Writing 栏目和 RSS（`/feed.xml`）中。
4. `post-template.md` 仅作为写作参考，已从站点构建中排除；草稿放在 `_drafts/`，不会发布；本地预览草稿需给 `jekyll serve` 加 `--drafts`。

博客首页支持标题、正文和标签搜索；点击文章标签会进入 `/blog/?tag=...`，搜索链接可直接分享。搜索只包含当前构建的文章，正式构建不会索引草稿。

文章底部使用 [Waline](https://waline.js.org/en/guide/get-started/)，允许登录或以游客身份留言。正式部署后，在 `_config.yml` 中设置 `waline.server_url`，并在服务端限制允许访问的站点域名。地址留空时不加载评论客户端。

本地评论预览使用独立服务 `xz-waline-preview`（`http://localhost:8360`），SQLite 数据和配置位于已忽略的 `local/`，不提交到 Git。`local/comments.yml` 覆盖评论地址；Jekyll 预览使用 `--drafts --config _config.yml,local/comments.yml --port 4001 --destination /tmp/template-preview-site`。已创建的预览容器可用 `docker start xz-waline-preview xz-template-preview` 恢复。

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

## PDF reader component

Use the shared reader in any Jekyll page or layout:

```liquid
{% include pdf-viewer.html src="/files/paper.pdf" title="Read the paper" pages=7 %}
```

`src` is required and accepts a local path or an external URL. Optional arguments are `title`, `pages`, `caption`, `download_name`, `preview` (a first-page image shown where the browser cannot display PDFs inline, as on most phones), and `height` (a CSS length such as `70vh`). Styles live in `_sass/editorial/_pdf-viewer.scss`; both the website and the project template import them. Blog drafts and publication pages use this same include.

## Project page template

The canonical example is `_pages/project-template.md`, using `_layouts/project.html`. It is served at `/blog/2026/research-templates/project/`, linked only from the templates blog post, and kept out of the sitemap and search results (`noindex: true`); it is a page, not a blog post. Edit the front matter for authors, resources, the teaser, PDF, and citation, then edit the body sections. The front matter comments document every option: `accent` sets one color that the hover, soft, and dark-mode shades follow; authors take `affiliations`, `equal`, and `corresponding`; `nav` lists the body sections, and Video, Paper, and Cite are added when `video`, `project_pdf`, or `bibtex` is set. Body sections are plain `## Heading` blocks and number themselves. The page starts in the system light or dark preference, and its nav button switches themes, sharing the saved choice with the rest of the site. `_tests/project_template_test.rb` checks the page (see `_tests/run.sh`).

To export a framework-free download:

```sh
bundle exec jekyll build --destination local/project-export
python scripts/export_project_template.py local/project-export
```

The resulting `files/project-template.zip` contains HTML, CSS, JavaScript, and example assets. Its README explains customization and deployment. Re-export after changing the project layout, example, or PDF reader.

## Verification and password recovery

Waline enables email verification for ordinary registrations when `SMTP_HOST` or `SMTP_SERVICE` is configured. Its first account is the administrator and bypasses the ordinary verification flow. Password recovery is available through the Login dialog's **Forgot Password** link.

The local preview sends only to Mailpit at http://localhost:8025/; these emails are captured locally and are not delivered to real inboxes. Start the three local services with `docker start xz-mailpit-preview xz-waline-preview xz-template-preview`.

For real delivery, set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SENDER_NAME`, and `SENDER_EMAIL` in the Waline server environment, then restart it. Also set its public `SERVER_URL`, `SITE_URL`, and `SECURE_DOMAINS`; email links must use the public HTTPS address. Keep secrets in environment files or the hosting platform, never Jekyll configuration. See [Waline email configuration](https://waline.js.org/en/guide/features/notification.html).
