import { ReactNode } from 'react';

import INavbarProps from '@/types/components/INavbar';
import { AppConfig } from '@/utils/AppConfig';

import { Meta } from '../layout/Meta';
import { Hero } from '../navigation/Hero';
import { Footer } from './Footer';

type IBaseProps = {
  children: ReactNode;
  ricerca?: INavbarProps;
};

const Base = (props: IBaseProps) => {
  return (
    <div className="antialiased text-main-black place-content-center relative">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Hero {...props.ricerca} />
      <main className="flex flex-col flex-1 w-full">{props.children}</main>
      <Footer />
    </div>
  );
};

export { Base };
