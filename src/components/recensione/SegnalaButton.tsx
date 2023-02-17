import { useState } from 'react';

import { post } from '@/api/api';
import SegnalaIcon from '@/icons/SegnalaIcon';
import IRecensione from '@/types/IRecensione';

const SegnalaButton = (props: IRecensione) => {
  const [segnalata, setSegnalata] = useState<boolean>(false);
  const effettuaSegnalazione = (id_recensione: string) => {
    post(
      `/recensione/${id_recensione}/segnala`,
      {},
      {},
      { validateStatus: (status: number) => status < 400 }
    )
      .then(() => {
        setSegnalata(true);
      })
      .catch(() => {
        console.log('Errore duruante la segnalazione');
      });
  };

  const handleClick = () => {
    if (!segnalata) effettuaSegnalazione(props._id);
  };
  return (
    <div
      className={`absolute top-7 right-7 ${
        segnalata
          ? 'fill-additional-success'
          : 'fill-main-black hover:fill-main-primary'
      }`}
      onClick={handleClick}
    >
      <SegnalaIcon />
    </div>
  );
};

export default SegnalaButton;
