export default function Footer() {
  return (
    <footer className="bg-zinc-100 border-t border-gray-200 py-8 px-4 sm:px-6 text-center text-sm text-muted">
      <div className="max-w-4xl mx-auto">
        <p className="mb-2">
          © {new Date().getFullYear()} ПТО / ППР. Работаем по всей России.
        </p>
        <p>
          Подготовим проект под ключ с учётом всех норм и требований. Надёжно. Профессионально. В срок.
        </p>
      </div>
    </footer>
  );
}
