// Inline SVG charts for the Prefix Steering page; each reads the JSON printed beside it.
const NS = 'http://www.w3.org/2000/svg';
const el = (name, attrs = {}, parent) => {
  const node = document.createElementNS(NS, name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  if (parent) parent.append(node);
  return node;
};
const text = (content, attrs, parent) => {
  const node = el('text', attrs, parent);
  node.textContent = content;
  return node;
};
const readData = (scope) => JSON.parse(scope.querySelector('script[type="application/json"]').textContent);
const makeTooltip = () => {
  const tip = document.createElement('div');
  tip.className = 'dc-tooltip';
  tip.hidden = true;
  return tip;
};
// Place the tooltip beside an x position given in viewBox units, flipping left near the right edge.
const placeTooltip = (tip, svg, width, x, html) => {
  const box = svg.getBoundingClientRect();
  const left = (x / width) * box.width;
  tip.innerHTML = html;
  tip.hidden = false;
  tip.style.left = `${left}px`;
  tip.classList.toggle('dc-tooltip--left', left > box.width * 0.6);
};
const pointerX = (event, svg, width) => {
  const box = svg.getBoundingClientRect();
  return [((event.clientX - box.left) / box.width) * width, ((event.clientY - box.top) / box.height)];
};

// Duration trade-off: control (top) and capability (bottom) share one token axis.
const chartCard = document.querySelector('[data-duration-chart]');
if (chartCard) {
  const data = readData(chartCard);
  const holder = chartCard.querySelector('.duration-chart');
  const W = 440;
  const LEFT = 36;
  const RIGHT = W - 14;
  const PANELS = [
    { key: 'control', title: 'Behavioral control (%)', top: 24, bottom: 118, domain: [70, 90], ticks: [70, 80, 90] },
    { key: 'capability', title: 'General capability (%)', top: 166, bottom: 260, domain: [34, 40], ticks: [34, 36, 38, 40] },
  ];
  const H = 292;

  // Fifteen prefix lengths, then Full after a small gap that marks the jump to every token.
  const step = (RIGHT - LEFT) / 15.8;
  const columns = data.prefix.map((row, i) => ({ label: String(row.tokens), x: LEFT + 6 + i * step, row, kind: 'prefix' }));
  columns.push({ label: 'Full', x: LEFT + 6 + 15.8 * step - 6, row: data.full, kind: 'full' });

  const yOf = (panel, value) => panel.bottom - ((value - panel.domain[0]) / (panel.domain[1] - panel.domain[0])) * (panel.bottom - panel.top);
  const fmt = (value) => value.toFixed(1);

  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'duration-svg', role: 'img', 'aria-label': 'Behavioral control rises over the first few steered tokens and then levels off, while general capability falls as more tokens are steered.' });

  for (const panel of PANELS) {
    text(panel.title, { x: 0, y: panel.top - 12, class: 'dc-title' }, svg);
    for (const tick of panel.ticks) {
      const y = yOf(panel, tick);
      el('line', { x1: LEFT, x2: RIGHT, y1: y, y2: y, class: 'dc-grid' }, svg);
      text(String(tick), { x: LEFT - 6, y: y + 3.5, class: 'dc-tick', 'text-anchor': 'end' }, svg);
    }

    // Reference levels: prompting, and the unsteered model when it falls on the scale.
    const refs = [
      { value: data.prompting[panel.key], cls: 'dc-ref dc-ref--prompt', label: `Prompting ${fmt(data.prompting[panel.key])}` },
      { value: data.unsteered[panel.key], cls: 'dc-ref dc-ref--base', label: `Unsteered ${fmt(data.unsteered[panel.key])}` },
    ];
    const onScale = refs.filter((ref) => ref.value >= panel.domain[0] && ref.value <= panel.domain[1]);
    onScale.forEach((ref) => {
      const y = yOf(panel, ref.value);
      el('line', { x1: LEFT, x2: RIGHT, y1: y, y2: y, class: ref.cls }, svg);
    });
    if (onScale.length) {
      const y = Math.min(...onScale.map((ref) => yOf(panel, ref.value)));
      text(onScale.map((ref) => ref.label).join(' · '), { x: RIGHT, y: y - 5, class: 'dc-note', 'text-anchor': 'end' }, svg);
    }
    refs.filter((ref) => !onScale.includes(ref)).forEach((ref) => {
      text(`${ref.label} (below scale)`, { x: RIGHT, y: panel.bottom - 6, class: 'dc-note', 'text-anchor': 'end' }, svg);
    });

    // Prefix series as a connected line; full steering as a separate diamond.
    const prefix = columns.filter((column) => column.kind === 'prefix');
    el('polyline', { points: prefix.map((c) => `${c.x},${yOf(panel, c.row[panel.key])}`).join(' '), class: 'dc-line', fill: 'none' }, svg);
    prefix.forEach((c, i) => {
      el('circle', { cx: c.x, cy: yOf(panel, c.row[panel.key]), r: i === 0 ? 5 : 3.5, class: i === 0 ? 'dc-dot dc-dot--first' : 'dc-dot' }, svg);
    });
    const full = columns[columns.length - 1];
    const fy = yOf(panel, full.row[panel.key]);
    el('path', { d: `M${full.x} ${fy - 5.5}L${full.x + 5.5} ${fy}L${full.x} ${fy + 5.5}L${full.x - 5.5} ${fy}Z`, class: 'dc-full' }, svg);
    if (panel.key === 'control') {
      text('1 token', { x: prefix[0].x + 2, y: yOf(panel, prefix[0].row.control) + 17, class: 'dc-label' }, svg);
    }
  }

  // Shared token axis under the lower panel.
  const axisY = PANELS[1].bottom;
  columns.forEach((c) => {
    if (c.kind === 'full' || c.row.tokens === 1 || c.row.tokens % 5 === 0) {
      text(c.label, { x: c.x, y: axisY + 15, class: 'dc-tick', 'text-anchor': 'middle' }, svg);
    }
  });
  text('Tokens steered', { x: (LEFT + RIGHT) / 2, y: axisY + 30, class: 'dc-axis', 'text-anchor': 'middle' }, svg);

  // Hover: a guide across both panels and a tooltip with both values for that column.
  const guide = el('line', { y1: PANELS[0].top - 4, y2: PANELS[1].bottom, class: 'dc-guide', visibility: 'hidden' }, svg);
  const hit = el('rect', { x: LEFT - 4, y: PANELS[0].top - 8, width: RIGHT - LEFT + 8, height: PANELS[1].bottom - PANELS[0].top + 16, class: 'dc-hit', fill: 'transparent' }, svg);
  const tip = makeTooltip();

  const show = (event) => {
    const [x] = pointerX(event, svg, W);
    const column = columns.reduce((best, c) => (Math.abs(c.x - x) < Math.abs(best.x - x) ? c : best));
    guide.setAttribute('x1', column.x);
    guide.setAttribute('x2', column.x);
    guide.setAttribute('visibility', 'visible');
    const name = column.kind === 'full' ? 'Full steering' : `${column.row.tokens} token${column.row.tokens > 1 ? 's' : ''}`;
    placeTooltip(tip, svg, W, column.x, `<strong>${name}</strong><span>Control ${fmt(column.row.control)}</span><span>Capability ${fmt(column.row.capability)}</span>`);
  };
  const hide = () => {
    guide.setAttribute('visibility', 'hidden');
    tip.hidden = true;
  };
  hit.addEventListener('pointermove', show);
  hit.addEventListener('pointerdown', show);
  hit.addEventListener('pointerleave', hide);

  holder.replaceChildren(svg, tip);
}

