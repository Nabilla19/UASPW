import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />

      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-3 flex flex-col sm:flex-row items-center justify-between shadow-md">
        {/* Menu kiri */}
        <div className="flex gap-6 items-center">
          <a href="#" className="text-white font-bold text-lg">HOME</a>
          <Link href="/dipakai" className="text-white font-bold text-lg">DIPAKAI</Link>
        </div>

        {/* Search dan Tombol + */}
        <div className="mt-3 sm:mt-0 flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari..."
              className="pl-4 pr-10 py-2 rounded-lg bg-white text-black focus:outline-none"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black">
              🔍
            </span>
          </div>
          <Link href="/peminjaman" className="bg-white text-black text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full shadow hover:scale-105 transition">
            +
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="overflow-hidden rounded-lg shadow-lg border border-gray-300">
          {/* Header kolom */}
          <div className="grid grid-cols-2 bg-gray-100 border-b border-gray-300">
            <div className="text-center font-semibold py-3 border-r border-gray-300 text-green-600">
              BAGUS
            </div>
            <div className="text-center font-semibold py-3 text-red-600">
              RUSAK
            </div>
          </div>

          {/* Isi data */}
          {[...Array(5)].map((_, index) => (
            <div
              className="grid grid-cols-2 border-t border-gray-200 hover:bg-gray-50 transition"
              key={index}
            >
              <div className="py-3 text-center border-r border-gray-200 text-gray-800">
                INF-2023-R101-00{index + 1}
              </div>
              <div className="py-3 text-center text-red-600">
                INF-2023-R101-00{index + 1}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}