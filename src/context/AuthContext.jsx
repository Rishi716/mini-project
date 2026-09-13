import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(() => api.token());
  const [status, setStatus] = useState('loading'); // 'loading' | 'authenticated' | 'guest'

  const setToken = useCallback((t) => {
    api.setToken(t);
    setTokenState(t);
  }, []);

  useEffect(() => {
    if (!token) {
      setStatus('guest');
      return;
    }
    let cancelled = false;
    setStatus('loading');
    api.getProfile()
      .then(({ user }) => {
        if (cancelled) return;
        setUser(user);
        setStatus('authenticated');
      })
      .catch(() => {
        if (cancelled) return;
        setToken('');
        setStatus('guest');
      });
    return () => { cancelled = true; };
  }, [token]);

  const login = useCallback(async (email, password) => {
    const { token: t, user: u } = await api.login({ email, password });
    setToken(t);
    setUser(u);
    setStatus('authenticated');
    return u;
  }, [setToken]);

  const register = useCallback(async (data) => {
    const { token: t, user: u } = await api.register(data);
    setToken(t);
    setUser(u);
    setStatus('authenticated');
    return u;
  }, [setToken]);

  const logout = useCallback(() => {
    setToken('');
    setUser(null);
    setStatus('guest');
  }, [setToken]);

  const updateProfile = useCallback(async (data) => {
    const { user: u } = await api.updateProfile(data);
    setUser(u);
    return u;
  }, []);

  useEffect(() => {
    const handler = () => {
      setToken('');
      setUser(null);
      setStatus('guest');
    };
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, [setToken]);

  const value = useMemo(() => ({
    user,
    token,
    status,
    isAuthenticated: status === 'authenticated',
    isGuest: status === 'guest',
    isLoading: status === 'loading',
    login,
    register,
    logout,
    updateProfile,
  }), [user, token, status, login, register, logout, updateProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}