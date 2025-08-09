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
    attachment: null, // store File object
    applicationDate: "",
  });
  const [attachmentUrl, setAttachmentUrl] = useState("");
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

    // Validate file size (max 2MB)
    if (attachment && attachment.size > 2 * 1024 * 1024) {
      setError("Attachment file size must be less than 2MB.");
      return;
    }

    try {
      if (editingId) {
        const formData = new FormData();
        formData.append("applicationId", editingId);
        formData.append("userId", parsedUserId);
        formData.append("jobId", parsedJobId);
        formData.append(
          "applicationDate",
          new Date(applicationDate).toISOString()
        );
        formData.append("applicationStatus", applicationStatus || "Pending");
        if (attachment) {
          formData.append("attachment", attachment);
        }

        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setForm({
          userId: "",
          jobId: "",
          attachment: null,
          applicationDate: "",
          applicationStatus: "Pending",
        });
        setAttachmentUrl("");
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

      {/* Edit Form for updating application (attachment upload) */}
      {editingId && (
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
          <h2 className="text-lg font-semibold mb-4">Edit Application</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">User ID</label>
              <input
                type="text"
                value={form.userId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, userId: e.target.value }))
                }
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Job ID</label>
              <input
                type="text"
                value={form.jobId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, jobId: e.target.value }))
                }
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Application Date</label>
              <input
                type="date"
                value={form.applicationDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, applicationDate: e.target.value }))
                }
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Attachment (PDF, max 2MB)
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.size > 2 * 1024 * 1024) {
                    setError("Attachment file size must be less than 2MB.");
                  } else {
                    setError("");
                    setForm((f) => ({ ...f, attachment: file }));
                    setAttachmentUrl(file ? URL.createObjectURL(file) : "");
                  }
                }}
                className="border rounded px-3 py-2 w-full"
              />
              {attachmentUrl && (
                <iframe
                  src={attachmentUrl}
                  width="100%"
                  height="200px"
                  title="Attachment Preview"
                  className="mt-2 border"
                />
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
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
                      {app.attachment &&
                        (() => {
                          try {
                            // Remove any prefix like "data:application/pdf;base64,"
                            const base64Data = app.attachment.split(",").pop();
                            const byteCharacters = atob(base64Data);
                            const byteNumbers = new Array(
                              byteCharacters.length
                            );
                            for (let i = 0; i < byteCharacters.length; i++) {
                              byteNumbers[i] = byteCharacters.charCodeAt(i);
                            }
                            const byteArray = new Uint8Array(byteNumbers);
                            const blob = new Blob([byteArray], {
                              type: "application/pdf",
                            });
                            const blobUrl = URL.createObjectURL(blob);

                            const handleViewFullCV = () => {
                              window.open(blobUrl, "_blank");
                            };

                            return (
                              <p className="text-sm text-gray-600">
                                Attachment:
                                <iframe
                                  src={blobUrl}
                                  width="100%"
                                  height="600px"
                                  title="PDF Viewer"
                                  className="mb-2"
                                />
                                <button
                                  type="button"
                                  onClick={handleViewFullCV}
                                  className="mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white text-xs font-semibold py-1 px-3 rounded"
                                >
                                  View Full CV
                                </button>
                              </p>
                            );
                          } catch (e) {
                            console.error("Invalid PDF data", e);
                            return (
                              <p className="text-red-500">
                                Invalid PDF attachment.
                              </p>
                            );
                          }
                        })()}
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
