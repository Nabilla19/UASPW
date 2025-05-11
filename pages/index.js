import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />

      {}
      <nav className="bg-gray-800 px-6 py-3 flex flex-col sm:flex-row items-center justify-between shadow-md">
        {}
        <div className="flex gap-6 items-center">
          <a href="#" className="text-white font-bold text-lg">HOME</a>
          <Link href="/dipakai" className="text-white font-bold text-lg">PEMINJAMAN</Link>
        </div>

        {}
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
    {}
    <div className="grid grid-cols-4 bg-gray-100 border-b border-gray-300 font-semibold text-center">
      <div className="py-3 border-r border-gray-300">Kode Proyektor</div>
      <div className="py-3 border-r border-gray-300">Merek</div>
      <div className="py-3 border-r border-gray-300">No. Seri</div>
      <div className="py-3">Status</div>
    </div>

    {}
    {[
      { kode: "INF-2023-R101-001", merek: "Epson", seri: "SN-001", status: "Tersedia" },
      { kode: "INF-2023-R101-002", merek: "Canon", seri: "SN-002", status: "Sedang dipakai" },
      { kode: "INF-2023-R101-003", merek: "BenQ", seri: "SN-003", status: "Rusak" },
      { kode: "INF-2023-R101-004", merek: "Acer", seri: "SN-004", status: "Tersedia" },
      { kode: "INF-2023-R101-005", merek: "Sony", seri: "SN-005", status: "Sedang dipakai" },
    ].map((item, index) => (
      <div key={index} className="grid grid-cols-4 border-t border-gray-200 text-center hover:bg-gray-50 transition">
        <div className="py-3 border-r border-gray-200">{item.kode}</div>
        <div className="py-3 border-r border-gray-200">{item.merek}</div>
        <div className="py-3 border-r border-gray-200">{item.seri}</div>
        <div className={`py-3 font-medium ${
          item.status === "Tersedia" ? "text-green-600" :
          item.status === "Sedang dipakai" ? "text-yellow-600" :
          "text-red-600"
        }`}>
          {item.status}
        </div>
      </div>
    ))}
  </div>
</main>

      <Footer />
    </>
  );
}
