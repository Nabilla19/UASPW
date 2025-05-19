import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // pastikan sudah install: npm i lucide-react
import useAuth from '../components/hooks/useAuth';


export default function Profile() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { userRole, loading } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };



  return (
    <>
      <Header />

      {/* Navbar Responsif */}
      <nav className="bg-gray-800 px-6 py-3 shadow-md">
        <div className="flex justify-between items-start">
          {/* Tombol menu untuk layar kecil */}
          <button
            className="sm:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Menu utama (desktop) */}
          <div className="hidden sm:flex gap-6 items-center w-full justify-">
            <Link href="/" className="text-white font-bold text-lg">HOME</Link>
            <Link href="/transaksi" className="text-white font-bold text-lg">TRANSAKSI</Link>
            <Link href="/penanggungjawab" className="text-white font-bold text-lg">PENANGGUNG JAWAB</Link>
            <Link href="/kegiatan" className="text-white font-bold text-lg">KEGIATAN</Link>
            <Link href="/riwayat" className="text-white font-bold text-lg">RIWAYAT</Link>
            <Link href="/profile" className="text-white font-bold text-lg">PROFILE</Link>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="sm:hidden flex flex-col mt-2 space-y-2">
            <Link href="/" className="text-white font-bold text-lg">HOME</Link>
            <Link href="/transaksi" className="text-white font-bold text-lg">TRANSAKSI</Link>
            <Link href="/penanggungjawab" className="text-white font-bold text-lg">PENANGGUNG JAWAB</Link>
            <Link href="/kegiatan" className="text-white font-bold text-lg">KEGIATAN</Link>
            <Link href="/riwayat" className="text-white font-bold text-lg">RIWAYAT</Link>
            <Link href="/profile" className="text-white font-bold text-lg">PROFILE</Link>
          </div>
        )}
      </nav>

      {/* Konten Profile */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-6">Profile Page</h1>
        
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <Footer />
    </>
  );
}
