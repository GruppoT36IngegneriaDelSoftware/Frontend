import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';
import BurgerIcon from '@/icons/BurgerIcon';
import LogoutIcon from '@/icons/LogoutIcon';
import ModeratoreIcon from '@/icons/ModeratoreIcon';
import SegnalaIcon from '@/icons/SegnalaIcon';
import { IVoceMenu } from '@/types/components/IMenu';

import MenuVerticale from '../menu/MenuVerticale';

type IMenuAction = {
  setViewMenu: (viewMenu: boolean) => void;
};

const MenuAction = (props: IMenuAction) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [voci, setVoci] = useState<Array<IVoceMenu>>([]);

  useEffect(() => {
    let vs: Array<IVoceMenu> = [
      {
        label: 'logout',
        colore: 'text-main-primary fill-main-primary',
        icona: <LogoutIcon />,
        callback: () => {
          logout();
          props.setViewMenu(false);
        },
      },
    ];

    if (user.isStaff)
      vs = [
        {
          label: 'segnalazioni',
          colore: 'text-main-black fill-main-black',
          icona: <SegnalaIcon />,
          callback: () => {
            router.push('/pannello-di-controllo/');
          },
        },
        ...vs,
      ];

    if (user.isAdmin)
      vs = [
        {
          label: 'moderatori',
          colore: 'text-main-black fill-main-black',
          icona: <ModeratoreIcon />,
          callback: () => {
            router.push('/pannello-di-controllo/admin');
          },
        },
        ...vs,
      ];

    setVoci(vs);
  }, []);
  return <MenuVerticale voci={voci} destra />;
};

const BurgerButton = () => {
  const [viewMenu, setViewMenu] = useState<boolean>(false);

  const handleClick = () => {
    setViewMenu(!viewMenu);
  };

  return (
    <div
      className="max-h-6 self-center relative"
      // chiudo il menu se perde il focus
      tabIndex={1}
      onBlur={handleClick}
    >
      <div onClick={handleClick}>
        <BurgerIcon />
      </div>
      {viewMenu && <MenuAction setViewMenu={setViewMenu} />}
    </div>
  );
};

export { BurgerButton };
