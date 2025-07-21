# Fee Management App

Aplikasi manajemen biaya sederhana yang dibangun dengan Laravel, React, dan Inertia.js, berfokus pada pengelolaan data siswa dan fungsionalitas barcode.

## Fitur

*   **Manajemen Siswa (CRUD):**
    *   Melihat daftar siswa dengan tabel data yang dapat diurutkan, difilter, dan diatur ulang kolomnya.
    *   Menambah siswa baru melalui modal.
    *   Mengedit detail siswa yang ada melalui modal.
    *   Menghapus siswa.
*   **Generasi Barcode Otomatis:** `barcode_id` unik secara otomatis dibuat saat siswa baru ditambahkan.
*   **Tampilan Barcode:** Menampilkan barcode visual untuk setiap siswa di tabel.
*   **Cetak Barcode:**
    *   Mencetak barcode individual untuk siswa tertentu.
    *   Mencetak semua barcode siswa, dengan 20 barcode per halaman cetak.
*   **Tabel Data Interaktif:**
    *   Pengurutan data per kolom.
    *   Pencarian global di seluruh data tabel.
    *   Header kolom yang dapat digeser (drag-and-drop) untuk mengatur ulang tampilan.
*   **Tampilan Detail Siswa:** Melihat detail lengkap siswa melalui modal.
*   **Progressive Web App (PWA):** Aplikasi dapat diinstal ke perangkat, berjalan secara offline, dan memberikan pengalaman seperti aplikasi native.
*   **Ekspor ke Excel:** Tabel data sekarang dilengkapi dengan fungsionalitas ekspor data ke file Excel.
*   **AI Chatbot (Asisten Cerdas):**
    *   Chatbot AI yang terintegrasi di pojok bawah aplikasi untuk membantu pengguna.
    *   Dapat menjawab pertanyaan seputar data siswa (jumlah, pencarian nama, kelas), pembayaran (jumlah total, pembayaran terbaru), dan biaya standar (jumlah, daftar).
    *   Menyertakan tautan langsung ke halaman yang relevan untuk melihat detail data.
*   **Desain Visual Kustom:** Latar belakang aplikasi dan sidebar menggunakan gradien biru dan maroon untuk tampilan yang unik.

## Teknologi yang Digunakan

*   **Backend:**
    *   Laravel (PHP Framework)
    *   Eloquent ORM
*   **Frontend:**
    *   React.js
    *   Inertia.js
    *   Vite (Build Tool)
    *   Tailwind CSS (untuk styling)
    *   Shadcn/UI (Komponen UI)
    *   TanStack Table (untuk tabel data)
    *   React DND (untuk drag-and-drop header tabel)
    *   JsBarcode (untuk generasi barcode di frontend)

## Instalasi

Ikuti langkah-langkah di bawah ini untuk menginstal dan menjalankan proyek secara lokal:

1.  **Clone Repositori:**
    ```bash
    git clone <URL_REPOSITORI_ANDA>
    cd feeManagement-app
    ```

2.  **Instal Dependensi Composer:**
    ```bash
    composer install
    ```

3.  **Instal Dependensi Node.js:**
    ```bash
    npm install
    ```

4.  **Konfigurasi Environment:**
    *   Buat file `.env` dari `.env.example`:
        ```bash
        cp .env.example .env
        ```
    *   Buat kunci aplikasi:
        ```bash
        php artisan key:generate
        ```
    *   Konfigurasi database Anda di file `.env` (misalnya, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).

5.  **Migrasi Database dan Seed Data:**
    ```bash
    php artisan migrate --seed
    ```
    Ini akan membuat tabel database yang diperlukan dan mengisi tabel `students` dengan data dummy.

## Penggunaan

1.  **Jalankan Server Laravel:**
    ```bash
    php artisan serve
    ```

2.  **Jalankan Server Pengembangan Vite:**
    ```bash
    npm run dev
    ```

3.  **Akses Aplikasi:**
    Buka browser Anda dan navigasikan ke `http://127.0.0.1:8000` (atau alamat yang ditampilkan oleh `php artisan serve`).

    *   Untuk melihat daftar siswa dan mengelola mereka, navigasikan ke `/students`.
    *   Pastikan Anda sudah login (jika aplikasi memiliki sistem autentikasi).

## Kontribusi

Kontribusi dipersilakan! Silakan fork repositori dan buat pull request dengan fitur atau perbaikan Anda.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.
