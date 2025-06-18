import { useState, useEffect } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  ArrowRight,
  AlertTriangle,
  MailCheck,
} from "lucide-react";

export default function Contacts() {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    service_type: "ПТО",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/content/contacts")
      .then((res) => setContacts(JSON.parse(res.data.value)))
      .catch((err) =>
        console.error("Ошибка загрузки контактных данных:", err)
      );
  }, []);

  const validate = () => {
    const newErrors = {};
    if (form.full_name.trim().length < 2)
      newErrors.full_name = "Введите имя";
    const digits = form.phone.replace(/\D/g, "");
    if (
      digits.length !== 11 ||
      !(digits.startsWith("7") || digits.startsWith("8"))
    ) {
      newErrors.phone =
        "Номер должен начинаться с +7 или 8 и содержать 11 цифр";
    }
    if (!form.service_type) newErrors.service_type = "Выберите тип услуги";
    if (form.message.trim().length < 10)
      newErrors.message = "Сообщение слишком короткое";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/requests", form);
      setSubmitted(true);
    } catch (error) {
      setServerError("Ошибка при отправке. Проверьте соединение или повторите позже.");
      console.error(error);
    }
  };

  return (
    <section className="bg-background py-20 px-4 sm:px-6 text-primary">
      <div className="max-w-5xl mx-auto animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Связаться с нами
        </h2>
        <p className="text-center text-muted mb-12 text-sm sm:text-base">
          Оставьте заявку — мы ответим и предложим решение в кратчайшие сроки.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Форма */}
          <div className="bg-light border border-gray-200 rounded-xl p-6 sm:p-8 shadow hover:shadow-md transition-all">
            {serverError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-800 p-3 rounded text-sm flex items-start gap-2">
                <AlertTriangle size={16} className="mt-0.5" /> {serverError}
              </div>
            )}

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">Имя</label>
                  <input
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    type="text"
                    required
                    placeholder="Ваше имя"
                    className="w-full px-4 py-2 pl-10 border rounded-md bg-white text-primary focus:outline-none focus:ring focus:ring-primary/30 text-sm"
                  />
                  <span className="absolute left-3 top-[38px] text-muted">
                    <MessageSquare size={16} />
                  </span>
                  {errors.full_name && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.full_name}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium mb-1">Телефон</label>
                  <InputMask
                    mask="+7 999 999 99 99"
                    value={form.phone}
                    onChange={handleChange}
                    name="phone"
                    maskChar={null}
                  >
                    {(inputProps) => (
                      <input
                        {...inputProps}
                        type="tel"
                        required
                        placeholder="+7 999 999 99 99"
                        className="w-full px-4 py-2 pl-10 border rounded-md bg-white text-primary focus:outline-none focus:ring focus:ring-primary/30 text-sm"
                      />
                    )}
                  </InputMask>
                  <span className="absolute left-3 top-[38px] text-muted">
                    <Phone size={16} />
                  </span>
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Тип услуги</label>
                  <select
                    name="service_type"
                    value={form.service_type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md bg-white text-primary focus:outline-none focus:ring focus:ring-primary/30 text-sm"
                  >
                    <option value="">Выберите услугу</option>
                    <option value="ПТО">ПТО</option>
                    <option value="ППР">ППР</option>
                    <option value="Консультация">Консультация</option>
                  </select>
                  {errors.service_type && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.service_type}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Сообщение</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Расскажите, что вам нужно — мы предложим решение."
                    className="w-full px-4 py-3 border rounded-md bg-white text-primary resize-none focus:outline-none focus:ring focus:ring-primary/30 text-sm"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-600 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 bg-primary text-white py-2.5 rounded-md hover:bg-accent transition text-sm font-medium shadow"
                >
                  Отправить заявку <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center gap-3 border border-blue-500 bg-blue-50 text-blue-800 p-6 rounded-md shadow-md transition-all duration-300">
                <MailCheck size={48} className="text-blue-600" />
                <div className="text-base sm:text-sm">
                  <p className="font-semibold">Заявка успешно отправлена</p>
                  <p className="text-blue-700 mt-1">Мы свяжемся с вами в ближайшее время.</p>
                </div>
              </div>
            )}
          </div>

          {/* Контактная информация */}
          <div className="space-y-6">
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-md font-semibold mb-1 flex items-center gap-2">
                <Mail size={16} /> Почта
              </h3>
              <a
                href={`mailto:${contacts?.email || "info@pto-ppr.ru"}`}
                className="text-blue-600 hover:underline text-sm"
              >
                {contacts?.email || "info@pto-ppr.ru"}
              </a>
            </div>

            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-md font-semibold mb-1 flex items-center gap-2">
                <Phone size={16} /> Телефон
              </h3>
              <a
                href={`tel:${contacts?.phone || "+79184522769"}`}
                className="text-blue-600 hover:underline text-sm"
              >
                {contacts?.phone || "+7 (918) 452-27-69"}
              </a>
              <p className="text-muted text-xs mt-1">Работаем по всей России</p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-md font-semibold mb-1 flex items-center gap-2">
                <Clock size={16} /> Режим работы
              </h3>
              <p className="text-muted text-sm whitespace-pre-line">
                {(contacts?.schedule || "Пн–Сб: 09:00–20:00")
  .split('\n')
  .map((line, i) => (
    <p key={i}>{line}</p>
  ))}

              </p>
            </div>
          </div>
        </div>

        {/* Карта */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin size={18} /> Мы на карте
          </h3>
          <div className="w-full h-64 sm:h-72 rounded-md overflow-hidden border shadow-sm">
            <iframe
              title="Карта"
              src={
                contacts?.map ||
                "https://yandex.ru/map-widget/v1/?um=constructor%3Ab8c3f7b7559c7d932f69ff633a54504a163e24356c7b95df9587aba328f67d3c&source=constructor"
              }
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
