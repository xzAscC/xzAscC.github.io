// Comments by giscus (https://giscus.app): each post's thread is a GitHub Discussion in the site's repository.
// The widget is fetched when the reader gets near the comments, and it follows the site's light or dark theme.
const holder = document.querySelector("[data-comments]");

if (holder) {
  const root = document.documentElement;
  const giscusOrigin = "https://giscus.app";
  const siteTheme = () => (root.dataset.theme === "dark" ? "dark" : "light");
  let ready = false; // the frame has sent its first message, so it can receive ours
  let shownTheme = null; // the theme the widget shows now

  const syncTheme = () => {
    const frame = holder.querySelector("iframe.giscus-frame");
    if (!ready || !frame || shownTheme === siteTheme()) return;
    shownTheme = siteTheme();
    frame.contentWindow.postMessage({ giscus: { setConfig: { theme: shownTheme } } }, giscusOrigin);
  };

  window.addEventListener("message", (event) => {
    if (event.origin !== giscusOrigin) return;
    ready = true;
    syncTheme(); // the theme may have changed while the frame was loading
  });
  new MutationObserver(syncTheme).observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  const load = () => {
    shownTheme = siteTheme();
    const script = document.createElement("script");
    script.src = `${giscusOrigin}/client.js`;
    script.async = true;
    script.crossOrigin = "anonymous";
    // pathname + strict: one thread per post URL, matched exactly, so similar addresses cannot share a thread.
    Object.assign(script.dataset, {
      repo: holder.dataset.repo,
      repoId: holder.dataset.repoId,
      category: holder.dataset.category,
      categoryId: holder.dataset.categoryId,
      mapping: "pathname",
      strict: "1",
      reactionsEnabled: "1",
      emitMetadata: "0",
      inputPosition: "bottom",
      theme: shownTheme,
      lang: holder.dataset.lang,
    });
    script.addEventListener("error", () => {
      document.querySelector("#comments-error").hidden = false;
    });
    // client.js puts its frame into the element with the class "giscus", which is the holder.
    document.body.append(script);
  };

  if (new URLSearchParams(location.search).has("giscus")) {
    // Back from GitHub's sign-in page, which returns to the top of the post: load now and go to the comments.
    load();
    holder.scrollIntoView();
  } else if ("IntersectionObserver" in window) {
    // Otherwise fetch the widget only when the reader is within one screen of the comments.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          load();
        }
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(holder);
  } else {
    load();
  }
}
