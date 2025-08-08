export default function MeetingRequestForm() {
  return (
    <section className="mt-5 d-flex justify-content-center h-1 align-middle ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Meeting request sent!");
        }}
        className="bg-white p-4 rounded shadow"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4 text-primary">Meeting Request Form</h2>

        <section className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" required />
        </section>

        <section className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required />
        </section>

        <section className="mb-3">
          <label className="form-label">Meeting Date</label>
          <input type="date" className="form-control" required />
        </section>

        <section className="mb-3">
          <label className="form-label">Meeting Time</label>
          <input type="time" className="form-control" required />
        </section>

        <section className="mb-4">
          <label className="form-label">Meeting Purpose</label>
          <textarea className="form-control" rows="3" required></textarea>
        </section>

        <button type="submit" className="btn btn-primary w-100">
          Send Request
        </button>
      </form>
    </section>
  );
}
