import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function DetailTransaksi() {
  const router = useRouter();
  const { id } = router.query;

  // Simulasi data transaksi (nanti bisa diganti dari API atau database)
  const dataTransaksi = {
    kodeTransaksi: id,
    nik: "19780001",
    nama: "Budi Santoso",
    noHp: "081234567890",
    kegiatan: "Presentasi Proyek Akhir",
    tempat: "Lab Komputer 1",
    waktuPinjam: {
      tanggalMulai: "2025-05-10",
      jamMulai: "08:00",
      tanggalSelesai: "2025-05-10",
      jamSelesai: "10:00"
    },
    waktuKembali: {
      tanggal: "2025-05-10",
      jam: "10:15"
    }
  };

  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Tombol Kembali */}
          <button
            onClick={() => router.push("/dipakai")}
            className="mb-6 text-blue-600 hover:underline flex items-center gap-2"
          >
            ← Kembali 
          </button>

          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Detail Transaksi</h1>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div><strong>Kode Transaksi:</strong></div>
              <div>{dataTransaksi.kodeTransaksi}</div>

              <div><strong>NIK:</strong></div>
              <div>{dataTransaksi.nik}</div>

              <div><strong>Nama:</strong></div>
              <div>{dataTransaksi.nama}</div>

              <div><strong>No HP:</strong></div>
              <div>{dataTransaksi.noHp}</div>

              <div><strong>Kegiatan:</strong></div>
              <div>{dataTransaksi.kegiatan}</div>

              <div><strong>Tempat:</strong></div>
              <div>{dataTransaksi.tempat}</div>

              <div><strong>Waktu Dipakai:</strong></div>
              <div>
                {dataTransaksi.waktuPinjam.tanggalMulai} - {dataTransaksi.waktuPinjam.tanggalSelesai}, {dataTransaksi.waktuPinjam.jamMulai} - {dataTransaksi.waktuPinjam.jamSelesai}
              </div>

              <div><strong>Waktu Dikembalikan:</strong></div>
              <div>{dataTransaksi.waktuKembali.tanggal} - {dataTransaksi.waktuKembali.jam}</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
