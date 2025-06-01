import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { Menu, X, Plus, Edit, Trash2, Calendar, MapPin, Clock, Activity } from 'lucide-react';
import Link from 'next/link';
import useAuth from '../components/hooks/useAuth';

// Helper function untuk format datetime
const formatDateTimeForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
};

// Helper function untuk display datetime
const formatDateTimeDisplay = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function Kegiatan() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { userRole, loading } = useAuth();
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token tidak ditemukan. Harap login.');

        const res = await fetch(`${BASE_URL}/kegiatan`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error('Gagal mengambil data kegiatan');

        const data = await res.json();
        const items = Array.isArray(data) ? data : [];
        setAllItems(items);
        setFilteredItems(items);
      } catch (err) {
        console.error('Fetch error:', err);
        setAllItems([]);
        setFilteredItems([]);
      }
    };

    fetchKegiatan();
  }, []);

  const toggleForm = () => {
    setEditMode(false);
    setEditData(null);
    setShowForm(!showForm);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const form = e.target;
    const kegiatanBaru = {
      kode_transaksi: form.kode_transaksi.value,
      kegiatan: form.kegiatan.value,
      tempat: form.tempat.value,
      waktu: form.waktu.value,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Anda belum login!");

      if (editMode) {
        // UPDATE (PUT)
        const res = await fetch(`${BASE_URL}/kegiatan/${kegiatanBaru.kode_transaksi}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(kegiatanBaru)
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Gagal update kegiatan');
        }

        // Update state
        setAllItems(prev => 
          prev.map(item => 
            item.kode_transaksi === kegiatanBaru.kode_transaksi ? kegiatanBaru : item
          )
        );
        setFilteredItems(prev => 
          prev.map(item => 
            item.kode_transaksi === kegiatanBaru.kode_transaksi ? kegiatanBaru : item
          )
        );
      } else {
        // CREATE (POST)
        const res = await fetch(`${BASE_URL}/kegiatan`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(kegiatanBaru)
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Gagal tambah kegiatan');
        }

        const newItem = await res.json();
        setAllItems(prev => [...prev, newItem]);
        setFilteredItems(prev => [...prev, newItem]);
      }

      setShowForm(false);
      setEditMode(false);
      setEditData(null);
    } catch (err) {
      console.error("Error:", err);
      alert('Error: ' + err.message);
    }
  };

  const handleDelete = async (kode_transaksi) => {
    if (!confirm('Yakin hapus kegiatan ini?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Anda belum login!");

      const res = await fetch(`${BASE_URL}/kegiatan/${kode_transaksi}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Gagal hapus kegiatan');
      }

      // Update state setelah penghapusan
      setAllItems(prev => prev.filter(item => item.kode_transaksi !== kode_transaksi));
      setFilteredItems(prev => prev.filter(item => item.kode_transaksi !== kode_transaksi));
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
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* Enhanced Navbar */}
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
              <Link href="/penanggungjawab" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">PENANGGUNG JAWAB</Link>
              <Link href="/kegiatan" className="text-white font-bold text-sm px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg">KEGIATAN</Link>
              <Link href="/riwayat" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">RIWAYAT</Link>
              <Link href="/profile" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">PROFILE</Link>
            </div>
          </div>

          {!loading && userRole === 'ADMIN' && (
            <button
              onClick={toggleForm}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center group"
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
            <Link href="/penanggungjawab" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">PENANGGUNG JAWAB</Link>
            <Link href="/kegiatan" className="text-white font-bold text-sm px-4 py-2 rounded-lg bg-green-600 hover:bg-green-400 w-full text-center transition-colors duration-200">KEGIATAN</Link>
            <Link href="/riwayat" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">RIWAYAT</Link>
            <Link href="/profile" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">PROFILE</Link>
          </div>
        )}
      </nav>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Kegiatan</h1>
            <p className="text-gray-600 mt-1">Kelola data kegiatan organisasi</p>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-green-600 to-green-600 text-white p-6 rounded-t-2xl">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  {editMode ? <Edit size={24} /> : <Plus size={24} />}
                  {editMode ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
                </h2>
              </div>
              
              <form onSubmit={handleNext} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Kode Transaksi
                    </label>
                    <input
                      type="text"
                      name="kode_transaksi"
className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-100 text-gray-800"                      defaultValue={editData?.kode_transaksi || ''}
                      required
                      readOnly={editMode}
                      placeholder="Masukkan kode transaksi"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Kegiatan
                    </label>
                    <input
                      type="text"
                      name="kegiatan"
className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-100 text-gray-800"                      defaultValue={editData?.kegiatan || ''}
                      required
                      placeholder="Masukkan nama kegiatan"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tempat
                    </label>
                    <input
                      type="text"
                      name="tempat"
className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-100 text-gray-800"                      defaultValue={editData?.tempat || ''}
                      required
                      placeholder="Masukkan tempat kegiatan"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Waktu
                    </label>
                    <input
                      type="datetime-local"
                      name="waktu"
className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-100 text-gray-800"                      defaultValue={
                        editData?.waktu 
                          ? formatDateTimeForInput(editData.waktu) 
                          : ''
                      }
                      required
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button 
                    type="button" 
                    onClick={toggleForm} 
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {editMode ? 'Update' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-green-400 to-green-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Kode Transaksi</th>
                  <th className="px-6 py-4 text-left font-semibold">Nama Kegiatan</th>
                  <th className="px-6 py-4 text-left font-semibold">Tempat</th>
                  <th className="px-6 py-4 text-left font-semibold">Waktu</th>
                  {userRole === 'ADMIN' && (
                    <th className="px-6 py-4 text-center font-semibold">Aksi</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={userRole === 'ADMIN' ? 5 : 4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center space-y-3">
                        <p className="text-gray-500 font-medium">Belum ada data kegiatan</p>
                        <p className="text-gray-400 text-sm">Data akan muncul setelah ditambahkan</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item, index) => (
                    <tr key={item.kode_transaksi} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                          {item.kode_transaksi}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{item.kegiatan}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          {item.tempat}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span>{new Date(item.waktu).toLocaleDateString()}</span>
                            <span className="text-xs text-gray-400">{new Date(item.waktu_dikembalikan).toLocaleTimeString()}</span>
                          </div>
                      </td>
                      {userRole === 'ADMIN' && (
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="bg-amber-100 hover:bg-amber-200 text-amber-700 p-2 rounded-lg transition-all duration-200 hover:scale-105"
                              title="Edit kegiatan"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.kode_transaksi)}
                              className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-all duration-200 hover:scale-105"
                              title="Hapus kegiatan"
                            >
                              <Trash2 size={16} />
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
      
      <Footer />

      <style jsx>{`
        .nav-link {
          @apply relative px-4 py-2 text-white font-semibold text-sm uppercase tracking-wide rounded-lg transition-all duration-300;
        }
        
        .nav-link:hover {
          @apply bg-white/10 transform scale-105;
        }
        
        .nav-text {
          @apply relative z-10;
        }
        
        .nav-underline {
          @apply absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 rounded-full;
        }
        
        .nav-link:hover .nav-underline {
          @apply w-full;
        }
        
        .nav-underline.active {
          @apply w-full;
        }
        
        .nav-active {
          @apply bg-white/10;
        }
        
        .mobile-nav-link {
          @apply block w-full text-left px-4 py-3 text-white font-semibold rounded-lg transition-all duration-200 hover:bg-white/10;
        }
      `}</style>
    </div>
  );
}