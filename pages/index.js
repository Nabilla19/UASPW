import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [searchParams, setSearchParams] = useState({
    kodeInfokus: '',
    kodeTransaksi: '',
    nik: '',
    status: ''
  });
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [filteredItems, setFilteredItems] = useState([
    { kode: "INF-2023-R101-001", merek: "Epson", seri: "SN-001", status: "Tersedia" },
    { kode: "INF-2023-R101-002", merek: "Canon", seri: "SN-002", status: "Sedang dipakai" },
    { kode: "INF-2023-R101-003", merek: "BenQ", seri: "SN-003", status: "Rusak" },
    { kode: "INF-2023-R101-004", merek: "Acer", seri: "SN-004", status: "Tersedia" },
    { kode: "INF-2023-R101-005", merek: "Sony", seri: "SN-005", status: "Sedang dipakai" },
  ]);
  const router = useRouter();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  const handleSearch = () => {
    const { kodeInfokus, kodeTransaksi, nik, status } = searchParams;
    const filtered = [
      { kode: "INF-2023-R101-001", merek: "Epson", seri: "SN-001", status: "Tersedia" },
      { kode: "INF-2023-R101-002", merek: "Canon", seri: "SN-002", status: "Sedang dipakai" },
      { kode: "INF-2023-R101-003", merek: "BenQ", seri: "SN-003", status: "Rusak" },
      { kode: "INF-2023-R101-004", merek: "Acer", seri: "SN-004", status: "Tersedia" },
      { kode: "INF-2023-R101-005", merek: "Sony", seri: "SN-005", status: "Sedang dipakai" },
    ].filter(item => 
      (kodeInfokus ? item.kode.includes(kodeInfokus) : true) &&
      (kodeTransaksi ? item.seri.includes(kodeTransaksi) : true) &&
      (nik ? item.merek.includes(nik) : true) &&
      (status ? item.status === status : true)
    );
    setFilteredItems(filtered);
    setShowSearchPopup(false);
  };

  return (
    <>
      <Header />
      
      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-3 flex flex-col sm:flex-row items-center justify-between shadow-md">
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-white font-bold text-lg">HOME</Link>
          <Link href="/transaksi" className="text-white font-bold text-lg">TRANSAKSI</Link>
          <Link href="/penanggungjawab" className="text-white font-bold text-lg">PENANGGUNG JAWAB</Link>
          <Link href="/kegiatan" className="text-white font-bold text-lg">KEGIATAN</Link>
          <Link href="/riwayat" className="text-white font-bold text-lg">RIWAYAT</Link>
        </div>
        
        <div className="mt-3 sm:mt-0 flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari..."
              className="pl-4 pr-10 py-2 rounded-lg bg-white text-black focus:outline-none"
              onClick={() => setShowSearchPopup(true)}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black">
              🔍
            </span>
          </div>
          <button 
            onClick={toggleForm}
            className="bg-white text-black text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full shadow hover:scale-105 transition"
          >
            +
          </button>
        </div>
      </nav>

      {/* Search Popup */}
      {showSearchPopup && (
  <div className="flex justify-center mt-4">
    <div className="bg-white border border-gray-300 shadow-md p-6 rounded-lg w-full max-w-xl">
      <h2 className="text-lg font-semibold mb-2">Filter</h2>
      <form className="space-y-3 text-sm">
        <div>
          <label className="block text-gray-700 mb-1">Kode Infokus</label>
          <input
            type="text"
            className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchParams.kodeInfokus}
            onChange={(e) => setSearchParams({ ...searchParams, kodeInfokus: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Kode Transaksi</label>
          <input
            type="text"
            className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchParams.kodeTransaksi}
            onChange={(e) => setSearchParams({ ...searchParams, kodeTransaksi: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">NIK</label>
          <input
            type="text"
            className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchParams.nik}
            onChange={(e) => setSearchParams({ ...searchParams, nik: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Status</label>
          <select
            className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchParams.status}
            onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
          >
            <option value="">Semua</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Sedang dipakai">Sedang dipakai</option>
            <option value="Rusak">Rusak</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button 
            type="button"
            onClick={() => setShowSearchPopup(false)}
            className="text-gray-500 text-sm hover:underline"
          >
            Tutup
          </button>
          <button 
            type="button" 
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 text-sm"
          >
            Cari
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Form Proyektor Popup */}
      {showForm && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Form Proyektor</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Kode Proyektor</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Input Kode Proyektor" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Merek</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Input Merek" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Kode Seri Proyektor</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Input Kode Seri Proyektor" />
              </div>

              <div className="flex justify-between">
                <button 
                  type="button" 
                  onClick={handleNext}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="overflow-hidden rounded-lg shadow-lg border border-gray-300">
          <div className="grid grid-cols-4 bg-gray-100 border-b border-gray-300 font-semibold text-center">
            <div className="py-3 border-r border-gray-300">Kode Proyektor</div>
            <div className="py-3 border-r border-gray-300">Merek</div>
            <div className="py-3 border-r border-gray-300">No. Seri</div>
            <div className="py-3">Status</div>
          </div>

          {/* Display filtered items */}
          {filteredItems.map((item, index) => (
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
