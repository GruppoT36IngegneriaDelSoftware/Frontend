import Link from 'next/link';

import { Score } from '@/components//display/Score';
import ICorso from '@/types/ICorso';

const CorsoCard = (props: ICorso) => {
  const average: number =
    props.avgValutazioni.length === 0
      ? 0
      : props.avgValutazioni.reduce((acc, act) => acc + act.voto, 0) /
        props.avgValutazioni.length;

  return (
    <div className="flex flex-col md:flex-row p-[30px] justify-between gap-[50px] bg-main-white drop-shadow-default rounded-[20px]">
      <div className="flex gap-[50px]">
        <Score value={average} xl />
        <div className="flex flex-col gap-2.5">
          <Link href={`/corso/${props._id}`}>
            <a>
              <h2 className="text-main-primary uppercase">{props.nome}</h2>
            </a>
          </Link>
          <h4 className="text-xl text-additional-strong-grey">
            <b>
              <i>{props.dipartimento[0]?.nome}</i>
            </b>
          </h4>
          {props.docenti.length > 0 && (
            <h4>
              {props.docenti.reduce(
                (acc, docente) =>
                  acc.length > 0
                    ? `${acc}, ${docente.nome} ${docente.cognome}`
                    : `${docente.nome} ${docente.cognome}`,
                ''
              )}
            </h4>
          )}
          <p className="truncate text-ellipsis max-w-prose">
            {props.descrizione}
          </p>
        </div>
      </div>
      <div className="flex phone:w-full phone:justify-around md:gap-[50px]">
        {props.avgValutazioni.map(({ categoria, voto }, index) => (
          <div className="flex flex-col space-y-1 items-center" key={index}>
            <h3>{categoria}</h3>
            <Score value={voto} />
          </div>
        ))}
      </div>
    </div>
  );
};

export { CorsoCard };
