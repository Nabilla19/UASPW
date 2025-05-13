import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function PenanggungJawabPage() {
  const [showForm, setShowForm] = useState(false);
  const [penanggungJawabList, setPenanggungJawabList] = useState([
    { id: 1, nama: "Ari Pratama", nik: "3276012345678901", hp: "081234567890" },
    { id: 2, nama: "Budi Santoso", nik: "3276023456789012", hp: "081234567891" },
    { id: 3, nama: "Citra Dewi", nik: "3276034567890123", hp: "081234567892" },
  ]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setPenanggungJawabList(pjList => pjList.filter(pj => pj.id !== id));
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

        {/* Pencarian dan tambah - Removed search bar */}
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
            <h2 className="text-xl font-semibold mb-4">Form Penanggung Jawab</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-2">Nama</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan Nama" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">NIK</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan NIK" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">No. HP</label>
                <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan No. HP" />
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

      {/* Tabel Data Penanggung Jawab */}
      <main className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-400 shadow">
            <thead className="bg-gray-200 text-black-700 font-bold text-lg">
              <tr>
                <th className="border border-gray-400 px-4 py-2">Nama</th>
                <th className="border border-gray-400 px-4 py-2">NIK</th>
                <th className="border border-gray-400 px-4 py-2">No. HP</th>
                <th className="border border-gray-400 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {penanggungJawabList.map((pj) => (
                <tr key={pj.id} className="text-center">
                  <td className="border border-gray-400 px-4 py-2">{pj.nama}</td>
                  <td className="border border-gray-400 px-4 py-2">{pj.nik}</td>
                  <td className="border border-gray-400 px-4 py-2">{pj.hp}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button
                      onClick={() => handleDelete(pj.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
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
