import { plotlyDarkLayout, plotlyLightLayout } from "./theme.js";

const plotlyBlocks = document.querySelectorAll("pre > code.language-plotly");

if (plotlyBlocks.length > 0) {
  if (!window.Plotly) {
    console.error("Plotly could not render because the library failed to load.");
  } else {
    const template = document.documentElement.dataset.theme === "dark"
      ? plotlyDarkLayout
      : plotlyLightLayout;

    plotlyBlocks.forEach((block) => {
      const figure = JSON.parse(block.textContent);
      const source = block.parentElement;
      const chart = document.createElement("div");

      source.hidden = true;
      source.after(chart);
      figure.layout = figure.layout || {};
      figure.layout.template = figure.layout.template
        ? { ...template, ...figure.layout.template }
        : template;

      window.Plotly.react(chart, figure.data, figure.layout);
    });
  }
}
