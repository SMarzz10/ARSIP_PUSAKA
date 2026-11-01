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
  const detailDialog = document.querySelector("#archive-detail");
  const detailClose = document.querySelector("#detail-close");
  const detailCloseBtn = document.querySelector("#detail-close-btn");
  let activeTab = "community";
  let activeCategory = "Semua";
  let savingUpload = false;

  // Foto unggahan diperkecil dan dikompres agar muat disimpan di browser ini.
  const MAX_IMAGE_WIDTH = 1000;
  const IMAGE_QUALITY = 0.72;
  const previewBox = document.querySelector("#upload-preview");
  const previewImage = document.querySelector("#upload-preview-image");
  let previewUrl = "";

  // Pratinjau langsung saat berkas dipilih agar foto terlihat sebelum disimpan.
  function showFilePreview(file) {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      previewUrl = "";
    }
    if (!previewBox || !previewImage) return;
    if (!file || !/^image\//.test(file.type)) {
      previewBox.hidden = true;
      previewImage.removeAttribute("src");
      return;
    }
    previewUrl = URL.createObjectURL(file);
    previewImage.src = previewUrl;
    previewBox.hidden = false;
  }

  function fileToImage(file) {
    return new Promise(function (resolve) {
      if (!file || !/^image\//.test(file.type) || /svg/.test(file.type)) {
        resolve("");
        return;
      }
      const reader = new FileReader();
      reader.onerror = function () { resolve(""); };
      reader.onload = function () {
        const image = new Image();
        image.onerror = function () { resolve(""); };
        image.onload = function () {
          const scale = Math.min(1, MAX_IMAGE_WIDTH / image.width);
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(image.width * scale));
          canvas.height = Math.max(1, Math.round(image.height * scale));
          const context = canvas.getContext("2d");
          if (!context) { resolve(""); return; }
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", IMAGE_QUALITY));
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

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
        item.image = original.image;
      }
      if (original && original.fullDescription && item.fullDescription !== original.fullDescription) {
        updated = true;
        item.fullDescription = original.fullDescription;
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
      img.alt = (item.demo ? "Ilustrasi " : "Foto arsip ") + item.title;
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
    
    const readMore = document.createElement("button");
    readMore.type = "button";
    readMore.className = "archive-card__read-more";
    readMore.textContent = "Selengkapnya";
    readMore.addEventListener("click", function () { openArchiveDetail(item); });

    const foot = document.createElement("div");
    foot.className = "archive-card__foot";
    const date = document.createElement("span");
    date.textContent = APP.formatDate(item.date);
    foot.append(date);
    if (item.fileName) {
      const fileName = document.createElement("span");
      fileName.className = "archive-card__file";
      fileName.title = "Berkas asli tidak diunggah; fotonya disimpan di browser ini";
      fileName.textContent = item.fileName;
      foot.append(fileName);
    }
    if (mine && !item.demo) {
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Hapus";
      remove.setAttribute("aria-label", "Hapus unggahan " + item.title);
      remove.addEventListener("click", function (e) {
        e.stopPropagation();
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
    body.append(top, title, description, meta, source, readMore, foot);
    article.append(body);
    return article;
  }

  function openArchiveDetail(item) {
    if (!detailDialog) return;
    document.querySelector("#detail-category").textContent = item.category;
    document.querySelector("#detail-title").textContent = item.title;
    document.querySelector("#detail-meta").textContent = item.origin + " · @" + item.username;
    document.querySelector("#detail-description").textContent = item.fullDescription || item.description;
    document.querySelector("#detail-source").textContent = item.source;
    document.querySelector("#detail-date").textContent = "Diarsipkan pada " + APP.formatDate(item.date);
    
    const fileEl = document.querySelector("#detail-file");
    fileEl.textContent = item.fileName ? "Berkas: " + item.fileName : "";
    
    const media = document.querySelector("#detail-media");
    media.replaceChildren();
    if (item.image) {
      const img = document.createElement("img");
      img.className = "archive-detail__image";
      img.src = item.image;
      img.alt = item.title;
      media.append(img);
      media.hidden = false;
    } else {
      media.hidden = true;
    }
    
    detailDialog.showModal();
    detailDialog.scrollTop = 0;
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
    if (!session) {
      document.querySelector("#personal-gate").hidden = false;
      personalList.hidden = true;
      personalList.replaceChildren();
      return;
    }
    document.querySelector("#personal-gate").hidden = true;
    personalList.hidden = false;
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

  if (detailClose) {
    detailClose.addEventListener("click", function () { detailDialog.close(); });
  }
  if (detailCloseBtn) {
    detailCloseBtn.addEventListener("click", function () { detailDialog.close(); });
  }
  if (detailDialog) {
    detailDialog.addEventListener("click", function (event) {
      if (event.target === detailDialog) detailDialog.close();
    });
  }

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
    showFilePreview(null);
    document.querySelector("#upload-character-count").textContent = "0 / 400 karakter";
    document.querySelector("#upload-source").setCustomValidity("");
    render();
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (savingUpload) return;
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
      fullDescription: document.querySelector("#upload-full-description").value.trim(),
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
    // Foto disimpan sebagai data URL agar langsung tampil di kartu arsip.
    savingUpload = true;
    const photo = file ? await fileToImage(file) : "";
    if (photo) entry.image = photo;
    savingUpload = false;
    const docs = documents();
    docs.push(entry);
    if (!APP.write(STORAGE_KEY, docs)) return;
    form.reset();
    showFilePreview(null);
    document.querySelector("#upload-character-count").textContent = "0 / 400 karakter";
    uploadPanel.dataset.open = "false";
    activeTab = "personal";
    document.querySelector("#personal-gate").hidden = true;
    grid.hidden = true;
    APP.notify(photo
      ? "Arsip dan fotonya tersimpan di browser ini. Foto diperkecil agar hemat ruang."
      : "Metadata arsip telah dicatat di browser ini. Berkas tidak dikirim ke server.", "success");
    render();
  });

  document.querySelector("#upload-file").addEventListener("change", function () {
    showFilePreview(this.files[0] || null);
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
