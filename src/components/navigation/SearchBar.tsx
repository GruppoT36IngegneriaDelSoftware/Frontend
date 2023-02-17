import { useState } from 'react';

import { SearchIcon } from './SearchIcon';

type ISearchBarProps = {
  addFiltroHandler: (filtro: string) => void;
};

const SearchBar = (props: ISearchBarProps) => {
  const [filtro, setFiltro] = useState<string>('');

  const handleChange = (event: any) => {
    setFiltro(event?.target?.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const filtroTrimmed = filtro.trim();

    if (filtroTrimmed.length > 0) {
      props.addFiltroHandler(filtro.trim());
      setFiltro('');
    } else if (filtro.length !== filtroTrimmed.length) {
      setFiltro('');
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Inserisci dei filtri"
        value={filtro}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        <SearchIcon />
      </button>
      <style jsx>
        {`
          .search-bar {
            @apply flex w-full min-h-full bg-main-white text-main-black drop-shadow-default rounded-md px-3 justify-between;
          }

          .search-bar input {
            @apply w-full;
            opacity: 0.7 !important;
          }

          .search-bar input::placeholder {
            opacity: 100%;
          }
        `}
      </style>
    </form>
  );
};

export { SearchBar };
