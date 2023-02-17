import { Logo } from '@/components/templates/Logo';
import INavbarProps from '@/types/components/INavbar';

import { LogButton } from '../login/LogButton';
import { Search } from './Search';

const Navbar = (props: INavbarProps) => (
  <div className="navbar">
    <div>
      <Logo xl />
    </div>
    <div className={props.inRicerca ? 'pointer-events-none' : ''}>
      {props.ordinamento && props.filtraggio && props.selezioneDipartimento && (
        <Search
          ordinamento={props.ordinamento}
          filtraggio={props.filtraggio}
          selezioneDipartimento={props.selezioneDipartimento}
        />
      )}
      <LogButton />
    </div>

    <style jsx>
      {`
        .navbar {
          @apply flex phone:flex-col phone:place-items-center md:align-middle mx-lat lg:mx-lat-dt py-3 h-[120px] md:h-[60px] md:justify-between phone:space-y-3;
        }

        .navbar > *:nth-child(1) {
          @apply md:mr-12 lg:mr-24;
        }

        .navbar > *:nth-child(2) {
          @apply w-full h-[36px] flex justify-end;
        }
      `}
    </style>
  </div>
);
export { Navbar };
