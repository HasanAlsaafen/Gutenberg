import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://gutenberg-server-production.up.railway.app/api/Application";

const ApplicationOrders = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    userId: "",
    jobId: "",
    attachment: "",
    applicationDate: "",
  });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
                        Position ID: {app.jobId}
                      </p>
                      {app.attachment && (
                        <p className="text-sm text-gray-600">
                          Attachment:
                          <iframe
                            src={app.attachment}
                            width="100%"
                            height="600px"
                            title="PDF Viewer"
                          />
                        </p>
                      )}
                    </hgroup>

                    <menu className="flex gap-2 items-center">
                      <li></li>
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
