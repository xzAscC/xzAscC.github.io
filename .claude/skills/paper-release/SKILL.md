---
name: paper-release
description: Update every place on this academic site when a paper changes status — first arXiv release, new arXiv version, conference/journal acceptance, camera-ready, or code/project link going live. Covers the publication entry, project page, BibTeX, web CV data, PDF CV, README, homepage news, and tests in one pass. Use whenever the user says a paper is on arXiv, got accepted, has a new link, "论文挂 arXiv 了", "中了", "更新论文信息", or pastes an arXiv ID/abs link or BibTeX for one of their papers.
---

# Paper release: sync every place in one pass

When Prefix Steering went to arXiv (2610.04967), the update took five commits because places were found one at a time: links, then the official BibTeX, then the hero order, then the news item. Walk the whole list below first, then edit.

## 0. Gather the facts

From the user or the arXiv abs page (fetch it): arXiv ID, final title, author list and order, abstract, primary category, submission date, venue (if accepted), code/project URLs. Get the BibTeX from arXiv's "Export BibTeX Citation" exactly as given; do not hand-write it. For an accepted paper, use the venue's official BibTeX if there is one, otherwise ask.

## 1. Touch points

| Place | What to change |
|---|---|
| `_publications/<date>-<slug>.md` | `title`, `venue`, `date`, `category` (`preprints` for arXiv only; move to peer-reviewed on acceptance), `paperurl` (arXiv abs), `pdfurl`, `codeurl`, `projecturl`, `bibtex`, `excerpt`, body = the arXiv abstract word for word. Remove `noindex`/`sitemap: false` that only existed while unreleased; keep `redirect_to` if the project page is the canonical page. |
| `_pages/<slug>.md` (project page, if any) | `status`, `venue`, `resources` (add arXiv; mark unreleased items `pending: true`), `bibtex`, `description`/`tldr` if wording changed, drop `noindex`. The hero orders resources automatically: available links, BibTeX, then pending. |
| `_data/cv.json` | `publications` entry (name, publisher, releaseDate, website, summary) and the matching `research` project `status`/`url`. |
| PDF CV | Overleaf `resume/resume.tex`, rebuilt into `files/Xudong_Zhu_CV.pdf`. You cannot edit Overleaf: give the user the exact LaTeX lines to paste, and say this step is pending until they upload the new PDF. |
| `README.md` | Publications list and the research summary line. |
| `_data/news.yml` | One new item at the top: `date: Mon YYYY`, text links the project page (or publication page) and states the main finding in one sentence, in the same scoped wording as the abstract ("often", "under … assumptions"). |
| Homepage intro (`_pages/about.md` front matter `intro`) | Only if the bio mentions the paper. If it changes, the web CV and PDF CV bio change with it (one bio, three places). |
| `_tests/<slug>_project_test.rb`, `_tests/structural_content_test.rb` | Assert the new arXiv link, the eprint in the citation, preprint vs. peer-reviewed section, no placeholder IDs. Update old assertions that encode the previous status. |

Search for leftovers of the old state before finishing:
```bash
rg -n "ongoing|coming soon|under review|2601\.00000|<old-repo-name>|<old title words>" --glob '!_site'
```

## 2. Wording rules

- Claims stay as scoped as the abstract. Do not upgrade "often retains" to "retains".
- Titles: exact capitalization from arXiv; the CV may use the short title only if the other entries do.
- Dates: arXiv submission date for preprints, the venue year for accepted papers.

## 3. Finish

1. Run the `site-verify` skill (tests + screenshots of the project page hero, publications page, homepage news, `/cv-json/`).
2. Commit in logical pieces, staging only the files you changed. Push to the open PR branch if there is one.
3. Report: every place changed, the PDF CV step if still pending, and the localhost URLs.
