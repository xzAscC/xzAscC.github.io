---
name: site-verify
description: Check a change to this Jekyll site end to end — keep the local preview running, run the Ruby test suite without clobbering the preview, screenshot the touched pages in light and dark at desktop and phone width (plus hover/scroll states), check layout edges, then commit only your own files and report localhost URLs. Use after any edit to pages, layouts, CSS, JS, data, or posts in this repo, and whenever the user asks to preview, test, screenshot, "看一下效果", or verify the site — do this yourself instead of asking the user to check in the browser.
---

# Site verify

The user judges visual changes in the browser, but expects you to have looked first. End every round of site changes with this check.

## 1. Preview

The preview container is `xz-blog-preview` (image `jekyll-site`, port 4000, livereload).

```bash
docker ps --filter name=xz-blog-preview --format '{{.Status}}'   # running?
docker start xz-blog-preview                                      # if it exists but stopped
```
If it does not exist, create it with the `docker run` command in README.md ("本地预览"). Drafts need the separate template preview on port 4001 (README, "写博客").

## 2. Tests

Tests and the preview both write `_site/`, so stop the preview while testing:
```bash
docker stop xz-blog-preview
docker run --rm --network host -v "$PWD":/usr/src/app -v xz-bundle:/usr/local/bundle -w /usr/src/app jekyll-site sh _tests/run.sh
docker start xz-blog-preview
```
Always restart the preview, even when tests fail. If a test encodes old content you changed on purpose, update the test in the same commit; do not delete assertions to get green.

## 3. Screenshots

`scripts/shoot.mjs` (next to this file) takes full-page screenshots of each URL at 1440px and 390px in light and dark, and fails on horizontal scroll, blocks outside the content column, or JS errors.

```bash
S=<session scratchpad>
[ -d "$S/node_modules/playwright-core" ] || (cd "$S" && npm i --silent playwright-core)
NODE_PATH="$S/node_modules" node .claude/skills/site-verify/scripts/shoot.mjs "$S/shots" \
  http://localhost:4000/projects/prefix-steering/ http://localhost:4000/ \
  --hover='[data-duration-chart] .dc-hit' --scroll='#results'
```
Wait a few seconds after an edit for the livereload build before shooting. Then read the screenshots that matter (Read tool) and look for: text overlap, cut-off labels, dark-mode contrast, card edges that do not line up, and whether the change actually shows. Plain `chrome --headless --screenshot` cannot hover or scroll, so use the script.

## 4. Commit

The user edits the repo in parallel (often the CV). Run `git status`, then `git add <paths you changed>` — never `git add -A` or `commit -a`. If an open PR branch exists for this work, commit there and push; do not open a new PR unless asked.

## 5. Report

End with the localhost URLs of every page touched (e.g. `http://localhost:4000/projects/prefix-steering/`, `http://localhost:4000/cv-json/`), test result, and anything you could not verify.
