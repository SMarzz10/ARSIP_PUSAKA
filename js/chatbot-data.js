/*
  Basis pengetahuan Pusaka Bot (berbasis aturan, tanpa API AI).
  Tiap entri:
    id      : kode unik
    topik   : nama topik (dipakai di tombol saran)
    kata    : kata kunci tanpa huruf kapital dan tanpa tanda baca
              (frasa dua kata atau lebih boleh, nilainya lebih tinggi)
    jawaban : teks balasan (singkat, 1-3 kalimat)
    tautan  : {label, href} atau null
    lanjut  : daftar id entri lain yang ditawarkan sebagai saran lanjutan
    sumber  : asal informasi, ditampilkan kecil di bawah jawaban (boleh kosong)
    verif   : true = sudah dicek ke sumber resmi / pemberitaan saat disusun (Oktober 2026)
              false = pengetahuan umum, WAJIB dicek ulang sebelum dikumpulkan
  Angka UNESCO bisa berubah. Cek ulang di ich.unesco.org/state/indonesia-ID.
*/
const KB = [
  /* ===== Percakapan dasar ===== */
  {id:"sapaan", topik:"Sapaan", kata:["halo","hai","hi","hey","permisi","selamat pagi","selamat siang","selamat sore","selamat malam","assalamualaikum"],
   jawaban:"Halo! Saya Pusaka Bot. Saya bisa menjawab seputar situs ini, cara mengunggah dokumen, kuis, cerita rakyat, dan informasi budaya Indonesia.",
   tautan:null, lanjut:["bantuan","unggah","kuis"], sumber:"", verif:true},
  {id:"terimakasih", topik:"Terima kasih", kata:["terima kasih","makasih","thanks","thx","trims","terimakasih"],
   jawaban:"Sama-sama! Kalau masih ada yang ingin ditanyakan, silakan.",
   tautan:null, lanjut:["bantuan"], sumber:"", verif:true},
  {id:"bantuan", topik:"Apa yang bisa ditanyakan", kata:["bantuan","help","menu","bisa apa","fitur","apa saja","topik"],
   jawaban:"Kamu bisa bertanya tentang: cara masuk dan mengunggah dokumen, kuis dan peringkat, Cerita Nusantara, klaim budaya, pengakuan UNESCO, serta budaya seperti Batik, Angklung, Reog, Pendet, dan Gamelan.",
   tautan:null, lanjut:["unggah","kuis","klaim","unesco"], sumber:"", verif:true},
  {id:"chatbot", topik:"Tentang bot ini", kata:["chatbot","bot","kamu siapa","siapa kamu","kecerdasan buatan","ai","robot"],
   jawaban:"Saya chatbot berbasis aturan: jawaban saya dicocokkan dari basis pengetahuan situs ini, bukan dihasilkan oleh AI generatif. Karena itu saya hanya bisa menjawab topik yang sudah disiapkan.",
   tautan:null, lanjut:["bantuan","sumberdata"], sumber:"", verif:true},

  /* ===== Tentang situs dan tema ===== */
  {id:"tentang", topik:"Tentang Arsip Pusaka", kata:["arsip pusaka","tentang situs","situs ini","website ini","tujuan situs","apa ini"],
   jawaban:"Arsip Pusaka adalah situs edukasi tentang pentingnya mendokumentasikan budaya. Di sini kamu bisa belajar, mengarsipkan budaya daerahmu, menguji wawasan lewat kuis, dan membaca cerita rakyat.",
   tautan:{label:"Beranda",href:"index.html"}, lanjut:["unggah","kuis","cerita"], sumber:"", verif:true},
  {id:"tema", topik:"Tema PUSAKA", kata:["pusaka","tema","integer","techtopia","lomba","preserving","tema lomba"],
   jawaban:"Situs ini dibuat untuk lomba web design TECHTOPIA Vol. 2 dengan tema PUSAKA: Preserving Unity, Sustaining Ancestral Knowledge & Artistry, selaras dengan INTEGER#8 yang diselenggarakan HMJ Teknik Informatika Undiksha.",
   tautan:null, lanjut:["tentang"], sumber:"Buku Panduan Lomba Web Design TECHTOPIA Vol. 2", verif:true},
  {id:"sumberdata", topik:"Sumber data", kata:["sumber","referensi","dari mana","valid","datanya","akurat"],
   jawaban:"Informasi UNESCO, tanggal, dan angka bahasa daerah diambil dari sumber resmi dan pemberitaan, dan daftar sumbernya ada di bagian Sumber halaman Beranda. Selalu cek ulang ke sumber aslinya untuk keperluan penting.",
   tautan:{label:"Lihat sumber",href:"index.html#sumber"}, lanjut:["unesco"], sumber:"", verif:true},

  /* ===== Fitur akun dan arsip ===== */
  {id:"masuk", topik:"Cara masuk", kata:["masuk","login","daftar akun","akun","registrasi","sign in","buat akun"],
   jawaban:"Klik tombol Masuk di pojok kanan atas, lalu isi username (3-20 karakter: huruf, angka, atau garis bawah). Pada versi ini akun bersifat contoh dan datanya disimpan di browser perangkat ini.",
   tautan:null, lanjut:["unggah","keluar","privasi"], sumber:"", verif:true},
  {id:"keluar", topik:"Cara keluar", kata:["keluar","logout","log out","sign out"],
   jawaban:"Klik tombol Keluar di sebelah nama akunmu di pojok kanan atas.",
   tautan:null, lanjut:["masuk"], sumber:"", verif:true},
  {id:"privasi", topik:"Data pribadi", kata:["data pribadi","privasi","keamanan","data saya","email","kata sandi"],
   jawaban:"Pada versi ini data disimpan di browser perangkat ini. Di halaman arsip, yang ditampilkan hanya username, bukan email atau data pribadi lain.",
   tautan:null, lanjut:["masuk"], sumber:"", verif:true},
  {id:"unggah", topik:"Cara mengunggah dokumen", kata:["unggah","upload","tambah dokumen","kirim dokumen","menulis dokumen","bikin dokumen","buat dokumen"],
   jawaban:"Masuk dulu, lalu buka halaman Arsip dan klik Unggah dokumen. Isi judul, kategori, asal daerah, serta deskripsi dan sumber, lalu centang pernyataan hak atau izin dan simpan.",
   tautan:{label:"Buka Arsip",href:"arsip/index.html"}, lanjut:["aturanunggah","dokumentasi","arsipsaya"], sumber:"", verif:true},
  {id:"aturanunggah", topik:"Aturan unggahan", kata:["aturan","larangan","hak cipta","izin","boleh","syarat","ketentuan unggah","sara","pelanggaran"],
   jawaban:"Dokumen harus milikmu atau kamu punya izin memakainya, mencantumkan sumber, dan tidak mengandung SARA, pornografi, kekerasan, ujaran kebencian, atau hal yang merendahkan pihak mana pun.",
   tautan:null, lanjut:["unggah","dokumentasi"], sumber:"Buku Panduan Lomba (Ketentuan Umum dan Sifat Karya)", verif:true},
  {id:"arsipsaya", topik:"Arsip Saya", kata:["arsip saya","riwayat","history","dokumen saya","hapus dokumen","unggahan saya"],
   jawaban:"Di halaman Arsip, tab Arsip Saya menampilkan dokumen yang pernah kamu unggah. Dari sana kamu juga bisa menghapus dokumen milikmu.",
   tautan:{label:"Arsip Saya",href:"arsip/index.html"}, lanjut:["unggah"], sumber:"", verif:true},
  {id:"arsipkomunitas", topik:"Arsip Komunitas", kata:["arsip komunitas","lihat dokumen","dokumen orang","dokumen pengguna","filter","kategori","pengunggah"],
   jawaban:"Arsip Komunitas berisi dokumen budaya dari pengguna lain. Kamu bisa menyaring berdasarkan kategori, dan setiap kartu menampilkan nama pengunggahnya.",
   tautan:{label:"Arsip Komunitas",href:"arsip/index.html"}, lanjut:["unggah"], sumber:"", verif:true},

  /* ===== Kuis dan cerita ===== */
  {id:"kuis", topik:"Cara kerja kuis", kata:["kuis","quiz","soal","tes wawasan","uji wawasan","uji pengetahuan"],
   jawaban:"Kuis berisi 10 soal pilihan ganda yang diambil acak dari 35 soal budaya Indonesia. Setelah menjawab, kamu langsung melihat penjelasannya.",
   tautan:{label:"Mulai kuis",href:"kuis/index.html"}, lanjut:["skor","peringkat"], sumber:"", verif:true},
  {id:"skor", topik:"Skor dan tingkat", kata:["skor","nilai","poin","tingkat","penjaga pusaka","pelestari muda","pemula pusaka","level"],
   jawaban:"Skor = jumlah jawaban benar x 10. Tingkatnya: 0-4 benar Pemula Pusaka, 5-7 benar Pelestari Muda, 8-10 benar Penjaga Pusaka.",
   tautan:null, lanjut:["peringkat","kuis"], sumber:"", verif:true},
  {id:"peringkat", topik:"Papan peringkat", kata:["peringkat","ranking","leaderboard","papan peringkat","skor tertinggi","juara"],
   jawaban:"Papan Peringkat mengurutkan skor tertinggi, lalu waktu tercepat, lalu tanggal paling awal. Kamu perlu masuk agar skormu tercatat. Pada versi ini skor disimpan di perangkat ini, sehingga belum dibagi antarpengguna.",
   tautan:{label:"Papan Peringkat",href:"kuis/index.html#peringkat"}, lanjut:["masuk","skor"], sumber:"", verif:true},
  {id:"cerita", topik:"Cerita Nusantara", kata:["cerita","legenda","dongeng","cerita rakyat","mitos","fabel","babak","baca cerita"],
   jawaban:"Cerita Nusantara memuat legenda dan cerita rakyat yang dibagi per babak supaya mudah dibaca. Setiap cerita punya pesan dan makna budaya di akhirnya.",
   tautan:{label:"Baca cerita",href:"cerita/index.html"}, lanjut:["ceritapopuler","dokumentasi"], sumber:"", verif:true},
  {id:"ceritapopuler", topik:"Cerita populer", kata:["malin kundang","sangkuriang","roro jonggrang","timun mas","si kancil","kancil"],
   jawaban:"Beberapa cerita rakyat yang dikenal luas: Malin Kundang (Sumatera Barat), Sangkuriang (Jawa Barat), Roro Jonggrang (Jawa Tengah dan DIY), dan Timun Mas (Jawa). Satu cerita bisa punya beberapa versi di daerah berbeda.",
   tautan:{label:"Cerita Nusantara",href:"cerita/index.html"}, lanjut:["cerita"], sumber:"Pengetahuan umum", verif:false},

  /* ===== Klaim budaya dan dokumentasi ===== */
  {id:"klaim", topik:"Klaim budaya", kata:["klaim","sengketa","diklaim","polemik","dipersengketakan","mengapa budaya diklaim"],
   jawaban:"Polemik klaim budaya sering diperparah oleh dokumentasi yang lemah, arsip yang tidak rapi, dan kurangnya kepedulian masyarakat. Karena itu pencatatan yang kuat jadi perlindungan pertama.",
   tautan:{label:"Empat kasus",href:"index.html#kasus"}, lanjut:["dokumentasi","pendet","bersama"], sumber:"Rumusan masalah situs ini", verif:true},
  {id:"dokumentasi", topik:"Cara mendokumentasikan budaya", kata:["dokumentasi","mendokumentasikan","mencatat","arsipkan","cara mencatat","catat budaya","dokumentasikan"],
   jawaban:"Lima langkah: (1) catat nama, asal daerah, dan makna; (2) foto atau rekam dengan mencantumkan tanggal; (3) wawancarai pelestari dan minta izinnya; (4) cantumkan sumber; (5) unggah ke Arsip Komunitas.",
   tautan:{label:"Mulai unggah",href:"arsip/index.html"}, lanjut:["unggah","wbtb"], sumber:"", verif:true},
  {id:"bersama", topik:"Pengakuan bersama", kata:["bersama","dimiliki bersama","diakui bersama","nominasi bersama","multinasional"],
   jawaban:"Tidak semua pengakuan UNESCO bersifat tunggal. Kebaya didaftarkan bersama Brunei, Malaysia, Singapura, dan Thailand, dan Pantun bersama Malaysia. Yang membedakan adalah dokumentasi dan kerja sama yang jelas.",
   tautan:null, lanjut:["kebaya","pantun"], sumber:"The Jakarta Post, 12 Desember 2024", verif:true},

  /* ===== UNESCO dan WBTb ===== */
  {id:"wbtb", topik:"Warisan Budaya Takbenda", kata:["takbenda","warisan budaya takbenda","wbtb","intangible","tak benda"],
   jawaban:"Warisan budaya takbenda berupa praktik, ekspresi, pengetahuan, dan keterampilan, misalnya seni pertunjukan dan tradisi lisan. Candi, prasasti, dan naskah termasuk warisan yang berwujud benda. Indonesia meratifikasi Konvensi UNESCO 2003 lewat Perpres 78 Tahun 2007.",
   tautan:null, lanjut:["unesco","dokumentasi"], sumber:"UNESCO; Perpres 78/2007", verif:true},
  {id:"unesco", topik:"Jumlah pengakuan UNESCO", kata:["unesco","diakui unesco","berapa pengakuan","jumlah unesco","warisan dunia"],
   jawaban:"Menurut halaman UNESCO untuk Indonesia, ada 16 elemen budaya takbenda Indonesia yang terdaftar (per Oktober 2026). Angkanya bisa bertambah, jadi cek ulang ke situs UNESCO.",
   tautan:null, lanjut:["gariswaktu","batik","reog"], sumber:"ich.unesco.org/state/indonesia-ID", verif:true},
  {id:"gariswaktu", topik:"Garis waktu pengakuan", kata:["garis waktu","tahun berapa","kapan diakui","timeline","urutan pengakuan"],
   jawaban:"2008: Wayang dan Keris. 2009: Batik. 2010: Angklung. 2011: Tari Saman. 2012: Noken. 2015: tiga genre tari tradisional Bali. 2020: Pantun. 2021: Gamelan. 2023: Jamu. 2024: Kebaya, Kolintang, dan Reog Ponorogo.",
   tautan:null, lanjut:["unesco"], sumber:"UNESCO; Republika 2016; The Jakarta Post 2024", verif:true},

  /* ===== Kasus dan budaya spesifik ===== */
  {id:"batik", topik:"Batik", kata:["batik","malam","canting","motif batik","parang","kawung"],
   jawaban:"Batik adalah teknik pewarnaan kain dengan malam (lilin) untuk menahan warna sehingga terbentuk motif. UNESCO mengukuhkannya sebagai warisan budaya takbenda dari Indonesia pada 2 Oktober 2009.",
   tautan:null, lanjut:["haribatik","unesco"], sumber:"UNESCO; CNN Indonesia", verif:true},
  {id:"haribatik", topik:"Hari Batik Nasional", kata:["hari batik","hari batik nasional","2 oktober","tanggal batik"],
   jawaban:"Hari Batik Nasional diperingati setiap 2 Oktober, berdasarkan Keppres Nomor 33 Tahun 2009 (17 November 2009). Tanggal itu mengikuti pengukuhan batik oleh UNESCO pada 2 Oktober 2009. Hari Batik bukan hari libur.",
   tautan:null, lanjut:["batik"], sumber:"Keppres 33/2009; CNN Indonesia", verif:true},
  {id:"angklung", topik:"Angklung", kata:["angklung","bambu","padaeng"],
   jawaban:"Angklung adalah alat musik bambu yang berasal dari Jawa Barat dan dimainkan dengan menggoyangkan tabungnya. UNESCO menetapkannya sebagai warisan budaya takbenda dari Indonesia pada 2010.",
   tautan:null, lanjut:["gamelan","gariswaktu"], sumber:"UNESCO; Republika 2016", verif:true},
  {id:"reog", topik:"Reog Ponorogo", kata:["reog","ponorogo","dadak merak","barongan","warok"],
   jawaban:"Reog Ponorogo adalah seni pertunjukan dari Ponorogo, Jawa Timur, dengan dadak merak dan barongan. Pada 2024 UNESCO memasukkannya ke Daftar yang Membutuhkan Perlindungan Mendesak karena maestro dan murid yang menerima pewarisan semakin sedikit.",
   tautan:null, lanjut:["unesco","dokumentasi"], sumber:"UNESCO Keputusan 19.COM 7.A.2", verif:true},
  {id:"pendet", topik:"Tari Pendet", kata:["pendet","tari pendet","tarian penyambutan","penyambutan"],
   jawaban:"Pendet adalah tarian penyambutan dari Bali. Pada 2009 tarian ini tampil dalam sebuah tayangan promosi dengan keterangan asal yang keliru, lalu penyiarnya meminta maaf. Pelajarannya: atribusi dan dokumentasi yang jelas itu penting.",
   tautan:null, lanjut:["klaim","dokumentasi"], sumber:"Pemberitaan 2009 (Wikipedia, Malaysiakini, NU Online)", verif:true},
  {id:"gamelan", topik:"Gamelan", kata:["gamelan","saron","gender","gong","slendro","pelog"],
   jawaban:"Gamelan adalah ansambel musik tradisional yang lekat dengan budaya Jawa dan Bali. UNESCO menetapkannya sebagai warisan budaya takbenda pada 2021.",
   tautan:null, lanjut:["angklung","gariswaktu"], sumber:"UNESCO (Gamelan, 16.COM)", verif:true},
  {id:"kolintang", topik:"Kolintang", kata:["kolintang","minahasa"],
   jawaban:"Kolintang adalah alat musik pukul dari bilah-bilah kayu yang berasal dari Minahasa, Sulawesi Utara. Kolintang tercatat dalam daftar UNESCO pada 2024.",
   tautan:null, lanjut:["gamelan","bersama"], sumber:"The Jakarta Post 2024; pengetahuan umum untuk asal daerah", verif:true},
  {id:"kebaya", topik:"Kebaya", kata:["kebaya"],
   jawaban:"Kebaya didaftarkan UNESCO pada 2024 sebagai pencalonan bersama Indonesia, Brunei, Malaysia, Singapura, dan Thailand.",
   tautan:null, lanjut:["bersama","unesco"], sumber:"The Jakarta Post, 12 Desember 2024", verif:true},
  {id:"pantun", topik:"Pantun", kata:["pantun"],
   jawaban:"Pantun didaftarkan UNESCO pada 2020 sebagai pencalonan bersama Indonesia dan Malaysia.",
   tautan:null, lanjut:["bersama"], sumber:"The Jakarta Post, 12 Desember 2024", verif:true},
  {id:"noken", topik:"Noken", kata:["noken"],
   jawaban:"Noken adalah tas rajut atau anyam tradisional masyarakat Papua. UNESCO mencatatnya pada 2012 dalam daftar yang membutuhkan perlindungan mendesak.",
   tautan:null, lanjut:["unesco"], sumber:"Republika 2016; UNESCO", verif:true},
  {id:"saman", topik:"Tari Saman", kata:["saman","gayo","aceh"],
   jawaban:"Tari Saman berasal dari masyarakat Gayo di Aceh, dikenal dengan gerakan serempak sambil duduk dan tepukan. UNESCO mencatatnya pada 2011.",
   tautan:null, lanjut:["tari","gariswaktu"], sumber:"Republika 2016; pengetahuan umum", verif:true},
  {id:"jamu", topik:"Jamu", kata:["jamu","ramuan","obat tradisional"],
   jawaban:"Jamu, tradisi ramuan kesehatan Indonesia, tercatat dalam daftar UNESCO pada 2023 (sertifikat diterbitkan 6 Desember 2023).",
   tautan:null, lanjut:["gariswaktu"], sumber:"Antara; UNESCO", verif:true},
  {id:"wayangkeris", topik:"Wayang dan Keris", kata:["wayang","keris","kelir","dalang"],
   jawaban:"Wayang dan Keris termasuk elemen Indonesia yang tercatat di daftar UNESCO sejak 2008.",
   tautan:null, lanjut:["gariswaktu"], sumber:"Republika 2016", verif:true},
  {id:"pencaksilat", topik:"Pencak Silat", kata:["pencak silat","silat"],
   jawaban:"Pencak Silat termasuk elemen yang tercatat di daftar UNESCO. Cek tahun pastinya di halaman UNESCO untuk Indonesia.",
   tautan:null, lanjut:["unesco"], sumber:"Sekretariat Kabinet; UNESCO", verif:true},
  {id:"bahasa", topik:"Bahasa daerah", kata:["bahasa daerah","berapa bahasa","bahasa punah","bahasa terancam","revitalisasi"],
   jawaban:"Badan Bahasa memetakan 718 bahasa daerah di Indonesia, dan 11 di antaranya sudah punah. Jumlah terbanyak ada di Papua (428 bahasa). Karena itu pendokumentasian bahasa daerah sangat penting.",
   tautan:null, lanjut:["aksara","dokumentasi"], sumber:"Antara; rmol.id (data Badan Bahasa)", verif:true},
  {id:"aksara", topik:"Aksara daerah", kata:["aksara","hanacaraka","lontara","tulisan daerah"],
   jawaban:"Hanacaraka adalah nama lain aksara Jawa (aksara Bali punya urutan serupa). Aksara Lontara digunakan masyarakat Bugis dan Makassar di Sulawesi Selatan.",
   tautan:null, lanjut:["bahasa"], sumber:"Pengetahuan umum", verif:false},

  /* ===== Pengetahuan umum (WAJIB dicek ulang) ===== */
  {id:"rumahadat", topik:"Rumah adat", kata:["rumah adat","rumah gadang","joglo","honai","tongkonan"],
   jawaban:"Contoh rumah adat: Rumah Gadang (Minangkabau, Sumatera Barat) beratap bergonjong, Joglo (Jawa), Honai (Papua) berbentuk bulat beratap jerami, dan Tongkonan (Toraja, Sulawesi Selatan) beratap melengkung seperti perahu.",
   tautan:null, lanjut:["kuis"], sumber:"Pengetahuan umum", verif:false},
  {id:"kuliner", topik:"Kuliner tradisional", kata:["kuliner","makanan","rendang","papeda","gudeg","masakan"],
   jawaban:"Contoh kuliner: rendang berasal dari Minangkabau, papeda dari sagu (Papua dan Maluku), dan gudeg khas Yogyakarta dari nangka muda.",
   tautan:null, lanjut:["kuis"], sumber:"Pengetahuan umum", verif:false},
  {id:"tradisi", topik:"Tradisi dan upacara", kata:["tradisi","upacara","ngaben","pasola","fahombo","lompat batu"],
   jawaban:"Contoh tradisi: Ngaben (upacara kremasi umat Hindu di Bali), Pasola (perang-perangan berkuda dari Sumba, NTT), dan Fahombo atau lompat batu dari Nias.",
   tautan:null, lanjut:["cerita"], sumber:"Pengetahuan umum", verif:false},
  {id:"tari", topik:"Tarian daerah", kata:["tari","tarian","kecak","tari piring","cakalele","menari"],
   jawaban:"Contoh tarian: Kecak (Bali) diiringi paduan suara \"cak\", Tari Piring (Minangkabau) membawa piring di telapak tangan, dan Cakalele (Maluku) adalah tarian perang.",
   tautan:null, lanjut:["saman","pendet"], sumber:"Pengetahuan umum", verif:false},
  {id:"musik", topik:"Alat musik", kata:["alat musik","musik tradisional","sasando"],
   jawaban:"Contoh alat musik: Angklung (Jawa Barat), Sasando (Pulau Rote, NTT) dengan resonator daun lontar, Kolintang (Sulawesi Utara), dan perangkat Gamelan (Jawa dan Bali).",
   tautan:null, lanjut:["angklung","gamelan","kolintang"], sumber:"Pengetahuan umum", verif:false},
  {id:"kain", topik:"Kain tradisional", kata:["kain","tenun","songket","ulos","kain tradisional"],
   jawaban:"Contoh kain: Songket Palembang (Sumatera Selatan) dengan benang emas atau perak, Ulos (Batak, Sumatera Utara), dan Batik yang dibuat dengan teknik malam.",
   tautan:null, lanjut:["batik"], sumber:"Pengetahuan umum", verif:false}
];

const SARAN_AWAL = ["klaim","dokumentasi","unggah","kuis","cerita"];

const BALASAN_CADANGAN = "Maaf, saya belum paham pertanyaan itu. Coba tanyakan tentang cara mengunggah dokumen, kuis, peringkat, cerita rakyat, klaim budaya, pengakuan UNESCO, atau budaya seperti Batik, Angklung, Reog, Pendet, dan Gamelan.";
