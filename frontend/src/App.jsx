import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import IncidentDetail from "./pages/IncidentDetail";
import CreateIncident from "./pages/CreateIncident";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/incidents/:id" element={<IncidentDetail />} />
      <Route path="/create" element={<CreateIncident />} />
    </Routes>
  );
}

export default App;
