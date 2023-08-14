import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import { useErrorContext } from '../../contexts/ErrorContext/useErrorContext';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { getClassName } from '../../helpers/getClassName';
import { getSlidesPerView } from '../../helpers/getSliderPerView';
import { Product } from '../../types/Product';
import { Icon } from '../Icon';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard/ProductCard';
import './Recommendations.scss';

interface Props {
  title: string;
  products: Product[];
}

export const Recommendations: FC<Props> = ({ title, products }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(
    getSlidesPerView(window.innerWidth),
  );

  const { isLoaded } = useProductsContext();
  const { error } = useErrorContext();

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSwiperChange = (swiper: Swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const shouldShowError = Boolean(error);
  const shouldShowLoader = !error && !isLoaded;

  const leftButtonIcon = isBeginning
    ? 'arrow-left-disabled'
    : 'arrow-left';

  const rightButtonIcon = isEnd
    ? 'arrow-right-disabled'
    : 'arrow-right';

  const normalizedClassName = getClassName(title);

  const hasProducts = products.length > 0;

  return (
    <div className="Recommendations">
      <div className="Recommendations__heading">
        <h2 className="Recommendations__title">
          {title}
        </h2>

        {hasProducts && (
          <div className="Recommendations__controllers">
            <button
              className={classNames(`
              Recommendations__button
              prev__${normalizedClassName}`, {
                'Recommendations__button--disabled': isBeginning,
              })}
            >
              <Icon size={32} type={leftButtonIcon} />
            </button>

            <button
              className={classNames(`
              Recommendations__button
              next__${normalizedClassName}`, {
                'Recommendations__button--disabled': isEnd,
              })}
            >
              <Icon size={32} type={rightButtonIcon} />
            </button>
          </div>
        )}
      </div>

      {shouldShowLoader && (
        <span className="Recommendations__loader">
          <Loader size={50} />
        </span>
      )}

      {shouldShowError && (
        <h3 className="Recommendations__error-message">
            Something went wrong!
        </h3>
      )}

      {hasProducts && (
        <div className="Recommendations__slider">
          <ReactSwiper
            slidesPerView={slidesPerView}
            spaceBetween={16}
            loop={false}
            navigation={{
              prevEl: `.prev__${normalizedClassName}`,
              nextEl: `.next__${normalizedClassName}`,
            }}
            modules={[Pagination, Navigation]}
            onSlideChange={handleSwiperChange}
          >
            {products.map((product) => (
              <SwiperSlide
                key={product.id}
                className="Recommendations__slide"
              >
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </ReactSwiper>
        </div>
      )}
    </div>
  );
};
