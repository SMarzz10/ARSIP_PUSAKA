window.ARSIP_DATA = {
  // Kategori bersama untuk filter arsip komunitas.
  categories: ["Tari", "Musik", "Kerajinan", "Bahasa & Aksara", "Kuliner", "Upacara"],
  // Data contoh untuk demonstrasi katalog; tandai sebagai fiktif di antarmuka.
  archiveItems: [
    { id: "demo-angklung", title: "Angklung Buhun di Kampung Adat", category: "Musik", origin: "Lebak, Banten", description: "Catatan tentang fungsi angklung dalam siklus pertanian masyarakat Baduy.", source: "Wawancara dan catatan komunitas — contoh untuk prototipe.", username: "jejak_kita", date: "2026-10-12", demo: true, image: "foto_arsip/Angklung Buhun di Kampung Adat.jpeg" },
    { id: "demo-batik", title: "Motif Batik Sekar Jagad", category: "Kerajinan", origin: "Yogyakarta", description: "Dokumentasi awal tentang ragam motif dan cara masyarakat menjelaskannya.", source: "Catatan komunitas — contoh; rujukan khusus perlu diverifikasi.", username: "larasbumi", date: "2026-10-10", demo: true, image: "foto_arsip/Motif Batik Sekar Jagad.jpeg" },
    { id: "demo-seren-taun", title: "Tradisi Seren Taun", category: "Upacara", origin: "Kuningan, Jawa Barat", description: "Ringkasan rangkaian syukur panen dalam tradisi setempat.", source: "Catatan kebudayaan daerah — contoh untuk prototipe.", username: "aksara27", date: "2026-10-08", demo: true, image: "foto_arsip/Tradisi Seren Taun.jpeg" },
    { id: "demo-lontara", title: "Aksara Lontara", category: "Bahasa & Aksara", origin: "Sulawesi Selatan", description: "Pengenalan bentuk dan penggunaan aksara tradisional Bugis-Makassar.", source: "Bahan ajar komunitas — contoh; rujukan khusus perlu diverifikasi.", username: "sanggar_sore", date: "2026-10-04", demo: true, image: "foto_arsip/Aksara Lontara.jpeg" },
    { id: "demo-saman", title: "Tari Saman", category: "Tari", origin: "Gayo Lues, Aceh", description: "Catatan pola gerak, kebersamaan, dan pewarisan tari.", source: "UNESCO dan catatan komunitas — entri khusus perlu diverifikasi.", username: "ratih_nusa", date: "2026-10-01", demo: true, image: "foto_arsip/Tari Saman.jpeg" },
    { id: "demo-papeda", title: "Papeda dan Cara Mengolahnya", category: "Kuliner", origin: "Papua & Maluku", description: "Catatan pengolahan sagu dan konteks makan bersama.", source: "Penuturan keluarga — contoh; izin dan narasumber perlu diverifikasi.", username: "dapur_timur", date: "2026-09-29", demo: true, image: "foto_arsip/Papeda dan Cara Mengolahnya.jpeg" }
  ],
  // Bank soal lokal beserta jawaban dan penjelasan setiap pilihan.
  quizQuestions: [
    { category: "Musik", question: "Alat musik angklung menghasilkan bunyi terutama ketika…", options: ["Dipetik seperti kecapi", "Digoyangkan sehingga tabung bambunya bergetar", "Ditiup melalui lubang", "Dipukul dengan pemukul kayu"], answer: 1, explanation: "Tabung-tabung bambu angklung bergetar saat alat digoyangkan." },
    { category: "Kerajinan", question: "Batik tulis dibuat dengan bantuan alat bernama…", options: ["Canting", "Sasando", "Pahat", "Rindik"], answer: 0, explanation: "Canting digunakan untuk menorehkan malam pada kain dalam proses batik tulis." },
    { category: "Tari", question: "Tari Saman dikenal berasal dari masyarakat…", options: ["Gayo di Aceh", "Baduy di Banten", "Asmat di Papua", "Sasak di Lombok"], answer: 0, explanation: "Tari Saman tumbuh dalam masyarakat Gayo di Aceh." },
    { category: "Bahasa & Aksara", question: "Aksara Lontara secara tradisional digunakan oleh masyarakat…", options: ["Bugis dan Makassar", "Baduy", "Mentawai", "Dayak Kenyah saja"], answer: 0, explanation: "Lontara merupakan salah satu aksara tradisional yang digunakan dalam tradisi tulis Bugis dan Makassar." },
    { category: "Kuliner", question: "Bahan utama papeda adalah…", options: ["Sagu", "Ketan hitam", "Singkong", "Jagung"], answer: 0, explanation: "Papeda dibuat dari pati sagu dan dikenal antara lain di Papua serta Maluku." },
    { category: "Rumah Adat", question: "Rumah Gadang merupakan rumah tradisional masyarakat…", options: ["Minangkabau", "Toraja", "Baduy", "Betawi"], answer: 0, explanation: "Rumah Gadang adalah rumah tradisional Minangkabau di Sumatera Barat." },
    { category: "Kasus dokumentasi", question: "Apa langkah awal yang paling bertanggung jawab sebelum merekam penuturan tradisi?", options: ["Merekam diam-diam agar alami", "Meminta izin narasumber dan menjelaskan tujuan", "Mengunggah rekaman dahulu", "Menghapus nama narasumber"], answer: 1, explanation: "Izin yang jelas dan tujuan pencatatan yang terbuka menghormati narasumber." },
    { category: "Musik", question: "Sasando adalah alat musik tradisional yang berkaitan dengan…", options: ["Pulau Rote", "Pulau Bali", "Kepulauan Mentawai", "Kota Jakarta"], answer: 0, explanation: "Sasando merupakan alat musik petik dari Pulau Rote, Nusa Tenggara Timur." },
    { category: "Tari", question: "Tari Pendet berkembang dari tradisi masyarakat di…", options: ["Bali", "Aceh", "Papua", "Kalimantan Selatan"], answer: 0, explanation: "Pendet tumbuh dalam kebudayaan Bali dan dikenal dalam berbagai fungsi pertunjukan." },
    { category: "Kerajinan", question: "Tenun ikat memperoleh motifnya melalui proses…", options: ["Mengikat dan mencelup benang sebelum ditenun", "Melukis kain setelah dipakai", "Mengukir permukaan kayu", "Mencetak tanah liat"], answer: 0, explanation: "Pada teknik ikat, bagian benang diikat sebelum pencelupan untuk membentuk motif saat ditenun." },
    { category: "Rumah Adat", question: "Rumah Tongkonan adalah rumah tradisional masyarakat…", options: ["Toraja", "Sunda", "Madura", "Banjar"], answer: 0, explanation: "Tongkonan merupakan rumah adat masyarakat Toraja di Sulawesi Selatan." },
    { category: "Kuliner", question: "Bumbu utama yang memberi rasa asam khas pada pempek umumnya disajikan sebagai…", options: ["Cuko", "Sambal matah", "Bumbu rujak", "Kuah santan"], answer: 0, explanation: "Pempek dari Palembang lazim disantap dengan kuah cuko yang bercita rasa asam, manis, dan pedas." },
    { category: "Bahasa & Aksara", question: "Bahasa daerah sebaiknya didokumentasikan dengan mencatat…", options: ["Kata saja tanpa konteks", "Penutur, konteks penggunaan, arti, dan izin", "Terjemahan otomatis saja", "Hanya kata yang sedang populer"], answer: 1, explanation: "Konteks, identitas narasumber sesuai persetujuan, dan izin membantu menjaga catatan tetap bermakna." },
    { category: "Musik", question: "Kolintang secara tradisional dibuat dari bilah-bilah…", options: ["Kayu", "Kaca", "Kulit", "Bambu saja"], answer: 0, explanation: "Kolintang adalah alat musik pukul berbahan bilah kayu dari Minahasa, Sulawesi Utara." },
    { category: "Kasus dokumentasi", question: "Sumber dan konteks pada sebuah arsip budaya berfungsi untuk…", options: ["Menggantikan izin", "Membantu orang lain menelusuri dan memahami catatan", "Menentukan siapa paling berhak atas budaya", "Membuat semua versi menjadi sama"], answer: 1, explanation: "Sumber, konteks, tanggal, dan asal membantu pembaca menilai serta memahami dokumentasi." },
    { category: "Tari", question: "Tari Kecak dikenal sebagai pertunjukan yang menggunakan…", options: ["Paduan suara vokal berulang", "Orkestra gesek", "Piano tunggal", "Seruling logam"], answer: 0, explanation: "Paduan suara penari yang berseru berulang menjadi unsur bunyi yang mudah dikenali dari pertunjukan Kecak." },
    { category: "Kerajinan", question: "Salah satu cara menghormati pembuat kerajinan saat mendokumentasikan karyanya adalah…", options: ["Mencantumkan pembuat dengan izin", "Menghapus nama pembuat", "Mengunggah ulang tanpa keterangan", "Mengubah motif dan mengakuinya"], answer: 0, explanation: "Kredit yang disepakati dan izin yang jelas menghormati pembuat serta konteks karyanya." },
    { category: "Rumah Adat", question: "Rumah Honai dikenal sebagai rumah tradisional dari…", options: ["Papua", "Jawa Timur", "Sumatera Barat", "Bangka Belitung"], answer: 0, explanation: "Honai adalah rumah tradisional yang dikenal di wilayah pegunungan Papua." },
    { category: "Kuliner", question: "Rendang dikenal luas sebagai kuliner yang berkembang dalam tradisi…", options: ["Minangkabau", "Sasak", "Betawi", "Melayu Deli saja"], answer: 0, explanation: "Rendang berakar pada tradisi kuliner Minangkabau." },
    { category: "Bahasa & Aksara", question: "Aksara Jawa tradisional juga dikenal dengan nama…", options: ["Hanacaraka", "Pallawa", "Brahmi", "Latin"], answer: 0, explanation: "Hanacaraka adalah sebutan populer untuk aksara Jawa." },
    { category: "Tari", question: "Salah satu unsur penting dalam Tari Piring adalah penggunaan…", options: ["Piring sebagai properti tari", "Payung kertas sebagai alat musik", "Topeng kayu yang dipukul", "Layang-layang sebagai properti"], answer: 0, explanation: "Piring digunakan sebagai properti dalam Tari Piring dari Sumatera Barat." },
    { category: "Musik", question: "Tifa merupakan alat musik pukul yang dikenal di kawasan…", options: ["Maluku dan Papua", "Jawa Tengah dan DIY", "Sumatera Barat saja", "Kepulauan Riau saja"], answer: 0, explanation: "Tifa dikenal di sejumlah tradisi musik Maluku dan Papua dengan bentuk serta praktik yang beragam." },
    { category: "Kasus dokumentasi", question: "Bagaimana sebaiknya menulis tentang ragam versi sebuah cerita rakyat?", options: ["Menyebut satu versi sebagai satu-satunya yang benar", "Mencantumkan daerah, sumber, dan menyatakan bahwa versi dapat berbeda", "Menghapus semua perbedaan daerah", "Mengubah cerita tanpa memberi keterangan"], answer: 1, explanation: "Penyebutan daerah dan sumber membantu menghormati variasi tradisi lisan." },
    { category: "Kerajinan", question: "Noken adalah kerajinan tas anyaman yang dikenal dari…", options: ["Papua", "Banten", "Jawa Tengah", "Kepulauan Seribu"], answer: 0, explanation: "Noken merupakan tas tradisional dari Papua dengan ragam fungsi dan teknik." },
    { category: "Rumah Adat", question: "Rumah Joglo paling lekat dengan tradisi arsitektur masyarakat…", options: ["Jawa", "Melayu Riau", "Asmat", "Minahasa"], answer: 0, explanation: "Joglo merupakan salah satu bentuk rumah tradisional dalam tradisi arsitektur Jawa." },
    { category: "Kuliner", question: "Gudeg dikenal sebagai makanan yang lekat dengan daerah…", options: ["Yogyakarta", "Manado", "Padang", "Ambon"], answer: 0, explanation: "Gudeg adalah salah satu kuliner yang lekat dengan Yogyakarta." },
    { category: "Bahasa & Aksara", question: "Saat merekam kosakata bahasa daerah, informasi tambahan yang berguna adalah…", options: ["Contoh kalimat dan situasi pemakaian", "Warna pakaian penutur", "Jumlah pengikut media sosial", "Alamat rumah lengkap tanpa izin"], answer: 0, explanation: "Contoh kalimat dan konteks membantu menjelaskan pemakaian kata secara tepat." },
    { category: "Musik", question: "Saluang adalah alat musik tiup yang dikenal dalam tradisi…", options: ["Minangkabau", "Bali", "Papua", "Betawi"], answer: 0, explanation: "Saluang merupakan alat musik tiup bambu dalam tradisi musik Minangkabau." },
    { category: "Kasus dokumentasi", question: "Jika izin atas foto atau rekaman belum jelas, tindakan yang tepat adalah…", options: ["Tetap mengunggah dan berharap tidak masalah", "Tidak memublikasikannya sebelum izin diperoleh", "Menghapus nama pembuat lalu mengunggah", "Membagikan tautan pribadi ke semua orang"], answer: 1, explanation: "Jangan memublikasikan materi sebelum hak atau izin penggunaannya dipastikan." },
    { category: "Kerajinan", question: "Ukiran Jepara dikenal luas sebagai karya kerajinan berbahan…", options: ["Kayu", "Kertas", "Kaca patri", "Kulit kerang saja"], answer: 0, explanation: "Jepara di Jawa Tengah dikenal dengan tradisi ukiran kayu." }
  ],
  // Cerita ringkas yang disarikan dari "Kumpulan Cerita Rakyat Nusantara" (PDF).
  stories: [
    {
      id: "malin-kundang", title: "Malin Kundang", type: "Legenda", region: "Sumatera Barat", version: "Versi ringkas yang dikenal di Sumatera Barat", minutes: 4,
      summary: "Anak nelayan merantau dan menjadi saudagar kaya, lalu malu mengakui ibunya sendiri.",
      chapters: [
        "Dahulu, di sebuah desa nelayan di pesisir Sumatera Barat, hiduplah seorang janda miskin bersama anak laki-lakinya yang bernama Malin Kundang. Mereka hidup sederhana. Setiap hari ibunya bekerja keras agar Malin bisa makan dan tumbuh sehat.",
        "Ketika beranjak dewasa, Malin ingin mengubah nasib. Ia meminta izin kepada ibunya untuk merantau dengan menumpang kapal dagang. Ibunya berat hati melepas, tetapi akhirnya merestui sambil berpesan agar Malin tidak melupakan ibunya dan kampung halamannya. Bertahun-tahun berlalu. Di perantauan, Malin bekerja dengan gigih hingga menjadi saudagar kaya, memiliki kapal besar, dan menikahi perempuan cantik dari keluarga terpandang. Sementara itu, sang ibu setiap hari menunggu di tepi pantai, berharap anaknya pulang.",
        "Suatu hari, kapal megah Malin berlabuh di desa itu. Kabar pun menyebar. Sang ibu berlari menuju pelabuhan dan memeluk Malin sambil menangis haru. Namun Malin malu. Di hadapan istri dan awak kapalnya, ia tidak mau mengakui perempuan renta berpakaian lusuh itu sebagai ibunya. Ia bahkan mendorongnya hingga jatuh dan berkata kasar. Hati sang ibu hancur. Dengan air mata berlinang, ia menengadah dan berdoa agar anaknya mendapat balasan atas perbuatannya. Tak lama kemudian, langit menggelap, badai datang, dan ombak menghantam kapal Malin hingga hancur. Malin pun berubah menjadi batu di tepi pantai.",
        "Konon, bentuk batu itu menyerupai orang yang sedang bersujud, dan hingga kini cerita ini dikenang sebagai pengingat agar manusia tidak melupakan asal-usul dan jasa orang tuanya."
      ],
      meaning: "Hormatilah orang tua, jangan melupakan asal-usul, dan jangan sombong ketika sudah berhasil.",
      sources: ["Kumpulan Cerita Rakyat Nusantara (PDF), hlm. 3 — Malin Kundang, legenda Sumatera Barat.", "Versi tutur di berbagai daerah dapat berbeda; narasumber dan izin perlu dicatat sebelum publikasi."]
    },
    {
      id: "sangkuriang", title: "Sangkuriang", type: "Legenda", region: "Jawa Barat", version: "Versi ringkas yang dikenal di Jawa Barat", minutes: 4,
      summary: "Pemuda yang jatuh cinta pada ibunya sendiri dan gagal memenuhi syarat mustahil sebelum fajar.",
      chapters: [
        "Pada zaman dahulu di tanah Pasundan, hiduplah seorang putri cantik bernama Dayang Sumbi. Suatu hari, ketika sedang menenun, alat tenunnya terjatuh. Karena malas turun, ia berucap bahwa siapa pun yang mengambilkannya, jika perempuan akan dijadikan saudara, dan jika laki-laki akan dijadikan suami. Seekor anjing bernama Tumang mengambilkan alat tenun itu. Karena janjinya, Dayang Sumbi pun menikah dengan Tumang, yang sebenarnya adalah dewa yang dikutuk menjadi anjing. Dari pernikahan itu lahirlah seorang anak laki-laki bernama Sangkuriang.",
        "Sangkuriang tumbuh menjadi pemuda yang kuat dan pandai berburu, tanpa tahu bahwa Tumang adalah ayahnya. Suatu hari, ia marah karena buruannya gagal dan tanpa sengaja membunuh Tumang. Mengetahui hal itu, Dayang Sumbi murka dan memukul kepala anaknya dengan sendok nasi hingga terluka, lalu mengusirnya.",
        "Bertahun-tahun kemudian, Sangkuriang yang mengembara bertemu dengan seorang perempuan yang sangat cantik. Ia jatuh cinta dan ingin menikahinya. Perempuan itu ternyata Dayang Sumbi, yang awet muda. Namun Dayang Sumbi mengenali bekas luka di kepala Sangkuriang dan sadar bahwa pemuda itu adalah anaknya sendiri.",
        "Untuk menggagalkan pernikahan, Dayang Sumbi mengajukan syarat yang mustahil: Sangkuriang harus membendung sungai Citarum dan membuat perahu besar dalam satu malam. Dengan bantuan makhluk gaib, Sangkuriang hampir berhasil. Dayang Sumbi lalu menebarkan kain tenunnya hingga tampak merah seperti fajar, sehingga makhluk-makhluk gaib itu lari ketakutan. Sangkuriang marah dan menendang perahu buatannya hingga terbalik. Perahu itu konon menjadi Gunung Tangkuban Parahu, yang berarti perahu terbalik, di dekat Bandung."
      ],
      meaning: "Berhati-hatilah dalam berucap dan menepati janji, karena ucapan dapat membawa akibat yang panjang.",
      sources: ["Kumpulan Cerita Rakyat Nusantara (PDF), hlm. 4 — Sangkuriang, legenda Jawa Barat.", "Versi tutur di berbagai daerah dapat berbeda; narasumber dan izin perlu dicatat sebelum publikasi."]
    },
    {
      id: "timun-mas", title: "Timun Mas", type: "Dongeng", region: "Jawa Tengah", version: "Versi ringkas yang dikenal di Jawa", minutes: 4,
      summary: "Gadis yang lahir dari timun emas melarikan diri dari raksasa dengan empat bekal ajaib.",
      chapters: [
        "Dahulu hiduplah seorang janda tua bernama Mbok Sirni yang sangat ingin memiliki anak. Suatu hari, ia bertemu raksasa yang memberinya biji timun. Raksasa itu berpesan agar biji tersebut ditanam, dan bila sudah dewasa, anak yang lahir akan diserahkan kepadanya untuk dimakan.",
        "Mbok Sirni menanam biji itu, dan tumbuhlah sebuah timun emas yang besar. Ketika dibelah, di dalamnya ada bayi perempuan yang cantik. Ia diberi nama Timun Mas dan dibesarkan dengan penuh kasih sayang.",
        "Ketika Timun Mas dewasa, raksasa datang menagih janji. Mbok Sirni berbohong bahwa anaknya masih kecil, lalu meminta raksasa kembali beberapa tahun kemudian. Sementara itu, ia pergi menemui seorang pertapa yang memberinya empat bungkusan: biji timun, jarum, garam, dan terasi.",
        "Saat raksasa datang lagi, Timun Mas melarikan diri sambil membawa bungkusan itu. Raksasa mengejar dengan cepat. Timun Mas menebarkan biji timun, dan tumbuhlah ladang timun yang membuat raksasa sibuk memakannya. Ia melemparkan jarum, dan jarum itu berubah menjadi hutan bambu yang tajam. Ia menebarkan garam, dan terbentang lautan luas. Terakhir, ia melemparkan terasi, dan muncul lautan lumpur mendidih. Raksasa tercebur ke dalam lumpur itu dan tidak dapat keluar lagi. Timun Mas pun selamat dan kembali ke pelukan ibunya, lalu mereka hidup tenang dan bahagia."
      ],
      meaning: "Keberanian, kecerdikan, dan pertolongan yang datang pada saat tepat dapat mengalahkan bahaya sebesar apa pun.",
      sources: ["Kumpulan Cerita Rakyat Nusantara (PDF), hlm. 5 — Timun Mas, dongeng Jawa Tengah.", "Versi tutur di berbagai daerah dapat berbeda; narasumber dan izin perlu dicatat sebelum publikasi."]
    },
    {
      id: "kancil-buaya", title: "Kancil dan Buaya", type: "Fabel", region: "Nusantara", version: "Cerita rakyat yang beredar di banyak daerah", minutes: 3,
      summary: "Kancil menyeberangi sungai dengan mengelabui para buaya yang berbaris rapi.",
      chapters: [
        "Pada suatu musim kemarau, hutan menjadi sangat kering. Kancil merasa lapar dan haus. Di seberang sungai terdapat kebun yang penuh buah-buahan segar, tetapi sungai itu dihuni banyak buaya yang lapar.",
        "Kancil berpikir keras. Ia lalu berdiri di tepi sungai dan berseru dengan suara lantang bahwa Raja Hutan memerintahkan agar semua buaya dihitung, karena akan dibagikan daging segar sebagai hadiah. Mendengar kata daging, para buaya bersemangat dan segera muncul. Kancil meminta mereka berbaris dari tepi sungai hingga ke seberang agar mudah dihitung. Buaya-buaya itu pun menurut dan berbaris rapat.",
        "Kancil kemudian melompat ke punggung buaya pertama sambil menghitung, \"Satu, dua, tiga, empat...\", dan terus melompat dari satu buaya ke buaya lain hingga tiba di seberang.",
        "Setibanya di tepi sungai, Kancil tertawa dan berkata bahwa tidak ada hadiah daging, dan ia hanya ingin menyeberang. Para buaya sangat marah, tetapi sudah terlambat. Kancil pun berlari menuju kebun dan menikmati buah-buahan sepuasnya."
      ],
      meaning: "Akal dan kecerdikan dapat menolong kita keluar dari kesulitan, tetapi gunakanlah dengan bijak dan jangan untuk menipu orang lain.",
      sources: ["Kumpulan Cerita Rakyat Nusantara (PDF), hlm. 6 — Kancil dan Buaya, fabel Nusantara.", "Versi tutur di berbagai daerah dapat berbeda; narasumber dan izin perlu dicatat sebelum publikasi."]
    },
    {
      id: "roro-jonggrang", title: "Roro Jonggrang", type: "Legenda", region: "Jawa Tengah & DIY", version: "Kisah yang hidup di sekitar Prambanan", minutes: 4,
      summary: "Syarat seribu candi dalam semalam dilanggar dengan tipu daya, dan berakhir pada sebuah arca.",
      chapters: [
        "Dahulu, Kerajaan Prambanan dipimpin oleh Prabu Baka, seorang raja yang kuat. Kerajaan Pengging yang bertetangga dengannya dipimpin Raja Damar Moyo, yang memiliki putra gagah bernama Bandung Bondowoso. Dalam sebuah peperangan, Bandung Bondowoso berhasil mengalahkan Prabu Baka.",
        "Setelah menang, Bandung Bondowoso melihat putri Prabu Baka yang bernama Roro Jonggrang, dan ia jatuh hati. Ia melamar sang putri. Roro Jonggrang tidak ingin menikahi orang yang telah mengalahkan ayahnya, tetapi takut menolak secara terang-terangan. Maka ia mengajukan syarat yang tampaknya mustahil: Bandung Bondowoso harus membangun seribu candi dan dua sumur dalam satu malam. Bandung Bondowoso menerima, lalu memanggil para makhluk gaib untuk membantunya.",
        "Menjelang fajar, candi telah hampir selesai dan jumlahnya tinggal satu lagi. Roro Jonggrang cemas, lalu membangunkan para dayang untuk menumbuk padi dan menyalakan api di ufuk timur agar tampak seperti matahari terbit. Ayam-ayam berkokok, dan makhluk gaib mengira pagi telah tiba sehingga mereka pergi.",
        "Bandung Bondowoso menyadari bahwa ia telah ditipu. Dalam kemarahannya, ia mengutuk Roro Jonggrang menjadi arca batu sebagai candi yang keseribu. Konon, arca itu kini dikenal sebagai arca di Candi Prambanan."
      ],
      meaning: "Kejujuran lebih baik daripada tipu daya, dan keinginan yang dipaksakan sering berujung pada penyesalan.",
      sources: ["Kumpulan Cerita Rakyat Nusantara (PDF), hlm. 7 — Roro Jonggrang, legenda Jawa Tengah & DIY.", "Versi tutur di berbagai daerah dapat berbeda; narasumber dan izin perlu dicatat sebelum publikasi."]
    },
    {
      id: "danau-toba", title: "Asal Mula Danau Toba", type: "Legenda", region: "Sumatera Utara", version: "Cerita tentang keluarga, janji, dan asal sebuah danau besar", minutes: 4,
      summary: "Janji yang dilanggar dalam amarah melahirkan sebuah danau luas dan Pulau Samosir.",
      chapters: [
        "Dahulu, di sebuah lembah subur di Sumatera Utara, hiduplah seorang petani bernama Toba. Ia hidup sendiri dan bekerja keras mengolah ladang serta memancing ikan di sungai.",
        "Suatu hari, Toba menangkap seekor ikan besar yang sangat indah. Ketika hendak dimasak, ikan itu berubah menjadi seorang putri cantik. Ia berkata bahwa ia dikutuk menjadi ikan, dan kutukan itu berakhir karena Toba telah menangkapnya. Toba pun jatuh hati dan melamarnya. Sang putri bersedia dengan satu syarat: Toba tidak boleh sekali pun menceritakan bahwa istrinya berasal dari seekor ikan. Toba berjanji, dan mereka menikah. Tak lama kemudian, mereka dikaruniai seorang anak laki-laki bernama Samosir.",
        "Samosir tumbuh menjadi anak yang selalu merasa lapar. Suatu hari, ia memakan bekal ayahnya sebelum sempat diantar. Toba yang kelelahan dan lapar sangat marah, lalu berteriak, \"Dasar anak keturunan ikan!\"",
        "Janji pun dilanggar. Seketika, tanah bergetar dan air memancar dari dalam bumi. Hujan turun deras selama berhari-hari hingga lembah itu tergenang. Sang istri dan Samosir lenyap, dan lembah itu menjadi danau yang luas, yaitu Danau Toba. Di tengahnya muncul sebuah pulau yang disebut Pulau Samosir."
      ],
      meaning: "Menepati janji dan menjaga ucapan itu penting, dan amarah sesaat dapat membawa penyesalan yang besar.",
      sources: ["Kumpulan Cerita Rakyat Nusantara (PDF), hlm. 8 — Asal Mula Danau Toba, legenda Sumatera Utara.", "Versi tutur di berbagai daerah dapat berbeda; narasumber dan izin perlu dicatat sebelum publikasi."]
    },
    {
      id: "bawang-merah-putih", title: "Bawang Merah dan Bawang Putih", type: "Dongeng", region: "Nusantara", version: "Dongeng yang beredar dalam banyak versi", minutes: 4,
      summary: "Kebaikan hati Bawang Putih berbuah emas, sementara keserakahan Bawang Merah berbuah celaka.",
      chapters: [
        "Dahulu, di sebuah desa, hiduplah seorang gadis baik hati bernama Bawang Putih bersama ayahnya. Setelah ibunya meninggal, ayahnya menikah lagi dengan seorang janda yang membawa putri bernama Bawang Merah. Awalnya semua tampak baik-baik saja. Setelah ayah Bawang Putih meninggal, ibu tiri dan Bawang Merah menunjukkan sifat asli mereka. Bawang Putih dipaksa mengerjakan semua pekerjaan rumah, mulai dari memasak, mencuci, hingga membersihkan rumah, sementara Bawang Merah hanya bermalas-malasan.",
        "Suatu hari, ketika mencuci baju di sungai, pakaian kesayangan ibu tirinya hanyut terbawa arus. Bawang Putih disuruh mencarinya dan dilarang pulang sebelum menemukannya. Ia menyusuri sungai hingga bertemu seorang nenek tua yang ternyata menemukan baju itu. Nenek bersedia mengembalikannya asalkan Bawang Putih mau membantu pekerjaan rumahnya selama beberapa hari. Bawang Putih menyanggupinya dengan tulus.",
        "Setelah selesai, nenek menawarkan dua labu, yang besar atau yang kecil, sebagai hadiah. Bawang Putih memilih yang kecil karena merasa itu sudah cukup. Di rumah, labu itu dibelah dan ternyata berisi emas dan permata.",
        "Mengetahui hal itu, ibu tiri dan Bawang Merah menjadi iri. Bawang Merah sengaja menghanyutkan baju, lalu mendatangi nenek itu. Ia bekerja dengan malas dan serakah memilih labu yang besar. Saat dibuka di rumah, labu itu berisi ular dan binatang berbisa yang membuat mereka ketakutan. Sejak itu, mereka menyadari kesalahan mereka."
      ],
      meaning: "Kebaikan hati, kejujuran, dan sikap tidak serakah akan berbuah kebaikan, sedangkan iri dan keserakahan membawa celaka.",
      sources: ["Kumpulan Cerita Rakyat Nusantara (PDF), hlm. 9 — Bawang Merah dan Bawang Putih, dongeng Nusantara.", "Versi tutur di berbagai daerah dapat berbeda; narasumber dan izin perlu dicatat sebelum publikasi."]
    },
    {
      id: "batu-menangis", title: "Batu Menangis", type: "Legenda", region: "Kalimantan Barat", version: "Versi ringkas yang dikenal di Kalimantan Barat", minutes: 3,
      summary: "Anak yang malu mengakui ibunya berubah menjadi batu yang menangis.",
      chapters: [
        "Dahulu, di sebuah desa terpencil di Kalimantan Barat, hiduplah seorang janda miskin bersama putrinya yang cantik. Sayangnya, sang anak berperangai buruk. Ia pemalas, suka berhias, dan sering memerintah ibunya dengan kasar.",
        "Suatu hari, anak itu meminta ibunya menemaninya ke pasar untuk berbelanja. Ia berjalan di depan dengan pakaian bagus, sedangkan ibunya berjalan di belakang membawa barang dengan pakaian lusuh. Penduduk desa yang melihat bertanya siapa perempuan yang berjalan di belakang itu. Karena malu, anak itu menjawab bahwa perempuan itu hanyalah pembantunya. Ia mengulang jawaban yang sama setiap kali ada orang yang bertanya. Sang ibu mendengar semuanya, dan hatinya sangat sedih.",
        "Dengan air mata mengalir, sang ibu berdoa kepada Tuhan, \"Ya Tuhan, jika dia memang anakku, berilah dia pelajaran.\" Tak lama kemudian, tubuh anak itu perlahan mengeras mulai dari kaki. Ia menyesal dan memohon maaf sambil menangis, tetapi sudah terlambat. Akhirnya, seluruh tubuhnya berubah menjadi batu.",
        "Konon, batu itu terus mengeluarkan air seperti air mata, sehingga disebut Batu Menangis, sebagai pengingat tentang penyesalan seorang anak yang durhaka."
      ],
      meaning: "Hargailah ibu dan jangan pernah malu mengakui orang tua, apa pun keadaannya.",
      sources: ["Kumpulan Cerita Rakyat Nusantara (PDF), hlm. 10 — Batu Menangis, legenda Kalimantan Barat.", "Versi tutur di berbagai daerah dapat berbeda; narasumber dan izin perlu dicatat sebelum publikasi."]
    },
    {
      id: "nyi-roro-kidul", title: "Nyi Roro Kidul", type: "Mitos", region: "Jawa Tengah & DIY", version: "Sketsa; ragam tutur pesisir perlu diverifikasi", minutes: 3,
      summary: "Mitos penguasa laut selatan dengan beragam tutur asal-usulnya di pesisir Jawa.",
      chapters: [
        "Nyi Roro Kidul dikenal dalam kepercayaan Jawa sebagai penguasa laut selatan, yang membentang di sepanjang pesisir selatan Pulau Jawa. Sosoknya digambarkan sebagai perempuan cantik yang berkuasa atas samudra dan makhluk-makhluknya.",
        "Ada banyak versi tentang asal-usulnya. Dalam salah satu tutur, ia adalah putri raja dari Kerajaan Pajajaran yang diusir dari istana karena fitnah atau penyakit yang menimpanya. Dalam kesedihan, ia mengembara dan akhirnya menceburkan diri ke laut selatan, lalu menjadi penguasa samudra tersebut.",
        "Dalam tutur lain, ia dikaitkan dengan ikatan gaib dengan para raja Mataram. Disebutkan bahwa Panembahan Senopati bertemu dengannya dan terjalinlah hubungan spiritual yang dipercaya menjaga kerajaan. Warna hijau sering dikaitkan dengan Nyi Roro Kidul. Masyarakat di pesisir selatan, seperti di Parangtritis, percaya bahwa memakai pakaian berwarna hijau di tepi laut dapat mengundang perhatian sang penguasa. Karena itu, banyak orang yang menghindari warna tersebut ketika berada di pantai.",
        "Perlu diingat bahwa cerita ini merupakan mitos dan kepercayaan, dan ragam tuturannya berbeda-beda di tiap daerah pesisir."
      ],
      meaning: "Mitos ini mengajarkan sikap hormat kepada alam, khususnya laut, serta menjaga sopan santun ketika berada di tempat yang dianggap sakral.",
      sources: ["Kumpulan Cerita Rakyat Nusantara (PDF), hlm. 11 — Nyi Roro Kidul, mitos Jawa Tengah & DIY.", "Ragam tutur pesisir berbeda-beda; narasumber dan izin perlu dicatat sebelum publikasi."]
    }
  ]
};
