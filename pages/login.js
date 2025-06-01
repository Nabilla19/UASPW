import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isTokenExpired } from '../components/auth';

export default function Login() {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // Kalau token valid, langsung redirect ke home
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
      router.push('/');
    }
  }, [router]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login gagal');
        return;
      }

      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (err) {
      setError('Gagal terhubung ke server');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registrasi gagal');
        return;
      }

      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (err) {
      setError('Gagal terhubung ke server');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <img src="/logo-uin.png" alt="Logo UIN" className="h-10" />
              <h2 className="text-white text-xl ml-2 font-medium">FAKULTAS</h2>
            </div>
            <p className="text-white text-sm opacity-90">Selamat datang di</p>
            <h1 className="text-white text-4xl font-mono mt-1 font-bold">Proyek.in</h1>
          </div>

          <div className="p-8">
            {/* Tabs */}
            <div className="flex mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 font-medium text-sm ${activeTab === 'login' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500 hover:text-green-500'}`}
              >
                LOGIN
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 font-medium text-sm ${activeTab === 'signup' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500 hover:text-green-500'}`}
              >
                SIGN UP
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form
              className="space-y-5"
              onSubmit={activeTab === 'login' ? handleLoginSubmit : handleRegisterSubmit}
            >
              {activeTab === 'signup' && (
                <div className="space-y-1">
                  <label className="block text-gray-700 text-sm font-medium">Nama</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-100 text-gray-800"                   
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-gray-700 text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-100 text-gray-800"                  
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-gray-700 text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-100 text-gray-800"                  
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {activeTab === 'login' ? 'LOGIN' : 'REGISTER'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                className="text-sm text-green-600 hover:text-green-800 font-medium transition-colors"
              >
                {activeTab === 'login' 
                  ? 'Belum punya akun? Daftar disini' 
                  : 'Sudah punya akun? Login disini'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}