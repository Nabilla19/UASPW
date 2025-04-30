import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Infokus() {
  return (
    <>
      <Header />
      <nav className="bg-gray-800 px-6 py-3 flex flex-col sm:flex-row items-center justify-between shadow-md">
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-white font-bold text-lg">HOME</Link>
          <Link href="/dipakai" className="text-white font-bold text-lg">DIPAKAI</Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-6">INFOKUS</h1>
          
          {/* Toggle antara Peminjaman dan Infokus */}
          <div className="flex justify-center gap-4 mb-8">
            <Link href="/peminjaman" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300">
              PEMINJAMAN
            </Link>
            <Link href="/infokus" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">
              INFOKUS
            </Link>
          </div>
        </div>

        {/* Form Infokus Sederhana */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Form Infokus</h2>
          <form className="space-y-4">
            {/* Merek */}
            <div>
              <label className="block text-gray-700 mb-2">MEREK</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Input Merek"
              />
            </div>

            {/* Kode */}
            <div>
              <label className="block text-gray-700 mb-2">KODE</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Input Kode"
              />
            </div>

            <button 
              type="submit" 
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition w-full font-semibold"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}