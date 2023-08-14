import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from '../Icon';
import './BackButton.scss';

export const BackButton: FC = () => {
  const navigate = useNavigate();

  return (
    <button
      className="BackButton"
      onClick={() => navigate(-1)}
    >
      <Icon type="arrow-left" size={16} />

      <span className="BackButton__text">
        Back
      </span>
    </button>
  );
};
