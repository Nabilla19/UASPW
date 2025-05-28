import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Menu, X, User, LogOut, Home, CreditCard, Users, Calendar, History } from 'lucide-react';
import useAuth from '../components/hooks/useAuth';

export default function Profile() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { userRole, loading } = useAuth();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const navItems = [
    { href: '/', label: 'HOME', icon: Home },
    { href: '/transaksi', label: 'TRANSAKSI', icon: CreditCard },
    { href: '/penanggungjawab', label: 'PENANGGUNG JAWAB', icon: Users },
    { href: '/kegiatan', label: 'KEGIATAN', icon: Calendar },
    { href: '/riwayat', label: 'RIWAYAT', icon: History },
    { href: '/profile', label: 'PROFILE', icon: User },
  ];

  return (
    <>
      <Header />

    {/* Enhanced Navigation */}
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
              <Link href="/riwayat" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">RIWAYAT</Link>
              <Link href="/profile" className="text-white font-bold text-sm px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg">PROFILE</Link>
            </div>
          </div>

          {!loading && userRole === 'ADMIN' && (
            <button
              onClick={toggleForm}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center group"
              aria-label="Tambah proyektor"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
            </button>
          )}
        </div>

        {menuOpen && (
          <div className="sm:hidden flex flex-col mt-4 space-y-2 items-start bg-gray-800 rounded-lg p-4 border-t border-gray-700">
            <Link href="/" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">HOME</Link>
            <Link href="/transaksi" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">TRANSAKSI</Link>
            <Link href="/penanggungjawab" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">PENANGGUNG JAWAB</Link>
            <Link href="/kegiatan" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">KEGIATAN</Link>
            <Link href="/riwayat" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">RIWAYAT</Link>
            <Link href="/profile" className="text-white font-bold text-sm px-4 py-2 rounded-lg bg-green-600 hover:bg-green-400 w-full text-center transition-colors duration-200">PROFILE</Link>
          </div>
        )}
      </nav>

      {/* Enhanced Profile Content */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -right-20 w-60 h-60 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 relative z-10">
          {/* Profile Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 max-w-md w-full text-center transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
            {/* Profile Icon with Glow */}
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <User size={40} className="text-white" />
              </div>
              <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto blur-xl opacity-60 animate-pulse"></div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Profile Page
            </h1>
            <p className="text-slate-600 mb-8 text-lg">
              Kelola profil dan pengaturan akun Anda
            </p>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="group relative w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:from-red-600 hover:to-pink-700 hover:scale-105 hover:shadow-2xl transform active:scale-95"
            >
              <div className="flex items-center justify-center gap-3">
                <LogOut size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Logout</span>
              </div>
              
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}