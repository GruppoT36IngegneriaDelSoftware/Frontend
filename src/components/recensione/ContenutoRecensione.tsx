import { IValutazioneAttr } from '@/types/IValutazione';

type IContenutoRecensioneProps = {
  titolo: string;
  contenuto: string;
  valutazioni: Array<IValutazioneAttr>;
  style?: string;
  isDocente?: boolean;
};

const ContenutoRecensione = (props: IContenutoRecensioneProps) => {
  return (
    <div className={`flex flex-col h-max w-full ${props.style || ''}`}>
      {/* Testo della recensione */}
      <div className="flex flex-col gap-0.5">
        <h4>
          <b>
            {props.isDocente ? (
              <>
                Corso <i>{props.titolo}</i>
              </>
            ) : (
              <>{props.titolo}</>
            )}
          </b>
        </h4>
        <p>{props.contenuto}</p>
      </div>
      {/* Testo della recensione */}
      <div className="flex justify-around">
        {props.valutazioni.map(({ categoria, voto }, index) => (
          <div className="flex flex-col gap-0.5 items-center" key={index}>
            <h3>{categoria}</h3>
            <h4>{voto}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ContenutoRecensione };
