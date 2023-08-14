import { FC } from 'react';
import { capitalize } from '../../helpers/capitalize';
import { getValidFields } from '../../helpers/getValidFields';
import { ProductInfo } from '../../types/Product';
import './ProductAbout.scss';

interface Props {
  product: ProductInfo;
}

export const ProductAbout: FC<Props> = ({ product }) => (
  <div className="ProductAbout">
    <div className="ProductAbout__content">
      <div className="ProductAbout__about-info">
        <h2 className="ProductAbout__about-title">
          About
        </h2>

        <ul className="ProductAbout__about-list">
          {product.descriptions.map(({ title, text }) => (
            <li key={title} className="ProductAbout__about-item">
              <h3 className="ProductAbout__description-title">
                {title}
              </h3>

              <ul>
                {text.map((paragraph) => (
                  <li
                    key={paragraph}
                    className="ProductAbout__description-text"
                  >
                    {paragraph}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="ProductAbout__specs-info">
        <h2 className="ProductAbout__specs-title">
          Tech specs
        </h2>

        <ul className="ProductAbout__specs-list">
          {getValidFields(String(product.category)).map((key) => {
            const value = product[key];

            return (
              <li key={key} className="ProductAbout__specs-item">
                <h3 className="ProductAbout__tech-specs-title">
                  {capitalize(key)}:
                </h3>

                <span className="ProductAbout__tech-specs-text">
                  {Array.isArray(value)
                    ? value.join(', ')
                    : value}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>
);
