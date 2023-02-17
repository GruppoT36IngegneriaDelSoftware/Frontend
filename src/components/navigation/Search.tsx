import { FiltroButton } from '@/components/filtraggio/FiltroButton';
import { ListaFiltri } from '@/components/filtro/ListaFiltri';
import {
  IFiltraggio,
  ISelezionaDipartimento,
  IOrdinamento,
} from '@/types/components/INavbar';

import { OrdinamentoButton } from '../ordinamento/OrdinamentoButton';
import { SearchBar } from './SearchBar';

type ISearchProps = {
  ordinamento: IOrdinamento;
  filtraggio: IFiltraggio;
  selezioneDipartimento: ISelezionaDipartimento;
};

const Search = (props: ISearchProps) => {
  const handleAddFiltro = (filtro: string) => {
    props.filtraggio.setFiltri([...props.filtraggio.filtri, filtro]);
  };

  const handleRimuoviFiltro = (index: number) => {
    props.filtraggio.filtri.splice(index, 1);
    props.filtraggio.setFiltri([...props.filtraggio.filtri]);
  };

  return (
    <div className="w-full max-w-full mr-12 lg:mr-24 font-helvetica-condensed">
      <div className="h-full gap-3 place-items-center flex">
        <SearchBar addFiltroHandler={handleAddFiltro} />
        <FiltroButton {...props.selezioneDipartimento} />
        <OrdinamentoButton {...props.ordinamento} />
      </div>
      <ListaFiltri
        filtri={props.filtraggio.filtri}
        handleRimuoviFiltro={handleRimuoviFiltro}
      />
    </div>
  );
};

export { Search };
