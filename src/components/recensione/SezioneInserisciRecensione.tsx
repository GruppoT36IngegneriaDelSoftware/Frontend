import { useEffect, useState } from 'react';

import CloseIcon from '@/icons/CloseIcon';
import { ICategoriaValutazioneAttr } from '@/types/ICategoriaValutazione';
import { IValutazioneAttr } from '@/types/IValutazione';

// eslint-disable-next-line import/no-cycle
import { IRecensioneDocenteContenuto } from './InserisciRecensione';

type ISezioneInserisciRecensioneProps = {
  categorieDocente: Array<ICategoriaValutazioneAttr>;
  nominativo: string;
  setter: (
    recensione: IRecensioneDocenteContenuto & { delete?: boolean }
  ) => void;
};

const SezioneInserisciRecensione = (
  props: ISezioneInserisciRecensioneProps
) => {
  const [contenuto, setContenuto] = useState<string>('');
  const [valutazioni, setValutazioni] = useState<Array<IValutazioneAttr>>([]);

  const handleSubmit = (event?: any) => {
    if (event) event.preventDefault();
    props.setter({ contenuto, valutazioni, nominativo: props.nominativo });
  };

  useEffect(() => {
    setValutazioni(props.categorieDocente.map((c) => ({ ...c, voto: 1 })));
    handleSubmit();
  }, []);

  const handleDelete = () => {
    props.setter({
      delete: true,
      contenuto: '',
      valutazioni: [],
      nominativo: props.nominativo,
    });
  };

  const handleCommentoChange = (event: any) => {
    setContenuto(event?.target?.value);
    handleSubmit();
  };

  useEffect(() => {
    handleSubmit();
  }, [valutazioni]);

  return (
    <div className="p-7 bg-main-white rounded-[20px] drop-shadow-default relative">
      <div className="absolute top-0 left-7">{props.nominativo}</div>
      <div className="absolute top-3 right-3">
        <CloseIcon onClick={handleDelete} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="textarea"
          className="w-full"
          placeholder="Scrivi qui la tua recensione"
          value={contenuto}
          onChange={handleCommentoChange}
        />
        {valutazioni.map((valutazione, index) => (
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
                const valRecensione: IValutazioneAttr | undefined =
                  valutazioni[index];
                if (typeof valRecensione === 'undefined') return;
                setValutazioni([
                  ...valutazioni.slice(0, index),
                  { ...valRecensione, voto: val },
                  ...valutazioni.slice(index + 1),
                ]);
              }}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default SezioneInserisciRecensione;
