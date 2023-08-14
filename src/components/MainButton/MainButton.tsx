import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './MainButton.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const MainButton: FC<Props> = ({ children, ...props }) => (
  <button className="MainButton" {...props}>
    {children}
  </button>
);
