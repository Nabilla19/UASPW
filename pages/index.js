import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="overflow-hidden rounded-lg shadow-lg border border-gray-300">
          {/* Header kolom */}
          <div className="grid grid-cols-2 bg-gray-100 border-b border-gray-300">
            <div className="text-center font-semibold py-3 border-r border-gray-300 text-green-600">
              BAGUS
            </div>
            <div className="text-center font-semibold py-3 text-red-600">
              RUSAK
            </div>
          </div>

          {/* Isi data */}
          {[...Array(5)].map((_, index) => (
            <div
              className="grid grid-cols-2 border-t border-gray-200 hover:bg-gray-50 transition"
              key={index}
            >
              <div className="py-3 text-center border-r border-gray-200 text-gray-800">
                INF-2023-R101-00{index + 1}
              </div>
              <div className="py-3 text-center text-red-600">
                INF-2023-R101-00{index + 1}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
