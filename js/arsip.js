(function () {
  "use strict";

  const APP = window.ARSIP_APP;
  const DATA = window.ARSIP_DATA;
  const STORAGE_KEY = "arsipPusaka:documents";
  const grid = document.querySelector("#archive-list");
  const empty = document.querySelector("#archive-empty");
  const panel = document.querySelector("#archive-personal");
  const uploadPanel = document.querySelector("#upload-panel");
  const form = document.querySelector("#upload-form");
  let activeTab = "community";
  let activeCategory = "Semua";

  // Data arsip dimuat dari penyimpanan lokal; isi awal berasal dari data demo.
  function documents() {
    const stored = APP.read(STORAGE_KEY, null);
    if (!Array.isArray(stored)) {
      APP.write(STORAGE_KEY, DATA.archiveItems.slice());
      return DATA.archiveItems.slice();
    }
    // Pastikan data demo di penyimpanan lokal memiliki properti terbaru (seperti gambar).
    let updated = false;
    const synced = stored.map(function (item) {
      if (!item.demo) return item;
      const original = DATA.archiveItems.find(function (demo) { return demo.id === item.id; });
      if (original && original.image && item.image !== original.image) {
        updated = true;
        return Object.assign({}, item, { image: original.image });
      }
      return item;
    });
    if (updated) APP.write(STORAGE_KEY, synced);
    return synced;
  }

  // Membentuk kartu arsip tanpa menyisipkan teks pengguna sebagai HTML.
  function renderArchiveCard(item, mine) {
    const article = document.createElement("article");
    article.className = "archive-card";
    article.dataset.category = item.category;

    if (item.image) {
      const media = document.createElement("div");
      media.className = "archive-card__media";
      const img = document.createElement("img");
      img.className = "archive-card__image";
      img.src = item.image;
      img.alt = "Ilustrasi " + item.title;
      img.loading = "lazy";
      media.append(img);
      article.append(media);
    }

    const body = document.createElement("div");
    body.className = "archive-card__body";

    const top = document.createElement("div");
    top.className = "archive-card__top";
    const category = document.createElement("span");
    category.className = "category-tag";
    category.textContent = item.category;
    const mark = document.createElement("span");
    mark.className = "archive-card__mark";
    mark.textContent = item.demo ? "CONTOH" : "DIARSIPKAN";
    top.append(category, mark);

    const title = document.createElement("h3");
    title.textContent = item.title;
    const description = document.createElement("p");
    description.className = "archive-card__description";
    description.textContent = item.description;

    const meta = document.createElement("div");
    meta.className = "archive-meta";
    meta.textContent = item.origin + " · " + item.username;
    const source = document.createElement("p");
    source.className = "field__hint";
    source.textContent = "Sumber: " + item.source;
    const foot = document.createElement("div");
    foot.className = "archive-card__foot";
    const date = document.createElement("span");
    date.textContent = APP.formatDate(item.date);
    foot.append(date);
    if (item.fileName) {
      const fileName = document.createElement("span");
      fileName.className = "archive-card__file";
      fileName.title = "Nama berkas dicatat lokal; berkas tidak diunggah";
      fileName.textContent = item.fileName;
      foot.append(fileName);
    }
    if (mine && !item.demo) {
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Hapus";
      remove.setAttribute("aria-label", "Hapus unggahan " + item.title);
      remove.addEventListener("click", function () {
        const session = APP.getSession();
        if (!session) return;
        APP.confirm({
          title: "Hapus Metadata?",
          message: "Hapus metadata unggahan “" + item.title + "” dari browser ini?",
          hint: "Tindakan ini menghapus catatan dari penyimpanan perangkat ini.",
          okText: "Hapus",
          cancelText: "Batal",
          tone: "danger"
        }).then(function (confirmed) {
          if (!confirmed) return;
          const remaining = documents().filter(function (documentItem) {
            return documentItem.id !== item.id || documentItem.username.toLowerCase() !== session.username.toLowerCase();
          });
          if (APP.write(STORAGE_KEY, remaining)) {
            APP.notify("Metadata unggahan telah dihapus dari perangkat ini.", "success");
            render();
          }
        });
      });
      foot.append(remove);
    }
    body.append(top, title, description, meta, source, foot);
    article.append(body);
    return article;
  }

  // Riwayat kuis akun ditampilkan sebagai salah satu isi Arsip Saya.
  function renderScoreList(container, session) {
    const scores = session
      ? APP.read(APP.accountKey("arsipPusaka:quiz-history", session.username), [])
      : [];
    container.replaceChildren();
    const heading = document.createElement("h3");
    heading.textContent = "Skor kuis saya";
    container.append(heading);
    if (!scores.length) {
      const message = document.createElement("p");
      message.className = "empty-state";
      message.textContent = "Belum ada skor. Selesaikan kuis untuk menyimpan riwayat di akun demo ini.";
      container.append(message);
      return;
    }
    const list = document.createElement("ul");
    list.className = "quiz-review-list";
    scores.slice().reverse().forEach(function (score) {
      const item = document.createElement("li");
      item.textContent = score.score + "/100 · " + score.correct + " jawaban benar · " + APP.formatTime(score.seconds) + " · " + APP.formatDate(score.date);
      list.append(item);
    });
    container.append(list);
  }

  // Menyelaraskan tab, filter, unggahan, dan konten arsip yang terlihat.
  function render() {
    if (!grid || !empty) return;
    const session = APP.getSession();
    const docs = documents();
    const search = (document.querySelector("#archive-search")?.value || "").trim().toLocaleLowerCase("id");
    grid.replaceChildren();

    panel.hidden = activeTab !== "personal";
    document.querySelector("#archive-community-view").hidden = activeTab !== "community";
    grid.hidden = activeTab !== "community";
    document.querySelectorAll("[data-archive-tab]").forEach(function (tab) {
      tab.setAttribute("aria-selected", String(tab.dataset.archiveTab === activeTab));
    });
    uploadPanel.hidden = uploadPanel.dataset.open !== "true";

    if (activeTab === "community") {
      const visible = docs.filter(function (item) {
        const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
        const text = [item.title, item.origin, item.description, item.source, item.username].join(" ").toLocaleLowerCase("id");
        return matchesCategory && text.includes(search);
      }).sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
      visible.forEach(function (item) { grid.append(renderArchiveCard(item, false)); });
      empty.hidden = visible.length > 0;
      return;
    }

    empty.hidden = true;
    grid.hidden = true;
    const personalList = document.querySelector("#personal-uploads");
    const personalScores = document.querySelector("#personal-scores");
    personalList.hidden = document.querySelector("[data-personal-view='scores']").getAttribute("aria-selected") === "true";
    personalScores.hidden = !personalList.hidden;
    if (!session) {
      document.querySelector("#personal-gate").hidden = false;
      personalList.replaceChildren();
      personalScores.replaceChildren();
      return;
    }
    document.querySelector("#personal-gate").hidden = true;
    if (!personalList.hidden) {
      const owned = docs.filter(function (item) {
        return !item.demo && item.username.toLowerCase() === session.username.toLowerCase();
      }).sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
      personalList.replaceChildren();
      owned.forEach(function (item) { personalList.append(renderArchiveCard(item, true)); });
      if (!owned.length) {
        const message = document.createElement("p");
        message.className = "empty-state";
        message.textContent = "Belum ada unggahan atas nama @" + session.username + ". Mulai dengan mencatat pengetahuan dari lingkunganmu.";
        personalList.append(message);
      }
    } else {
      renderScoreList(personalScores, session);
    }
  }

  // Interaksi tab, pencarian, filter, dan formulir metadata unggahan.
  document.querySelectorAll("[data-archive-tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      if (tab.dataset.archiveTab === "personal" && !APP.requireAccount("Masuk untuk melihat unggahan dan riwayat skor akun demo.")) {
        activeTab = "personal";
      } else {
        activeTab = tab.dataset.archiveTab;
      }
      grid.hidden = activeTab !== "community";
      render();
    });
  });

  document.querySelectorAll("[data-personal-view]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll("[data-personal-view]").forEach(function (button) {
        button.setAttribute("aria-selected", String(button === tab));
      });
      render();
    });
  });

  document.querySelectorAll("[data-category-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      activeCategory = button.dataset.categoryFilter;
      document.querySelectorAll("[data-category-filter]").forEach(function (filter) {
        filter.setAttribute("aria-pressed", String(filter === button));
      });
      render();
    });
  });
  document.querySelector("#archive-search").addEventListener("input", render);

  document.querySelector("#open-upload").addEventListener("click", function () {
    if (!APP.requireAccount("Masuk diperlukan sebelum metadata arsip dapat disimpan.")) return;
    uploadPanel.dataset.open = String(uploadPanel.dataset.open !== "true");
    render();
    if (uploadPanel.dataset.open === "true") {
      uploadPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      document.querySelector("#upload-title").focus({ preventScroll: true });
    }
  });

  document.querySelector("#cancel-upload").addEventListener("click", function () {
    uploadPanel.dataset.open = "false";
    form.reset();
    document.querySelector("#upload-character-count").textContent = "0 / 400 karakter";
    document.querySelector("#upload-source").setCustomValidity("");
    render();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!APP.requireAccount("Masuk untuk menyimpan metadata unggahan.")) return;
    if (!form.reportValidity()) return;
    const session = APP.getSession();
    const file = document.querySelector("#upload-file").files[0] || null;
    const description = document.querySelector("#upload-description");
    const source = document.querySelector("#upload-source");
    if ((description.value.trim().length + source.value.trim().length) > 400) {
      source.setCustomValidity("Gabungan deskripsi dan sumber maksimal 400 karakter.");
      source.reportValidity();
      source.focus();
      return;
    }
    source.setCustomValidity("");
    const entry = {
      id: window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : "upload-" + Date.now() + "-" + Math.random().toString(16).slice(2),
      title: document.querySelector("#upload-title").value.trim(),
      category: document.querySelector("#upload-category").value,
      origin: document.querySelector("#upload-origin").value.trim(),
      description: description.value.trim(),
      source: source.value.trim(),
      username: session.username,
      date: new Date().toISOString(),
      demo: false,
      fileName: file ? file.name : "",
      fileType: file ? file.type : "",
      fileSize: file ? file.size : 0,
      permission: document.querySelector("#upload-permission").checked
    };
    if (!entry.permission) {
      document.querySelector("#upload-permission").focus();
      return;
    }
    const docs = documents();
    docs.push(entry);
    if (!APP.write(STORAGE_KEY, docs)) return;
    form.reset();
    uploadPanel.dataset.open = "false";
    activeTab = "personal";
    document.querySelector("#personal-gate").hidden = true;
    grid.hidden = true;
    APP.notify("Metadata arsip telah dicatat di browser ini. Berkas tidak dikirim ke server.", "success");
    render();
  });

  document.querySelectorAll("#upload-description, #upload-source").forEach(function (field) {
    field.addEventListener("input", function () {
      const description = document.querySelector("#upload-description").value.trim();
      const source = document.querySelector("#upload-source").value.trim();
      const count = description.length + source.length;
      document.querySelector("#upload-character-count").textContent = count + " / 400 karakter";
      document.querySelector("#upload-source").setCustomValidity(count > 400 ? "Gabungan deskripsi dan sumber maksimal 400 karakter." : "");
    });
  });

  document.addEventListener("arsip:authchange", render);
  render();
})();
