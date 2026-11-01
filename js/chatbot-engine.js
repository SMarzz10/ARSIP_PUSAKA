/*
  Mesin pencocok jawaban Pusaka Bot (tanpa API, tanpa AI generatif).
  Muat SETELAH chatbot-data.js.

  Cara pakai:
    const r = jawab("apa itu hari batik?");
    // r = { id, jawaban, tautan, sumber, verif, saran: [{id, topik}] }
    // r.id === null berarti tidak ditemukan (jawaban = pesan cadangan)

  Cara kerja singkat:
    1. Teks dinormalkan (huruf kecil, tanpa tanda baca) dan kata umum dibuang.
    2. Setiap entri diberi skor dari kecocokan kata kunci:
       frasa +3, kata persis +2, kata mirip (salah ketik 1 huruf / awalan) +1.
    3. Entri dengan skor tertinggi (minimal 2) dipilih.
*/
const KATA_UMUM = new Set([
  "apa","itu","yang","di","dari","ke","dan","atau","saya","aku","kamu","bisa","tolong","dong","ya","nih",
  "tentang","mengenai","adalah","ini","dengan","untuk","bagaimana","gimana","kenapa","mengapa","kapan",
  "dimana","siapa","apakah","berapa","sih","kok","mau","ingin","tahu","jelaskan","ceritakan","beri","kasih"
]);

function normalisasi(teks) {
  return String(teks).toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ").trim();
}

function pecahKata(teks) {
  return normalisasi(teks).split(" ").filter(w => w && !KATA_UMUM.has(w));
}

/* true jika dua kata berbeda paling banyak 1 huruf (salah ketik ringan) */
function miripSatuHuruf(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, beda = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++beda > 1) return false;
    if (a.length > b.length) i++;
    else if (a.length < b.length) j++;
    else { i++; j++; }
  }
  return beda + (a.length - i) + (b.length - j) <= 1;
}

/* normalkan kata kunci sekali saja saat dimuat */
KB.forEach(e => { e._kata = e.kata.map(normalisasi); });

function hitungSkor(entri, kalimat, kata) {
  let skor = 0;
  for (const k of entri._kata) {
    if (k.includes(" ")) {
      if (kalimat.includes(k)) skor += 3;
    } else if (kata.includes(k)) {
      skor += 2;
    } else if (k.length >= 5 && kata.some(t => t.length >= 5 && miripSatuHuruf(t, k))) {
      skor += 1;
    } else if (k.length >= 5 && kata.some(t => t.length >= 5 && (t.startsWith(k) || k.startsWith(t)))) {
      skor += 1;
    }
  }
  return skor;
}

function saranDari(ids) {
  return (ids || [])
    .map(id => KB.find(e => e.id === id))
    .filter(Boolean)
    .slice(0, 3)
    .map(e => ({ id: e.id, topik: e.topik }));
}

function jawab(teks) {
  const kalimat = normalisasi(teks);
  const kata = pecahKata(teks);
  if (!kalimat) {
    return { id: null, jawaban: BALASAN_CADANGAN, tautan: null, sumber: "", verif: true, saran: saranDari(SARAN_AWAL) };
  }

  let terbaik = null, skorTerbaik = 0;
  for (const e of KB) {
    const s = hitungSkor(e, kalimat, kata);
    if (s > skorTerbaik) { skorTerbaik = s; terbaik = e; }
  }

  if (!terbaik || skorTerbaik < 2) {
    return { id: null, jawaban: BALASAN_CADANGAN, tautan: null, sumber: "", verif: true, saran: saranDari(SARAN_AWAL) };
  }
  return {
    id: terbaik.id, jawaban: terbaik.jawaban, tautan: terbaik.tautan,
    sumber: terbaik.sumber, verif: terbaik.verif, saran: saranDari(terbaik.lanjut)
  };
}

/* Ambil jawaban langsung dari id entri (untuk tombol saran) */
function jawabById(id) {
  const e = KB.find(x => x.id === id);
  if (!e) return jawab("");
  return { id: e.id, jawaban: e.jawaban, tautan: e.tautan, sumber: e.sumber, verif: e.verif, saran: saranDari(e.lanjut) };
}
