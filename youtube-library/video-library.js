(function () {
  "use strict";

  const config = window.YEAR_10_METAL_VIDEO_LIBRARY || {};
  const groupsHost = document.getElementById("video-groups");
  const emptyState = document.getElementById("empty-state");
  const modal = document.getElementById("video-modal");
  const playerFrame = document.getElementById("player-frame");
  const modalTitle = document.getElementById("modal-title");
  const modalFallbackHost = document.getElementById("modal-fallback-host");
  const closeButton = document.getElementById("close-button");
  let returnFocus = null;

  function text(value) {
    return String(value ?? "");
  }

  function make(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content !== undefined) element.textContent = content;
    return element;
  }

  function validVideos(videos) {
    const required = ["project", "projectId", "module", "theoryTitle", "videoId", "sourceUrl", "title", "channel", "overview", "watchFor", "rationale"];
    const seen = new Set();
    return videos.filter((video, index) => {
      const missing = required.filter((field) => !text(video[field]).trim());
      const validId = /^[A-Za-z0-9_-]{11}$/.test(text(video.videoId));
      const canonicalUrl = video.sourceUrl === `https://www.youtube.com/watch?v=${video.videoId}`;
      const duplicate = seen.has(video.videoId);
      if (missing.length || !validId || !canonicalUrl || duplicate) {
        console.warn("Video learning entry rejected", { index, missing, validId, canonicalUrl, duplicate });
        return false;
      }
      seen.add(video.videoId);
      return true;
    });
  }

  function externalLink(video, label) {
    const link = make("a", "button", label);
    link.href = video.sourceUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }

  function openModal(video, trigger) {
    returnFocus = trigger || document.activeElement;
    modalTitle.textContent = video.title;
    modalFallbackHost.replaceChildren(externalLink(video, "non-embed YouTube link"));
    playerFrame.src = `https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    playerFrame.src = "about:blank";
    modalFallbackHost.replaceChildren();
    document.body.style.overflow = "";
    if (returnFocus && typeof returnFocus.focus === "function") returnFocus.focus();
  }

  function renderCard(video) {
    const article = make("article", "video-card");
    article.id = `clip-${video.videoId}`;

    const media = make("div", "video-media");
    const thumb = make("button", "thumbnail-button");
    thumb.type = "button";
    thumb.setAttribute("aria-label", `Play ${video.title} from ${video.channel}`);
    const image = document.createElement("img");
    image.src = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
    image.alt = `Thumbnail for ${video.title}`;
    image.loading = "lazy";
    const badge = make("span", "play-badge", "Play");
    thumb.append(image, badge);
    thumb.addEventListener("click", () => openModal(video, thumb));
    media.append(thumb);

    const content = make("div", "video-content");
    content.append(
      make("p", "module-label", video.module),
      make("h3", "", video.title),
      make("p", "channel", `Channel: ${video.channel}`)
    );
    const theory = make("p", "theory-link");
    theory.append(make("strong", "", "Adjacent theory: "), document.createTextNode(video.theoryTitle));
    content.append(theory, make("p", "overview", video.overview));

    const watch = make("div", "watch-for");
    watch.append(make("strong", "", "Watch for"), make("p", "", video.watchFor));
    content.append(watch);

    const rationale = make("details", "rationale");
    rationale.append(make("summary", "", "Why this clip was selected"), make("p", "", video.rationale));
    content.append(rationale);

    const actions = make("div", "actions");
    const play = make("button", "button primary", "Play privacy-enhanced embed");
    play.type = "button";
    play.addEventListener("click", () => openModal(video, play));
    actions.append(play, externalLink(video, "Open on YouTube (fallback)"));
    content.append(actions);

    article.append(media, content);
    return article;
  }

  function render() {
    const videos = validVideos(Array.isArray(config.videos) ? config.videos : []);
    emptyState.hidden = videos.length > 0;
    const projects = [...new Set(videos.map((video) => video.projectId))];
    projects.forEach((projectId) => {
      const projectVideos = videos.filter((video) => video.projectId === projectId);
      const section = make("section", "project-group");
      section.id = projectId;
      section.append(make("h2", "project-heading", projectVideos[0].project));
      const grid = make("div", "video-grid");
      projectVideos.forEach((video) => grid.append(renderCard(video)));
      section.append(grid);
      groupsHost.append(section);
    });
  }

  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  window.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal.classList.contains("open")) closeModal(); });
  render();
})();
