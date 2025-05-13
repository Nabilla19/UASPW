import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function RiwayatPage() {
  return (
    <>
      <Header />

      <nav className="bg-gray-800 px-6 py-3 flex flex-col sm:flex-row items-center justify-between shadow-md">
        {/* Navbar */}
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-white font-bold text-lg">HOME</Link>
          <Link href="/transaksi" className="text-white font-bold text-lg">TRANSAKSI</Link>
          <Link href="/penanggungjawab" className="text-white font-bold text-lg">PENANGGUNG JAWAB</Link>
          <Link href="/kegiatan" className="text-white font-bold text-lg">KEGIATAN</Link>
          <Link href="/riwayat" className="text-white font-bold text-lg">RIWAYAT</Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-400 shadow">
            <thead className="bg-gray-200 text-black-700 font-bold text-lg">
              <tr>
                <th className="border border-gray-400 px-4 py-2">Kode Transaksi</th>
                <th className="border border-gray-400 px-4 py-2">Kode Infokus</th>
                <th className="border border-gray-400 px-4 py-2">Nama</th>
                <th className="border border-gray-400 px-4 py-2">Kegiatan</th>
                <th className="border border-gray-400 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { kodeTransaksi: "TRX-001", kodeInfokus: "INF-001", nama: "John Doe", kegiatan: "Workshop A", status: "Selesai" },
                { kodeTransaksi: "TRX-002", kodeInfokus: "INF-002", nama: "Jane Smith", kegiatan: "Seminar B", status: "Dibatalkan" },
                { kodeTransaksi: "TRX-003", kodeInfokus: "INF-003", nama: "Carlos Lee", kegiatan: "Training C", status: "Selesai" },
                { kodeTransaksi: "TRX-004", kodeInfokus: "INF-004", nama: "Michael Brown", kegiatan: "Konferensi D", status: "Selesai" },
              ].map((item, i) => (
                <tr key={i} className="text-center hover:bg-gray-100 transition">
                  <td className="border border-gray-300 py-2">{item.kodeTransaksi}</td>
                  <td className="border border-gray-300 py-2">{item.kodeInfokus}</td>
                  <td className="border border-gray-300 py-2">{item.nama}</td>
                  <td className="border border-gray-300 py-2">{item.kegiatan}</td>
                  <td className={`border border-gray-300 py-2 font-medium ${
                    item.status === "Selesai" ? "text-green-600" : "text-red-600"
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
