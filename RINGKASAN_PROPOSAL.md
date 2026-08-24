# Ringkasan Eksekutif Sistem SIMCYBER (Phishing Simulation)

_(Dokumen Pendukung Penyusunan Proposal Skripsi/Penelitian)_

---

## 1. Latar Belakang (Background)

Di era digital saat ini, ancaman keamanan siber—terutama serangan rekayasa sosial (_Social Engineering_) seperti _Phishing_—merupakan salah satu bahaya terbesar bagi keamanan data institusi dan individu. Di lingkungan institusi pendidikan (skala sekolah), siswa remaja merupakan salah satu kelompok rentan akibat kebiasaan mengonsumsi informasi dan berinteraksi di internet tanpa landasan literasi privasi yang memadai.

Untuk mengukur dan memetakan kerentanan ini secara ilmiah, diperlukan sebuah instrumen berupa sistem simulasi _phishing_ tertutup. Sistem ini tidak dirancang sekadar untuk mengirim _email spam_, melainkan dibentuk sebagai "laboratorium perilaku digital" (Behavioral Measurement Tool) yang dikontrol penuh oleh peneliti, di mana respons siswa diukur secara empiris tanpa menyadari bahwa mereka sedang diteliti pada saat aksi terjadi.

## 2. Tujuan Pengembangan Sistem (Objectives)

Sistem **SIMCYBER** dirancang dan dibangun untuk mencapai tujuan penelitian sebagai berikut:

1. **Pengukuran Kerentanan (Behavioral Analytics):** Menjadi alat pancing digital yang menangkap keputusan motorik dan impulsif responden ketika dihadapkan pada situasi manipulasi kepanikan (_Time Pressure_ / _Deception_).
2. **Evaluasi Berbasis KAB (Knowledge, Attitude, Behavior):**
    - **Behavior (Perilaku Terekam):** Diukur langsung secara otomatis dari interaksi impulsif pengguna pada portal _phishing_ palsu.
    - **Knowledge & Attitude (Pengetahuan & Sikap):** Diukur secara teoretis pasca-simulasi melalui sistem kuesioner terintegrasi (_Tally.so_).

---

## 3. Data Input dan Output (I/O) Sistem

Dalam rekayasa rekam sistemnya, sistem melakukan serangkaian klasifikasi keluar masuknya data sebagai parameter ukur:

### A. Data Masukan (Input)

Terdapat dua entitas utama yang memasukkan variabel data pada sistem:

1. **Input dari Peneliti (Admin/Researcher):**
    - **Data Responden:** _File CSV_ yang memuat kolom informasi demografis siswa (Nama, Kelas, Alamat Email, dan Nomor WhatsApp).
    - **Konfigurasi Simulasi:** Durasi _Time Limit_ (tenggat kedaluwarsa link), dan otorisasi _Research Key_ sebelum transmisi data dieksekusi.
2. **Input dari Responden (Korban):**
    - **Interaksi Motorik (Keystroke & Mouse Event):** Keputusan membuka email, aktivitas mengetik pada _form_ manipulatif (sensor _keystroke_ menangkap interaksi _True/False_ tanpa merekam _password_ yang diketik), hingga klik pada tombol aksi (`Submit` maupun `Batal`).
    - **Variabel Akademik:** Jawaban _checkbox/radio-button_ pada kuesioner pengetahuan (_Knowledge & Attitude_) di Tally.so.

### B. Data Keluaran (Output)

1. **Output untuk Responden:**
    - Surel/Email yang disamarkan (_HTML Phishing Mail_).
    - Layar _Debriefing_ (_Banner Notifikasi KELULUSAN / Edukasi_) berupa penjelasan _Reveal Page_ yang mencairkan skenario penipuan menjadi instrumen edukasi kesadaran.
2. **Output untuk Peneliti:**
    - **Statistic Dashboard:** Representasi metrik secara _Live_ mengenai tingkat _Response Rate_ korban yang masuk pancingan (Berbasis persentase sukses vs gagal berdasar kelas).
    - **Tabel Log Ekspor (Data Primer Penelitian):** File luaran (format Excel/CSV) yang membukukan kompilasi jejak digital (waktu tekan _submit/reject_) terintegrasi langsung dengan skor KAB responden via sinkronisasi _Session Token_.

---

## 4. Alur Logika Sistem (System Logical Flow)

