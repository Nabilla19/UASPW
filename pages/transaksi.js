import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function TransaksiPage() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  return (
    <>
      <Header />

      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-3 flex flex-col sm:flex-row items-center justify-between shadow-md">
        {/* Menu kiri */}
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-white font-bold text-lg">HOME</Link>
          <Link href="/transaksi" className="text-white font-bold text-lg">TRANSAKSI</Link>
          <Link href="/penanggungjawab" className="text-white font-bold text-lg">PENANGGUNG JAWAB</Link>
          <Link href="/kegiatan" className="text-white font-bold text-lg">KEGIATAN</Link>
          <Link href="/riwayat" className="text-white font-bold text-lg">RIWAYAT</Link>
        </div>

        {/* Tombol tambah */}
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
            <h2 className="text-xl font-semibold mb-4">Form Transaksi</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Kode Transaksi</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Input Kode Transaksi" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Kode Proyektor</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Input Kode Proyektor" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">NIK</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Input NIK" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Kode Seri</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Input Kode Seri Proyektor" />
              </div>

              <div className="flex justify-between">
                <button 
                  type="button" 
                  onClick={handleNext}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabel Transaksi */}
      <main className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-400 shadow">
            <thead className="bg-gray-200 text-black-700 font-bold text-lg">
              <tr>
                <th className="border border-gray-400 px-4 py-2">Kode Transaksi</th>
                <th className="border border-gray-400 px-4 py-2">Kode Infokus</th>
                <th className="border border-gray-400 px-4 py-2">NIK</th>
                <th className="border border-gray-400 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { kodeTransaksi: "TRX-001", kodeInfokus: "INF-001", nik: "19780001", status: "Belum Dikembalikan" },
                { kodeTransaksi: "TRX-002", kodeInfokus: "INF-002", nik: "19780002", status: "Sudah Dikembalikan" },
                { kodeTransaksi: "TRX-003", kodeInfokus: "INF-003", nik: "19780003", status: "Belum Dikembalikan" },
                { kodeTransaksi: "TRX-004", kodeInfokus: "INF-004", nik: "19780004", status: "Sudah Dikembalikan" },
                { kodeTransaksi: "TRX-005", kodeInfokus: "INF-005", nik: "19780005", status: "Belum Dikembalikan" },
              ].map((item, i) => (
                <tr key={i} className="text-center hover:bg-gray-100 transition">
                  <td className="border border-gray-300 py-2 text-blue-600 hover:underline cursor-pointer">
                    <Link href={`/transaksi/${item.kodeTransaksi}`}>
                      {item.kodeTransaksi}
                    </Link>
                  </td>
                  <td className="border border-gray-300 py-2">{item.kodeInfokus}</td>
                  <td className="border border-gray-300 py-2">{item.nik}</td>
                  <td className={`border border-gray-300 py-2 font-medium ${
                    item.status === "Sudah Dikembalikan" ? "text-green-600" : "text-red-600"
                  }`}>
                    {item.status}
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