// Strength trade-off: control against capability for each method across five strengths.
const strengthCard = document.querySelector('[data-strength-chart]');
if (strengthCard) {
  const rows = readData(strengthCard).tradeoff;
  const holder = strengthCard.querySelector('.strength-chart');
  const W = 440;
  const H = 318;
  const box = { left: 38, right: 426, top: 30, bottom: 280 };
  const xDomain = [33.6, 40.4];
  const yDomain = [30, 100];
  const xOf = (v) => box.left + ((v - xDomain[0]) / (xDomain[1] - xDomain[0])) * (box.right - box.left);
  const yOf = (v) => box.bottom - ((v - yDomain[0]) / (yDomain[1] - yDomain[0])) * (box.bottom - box.top);
  const STRENGTHS = [0.0001, 0.01, 0.1, 1, 10];
  const radius = (a) => 2.6 + STRENGTHS.indexOf(a) * 0.9;
  const alpha = (a) => (a === 0.0001 ? '10⁻⁴' : String(a));
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'duration-svg', role: 'img', 'aria-label': 'Control against capability across steering strengths. Prefix-1 keeps capability near 39 at every strength; full steering loses capability as strength grows, down to 22 at the highest strength.' });

  // The region Prefix-5 at the highest strength beats on both axes.
  const best = rows.find((r) => r.method === 'Prefix-5' && r.strength === 10);
  el('rect', { x: box.left, y: yOf(best.behavioral_control), width: xOf(best.general_capability) - box.left, height: box.bottom - yOf(best.behavioral_control), class: 'sc-shade' }, svg);
  text('Worse on both axes than', { x: box.left + 8, y: box.bottom - 22, class: 'dc-note' }, svg);
  text('Prefix-5 at α = 10', { x: box.left + 8, y: box.bottom - 9, class: 'dc-note' }, svg);

  [40, 60, 80, 100].forEach((t) => {
    el('line', { x1: box.left, x2: box.right, y1: yOf(t), y2: yOf(t), class: 'dc-grid' }, svg);
    text(String(t), { x: box.left - 6, y: yOf(t) + 3.5, class: 'dc-tick', 'text-anchor': 'end' }, svg);
  });
  [34, 35, 36, 37, 38, 39, 40].forEach((t) => text(String(t), { x: xOf(t), y: box.bottom + 15, class: 'dc-tick', 'text-anchor': 'middle' }, svg));
  el('line', { x1: box.left, x2: box.right, y1: box.bottom, y2: box.bottom, class: 'dc-grid' }, svg);
  text('General capability (MMLU-Pro, %)', { x: (box.left + box.right) / 2, y: box.bottom + 31, class: 'dc-axis', 'text-anchor': 'middle' }, svg);
  text('Behavioral control (HarmBench, %)', { x: 0, y: 12, class: 'dc-title' }, svg);

  const points = [];
  const SERIES = [
    { method: 'Full', cls: 'sc-full' },
    { method: 'Prefix-5', cls: 'sc-prefix5' },
    { method: 'Prefix-1', cls: 'sc-prefix1' },
  ];
  SERIES.forEach(({ method, cls }) => {
    const series = rows.filter((r) => r.method === method).sort((a, b) => a.strength - b.strength);
    const onScale = series.filter((r) => r.general_capability >= xDomain[0]);
    el('polyline', { points: onScale.map((r) => `${xOf(r.general_capability)},${yOf(r.behavioral_control)}`).join(' '), class: `sc-line ${cls}`, fill: 'none' }, svg);
    series.forEach((r) => {
      const off = r.general_capability < xDomain[0];
      const x = off ? box.left + 7 : xOf(r.general_capability);
      const y = yOf(r.behavioral_control);
      if (off) {
        // Full steering at the highest strength falls far off the left edge; mark it there.
        const last = onScale[onScale.length - 1];
        el('line', { x1: xOf(last.general_capability), y1: yOf(last.behavioral_control), x2: x, y2: y, class: `sc-line sc-break ${cls}`, fill: 'none' }, svg);
        text(`← ${r.general_capability.toFixed(1)}`, { x: x + 8, y: y - 7, class: 'dc-note' }, svg);
      }
      const r0 = radius(r.strength) + (method === 'Full' ? 0.8 : 0);
      if (method === 'Full') el('path', { d: `M${x} ${y - r0}L${x + r0} ${y}L${x} ${y + r0}L${x - r0} ${y}Z`, class: `sc-mark ${cls}` }, svg);
      else el('circle', { cx: x, cy: y, r: r0, class: `sc-mark ${cls}` }, svg);
      points.push({ x, y, html: `<strong>${method}, α = ${alpha(r.strength)}</strong><span>Control ${r.behavioral_control.toFixed(1)}</span><span>Capability ${r.general_capability.toFixed(1)}</span>` });
    });
  });
  rows.filter((r) => r.strength === null).forEach((r) => {
    const x = xOf(r.general_capability);
    const y = yOf(r.behavioral_control);
    const name = r.method === 'Prompt' ? 'Prompting' : r.method;
    el('rect', { x: x - 4, y: y - 4, width: 8, height: 8, class: r.method === 'Prompt' ? 'sc-prompt' : 'sc-base' }, svg);
    text(name, { x: x + 9, y: y + 4, class: 'dc-note' }, svg);
    points.push({ x, y, html: `<strong>${name}</strong><span>Control ${r.behavioral_control.toFixed(1)}</span><span>Capability ${r.general_capability.toFixed(1)}</span>` });
  });

  // Hover the nearest mark.
  const ring = el('circle', { r: 9, class: 'sc-ring', visibility: 'hidden' }, svg);
  const hit = el('rect', { x: 0, y: 0, width: W, height: box.bottom + 4, class: 'dc-hit', fill: 'transparent' }, svg);
  const tip = makeTooltip();
  const show = (event) => {
    const [x, fy] = pointerX(event, svg, W);
    const y = fy * H;
    const near = points.reduce((a, b) => (Math.hypot(a.x - x, a.y - y) < Math.hypot(b.x - x, b.y - y) ? a : b));
    if (Math.hypot(near.x - x, near.y - y) > 28) return hide();
    ring.setAttribute('cx', near.x);
    ring.setAttribute('cy', near.y);
    ring.setAttribute('visibility', 'visible');
    placeTooltip(tip, svg, W, near.x, near.html);
    tip.style.top = `${(near.y / H) * 100}%`;
  };
  const hide = () => {
    ring.setAttribute('visibility', 'hidden');
    tip.hidden = true;
  };
  hit.addEventListener('pointermove', show);
  hit.addEventListener('pointerdown', show);
  hit.addEventListener('pointerleave', hide);
  holder.replaceChildren(svg, tip);
}

