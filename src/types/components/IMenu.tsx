import { ReactNode } from 'react';

type IVoceMenu = {
  label: string;
  callback: () => void;
  colore: string;
  icona: ReactNode;
};

type IMenu = {
  voci: Array<IVoceMenu>;
};

type IMenuVerticale = IMenu & {
  destra?: boolean;
};

export { type IVoceMenu, type IMenu, type IMenuVerticale };
