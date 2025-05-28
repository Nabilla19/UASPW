import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import useAuth from '../components/hooks/useAuth';


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { userRole, loading } = useAuth();
  const [showFilter, setShowFilter] = useState(false); // mode filter aktif
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchParams, setSearchParams] = useState({
    kode_proyektor: '',
    nomor_seri: '',
    merek: '',
    status: ''
  });
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  
  // Ambil data dari backend
useEffect(() => {
  const token = localStorage.getItem('token');

  fetch(`${BASE_URL}/proyektor`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error('Gagal mengambil data');
      return res.json();
    })
    .then((data) => {
      setAllItems(data);
      setFilteredItems(data);
    })
    .catch((error) => {
      console.error('Error saat fetch data:', error);
    });
}, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const toggleForm = () => {
     setEditMode(false);
    setEditData(null);
    setShowForm(!showForm);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const form = e.target;
    const proyektorbaru = {
      kode_proyektor: form.kode_proyektor.value,
      merek: form.merek.value,
      nomor_seri: form.nomor_seri.value,
      status: form.status.value,
    };

    try {
  const token = localStorage.getItem('token'); // Ambil token
  if (!token) throw new Error("Anda belum login!");

  if (editMode) {
    // PUT request untuk update data
    const res = await fetch(`${BASE_URL}/proyektor/${proyektorbaru.kode_proyektor}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(proyektorbaru) // Kirim data yang akan diupdate
    });
    if (!res.ok) throw new Error('Gagal update');
    
    // Update state
    setAllItems((prev) =>
      prev.map((item) =>
        item.kode_proyektor === proyektorbaru.kode_proyektor ? proyektorbaru : item
      )
    );
    setFilteredItems((prev) =>
      prev.map((item) =>
        item.kode_proyektor === proyektorbaru.kode_proyektor ? proyektorbaru : item
      )
    );
  } else {
    // POST request untuk tambah data baru
    const res = await fetch(`${BASE_URL}/proyektor`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(proyektorbaru) // Kirim data baru
    });
    if (!res.ok) throw new Error('Gagal tambah');
    const newItem = await res.json();
    setAllItems((prev) => [...prev, newItem]);
    setFilteredItems((prev) => [...prev, newItem]);
  }

  setShowForm(false);
  setEditMode(false);
  setEditData(null);
} catch (err) {
  alert('Error: ' + err.message);
  console.error("Error detail:", err); // Untuk debugging
}
  };

  const handleDelete = async (kode) => {
  if (!confirm('Yakin hapus proyektor ini?')) return;
  
  try {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    if (!token) throw new Error("Anda belum login!"); // Handle jika token tidak ada

    const res = await fetch(`${BASE_URL}/proyektor/${kode}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errorData = await res.json(); // Ambil pesan error dari backend (jika ada)
      throw new Error(errorData.message || 'Gagal hapus proyektor');
    }

    // Update state setelah penghapusan berhasil
    setAllItems((prev) => prev.filter((item) => item.kode_proyektor !== kode));
    setFilteredItems((prev) => prev.filter((item) => item.kode_proyektor !== kode));

  } catch (err) {
    alert('Error: ' + err.message);
    console.error("Delete error:", err); // Debugging
  }
};

   const handleEdit = (data) => {
    setEditMode(true);
    setEditData(data);
    setShowForm(true);
  };

  const handleSearch = () => {
   const { kode_proyektor, nomor_seri, merek, status } = searchParams;

const filtered = allItems.filter(item => 
  (kode_proyektor ? item.kode_proyektor.toLowerCase().includes(kode_proyektor.toLowerCase()) : true) &&
  (nomor_seri ? item.nomor_seri.toLowerCase().includes(nomor_seri.toLowerCase()) : true) &&
  (merek ? item.merek.toLowerCase().includes(merek.toLowerCase()) : true) &&
  (status ? item.status === status : true)
);

    setFilteredItems(filtered);
    setShowFilter(false); // kembali ke mode utama, tapi data sudah terfilter
  };

  const handleResetFilter = () => {
    setSearchParams({
    kode_proyektor: '',
    nomor_seri: '',
    merek: '',
    status: ''
    });
    setFilteredItems(allItems);
  };

  const handleCancelFilter = () => {
    setShowFilter(false);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  return (
    <>
      <Header />

      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-3 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="sm:hidden text-white mr-4"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden sm:flex gap-6 items-center">
              <Link href="/" className="text-white font-bold text-lg">HOME</Link>
              <Link href="/transaksi" className="text-white font-bold text-lg">TRANSAKSI</Link>
              <Link href="/penanggungjawab" className="text-white font-bold text-lg">PENANGGUNG JAWAB</Link>
              <Link href="/kegiatan" className="text-white font-bold text-lg">KEGIATAN</Link>
              <Link href="/riwayat" className="text-white font-bold text-lg">RIWAYAT</Link>
              <Link href="/profile" className="text-white font-bold text-lg">PROFILE</Link>
            </div>
          </div>

   {!loading && userRole === 'ADMIN' && (
  <button
    onClick={toggleForm}
    className="bg-white text-black text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full shadow hover:scale-105 transition"
    aria-label="Tambah proyektor"
  >
    +
  </button>
)}
        </div>

        {menuOpen && (
          <div className="sm:hidden flex flex-col mt-2 space-y-2 items-start">
            <Link href="/" className="text-white font-bold text-lg">HOME</Link>
            <Link href="/transaksi" className="text-white font-bold text-lg">TRANSAKSI</Link>
            <Link href="/penanggungjawab" className="text-white font-bold text-lg">PENANGGUNG JAWAB</Link>
            <Link href="/kegiatan" className="text-white font-bold text-lg">KEGIATAN</Link>
            <Link href="/riwayat" className="text-white font-bold text-lg">RIWAYAT</Link>
            <Link href="/profile" className="text-white font-bold text-lg">PROFILE</Link>
          </div>
        )}
      </nav>

      {/* Form Tambah Proyektor */}
      {showForm && (
        <div className="px-6 mt-6 mb-6 max-w-xl mx-auto border border-gray-300 rounded-lg p-6 shadow">
          <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit' : 'Tambah'} Form Tambah Proyektor</h2>
          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Kode Proyektor</label>
               <input
                type="text"
                name="kode_proyektor"
                className="w-full border rounded px-3 py-2"
                defaultValue={editData?.kode_proyektor || ''}
                required
                readOnly={editMode}
              /> 
            </div>
            <div>
              <label className="block mb-1 font-semibold">Merek</label>
                 <input
                type="text"
                name="merek"
                className="w-full border rounded px-3 py-2"
                defaultValue={editData?.merek || ''}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Seri</label>
               <input
                type="text"
                name="nomor_seri"
                className="w-full border rounded px-3 py-2"
                defaultValue={editData?.nomor_seri || ''}
                required
              />
            </div>
              <div>
              <label className="block mb-1 font-semibold">Status</label>
               <input
                type="text"
                name="status"
                className="w-full border rounded px-3 py-2"
                defaultValue={editData?.status || ''}
                required
              />
            </div>
            <div className="flex justify-between">
                 <button type="button" onClick={toggleForm} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Batal
              </button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {editMode ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Kalau mode filter, tampilkan form filter saja */}
      {showFilter ? (
        
        <div className="max-w-xl mx-auto px-6 mt-6 mb-6 border border-gray-300 rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-3">Filter Proyektor</h2>
           
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block mb-1 font-semibold">Kode Proyektor</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={searchParams.kode_proyektor}
                onChange={(e) => setSearchParams({ ...searchParams, kode_proyektor: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Nomor Seri</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={searchParams.nomor_seri}
                onChange={(e) => setSearchParams({ ...searchParams, nomor_seri: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Merek</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={searchParams.merek}
                onChange={(e) => setSearchParams({ ...searchParams, merek: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Status</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={searchParams.status}
                onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
                
              >
                <option value="">Semua</option>
                <option value="tersedia">Tersedia</option>
                <option value="sedang dipakai">Sedang dipakai</option>
                <option value="rusak">Rusak</option>
              </select>
            </div>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={handleCancelFilter}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Cari
              </button>
            </div>
          </form>
        
        </div>
      ) : (
        // Mode utama: tampil data + tombol filter
        <>
          {/* Tombol filter */}
          <div className="flex justify-end px-6 mt-6 mb-4 max-w-4xl mx-auto">
            <button
              onClick={() => setShowFilter(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Filter Proyektor
            </button>
          </div>

          {/* Tabel Proyektor */}
          <div className="overflow-x-auto px-6 max-w-4xl mx-auto mb-12">
            <table className="w-full border-collapse border border-gray-300 text-center text-sm">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-300 py-2">Kode Infokus</th>
                  <th className="border border-gray-300 py-2">Merek</th>
                  <th className="border border-gray-300 py-2">Seri</th>
                  <th className="border border-gray-300 py-2">Status</th>
                     {userRole === 'ADMIN' && (
              <th className="border border-gray-300 py-2">Aksi</th>
              )}
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-gray-500">
                      Data proyektor tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 py-2">{item.kode_proyektor}</td>
                      <td className="border border-gray-300 py-2">{item.merek}</td>
                      <td className="border border-gray-300 py-2">{item.nomor_seri}</td>
                      <td className="border border-gray-300 py-2">{item.status}</td>
                       
                    {userRole === 'ADMIN' && (
                       <td className="border border-gray-300 py-2 flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.kode_proyektor)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Hapus
                        </button>
                   </td>
                    )}
                  
                    </tr>
                  ))
                )}
              </tbody>
            </table>

             <button
            onClick={() => {
              handleResetFilter();
              setShowFilter(false);
            }}
            className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Kembali ke halaman utama
          </button>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}
