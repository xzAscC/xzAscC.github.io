---
name: web-figures
description: Redraw a paper's figures for this website as native inline SVG charts built from the raw result data (CSV/JSON in the paper's repo), instead of embedding the paper's PNG/PDF figures, and keep every figure on the same content width as the rest of the page. Use whenever a project page, publication page, or blog post needs a figure, plot, chart, or result from a paper — including "put Figure 3 on the page", "add the results plot", "这张图放到网页上", "重画这张图" — even if the user only hands over a PDF or PNG figure.
---

# Web figures: redraw from raw data, one page width

A paper figure is sized for a 5.5-inch PDF column: tiny fonts, a white canvas that glares in dark mode, no hover, and text that does not reflow. On the site, redraw each figure from its raw numbers so it uses the page's fonts, colors, and theme, and lines up with every other block on the page.

The reference implementation is the Prefix Steering page:
`_pages/prefix-steering.md` (markup), `assets/js/prefix-overview.js` (charts), `assets/css/prefix-project.css` (styles), `_data/prefix_*.json` (data). Read the chart in that file that is closest to the one you need before writing a new one, and reuse its helpers.

## 1. Find the raw data, not the picture

- Ask for (or look for) the script output behind the figure: usually `<paper repo>/results/*.csv|json`. The paper's plotting script tells you which columns and which aggregation the figure uses.
- If only the PDF/PNG exists, ask the user for the data before reading values off the image. Digitized values are approximate; if the user still wants it, say so in the caption.
- Do not invent, smooth, or round away points. Keep the precision of the source in the data file; format only at display time.

## 2. Store the data as `_data/<slug>_<figure>.json`

- One file per figure, trimmed to what the chart draws. Convert with a short script, not by hand.
- First key is `"source"`: the setting plus the relative path of the raw file, e.g.
  `"source": "OLMo 3 7B, HarmBench control and MMLU-Pro capability (%); Prefix/results/fig_prefix_duration.csv"`.
- Print it beside the chart so the JS reads it without a fetch:
  ```liquid
  {% assign duration = site.data.prefix_duration %}
  <article class="overview-card" data-duration-chart>
    <div class="duration-chart"><p class="duration-chart__fallback">…one-sentence finding for no-JS readers…</p></div>
    <script type="application/json">{{ duration | jsonify }}</script>
  </article>
  ```

## 3. Draw it as inline SVG

Follow the pattern in `prefix-overview.js`: find the card by its `data-*-chart` hook, `readData(card)`, build the SVG with the `el()` / `text()` helpers, and replace the fallback.

- `viewBox="0 0 W H"` with `width: 100%; height: auto` in CSS (`.duration-svg`). The SVG never sets a pixel width; the card decides the width. Pick `W` close to the card's rendered width (440 for a half-width card, about 1000 for a full-width one) so viewBox font sizes (10.5–12.5) render near their pixel size.
- If a chart's layout depends on width (small multiples, facets), redraw on a `ResizeObserver` like the models chart does, and switch to fewer columns on narrow cards rather than shrinking text.
- Colors come from CSS variables, never hex in JS: `--c-prefix`, `--c-full`, `--c-prompt`, `--c-base`, `--color-ink`, `--color-ink-soft`, `--color-border`, `--color-surface`. Define a new semantic variable in the page CSS for both light and dark (`html[data-theme='dark'] .project-page { … }`) if you need one. Same method → same color and marker in every chart on the page. The `paper-figures` skill holds the shared palette and marker rules for the paper itself; keep the web colors consistent with it.
- Text uses the page font (`font-family: var(--font-body)`), classed (`dc-title`, `dc-tick`, `dc-note`, …) so CSS sets size and fill.
- Every chart gets `role="img"` and an `aria-label` that states the finding, not the chart type.
- Add hover tooltips with `makeTooltip` / `placeTooltip` when exact values matter, and a `<details class="chart-data">` table when readers may want the numbers.
- Caption (`.overview-caption`): what is plotted, axes, units, what the bands mean, then a link to the original: `<a href="…/files/papers/<slug>-<figure>-figure.pdf">Paper figure (PDF)</a>`.

## 4. One content width

The page has one content column (`main { max-width: 1056px }` on the Prefix page) and every block — TL;DR, cards, figures, tables, PDF viewer — shares both of its edges.

- A figure is either full width of that column or sits in the two-column grid (`.prefix-overview`, `repeat(2, minmax(0, 1fr))`, `gap: 24px`). No figure with its own `max-width`, no centered narrow image, no figure wider than the column.
- Side-by-side figures in one row share the same viewBox height, so their axes line up.
- Below 860px the grid collapses to one column; check that charts stay readable at 390px wide (tick labels do not collide, legend wraps above the chart).

## 5. Verify

- Compare against the paper figure point by point for at least the extremes and one middle value.
- Update `_tests/<slug>_project_test.rb`: the chart hook exists, the body has no `class="paper-figure"` image, the paper-figure PDF link exists.
- Run the `site-verify` skill: screenshots in light and dark at desktop and 390px, plus a hover screenshot for tooltips. In the screenshots, check that the left and right edges of every card and figure line up.
