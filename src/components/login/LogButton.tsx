import { AuthContext } from '@/auth/AuthContext';

import { BurgerButton } from './BurgerButton';
import { LoginButton } from './LoginButton';

const LogButton = () => {
  return (
    <AuthContext.Consumer>
      {({ user }) => <>{user.isLogged ? <BurgerButton /> : <LoginButton />}</>}
    </AuthContext.Consumer>
  );
};

export { LogButton };
