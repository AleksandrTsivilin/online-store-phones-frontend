import { FC, HTMLAttributes, ReactNode } from 'react';
import './SecondaryButton.scss';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const SecondaryButton: FC<Props> = ({ children, ...props }) => (
  <button className="SecondaryButton" {...props}>
    {children}
  </button>
);
