import React from "react";

const HomebaseTentangFeature = () => {
  return (
    <main>
      <section className="container my-10">
        <h1 className="text-2xl font-bold">Tentang</h1>
        <p className="mt-4 text-gray-600">
          Tata Cara Peminjaman Ruang Perpustakaan UMS
        </p>
        <div className="mt-8">
          <h2 className="text-lg font-semibold">
            1. Daftar/Masuk keakun yang sudah didaftarkan
          </h2>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">
            2. Pilih Ruangan yang ingin dipinjam
          </h2>
          <p className="mt-4 text-gray-600">
            Pilih ruangan yang ingin dipinjam pada halaman ruangan.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">3. Pilih Jadwal Peminjaman</h2>
          <p className="mt-4 text-gray-600">
            Pilih jadwal peminjaman ruangan sesuai dengan kebutuhan. Pastikan
            ruangan yang ingin dipinjam tersedia pada jadwal yang dipilih.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">4. Ajukan Peminjaman</h2>
          <p className="mt-4 text-gray-600">
            Isi form peminjaman ruangan dengan lengkap dan benar. Pastikan data
            yang diisi sudah sesuai dengan ketentuan yang berlaku.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">5. Tunggu Konfirmasi</h2>
          <p className="mt-4 text-gray-600">
            Tunggu konfirmasi dari admin untuk mengetahui status peminjaman
            ruangan. Cek berkala email yang digunakan untuk peminjaman ruangan
            karena akan ada notifikasi yang dikirimkan.
          </p>
        </div>
      </section>
    </main>
  );
};

export default HomebaseTentangFeature;
