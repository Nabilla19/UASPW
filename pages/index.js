import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 border-t border-black">
          <div className="text-center font-bold py-2 border-r border-black">BAGUS</div>
          <div className="text-center font-bold py-2">RUSAK</div>
        </div>

        {[...Array(5)].map((_, index) => (
          <div className="grid grid-cols-2 border-t border-black" key={index}>
            <div className="py-2 text-center border-r border-black text-gray-700">INF-2023-R101-001</div>
            <div className="py-2 text-center text-red-600">INF-2023-R101-001</div>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
