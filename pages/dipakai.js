import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function DipakaiPage() {
  return (
    <>
      <Header />

      {}
      <nav className="bg-gray-800 px-6 py-3 flex flex-col sm:flex-row items-center justify-between shadow-md">
        {}
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-white font-bold text-lg">HOME</Link>
          <span className="text-white font-bold text-lg underline">PEMINJAMAN</span>
        </div>

        {}
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

      {}
      <main className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-400 shadow">
            <thead className="bg-gray-200 text-gray-700 font-bold text-lg">
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
                  <td className={`border border-gray-300 py-2 font-semibold ${
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
