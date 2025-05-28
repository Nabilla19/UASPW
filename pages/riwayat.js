import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import useAuth from '../components/hooks/useAuth';

export default function RiwayatPage() {
  const { userRole, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [riwayatData, setRiwayatData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
    <>
      <Header />

      {/* Navbar Responsif */}
      <nav className="bg-gray-800 px-6 py-3 shadow-md">
        <div className="flex justify-between items-center">
          <button className="sm:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden sm:flex gap-6 items-center w-full justify-start">
            <Link href="/" className="text-white font-bold text-lg">HOME</Link>
            <Link href="/transaksi" className="text-white font-bold text-lg">TRANSAKSI</Link>
            <Link href="/penanggungjawab" className="text-white font-bold text-lg">PENANGGUNG JAWAB</Link>
            <Link href="/kegiatan" className="text-white font-bold text-lg">KEGIATAN</Link>
            <Link href="/riwayat" className="text-white font-bold text-lg">RIWAYAT</Link>
            <Link href="/profile" className="text-white font-bold text-lg">PROFILE</Link>
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden flex flex-col mt-2 space-y-2 items-end">
            <Link href="/" className="text-white font-bold text-lg">HOME</Link>
            <Link href="/transaksi" className="text-white font-bold text-lg">TRANSAKSI</Link>
            <Link href="/penanggungjawab" className="text-white font-bold text-lg">PENANGGUNG JAWAB</Link>
            <Link href="/kegiatan" className="text-white font-bold text-lg">KEGIATAN</Link>
            <Link href="/riwayat" className="text-white font-bold text-lg">RIWAYAT</Link>
            <Link href="/profile" className="text-white font-bold text-lg">PROFILE</Link>
          </div>
        )}
      </nav>

      {/* Tabel Riwayat */}
      <main className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto px-6 max-w-5xl mx-auto mb-12 mt-6">
        <table className="w-full border-collapse border border-gray-300 text-center text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border border-gray-300 py-2">Kode Transaksi</th>
                  <th className="border border-gray-300 py-2">Kode Proyektor</th>
                  <th className="border border-gray-300 py-2">Nama</th>
                  <th className="border border-gray-300 py-2">Kegiatan</th>
                  <th className="border border-gray-300 py-2">Waktu Dipinjam</th>
                  <th className="border border-gray-300 py-2">Waktu Dikembalikan</th>
                </tr>
              </thead>
              <tbody>
                {riwayatData.map((item, i) => (
                  <tr key={i} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 py-2">{item.kode_transaksi}</td>
                    <td className="border border-gray-300 py-2">{item.kode_proyektor}</td>
                    <td className="border border-gray-300 py-2">{item.nama}</td>
                    <td className="border border-gray-300 py-2">{item.kegiatan}</td>
                    <td className="border border-gray-300 py-2">{item.waktu}</td>
                     <td className="border border-gray-300 py-2">{item.waktu_dikembalikan}</td>
                     
                  </tr>
                  
                ))}

                <tr>
                <td colSpan={6} className="py-4 text-gray-500">Tidak ada data</td>
              </tr>
              </tbody>
               
            </table>
      
        </div>
      </main>

      <Footer />
    </>
  );
}
