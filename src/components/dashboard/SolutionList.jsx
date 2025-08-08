import React, { useEffect, useState } from "react";
import axios from "axios";

const SolutionList = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSolutions = async () => {
    try {
      const response = await axios.get(
        "https://gutenberg-server-production.up.railway.app/api/Solution"
      );
      setSolutions(response.data);
      setLoading(false);
    } catch (err) {
      setError("فشل في جلب الحلول");
      setLoading(false);
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذا الحل؟");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://gutenberg-server-production.up.railway.app/api/Solution/${id}`
      );
      setSolutions((prev) => prev.filter((s) => s.solutionId !== id));
    } catch (err) {
      alert("حدث خطأ أثناء الحذف");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">قائمة الحلول</h2>
      {solutions.length === 0 ? (
        <p>لا يوجد حلول حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((solution) => (
            <div
              key={solution.solutionId}
              className="border rounded-lg shadow-md p-4 flex flex-col"
            >
              {solution.image && (
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="h-40 object-cover mb-2 rounded"
                />
              )}
              <h3 className="text-lg font-semibold">{solution.title}</h3>
              <p className="text-sm text-gray-600">{solution.description}</p>
              <p className="text-sm text-blue-700 mt-1">
                النوع: {solution.solutionType}
              </p>

              <button
                onClick={() => handleDelete(solution.solutionId)}
                className="mt-auto bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SolutionList;