Proses kerja atau _Pipeline_ sistem SIMCYBER disusun agar setiap _step_ men-trigger aktivitas di _step_ berikutnya secara otomatis (_End-to-End_). Berikut merupakan penjelasan diagram alur logika berjalannya (_flow_) dari hulu hingga ke hilir:

1. **Fase Inisialisasi & Pengiriman (Distribusi Tautan)**
    - **[Logika Masuk]:** Peneliti mengunggah CSV tabel responden -> Memasukkan _Research Key_.
    - **[Proses]:** Sistem di latar belakang membangun ribuan tautan URL pancingan yang bersifat unik (_personalized URL_) untuk tiap-tiap entitas _Email_ berbekal identifikasi UUID/Token acak milik responden. Sistem melempar operasi eksekusi surel ke dalam _Background Job Queues_ untuk memitigasi waktu tunggu (_time-out_).
    - **[Keluaran]:** Sinkronisasi server terkirim ke _inbox_ korban tanpa hambatan.
2. **Fase Trap / Pancingan (Pengendalian Keputusan)**
    - **[Logika Masuk]:** Responden terdistraksi dan memencet tautan di dalam email. URL memverifikasi tenggat kedaluwarsa waktu (_Is Expired?_).
    - **[Proses]:** Jika batas waktu kedaluwarsa (_Time limit_) tidak terpenuhi/habis, layar mengunci responden pada _Page Expired_. Namun, apabila sesi URL aktif, mesin me-render _View_ portal _phishing_ mirip halaman otentik instansi/aplikasi lokal.
    - **[Sensor Perilaku]:** Mesin menanam _javascript tracker_ tersembunyi. Saat responden mengetik di dalam kotak rahasia, status '_Keystroke_Detected_' pada Database disahkan menjadi `True` (angka 1). Ketika responden menyeplos opsi penyerahan di layar, _Action_State_ langsung terkunci (_Submit_ atau _Cancel_).
3. **Fase Konfirmasi & Edukasi Jembatan (_Reveal/Debrief_)**
    - **[Proses Auto-Redirect]:** Hanya hitungan mili-detik pascalogika perilaku sukses terekam di _Database Controller_, korban tidak lantas dialihkan pada kehampaan, sebaliknya, _Router_ menjejalkan mereka pada `Reveal Page`.
4. **Fase Evaluasi Silang (Integrasi form Tally.so)**
    - **[Logika Masuk]:** Pada lembar _Reveal_, sistem merekatkan tombol menuju formulir KAB teori eksternal dengan mengekori parameter URL `?session_token=xxx`.
    - **[Proses Endpoint]:** _Hidden Fields_ di platform kuesioner menyedot ekstrak `session_token` tersebut dan mengawinkannya pada jawaban soal instrumen penelitian si siswa.
    - **[Kembali / Lulus]:** Saat Tally Form berstatus diajukan (_Submit_), logika pengaturan _Callback webhook_ dengan label `?completed=true` menendang pengguna kembali ke situs asal _Edukasi Phishing_; menghidupkan layar notifikasi besar (Lencana _Banner Hijau_) sebagai pengesahan simulasi kelar dengan nilai aman.

---

## 5. Fitur Penunjang Keamanan & Infrastruktur (_Technical Details_)

Aplikasi SIMCYBER dibangun dengan fondasi teknologi terkini:

- **Zero-Knowledge Architecture:** Mesin ini hanya merekam "_Siswa X merespons Form Y pada jam 10:14_", namun sama sekali buta (_Zero Knowledge_) terhadap isi spesifik dari _Password_ apapun yang sempat siswa ketik di dalam portal tipuan. Ini memenuhi kaidah etika privasi dan sekuritas hukum IT yang paling ketat.
- **Double-Layer Authentication:** Fitur _Sudo-Mode_ otorisasi Ganda. Eksekusi pengiriman Phishing (_Mass Mailing_) atau pengeksporan _data research_ tidak akan jalan secara hukum jika Peneliti (Admin) gagal menunjukkan kunci _Research Key_ rahasianya, meskipun peneliti sedang _Login_ di dalam sistem.
- **Tech Stack Ekosistem:** Laravel 11.x MVC (Backend), React/Inertia SPA (_Single Page Application_), dan standar pewarnaan _TailwindCSS_. Penguatan logika ditangani otomatis (_CI/CD Automation Pipeline_) via Github Actions.
