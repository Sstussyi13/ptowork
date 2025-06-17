import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lenis from "@studio-freight/lenis";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Steps from "./pages/Steps";
import Contacts from "./pages/Contacts";
import AdminPanel from "./pages/AdminPanel";



export default function App() {
  const location = useLocation();
  const lenisRef = useRef(null); // 💡 храним Lenis

  // 🔁 Инициализация один раз
  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Обработка якорей
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, {
            offset: 0,
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 4),
          });
        }
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // 💥 Скролл наверх при смене route
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/steps" element={<Steps />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/super-admin-zayavki-ppr987123" element={<AdminPanel />} />
      </Routes>
    </Layout>
  );
}
