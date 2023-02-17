import INavbarProps from '@/types/components/INavbar';

import { Navbar } from './Navbar';

const Hero = (props: INavbarProps | null) => {
  return (
    <div className="bg-main-primary text-main-white mb-9">
      <Navbar {...props} />
    </div>
  );
};

export { Hero };
