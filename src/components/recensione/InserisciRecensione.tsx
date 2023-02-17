import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import defInstanceAPI from '@/api/api';
import { useAuth } from '@/hooks/useAuth';
import { ICategoriaValutazioneAttr } from '@/types/ICategoriaValutazione';
import ICorso from '@/types/ICorso';
import { IValutazioneAttr } from '@/types/IValutazione';

// eslint-disable-next-line import/no-cycle
import SezioneInserisciRecensione from './SezioneInserisciRecensione';

type IInserisciRecensioneProps = {
  corso: ICorso;
  categorieValutazione: {
    docente: Array<ICategoriaValutazioneAttr>;
    corso: Array<ICategoriaValutazioneAttr>;
  };
};

type IRecensioneDocenteContenuto = {
  nominativo: string;
  contenuto: string;
  valutazioni: Array<IValutazioneAttr>;
};

const InserisciRecensione = (props: IInserisciRecensioneProps) => {
  const { user } = useAuth();
  const [error, setError] = useState<string>('');
  const [valutazioniCorso, setValutazioniCorso] = useState<
    Array<IValutazioneAttr>
  >([]);
  const [contenutoCorso, setContenutoCorso] = useState<string>('');
  const [recensioniDocenti, setRecensioniDocenti] = useState<
    Map<string, IRecensioneDocenteContenuto>
  >(new Map<string, IRecensioneDocenteContenuto>());
  const [anonima, setAnonima] = useState<boolean>(false);

  useEffect(() => {
    setValutazioniCorso(
      props.categorieValutazione.corso.map((c) => ({ ...c, voto: 1 }))
    );

    setRecensioniDocenti(new Map<string, IRecensioneDocenteContenuto>());
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (user.isLogged && user.isStudente) {
      defInstanceAPI('/recensione', {
        validateStatus: (status) => status < 400,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
        data: {
          anonima,
          recensioneCorso: {
            contenuto: contenutoCorso,
            valutazioni: valutazioniCorso,
          },
          recensioneDocente: Array.from(recensioniDocenti).map(
            ([id_docente, { contenuto, valutazioni }]) => ({
              id_docente,
              contenuto,
              valutazioni,
            })
          ),
        },
      })
        .then((res) => {
          console.log('recensione aggiunta con successo,  con risposta: ', res);
        })
        .catch((e) => {
          const err = e as AxiosError;
          let status = -1;

          const { response } = err;
          if (typeof response !== 'undefined') {
            status = response.status;

            if (status === 400) {
              setError('Contenuto della recensione non valido');
            } else if (status === 401) {
              setError('Non sei autorizzato ad effettuare questa operazione');
            } else if (status === 403) {
              if (typeof response.data === 'string') setError(response.data);
              else
                setError(
                  'Corso già recensito o non disponibile nel tuo libretto'
                );
            }
          } else {
            setError('Errore sconosciuto');
          }
        });
    } else {
      setError(
        "Devi aver effettuato l'accesso come studente per poter inserire una recensione"
      );
    }
  };

  const handleCommentoChange = (event: any) => {
    setContenutoCorso(event?.target?.value);
  };

  const handleAnonimaChange = (event: any) => {
    setAnonima(event?.target?.checked);
  };

  return (
    <div className="flex flex-col space-y-2.5">
      <h3 className="spacing tracking-wide">
        <b>
          SCRIVI UNA RECENSIONE
          {error.length > 0 && (
            <i className="text-main-primary"> - Errore: {error}</i>
          )}
        </b>
      </h3>
      <div className="p-7 bg-main-white rounded-[20px] drop-shadow-default">
        <form onSubmit={handleSubmit}>
          <input
            type="textarea"
            className="w-full"
            placeholder="Scrivi qui la tua recensione"
            value={contenutoCorso}
            onChange={handleCommentoChange}
          />
          {valutazioniCorso.map((valutazione, index) => (
            <div className="flex flex-col" key={index}>
              <h6>
                {valutazione.categoria}: {valutazione.voto}
              </h6>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={valutazione.voto}
                onChange={(event: any) => {
                  const val = event?.target?.value;
                  const valCorso: IValutazioneAttr | undefined =
                    valutazioniCorso[index];
                  if (typeof valCorso === 'undefined') return;
                  setValutazioniCorso([
                    ...valutazioniCorso.slice(0, index),
                    { ...valCorso, voto: val },
                    ...valutazioniCorso.slice(index + 1),
                  ]);
                }}
              />
            </div>
          ))}
          <div className="flex w-full justify-around items-center">
            <div className="flex space-x-3">
              <label htmlFor="anonima">Recensione anonima</label>
              <input
                type="checkbox"
                checked={anonima}
                onChange={handleAnonimaChange}
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              <h2>INVIA</h2>
            </button>
          </div>
        </form>
      </div>

      {/* lista di pulsanti che permettono di iniziare a recensire un docente */}
      {props.corso.docenti
        .filter((docente) => !recensioniDocenti.has(docente.id)) // filtro i docenti che non hanno ancora una recensione
        .map((docente, index) => (
          <div
            key={index}
            onClick={() => {
              const newRecensioniDocenti = new Map<
                string,
                IRecensioneDocenteContenuto
              >(recensioniDocenti);
              newRecensioniDocenti.set(docente.id, {
                nominativo: `${docente.nome} ${docente.cognome}`,
                contenuto: '',
                valutazioni: [],
              });
              setRecensioniDocenti(newRecensioniDocenti);
            }}
          >
            {docente.nome} {docente.cognome}
          </div>
        ))}

      {/* recensioni sui docente */}
      {Array.from(recensioniDocenti).map(
        // trasformo la mappa in un array, per poterla trasformare
        // eslint-disable-next-line unused-imports/no-unused-vars
        ([id, { nominativo }], index) => (
          <SezioneInserisciRecensione
            key={index}
            categorieDocente={props.categorieValutazione.docente}
            nominativo={nominativo}
            setter={(
              IRDC: IRecensioneDocenteContenuto & { delete?: boolean }
            ) => {
              if (IRDC?.delete) {
                const newRecensioniDocenti = new Map<
                  string,
                  IRecensioneDocenteContenuto
                >(recensioniDocenti);
                newRecensioniDocenti.delete(id);
                setRecensioniDocenti(newRecensioniDocenti);
              } else {
                setRecensioniDocenti(
                  new Map<string, IRecensioneDocenteContenuto>([
                    ...Array.from(recensioniDocenti),
                    [id, IRDC],
                  ])
                );
              }
            }}
          />
        )
      )}
    </div>
  );
};

export default InserisciRecensione;
export { type IRecensioneDocenteContenuto };
