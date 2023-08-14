import { FC } from 'react';
import { useNavigate } from 'react-router';
import { MainButton } from '../MainButton';
import './NotFound.scss';

export const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="NotFound">
      <h2 className="NotFound__title">
        404
      </h2>

      <h3 className="NotFound__subtitle">
        Oops! Page not found
      </h3>

      <p className="NotFound__description">
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>

      <MainButton onClick={() => navigate('/')}>
        Return Home
      </MainButton>
    </div>
  );
};
