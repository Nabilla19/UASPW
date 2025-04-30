export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="border-t-4 border-green-500 w-20 mb-4"></div>
          <p>Fakultas Sains dan Teknologi<br />
          UIN Sultan Syarif Kasim Riau<br />
          Jl. HR. Soebrantas No. KM. 15, RW.15, Tuah Madani<br />
          Kota Pekanbaru, Riau 28293</p>
  
          <div className="border-t-4 border-green-500 w-20 my-4"></div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Program Studi</a></li>
            <li><a href="#" className="hover:underline">Lowongan Kerja</a></li>
          </ul>
        </div>
      </footer>
    );
  }
  