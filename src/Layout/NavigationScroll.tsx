import { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type ChildProps = {
  children: ReactNode;
}

export const NavigationScroll: React.FC<ChildProps> = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return children || null;
};
