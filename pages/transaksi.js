// pages/transaksi.tsx
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { Menu, X, Plus, Trash2, RotateCcw, Eye, Calendar, User, Hash } from 'lucide-react';
import Link from 'next/link';
import useAuth from '../components/hooks/useAuth';

export default function Transaksi() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { userRole, loading } = useAuth();
  const [allItems, setAllItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const [formData, setFormData] = useState({

    kode_transaksi: '',
    kode_proyektor: '',
    nik: '',
    status: 'belum dikembalikan',
  });
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const toggleForm = () => {
    setEditMode(false);
    setEditData(null);
    setShowForm(!showForm);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${BASE_URL}/transaksi`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal fetch data transaksi');
        return res.json();
      })
      .then(data => {
        console.log('Data transaksi:', data);
        setAllItems(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setAllItems([]);
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

      if (!newItem || !newItem.kode_transaksi) {
        throw new Error('Respons tidak valid');
      }

      setAllItems(prev => [...prev, newItem]);
      setShowForm(false);
      setFormData({
        kode_transaksi: '',
        kode_proyektor: '',
        nik: '',
        status: 'belum dikembalikan',
      });
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
      console.log('Respon PATCH:', responseData);

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

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
              <Link href="/transaksi" className="text-white font-bold text-sm px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg">TRANSAKSI</Link>
              <Link href="/penanggungjawab" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">PENANGGUNG JAWAB</Link>
              <Link href="/kegiatan" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">KEGIATAN</Link>
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
            <Link href="/transaksi" className="text-white font-bold text-sm px-4 py-2 rounded-lg bg-green-600 hover:bg-green-400 w-full text-center transition-colors duration-200">TRANSAKSI</Link>
            <Link href="/penanggungjawab" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">PENANGGUNG JAWAB</Link>
            <Link href="/kegiatan" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">KEGIATAN</Link>
            <Link href="/riwayat" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">RIWAYAT</Link>
            <Link href="/profile" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">PROFILE</Link>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Data Transaksi</h1>
          <p className="text-gray-600">Kelola transaksi peminjaman proyektor dengan mudah</p>
        </div>

        {/* Enhanced Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              
                {editMode ? 'Edit' : 'Tambah'} Transaksi
              </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kode Transaksi
                    </label>
                    <input 
                      name="kode_transaksi" 
                      placeholder="Masukkan kode transaksi" 
                      value={formData.kode_transaksi} 
                      onChange={handleInputChange} 
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 group-hover:border-gray-300" 
                      required 
                    />
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      
                      Kode Proyektor
                    </label>
                    <input 
                      name="kode_proyektor" 
                      placeholder="Masukkan kode proyektor" 
                      value={formData.kode_proyektor} 
                      onChange={handleInputChange} 
                      className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 group-hover:border-gray-300" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    
                    NIK Peminjam
                  </label>
                  <input 
                    name="nik" 
                    placeholder="Masukkan NIK peminjam" 
                    value={formData.nik} 
                    onChange={handleInputChange} 
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 group-hover:border-gray-300" 
                    required 
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Simpan Transaksi
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Enhanced Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Daftar Transaksi</h3>
            <p className="text-gray-600 text-sm mt-1">Total {allItems.length} transaksi</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-400 to-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      Kode Transaksi
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      Kode Proyektor
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      NIK
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">Status</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      Waktu Kembali
                    </div>
                  </th>
                  {userRole === 'ADMIN' && <th className="px-6 py-4 text-center font-semibold">Aksi</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Eye size={24} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="text-gray-500 font-medium">Belum ada data transaksi</p>
                          <p className="text-gray-400 text-sm">Tambahkan transaksi pertama Anda</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  allItems.map((item, index) => (
                    <tr key={item.kode_transaksi} className="hover:bg-gray-50 transition-colors duration-200 group">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.kode_transaksi}</td>
                      <td className="px-6 py-4 text-gray-700">{item.kode_proyektor}</td>
                      <td className="px-6 py-4 text-gray-700">{item.nik}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'belum dikembalikan' 
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                            : 'bg-green-100 text-green-800 border border-green-200'
                        }`}>
                          {item.status === 'belum dikembalikan' ? 'Belum Dikembalikan' : 'Sudah Dikembalikan'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        {item.waktu_dikembalikan ? (
                          <div className="flex flex-col">
                            <span>{new Date(item.waktu_dikembalikan).toLocaleDateString()}</span>
                            <span className="text-xs text-gray-400">{new Date(item.waktu_dikembalikan).toLocaleTimeString()}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      {userRole === 'ADMIN' && (
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            {item.status === 'belum dikembalikan' && (
                              <button 
                                onClick={() => handleKembalikan(item.kode_transaksi)} 
                                className="group/btn bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 font-medium"
                              >
                                <RotateCcw size={16} className="group-hover/btn:rotate-180 transition-transform duration-300" />
                                Kembalikan
                              </button>
                            )}
                            <button 
                              onClick={() => handleDelete(item.kode_transaksi)} 
                              className="group/btn bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 font-medium"
                            > Hapus
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}