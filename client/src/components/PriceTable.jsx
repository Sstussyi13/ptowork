export default function PriceTable({ prices }) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2">Услуга</th>
              <th className="border px-4 py-2">Срок</th>
              <th className="border px-4 py-2">Стоимость</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.duration}</td>
                <td className="border px-4 py-2">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  