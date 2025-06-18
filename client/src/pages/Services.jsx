import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ClipboardCheck,
  TrafficCone,
  Construction,
  Ruler,
  FileText,
  FileSearch,
  BookOpen,
  Calculator,
} from "lucide-react";

import ServiceCard from "../components/ServiceCard";
import PriceTable from "../components/PriceTable";

// Все допустимые иконки
const ICONS = {
  ClipboardCheck,
  TrafficCone,
  Construction,
  Ruler,
  FileText,
  FileSearch,
  BookOpen,
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [prices, setPrices] = useState([]);
  const [modalContent, setModalContent] = useState(null);

  // Загрузка услуг
useEffect(() => {
  axios
    .get(`${window.location.origin}/api/content/services`)
    .then((res) => {
      const parsed = JSON.parse(res.data.value);
      setServices(parsed);
    })
    .catch((err) => {
      console.error("Ошибка при загрузке услуг:", err);
    });
}, []);

// Загрузка таблицы цен
useEffect(() => {
  axios
    .get(`${window.location.origin}/api/content/price_table`)
    .then((res) => {
      const parsed = JSON.parse(res.data.value);
      setPrices(parsed);
    })
    .catch((err) => {
      console.error("Ошибка при загрузке таблицы цен:", err);
    });
}, []);


  return (
    <section className="bg-white text-gray-800 py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Услуги ПТО и ППР</h2>
        <p className="text-center text-gray-500 mb-10 text-base">
          Проектируем, согласуем, сопровождаем — под ключ по всей России.
        </p>

        {/* Карточки */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = ICONS[service.icon] || ClipboardCheck;
            return (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={Icon}
                onClick={() => setModalContent(service)}
              />
            );
          })}
        </div>

        {/* Модальное окно */}
        {modalContent && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setModalContent(null)}
          >
            <div
              className="bg-white w-full max-w-md mx-4 sm:mx-0 p-6 rounded-xl shadow-xl relative transition-all scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalContent(null)}
                className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl"
              >
                ×
              </button>
              <h4 className="text-xl font-semibold mb-2">{modalContent.title}</h4>
              <p className="text-gray-600 text-sm">{modalContent.details}</p>
            </div>
          </div>
        )}

        {/* Таблица цен */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-4">Цены на популярные услуги</h3>
          <div className="overflow-x-auto">
            <PriceTable prices={prices} />
          </div>
          <div className="text-center mt-8">
            <Link
              to="/contacts"
              className="inline-flex items-center gap-2 bg-gray-800 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition"
            >
              <Calculator className="w-5 h-5" />
              Получить точный расчёт
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
