import { useEffect } from 'react';

import User from '@/types/User';

import { useLocalStorage } from './useLocalStorage';
import { useUser } from './useUser';

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const u = getItem('user');
    if (u) {
      addUser(JSON.parse(u));
    }
  }, []);

  const login = (u: User) => {
    // eslint-disable-next-line no-param-reassign
    u.isLogged = true;
    addUser(u);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};
