(function () {
  "use strict";

  const APP = window.ARSIP_APP;
  const QUESTIONS = window.ARSIP_DATA.quizQuestions;
  const DEMO_ROWS = [
    { username: "larasbumi", score: 100, seconds: 102, date: "2026-10-12T09:00:00.000Z", demo: true },
    { username: "sanggar_sore", score: 90, seconds: 125, date: "2026-10-13T09:00:00.000Z", demo: true },
    { username: "aksara27", score: 90, seconds: 138, date: "2026-10-14T09:00:00.000Z", demo: true },
    { username: "ratih_nusa", score: 80, seconds: 154, date: "2026-10-15T09:00:00.000Z", demo: true },
    { username: "jejak_kita", score: 80, seconds: 171, date: "2026-10-16T09:00:00.000Z", demo: true },
    { username: "dapur_timur", score: 70, seconds: 190, date: "2026-10-17T09:00:00.000Z", demo: true },
    { username: "tenun_aksara", score: 70, seconds: 205, date: "2026-10-18T09:00:00.000Z", demo: true },
    { username: "langit_timur", score: 60, seconds: 221, date: "2026-10-19T09:00:00.000Z", demo: true },
    { username: "rumah_pusaka", score: 60, seconds: 238, date: "2026-10-20T09:00:00.000Z", demo: true },
    { username: "cerita_kecil", score: 50, seconds: 255, date: "2026-10-21T09:00:00.000Z", demo: true }
  ];
  const ui = {
    intro: document.querySelector("#quiz-intro"),
    stage: document.querySelector("#quiz-stage"),
    result: document.querySelector("#quiz-result"),
    progress: document.querySelector("#quiz-progress"),
    position: document.querySelector("#quiz-position"),
    timer: document.querySelector("#quiz-timer"),
    question: document.querySelector("#quiz-question"),
    options: document.querySelector("#quiz-options"),
    feedback: document.querySelector("#quiz-feedback"),
    next: document.querySelector("#quiz-next"),
    leaderboard: document.querySelector("#leaderboard-body")
  };
  let round = [];
  let current = 0;
  let correctCount = 0;
  let wrongAnswers = [];
  let answered = false;
  let startedAt = 0;
  let timerId = 0;

  // Setiap ronde memakai sepuluh soal yang diacak dari bank lokal.
  function sampleRound() {
    const pool = QUESTIONS.slice();
    for (let index = pool.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [pool[index], pool[target]] = [pool[target], pool[index]];
    }
    return pool.slice(0, 10);
  }

  // Tampilan satu soal dan pilihan jawabannya.
  function renderQuestion() {
    const question = round[current];
    answered = false;
    ui.feedback.hidden = true;
    ui.next.hidden = true;
    ui.position.textContent = "Pertanyaan " + (current + 1) + " dari " + round.length + " · " + question.category;
    ui.progress.max = round.length;
    ui.progress.value = current;
    ui.question.textContent = question.question;
    ui.options.replaceChildren();
    question.options.forEach(function (option, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      const letter = document.createElement("span");
      letter.className = "quiz-option__letter";
      letter.setAttribute("aria-hidden", "true");
      letter.textContent = String.fromCharCode(65 + index);
      const text = document.createElement("span");
      text.textContent = option;
      button.append(letter, text);
      button.addEventListener("click", function () { submitAnswer(index, button); });
      ui.options.append(button);
    });
  }

  function submitAnswer(index, selectedButton) {
    if (answered) return;
    answered = true;
    const question = round[current];
    const isCorrect = index === question.answer;
    if (isCorrect) correctCount += 1;
    else wrongAnswers.push({ question: question.question, selected: question.options[index], answer: question.options[question.answer], explanation: question.explanation });
    Array.from(ui.options.children).forEach(function (button, optionIndex) {
      button.disabled = true;
      if (optionIndex === question.answer) button.dataset.result = "correct";
      else if (button === selectedButton) button.dataset.result = "wrong";
    });
    ui.feedback.replaceChildren();
    const heading = document.createElement("strong");
    heading.textContent = isCorrect ? "Jawabanmu tepat." : "Belum tepat.";
    const explanation = document.createElement("p");
    explanation.textContent = question.explanation;
    ui.feedback.append(heading, explanation);
    ui.feedback.hidden = false;
    ui.progress.value = current + 1;
    ui.next.hidden = false;
    ui.next.textContent = current === round.length - 1 ? "Lihat hasil" : "Pertanyaan berikutnya";
    ui.next.focus();
  }

  // Papan peringkat menggabungkan skor contoh dan skor lokal akun demo.
  function renderLeaderboard() {
    if (!ui.leaderboard) return;
    const session = APP.getSession();
    const localRows = [];
    if (session) {
      localRows.push.apply(localRows, APP.read("arsipPusaka:leaderboard:local", []));
      const history = APP.read(APP.accountKey("arsipPusaka:quiz-history", session.username), []);
      if (history.length) {
        const best = history.slice().sort(function (a, b) {
          return b.score - a.score || a.seconds - b.seconds || new Date(a.date) - new Date(b.date);
        })[0];
        if (!localRows.some(function (row) { return row.username.toLowerCase() === session.username.toLowerCase(); })) {
          localRows.push(Object.assign({}, best, { username: session.username, demo: false }));
        }
      }
    }
    const localUsernames = new Set(localRows.map(function (row) { return row.username.toLowerCase(); }));
    const demoRows = DEMO_ROWS.filter(function (row) { return !localUsernames.has(row.username.toLowerCase()); });
    const allRows = demoRows.concat(localRows);
    const byUser = new Map();
    allRows.forEach(function (row) {
      const key = row.username.toLowerCase();
      const prior = byUser.get(key);
      if (!prior || row.score > prior.score || (row.score === prior.score && row.seconds < prior.seconds)) byUser.set(key, row);
    });
    const sorted = Array.from(byUser.values()).sort(function (a, b) {
      return b.score - a.score || a.seconds - b.seconds || new Date(a.date) - new Date(b.date);
    });
    const top = sorted.slice(0, 10);
    const currentIndex = session ? sorted.findIndex(function (row) { return row.username.toLowerCase() === session.username.toLowerCase(); }) : -1;
    const isOutsideTop = currentIndex >= 10;
    const rows = top.slice();
    if (isOutsideTop) rows.push(sorted[currentIndex]);
    ui.leaderboard.replaceChildren();
    rows.forEach(function (row) {
      const tr = document.createElement("tr");
      tr.className = "leaderboard__row";
      const isCurrent = Boolean(session && row.username.toLowerCase() === session.username.toLowerCase());
      const rank = sorted.indexOf(row) + 1;

      // Kolom 1: Peringkat / Lambang Top 1, 2, 3
      const rankCell = document.createElement("td");
      const rankWrap = document.createElement("span");
      rankWrap.className = "leaderboard__rank";

      if (rank >= 1 && rank <= 3) {
        tr.classList.add("leaderboard__row--top" + rank);
        rankWrap.classList.add("leaderboard__rank--badge", "leaderboard__rank--top" + rank);
        const badge = document.createElement("img");
        badge.className = "leaderboard__badge";
        badge.src = "top/top" + rank + ".png";
        badge.alt = "Peringkat " + rank;
        badge.title = "Peringkat " + rank;
        badge.width = 30;
        badge.height = 30;
        badge.loading = "lazy";
        rankWrap.append(badge);
      } else {
        rankWrap.textContent = String(rank);
      }
      rankCell.append(rankWrap);
      tr.append(rankCell);

      const otherCells = [
        "@" + row.username + (row.demo ? " · contoh" : ""),
        String(row.score),
        APP.formatTime(row.seconds),
        APP.formatDate(row.date)
      ];
      otherCells.forEach(function (value) {
        const cell = document.createElement("td");
        cell.textContent = value;
        tr.append(cell);
      });
      tr.dataset.current = String(isCurrent);

      // Efek interaktif: membesar saat diklik
      tr.tabIndex = 0;
      tr.setAttribute("role", "button");
      tr.setAttribute("aria-label", "Peringkat " + rank + ", " + row.username + ", skor " + row.score);
      tr.setAttribute("aria-pressed", "false");

      tr.addEventListener("click", function () {
        const wasSelected = tr.classList.contains("is-selected");
        ui.leaderboard.querySelectorAll(".leaderboard__row").forEach(function (otherTr) {
          otherTr.classList.remove("is-selected");
          otherTr.setAttribute("aria-pressed", "false");
        });
        if (!wasSelected) {
          tr.classList.add("is-selected");
          tr.setAttribute("aria-pressed", "true");
        }
      });

      tr.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          tr.click();
        }
      });

      ui.leaderboard.append(tr);
    });
    if (!rows.length) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 5;
      cell.textContent = "Belum ada skor pada periode ini. Coba mainkan kuis.";
      row.append(cell);
      ui.leaderboard.append(row);
    }
  }

  // Siklus kuis: mulai ronde, simpan hasil, lalu tampilkan peringkat.
  function startQuiz() {
    round = sampleRound();
    current = 0;
    correctCount = 0;
    wrongAnswers = [];
    startedAt = performance.now();
    ui.intro.hidden = true;
    ui.result.hidden = true;
    ui.stage.hidden = false;
    ui.timer.textContent = "00:00";
    window.clearInterval(timerId);
    timerId = window.setInterval(function () {
      ui.timer.textContent = APP.formatTime((performance.now() - startedAt) / 1000);
    }, 1000);
    renderQuestion();
  }

  function finishQuiz() {
    window.clearInterval(timerId);
    const seconds = Math.round((performance.now() - startedAt) / 1000);
    const score = correctCount * 10;
    const level = correctCount >= 8 ? "Penjaga Pusaka" : correctCount >= 5 ? "Pelestari Muda" : "Pemula Pusaka";
    const record = { score: score, correct: correctCount, seconds: seconds, date: new Date().toISOString(), roundSize: round.length };
    const session = APP.getSession();
    const key = session ? APP.accountKey("arsipPusaka:quiz-history", session.username) : "arsipPusaka:quiz-history:guest";
    const history = APP.read(key, []);
    const historySaved = APP.write(key, history.concat(record));
    if (session) {
      const leaderboard = APP.read("arsipPusaka:leaderboard:local", []);
      const previous = leaderboard.find(function (row) { return row.username.toLowerCase() === session.username.toLowerCase(); });
      const isBetter = !previous
        || record.score > previous.score
        || (record.score === previous.score && record.seconds < previous.seconds)
        || (record.score === previous.score && record.seconds === previous.seconds && new Date(record.date) < new Date(previous.date));
      if (isBetter) {
        const otherAccounts = leaderboard.filter(function (row) { return row.username.toLowerCase() !== session.username.toLowerCase(); });
        otherAccounts.push(Object.assign({}, record, { username: session.username, demo: false }));
        APP.write("arsipPusaka:leaderboard:local", otherAccounts);
      }
    }
    if (historySaved) {
      ui.result.dataset.saved = session ? "Akun @" + session.username + " di perangkat ini" : "Riwayat tamu di perangkat ini";
    }
    document.querySelector("#result-score").textContent = String(score);
    document.querySelector("#result-level").textContent = level;
    document.querySelector("#result-correct").textContent = correctCount + " dari " + round.length + " jawaban benar · " + APP.formatTime(seconds);
    document.querySelector("#result-storage").textContent = ui.result.dataset.saved || "Riwayat lokal";
    const review = document.querySelector("#quiz-review");
    review.replaceChildren();
    if (wrongAnswers.length) {
      wrongAnswers.forEach(function (item) {
        const li = document.createElement("li");
        const question = document.createElement("strong");
        question.textContent = item.question;
        const detail = document.createElement("p");
        detail.textContent = "Jawaban benar: " + item.answer + ". " + item.explanation;
        li.append(question, detail);
        review.append(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "Semua jawaban benar. Teruskan rasa ingin tahu dengan cerita atau arsip budaya.";
      review.append(li);
    }
    ui.stage.hidden = true;
    ui.result.hidden = false;
    renderLeaderboard();
  }

  document.querySelector("#start-quiz").addEventListener("click", startQuiz);
  ui.next.addEventListener("click", function () {
    if (!answered) return;
    if (current === round.length - 1) finishQuiz();
    else {
      current += 1;
      renderQuestion();
    }
  });
  document.querySelector("#play-again").addEventListener("click", startQuiz);
  document.addEventListener("arsip:authchange", renderLeaderboard);
  renderLeaderboard();
})();
