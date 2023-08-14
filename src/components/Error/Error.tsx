import { FC } from 'react';
import { useNavigate } from 'react-router';
import { MainButton } from '../MainButton';
import { SecondaryButton } from '../SecondaryButton';
import './Error.scss';

interface Props {
  loadData: () => void;
}

export const Error: FC<Props> = ({ loadData }) => {
  const navigate = useNavigate();

  const BUTTON_WIDTH = '160px';

  return (
    <div className="Error">
      <h2 className="Error__message">
        Something went wrong!
      </h2>

      <div className="Error__buttons">
        <MainButton
          style={{ width: BUTTON_WIDTH }}
          onClick={loadData}
        >
          Try again
        </MainButton>

        <SecondaryButton
          style={{ width: BUTTON_WIDTH }}
          onClick={() => navigate('/')}
        >
          Return Home
        </SecondaryButton>
      </div>
    </div>
  );
};
