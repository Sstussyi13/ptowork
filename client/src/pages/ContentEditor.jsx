import { useState, useEffect } from "react";
import axios from "axios";

export default function ContentEditor() {
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/content/price_table")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Ошибка получения контента:", err));
  }, []);

  const handleChange = (e) => {
    setData({ ...data, content: e.target.value });
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      await axios.put("http://localhost:5000/api/content/price_table", {
        content: data.content,
      });
      alert("Сохранено!");
    } catch (err) {
      console.error("Ошибка сохранения:", err);
      alert("Ошибка при сохранении.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Редактировать контент</h2>
      <textarea
        className="w-full border p-4 rounded mb-4 h-60"
        value={data.content || ""}
        onChange={handleChange}
      ></textarea>
      <button
        onClick={saveContent}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={saving}
      >
        {saving ? "Сохраняю..." : "Сохранить"}
      </button>
    </div>
  );
}
