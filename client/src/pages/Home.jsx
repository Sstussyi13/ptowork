import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import experienceAnimation from "../assets/experience.json";
import workAnimation from "../assets/work.json";
import brainAnimation from "../assets/brain.json";
import constructionImg from "../assets/images/construction.jpg";
import engenierImg from "../assets/images/engenier.jpg";
import { LifeBuoy, Timer, Globe } from "lucide-react";
import CardsSection from "../components/CardsSection";

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* Главный экран */}
      <section className="relative h-[600px] w-full bg-black">
        <img
          src={constructionImg}
          className="absolute inset-0 w-full h-full object-cover object-[center_30%] z-0"
          alt="Фон"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 flex items-center justify-center h-full px-4">
          <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-10 max-w-2xl text-center text-white shadow-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Производственно-технический отдел <br className="hidden sm:block" /> (ПТО / ППР)
            </h1>
            <p className="text-base sm:text-lg mb-8 text-white/80">
              Подготовим ППР, проекты организации строительства и техническую документацию под ключ. Работаем по всей России.
            </p>
            <Link
              to="/contacts"
              className="inline-block bg-white text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>

      {/* Команда профессионалов */}
      <section className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={engenierImg}
                alt="Инженеры"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Команда профессионалов
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Мы — команда инженеров и проектировщиков с опытом более 10 лет в области ПТО и ППР. 
              Выполняем проекты любой сложности: от многоэтажек и ТЦ до ВЛ 110 кВ и промышленных объектов.
            </p>
            <ul className="space-y-4 text-gray-800">
              <li className="flex items-start gap-3">
                <LifeBuoy className="text-black mt-1" size={22} />
                Поддержка на всех этапах
              </li>
              <li className="flex items-start gap-3">
                <Timer className="text-black mt-1" size={22} />
                Точные сроки и понятная стоимость
              </li>
              <li className="flex items-start gap-3">
                <Globe className="text-black mt-1" size={22} />
                Работаем по всей России
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Почему выбирают нас */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-10">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Опыт 10+ лет",
                text: "Проекты любой сложности: ТЦ, ЖК, заводы, ВЛ 110 кВ",
                animation: brainAnimation,
              },
              {
                title: "Работаем по всей РФ",
                text: "Учитываем СП, СНиП и региональные нормы",
                animation: workAnimation,
              },
              {
                title: "Сжатые сроки",
                text: "Под ключ от 3 рабочих дней с гарантиями и сопровождением",
                animation: experienceAnimation,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition text-left"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12">
                    <Lottie animationData={item.animation} loop />
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Карточки с backend-а */}
      <CardsSection />

      {/* CTA */}
      <section className="bg-gray-800 text-white py-16 px-4 sm:px-6 text-center mt-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Нужен ППР или проект? Мы всё сделаем за вас!
          </h3>
          <p className="mb-6 text-gray-300 text-sm sm:text-base">
            Отправьте заявку — мы свяжемся с вами в течение 15 минут
          </p>
          <Link
            to="/contacts"
            className="inline-block w-full sm:w-auto bg-white text-gray-800 font-semibold px-6 py-3 rounded-full hover:bg-gray-300 transition"
          >
            Оставить заявку
          </Link>
        </div>
      </section>
    </div>
  );
}
