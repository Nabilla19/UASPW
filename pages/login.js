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
      const res = await fetch('http://localhost:3001/auth/login', {
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
      const res = await fetch('http://localhost:3001/auth/register', {
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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="container mx-auto px-4">
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
              <h2 className="text-2xl font-bold mb-1 text-center">
                {activeTab === 'login' ? 'LOGIN' : 'SIGN UP'}
              </h2>
              <div className="h-1 w-full bg-green-500 mx-auto"></div>
            </div>

            {error && (
              <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
            )}

            <form
              className="space-y-6"
              onSubmit={activeTab === 'login' ? handleLoginSubmit : handleRegisterSubmit}
            >
              {activeTab === 'signup' && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nama</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                  className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-md text-sm font-medium"
                >
                  {activeTab === 'login' ? 'SIGN UP' : 'LOGIN'}
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
      </div>
    </div>
  );
}
