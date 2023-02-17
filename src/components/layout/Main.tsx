import { ReactNode } from 'react';

import { IVoceMenu } from '@/types/components/IMenu';

type IMainProps = {
  menuOptions?: Array<IVoceMenu>;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  return (
    <main className="flex flex-col mobile:gap-4 mobile:mx-lat lg:flex-row lg:relative">
      <aside>
        {props.menuOptions?.map(({ label, callback, icona, colore }, index) => (
          <h6 key={index} onClick={callback} className={colore}>
            {label}
            {icona}
          </h6>
        ))}
      </aside>
      <div className="w-full lg:mr-lat-dt min-h-screen">{props.children}</div>
      <style jsx>
        {`
          aside {
            @apply shrink-0 w-full lg:max-w-lat-dt lg:pr-7 flex lg:flex-col gap-3 mobile:justify-around lg:h-full lg:sticky lg:top-8;
          }

          aside * {
            @apply font-friz-quadrata-tt uppercase flex justify-end gap-1.5 md:gap-3 place-items-center select-none;
          }
        `}
      </style>
    </main>
  );
};

export { Main };
