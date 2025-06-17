import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = new Lenis();
    lenis.scrollTo(0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
