export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-8 mt-10">
        <div className="container mx-auto px-4 text-center">
          <div className="border-t-4 border-green-500 w-24 mx-auto mb-4"></div>
          <p className="text-sm leading-relaxed">
            Fakultas Sains dan Teknologi<br />
            UIN Sultan Syarif Kasim Riau<br />
            Jl. HR. Soebrantas No. KM. 15, RW.15, Tuah Madani<br />
            Kota Pekanbaru, Riau 28293
          </p>
  
          <div className="border-t-4 border-green-500 w-24 mx-auto my-4"></div>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Tentang</a></li>
            <li><a href="#" className="hover:underline">Program Studi</a></li>
            <li><a href="#" className="hover:underline">Lowongan Kerja</a></li>
          </ul>
        </div>
      </footer>
    );
  }  