(function () {
  "use strict";

  const SESSION_KEY = "arsipPusaka:session";
  const toastElement = document.querySelector("#site-toast");
  let toastTimer;

  function notify(message, tone) {
    if (!toastElement) return;
    toastElement.textContent = message;
    toastElement.hidden = false;
    toastElement.dataset.tone = tone || "info";
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastElement.hidden = true;
    }, 4400);
  }

  function read(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (error) {
      console.error("Tidak dapat membaca penyimpanan lokal Arsip Pusaka.", error);
      notify("Data lokal tidak dapat dibaca. Periksa pengaturan penyimpanan browser.", "error");
      return fallback;
    }
  }

  function write(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Tidak dapat menyimpan data lokal Arsip Pusaka.", error);
      notify("Data tidak tersimpan. Periksa ruang penyimpanan atau izin browser.", "error");
      return false;
    }
  }

  function accountKey(prefix, username) {
    return prefix + ":" + String(username || "").toLowerCase();
  }

  function getSession() {
    const session = read(SESSION_KEY, null);
    return session && typeof session.username === "string" ? session : null;
  }

  function updateAccountControls() {
    const session = getSession();
    document.querySelectorAll("[data-account-control]").forEach(function (button) {
      button.textContent = session ? "@" + session.username + " · Keluar" : "Masuk";
      button.setAttribute("aria-label", session ? "Keluar dari akun @" + session.username : "Masuk ke akun demo");
    });
    document.dispatchEvent(new CustomEvent("arsip:authchange", { detail: { session: session } }));
  }

  function accountDialog(showForm) {
    const dialog = document.querySelector("#account-dialog");
    const form = document.querySelector("#account-form");
    const signedIn = document.querySelector("#account-signed-in");
    const session = getSession();
    document.querySelector("#account-dialog-title").textContent = session ? "Akun demo" : "Masuk ke Arsip Pusaka";
    form.hidden = Boolean(session) || !showForm;
    signedIn.hidden = !session;
    document.querySelector("#account-dialog-error").textContent = "";
    if (session) {
      document.querySelector("#signed-in-name").textContent = "@" + session.username;
    }
    if (!dialog.open) dialog.showModal();
  }

  function requireAccount(message) {
    if (getSession()) return true;
    if (message) notify(message, "info");
    accountDialog(true);
    return false;
  }

  function mountChrome() {
    const header = document.querySelector("#site-header");
    const footer = document.querySelector("#site-footer");
    const overlays = document.querySelector("#site-overlays");
    const page = document.body.dataset.page || "beranda";
    if (header) {
      header.innerHTML =
        '<header class="site-header"><div class="shell site-header__inner">' +
        '<a class="brand" href="../lading_page/index.html" aria-label="Arsip Pusaka, Beranda"><img class="brand__mark" src="../LOGO.png" alt=""><span class="brand__text"><span class="brand__name">ARSIP PUSAKA</span><span class="brand__tagline">Kenali · Catat · Wariskan</span></span></a>' +
        '<button class="site-nav__toggle" id="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Buka navigasi">☰</button>' +
        '<nav class="site-nav" id="site-nav" aria-label="Navigasi utama" data-open="false">' +
        '<a class="site-nav__link" href="../lading_page/index.html" ' + (page === "beranda" ? 'aria-current="page"' : "") + '>Beranda</a>' +
        '<a class="site-nav__link" href="../arsip/index.html" ' + (page === "arsip" ? 'aria-current="page"' : "") + '>Arsip</a>' +
        '<a class="site-nav__link" href="../kuis/index.html" ' + (page === "kuis" ? 'aria-current="page"' : "") + '>Kuis</a>' +
        '<a class="site-nav__link" href="../cerita/index.html" ' + (page === "cerita" ? 'aria-current="page"' : "") + '>Cerita</a>' +
        '<button class="site-nav__account" type="button" data-account-control>Masuk</button></nav></div></header>';
    }
    if (footer) {
      footer.innerHTML =
        '<footer class="site-footer"><div class="shell site-footer__inner">' +
        '<section><h2>Arsip Pusaka</h2><p>Rawat yang kita warisi. Wariskan yang kita rawat. Dokumentasikan budaya dengan sumber, konteks, dan izin yang jelas.</p></section>' +
        '<section><h2>Jelajahi</h2><ul><li><a href="../lading_page/index.html">Beranda</a></li><li><a href="../arsip/index.html">Arsip komunitas</a></li><li><a href="../kuis/index.html">Kuis budaya</a></li><li><a href="../cerita/index.html">Cerita Nusantara</a></li></ul></section>' +
        '<section><h2>Catatan prototipe</h2><p>Akun, metadata arsip, skor, penanda baca, dan peringkat adalah demo lokal di browser ini. Contoh bukan data komunitas nyata; statistik dan sumber khusus perlu diverifikasi sebelum publikasi.</p></section>' +
        '</div><div class="shell site-footer__bottom"><span>© 2026 Arsip Pusaka · TECHTOPIA Vol. 2</span><span>Pendidikan Berbasis Lokal · Warisan Budaya & Seni</span></div></footer>';
    }
    if (overlays) {
      overlays.innerHTML =
        '<dialog id="account-dialog" aria-labelledby="account-dialog-title"><div class="dialog__inner">' +
        '<div class="dialog__head"><h2 id="account-dialog-title">Masuk ke Arsip Pusaka</h2><button class="dialog__close" type="button" data-close-account aria-label="Tutup">×</button></div>' +
        '<p class="dialog__copy">Akun demo menghubungkan unggahan dan skor pada perangkat ini saja. Kata sandi hanya pajangan: tidak dikirim dan tidak disimpan.</p>' +
        '<form id="account-form" autocomplete="off"><div class="form-grid"><div class="field field--full"><label for="account-username">Nama pengguna</label><input id="account-username" name="username" type="text" minlength="3" maxlength="20" pattern="[A-Za-z0-9_]{3,20}" autocomplete="username" required aria-describedby="account-name-hint"><span class="field__hint" id="account-name-hint">3–20 karakter: huruf, angka, atau garis bawah.</span></div><div class="field field--full"><label for="account-password">Kata sandi demo</label><input id="account-password" name="password" type="password" autocomplete="off" required><span class="field__hint">Kolom ini tidak pernah disimpan atau dikirim.</span></div></div><p id="account-dialog-error" class="status-message" role="alert"></p><div class="form-actions"><button class="button button--gold" type="submit">Masuk</button><button class="button button--quiet" type="button" data-close-account>Batal</button></div></form>' +
        '<div id="account-signed-in" hidden><p class="account-state">Sedang masuk sebagai <span class="account-state__name" id="signed-in-name"></span>.</p><p class="field__hint">Sesi demo berlaku di browser ini. Tidak ada akun server.</p></div>' +
        '</div></dialog>' +
        '<button class="chat-launcher" id="chat-launcher" type="button" aria-label="Buka Tanya Pusaka Bot" aria-expanded="false" aria-controls="chat-panel"><img class="chat-launcher__mark" src="../MASKOT/AI_CHATBOT.png" alt="" aria-hidden="true"></button>' +
        '<section class="chat-panel" id="chat-panel" aria-labelledby="chat-title" hidden><header class="chat-panel__head"><div><h2 id="chat-title">Tanya Pusaka Bot</h2><p>Jawaban berbasis pengetahuan situs ini, bukan AI umum.</p></div><button class="chat-panel__close" id="chat-close" type="button" aria-label="Tutup chatbot">×</button></header>' +
        '<div class="chat-messages" id="chat-messages" aria-live="polite"><div class="chat-message" role="article">Halo! Tanyakan tentang budaya, cara mengarsipkan, kuis, atau cerita.</div></div><div class="chat-suggestions" id="chat-suggestions"></div>' +
        '<form class="chat-form" id="chat-form"><label class="screen-reader-only" for="chat-input">Tulis pertanyaan</label><input id="chat-input" type="text" maxlength="240" placeholder="Tulis pertanyaan…" autocomplete="off" required><button type="submit">Kirim</button></form></section>';
    }
  }

  function appendChatMessage(text, kind, link) {
    const messages = document.querySelector("#chat-messages");
    const bubble = document.createElement("div");
    bubble.className = "chat-message" + (kind === "user" ? " chat-message--user" : "");
    bubble.setAttribute("role", kind === "bot" ? "article" : "status");
    bubble.append(document.createTextNode(text));
    if (link && link.href && link.label) {
      bubble.append(document.createTextNode(" "));
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.label;
      bubble.append(anchor);
    }
    messages.append(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  const botRules = [
    { test: /klaim|sengketa|pengakuan|unesco|status resmi/i, text: "Pembahasan budaya sebaiknya berangkat dari dokumentasi dan sumber resmi, bukan saling menyalahkan. Status setiap tradisi perlu dicek langsung ke lembaga pencatat.", href: "../lading_page/index.html#sumber", label: "Lihat catatan sumber" },
    { test: /batik/i, text: "Batik punya ragam teknik dan konteks daerah. Catat pembuat, asal, teknik, sumber pengetahuan, serta izin sebelum membagikan dokumentasinya.", href: "../arsip/index.html", label: "Buka Arsip" },
    { test: /angklung/i, text: "Angklung adalah alat musik bambu yang dimainkan dengan digoyangkan. Arsipkan konteks pertunjukan dan sumber penuturan secara jelas.", href: "../arsip/index.html", label: "Buka Arsip" },
    { test: /reog/i, text: "Ketika mencatat Reog, tulis lokasi, kelompok atau narasumber sesuai izin, serta rujukan yang dapat diperiksa. Hindari menyederhanakan ragam penuturan.", href: "../arsip/index.html", label: "Cara mencatat" },
    { test: /pendet/i, text: "Tari Pendet memiliki konteks budaya dan pertunjukan yang patut dijelaskan melalui sumber yang tepat. Hindari klaim status tanpa merujuk catatan resmi.", href: "../lading_page/index.html#kasus", label: "Lihat catatan kasus" },
    { test: /unggah|upload|arsip|dokumen|sumber|izin|narasumber|dokumentasi|mendokumentasikan|mencatat|catat/i, text: "Masuk menggunakan nama demo, lalu isi judul, kategori, asal, deskripsi dan sumber serta centang persetujuan. Prototipe hanya menyimpan metadata di browser.", href: "../arsip/index.html", label: "Mulai mencatat" },
    { test: /login|masuk|akun|password|kata sandi/i, text: "Masuk bersifat demo. Pilih nama pengguna 3–20 karakter (huruf, angka, garis bawah). Kata sandi hanya diperiksa agar kolom tidak kosong dan tidak disimpan.", href: "#masuk", label: "Buka Masuk" },
    { test: /peringkat|skor|kuis|soal/i, text: "Satu permainan mengambil 10 pertanyaan. Skor adalah jumlah jawaban benar × 10; skor demo tersimpan hanya di browser ini. Data contoh ditandai terpisah.", href: "../kuis/index.html", label: "Coba kuis" },
    { test: /versi|ragam|daerah/i, text: "Satu cerita tutur dapat memiliki ragam versi di daerah dan keluarga yang berbeda. Catat versi, asal, sumber, serta izin narasumber; jangan menyebut satu versi sebagai satu-satunya yang sah.", href: "../cerita/index.html", label: "Jelajahi Cerita Nusantara" },
    { test: /cerita|legenda|dongeng|mitos|fabel|baca/i, text: "Cerita Nusantara berisi versi demo ringkas dengan penanda bahwa sumber dan narasumber lokal perlu diverifikasi sebelum publikasi.", href: "../cerita/index.html", label: "Jelajahi cerita" }
  ];

  function answerBot(question) {
    const match = botRules.find(function (rule) { return rule.test.test(question); });
    if (!match) {
      return {
        text: "Saya belum menemukan jawaban untuk topik itu. Coba tanyakan tentang Batik, Angklung, Reog, Pendet, cara mengarsipkan, kuis, atau cerita.",
        href: "../lading_page/index.html",
        label: "Kembali ke Beranda"
      };
    }
    return match;
  }

  function initChatbot() {
    const launcher = document.querySelector("#chat-launcher");
    const panel = document.querySelector("#chat-panel");
    const close = document.querySelector("#chat-close");
    const form = document.querySelector("#chat-form");
    const input = document.querySelector("#chat-input");
    if (!launcher || !panel || !form) return;

    const suggestionsByPage = {
      arsip: ["Bagaimana cara mengunggah?", "Mengapa sumber dan izin penting?"],
      kuis: ["Bagaimana aturan skor?", "Apakah peringkat ini sungguhan?"],
      cerita: ["Rekomendasikan cerita", "Apa arti versi daerah?"],
      beranda: ["Bagaimana cara mendokumentasikan?", "Bagaimana kerja akun demo?"]
    };
    const page = document.body.dataset.page || "beranda";
    const suggestionBox = document.querySelector("#chat-suggestions");
    (suggestionsByPage[page] || suggestionsByPage.beranda).forEach(function (suggestion) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chat-suggestion";
      button.textContent = suggestion;
      button.addEventListener("click", function () {
        input.value = suggestion;
        form.requestSubmit();
      });
      suggestionBox.append(button);
    });

    launcher.addEventListener("click", function () {
      panel.hidden = !panel.hidden;
      launcher.setAttribute("aria-expanded", String(!panel.hidden));
      if (!panel.hidden) input.focus();
    });
    close.addEventListener("click", function () {
      panel.hidden = true;
      launcher.setAttribute("aria-expanded", "false");
      launcher.focus();
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const question = input.value.trim();
      if (!question) {
        input.focus();
        return;
      }
      appendChatMessage(question, "user");
      input.value = "";
      const answer = answerBot(question);
      appendChatMessage(answer.text, "bot", { href: answer.href, label: answer.label });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    mountChrome();
    function updateNavigationState() {
      document.body.dataset.navScrolled = String(window.scrollY > 28);
    }
    updateNavigationState();
    window.addEventListener("scroll", updateNavigationState, { passive: true });

    const menuButton = document.querySelector("#nav-toggle");
    const nav = document.querySelector("#site-nav");
    if (menuButton && nav) {
      menuButton.addEventListener("click", function () {
        const open = nav.dataset.open !== "true";
        nav.dataset.open = String(open);
        menuButton.setAttribute("aria-expanded", String(open));
      });
      nav.querySelectorAll("a, button").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.dataset.open = "false";
          menuButton.setAttribute("aria-expanded", "false");
        });
      });
    }

    document.querySelectorAll("[data-account-control]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (getSession()) {
          const session = getSession();
          if (!window.confirm("Keluar dari akun demo @" + session.username + "?")) return;
          try {
            window.localStorage.removeItem(SESSION_KEY);
          } catch (error) {
            console.error("Tidak dapat menghapus sesi lokal Arsip Pusaka.", error);
            notify("Sesi tidak dapat dihapus. Periksa izin penyimpanan browser.", "error");
            return;
          }
          updateAccountControls();
          notify("Anda telah keluar dari akun demo.", "success");
        } else {
          accountDialog(true);
        }
      });
    });

    document.querySelectorAll("[data-close-account]").forEach(function (button) {
      button.addEventListener("click", function () {
        document.querySelector("#account-dialog").close();
      });
    });

    document.querySelector("#account-dialog").addEventListener("close", function () {
      document.querySelector("#account-form").reset();
      document.querySelector("#account-dialog-error").textContent = "";
    });

    const loginForm = document.querySelector("#account-form");
    if (loginForm) {
      loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.querySelector("#account-username").value.trim();
        const password = document.querySelector("#account-password").value;
        const errorNode = document.querySelector("#account-dialog-error");
        if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
          errorNode.textContent = "Nama pengguna harus 3–20 karakter: huruf, angka, atau garis bawah.";
          return;
        }
        if (!password) {
          errorNode.textContent = "Isi kata sandi demo agar dapat melanjutkan. Kata sandi tidak akan disimpan.";
          return;
        }
        const previous = read(accountKey("arsipPusaka:user", username), null);
        const session = { username: username, joinedAt: previous && previous.joinedAt ? previous.joinedAt : new Date().toISOString() };
        if (!write(accountKey("arsipPusaka:user", username), session)) return;
        if (!write(SESSION_KEY, session)) return;
        loginForm.reset();
        updateAccountControls();
        document.querySelector("#account-dialog").close();
        notify("Berhasil masuk sebagai @" + username + ". Akun ini hanya tersimpan di browser.", "success");
      });
    }

    document.querySelectorAll("[data-open-login]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (!getSession()) accountDialog(true);
      });
    });

    document.addEventListener("click", function (event) {
      const loginLink = event.target.closest("a[href='#masuk']");
      if (!loginLink) return;
      event.preventDefault();
      accountDialog(true);
    });

    updateAccountControls();
    initChatbot();
  });

  window.ARSIP_APP = {
    read: read,
    write: write,
    accountKey: accountKey,
    getSession: getSession,
    requireAccount: requireAccount,
    notify: notify,
    formatDate: function (value) {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? "Tanggal tidak tersedia" : new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(date);
    },
    formatTime: function (seconds) {
      const safeSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
      return String(Math.floor(safeSeconds / 60)).padStart(2, "0") + ":" + String(safeSeconds % 60).padStart(2, "0");
    }
  };
})();
