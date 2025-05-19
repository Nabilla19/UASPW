import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Kegiatan() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    kodeTransaksi: '',
    namaKegiatan: '',
    tempat: '',
    waktu: '', // waktu berisi tanggal + jam
  });
  const [kegiatanList, setKegiatanList] = useState([
    { kodeTransaksi: "TRX-001", namaKegiatan: "Rapat Koordinasi", tempat: "Ruang A1", waktu: "2025-05-12, 08:00 - 10:00" },
    { kodeTransaksi: "TRX-002", namaKegiatan: "Sosialisasi", tempat: "Aula Utama", waktu: "2025-05-12, 10:30 - 12:00" },
    { kodeTransaksi: "TRX-003", namaKegiatan: "Pelatihan", tempat: "Lab Komputer", waktu: "2025-05-12, 13:00 - 15:00" },
  ]);

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Kegiatan:", formData);
    // Simpan ke backend atau state global bila perlu
    setKegiatanList([...kegiatanList, formData]); // Menambahkan data kegiatan baru ke list
    setShowForm(false);
  };

  const handleDelete = (kodeTransaksi) => {
    setKegiatanList(kegiatanList.filter(item => item.kodeTransaksi !== kodeTransaksi));
  };

  return (
    <>
      <Header />

      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-3 flex flex-col sm:flex-row items-center justify-between shadow-md">
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-white font-bold text-lg">HOME</Link>
          <Link href="/transaksi" className="text-white font-bold text-lg">TRANSAKSI</Link>
          <Link href="/penanggungjawab" className="text-white font-bold text-lg">PENANGGUNG JAWAB</Link>
          <Link href="/kegiatan" className="text-white font-bold text-lg">KEGIATAN</Link>
          <Link href="/riwayat" className="text-white font-bold text-lg">RIWAYAT</Link>
        </div>

        <div className="mt-3 sm:mt-0 flex items-center gap-3">
          <button
            onClick={toggleForm}
            className="bg-white text-black text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full shadow hover:scale-105 transition"
          >
            +
          </button>
        </div>
      </nav>

      {/* Form Input */}
      {showForm && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Form Kegiatan</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-2">Kode Transaksi</label>
                <input
                  type="text"
                  name="kodeTransaksi"
                  value={formData.kodeTransaksi}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Input Kode Transaksi"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nama Kegiatan</label>
                <input
                  type="text"
                  name="namaKegiatan"
                  value={formData.namaKegiatan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Input Nama Kegiatan"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Tempat</label>
                <input
                  type="text"
                  name="tempat"
                  value={formData.tempat}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Input Tempat"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Waktu (Tanggal dan Jam)</label>
                <input
                  type="text"
                  name="waktu"
                  value={formData.waktu}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: 2025-05-12, 08:00 - 10:00"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabel Kegiatan */}
      <main className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-400 shadow">
            <thead className="bg-gray-200 text-black-700 font-bold text-lg">
              <tr>
                <th className="border px-4 py-2">Kode Transaksi</th>
                <th className="border px-4 py-2">Nama Kegiatan</th>
                <th className="border px-4 py-2">Tempat</th>
                <th className="border px-4 py-2">Waktu</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kegiatanList.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.kodeTransaksi}</td>
                  <td className="border px-4 py-2">{item.namaKegiatan}</td>
                  <td className="border px-4 py-2">{item.tempat}</td>
                  <td className="border px-4 py-2">{item.waktu}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(item.kodeTransaksi)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </>
  );
}
