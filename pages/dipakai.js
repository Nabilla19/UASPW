import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function DipakaiPage() {
  return (
    <>
      <Header />

      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-3 flex flex-col sm:flex-row items-center justify-between shadow-md">
        {/* Menu kiri */}
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-white font-bold text-lg">HOME</Link>
          <span className="text-white font-bold text-lg underline">DIPAKAI</span>
        </div>

        {/* Search saja (tombol + dihapus) */}
        <div className="mt-3 sm:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari..."
              className="pl-4 pr-10 py-2 rounded-lg bg-white text-black focus:outline-none w-full sm:w-64"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black">
              🔍
            </span>
          </div>
        </div>
      </nav>

      {/* Tabel */}
      <main className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-400 shadow">
            <thead className="bg-gray-200 text-gray-700 font-bold text-lg">
              <tr>
                <th className="border border-gray-400 px-4 py-2">INFOKUS</th>
                <th className="border border-gray-400 px-4 py-2">MATAKULIAH</th>
                <th className="border border-gray-400 px-4 py-2">MAHASISWA</th>
                <th className="border border-gray-400 px-4 py-2">DOSEN</th>
                <th className="border border-gray-400 px-4 py-2">JADWAL</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="text-center hover:bg-gray-100 transition">
                  <td className="border border-gray-300 py-2">INF-00{i + 1}</td>
                  <td className="border border-gray-300 py-2">MK-00{i + 1}</td>
                  <td className="border border-gray-300 py-2">MHS-00{i + 1}</td>
                  <td className="border border-gray-300 py-2">DOS-00{i + 1}</td>
                  <td className="border border-gray-300 py-2">Senin, 08:00</td>
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