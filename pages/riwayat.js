import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Menu, X, History,Plus, Calendar, User, Activity, Clock, ArrowLeft } from 'lucide-react';
import useAuth from '../components/hooks/useAuth';

export default function RiwayatPage() {
  const { userRole, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [riwayatData, setRiwayatData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const toggleForm = () => {
    setEditMode(false);
    setEditData(null);
    setShowForm(!showForm);
  };
  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token tidak ditemukan. Harap login.');

        const res = await fetch(`${BASE_URL}/riwayat`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error('Gagal mengambil data riwayat');

        const data = await res.json();
        setRiwayatData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Gagal memuat data riwayat:', error);
        setRiwayatData([]); // fallback agar tidak error .map()
      } finally {
        setLoadingData(false);
      }
    };

    fetchRiwayat();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      {/* Enhanced Navbar */}
<nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black px-6 py-4 shadow-xl">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center">
            <button
              className="sm:hidden text-white mr-4 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden sm:flex gap-2 items-center">
              <Link href="/" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">HOME</Link>
              <Link href="/transaksi" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">TRANSAKSI</Link>
              <Link href="/penanggungjawab" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">PENANGGUNG JAWAB</Link>
              <Link href="/kegiatan" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">KEGIATAN</Link>
              <Link href="/riwayat" className="text-white font-bold text-sm px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg">RIWAYAT</Link>
              <Link href="/profile" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">PROFILE</Link>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden flex flex-col mt-4 space-y-2 items-start bg-gray-800 rounded-lg p-4 border-t border-gray-700">
            <Link href="/" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">HOME</Link>
            <Link href="/transaksi" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">TRANSAKSI</Link>
            <Link href="/penanggungjawab" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">PENANGGUNG JAWAB</Link>
            <Link href="/kegiatan" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">KEGIATAN</Link>
            <Link href="/riwayat" className="text-white font-bold text-sm px-4 py-2 rounded-lg bg-green-600 hover:bg-green-400 w-full text-center transition-colors duration-200">RIWAYAT</Link>
            <Link href="/profile" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">PROFILE</Link>
          </div>
        )}
      </nav>

      {/* Enhanced Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-start mb-12">
          <div>
            <h1 className="text-3xl font-bold text-black">
              Riwayat Peminjaman
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Lihat semua riwayat peminjaman proyektor Anda</p>
        </div>

        {/* Enhanced Table Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Loading State */}
          {loadingData ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <span className="ml-4 text-gray-600 text-lg">Memuat data...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-400 to-green-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        Kode Transaksi
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        Kode Proyektor
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        Nama
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        Kegiatan
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        Waktu Dipinjam
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        Waktu Dikembalikan
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {riwayatData.length > 0 ? (
                    riwayatData.map((item, i) => (
                      <tr key={i} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
                        <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                          <div className="flex items-center gap-2">
                            
                            {item.kode_transaksi}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {item.kode_proyektor}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 font-medium">{item.nama}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                            {item.kegiatan}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                            <span>{new Date(item.waktu).toLocaleDateString()}</span>
                            <span className="text-xs text-gray-400">{new Date(item.waktu_dikembalikan).toLocaleTimeString()}</span>
                          </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600">
                        {item.waktu_dikembalikan ? (
                          <div className="flex flex-col">
                            <span>{new Date(item.waktu_dikembalikan).toLocaleDateString()}</span>
                            <span className="text-xs text-gray-400">{new Date(item.waktu_dikembalikan).toLocaleTimeString()}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          </div>
                          <div>
                            <p className="text-gray-500 text-lg font-medium mb-2">Tidak ada data riwayat</p>
                            <p className="text-gray-400 text-sm">Belum ada transaksi peminjaman yang tercatat</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats Card */}
        {riwayatData.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Total Riwayat</h3>
                <p className="text-3xl font-bold">{riwayatData.length}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <History size={32} />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}