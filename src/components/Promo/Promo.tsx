import { FC } from 'react';
import '../../styles/swiper.scss';
import { Slider } from '../Slider';
import './Promo.scss';

export const Promo: FC = () => (
  <section className="Promo">
    <div className="Promo__title">
      Welcome to Nice Gadgets store!
    </div>

    <div className="Promo__slider">
      <Slider />
    </div>

    <div
      style={{ position: 'static' }}
      className="swiper-pagination"
    />
  </section>
);
