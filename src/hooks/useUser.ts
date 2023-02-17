import { useContext } from 'react';

import { AuthContext, unloggedUser } from '@/auth/AuthContext';
import User from '@/types/User';

import { useLocalStorage } from './useLocalStorage';

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (u: User) => {
    setUser(u);
    setItem('user', JSON.stringify(u));
  };

  const removeUser = () => {
    setUser(unloggedUser);
    setItem('user', JSON.stringify(unloggedUser));
  };

  return { user, addUser, removeUser };
};
