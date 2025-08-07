import { useState, useEffect } from "react";
import st from "/assets/solu.png";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";

export default function Solutions() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const API =
      "https://gutenberg-server-production.up.railway.app/api/solution";

    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error("فشل في جلب البيانات");
        return res.json();
      })
      .then((data) => {
        setSolutions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <>
        <Navbar />
        <div className="text-center mt-20">...جارٍ تحميل الحلول</div>
        <Footer />
      </>
    );

  if (error)
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-red-600">خطأ: {error}</div>
        <Footer />
      </>
    );

  return (
    <>
      <Navbar />
      <div className="w-full">
        <img
          src={st}
          alt="Solutions Banner"
          className="object-cover w-full mb-12"
        />
      </div>

      <section className="relative max-w-7xl mx-auto transition-all duration-300 mr-20 ml-20">
        <section
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8 transition-all duration-300 ${
            selected ? "md:pr-[42%]" : ""
          }`}
        >
          {solutions.map((solution) => (
            <div
              key={solution.id}
              onClick={() => setSelected(solution)}
              className={`${
                solution.bgColor || "bg-gray-100"
              } cursor-pointer rounded-xl p-4 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 hover:border-2 hover:border-blue-700 text-center focus:outline-none focus:ring-2 focus:ring-blue-700`}
              role="button"
              tabIndex={0}
              aria-label={`Read more about ${solution.title}`}
            >
              <img
                src={`assets/${solution.image}`}
                alt={solution.title}
                className="w-16 h-16 mx-auto mb-3"
              />

              <h2 className="text-lg font-bold text-gray-800 mb-1">
                {solution.title}
              </h2>
              <p className="text-blue-700 text-sm">Read more</p>
            </div>
          ))}
        </section>

        {selected && (
          <aside
            className="absolute top-0 right-0 h-full bg-white shadow-lg p-6 border-l border-gray-200 z-50 overflow-y-auto w-full md:w-5/12 max-h-[100%]"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setSelected(null)}
              className="text-sm text-gray-500 hover:text-blue-700 mb-4"
              aria-label="Close details panel"
            >
              &larr; Back
            </button>

            <img
              src={`assets/${selected.image}`}
              alt={selected.title}
              className="w-24 h-24 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-center mb-2 text-blue-700">
              {selected.title}
            </h1>
            <p className="text-gray-600 mb-4 text-sm">{selected.description}</p>
            <p className="text-gray-600 mb-4 text-sm">{selected.problem}</p>
            <p className="text-blue-700 font-semibold text-sm">
              {selected.solution}
            </p>
          </aside>
        )}
      </section>
      <Footer />
    </>
  );
}
