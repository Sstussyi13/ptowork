import { useEffect, useState } from "react";
import API from "../api/axios"; // путь зависит от твоей структуры

export default function CardsSection() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await API.get("/content/all");
        const data = res.data.find((item) => item.key === "cards");
        if (data) {
          const parsed = JSON.parse(data.value);
          setCards(parsed);
        }
      } catch (err) {
        console.error("Ошибка при загрузке карточек:", err);
      }
    };

    fetchCards();
  }, []);

  if (!cards.length) return null;

  return (
    <section className="bg-white py-20 px-4 sm:px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Что мы делаем</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
          {cards.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="group relative rounded-xl overflow-hidden border border-gray-200 shadow-sm
                        transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                        hover:scale-[1.03]"
            >
              <div className="relative h-60 w-full">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              </div>

              <div className="absolute bottom-0 z-20 p-5 w-full flex flex-col justify-end">
                <h3 className="text-white text-xl font-semibold mb-2">{item.label}</h3>
                <div className="text-white opacity-80 transition-transform group-hover:translate-x-1">→</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
