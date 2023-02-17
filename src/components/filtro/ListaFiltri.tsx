import { useRef } from 'react';

// https://www.npmjs.com/package/react-use-draggable-scroll
import { useDraggable } from 'react-use-draggable-scroll';

import { Filtro } from './Filtro';

type IListaFiltriProps = {
  filtri: Array<string>;
  handleRimuoviFiltro: (index: number) => void;
};

const ListaFiltri = (props: IListaFiltriProps): JSX.Element => {
  // We will use React useRef hook to reference the wrapping div:
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  return (
    <div
      className="flex w-full flex-nowrap overflow-x-scroll scrollbar-hide mt-5 gap-1.5"
      {...events}
      ref={ref}
    >
      {props.filtri.map((filtro, index) => (
        <Filtro
          key={index}
          value={filtro}
          handleRemove={() => {
            props.handleRimuoviFiltro(index);
          }}
        />
      ))}

      <style jsx>
        {`
          .scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
          }
        `}
      </style>
    </div>
  );
};

export { ListaFiltri };
