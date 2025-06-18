import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash, Save, LogOut, Upload, Plus } from "lucide-react";
import {
  ClipboardCheck,
  TrafficCone,
  Construction,
  Ruler,
  FileText,
  FileSearch,
  BookOpen
} from "lucide-react";

const ICONS = {
  ClipboardCheck,
  TrafficCone,
  Construction,
  Ruler,
  FileText,
  FileSearch,
  BookOpen
};

const API_URL = window.location.origin;
const ADMIN_PASSWORD = "123";

export default function AdminPanel() {
  const [tab, setTab] = useState("requests");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [requests, setRequests] = useState([]);
  const [content, setContent] = useState({});
  const [editId, setEditId] = useState(null);
  const [editedRequest, setEditedRequest] = useState({});

  useEffect(() => {
    if (localStorage.getItem("adminAccess") === "granted") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      localStorage.setItem("adminAccess", "granted");
      setIsAuthenticated(true);
    } else {
      alert("Неверный пароль");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminAccess");
    setIsAuthenticated(false);
  };

  // Заявки
 const fetchRequests = async () => {
  try {
    const res = await axios.get(`${window.location.origin}/api/requests`);
    setRequests(res.data);
  } catch (err) {
    console.error("Ошибка при получении заявок:", err);
  }
};


  useEffect(() => {
    if (isAuthenticated) fetchRequests();
  }, [isAuthenticated]);

  const startEdit = (r) => {
    setEditId(r.id);
    setEditedRequest({ ...r });
  };

  const saveEdit = async () => {
  try {
    await axios.put(`${window.location.origin}/api/requests/${editId}`, {
      service_type: editedRequest.service_type,
      message: editedRequest.message,
    });
    setEditId(null);
    fetchRequests();
  } catch (err) {
    console.error("Ошибка при обновлении заявки:", err);
  }
};

  const deleteRequest = async (id) => {
  if (!window.confirm("Удалить эту заявку?")) return;
  try {
    await axios.delete(`${window.location.origin}/api/requests/${id}`);
    fetchRequests();
  } catch (err) {
    console.error("Ошибка при удалении заявки:", err);
  }
};


  // Контент
  const fetchContent = async () => {
  try {
    const res = await axios.get(`${window.location.origin}/api/content/all`);
    const data = res.data.reduce((acc, { key, value }) => {
      acc[key] = JSON.parse(value);
      return acc;
    }, {});
    setContent(data);
  } catch (err) {
    console.error("Ошибка при загрузке контента:", err);
  }
};


  const updateContent = async (key, value) => {
  try {
    await axios.put(`${window.location.origin}/api/content/${key}`, {
      value: JSON.stringify(value),
    });
    fetchContent();
  } catch (err) {
    console.error("Ошибка при обновлении контента:", err);
  }
};


  const handleFileUpload = async (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const handleFileUpload = async (e, idx) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  const handleFileUpload = async (e, idx) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`${window.location.origin}/api/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const imageUrl = `${window.location.origin}/uploads/${res.data.filename}`;
    const updated = [...content.cards];
    updated[idx].image = imageUrl;
    setContent({ ...content, cards: updated });
  } catch (err) {
    console.error("Ошибка при загрузке изображения:", err);
  }
};

useEffect(() => {
  if (isAuthenticated) fetchContent();
}, [isAuthenticated]);


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white border p-6 rounded shadow-sm w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-4">Вход в админ-панель</h2>
          <input
            type="password"
            placeholder="Введите пароль"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full border px-4 py-2 rounded mb-4"
          />
          <button
            onClick={login}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Админ-панель</h1>
        <button onClick={logout} className="text-sm text-red-600 hover:underline flex items-center gap-2">
          <LogOut size={16} /> Выйти
        </button>
      </div>

      {/* Вкладки */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { key: "requests", label: "Заявки" },
          { key: "cards", label: "Карточки" },
          { key: "services", label: "Услуги" },
          { key: "steps", label: "Этапы" },
          { key: "price_table", label: "Цены" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded ${tab === t.key ? "bg-blue-600 text-white" : "bg-white border"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Вкладка заявок */}
      {tab === "requests" && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Список заявок</h2>
          {requests.length === 0 ? (
            <p>Нет заявок</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Имя</th>
                    <th className="px-4 py-2">Телефон</th>
                    <th className="px-4 py-2">Тип</th>
                    <th className="px-4 py-2">Сообщение</th>
                    <th className="px-4 py-2">Дата</th>
                    <th className="px-4 py-2">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r) => (
                    <tr key={r.id} className="border-t">
                      <td className="px-4 py-2">{r.id}</td>
                      <td className="px-4 py-2">{r.full_name}</td>
                      <td className="px-4 py-2">{r.phone}</td>
                      <td className="px-4 py-2">
                        {editId === r.id ? (
                          <input
                            type="text"
                            value={editedRequest.service_type}
                            onChange={(e) => setEditedRequest({ ...editedRequest, service_type: e.target.value })}
                            className="border px-2 py-1 rounded w-full"
                          />
                        ) : (
                          r.service_type
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editId === r.id ? (
                          <textarea
                            value={editedRequest.message}
                            onChange={(e) => setEditedRequest({ ...editedRequest, message: e.target.value })}
                            className="border px-2 py-1 rounded w-full"
                          />
                        ) : (
                          r.message
                        )}
                      </td>
                      <td className="px-4 py-2">{new Date(r.request_date).toLocaleString("ru-RU")}</td>
                      <td className="px-4 py-2 flex gap-2">
                        {editId === r.id ? (
                          <button onClick={saveEdit} className="text-green-600" title="Сохранить">
                            <Save size={16} />
                          </button>
                        ) : (
                          <button onClick={() => startEdit(r)} className="text-blue-600" title="Редактировать">
                            <Pencil size={16} />
                          </button>
                        )}
                        <button onClick={() => deleteRequest(r.id)} className="text-red-600" title="Удалить">
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Вкладка карточек */}
      {tab === "cards" && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Редактирование карточек</h2>

          {(content.cards || []).map((card, idx) => (
            <div key={idx} className="mb-4 border p-3 rounded space-y-2">
              <input
                type="text"
                placeholder="Заголовок"
                value={card.label}
                onChange={(e) => {
                  const updated = [...content.cards];
                  updated[idx].label = e.target.value;
                  setContent({ ...content, cards: updated });
                }}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Ссылка"
                value={card.link}
                onChange={(e) => {
                  const updated = [...content.cards];
                  updated[idx].link = e.target.value;
                  setContent({ ...content, cards: updated });
                }}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="URL изображения"
                value={card.image}
                onChange={(e) => {
                  const updated = [...content.cards];
                  updated[idx].image = e.target.value;
                  setContent({ ...content, cards: updated });
                }}
                className="w-full border px-3 py-2 rounded"
              />
              <input type="file" onChange={(e) => handleFileUpload(e, idx)} />
              <button
                className="text-sm text-red-500 hover:underline"
                onClick={() => {
                  const updated = content.cards.filter((_, i) => i !== idx);
                  setContent({ ...content, cards: updated });
                }}
              >
                Удалить карточку
              </button>
            </div>
          ))}

          <div className="flex gap-2">
            <button
              onClick={() =>
                setContent({
                  ...content,
                  cards: [...(content.cards || []), { label: "", link: "", image: "" }],
                })
              }
              className="mt-2 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
            >
              ➕ Добавить карточку
            </button>
            <button
              onClick={() => updateContent("cards", content.cards || [])}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              💾 Сохранить изменения
            </button>
          </div>
        </div>
      )}

      {/* TODO: добавить другие вкладки: услуги, этапы, контакты, таблица цен */}
      {tab === "services" && (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-4">Редактирование услуг</h2>

    {(content.services || []).map((service, idx) => (
      <div key={idx} className="mb-4 border p-3 rounded space-y-2">
        <input
          type="text"
          placeholder="Заголовок"
          value={service.title}
          onChange={(e) => {
            const updated = [...content.services];
            updated[idx].title = e.target.value;
            setContent({ ...content, services: updated });
          }}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Описание"
          value={service.description}
          onChange={(e) => {
            const updated = [...content.services];
            updated[idx].description = e.target.value;
            setContent({ ...content, services: updated });
          }}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Детали (модальное окно)"
          value={service.details}
          onChange={(e) => {
            const updated = [...content.services];
            updated[idx].details = e.target.value;
            setContent({ ...content, services: updated });
          }}
          className="w-full border px-3 py-2 rounded"
        />
        <select
          value={service.icon}
          onChange={(e) => {
            const updated = [...content.services];
            updated[idx].icon = e.target.value;
            setContent({ ...content, services: updated });
          }}
          className="w-full border px-3 py-2 rounded"
        >
          {Object.keys(ICONS).map((iconKey) => (
            <option key={iconKey} value={iconKey}>{iconKey}</option>
          ))}
        </select>
        <button
          className="text-sm text-red-500 hover:underline"
          onClick={() => {
            const updated = content.services.filter((_, i) => i !== idx);
            setContent({ ...content, services: updated });
          }}
        >
          Удалить услугу
        </button>
      </div>
    ))}

    <div className="flex gap-2">
      <button
        onClick={() =>
          setContent({
            ...content,
            services: [...(content.services || []), { title: "", description: "", details: "", icon: "ClipboardCheck" }],
          })
        }
        className="mt-2 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
      >
        ➕ Добавить услугу
      </button>
      <button
        onClick={() => updateContent("services", content.services || [])}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        💾 Сохранить
      </button>
    </div>
  </div>
)}
{tab === "price_table" && (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-4">Редактирование цен</h2>

    {(content.price_table || []).map((item, idx) => (
      <div key={idx} className="mb-4 border p-3 rounded space-y-2">
        <input
          type="text"
          placeholder="Название услуги"
          value={item.name}
          onChange={(e) => {
            const updated = [...content.price_table];
            updated[idx].name = e.target.value;
            setContent({ ...content, price_table: updated });
          }}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Срок выполнения"
          value={item.duration}
          onChange={(e) => {
            const updated = [...content.price_table];
            updated[idx].duration = e.target.value;
            setContent({ ...content, price_table: updated });
          }}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Стоимость"
          value={item.price}
          onChange={(e) => {
            const updated = [...content.price_table];
            updated[idx].price = e.target.value;
            setContent({ ...content, price_table: updated });
          }}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          className="text-sm text-red-500 hover:underline"
          onClick={() => {
            const updated = content.price_table.filter((_, i) => i !== idx);
            setContent({ ...content, price_table: updated });
          }}
        >
          Удалить строку
        </button>
      </div>
    ))}

    <div className="flex gap-2">
      <button
        onClick={() =>
          setContent({
            ...content,
            price_table: [...(content.price_table || []), { name: "", duration: "", price: "" }],
          })
        }
        className="mt-2 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
      >
        ➕ Добавить строку
      </button>
      <button
        onClick={() => updateContent("price_table", content.price_table || [])}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        💾 Сохранить
      </button>
    </div>
  </div>
)}
{tab === "steps" && (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-4">Редактирование этапов</h2>

    {(content.steps || []).map((step, idx) => (
      <div key={idx} className="mb-4 border p-3 rounded space-y-2">
        <input
          type="text"
          placeholder="Заголовок"
          value={step.title}
          onChange={(e) => {
            const updated = [...content.steps];
            updated[idx].title = e.target.value;
            setContent({ ...content, steps: updated });
          }}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Описание"
          value={step.description}
          onChange={(e) => {
            const updated = [...content.steps];
            updated[idx].description = e.target.value;
            setContent({ ...content, steps: updated });
          }}
          className="w-full border px-3 py-2 rounded"
        />
        <select
          value={step.icon}
          onChange={(e) => {
            const updated = [...content.steps];
            updated[idx].icon = e.target.value;
            setContent({ ...content, steps: updated });
          }}
          className="w-full border px-3 py-2 rounded"
        >
          {Object.keys(ICONS).map((iconKey) => (
            <option key={iconKey} value={iconKey}>{iconKey}</option>
          ))}
        </select>
        <button
          className="text-sm text-red-500 hover:underline"
          onClick={() => {
            const updated = content.steps.filter((_, i) => i !== idx);
            setContent({ ...content, steps: updated });
          }}
        >
          Удалить этап
        </button>
      </div>
    ))}

    <div className="flex gap-2">
      <button
        onClick={() =>
          setContent({
            ...content,
            steps: [...(content.steps || []), { title: "", description: "", icon: "ClipboardCheck" }],
          })
        }
        className="mt-2 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
      >
        ➕ Добавить этап
      </button>
      <button
        onClick={() => updateContent("steps", content.steps || [])}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        💾 Сохранить
      </button>
    </div>
  </div>
)}


    </div>
  );
}
  } 
}