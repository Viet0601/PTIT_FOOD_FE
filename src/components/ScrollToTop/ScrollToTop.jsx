import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      // ensure top on first load
      window.scrollTo(0, 0);
      return () => {
        window.history.scrollRestoration = prev;
      };
    }
  }, []);

  return null;
};

export default ScrollToTop;
