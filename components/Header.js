export default function Header() {
    return (
      <header className="bg-black text-white py-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <img src="/logo-uin.png" alt="Logo" className="w-16 h-16" />
            <div>
              <h1 className="font-bold text-xl">FAKULTAS</h1>
              <p className="text-sm">SAINS DAN TEKNOLOGI</p>
            </div>
          </div>
  
          <div className="text-right">
            <p className="text-sm">Selamat datang di</p>
            <h2 className="text-4xl font-bold">Proyek<span className="text-gray-400">.in</span></h2>
          </div>
        </div>
  
        <nav className="bg-gray-700 mt-4">
          <div className="container mx-auto flex justify-between items-center px-4 py-3">
            <div className="flex gap-6 text-white font-bold">
              <a href="#" className="hover:underline">HOME</a>
              <a href="#" className="hover:underline">DIPAKAI</a>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Cari..."
                className="px-3 py-1 rounded-md text-black"
              />
              <button className="bg-white text-black px-3 py-1 rounded-md font-bold">+</button>
            </div>
          </div>
        </nav>
      </header>
    );
  }
  