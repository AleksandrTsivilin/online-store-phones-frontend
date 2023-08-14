import { FC } from 'react';
import './Loader.scss';

interface Props {
  size: number;
}

export const Loader: FC<Props> = ({ size }) => (
  <i
    className="Loader"
    style={{
      width: size,
      height: size,
      borderWidth: size / 6,
    }}
  />
);
