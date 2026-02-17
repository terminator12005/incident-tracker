import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateIncident() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [service, setService] = useState("");
  const [severity, setSeverity] = useState("SEV1");
  const [owner, setOwner] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !service || !severity) {
      alert("Title, Service and Severity are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/incidents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            service,
            severity,
            owner,
            summary,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create incident");
      }

      await response.json();

      navigate("/");
    } catch (error) {
      console.error("Error creating incident:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-6">
          Create New Incident
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Title"
            className="w-full border rounded-lg px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Service"
            className="w-full border rounded-lg px-3 py-2"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />

          <select
            className="w-full border rounded-lg px-3 py-2"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="SEV1">SEV1</option>
            <option value="SEV2">SEV2</option>
            <option value="SEV3">SEV3</option>
            <option value="SEV4">SEV4</option>
          </select>

          <input
            type="text"
            placeholder="Owner"
            className="w-full border rounded-lg px-3 py-2"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />

          <textarea
            placeholder="Summary"
            className="w-full border rounded-lg px-3 py-2"
            rows="4"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <div className="flex justify-between items-center">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-black text-white rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Incident"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
