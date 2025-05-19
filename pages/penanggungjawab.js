// pages/penanggungjawab.tsx
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import useAuth from '../components/hooks/useAuth';


export default function PenanggungJawab() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { userRole, loading } = useAuth();
  const [allItems, setAllItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const router = useRouter();

 useEffect(() => {
  const fetchPenanggungJawab = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan. Harap login.');

      const res = await fetch('http://localhost:3001/pj', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Gagal mengambil data penanggung jawab');

      const data = await res.json();
      setAllItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setAllItems([]); // fallback jika error
    }
  };

  fetchPenanggungJawab();
}, []);


  const toggleForm = () => {
    setEditMode(false);
    setEditData(null);
    setShowForm(!showForm);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);

  const data = {
    nik: formData.get('nik'),
    nama: formData.get('nama'),
    no_hp: formData.get('kontak'),
  };

    try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Anda belum login!");

    if (editMode) {
      // UPDATE (PUT)
      const res = await fetch(`http://localhost:3001/pj/${data.nik}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Kirim data yang akan diupdate
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Gagal update data');
      }

      setAllItems(prev => prev.map(item => item.nik === data.nik ? data : item));
    } else {
      // CREATE (POST)
      const res = await fetch('http://localhost:3001/pj', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Kirim data baru
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Gagal tambah data');
      }

      const newItem = await res.json();
      setAllItems(prev => [...prev, newItem]);
    }

    setShowForm(false);
    setEditMode(false);
    setEditData(null);
  } catch (err) {
    console.error("Error:", err);
    alert('Error: ' + err.message);
  }
};

// Fungsi untuk handle delete
const handleDelete = async (nik) => {
  if (!confirm('Yakin hapus penanggung jawab ini?')) return;
  
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Anda belum login!");

    const res = await fetch(`http://localhost:3001/pj/${nik}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Gagal menghapus data');
    }

    setAllItems(prev => prev.filter(item => item.nik !== nik));
  } catch (err) {
    console.error("Delete error:", err);
    alert('Error hapus: ' + err.message);
  }
};

// Fungsi untuk handle edit (tidak perlu perubahan)
const handleEdit = (data) => {
  setEditMode(true);
  setEditData(data);
  setShowForm(true);
};

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <>
      <Header />
      <nav className="bg-gray-800 px-6 py-3 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button className="sm:hidden text-white mr-4" onClick={() => setMenuOpen(!menuOpen)}>
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
          {userRole === 'ADMIN' && (
            <button
              onClick={toggleForm}
              className="bg-white text-black text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full shadow hover:scale-105 transition"
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

      {showForm && (
        <div className="px-6 mt-6 mb-6 max-w-xl mx-auto border border-gray-300 rounded-lg p-6 shadow">
          <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit' : 'Tambah'} Penanggung Jawab</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">NIK</label>
              <input
                type="text"
                name="nik"
                className="w-full border rounded px-3 py-2"
                defaultValue={editData?.nik || ''}
                required
                readOnly={editMode}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Nama</label>
              <input
                type="text"
                name="nama"
                className="w-full border rounded px-3 py-2"
                defaultValue={editData?.nama || ''}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Kontak</label>
              <input
                type="text"
                name="kontak"
                className="w-full border rounded px-3 py-2"
                defaultValue={editData?.no_hp || ''}
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

      <div className="overflow-x-auto px-6 max-w-5xl mx-auto mb-12 mt-6">
        <table className="w-full border-collapse border border-gray-300 text-center text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-300 py-2">Kode</th>
              <th className="border border-gray-300 py-2">Nama</th>
              <th className="border border-gray-300 py-2">Kontak</th>
              {userRole === 'ADMIN' && <th className="border border-gray-300 py-2">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {allItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-gray-500">Tidak ada data</td>
              </tr>
            ) : (
              allItems.map((item) => (
                <tr key={item.nik}>
                  <td className="border border-gray-300 py-2">{item.nik}</td>
                  <td className="border border-gray-300 py-2">{item.nama}</td>
                  <td className="border border-gray-300 py-2">{item.no_hp}</td>
                  {userRole === 'ADMIN' && (
                    <td className="border border-gray-300 py-2 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.nik)}
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
      </div>
      <Footer />
    </>
  );
}
