import { useState } from 'react';

import { AxiosError } from 'axios';

import { post } from '@/api/api';
import { useAuth } from '@/hooks/useAuth';
import EliminaIcon from '@/icons/EliminaIcon';
import SegnalaIcon from '@/icons/SegnalaIcon';
import VerificaIcon from '@/icons/VerificaIcon';
import IRecensione from '@/types/IRecensione';

import MenuOrizzontale from '../menu/MenuOrizzontale';

const RecensioneController = (
  props: IRecensione & { doReload: () => void }
) => {
  const { user } = useAuth();
  const [viewMenu, setViewMenu] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleClick = () => {
    setViewMenu(!viewMenu);
  };

  const handleVerifica = () => {
    post(
      `/recensione/${props._id}/risolvi`,
      {},
      {},
      {
        validateStatus: (status: number) => status < 400,
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      }
    )
      .then(() => {
        props.doReload();
      })
      .catch((err: AxiosError) => {
        const { status } = err.response || { status: 400 };
        if (status === 404) setError('La recensione non è stata trovata');
        else if (status === 401 || status === 403)
          setError('Non hai i permessi per risolvere la recensione');
        else setError('È stato riscontrato un errore');
      });
  };

  const handleElimina = () => {
    post(
      `/recensione/${props._id}/nascondi`,
      {},
      {},
      {
        validateStatus: (status: number) => status < 400,
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
      }
    )
      .then(() => {
        props.doReload();
      })
      .catch((err: AxiosError) => {
        const { status } = err.response || { status: 400 };
        if (status === 404) setError('La recensione non è stata trovata');
        else if (status === 401 || status === 403)
          setError('Non hai i permessi per risolvere la recensione');
        else setError('È stato riscontrato un errore');
      });
  };

  return (
    <div
      className="absolute top-7 right-7 fill-main-black hover:fill-main-primary hover:text-main-primary select-none"
      onClick={handleClick}
      // chiudo il menu se perde il focus
      tabIndex={1}
      onBlur={handleClick}
    >
      <div className="relative flex w-[170px] py-0.5 justify-between">
        <div className="flex space-x-1.5">
          <SegnalaIcon />
          <h6 className="font-friz-quadrata-tt uppercase">segnalazioni</h6>
        </div>
        <h6 className="font-friz-quadrata-tt uppercase">
          {'('}
          {props.segnalazioni}
          {')'}
        </h6>

        {viewMenu && (
          <MenuOrizzontale
            voci={[
              {
                label: 'verifica',
                colore: 'text-additional-success',
                icona: <VerificaIcon />,
                callback: handleVerifica,
              },
              {
                label: 'elimina',
                colore: 'text-main-primary',
                icona: <EliminaIcon />,
                callback: handleElimina,
              },
            ]}
          />
        )}

        {error.length > 0 && (
          <h6 className="absolute -top-10 -right-4 text-main-primary">
            {error}
          </h6>
        )}
      </div>
    </div>
  );
};

export default RecensioneController;