// Lemma 5 check: attention-output error against single-token strength relative to the prediction.
const matchingCard = document.querySelector('[data-matching-chart]');
if (matchingCard) {
  const rows = readData(matchingCard).sort((a, b) => a.relative_strength - b.relative_strength);
  const holder = matchingCard.querySelector('.matching-chart');
  const W = 440;
  const H = 210;
  const box = { left: 38, right: 426, top: 20, bottom: 172 };
  const xOf = (v) => box.left + ((Math.log10(v) + 3) / 4) * (box.right - box.left);
  const yOf = (v) => box.bottom - (v / 0.25) * (box.bottom - box.top);
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'duration-svg', role: 'img', 'aria-label': 'Attention-output error is lowest when the single-token strength equals the predicted value.' });
  text('Attention-output error', { x: 0, y: 9, class: 'dc-title' }, svg);
  [0, 0.1, 0.2].forEach((t) => {
    el('line', { x1: box.left, x2: box.right, y1: yOf(t), y2: yOf(t), class: 'dc-grid' }, svg);
    text(t === 0 ? '0' : t.toFixed(1).replace(/^0/, ''), { x: box.left - 6, y: yOf(t) + 3.5, class: 'dc-tick', 'text-anchor': 'end' }, svg);
  });
  [['10⁻³', 0.001], ['10⁻²', 0.01], ['10⁻¹', 0.1], ['1', 1], ['10', 10]].forEach(([label, v]) => text(label, { x: xOf(v), y: box.bottom + 15, class: 'dc-tick', 'text-anchor': 'middle' }, svg));
  text('Relative strength β / β*', { x: (box.left + box.right) / 2, y: box.bottom + 31, class: 'dc-axis', 'text-anchor': 'middle' }, svg);
  el('line', { x1: xOf(1), x2: xOf(1), y1: box.top, y2: box.bottom, class: 'dc-ref dc-ref--base' }, svg);
  text('predicted β*', { x: xOf(1) + 5, y: box.top + 9, class: 'dc-note' }, svg);
  const upper = rows.map((r) => `${xOf(r.relative_strength)},${yOf(Math.min(r.error_mean + r.error_std, 0.25))}`);
  const lower = rows.map((r) => `${xOf(r.relative_strength)},${yOf(Math.max(r.error_mean - r.error_std, 0))}`).reverse();
  el('polygon', { points: [...upper, ...lower].join(' '), class: 'mc-band' }, svg);
  el('polyline', { points: rows.map((r) => `${xOf(r.relative_strength)},${yOf(r.error_mean)}`).join(' '), class: 'dc-line', fill: 'none' }, svg);
  rows.forEach((r) => el('circle', { cx: xOf(r.relative_strength), cy: yOf(r.error_mean), r: r.relative_strength === 1 ? 5 : 3.5, class: r.relative_strength === 1 ? 'dc-dot dc-dot--first' : 'dc-dot' }, svg));

  const guide = el('line', { y1: box.top, y2: box.bottom, class: 'dc-guide', visibility: 'hidden' }, svg);
  const hit = el('rect', { x: box.left - 10, y: box.top, width: box.right - box.left + 20, height: box.bottom - box.top, class: 'dc-hit', fill: 'transparent' }, svg);
  const tip = makeTooltip();
  const show = (event) => {
    const [x] = pointerX(event, svg, W);
    const r = rows.reduce((a, b) => (Math.abs(xOf(a.relative_strength) - x) < Math.abs(xOf(b.relative_strength) - x) ? a : b));
    const gx = xOf(r.relative_strength);
    guide.setAttribute('x1', gx);
    guide.setAttribute('x2', gx);
    guide.setAttribute('visibility', 'visible');
    placeTooltip(tip, svg, W, gx, `<strong>β / β* = ${r.relative_strength}</strong><span>Error ${r.error_mean.toFixed(3)} ± ${r.error_std.toFixed(3)}</span><span>${r.examples} examples</span>`);
  };
  hit.addEventListener('pointermove', show);
  hit.addEventListener('pointerdown', show);
  hit.addEventListener('pointerleave', () => {
    guide.setAttribute('visibility', 'hidden');
    tip.hidden = true;
  });
  holder.replaceChildren(svg, tip);
}

