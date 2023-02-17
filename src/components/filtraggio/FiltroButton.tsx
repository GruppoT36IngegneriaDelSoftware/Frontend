import { useState } from 'react';

import FiltroIcon from '@/icons/FiltroIcon';
import { ISelezionaDipartimento } from '@/types/components/INavbar';
import IDipartimento from '@/types/IDipartimento';

import MenuVerticale from '../menu/MenuVerticale';

type IMenuFiltriProps = {
  selezionaDipartimento: ISelezionaDipartimento;
  setViewMenu: (view: boolean) => void;
};

const MenuFiltri = (props: IMenuFiltriProps) => {
  return (
    <MenuVerticale
      destra
      voci={props.selezionaDipartimento.dipartimenti.map(
        (dip: IDipartimento) => {
          return {
            label: dip.nome,
            colore:
              dip._id === props.selezionaDipartimento.dipartimento
                ? 'text-additional-success'
                : 'text-main-black',
            icona: <h6>-</h6>,
            callback: () => {
              if (dip._id === props.selezionaDipartimento.dipartimento)
                props.selezionaDipartimento.setDipartimento('');
              else props.selezionaDipartimento.setDipartimento(dip._id);
              props.setViewMenu(false);
            },
          };
        }
      )}
    />
  );
};

const FiltroButton = (props: ISelezionaDipartimento) => {
  const [viewMenu, setViewMenu] = useState<boolean>(false);

  const handleClick = () => {
    setViewMenu(!viewMenu);
  };

  return (
    <div
      className="max-h-5 place-content-center relative"
      // chiudo il menu se perde il focus
      tabIndex={0}
      onBlur={() => setViewMenu(false)}
    >
      <div onClick={handleClick}>
        <FiltroIcon />
      </div>
      {viewMenu && (
        <MenuFiltri selezionaDipartimento={props} setViewMenu={setViewMenu} />
      )}
    </div>
  );
};

export { FiltroButton };
