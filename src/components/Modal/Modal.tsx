import { FC } from 'react';
import { useNavigate } from 'react-router';
import cart from '../../assets/icons/cart-checkout.svg';
import { Icon } from '../Icon';
import { MainButton } from '../MainButton';
import './Modal.scss';

interface Props {
  closeModal: () => void;
}

export const Modal: FC<Props> = ({ closeModal }) => {
  const navigate = useNavigate();

  return (
    <div className="Modal">
      <div className="Modal__content">
        <button
          className="Modal__close-button"
          onClick={closeModal}
        >
          <Icon type="close" size={16} />
        </button>

        <img
          className="Modal__success"
          src={cart}
          alt="Thank You!"
        />

        <p className="Modal__title">
          Your order was successfully applied!
        </p>

        <p className="Modal__message">
          We will contact you as soon as possible.
        </p>

        <MainButton onClick={() => navigate('/')}>
          Return Home
        </MainButton>
      </div>
    </div>
  );
};
