# Simple Contact Manager
Contact Manager adalah aplikasi web sederhana yang memungkinkan pengguna untuk menambah, mengedit, dan menghapus kontak. Aplikasi ini menggunakan MongoDB untuk menyimpan data kontak dan menyediakan antarmuka berbasis web untuk mengelola daftar kontak, termasuk nama, email, dan nomor telepon. Aplikasi ini menggunakan HTML, CSS, dan JavaScript untuk tampilan antarmuka dan pengelolaan data kontak.

## Fitur
- **Tambah Kontak:** Pengguna dapat menambahkan kontak baru dengan nama, email, dan nomor telepon.
- **Edit Kontak:** Pengguna dapat mengedit informasi kontak yang sudah ada.
- **Hapus Kontak:** Pengguna dapat menghapus kontak dari daftar.
- **Validasi Input:**
  - Nama hanya bisa berisi huruf dan spasi.
  - Nomor telepon hanya bisa berisi angka.

## Teknologi yang Digunakan
- **HTML:** Struktur halaman dan form untuk input data.
- **CSS:** Gaya dan tata letak halaman.
- **JavaScript:** Interaksi pengguna, termasuk pengelolaan form dan manipulasi DOM.
- **MongoDB:** Database untuk menyimpan data kontak.
- **Fetch API:** Untuk berkomunikasi dengan server API yang mengelola data MongoDB (misalnya untuk CRUD kontak).

## Cara Penggunaan
1. **Tambah Kontak:** Isi form di bagian atas untuk menambah kontak baru. Pastikan hanya menggunakan huruf untuk nama dan hanya angka untuk nomor telepon.
2. **Edit Kontak:** Klik tombol "Edit" pada kontak yang ada untuk mengubah informasi kontak.
3. **Hapus Kontak:** Klik tombol "Delete" untuk menghapus kontak yang dipilih.

## Validasi Input
- Nama: Input hanya boleh berisi huruf dan spasi.
- Nomor Telepon: Input hanya boleh berisi angka.
