import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function scrollToTopDefault(): void {
  window.scrollTo(0, 0);
}

export function ScrollToTop(): null {
  const { pathname, search } = useLocation();

  useEffect(() => {
    scrollToTopDefault();
  }, [pathname, search]);

  return null;
}
