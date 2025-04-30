export default function Header() {
    return (
      <header className="relative text-white">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/bg-uin.jpg"
            alt="Background UIN"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50"></div>
        </div>
  
        {/* Content */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between px-6 py-8 gap-y-4">
          {/* Logo dan Info */}
          <div className="flex items-center gap-4">
            <img src="/logo-uin.png" alt="Logo UIN" className="w-14 h-14" />
            <div>
              <h1 className="text-2xl font-bold">Fakultas Sains dan Teknologi</h1>
              <p className="text-sm text-gray-200">UIN Sultan Syarif Kasim Riau</p>
            </div>
          </div>
  
          {/* Sambutan & Nama Aplikasi */}
          <div className="text-center sm:text-right">
            <p className="text-lg mb-1 text-gray-200">Selamat Datang</p>
            <h2 className="text-4xl font-bold tracking-wide">
              Proyek<span className="text-green-400">.in</span>
            </h2>
          </div>
        </div>
      </header>
    );
  }
  