// Generic line chart with optional ± std bands, linear or log axes, and nearest-point hover.
const scaleOf = (axis, from, to) => {
  const f = axis.log ? (v) => Math.log10(v) : (v) => v;
  const [d0, d1] = axis.domain.map(f);
  return (v) => from + ((f(v) - d0) / (d1 - d0)) * (to - from);
};
const lineChart = (holder, spec) => {
  const W = spec.width || 300;
  const H = spec.height || 230;
  const box = { left: 40, right: W - 12, top: 26, bottom: H - 38 };
  const xOf = scaleOf(spec.x, box.left, box.right);
  const yOf = scaleOf(spec.y, box.bottom, box.top);
  const clampY = (v) => Math.min(Math.max(v, spec.y.domain[0]), spec.y.domain[1]);
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'duration-svg', role: 'img', 'aria-label': spec.label });
  text(spec.title, { x: 0, y: 11, class: 'dc-title' }, svg);
  spec.y.ticks.forEach(([v, label]) => {
    el('line', { x1: box.left, x2: box.right, y1: yOf(v), y2: yOf(v), class: 'dc-grid' }, svg);
    text(label, { x: box.left - 6, y: yOf(v) + 3.5, class: 'dc-tick', 'text-anchor': 'end' }, svg);
  });
  spec.x.ticks.forEach(([v, label]) => text(label, { x: xOf(v), y: box.bottom + 15, class: 'dc-tick', 'text-anchor': 'middle' }, svg));
  text(spec.x.label, { x: (box.left + box.right) / 2, y: box.bottom + 31, class: 'dc-axis', 'text-anchor': 'middle' }, svg);
  (spec.refs || []).forEach((ref) => {
    el('line', { x1: box.left, x2: box.right, y1: yOf(ref.y), y2: yOf(ref.y), class: 'dc-ref dc-ref--base', fill: 'none' }, svg);
    text(ref.label, { x: box.right, y: yOf(ref.y) - 5, class: 'dc-note', 'text-anchor': 'end' }, svg);
  });
  const points = [];
  spec.series.forEach((s) => {
    const rows = s.points;
    if (rows.some((p) => p.std !== undefined)) {
      const upper = rows.map((p) => `${xOf(p.x)},${yOf(clampY(p.mean + p.std))}`);
      const lower = rows.map((p) => `${xOf(p.x)},${yOf(clampY(p.mean - p.std))}`).reverse();
      el('polygon', { points: [...upper, ...lower].join(' '), class: `lc-band lc-${s.color}` }, svg);
    }
    el('polyline', { points: rows.map((p) => `${xOf(p.x)},${yOf(p.mean)}`).join(' '), class: `lc-line lc-${s.color}`, fill: 'none' }, svg);
    rows.forEach((p) => {
      el('circle', { cx: xOf(p.x), cy: yOf(p.mean), r: 3, class: `lc-dot lc-${s.color}` }, svg);
      const spread = p.std !== undefined ? ` ± ${spec.y.format(p.std)}` : '';
      points.push({ x: xOf(p.x), y: yOf(p.mean), html: `<strong>${s.name}</strong><span>${spec.x.name} ${spec.x.format(p.x)}</span><span>${spec.y.name} ${spec.y.format(p.mean)}${spread}</span>` });
    });
  });
  const ring = el('circle', { r: 7, class: 'sc-ring', fill: 'none', visibility: 'hidden' }, svg);
  const hit = el('rect', { x: 0, y: 0, width: W, height: box.bottom + 6, class: 'dc-hit', fill: 'transparent' }, svg);
  const tip = makeTooltip();
  const hide = () => {
    ring.setAttribute('visibility', 'hidden');
    tip.hidden = true;
  };
  const show = (event) => {
    const [x, fy] = pointerX(event, svg, W);
    const y = fy * H;
    const near = points.reduce((a, b) => (Math.hypot(a.x - x, a.y - y) < Math.hypot(b.x - x, b.y - y) ? a : b));
    if (Math.hypot(near.x - x, near.y - y) > 30) return hide();
    ring.setAttribute('cx', near.x);
    ring.setAttribute('cy', near.y);
    ring.setAttribute('visibility', 'visible');
    placeTooltip(tip, svg, W, near.x, near.html);
    tip.style.top = `${(near.y / H) * 100}%`;
  };
  hit.addEventListener('pointermove', show);
  hit.addEventListener('pointerdown', show);
  hit.addEventListener('pointerleave', hide);
  const nodes = [svg, tip];
  if (spec.series.length > 1) {
    const legend = document.createElement('ul');
    legend.className = 'chart-legend chart-legend--sm';
    legend.setAttribute('aria-label', 'Legend');
    legend.innerHTML = spec.series.map((s) => `<li><span class="chart-key" style="border-color: var(--c-${s.color})"></span>${s.name}</li>`).join('');
    nodes.unshift(legend);
  }
  holder.replaceChildren(...nodes);
};
const fixed = (digits) => (v) => Number(v).toFixed(digits);
const sig = (v) => (v >= 10 ? v.toFixed(1) : v >= 1 ? v.toFixed(2) : v.toPrecision(2));

