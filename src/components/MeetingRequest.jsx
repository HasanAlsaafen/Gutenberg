export default function MeetingRequestForm() {
  return (
    <section className="flex justify-center items-center mt-10 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Meeting request sent!");
        }}
        className="bg-white w-full max-w-lg p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Meeting Request Form
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="example@email.com"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Meeting Date
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Meeting Time
          </label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">
            Meeting Purpose
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            placeholder="Briefly describe the purpose"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
        >
          Send Request
        </button>
      </form>
    </section>
  );
}
