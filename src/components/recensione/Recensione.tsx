import { AuthContext } from '@/auth/AuthContext';
import IRecensione from '@/types/IRecensione';

import { ContenutoRecensione } from './ContenutoRecensione';
import RecensioneController from './RecensioneController';
import SegnalaButton from './SegnalaButton';

const Recensione = (props: IRecensione & { doReload?: () => void }) => {
  return (
    <div className="flex flex-col gap-[10px] bg-main-white p-[30px] drop-shadow-default rounded-[20px] relative">
      <h3>
        <b>{props.nominativo}</b>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-x-[2px] divide-y-[2px] divide-main-black">
        {props.recensioneCorso && (
          <ContenutoRecensione
            titolo={'Corso'}
            contenuto={props.recensioneCorso.contenuto}
            valutazioni={props.recensioneCorso.valutazioni}
            style={props.recensioniDocenti.length === 0 ? 'md:col-span-2' : ''}
          />
        )}
        {props.recensioniDocenti.map((recensione, index) => (
          <ContenutoRecensione
            key={index}
            titolo={recensione.id_docente}
            contenuto={recensione.contenuto}
            valutazioni={recensione.valutazioni}
            isDocente
            style={
              index + 1 === props.recensioniDocenti.length &&
              index % 2 === (props.recensioneCorso ? 1 : 0)
                ? 'md:col-span-2'
                : ''
            }
          />
        ))}
      </div>
      <AuthContext.Consumer>
        {({ user }) => (
          <>
            {user.isLogged && user.isAdmin ? (
              <RecensioneController
                {...props}
                doReload={props.doReload || (() => {})}
              />
            ) : (
              <SegnalaButton {...props} />
            )}
          </>
        )}
      </AuthContext.Consumer>
    </div>
  );
};

export { Recensione };
