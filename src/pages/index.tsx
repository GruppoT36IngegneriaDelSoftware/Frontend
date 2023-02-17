import { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';

import { api, get, getOverPost } from '@/api/api';
import { AuthContext } from '@/auth/AuthContext';
import { CorsoCard } from '@/components/corso/CorsoCard';
import { Main } from '@/components/layout/Main';
import { Base } from '@/components/templates/Base';
import { useAuth } from '@/hooks/useAuth';
import LibrettoIcon from '@/icons/LibrettoIcon';
import ListAllIcon from '@/icons/ListAllIcon';
import { IVoceMenu } from '@/types/components/IMenu';
import ICorso from '@/types/ICorso';
import IDipartimento from '@/types/IDipartimento';

type IIndexProps = {
  corsi: Array<ICorso>;
  dipartimenti: Array<IDipartimento>;
};

const tipoRicerca: Array<string> = ['tutti', 'libretto'];

const Index = (props: IIndexProps) => {
  const { user } = useAuth();
  const [corsi, setCorsi] = useState<Array<ICorso>>(props.corsi);
  const [start, setStart] = useState<number>(0);
  const [count, setCount] = useState<number>(20);
  const [selectedTipo, setSelectedTipo] = useState<number>(0);

  // parametri di ricerca
  const [dipartimento, setDipartimento] = useState<string>('');
  const [filtri, setFiltri] = useState<Array<string>>([]);
  const [sortBy, setSortBy] = useState<string>('valutazione');
  const [orderBy, setOrderBy] = useState<string>('desc');

  const [inRicerca, setInRicerca] = useState<boolean>(false);

  const [menuOptions, setMenuOptions] = useState<Array<IVoceMenu>>([]);

  const aggiornaCorsi = (_start: number, _count: number) => {
    let pr: Promise<Array<ICorso>>;

    let commInfo = {};
    if (tipoRicerca[selectedTipo] === 'libretto') {
      commInfo = {
        headers: {
          'Event-Type': 'libretto',
          Authorization: `Bearer ${user.authToken}`,
        },
      };
    }

    // assegno la Promise
    if (filtri.length === 0 && dipartimento.length === 0) {
      pr = get<Array<ICorso>>(
        '/corso',
        { start: _start, count: _count, sortBy, orderBy },
        commInfo
      );
    } else {
      let options = {};
      if (filtri.length > 0) options = { filtri };
      if (dipartimento.length > 0) options = { dipartimento, ...options };
      pr = getOverPost<Array<ICorso>>(
        '/corso',
        { start: _start, count: _count, sortBy, orderBy },
        options,
        commInfo
      );
    }

    setInRicerca(true);

    // e la soddisfo
    pr.then((res: Array<ICorso>) => {
      if (_start === 0) setCorsi(res);
      else setCorsi([...corsi, ...res]);

      setInRicerca(false);
    });
  };

  const handleAggiungiCorsi = () => {
    aggiornaCorsi(start, count);
  };

  const renewCorsi = () => {
    setStart(0);
    setCount(20);
    aggiornaCorsi(0, 20);
  };

  const aggiornaMenu = () => {
    setMenuOptions(
      tipoRicerca.map((tipo, index) => ({
        label: tipo,
        colore:
          selectedTipo === index
            ? 'text-additional-success fill-additional-success'
            : 'text-main-black fill-main-black',
        icona: tipo === 'tutti' ? <ListAllIcon /> : <LibrettoIcon />,
        callback: () => {
          setSelectedTipo(index);
        },
      }))
    );
  };

  useEffect(() => {
    aggiornaMenu();
  }, []);

  useEffect(() => {
    if (!user.isLogged && selectedTipo !== 0) {
      setSelectedTipo(0);
    }
  }, [user]);

  useEffect(() => {
    renewCorsi();
    aggiornaMenu();
  }, [selectedTipo]);
  useEffect(renewCorsi, [filtri]);
  useEffect(renewCorsi, [dipartimento]);
  useEffect(renewCorsi, [sortBy]);
  useEffect(renewCorsi, [orderBy]);

  useEffect(() => {
    if (count !== 10) {
      setCount(10);
    }
    setStart(corsi.length);
  }, [corsi]);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Base
          ricerca={{
            filtraggio: { filtri, setFiltri },
            selezioneDipartimento: {
              dipartimenti: props.dipartimenti,
              dipartimento,
              setDipartimento,
            },
            ordinamento: {
              senso: { orderBy, setOrderBy },
              tipo: { sortBy, setSortBy },
            },
            inRicerca,
          }}
        >
          <Main
            menuOptions={
              auth.user.isLogged && auth.user.isStudente ? menuOptions : []
            }
          >
            <div className="flex flex-col gap-8">
              {corsi.map((corso) => (
                <CorsoCard {...corso} key={corso._id} />
              ))}

              {!inRicerca && (
                <button
                  onClick={handleAggiungiCorsi}
                  className="p-4 bg-additional-information rounded-2xl drop-shadow-default text-main-white font-bold"
                >
                  <h4>carica altri corsi</h4>
                </button>
              )}
            </div>
          </Main>
        </Base>
      )}
    </AuthContext.Consumer>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const start = 0;
  const count = 20;

  const corsi: Array<ICorso> = await api('/corso', { start, count }, {});
  const dipartimenti: Array<IDipartimento> = await api('/dipartimento', {}, {});

  return {
    props: {
      corsi,
      dipartimenti,
    }, // will be passed to the page component as props
  };
};

export default Index;
