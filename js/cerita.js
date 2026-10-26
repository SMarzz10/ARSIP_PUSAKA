(function () {
  "use strict";

  const APP = window.ARSIP_APP;
  const stories = window.ARSIP_DATA.stories;
  const grid = document.querySelector("#story-list");
  const empty = document.querySelector("#story-empty");
  const reader = document.querySelector("#story-reader");
  const seenStorageKey = "arsipPusaka:read-stories";
  let activeType = "Semua";
  let activeStory = null;
  let activeChapter = 0;
  let touchStartX = null;

  function readStories() {
    const session = APP.getSession();
    const key = session ? APP.accountKey(seenStorageKey, session.username) : seenStorageKey + ":guest";
    return { key: key, ids: APP.read(key, []) };
  }

  function renderCard(story, readIds) {
    const article = document.createElement("article");
    article.className = "story-card";
    const art = document.createElement("div");
    art.className = "story-card__art";
    const letter = document.createElement("span");
    letter.className = "story-card__letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = story.title.slice(0, 1);
    const region = document.createElement("span");
    region.className = "story-card__region";
    region.textContent = story.region;
    art.append(letter, region);
    const body = document.createElement("div");
    body.className = "story-card__body";
    const kind = document.createElement("span");
    kind.className = "story-card__kind";
    kind.textContent = story.type;
    const title = document.createElement("h2");
    title.textContent = story.title;
    const summary = document.createElement("p");
    summary.textContent = story.summary;
    const meta = document.createElement("div");
    meta.className = "story-card__meta";
    const version = document.createElement("span");
    version.textContent = story.version;
    const runtime = document.createElement("span");
    runtime.textContent = story.minutes + " menit";
    meta.append(version, runtime);
    const action = document.createElement("button");
    action.type = "button";
    action.className = "story-card__read";
    action.textContent = "Baca cerita →";
    action.addEventListener("click", function () { openStory(story, 0); });
    body.append(kind, title, summary, meta, action);
    if (readIds.includes(story.id)) {
      const badge = document.createElement("span");
      badge.className = "read-badge";
      badge.textContent = "✓ Sudah dibaca";
      meta.append(badge);
    }
    article.append(art, body);
    return article;
  }

  function renderList() {
    const query = document.querySelector("#story-search").value.trim().toLocaleLowerCase("id");
    const region = document.querySelector("#story-region").value;
    const readState = readStories();
    const filtered = stories.filter(function (story) {
      const typeMatches = activeType === "Semua" || story.type === activeType;
      const regionMatches = region === "Semua daerah" || story.region.includes(region);
      const searchText = [story.title, story.type, story.region, story.summary, story.version].join(" ").toLocaleLowerCase("id");
      return typeMatches && regionMatches && searchText.includes(query);
    });
    grid.replaceChildren();
    filtered.forEach(function (story) { grid.append(renderCard(story, readState.ids)); });
    empty.hidden = filtered.length > 0;
    document.querySelector("#story-count").textContent = filtered.length + " cerita";
  }

  function renderReader() {
    if (!activeStory) return;
    const isLast = activeChapter === activeStory.chapters.length - 1;
    document.querySelector("#reader-title").textContent = activeStory.title;
    document.querySelector("#reader-type").textContent = activeStory.type + " · " + activeStory.region + " · " + activeStory.version;
    document.querySelector("#reader-position").textContent = "Babak " + (activeChapter + 1) + " dari " + activeStory.chapters.length;
    document.querySelector("#reader-progress").max = activeStory.chapters.length;
    document.querySelector("#reader-progress").value = activeChapter + 1;
    document.querySelector("#reader-letter").textContent = activeStory.title.charAt(0);
    document.querySelector("#reader-chapter").textContent = activeStory.chapters[activeChapter];
    document.querySelector("#reader-meaning").hidden = !isLast;
    document.querySelector("#reader-sources").replaceChildren();
    document.querySelector("#reader-meaning-text").textContent = activeStory.meaning;
    activeStory.sources.forEach(function (source) {
      const item = document.createElement("li");
      item.textContent = source;
      document.querySelector("#reader-sources").append(item);
    });
    document.querySelector("#reader-back").disabled = activeChapter === 0;
    document.querySelector("#reader-next").textContent = isLast ? "Tutup cerita" : "Babak berikutnya →";
    document.querySelector("#reader-back").hidden = false;
    document.querySelector("#reader-next").hidden = isLast;
    document.querySelector("#reader-finish").hidden = !isLast;
    document.querySelector("#reader-stage").setAttribute("aria-label", "Babak " + (activeChapter + 1) + ": " + activeStory.title);
  }

  function openStory(story, chapter) {
    activeStory = story;
    activeChapter = chapter;
    renderReader();
    if (!reader.open) reader.showModal();
    document.querySelector("#reader-next").focus();
  }

  function moveChapter(direction) {
    if (!activeStory) return;
    const next = activeChapter + direction;
    if (next < 0 || next >= activeStory.chapters.length) return;
    activeChapter = next;
    renderReader();
    const nextButton = document.querySelector("#reader-next");
    (nextButton.hidden ? document.querySelector("#reader-back") : nextButton).focus();
  }

  function finishReading() {
    if (!activeStory) return;
    const state = readStories();
    if (!state.ids.includes(activeStory.id)) {
      state.ids.push(activeStory.id);
      if (!APP.write(state.key, state.ids)) return;
    }
    reader.close();
    APP.notify("Cerita ditandai sudah dibaca di perangkat ini.", "success");
    renderList();
  }

  document.querySelector("#story-search").addEventListener("input", renderList);
  document.querySelector("#story-region").addEventListener("change", renderList);
  document.querySelectorAll("[data-story-type]").forEach(function (button) {
    button.addEventListener("click", function () {
      activeType = button.dataset.storyType;
      document.querySelectorAll("[data-story-type]").forEach(function (filter) {
        filter.setAttribute("aria-pressed", String(filter === button));
      });
      renderList();
    });
  });
  document.querySelector("#random-story").addEventListener("click", function () {
    const query = document.querySelector("#story-search").value.trim().toLocaleLowerCase("id");
    const region = document.querySelector("#story-region").value;
    const available = stories.filter(function (story) {
      return (activeType === "Semua" || story.type === activeType)
        && (region === "Semua daerah" || story.region.includes(region))
        && [story.title, story.type, story.region, story.summary].join(" ").toLocaleLowerCase("id").includes(query);
    });
    if (!available.length) {
      APP.notify("Tidak ada cerita yang cocok untuk dipilih acak. Ubah filter atau kata pencarian.", "info");
      return;
    }
    openStory(available[Math.floor(Math.random() * available.length)], 0);
  });
  document.querySelector("#reader-back").addEventListener("click", function () { moveChapter(-1); });
  document.querySelector("#reader-next").addEventListener("click", function () {
    if (activeChapter === activeStory.chapters.length - 1) reader.close();
    else moveChapter(1);
  });
  document.querySelector("#reader-finish").addEventListener("click", finishReading);
  document.querySelector("#reader-close").addEventListener("click", function () { reader.close(); });
  document.querySelector("#story-stage").addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  document.querySelector("#story-stage").addEventListener("touchend", function (event) {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].screenX - touchStartX;
    touchStartX = null;
    if (Math.abs(delta) < 45) return;
    if (delta < 0) moveChapter(1);
    else moveChapter(-1);
  }, { passive: true });
  reader.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") moveChapter(1);
    if (event.key === "ArrowLeft") moveChapter(-1);
  });
  reader.addEventListener("click", function (event) {
    if (event.target === reader) reader.close();
  });
  document.addEventListener("arsip:authchange", renderList);
  renderList();
})();
