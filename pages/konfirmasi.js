import { useRouter } from 'next/router';

export default function Konfirmasi() {
  const router = useRouter();
  
  // Data yang akan ditampilkan di halaman konfirmasi
  const { kodeTransaksi, nik, nama, noHp, kegiatan, tempat, waktuDipakai, waktuDikembalikan } = router.query;

  const handleSubmit = () => {
    alert('Data Submitted!');
    // Redirect ke halaman peminjaman setelah submit
    router.push('/dipakai');
  };

  const handleDelete = () => {
    alert('Data Deleted!');
    // Redirect ke halaman home setelah delete
    router.push('/'); // Halaman Home
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Konfirmasi Transaksi</h1>
        
        {/* Menampilkan informasi transaksi */}
        <div className="mb-6 space-y-4">
          <p><strong>Kode Transaksi:</strong> {kodeTransaksi}</p>
          <p><strong>NIK:</strong> {nik}</p>
          <p><strong>Nama:</strong> {nama}</p>
          <p><strong>No HP:</strong> {noHp}</p>
          <p><strong>Kegiatan:</strong> {kegiatan}</p>
          <p><strong>Tempat:</strong> {tempat}</p>
          <p><strong>Waktu Dipakai:</strong> {waktuDipakai}</p>
          <p><strong>Waktu Dikembalikan:</strong> {waktuDikembalikan}</p>
        </div>

        {/* Tombol Submit dan Delete */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
          >
            Delete
          </button>
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
