import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://gutenberg-server-production.up.railway.app/api/job";

const token = localStorage.getItem("token");

const JobOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    userId: "",
    title: "",
    description: "",
    postedDate: "",
    deadline: "",
    postedBy: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch {
      setError("Failed to fetch job orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [orders]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { userId, title, description, postedDate, deadline, postedBy } = form;

    if (
      !userId ||
      !title ||
      !description ||
      !postedDate ||
      !deadline ||
      !postedBy
    ) {
      setError("All fields are required.");
      return;
    }

    let parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) {
      setError("User ID must be a valid number.");
      return;
    }

    try {
      if (editingId) {
        const putPayload = {
          jobId: Number(editingId),
          userId: parsedUserId,
          title,
          description,
          postedDate: new Date(postedDate).toISOString(),
          deadline: new Date(deadline).toISOString(),
          postedBy, //統一 الاسم بالحروف الصغيرة
        };
        await axios.put(`/${editingId}`, putPayload);
      } else {
        const postPayload = {
          title,
          description,
          postedDate: new Date(postedDate).toISOString(),
          deadline: new Date(deadline).toISOString(),
          userId: parsedUserId,
          postedBy,
        };
        await axios.post(API_URL, postPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccess("Job added successfully!");
      }

      setForm({
        userId: "",
        title: "",
        description: "",
        postedDate: "",
        deadline: "",
        postedBy: "",
      });
      setEditingId(null);
      fetchOrders();
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      let errMsg = "Failed to save job.";
      if (err.response?.data) {
        if (typeof err.response.data === "string") {
          errMsg = err.response.data;
        } else if (err.response.data.message) {
          errMsg = err.response.data.message;
        } else {
          errMsg = JSON.stringify(err.response.data);
        }
      }
      setError(errMsg);
    }
  };

  const handleDelete = async (id) => {
    setError("");
    setSuccess("");
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Job deleted successfully!");
      fetchOrders();
    } catch {
      setError("Failed to delete job.");
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const pad = (n) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const handleEdit = (job) => {
    setForm({
      userId: job.userId || "",
      title: job.title || "",
      description: job.description || "",
      postedDate: formatDateForInput(job.postedDate),
      deadline: formatDateForInput(job.deadline),
      postedBy: job.postedBy || "",
    });
    setEditingId(job.jobId);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({
      userId: "",
      title: "",
      description: "",
      postedDate: "",
      deadline: "",
      postedBy: "",
    });
  };

  return (
    <main className="space-y-6">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Job Management Portal</h1>
        <p className="text-purple-100">
          Streamline your recruitment process with comprehensive job posting
          management
        </p>
      </header>

      {error && (
        <aside
          role="alert"
          className="text-red-600 bg-red-50 p-4 rounded-lg border border-red-200"
        >
          {error}
        </aside>
      )}

      {success && (
        <aside
          role="alert"
          className="text-green-600 bg-green-50 p-4 rounded-lg border border-green-200"
        >
          {success}
        </aside>
      )}

      <section
        aria-labelledby="job-form-heading"
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h2 id="job-form-heading" className="text-lg font-semibold mb-4">
          {editingId ? "Edit Position Details" : "Post New Position"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset className="space-y-4">
            <legend className="sr-only">Position Details</legend>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-1 block">
                Recruiter ID
              </span>
              <input
                type="number"
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter recruiter ID"
                value={form.userId}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, userId: e.target.value }))
                }
                required
                aria-describedby="userId-help"
              />
              <small
                id="userId-help"
                className="text-gray-500 text-xs mt-1 block"
              >
                Unique identifier for the recruiting manager
              </small>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-1 block">
                Position Title
              </span>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="e.g., Senior Software Engineer"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-1 block">
                Position Description
              </span>
              <textarea
                rows="4"
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-vertical"
                placeholder="Provide detailed role responsibilities, qualifications, and requirements"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-1 block">
                Hiring Manager
              </span>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Full name of hiring manager"
                value={form.postedBy}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, postedBy: e.target.value }))
                }
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-1 block">
                Publication Date
              </span>
              <input
                type="datetime-local"
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={form.postedDate}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, postedDate: e.target.value }))
                }
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-1 block">
                Application Deadline
              </span>
              <input
                type="datetime-local"
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={form.deadline}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, deadline: e.target.value }))
                }
                required
              />
            </label>
          </fieldset>

          <footer className="flex items-center gap-3 pt-4">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              {editingId ? "Update Position" : "Publish Position"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 font-medium transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel Changes
              </button>
            )}
          </footer>
        </form>
      </section>

      <section
        aria-labelledby="jobs-list-heading"
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <header className="p-6 border-b border-gray-200">
          <h2 id="jobs-list-heading" className="text-lg font-semibold">
            Active Positions ({orders.length})
          </h2>
        </header>

        {loading ? (
          <p
            className="p-6 text-center text-gray-500"
            role="status"
            aria-live="polite"
          >
            Loading position listings...
          </p>
        ) : orders.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            No positions currently available. Publish your first job posting
            above.
          </p>
        ) : (
          <ul className="grid gap-4 p-6" role="list">
            {orders.map((job) => (
              <li
                key={job.jobId}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <article>
                  <header className="flex justify-between items-start mb-3">
                    <hgroup>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Position ID: {job.jobId} | Hiring Manager:{" "}
                        {job.postedBy}
                      </p>
                    </hgroup>

                    <menu className="flex gap-2">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleEdit(job)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                          aria-label={`Edit ${job.title} position`}
                        >
                          Modify
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleDelete(job.jobId)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 rounded hover:bg-red-50 transition-colors"
                          aria-label={`Remove ${job.title} position`}
                        >
                          Remove
                        </button>
                      </li>
                    </menu>
                  </header>

                  <p className="text-gray-700 mb-3 line-clamp-3">
                    {job.description}
                  </p>

                  <footer className="text-sm text-gray-600 space-y-1">
                    <p>
                      <time dateTime={job.postedDate}>
                        Published: {new Date(job.postedDate).toLocaleString()}
                      </time>
                    </p>
                    <p>
                      <time dateTime={job.deadline}>
                        Application Deadline:{" "}
                        {new Date(job.deadline).toLocaleString()}
                      </time>
                    </p>
                  </footer>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default JobOrders;
