import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ScrollToTop } from '../../helpers/ScrollToTop';
import { Container } from '../Container';
import { Footer } from '../Footer';
import { Header } from '../Header';

export const Layout: FC = () => (
  <>
    <ScrollToTop />
    <Header />

    <main>
      <Container>
        <Outlet />
      </Container>
    </main>

    <Footer />
  </>
);
