---
name: project-page
description: Build or redesign a research project page on this site (layout `project`, URL /projects/<slug>/) from a paper — hero with authors, resources, TL;DR and BibTeX, sections that follow the paper's argument, native charts, examples, PDF viewer, citation. Use whenever the user wants a project page, paper homepage, or landing page for one of their papers ("做项目主页", "给这篇论文做个页面", "redesign the project page"), or wants to change its structure, hero, or sections.
---

# Project page

The reference is the Prefix Steering page: `_pages/prefix-steering.md`, `_layouts/project.html`, `assets/css/project.scss` (shared), `assets/css/prefix-project.css` and `assets/js/prefix-overview.js` (page-specific), `_tests/prefix_project_test.rb`. Read them before starting; copy structure from them instead of inventing a new one.

## Files for a new page `<slug>`

- `_pages/<slug>.md` — front matter drives the layout: `layout: project`, `permalink: /projects/<slug>/`, `project_name`, `title`, `hero_title`, `subtitle`, `description`, `tldr`, `status`, `accent`, `project_authors` (with `url`), `affiliations`, `nav` (id/label/toc per section), `resources` (`pending: true` for not-yet-released items), `project_pdf` + `pdf_preview` + `pdf_pages`, `bibtex`, `footer_note`, `footer_logo` (`/images/logo-light.svg`, `/images/logo-dark.svg`), `favicon: /images/favicon.svg`, `project_stylesheet`, `project_scripts`, `katex` if there is math.
- `assets/css/<slug>-project.css`, `assets/js/<slug>-*.js` — page-specific; shared fixes go into `project.scss` / `project.js` so other pages and the exported template get them.
- `_data/<slug>_*.json` — one per chart (see the `web-figures` skill).
- `_publications/<date>-<slug>.md` — set `projecturl`; if the project page is the canonical page, add `redirect_to: /projects/<slug>/` and `sitemap: false`.
- `_tests/<slug>_project_test.rb`, added to `_tests/run.sh`.
- Unreleased paper: add `noindex: true` until it is public.

## Content

- Hero: short `hero_title`, the full title as `subtitle`, a two-sentence TL;DR with one bolded phrase. Resources order is handled by the layout (available links → BibTeX → pending).
- Sections follow the order of the paper's argument (e.g. theory connection → main trade-off → cross-model results), each opening with a one-paragraph `section-lede`. Cut method walkthroughs and statistic cards; show results.
- Every figure is redrawn from raw data with the `web-figures` skill; link the original paper figure PDF in the caption. No `paper-figure` images in the body.
- Keep every claim as scoped as the paper ("often", "under fixed-state attention assumptions"); tests can assert key qualifiers stay.
- Examples: real model transcripts from the paper, in the `transcript` carousel, without "Illustrative" labels.
- One content width: every block from the TL;DR to the PDF viewer shares the left and right edges of `main`.
- Footer credits the page author only.

## Template sync

The blog's project template (`/blog/2026/research-templates/project/`) shares `_layouts/project.html` and `project.scss`. After changing shared files, check that page too, and re-export the zip if the template changed:
```bash
python scripts/export_project_template.py _site files/project-template.zip
```

## Verify

Run the `site-verify` skill on `/projects/<slug>/` and the template page. For a first public release, also run `paper-release`.
