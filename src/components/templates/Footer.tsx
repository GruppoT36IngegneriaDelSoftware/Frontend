import Link from 'next/link';

import { CenteredFooter } from '../footer/CenteredFooter';
import { Section } from '../layout/Section';
import { Logo } from './Logo';

const Footer = () => (
  <div className="bg-gray-100">
    <Section>
      <CenteredFooter logo={<Logo />}>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="https://github.com/GruppoT36IngegneriaDelSoftware/Deliverables">
            <a>Docs</a>
          </Link>
        </li>
        <li>
          <Link href="https://github.com/GruppoT36IngegneriaDelSoftware/">
            <a>GitHub</a>
          </Link>
        </li>
      </CenteredFooter>
    </Section>
  </div>
);

export { Footer };
