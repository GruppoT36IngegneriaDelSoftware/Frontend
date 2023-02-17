import React, { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import defInstanceAPI from '@/api/api';
import { useAuth } from '@/hooks/useAuth';
import EliminaIcon from '@/icons/EliminaIcon';
import OptionsIcon from '@/icons/OptionsIcon';
import StaffLogIcon from '@/icons/StaffLogIcon';
import IModeratore from '@/types/IModeratore';

import MenuOrizzontale from '../menu/MenuOrizzontale';
import ChangePopup from './ChangePopup';
import ErrorPage from './ErrorPage';
import SettingsButton from './SettingsButton';

type IMenuOpzioniProps = {
  member: IModeratore;
  viewPopup: boolean;
  setViewPopup: (view: boolean) => void;
  index: number;
};

const MenuOpzioni = (props: IMenuOpzioniProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <>
      <MenuOrizzontale
        voci={[
          {
            label: 'modifica',
            colore: 'text-additional-information fill-additional-information',
            icona: <StaffLogIcon />,
            callback: () => {
              props.setViewPopup(true);
            },
          },
          {
            label: 'elimina',
            colore: 'text-main-primary fill-main-primary',
            icona: <EliminaIcon />,
            callback: () => {
              defInstanceAPI(`/moderatore/${props.member._id}/`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${user.authToken}`,
                },
                validateStatus: (status) => status < 400,
              })
                .then((r) => {
                  const { status } = r;
                  if (status === 200) {
                    router.reload();
                  }
                })
                .catch((err: any) => {
                  if (err.response) {
                    const { status } = err.response;
                    if (status === 401) {
                      logout();
                    }
                  }
                });
            },
          },
        ]}
      />
      {props.viewPopup && (
        <ChangePopup
          member={{ ...props.member }}
          setViewPopup={props.setViewPopup}
          index={props.index}
        />
      )}
    </>
  );
};

type IOptionsButtonProps = {
  member: IModeratore;
  index: number;
};

const OptionsButton = (props: IOptionsButtonProps) => {
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
      className="max-h-5 place-content-center relative"
      // chiudo il menu se perde il focus
      tabIndex={props.index}
      onBlur={handleClick}
    >
      <div onClick={handleClick}>
        <OptionsIcon />
      </div>
      {viewMenu && (
        <MenuOpzioni
          member={{ ...props.member }}
          setViewPopup={setViewPopup}
          viewPopup={viewPopup}
          index={props.index + 1}
        />
      )}
    </div>
  );
};

const ModsPage = () => {
  const { user, logout } = useAuth();
  const [staff, setStaff] = useState<Array<IModeratore>>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (user.isLogged && user.isAdmin) {
      defInstanceAPI
        .get('/moderatore', {
          validateStatus: (status) => status < 400,
          headers: {
            Authorization: `Bearer ${user.authToken}`,
          },
        })
        .then((res) => res.data)
        .then((data: Array<IModeratore>) => {
          setStaff(data);
        })
        .catch((err: AxiosError) => {
          const { status } = err.response || { status: 400 };
          if (
            typeof status !== 'undefined' &&
            (status === 401 || status === 403)
          )
            setError('Non hai i permessi per accedere a questi dati');
          if (status === 401) logout();
          else
            setError(
              'Si è verificato un errore durante il caricamento dei moderatori'
            );
        });
    } else {
      logout();
    }
  }, [user]);

  return (
    <>
      {error.length > 0 ? (
        <ErrorPage message={error} />
      ) : (
        <div className="griglia">
          <h3 className="font-friz-quadrata-tt uppercase">identificatore</h3>
          <h3 className="font-friz-quadrata-tt uppercase text-additional-success">
            nome utente
          </h3>
          <SettingsButton />
          {staff.map((member, index) => {
            return (
              <React.Fragment key={10 * index + 1}>
                <h5 key={10 * index + 2}>{`${member._id}`}</h5>
                <h5 key={10 * index + 3}>{`${member.nome_utente}`}</h5>
                <div key={10 * index + 4} className="mr-[8px]">
                  <OptionsButton
                    member={{ ...member }}
                    index={10 * index + 5}
                  />
                </div>
              </React.Fragment>
            );
          })}
          <style jsx>
            {`
              .griglia {
                @apply grid grid-cols-7 gap-4 w-full;
              }

              .griglia > *:nth-child(3n + 1),
              .griglia > *:nth-child(3n + 2) {
                @apply col-span-3;
              }

              .griglia > *:nth-child(3n + 3) {
                @apply col-span-1 flex justify-end;
              }
            `}
          </style>
        </div>
      )}
    </>
  );
};

export default ModsPage;
