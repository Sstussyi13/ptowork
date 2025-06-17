import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

import {
  PhoneCall,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  UserCheck,
  Send,
} from "lucide-react";

// Список всех иконок
const ICONS = {
  PhoneCall,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  UserCheck,
  Send,
};

export default function Steps() {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Загружаем шаги из контента
    axios
      .get("http://localhost:3000/api/content/steps")
      .then((res) => {
        const parsed = JSON.parse(res.data.value);
        setSteps(parsed);
      })
      .catch((err) => {
        console.error("Ошибка загрузки этапов:", err);
      });
  }, []);

  return (
    <section className="bg-white py-20 px-4 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Этапы работы</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 text-base">
          Сопровождаем проект от первого звонка до финальной сдачи документации.
        </p>

        <div className="space-y-8">
          {steps.map((step, idx) => {
            const Icon = ICONS[step.icon] || FileText; // fallback
            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center shadow">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all w-full">
                  <h3 className="text-base font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 bg-gray-800 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition"
          >
            Обсудить проект →
          </Link>
        </div>
      </div>
    </section>
  );
}