// Figure 2: matching geometry and attention-output error in the model's own attention.
const geometryCard = document.querySelector('[data-matching-geometry]');
if (geometryCard) {
  const data = readData(geometryCard);
  const holders = geometryCard.querySelectorAll('.geometry-chart');
  const pow2 = [[1, '1'], [4, '4'], [16, '16'], [64, '64'], [128, '128']];
  lineChart(holders[0], {
    title: 'Matching subspace, dim U⊥',
    label: 'The dimension of the matching subspace falls from about 128 to 0 as prompt or steered tokens are added.',
    x: { domain: [0, 128], ticks: [[0, '0'], [32, '32'], [64, '64'], [96, '96'], [128, '128']], label: 'Tokens', name: 'Tokens', format: fixed(0) },
    y: { domain: [0, 132], ticks: [[0, '0'], [32, '32'], [64, '64'], [96, '96'], [128, '128']], name: 'dim', format: fixed(1) },
    series: [
      { name: 'Steered tokens', color: 'prefix', points: data.a.steering },
      { name: 'Prompt tokens', color: 'prompt', points: data.a.prompt },
    ],
  });
  lineChart(holders[1], {
    title: 'Error vs. distance from U⊥',
    label: 'Attention-output error grows with distance from the matching subspace, faster for sensitive perturbations.',
    x: { domain: [0.05, 50], log: true, ticks: [[0.1, '0.1'], [1, '1'], [10, '10']], label: 'Distance (log)', name: 'Distance', format: sig },
    y: { domain: [0.0005, 5], log: true, ticks: [[0.001, '10⁻³'], [0.01, '10⁻²'], [0.1, '10⁻¹'], [1, '1']], name: 'Error', format: sig },
    series: [
      { name: 'Sensitive', color: 'prefix', points: data.b.sensitive },
      { name: 'Random', color: 'base', points: data.b.random },
    ],
  });
  lineChart(holders[2], {
    title: 'Error vs. token count',
    label: 'Attention-output error tends to grow with the number of prompt or steered tokens.',
    x: { domain: [1, 128], log: true, ticks: pow2, label: 'Tokens (log)', name: 'Tokens', format: fixed(0) },
    y: { domain: [0.05, 12], log: true, ticks: [[0.1, '0.1'], [1, '1'], [10, '10']], name: 'Error', format: sig },
    series: [
      { name: 'Input', color: 'prefix', points: data.c.input },
      { name: 'Input + gen.', color: 'full', points: data.c.input_gen },
      { name: 'Prompt', color: 'prompt', points: data.c.prompt },
    ],
  });
}

