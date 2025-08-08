import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "/api/Application";

const ApplicationOrders = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    userId: "",
    jobId: "",
    attachment: "",
    applicationDate: "",
    applicationStatus: "Pending",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API_URL);
      setApplications(res.data);
    } catch {
      setError("Failed to fetch applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { userId, jobId, attachment, applicationDate, applicationStatus } =
      form;

    if (!userId || !jobId || !applicationDate) {
      setError("User ID, Job ID, and Application Date are required.");
      return;
    }

    let parsedJobId = Number(jobId);
    let parsedUserId = Number(userId);
    if (isNaN(parsedJobId)) {
      setError("Job ID must be a valid number.");
      return;
    }
    if (isNaN(parsedUserId)) {
      setError("User ID must be a valid number.");
      return;
    }

    const payload = {
      applicationId: Number(editingId),
      userId: parsedUserId,
      jobId: parsedJobId,
      attachment: attachment || "",
      applicationDate: new Date(applicationDate).toISOString(),
      applicationStatus,
    };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload);

        setForm({
          userId: "",
          jobId: "",
          attachment: "",
          applicationDate: "",
          applicationStatus: "Pending",
        });
        setEditingId(null);
        fetchApplications();
      } else {
        setError(
          "Creating new applications is not available. You can only update existing applications."
        );
        return;
      }
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      let errMsg = "Failed to update application.";
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
    if (!window.confirm("Are you sure you want to delete this application?")) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchApplications();
    } catch {
      setError("Failed to delete application.");
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d)) return "";
    const pad = (n) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const handleEdit = (application) => {
    setForm({
      userId: application.userId?.toString() || "",
      jobId: application.jobId?.toString() || "",
      attachment: application.attachment || "",
      applicationDate: formatDateForInput(application.applicationDate),
      applicationStatus: application.applicationStatus || "Pending",
    });
    setEditingId(application.applicationId);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({
      userId: "",
      jobId: "",
      attachment: "",
      applicationDate: "",
      applicationStatus: "Pending",
    });
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status?.toLowerCase()) {
      case "accepted":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "rejected":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "under review":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <main className="space-y-6">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Application Management Center
        </h1>
        <p className="text-blue-100">
          Review, update, and manage existing job applications
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

      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <header>
          <h2 className="text-lg font-semibold mb-4">
            {editingId
              ? "Update Application Details"
              : "Select an Application to Update"}
          </h2>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!editingId && (
            <aside className="text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-200">
              📋 Select an application from the list below to update its details
              or status.
            </aside>
          )}

          <fieldset className="space-y-4" disabled={!editingId}>
            <legend className="sr-only">Application Details</legend>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-1 block">
                User ID *
              </span>
              <input
                type="number"
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter user ID"
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
                ID of the user who submitted this application
              </small>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-1 block">
                Position ID *
              </span>
              <input
                type="number"
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter job/position ID"
                value={form.jobId}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, jobId: e.target.value }))
                }
                required
                aria-describedby="jobId-help"
              />
              <small
                id="jobId-help"
                className="text-gray-500 text-xs mt-1 block"
              >
                Reference ID of the position being applied for
              </small>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-1 block">
                Attachment
              </span>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Resume or document attachment information"
                value={form.attachment}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, attachment: e.target.value }))
                }
                aria-describedby="attachment-help"
              />
              <small
                id="attachment-help"
                className="text-gray-500 text-xs mt-1 block"
              >
                Information about attached documents or files
              </small>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-1 block">
                Application Date *
              </span>
              <input
                type="datetime-local"
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={form.applicationDate}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    applicationDate: e.target.value,
                  }))
                }
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-1 block">
                Application Status
              </span>
              <select
                className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={form.applicationStatus}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    applicationStatus: e.target.value,
                  }))
                }
              >
                <option value="Pending">Pending Review</option>
                <option value="Under Review">Under Review</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </label>
          </fieldset>

          <footer className="flex items-center gap-3 pt-4">
            {editingId ? (
              <section className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Update Application
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 font-medium transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel Changes
                </button>
              </section>
            ) : (
              <aside className="text-gray-500 italic">
                Select an application from the list below to enable editing
              </aside>
            )}
          </footer>
        </form>
      </section>

      <section className="bg-white rounded-lg shadow-sm border border-gray-200">
        <header className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            Application Pipeline ({applications.length})
          </h2>
        </header>

        {loading ? (
          <p
            className="p-6 text-center text-gray-500"
            role="status"
            aria-live="polite"
          >
            Loading applications...
          </p>
        ) : applications.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            No applications found in the system.
          </p>
        ) : (
          <ul className="grid gap-4 p-6" role="list">
            {applications.map((app) => (
              <li
                key={app.applicationId}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <article>
                  <header className="flex justify-between items-start mb-3">
                    <hgroup>
                      <h3 className="font-semibold text-lg text-gray-900">
                        Application #{app.applicationId}
                      </h3>
                      <p className="text-sm text-gray-600">
                        User ID: {app.userId} | Position ID: {app.jobId}
                      </p>
                      {app.attachment && (
                        <p className="text-sm text-gray-600">
                          Attachment: {app.attachment}
                        </p>
                      )}
                    </hgroup>

                    <menu className="flex gap-2 items-center">
                      <li>
                        <span className={getStatusBadge(app.applicationStatus)}>
                          {app.applicationStatus || "Pending"}
                        </span>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleEdit(app)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                          aria-label={`Edit application ${app.applicationId}`}
                        >
                          Review
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleDelete(app.applicationId)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 rounded hover:bg-red-50 transition-colors"
                          aria-label={`Delete application ${app.applicationId}`}
                        >
                          Remove
                        </button>
                      </li>
                    </menu>
                  </header>

                  <footer className="text-sm text-gray-600">
                    <time dateTime={app.applicationDate}>
                      Submitted:{" "}
                      {new Date(app.applicationDate).toLocaleString()}
                    </time>
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

export default ApplicationOrders;
