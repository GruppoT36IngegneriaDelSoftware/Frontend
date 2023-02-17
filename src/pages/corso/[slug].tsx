import { ParsedUrlQuery } from 'querystring';

import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';

import defInstanceAPI from '@/api/api';
import { AuthContext } from '@/auth/AuthContext';
import { CorsoCard } from '@/components/corso/CorsoCard';
import ErrorPage from '@/components/display/ErrorPage';
import { Main } from '@/components/layout/Main';
import InserisciRecensione from '@/components/recensione/InserisciRecensione';
import { Recensione } from '@/components/recensione/Recensione';
import { Base } from '@/components/templates/Base';
import { ICategoriaValutazioneAttr } from '@/types/ICategoriaValutazione';
import ICorso from '@/types/ICorso';
import IRecensione from '@/types/IRecensione';

type IPaginaCorsoProps = {
  corso?: ICorso;
  recensioni?: Array<IRecensione>;
  error?: {
    status?: number;
    message: string;
  };
  categorieValutazione: {
    docente: Array<ICategoriaValutazioneAttr>;
    corso: Array<ICategoriaValutazioneAttr>;
  };
};

const PaginaCorso = (props: IPaginaCorsoProps) => {
  if (
    typeof props.corso === 'undefined' &&
    typeof props.recensioni === 'undefined'
  )
    return (
      <Base>
        <Main>
          <ErrorPage {...props.error} />
        </Main>
      </Base>
    );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [recensioni, setRecensioni] = useState<Array<IRecensione>>([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (
      typeof props.corso !== 'undefined' &&
      typeof props.recensioni !== 'undefined'
    ) {
      let rec: Array<IRecensione> = [
        {
          _id: '1',
          nominativo: 'Marco R.',
          anonima: false,
          segnalazioni: 10,
          recensioneCorso: {
            id_corso: 'e860d082-5349-40e2-bbcc-89ea565d74e0',
            contenuto: 'questo corso è vereamente carino, complimenti',
            valutazioni: [
              { categoria: 'didattica', voto: 5 },
              { categoria: 'interazione', voto: 5 },
            ],
          },
          recensioniDocenti: [
            {
              id_docente: '6858f51a44e182b341604e90ba917071',
              contenuto: 'questo corso è vereamente carino, complimenti',
              valutazioni: [
                { categoria: 'didattica', voto: 5 },
                { categoria: 'interazione', voto: 5 },
              ],
            },
            {
              id_docente: '6858f51a44e182b341604e90ba917071',
              contenuto: 'questo corso è vereamente carino, complimenti',
              valutazioni: [
                { categoria: 'didattica', voto: 5 },
                { categoria: 'interazione', voto: 5 },
              ],
            },
          ],
        },
      ];

      if (props.recensioni) rec = props.recensioni;

      rec = rec.map((r) => {
        const tmpR = { ...r };

        tmpR.recensioniDocenti = tmpR.recensioniDocenti.map((rd) => {
          let doc = { nome: 'Doc.', cognome: 'Sconosciuto' };
          if (typeof props.corso !== 'undefined')
            doc =
              props?.corso.docenti.find((d) => d.id === rd.id_docente) || doc;
          return { ...rd, id_docente: `${doc.nome} ${doc.cognome}` };
        });

        return tmpR;
      });

      setRecensioni(rec);
    }
  }, [props.corso]);

  return (
    <AuthContext.Consumer>
      {({ user }) => (
        <Base>
          <Main>
            <div className="flex flex-col gap-8">
              {typeof props.corso !== 'undefined' && (
                <CorsoCard {...props.corso} />
              )}

              {recensioni.map((recensione) => (
                <Recensione {...recensione} key={recensione._id} />
              ))}

              {user.isLogged && user.isStudente && (
                <InserisciRecensione
                  corso={
                    props.corso || {
                      _id: '',
                      nome: '',
                      descrizione: '',
                      corsoStudi: '',
                      sitoWeb: '',
                      dipartimento: [],
                      docenti: [],
                      avgValutazioni: [],
                    }
                  }
                  categorieValutazione={props.categorieValutazione}
                />
              )}
            </div>
          </Main>
        </Base>
      )}
    </AuthContext.Consumer>
  );
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as IParams;
  const categorieValutazione: {
    docente: Array<ICategoriaValutazioneAttr>;
    corso: Array<ICategoriaValutazioneAttr>;
  } = {
    docente: [],
    corso: [],
  };

  try {
    await defInstanceAPI('/categoriaValutazione/corso', {})
      .then((res) => res.data)
      .then((categorie) => {
        categorieValutazione.corso = categorie.map(
          ({ nome }: { nome: string }) => ({
            categoria: nome,
          })
        );
      });
    // eslint-disable-next-line no-empty
  } catch (err) {}

  try {
    await defInstanceAPI('/categoriaValutazione/docente', {})
      .then((res) => res.data)
      .then((categorie) => {
        categorieValutazione.docente = categorie.map(
          ({ nome }: { nome: string }) => ({
            categoria: nome,
          })
        );
      });
    // eslint-disable-next-line no-empty
  } catch (err) {}

  try {
    const corso = await defInstanceAPI(`/corso/${slug}`, {
      validateStatus: (status: number) => status < 400,
    }).then((res) => res.data);

    const recensioni = await defInstanceAPI('/recensione', {
      params: { idCorso: slug },
      validateStatus: (status: number) => status < 400,
    }).then((res) => res.data);

    return {
      props: {
        corso,
        recensioni,
        categorieValutazione,
      },
    };
  } catch (err) {
    const error = err as AxiosError;
    let status = 400;
    let message = 'ricaricare la pagina';

    const { response } = error;
    if (typeof response !== 'undefined') {
      status = response.status;
    }

    if (status === 404) message = 'corso non trovato';

    return {
      props: {
        error: { status, message },
        categorieValutazione,
      },
    };
  }
};

export default PaginaCorso;
