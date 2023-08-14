import { FC } from 'react';
import { Link } from 'react-router-dom';
import { categoriesData } from '../../helpers/constants/categoriesData';
import './Categories.scss';

interface Props {
  totals: number[];
}

export const Categories: FC<Props> = ({ totals }) => (
  <section className="Categories">
    <h2 className="Categories__title">
      Shop by category
    </h2>

    <ul className="Categories__list">
      {categoriesData.map((category) => (
        <li key={category.id} className="Categories__item">
          <Link className="Categories__link" to={category.linkTo}>
            <img
              className={`
                Categories__image
                Categories__image--${category.alt.toLowerCase()}
              `}
              src={category.imageSrc}
              alt={category.alt}
            />
          </Link>

          <Link
            className="Categories__category-name"
            to={category.linkTo}
          >
            {category.productName}
          </Link>

          <p className="Categories__info">
            {totals[category.id - 1] || 0} total
          </p>
        </li>
      ))}
    </ul>
  </section>
);
