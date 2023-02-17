import { createContext } from 'react';

import User from '@/types/User';

interface AuthContext {
  user: User;
  setUser: (user: User) => void;
}

const unloggedUser: User = {
  isLogged: false,
  isAdmin: false,
  isStudente: false,
  isStaff: false,
  authToken: '',
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const AuthContext = createContext<AuthContext>({
  user: { ...unloggedUser },
  setUser: () => {},
});

export { AuthContext, unloggedUser };
