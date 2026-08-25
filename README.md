# 💖 Website Ulang Tahun Romantis & Interaktif

Website ucapan ulang tahun statis yang romantis, cute, anggun, dan interaktif khusus dibuat untuk pacar wanita. Website ini menggunakan **HTML, CSS, dan Vanilla JavaScript**, dilengkapi animasi *floating hearts*, *blooming digital flowers*, amplop surat cinta interaktif, galeri memori dengan modal *lightbox*, musik latar, serta *security PIN opening*.

---

## 🌟 Fitur Utama

1. **Page 1: Security PIN Screen (0101)**
   - Halaman pembuka romantis dengan keypad numerik dan dukungan keyboard fisik.
   - Pesan toast custom saat PIN salah (*"Hmm... coba ingat lagi sayang ♡"*).
   - Transisi *fade & scale* yang halus saat PIN benar.

2. **Page 2: Animated Gift Box**
   - Kado 3D interaktif dengan efek melayang (*floating*), pita satin, dan *sparkle*.
   - Efek animasi lid terlepas dan ledakan *confetti* saat kado di-tap.

3. **Page 3: Main Surprise Page**
   - **Hero Birthday**: Maskot kucing lucu dengan heading romantis dan badge hari lahir.
   - **Digital Flower Garden**: Bunga sakura, mawar, dan tulip digital CSS/SVG yang mekar perlahan saat di-scroll.
   - **Love Letter**: Amplop vintage dengan segel lilin yang dapat dibuka untuk menampilkan surat cinta pribadi.
   - **Our Little Memories**: Galeri 3 kartu memori foto dengan efek hover dan *lightbox modal* saat diklik.
   - **Final Message & Audio Player**: Tombol kirim cinta + ledakan *confetti*, footer cute, serta *floating music player* (🎵 / ⏸️).

---

## 📁 Struktur File Project

```text
/
├── index.html          # File HTML utama (Semua halaman SPA)
├── style.css           # Styling CSS utama, glassmorphism, animasi bunga & kado
├── script.js           # Logika interaktif, variabel CONFIG, PIN, confetti, & musik
├── assets/
│   ├── cat.png         # Gambar maskot kucing lucu
│   ├── memory1.jpg     # Foto kenangan 1
│   ├── memory2.jpg     # Foto kenangan 2
│   ├── memory3.jpg     # Foto kenangan 3
│   └── music.mp3       # File audio musik latar
└── README.md           # Panduan penggunaan & deployment
```

---

## 🚀 1. Cara Menjalankan Website Secara Lokal

Website ini **100% statis** dan tidak memerlukan backend, database, atau `npm install`.

### Opsi A: Buka Langsung di Browser
- Cukup double click file `index.html` atau *drag & drop* file `index.html` ke browser favorit Anda (Google Chrome, Safari, Edge, Mozilla Firefox).

### Opsi B: Gunakan Extension VS Code (Live Server)
1. Buka folder ini di **VS Code**.
2. Install extension **Live Server**.
3. Klik kanan pada file `index.html` lalu pilih **Open with Live Server**.

### Opsi C: Gunakan Python atau Node.js
```bash
# Menggunakan Python
python -m http.server 8000

# Atau menggunakan npx serve
npx serve .
```
Akses melalui browser di `http://localhost:8000`.

---

## ⚙️ 2. Cara Customization (Mengubah Data & Isi)

Semua pengaturan utama tersimpan di dalam objek `CONFIG` di baris atas file **`script.js`**.

```javascript
const CONFIG = {
  partnerName: "Sayang",        // 1. Nama Pacar
  senderName: "Aku",            // 2. Nama Kamu
  pin: "0101",                  // 3. PIN 4 Digit
  ...
};
```

---

### 🔑 3. Cara Mengganti PIN
Buka file **`script.js`**, cari bagian `pin:` di dalam `CONFIG`:
```javascript
const CONFIG = {
  pin: "1234", // Ganti dengan 4 digit tanggal lahir atau tanggal jadian kalian
};
```

---

### 💌 4. Cara Mengganti Isi Surat Cinta
Buka file **`script.js`**, ubah teks pada `letterText:` di dalam `CONFIG`:
```javascript
letterText: `Selamat ulang tahun manisku...

Tuliskan ucapan romantis dan pesan pribadimu di sini.
Setiap baris baru akan otomatis ditampilkan dengan rapi.

Happy Birthday, my love! ♡`,
```

---

### 🖼️ 5. Cara Mengganti Foto Memory
1. Siapkan 3 foto kenangan terbaik kalian (format JPG/PNG).
2. Simpan foto ke dalam folder **`assets/`** dengan nama:
   - `memory1.jpg`
   - `memory2.jpg`
   - `memory3.jpg`
*(Atau Anda bisa mengubah nama file/path foto di dalam objek `CONFIG.memories` pada `script.js`).*

```javascript
memories: [
  {
    title: "Momen Pertama",
    date: "14 Feb 2024",
    desc: "Hari di mana kita pertama kali bertemu.",
    image: "assets/memory1.jpg"
  },
  ...
]
```

---

### 🎵 6. Cara Mengganti Musik Latar
1. Siapkan file lagu romantis favorit kalian dalam format **MP3**.
2. Masukkan file tersebut ke folder **`assets/`** dan ganti nama filenya menjadi **`music.mp3`**.
3. Jika nama filenya berbeda, ubah baris `musicUrl` di `CONFIG`:
```javascript
musicUrl: "assets/lagu-favorit.mp3"
```

---

## ☁️ 7. Cara Deploy ke Vercel (Gratis & Cepat)

Karena website ini adalah website statis, Anda bisa meng-host-nya secara gratis di **Vercel** hanya dalam 2 menit.

### Metode A: Via Vercel CLI (Sangat Mudah)
1. Buka terminal di folder project ini.
2. Jalankan perintah:
```bash
npx vercel
```
3. Ikuti petunjuk di layar (tekan Enter untuk setuju pada pengaturan bawaan).
4. Link website statis Anda siap dan langsung aktif!

### Metode B: Via GitHub & Vercel Dashboard
1. Upload folder project ini ke repositori **GitHub** Anda.
2. Buka [Vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
3. Klik **"Add New"** -> **"Project"**.
4. Pilih repositori GitHub Anda.
5. Pada **Framework Preset**, pilih **Other** atau biarkan default (*Static Site*).
6. Klik **Deploy**.
7. Vercel akan secara otomatis memberikan URL publik (contoh: `https://hbd-sayang.vercel.app`).

---

## 💖 Catatan Spesial
- Website ini telah dioptimalkan khusus untuk pengguna smartphone (*Mobile-First Design*).
- Dilengkapi dengan *fallbacks* audio dan reduced-motion support agar ramah di semua perangkat.
