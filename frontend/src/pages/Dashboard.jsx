import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [incidents, setIncidents] = useState([]);
  const [stats, setStats] = useState(null);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("");
  const [direction, setDirection] = useState("desc");

  const [loading, setLoading] = useState(false);
  const size = 5;

  useEffect(() => {
    fetchIncidents();
    fetchStats();
  }, [page, status, severity, direction]);

  const fetchIncidents = async () => {
    setLoading(true);

    const params = new URLSearchParams({
      page,
      size,
      sortBy: "createdAt",
      direction,
    });

    if (status) params.append("status", status);
    if (severity) params.append("severity", severity);
    if (search) params.append("search", search);

    try {
      const response = await fetch(
        `http://localhost:8081/api/incidents?${params.toString()}`
      );

      if (!response.ok) throw new Error("Failed to fetch incidents");

      const data = await response.json();

      setIncidents(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.error(error);
      alert("Error loading incidents");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/incidents/stats"
      );

      if (!response.ok) throw new Error("Failed to fetch stats");

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    setPage(0);
    fetchIncidents();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">
            Incident Tracker Dashboard
          </h1>

          <button
            onClick={() => navigate("/create")}
            className="px-5 py-2 bg-black text-white rounded-lg hover:opacity-90"
          >
            + Create Incident
          </button>
        </div>

        {/* Stats Summary */}
        {stats && (
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Open</p>
              <p className="text-xl font-semibold">
                {stats.OPEN}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Mitigated</p>
              <p className="text-xl font-semibold">
                {stats.MITIGATED}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Resolved</p>
              <p className="text-xl font-semibold">
                {stats.RESOLVED}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">SEV1</p>
              <p className="text-xl font-semibold">
                {stats.SEV1}
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-wrap gap-4 items-center">

          <input
            type="text"
            placeholder="Search by title or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-52"
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(0);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Status</option>
            <option value="OPEN">OPEN</option>
            <option value="MITIGATED">MITIGATED</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>

          <select
            value={severity}
            onChange={(e) => {
              setSeverity(e.target.value);
              setPage(0);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Severity</option>
            <option value="SEV1">SEV1</option>
            <option value="SEV2">SEV2</option>
            <option value="SEV3">SEV3</option>
            <option value="SEV4">SEV4</option>
          </select>

          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>

          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm"
          >
            Search
          </button>

          <div className="ml-auto text-sm text-gray-500">
            Total: {totalElements}
          </div>
        </div>

        {/* Incident List */}
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : incidents.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm text-center text-gray-500">
            No incidents found.
          </div>
        ) : (
          <div className="space-y-6">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                onClick={() => navigate(`/incidents/${incident.id}`)}
                className="bg-white p-6 rounded-xl shadow-sm border flex justify-between cursor-pointer hover:shadow-md transition"
              >
                <div>
                  <h2 className="text-lg font-semibold mb-2">
                    {incident.title}
                  </h2>

                  <p className="text-sm text-gray-600">
                    Service: {incident.service}
                  </p>

                  <p className="text-sm">
                    Status: <strong>{incident.status}</strong>
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200">
                  {incident.severity}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() =>
              setPage((prev) =>
                prev < totalPages - 1 ? prev + 1 : prev
              )
            }
            disabled={page >= totalPages - 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}
