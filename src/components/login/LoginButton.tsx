import { useEffect, useState } from 'react';

import LoginIcon from '@/icons/LoginIcon';
import StaffLogIcon from '@/icons/StaffLogIcon';
import StudenteLogIcon from '@/icons/StudenteLogIcon';

import MenuOrizzontale from '../menu/MenuOrizzontale';
import LoginPopup from './LoginPopup';

type IMenuLoginProps = {
  setViewPopup: (value: boolean) => void;
};

const MenuLogin = (props: IMenuLoginProps) => {
  const [doLogin, setDoLogin] = useState<boolean>(false);
  const [doStaffLogin, setDoStaffLogin] = useState<boolean>(false);

  useEffect(() => {
    setDoLogin(doStaffLogin);
  }, [doStaffLogin]);

  useEffect(() => {
    if (doLogin) props.setViewPopup(true);
  }, [doLogin]);

  return (
    <>
      <MenuOrizzontale
        voci={[
          {
            label: 'staff',
            colore: 'text-main-primary',
            icona: <StaffLogIcon />,
            callback: () => {
              setDoStaffLogin(true);
            },
          },
          {
            label: 'studente',
            colore: 'text-main-primary',
            icona: <StudenteLogIcon />,
            callback: () => {
              setDoLogin(true);
            },
          },
        ]}
      />
      {doLogin && (
        <LoginPopup staff={doStaffLogin} setViewPopup={props.setViewPopup} />
      )}
    </>
  );
};

const LoginButton = () => {
  const [viewMenu, setViewMenu] = useState<boolean>(false);
  const [viewPopup, setViewPopup] = useState<boolean>(false);

  const handleClick = () => {
    if (!viewPopup) setViewMenu(!viewMenu);
  };

  useEffect(() => {
    if (!viewPopup) setViewMenu(false);
  }, [viewPopup]);

  return (
    <div
      className="max-h-9 self-center relative"
      // chiudo il menu se perde il focus
      tabIndex={1}
      onBlur={handleClick}
    >
      <div onClick={handleClick}>
        <LoginIcon />
      </div>
      {viewMenu && <MenuLogin setViewPopup={setViewPopup} />}
    </div>
  );
};

export { LoginButton };
