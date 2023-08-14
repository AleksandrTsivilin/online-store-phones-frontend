import { FC, ReactNode } from 'react';
import './Container.scss';

interface Props {
  children: ReactNode;
}

export const Container: FC<Props> = ({ children }) => (
  <div className="Container">{children}</div>
);
