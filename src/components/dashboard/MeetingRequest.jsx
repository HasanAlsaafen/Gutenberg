import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://gutenberg-server-production.up.railway.app";

function MeetingRequests() {
  const [reload, setReload] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/MeetingRequest`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setMeetings(response.data);
        } else {
          console.error("Invalid response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
      });
  }, [token, reload]);

  const updateStatus = (id, status) => {
    if (!id) {
      console.error("Invalid meeting ID:", id);
      return;
    }

    const meeting = meetings.find((m) => m.meetingId === id);

    if (!meeting) {
      console.error(`Meeting with ID ${id} not found.`);
      return;
    }

    const statusNumber =
      status === "Accepted" ? 2 : status === "Pending" ? 1 : 3;

    axios
      .put(
        `${BASE_URL}/api/MeetingRequest/${id}`,
        {
          meetingId: meeting.meetingId,
          name: meeting.name,
          email: meeting.email,
          topic: meeting.topic,
          preferredDate: meeting.preferredDate,
          meetingStatus: statusNumber,
          responseDate: meeting.responseDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setMeetings((prevMeetings) =>
          prevMeetings.map((m) =>
            m.meetingId === id ? { ...m, meetingStatus: statusNumber } : m
          )
        );
        setReload((reload) => !reload);
      })
      .catch((error) => {
        console.error("Error updating status:", error.response?.data || error);
      });
  };

  const deleteMeeting = (id) => {
    if (!id) {
      console.error("Invalid meeting ID:", id);
      return;
    }

    axios
      .delete(`${BASE_URL}/api/MeetingRequest/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setMeetings((prevMeetings) =>
          prevMeetings.filter((m) => m.meetingId !== id)
        );
        setReload((reload) => !reload);
      })
      .catch((error) => {
        console.error("Error deleting meeting:", error.response?.data || error);
      });
  };

  const getStatusText = (statusNumber) => {
    switch (statusNumber) {
      case 1:
        return "Pending";
      case 2:
        return "Accepted";
      case 3:
        return "Postponed";
      default:
        return "Unknown";
    }
  };

  return (
    <main className="meeting-requests p-6">
      <header>
        <h1 className="text-xl font-bold mb-4">Meeting Requests</h1>
      </header>

      {meetings.length > 0 ? (
        <section>
          <ul className="space-y-4">
            {meetings.map((meeting) => (
              <li
                key={meeting.meetingId}
                className="p-4 border rounded-md shadow-md bg-white flex justify-between items-center"
              >
                <article>
                  <h2 className="text-lg font-semibold">{meeting.topic}</h2>
                  <p className="text-sm text-gray-600">
                    <strong>Name:</strong> {meeting.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {meeting.email}
                  </p>
                  <time
                    className="text-sm text-gray-600"
                    dateTime={meeting.preferredDate}
                  >
                    <strong>Date:</strong>{" "}
                    {new Date(meeting.preferredDate).toLocaleDateString()}
                  </time>
                  <p className="text-sm text-gray-600">
                    <strong>Status:</strong>{" "}
                    {getStatusText(meeting.meetingStatus)}
                  </p>
                </article>

                <aside className="flex items-center gap-4">
                  <label
                    htmlFor={`status-${meeting.meetingId}`}
                    className="sr-only"
                  >
                    Change meeting status
                  </label>
                  <select
                    id={`status-${meeting.meetingId}`}
                    value={getStatusText(meeting.meetingStatus)}
                    onChange={(e) =>
                      updateStatus(meeting.meetingId, e.target.value)
                    }
                    className="border rounded-md px-2 py-1"
                    aria-label={`Change status for ${meeting.topic}`}
                  >
                    <option value="Accepted">Accepted</option>
                    <option value="Pending">Pending</option>
                    <option value="Postponed">Postponed</option>
                  </select>

                  <button
                    onClick={() => deleteMeeting(meeting.meetingId)}
                    className="text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50"
                    aria-label={`Delete meeting: ${meeting.topic}`}
                    type="button"
                  >
                    Delete
                  </button>
                </aside>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section>
          <p className="text-center text-gray-500">
            No meeting requests found.
          </p>
        </section>
      )}
    </main>
  );
}

export default MeetingRequests;
