// pages/transaksi.tsx
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import useAuth from '../components/hooks/useAuth';

export default function Transaksi() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { userRole, loading } = useAuth();
  const [allItems, setAllItems] = useState([]);
  const [formData, setFormData] = useState({
    kode_transaksi: '',
    kode_proyektor: '',
    nik: '',
    status: 'belum dikembalikan',
  });
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
  const token = localStorage.getItem('token');

  fetch(`${BASE_URL}/transaksi`, {
    headers: {
      'Authorization': `Bearer ${token}`, // Tambah header token
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (!res.ok) throw new Error('Gagal fetch data transaksi');
      return res.json();
    })
    .then(data => {
      console.log('Data transaksi:', data); // Debug: cek apakah array
      setAllItems(Array.isArray(data) ? data : []);
    })
    .catch(err => {
      console.error('Fetch error:', err);
      setAllItems([]); // Hindari error .map
    });
}, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/transaksi`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          status: 'belum dikembalikan',
        }),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text || 'Gagal tambah transaksi');

      const newItem = JSON.parse(text);

      // validasi item sebelum ditambahkan
      if (!newItem || !newItem.kode_transaksi) {
        throw new Error('Respons tidak valid');
      }

      setAllItems(prev => [...prev, newItem]);
      setShowForm(false);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDelete = async (kode_transaksi) => {
    if (!confirm('Yakin hapus transaksi ini?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/transaksi/${kode_transaksi}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error('Gagal hapus transaksi');
      setAllItems(prev => prev.filter(item => item.kode_transaksi !== kode_transaksi));
    } catch (err) {
      alert('Error hapus: ' + err.message);
    }
  };

const handleKembalikan = async (kode_transaksi) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/transaksi/${kode_transaksi}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Gagal kembalikan');
    }

    const responseData = await res.json();
    console.log('Respon PATCH:', responseData); // Tambahkan baris ini

    const updatedItem = responseData.data.transaksi || responseData;
    setAllItems(prev =>
      prev.map(item =>
        item.kode_transaksi === kode_transaksi ? { ...item, ...updatedItem } : item
      )
    );
  } catch (err) {
    console.error('Error detail:', err);
    alert('Error: ' + (err.message || 'Gagal mengembalikan transaksi'));
  }
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
            <button onClick={() => setShowForm(!showForm)}
              className="bg-white text-black text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full shadow hover:scale-105 transition">+</button>
          )}
        </div>
      </nav>

      {showForm && (
        <div className="px-6 mt-6 mb-6 max-w-xl mx-auto border border-gray-300 rounded-lg p-6 shadow">
          <h2 className="text-xl font-bold mb-4">Tambah Transaksi</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="kode_transaksi" placeholder="Kode Transaksi" value={formData.kode_transaksi} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" required />
            <input name="kode_proyektor" placeholder="Kode Proyektor" value={formData.kode_proyektor} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" required />
            <input name="nik" placeholder="NIK" value={formData.nik} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
          </form>
        </div>
      )}

      <div className="overflow-x-auto px-6 max-w-5xl mx-auto mb-12 mt-6">
        <table className="w-full border-collapse border border-gray-300 text-center text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border py-2">Kode Transaksi</th>
              <th className="border py-2">Kode Proyektor</th>
              <th className="border py-2">NIK</th>
              <th className="border py-2">Status</th>
              <th className="border py-2">Waktu Kembali</th>
              {userRole === 'ADMIN' && <th className="border py-2">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {allItems.length === 0 ? (
              <tr><td colSpan={6} className="py-4 text-gray-500">Tidak ada data</td></tr>
            ) : (
              allItems.map(item => (
                <tr key={item.kode_transaksi}>
                  <td className="border py-2">{item.kode_transaksi}</td>
                  <td className="border py-2">{item.kode_proyektor}</td>
                  <td className="border py-2">{item.nik}</td>
                  <td className="border py-2">{item.status}</td>
                  <td className="border py-2">{item.waktu_dikembalikan ? new Date(item.waktu_dikembalikan).toLocaleString() : '-'}</td>
                  {userRole === 'ADMIN' && (
                    <td className="border py-2 flex justify-center gap-2">
                      {item.status === 'belum dikembalikan' && (
                        <button onClick={() => handleKembalikan(item.kode_transaksi)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Kembalikan</button>
                      )}
                      <button onClick={() => handleDelete(item.kode_transaksi)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Hapus</button>
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
