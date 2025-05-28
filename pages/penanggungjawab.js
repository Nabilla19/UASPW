// pages/penanggungjawab.tsx
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { Menu, X, Plus, Edit, Trash2, Users, Phone, IdCard } from 'lucide-react';
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
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPenanggungJawab = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token tidak ditemukan. Harap login.');

        const res = await fetch(`${BASE_URL}/pj`, {
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
        setAllItems([]);
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
        const res = await fetch(`${BASE_URL}/pj/${data.nik}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Gagal update data');
        }

        setAllItems(prev => prev.map(item => item.nik === data.nik ? data : item));
      } else {
        const res = await fetch(`${BASE_URL}/pj`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
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

  const handleDelete = async (nik) => {
    if (!confirm('Yakin hapus penanggung jawab ini?')) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Anda belum login!");

      const res = await fetch(`${BASE_URL}/pj/${nik}`, {
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

  const handleEdit = (data) => {
    setEditMode(true);
    setEditData(data);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      
      {/* Enhanced Navigation */}
      <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black px-6 py-4 shadow-xl">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center">
            <button
              className="sm:hidden text-white mr-4 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden sm:flex gap-2 items-center">
              <Link href="/" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">HOME</Link>
              <Link href="/transaksi" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">TRANSAKSI</Link>
              <Link href="/penanggungjawab" className="text-white font-bold text-sm px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg">PENANGGUNG JAWAB</Link>
              <Link href="/kegiatan" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">KEGIATAN</Link>
              <Link href="/riwayat" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">RIWAYAT</Link>
              <Link href="/profile" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">PROFILE</Link>
            </div>
          </div>

          {!loading && userRole === 'ADMIN' && (
            <button
              onClick={toggleForm}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center group"
              aria-label="Tambah proyektor"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
            </button>
          )}
        </div>

        {menuOpen && (
          <div className="sm:hidden flex flex-col mt-4 space-y-2 items-start bg-gray-800 rounded-lg p-4 border-t border-gray-700">
            <Link href="/" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">HOME</Link>
            <Link href="/transaksi" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">TRANSAKSI</Link>
            <Link href="/penanggungjawab" className="text-white font-bold text-sm px-4 py-2 rounded-lg bg-green-600 hover:bg-green-400 w-full text-center transition-colors duration-200">PENANGGUNG JAWAB</Link>
            <Link href="/kegiatan" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">KEGIATAN</Link>
            <Link href="/riwayat" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">RIWAYAT</Link>
            <Link href="/profile" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">PROFILE</Link>
          </div>
        )}
      </nav>

      {/* Page Header */}
      <div className="bg-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold text-black">
              Penanggung Jawab
            </h1>
          </div>
          <p className="text-gray-600">
            Kelola data penanggung jawab dengan mudah dan efisien
          </p>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                {editMode ? <Edit size={24} /> : <Plus size={24} />}
                {editMode ? 'Edit' : 'Tambah'} Penanggung Jawab
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  NIK
                </label>
                <input
                  type="text"
                  name="nik"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  defaultValue={editData?.nik || ''}
                  placeholder="Masukkan NIK"
                  required
                  readOnly={editMode}
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  Nama
                </label>
                <input
                  type="text"
                  name="nama"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  defaultValue={editData?.nama || ''}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  Kontak
                </label>
                <input
                  type="text"
                  name="kontak"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  defaultValue={editData?.no_hp || ''}
                  placeholder="Masukkan nomor telepon"
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={toggleForm} 
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {editMode ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="px-6 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-green-400 to-green-600">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        NIK
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        Nama
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        Kontak
                      </div>
                    </th>
                    {userRole === 'ADMIN' && (
                      <th className="px-4 py-3 text-center text-sm font-semibold text-white uppercase tracking-wider">
                        Aksi
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {allItems.length === 0 ? (
                    <tr>
                      <td colSpan={userRole === 'ADMIN' ? 4 : 3} className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Users size={48} className="mb-4 opacity-30" />
                          <p className="text-lg font-medium mb-2">Belum ada data penanggung jawab</p>
                          <p className="text-sm">Tambahkan data penanggung jawab pertama Anda</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    allItems.map((item, index) => (
                      <tr key={item.nik} className="hover:bg-gray-50 transition-colors duration-200 group">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                            </div>
                            <div className="font-medium text-gray-900">{item.nik}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-gray-900 font-medium">{item.nama}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-gray-900">{item.no_hp}</div>
                        </td>
                        {userRole === 'ADMIN' && (
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEdit(item)}
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white p-2 rounded-lg transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                                title="Edit"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDelete(item.nik)}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2 rounded-lg transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                                title="Hapus"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}