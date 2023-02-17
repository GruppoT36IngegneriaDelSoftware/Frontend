import { IMenu } from '@/types/components/IMenu';

const MenuOrizzontale = (props: IMenu) => {
  return (
    <div
      className={
        `absolute top-[150%] right-0 z-10 ` +
        `font-friz-quadrata-tt uppercase bg-main-white text-main-black ` +
        `shadow-[0_0_10px_rgba(177,11,37,0.75)] rounded-[15px] ` +
        `min-w-[640px] mobile:w-[65vw] lg:w-[30vw] px-5 pb-2 ` +
        `grid grid-cols-1 gap-y-2 divide-y-[2px] divide-main-black ` +
        `justify-items-start`
      }
    >
      {props.voci.map(({ label, colore, icona, callback }, index) => (
        <div
          key={index}
          className={`w-full pt-2 ${colore} flex space-x-1.5 justify-start`}
          onClick={callback}
        >
          {icona}
          <div className={`whitespace-nowrap text-sm text-ellipsis leading-6`}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuOrizzontale;
