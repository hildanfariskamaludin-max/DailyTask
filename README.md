# DailyTask

Aplikasi manajemen tugas harian sederhana yang dibuat dengan **React Native (Expo)** dan **JavaScript**. Aplikasi ini membantu pengguna mencatat tugas, menentukan prioritas, memantau progres, dan melihat ringkasan tugas dari satu dashboard.

Dibuat untuk memenuhi tugas mata kuliah **Mobile Multi Platform**.

## Fitur

- Menambah tugas dengan judul, deskripsi, dan prioritas (Tinggi / Sedang / Rendah).
- Validasi judul tugas: tidak boleh kosong atau hanya berisi spasi.
- Menandai tugas sebagai selesai dan mengembalikannya ke status belum selesai.
- Menghapus tugas dengan dialog konfirmasi.
- Dashboard berisi jumlah total, selesai, dan belum selesai, serta daftar tugas terbaru.
- Empty state yang jelas saat belum ada tugas.
- Navigasi bottom tab: **Dashboard**, **Tugas**, dan **Tambah**.

## Teknologi

- Expo SDK 58 + React Native 0.88
- React 19.3 (JavaScript, tanpa TypeScript)
- React Navigation (Bottom Tabs)
- `@expo/vector-icons` (Ionicons)
- React Native Web untuk menjalankan versi web

## Menjalankan Aplikasi

Prasyarat: Node.js dan npm sudah terpasang. Untuk mencoba di HP, gunakan aplikasi **Expo Go**.

```bash
npm install
npx expo start
```

Setelah Metro berjalan, pilih salah satu:

- tekan `a` untuk Android,
- tekan `i` untuk iOS,
- tekan `w` untuk web,
- atau pindai QR code dengan Expo Go.

Pemeriksaan konfigurasi dan dependency:

```bash
npx expo-doctor
npx expo install --check
```

## Struktur Proyek

```text
DailyTask/
├── App.js                      # Root: state tugas utama, statistik, dan useEffect judul
├── index.js                    # Entry point Expo
├── app.json                    # Konfigurasi Expo
├── package.json
├── assets/                     # Ikon dan favicon
└── src/
    ├── components/
    │   ├── EmptyState.js       # Tampilan saat daftar kosong
    │   ├── Header.js           # Header halaman
    │   ├── SummaryCard.js      # Kartu statistik
    │   ├── TaskForm.js         # Form tambah tugas + validasi
    │   └── TaskItem.js         # Kartu tugas + aksi selesai/hapus
    ├── navigation/
    │   └── AppNavigator.js     # Bottom tab navigator
    ├── screens/
    │   ├── AddTaskScreen.js
    │   ├── DashboardScreen.js
    │   └── TaskListScreen.js
    └── styles/
        └── globalStyles.js     # Palet warna, spacing, dan style bersama
```

## Konsep yang Diterapkan

- **State** — `useState` di `App.js` menyimpan satu daftar tugas yang dipakai semua screen.
- **Props** — data tugas, statistik, dan callback diteruskan dari `App.js` → `AppNavigator` → screen → komponen.
- **React Hooks**
  - `useState`: daftar tugas dan state form.
  - `useMemo`: perhitungan statistik dan pengelompokan tugas.
  - `useEffect`: menyinkronkan judul dokumen browser dengan data tugas.
- **Komponen reusable** — `Header`, `SummaryCard`, `TaskItem`, `TaskForm`, dan `EmptyState`.
- **Navigasi** — React Navigation Bottom Tabs dengan tiga screen.

## Batasan

- Data tugas hanya disimpan di memori (`useState`), sehingga akan kembali kosong saat aplikasi ditutup atau di-refresh. Tidak ada database/backend sesuai ketentuan tugas.
- Konfirmasi hapus memakai `window.confirm` di web dan `Alert.alert` di Android/iOS.