// From r to DiM: cosine similarity across layers.
const dimCard = document.querySelector('[data-dim-chart]');
if (dimCard) {
  const rows = readData(dimCard).dim;
  lineChart(dimCard.querySelector('.dim-chart'), {
    width: 440,
    height: 240,
    title: 'Cosine similarity, constructed r vs. DiM',
    label: 'The constructed displacement and the DiM direction have positive cosine similarity, 0.36 to 0.83, at every plotted layer.',
    x: { domain: [0.05, 1.05], ticks: [[0.2, '0.2'], [0.4, '0.4'], [0.6, '0.6'], [0.8, '0.8'], [1, '1.0']], label: 'Relative layer depth ℓ / L', name: 'Depth', format: fixed(1) },
    y: { domain: [0, 1], ticks: [[0, '0'], [0.5, '.5'], [1, '1']], name: 'Cosine', format: fixed(2) },
    series: [{ name: 'OLMo 3 7B', color: 'prefix', points: rows.map((r) => ({ x: r.relative_layer, mean: r.cosine })) }],
  });
}

// One scatter panel of control against capability; marks are drawn in the order given (last on top).
const SCATTER_MARKS = {
  'Prefix-1': { cls: 'sc-mark sc-prefix1', shape: 'circle', r: 4.5 },
  'Prefix-5': { cls: 'sc-mark sc-prefix5', shape: 'circle', r: 4.5 },
  Full: { cls: 'sc-mark sc-full', shape: 'diamond', r: 5.5 },
  Prompting: { cls: 'sc-prompt', shape: 'square', r: 4 },
  Unsteered: { cls: 'sc-base', shape: 'square', r: 4 },
  Other: { cls: 'sc-other', shape: 'circle', r: 3.5 },
};
const niceTicks = (lo, hi, count) => {
  const step = [1, 2, 5, 10, 20, 25].find((s) => (hi - lo) / s <= count) || 50;
  const ticks = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) ticks.push(v);
  return ticks;
};
const scatterPanel = ({ title, label, points, path = [] }) => {
  const W = 240;
  const H = 230;
  const box = { left: 34, right: W - 10, top: 24, bottom: H - 36 };
  const xs = points.map((p) => p.capability);
  const ys = points.map((p) => p.control);
  const xd = [Math.floor(Math.min(...xs) - 1), Math.ceil(Math.max(...xs) + 1)];
  const yd = [Math.max(0, Math.floor((Math.min(...ys) - 6) / 5) * 5), Math.min(100, Math.ceil((Math.max(...ys) + 4) / 5) * 5)];
  const xOf = scaleOf({ domain: xd }, box.left, box.right);
  const yOf = scaleOf({ domain: yd }, box.bottom, box.top);
  const wrap = document.createElement('div');
  wrap.className = 'models-panel';
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'duration-svg', role: 'img', 'aria-label': label }, wrap);
  text(title, { x: 0, y: 12, class: 'dc-title' }, svg);
  niceTicks(yd[0], yd[1], 4).forEach((v) => {
    el('line', { x1: box.left, x2: box.right, y1: yOf(v), y2: yOf(v), class: 'dc-grid' }, svg);
    text(String(v), { x: box.left - 5, y: yOf(v) + 3.5, class: 'dc-tick', 'text-anchor': 'end' }, svg);
  });
  niceTicks(xd[0], xd[1], 4).forEach((v) => text(String(v), { x: xOf(v), y: box.bottom + 15, class: 'dc-tick', 'text-anchor': 'middle' }, svg));
  if (path.length > 1) el('polyline', { points: path.map((p) => `${xOf(p.capability)},${yOf(p.control)}`).join(' '), class: 'mp-path', fill: 'none' }, svg);
  const hits = points.map((p) => {
    const x = xOf(p.capability);
    const y = yOf(p.control);
    const mk = SCATTER_MARKS[p.mark];
    if (mk.shape === 'circle') el('circle', { cx: x, cy: y, r: mk.r, class: mk.cls }, svg);
    else if (mk.shape === 'diamond') el('path', { d: `M${x} ${y - mk.r}L${x + mk.r} ${y}L${x} ${y + mk.r}L${x - mk.r} ${y}Z`, class: mk.cls }, svg);
    else el('rect', { x: x - mk.r, y: y - mk.r, width: mk.r * 2, height: mk.r * 2, class: mk.cls }, svg);
    return { x, y, html: `<strong>${p.name}</strong><span>Control ${p.control.toFixed(1)}</span><span>Capability ${p.capability.toFixed(1)}</span>` };
  });
  const ring = el('circle', { r: 8, class: 'sc-ring', fill: 'none', visibility: 'hidden' }, svg);
  const hit = el('rect', { x: 0, y: 0, width: W, height: box.bottom + 6, class: 'dc-hit', fill: 'transparent' }, svg);
  const tip = makeTooltip();
  wrap.append(tip);
  const hide = () => {
    ring.setAttribute('visibility', 'hidden');
    tip.hidden = true;
  };
  const show = (event) => {
    const [x, fy] = pointerX(event, svg, W);
    const near = hits.reduce((a, b) => (Math.hypot(a.x - x, a.y - fy * H) < Math.hypot(b.x - x, b.y - fy * H) ? a : b));
    if (Math.hypot(near.x - x, near.y - fy * H) > 26) return hide();
    ring.setAttribute('cx', near.x);
    ring.setAttribute('cy', near.y);
    ring.setAttribute('visibility', 'visible');
    placeTooltip(tip, svg, W, near.x, near.html);
    tip.style.top = `${(near.y / H) * 100}%`;
  };
  hit.addEventListener('pointermove', show);
  hit.addEventListener('pointerdown', show);
  hit.addEventListener('pointerleave', hide);
  return wrap;
};

