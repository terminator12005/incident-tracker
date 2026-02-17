import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchIncident();
  }, [id]);

  const fetchIncident = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/incidents/${id}`
      );

      if (!response.ok) throw new Error("Failed to fetch incident");

      const data = await response.json();
      setIncident(data);
    } catch (error) {
      console.error(error);
      alert("Error loading incident");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    if (incident.status === newStatus) return;

    setUpdating(true);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:8081/api/incidents/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      const updated = await response.json();
      setIncident(updated);
      setMessage("Status updated successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Incident not found
      </div>
    );
  }

  const formatDate = (date) =>
    new Date(date).toLocaleString();

  const statusButtonStyle = (value) =>
    incident.status === value
      ? "bg-black text-white"
      : "bg-gray-200 hover:bg-gray-300";

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

        <button
          onClick={() => navigate("/")}
          className="text-blue-600 mb-6"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-semibold mb-4">
          {incident.title}
        </h1>

        <div className="space-y-3 text-sm">

          <p><strong>Service:</strong> {incident.service}</p>
          <p><strong>Status:</strong> {incident.status}</p>
          <p><strong>Severity:</strong> {incident.severity}</p>
          <p><strong>Owner:</strong> {incident.owner || "N/A"}</p>
          <p><strong>Summary:</strong> {incident.summary || "No summary provided"}</p>

          <p className="text-gray-500">
            Created: {formatDate(incident.createdAt)}
          </p>

          <p className="text-gray-500">
            Last Updated: {formatDate(incident.updatedAt)}
          </p>
        </div>

        {/* Update Status */}
        <div className="mt-8">
          <h2 className="font-semibold mb-3">Update Status</h2>

          <div className="flex gap-4">
            {["OPEN", "MITIGATED", "RESOLVED"].map((status) => (
              <button
                key={status}
                disabled={updating || incident.status === status}
                onClick={() => updateStatus(status)}
                className={`px-4 py-2 rounded-lg transition ${statusButtonStyle(
                  status
                )} disabled:opacity-50`}
              >
                {status}
              </button>
            ))}
          </div>

          {message && (
            <div className="mt-4 text-green-600 text-sm">
              {message}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
