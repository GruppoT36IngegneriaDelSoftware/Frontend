import { useState } from 'react';

import { AppProps } from 'next/app';

import { AuthContext } from '@/auth/AuthContext';
// eslint-disable-next-line import/order
import { useAuth } from '@/hooks/useAuth';

import '../styles/global.css';
import User from '@/types/User';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { user } = useAuth();
  const [utente, setUtente] = useState<User>(user);

  return (
    <AuthContext.Provider value={{ user: utente, setUser: setUtente }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

export default MyApp;
