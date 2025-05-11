import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Peminjaman() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/infokus');
  };

  return (
    <>
      <Header />
      <nav className="bg-gray-800 px-6 py-3 flex flex-col sm:flex-row items-center justify-between shadow-md">
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-white font-bold text-lg">HOME</Link>
          <Link href="/dipakai" className="text-white font-bold text-lg">PEMINJAMAN</Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-6">PENANGGUNG JAWAB</h1>

          {}
          <div className="flex justify-center gap-4 mb-8">
            <Link href="/peminjaman" className={`px-6 py-2 rounded-lg font-semibold ${router.pathname === '/peminjaman' ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}>
              PENANGGUNG JAWAB
            </Link>
            <Link href="/infokus" className={`px-6 py-2 rounded-lg font-semibold ${router.pathname === '/infokus' ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}>
              PROYEKTOR
            </Link>
            <Link href="/kegiatan" className={`px-6 py-2 rounded-lg font-semibold ${router.pathname === '/kegiatan' ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}>
              KEGIATAN
            </Link>
            <Link href="/transaksi" className={`px-6 py-2 rounded-lg font-semibold ${router.pathname === '/transaksi' ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}>
              TRANSAKSI
            </Link>
          </div>
        </div>

        {}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Form Penanggung Jawab</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 mb-2">Nama Penanggung Jawab</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Masukkan Nama"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">NIM</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Masukkan NIM"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">No. HP</label>
              <input 
                type="tel" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Masukkan No. HP"
              />
            </div>

            <div className="flex justify-between">
              {}
              <Link href="/dipakai">
                <button type="button" className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition font-semibold">
                  SEBELUMNYA
                </button>
              </Link>

              {}
              <button 
                type="submit" 
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
              >
                NEXT
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
