// Comments by giscus (https://giscus.app): each post's thread is a GitHub Discussion in the site's repository.
// The widget is fetched when the reader gets near the comments, and it follows the site's light or dark theme.
const holder = document.querySelector("[data-comments]");

if (holder) {
  const root = document.documentElement;
  const giscusOrigin = "https://giscus.app";
  const errorLine = document.querySelector("#comments-error");
  const siteTheme = () => (root.dataset.theme === "dark" ? "dark" : "light");
  let startTheme = null; // the theme giscus starts its frame with, and again when it reloads the frame on sign-out
  let themeMoved = false; // the site theme has differed from startTheme, so a frame may need to be told
  let listening = false; // the frame has sent a message, so it is there to receive ours
  let silenceTimer = null;

  // Tell the frame the site's theme. This runs on a theme change and on every message from the frame:
  // a frame that has just loaded or reloaded announces itself with a message and gets the current theme back.
  // The frame sends messages only for its height, sign-out, and errors, so an answer never starts a loop.
  const sendTheme = () => {
    const frame = holder.querySelector("iframe.giscus-frame");
    if (siteTheme() !== startTheme) themeMoved = true;
    if (!listening || !frame || !themeMoved) return;
    frame.contentWindow.postMessage({ giscus: { setConfig: { theme: siteTheme() } } }, giscusOrigin);
  };

  window.addEventListener("message", (event) => {
    if (event.origin !== giscusOrigin) return;
    listening = true;
    clearTimeout(silenceTimer);
    errorLine.hidden = true;
    sendTheme();
  });
  new MutationObserver(sendTheme).observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  const load = () => {
    startTheme = siteTheme();
    // A thread links back to its post. Name the live address, or a first comment written from a local preview
    // would leave a localhost link in the thread for good.
    const backlink = document.createElement("meta");
    backlink.name = "giscus:backlink";
    backlink.content = holder.dataset.backlink;
    document.head.append(backlink);

    const script = document.createElement("script");
    script.src = `${giscusOrigin}/client.js`;
    script.async = true;
    script.crossOrigin = "anonymous";
    // The thread belongs to the post's own address (term), matched exactly (strict): the post keeps its thread
    // when it is opened through another address, and posts with similar addresses cannot share one.
    Object.assign(script.dataset, {
      repo: holder.dataset.repo,
      repoId: holder.dataset.repoId,
      category: holder.dataset.category,
      categoryId: holder.dataset.categoryId,
      mapping: "specific",
      term: holder.dataset.term,
      strict: "1",
      theme: startTheme,
      lang: holder.dataset.lang,
    });
    const showError = () => {
      errorLine.hidden = false;
    };
    script.addEventListener("error", showError);
    // The frame can fail while the script loads fine (a site that giscus.json does not list, a blocked frame);
    // it then never sends a message.
    silenceTimer = setTimeout(showError, 10000);
    // client.js puts its frame into the element with the class "giscus", which is the holder.
    document.body.append(script);
  };

  if (new URLSearchParams(location.search).has("giscus")) {
    // Back from GitHub's sign-in page, at #comments: load now, so that giscus keeps the session and
    // takes it out of the address.
    load();
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