// Models × tasks: pick a task and an operator, compare the four models side by side.
const modelsCard = document.querySelector('[data-models-chart]');
if (modelsCard) {
  const rows = readData(modelsCard).rows;
  const MODELS = [['Qwen3-1.7B', 'Qwen3 1.7B'], ['OLMo3-7B', 'OLMo 3 7B'], ['Qwen3-14B', 'Qwen3 14B'], ['OLMo3-32B', 'OLMo 3 32B']];
  const ORDER = ['Unsteered', 'Prompting', 'Full', 'Prefix-5', 'Prefix-1'];
  const state = { task: 'Safety', operator: 'Additive' };
  const grid = modelsCard.querySelector('.models-grid');
  const draw = () => {
    modelsCard.querySelectorAll('[data-task]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.task === state.task)));
    modelsCard.querySelectorAll('[data-operator]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.operator === state.operator)));
    grid.replaceChildren(...MODELS.map(([key, name]) => {
      const pts = rows
        .filter((r) => r.model === key && r.task === state.task && (r.operator === null || r.operator === state.operator))
        .sort((a, b) => ORDER.indexOf(a.method) - ORDER.indexOf(b.method))
        .map((r) => ({ name: r.operator ? `${r.method} · ${r.operator}` : r.method, mark: r.method, capability: r.general_capability, control: r.behavioral_control }));
      const path = ['Prefix-1', 'Prefix-5', 'Full'].map((m) => pts.find((p) => p.mark === m)).filter(Boolean);
      return scatterPanel({ title: name, label: `${name}, ${state.task}, ${state.operator}: control against capability for each method.`, points: pts, path });
    }));
  };
  modelsCard.querySelectorAll('[data-task]').forEach((b) => b.addEventListener('click', () => { state.task = b.dataset.task; draw(); }));
  modelsCard.querySelectorAll('[data-operator]').forEach((b) => b.addEventListener('click', () => { state.operator = b.dataset.operator; draw(); }));
  draw();
}

// Strength policies: one panel per task, prefix settings against longer or adaptive schedules.
const policyCard = document.querySelector('[data-policy-chart]');
if (policyCard) {
  const { rows } = readData(policyCard);
  const MARK = { 'Prefix-1': 'Prefix-1', 'Prefix-5': 'Prefix-5', Full: 'Full' };
  const ORDER = ['Linear Decay', 'Exponential Decay', 'DAS', 'ACT', 'Full', 'Prefix-5', 'Prefix-1'];
  policyCard.querySelector('.policy-grid').replaceChildren(...rows.map((row) => scatterPanel({
    title: row.task,
    label: `${row.task}: control against ${row.metric} capability for each strength policy.`,
    points: [...row.cells]
      .sort((a, b) => ORDER.indexOf(a.method) - ORDER.indexOf(b.method))
      .map((c) => ({ name: c.method, mark: MARK[c.method] || 'Other', capability: c.capability, control: c.control })),
  })));
}

// Attention arc from the steered position to the token or answer it shapes.
const drawConnector = (transcript) => {
  const from = transcript.querySelector('[data-connector-from]');
  const to = transcript.querySelector('[data-connector-to]');
  if (!from || !to) return;
  transcript.querySelector('.attention-arc')?.remove();
  const base = transcript.getBoundingClientRect();
  if (!base.width) return;
  const a = from.getBoundingClientRect();
  const b = to.getBoundingClientRect();
  const svg = el('svg', { class: 'attention-arc', width: base.width, height: base.height, 'aria-hidden': 'true' });
  const defs = el('defs', {}, svg);
  const marker = el('marker', { id: `arc-head-${Math.round(b.top)}`, viewBox: '0 0 8 8', refX: 6, refY: 4, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, defs);
  el('path', { d: 'M0 0L8 4L0 8Z', class: 'arc-head' }, marker);
  let d;
  let label;
  if (b.top - a.bottom < 60) {
    // Next line: a short drop from the steered position to the token it shapes at once.
    const x1 = a.left + a.width / 2 - base.left;
    const y1 = a.bottom - base.top + 1;
    const x2 = b.left + Math.min(b.width / 2, 18) - base.left;
    const y2 = b.top - base.top - 3;
    d = `M${x1} ${y1} C${x1} ${y1 + 26} ${x2} ${y2 - 26} ${x2} ${y2}`;
    label = { x: Math.max(x1, x2) + 10, y: (y1 + y2) / 2 + 4, anchor: 'start' };
  } else {
    // Far below: route through the right gutter, past the omitted reasoning.
    const x1 = a.right - base.left + 4;
    const y1 = a.top + a.height / 2 - base.top;
    const x2 = b.right - base.left + 6;
    const y2 = b.top + b.height / 2 - base.top;
    const bulge = base.width - 6;
    d = `M${x1} ${y1} C${bulge} ${y1} ${bulge} ${y2} ${x2} ${y2}`;
    label = { x: bulge - 8, y: (y1 + y2) / 2, anchor: 'end' };
  }
  el('path', { d, class: 'arc-line', fill: 'none', 'marker-end': `url(#arc-head-${Math.round(b.top)})` }, svg);
  text('attention', { x: label.x, y: label.y, class: 'arc-label', 'text-anchor': label.anchor }, svg);
  transcript.append(svg);
};

// Carousels: buttons, arrow keys, and horizontal swipes; slides share one grid cell so height stays put.
document.querySelectorAll('[data-carousel]').forEach((card) => {
  const slides = [...card.querySelectorAll('.carousel-slide')];
  const index = card.querySelector('[data-carousel-index]');
  card.querySelector('[data-carousel-total]').textContent = String(slides.length);
  let current = 0;
  const show = (i) => {
    current = (i + slides.length) % slides.length;
    slides.forEach((slide, k) => {
      slide.hidden = false;
      slide.toggleAttribute('data-inactive', k !== current);
      slide.setAttribute('aria-hidden', String(k !== current));
    });
    index.textContent = String(current + 1);
    slides[current].querySelectorAll('[data-connector]').forEach(drawConnector);
  };
  card.querySelectorAll('[data-carousel-step]').forEach((b) => b.addEventListener('click', () => show(current + Number(b.dataset.carouselStep))));
  card.tabIndex = 0;
  card.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') show(current + 1);
    if (event.key === 'ArrowLeft') show(current - 1);
  });
  let startX = null;
  const area = card.querySelector('.carousel-slides');
  area.style.touchAction = 'pan-y';
  area.addEventListener('pointerdown', (event) => { if (event.pointerType !== 'mouse') startX = event.clientX; });
  area.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const dx = event.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
  });
  const redraw = () => card.querySelectorAll('.carousel-slide:not([data-inactive]) [data-connector]').forEach(drawConnector);
  if ('ResizeObserver' in window) new ResizeObserver(redraw).observe(card);
  document.fonts?.ready.then(redraw);
  show(0);
});
