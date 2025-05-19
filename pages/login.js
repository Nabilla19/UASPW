import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [activeTab, setActiveTab] = useState('login');
  const router = useRouter();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    router.push('/'); 
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="container mx-auto px-4">
        {activeTab === 'login' ? (
      
          <div className="max-w-md mx-auto">
            <div className="mb-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <img src="/logo-uin.png" alt="Logo UIN" className="h-10" />
                <h2 className="text-white text-xl ml-2 font-medium">FAKULTAS</h2>
              </div>
              <p className="text-white text-sm">Selamat datang di</p>
              <h1 className="text-white text-5xl font-mono mt-1">Proyek.in</h1>
            </div>

            <div className="bg-gray-200 rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1 text-center">LOGIN</h2>
                <div className="h-1 w-full bg-green-500 mx-auto"></div>
              </div>

              <form className="space-y-6" onSubmit={handleLoginSubmit}>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">username</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none"
                    required
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('signup')}
                    className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-md text-sm font-medium"
                  >
                    SIGN UP
                  </button>

                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-md text-sm font-medium"
                  >
                    CONFIRM
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            {}
          </div>
        )}
      </div>
    </div>
  );
}
