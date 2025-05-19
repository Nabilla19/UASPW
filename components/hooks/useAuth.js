import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isTokenExpired, getUserFromToken } from '/components/auth';

export default function useAuth() {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');

    if (!token || isTokenExpired(token)) {
      setLoading(false);
      router.push('/login');
      return;
    }

    const user = getUserFromToken(token);

    if (!user || !user.role) {
      setLoading(false);
      router.push('/login');
      return;
    }

    setUserRole(user.role);
    setLoading(false);
  }, [router]);

  return { userRole, loading };
}
