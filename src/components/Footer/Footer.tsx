import { FC } from 'react';
import { Link } from 'react-router-dom';
import { scrollToTopDefault } from '../../helpers/ScrollToTop';
import { externalLinks } from '../../helpers/constants/externalLinks';
import { Container } from '../Container';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import './Footer.scss';

export const Footer: FC = () => (
  <footer className="Footer">
    <Container>
      <div className="Footer__content">
        <Logo type="footer" />

        <ul className="Footer__list">
          {externalLinks.map(({ id, name, link }) => (
            <li key={id} className="Footer__item">
              <Link className="Footer__link" to={link} target="_blank">
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <button className="Footer__button" onClick={scrollToTopDefault}>
          Back to top

          <span className="Footer__button-icon">
            <Icon size={32} type="arrow-up" />
          </span>
        </button>
      </div>
    </Container>
  </footer>
);
