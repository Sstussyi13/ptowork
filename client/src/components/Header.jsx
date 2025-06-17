import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-zinc-800 hover:text-zinc-600 transition">
          ПТО / ППР
        </Link>

        {/* Десктоп меню */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-zinc-700 hover:text-blue-600 transition">Главная</Link>
          <Link to="/services" className="text-zinc-700 hover:text-blue-600 transition">Услуги</Link>
          <Link to="/steps" className="text-zinc-700 hover:text-blue-600 transition">Этапы работы</Link>
          <Link to="/contacts" className="text-zinc-700 hover:text-blue-600 transition">Контакты</Link>
        </nav>

        {/* Бургер */}
        <button
          className="md:hidden text-2xl text-zinc-700 focus:outline-none"
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню"
        >
          ☰
        </button>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <>
          {/* Полупрозрачный фон */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeMenu}
          />

          {/* Панель справа */}
          <div
            className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg p-6 animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-zinc-800">Меню</span>
              <button onClick={closeMenu} className="text-2xl text-zinc-700">×</button>
            </div>

            <nav className="flex flex-col gap-4 text-base">
              <Link to="/" onClick={closeMenu} className="text-zinc-700 hover:text-blue-600 transition">Главная</Link>
              <Link to="/services" onClick={closeMenu} className="text-zinc-700 hover:text-blue-600 transition">Услуги</Link>
              <Link to="/steps" onClick={closeMenu} className="text-zinc-700 hover:text-blue-600 transition">Этапы</Link>
              <Link to="/contacts" onClick={closeMenu} className="text-zinc-700 hover:text-blue-600 transition">Контакты</Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
