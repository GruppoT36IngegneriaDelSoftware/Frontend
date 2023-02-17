import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import defInstanceAPI from '@/api/api';
import { AuthContext } from '@/auth/AuthContext';
import ErrorPage from '@/components/display/ErrorPage';
import ModsPage from '@/components/display/ModsPage';
import { Main } from '@/components/layout/Main';
import { Recensione } from '@/components/recensione/Recensione';
import { Base } from '@/components/templates/Base';
import { useAuth } from '@/hooks/useAuth';
import ModsIcons from '@/icons/ModsIcon';
import SegnalaIcon from '@/icons/SegnalaIcon';
import { IVoceMenu } from '@/types/components/IMenu';
import IRecensione from '@/types/IRecensione';

const titoloSezione = ['mods.', 'segnal.'];

type IPannelloControlloProps = {
  startingSezione?: number;
};

const PannelloControllo = (props: IPannelloControlloProps) => {
  const { user, logout } = useAuth();
  const [segnalate, setSegnalate] = useState<Array<IRecensione>>([]);
  const [reload, doReload] = useState<boolean>(false);

  const [menuOptions, setMenuOptions] = useState<Array<IVoceMenu>>([]);
  const [selectedSezione, setSelectedSezione] = useState<number>(1);

  const aggiornaMenu = () => {
    setMenuOptions(
      titoloSezione.map((sezione, index) => ({
        label: sezione,
        colore:
          selectedSezione === index
            ? 'text-additional-success fill-additional-success'
            : 'text-main-black fill-main-black',
        icona: sezione === 'mods.' ? <ModsIcons /> : <SegnalaIcon />,
        callback: () => {
          setSelectedSezione(index);
        },
      }))
    );
  };

  const init = () => {
    aggiornaMenu();
    if (user.isLogged && user.isStaff) {
      defInstanceAPI
        .get('/recensione', {
          validateStatus: (status) => status < 400,
          headers: {
            Authorization: `Bearer ${user.authToken}`,
            'Event-Type': 'segnalate',
          },
        })
        .then((res) => {
          setSegnalate(res.data);
        })
        .catch((err: AxiosError) => {
          const { status } = err.response || { status: 400 };
          if (status === 401 || status === 403) if (user.isStaff) logout();
        });
    }
  };

  useEffect(() => {
    if (reload) doReload(false);
    else init();
  }, [reload]);

  useEffect(init, [user]);

  useEffect(() => {
    aggiornaMenu();
  }, [selectedSezione]);

  useEffect(() => {
    if (typeof props.startingSezione !== 'undefined')
      setSelectedSezione(props.startingSezione);
  }, [props]);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Base>
          <Main
            menuOptions={
              auth.user.isLogged && auth.user.isStaff && auth.user.isAdmin
                ? menuOptions
                : []
            }
          >
            {/* eslint-disable-next-line no-nested-ternary */}
            {auth.user.isLogged && auth.user.isStaff ? (
              // eslint-disable-next-line no-nested-ternary
              selectedSezione === 1 ? (
                segnalate.length > 0 ? (
                  <div className="flex flex-col gap-8">
                    {segnalate.map((recensione) => (
                      <Recensione
                        {...recensione}
                        doReload={() => doReload(true)}
                        key={recensione._id}
                      />
                    ))}
                  </div>
                ) : (
                  <ErrorPage message="Non ci sono recensioni segnalate" />
                )
              ) : (
                <ModsPage />
              )
            ) : (
              <ErrorPage message="Non disponi dei permessi necessari per accedere a questa pagina" />
            )}
          </Main>
        </Base>
      )}
    </AuthContext.Consumer>
  );
};

export default PannelloControllo;
