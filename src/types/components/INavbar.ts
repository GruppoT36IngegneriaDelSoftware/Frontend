import IDipartimento from '../IDipartimento';

type IFiltraggio = {
  filtri: Array<string>;
  setFiltri: (filtri: Array<string>) => void;
};

type ISelezionaDipartimento = {
  dipartimenti: Array<IDipartimento>;
  dipartimento: string;
  setDipartimento: (dipartimento: string) => void;
};

type IOrdinamento = {
  senso: {
    orderBy: string;
    setOrderBy: (orderBy: string) => void;
  };
  tipo: {
    sortBy: string;
    setSortBy: (sortBy: string) => void;
  };
};

type INavbarProps = {
  ordinamento?: IOrdinamento;
  filtraggio?: IFiltraggio;
  selezioneDipartimento?: ISelezionaDipartimento;
  inRicerca?: boolean;
};

export default INavbarProps;
export { type IFiltraggio, type ISelezionaDipartimento, type IOrdinamento };
