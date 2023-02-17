import { useEffect, useState } from 'react';

import AlfabeticoIcon from '@/icons/ordinamento/AlfabeticoIcon';
import CrescenteIcon from '@/icons/ordinamento/CrescenteIcon';
import DecrescenteIcon from '@/icons/ordinamento/DecrescenteIcon';
import StellaIcon from '@/icons/ordinamento/StellaIcon';
import { IOrdinamento } from '@/types/components/INavbar';

const sort = ['valutazione', 'alfabetico'];
const order = ['desc', 'asc'];

const OrdinamentoButton = (props: IOrdinamento) => {
  const [selectedSort, setSelectedSort] = useState(0);
  const [selectedOrd, setSelectedOrd] = useState(0);

  useEffect(() => {
    const selected = sort[selectedSort];
    props.tipo.setSortBy(
      typeof selected === 'string' ? selected : 'valutazione'
    );
  }, [selectedSort]);

  useEffect(() => {
    const selected = order[selectedOrd];
    props.senso.setOrderBy(typeof selected === 'string' ? selected : 'desc');
  }, [selectedOrd]);

  const handleSortClick = () => {
    setSelectedSort((selectedSort + 1) % sort.length);
  };

  const handleOrderClick = () => {
    setSelectedOrd((selectedOrd + 1) % order.length);
  };

  return (
    <div className="min-w-[100px] h-full bg-main-white rounded-full drop-shadow-default place-content-center flex gap-2.5">
      <div className="my-2 ml-1" onClick={handleSortClick}>
        {props.tipo.sortBy === 'valutazione' ? (
          <StellaIcon />
        ) : (
          <AlfabeticoIcon />
        )}
      </div>
      <div className="h-full bg-main-primary w-0.5" />
      <div className="my-2 mr-1" onClick={handleOrderClick}>
        {props.senso.orderBy === 'asc' ? (
          <CrescenteIcon />
        ) : (
          <DecrescenteIcon />
        )}
      </div>
    </div>
  );
};

export { OrdinamentoButton };
