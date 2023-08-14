import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

interface Props {
  type: 'header' | 'footer';
}

export const Logo: FC<Props> = ({ type }) => (
  <Link
    className={classNames('Logo', {
      'Logo--header': type === 'header',
      'Logo--footer': type === 'footer',
    })}
    to="/"
  />
);
