import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Plus, Search, Filter, Edit, Trash2, RefreshCw } from 'lucide-react';
import useAuth from '../components/hooks/useAuth';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { userRole, loading } = useAuth();
  const [showFilter, setShowFilter] = useState(false);
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
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
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
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Anda belum login!");

      if (editMode) {
        const res = await fetch(`${BASE_URL}/proyektor/${proyektorbaru.kode_proyektor}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(proyektorbaru)
        });
        if (!res.ok) throw new Error('Gagal update');
        
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
        const res = await fetch(`${BASE_URL}/proyektor`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(proyektorbaru)
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
      console.error("Error detail:", err);
    }
  };

  const handleDelete = async (kode) => {
    if (!confirm('Yakin hapus proyektor ini?')) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Anda belum login!");

      const res = await fetch(`${BASE_URL}/proyektor/${kode}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Gagal hapus proyektor');
      }

      setAllItems((prev) => prev.filter((item) => item.kode_proyektor !== kode));
      setFilteredItems((prev) => prev.filter((item) => item.kode_proyektor !== kode));

    } catch (err) {
      alert('Error: ' + err.message);
      console.error("Delete error:", err);
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
    setShowFilter(false);
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

  const getStatusBadge = (status) => {
    const statusStyles = {
      'tersedia': 'bg-green-100 text-green-800 border-green-200',
      'sedang dipakai': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'rusak': 'bg-red-100 text-red-800 border-red-200'
    };
    
    return `px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`;
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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
              <Link href="/" className="text-white font-bold text-sm px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg">HOME</Link>
              <Link href="/transaksi" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transform hover:scale-105 transition-all duration-200">TRANSAKSI</Link>
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
            <Link href="/" className="text-white font-bold text-sm px-4 py-2 rounded-lg bg-green-600 hover:bg-green-400 w-full text-center transition-colors duration-200">HOME</Link>
            <Link href="/transaksi" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">TRANSAKSI</Link>
            <Link href="/penanggungjawab" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">PENANGGUNG JAWAB</Link>
            <Link href="/kegiatan" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">KEGIATAN</Link>
            <Link href="/riwayat" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">RIWAYAT</Link>
            <Link href="/profile" className="text-gray-300 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white w-full text-center transition-colors duration-200">PROFILE</Link>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Form */}
        {showForm && (
          <div className="mb-8">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Plus size={24} />
                  {editMode ? 'Edit' : 'Tambah'} Proyektor
                </h2>
                <p className="text-indigo-100 mt-2">{editMode ? 'Perbarui informasi proyektor' : 'Tambahkan proyektor baru ke sistem'}</p>
              </div>
              
              <form onSubmit={handleNext} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kode Proyektor</label>
                  <input
                    type="text"
                    name="kode_proyektor"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                    defaultValue={editData?.kode_proyektor || ''}
                    required
                    readOnly={editMode}
                    placeholder="Masukkan kode proyektor"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Merek</label>
                  <input
                    type="text"
                    name="merek"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                    defaultValue={editData?.merek || ''}
                    required
                    placeholder="Masukkan merek proyektor"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor Seri</label>
                  <input
                    type="text"
                    name="nomor_seri"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                    defaultValue={editData?.nomor_seri || ''}
                    required
                    placeholder="Masukkan nomor seri"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <input
                    type="text"
                    name="status"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                    defaultValue={editData?.status || ''}
                    required
                    placeholder="Masukkan status proyektor"
                  />
                </div>
                
                <div className="flex justify-end gap-4 pt-6">
                  <button 
                    type="button" 
                    onClick={toggleForm} 
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors duration-200"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    {editMode ? 'Update' : 'Tambah'} Proyektor
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Enhanced Filter Form */}
        {showFilter ? (
          <div className="mb-8">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-400 to-green-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Search size={24} />
                  Filter Proyektor
                </h2>
                <p className="text-blue-100 mt-2">Cari proyektor berdasarkan kriteria tertentu</p>
              </div>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="p-8 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Kode Proyektor</label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                      value={searchParams.kode_proyektor}
                      onChange={(e) => setSearchParams({ ...searchParams, kode_proyektor: e.target.value })}
                      placeholder="Cari berdasarkan kode"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Nomor Seri</label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                      value={searchParams.nomor_seri}
                      onChange={(e) => setSearchParams({ ...searchParams, nomor_seri: e.target.value })}
                      placeholder="Cari berdasarkan seri"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Merek</label>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                      value={searchParams.merek}
                      onChange={(e) => setSearchParams({ ...searchParams, merek: e.target.value })}
                      placeholder="Cari berdasarkan merek"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Status</label>
                    <select
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                      value={searchParams.status}
                      onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
                    >
                      <option value="">Semua Status</option>
                      <option value="tersedia">Tersedia</option>
                      <option value="sedang dipakai">Sedang dipakai</option>
                      <option value="rusak">Rusak</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={handleCancelFilter}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors duration-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-400 text-white rounded-lg hover:from-green-400 hover:to-green-600 font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                  >
                    <Search size={18} />
                    Cari Proyektor
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            {/* Enhanced Action Bar */}
            <div className="mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Proyektor</h1>
                    <p className="text-gray-600">Kelola semua proyektor dalam sistem</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowFilter(true)}
                      className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 p-6 text-center rounded-lg hover:green-200  font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                    >
                      <Filter size={18} />
                      Filter
                    </button>
                    
                    <button
                      onClick={() => {
                        handleResetFilter();
                        setShowFilter(false);
                      }}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors duration-200 flex items-center gap-2"
                    >
                      <RefreshCw size={18} />
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-400 to-green-600 p-6 text-center">
                      <th className="py-4 px-6 text-left font-semibold">Kode Infokus</th>
                      <th className="py-4 px-6 text-left font-semibold">Merek</th>
                      <th className="py-4 px-6 text-left font-semibold">Nomor Seri</th>
                      <th className="py-4 px-6 text-center font-semibold">Status</th>
                      {userRole === 'ADMIN' && (
                        <th className="py-4 px-6 text-center font-semibold">Aksi</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={userRole === 'ADMIN' ? 5 : 4} className="py-12 text-center">
                          <div className="text-gray-400">
                            <Search size={48} className="mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">Data proyektor tidak ditemukan</p>
                            <p className="text-sm">Coba gunakan filter yang berbeda</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="py-4 px-6 font-medium text-gray-900">{item.kode_proyektor}</td>
                          <td className="py-4 px-6 text-gray-700">{item.merek}</td>
                          <td className="py-4 px-6 text-gray-700">{item.nomor_seri}</td>
                          <td className="py-4 px-6 text-center">
                            <span className={getStatusBadge(item.status)}>
                              {item.status}
                            </span>
                          </td>
                          
                          {userRole === 'ADMIN' && (
                            <td className="py-4 px-6">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors duration-200 group"
                                  title="Edit proyektor"
                                >
                                  <Edit size={16} className="group-hover:scale-110 transition-transform duration-200" />
                                </button>
                                <button
                                  onClick={() => handleDelete(item.kode_proyektor)}
                                  className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 group"
                                  title="Hapus proyektor"
                                >
                                  <Trash2 size={16} className="group-hover:scale-110 transition-transform duration-200" />
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

            {/* Stats Summary */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Proyektor</p>
                    <p className="text-2xl font-bold text-gray-900">{allItems.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tersedia</p>
                    <p className="text-2xl font-bold text-green-600">
                      {allItems.filter(item => item.status === 'tersedia').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Sedang Dipakai</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {allItems.filter(item => item.status === 'sedang dipakai').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rusak</p>
                    <p className="text-2xl font-bold text-red-600">
                      {allItems.filter(item => item.status === 'rusak').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}