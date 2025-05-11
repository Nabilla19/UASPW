import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Transaksi() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    kodeTransaksi: '',
    kodeProyektor: '',
    nik: '',
    status: 'belum dikembalikan', 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    router.push({
      pathname: '/konfirmasi',
      query: formData,
    });
  };

  return (
    <>
      <Header />
      <nav className="bg-gray-800 px-6 py-3 flex flex-col sm:flex-row items-center justify-between shadow-md">
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-white font-bold text-lg">HOME</Link>
          <Link href="/dipakai" className="text-white font-bold text-lg">PEMINJAMAN</Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-6">TRANSAKSI</h1>

          {}
          <div className="flex justify-center gap-4 mb-8">
            <Link href="/peminjaman" className={`px-6 py-2 rounded-lg font-semibold ${router.pathname === '/peminjaman' ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}>
              PENANGGUNG JAWAB
            </Link>
            <Link href="/infokus" className={`px-6 py-2 rounded-lg font-semibold ${router.pathname === '/infokus' ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}>
              PROYEKTOR
            </Link>
            <Link href="/kegiatan" className={`px-6 py-2 rounded-lg font-semibold ${router.pathname === '/kegiatan' ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}>
              KEGIATAN
            </Link>
            <Link href="/transaksi" className={`px-6 py-2 rounded-lg font-semibold ${router.pathname === '/transaksi' ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}>
              TRANSAKSI
            </Link>
          </div>
        </div>

        {}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Form Transaksi</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Kode Transaksi</label>
              <input
                type="text"
                name="kodeTransaksi"
                value={formData.kodeTransaksi}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Input Kode Transaksi"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Kode Proyektor</label>
              <input
                type="text"
                name="kodeProyektor"
                value={formData.kodeProyektor}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Input Kode Proyektor"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">NIK</label>
              <input
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Input NIK"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="belum dikembalikan">Belum Dikembalikan</option>
                <option value="sudah dikembalikan">Sudah Dikembalikan</option>
              </select>
            </div>

            <div className="flex justify-between">
              {}
              <Link href="/kegiatan">
                <button type="button" className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition font-semibold">
                  SEBELUMNYA
                </button>
              </Link>

              {}
              <button
                type="button"
                onClick={handleNext}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
              >
                NEXT
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
