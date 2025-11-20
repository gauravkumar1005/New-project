import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const MyAgents = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Agents
  const loadAgents = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/agents/`);
      setAgents(response.data);
    } catch (error) {
      console.error("Error loading agents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  // Delete Agent
  const deleteAgent = async (id) => {
    if (!confirm("Are you sure you want to delete this agent?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/agents/${id}`);
      setAgents(agents.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  return (
    <MainLayout>
      <div className="px-6 py-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Management</h1>
            <p className="text-gray-600 mt-1">Manage your AI agents</p>
          </div>

          <button
            onClick={() => navigate("/create-agents")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-lg shadow"
          >
            + New Agent
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20 text-gray-500">Loading agents...</div>
        )}

        {/* No Agents */}
        {!loading && agents.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-24 border rounded-xl bg-white shadow-sm">
            <div className="text-gray-400 text-6xl mb-4">🖥️</div>
            <h2 className="text-xl font-semibold text-gray-800">No agents found</h2>
            <p className="text-gray-500 mb-6">Get started by creating your first AI agent.</p>

            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-lg shadow"
              onClick={() => navigate("/create-agents")}
            >
              + New Agent
            </button>
          </div>
        )}

        {/* Agents Table */}
        {agents.length > 0 && (
          <div className="overflow-x-auto bg-white shadow rounded-xl p-5">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {agents.map((agent) => (
                  <tr key={agent._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{agent.name}</td>
                    <td className="py-3 px-4">{agent.agentType}</td>
                    <td className="py-3 px-4">{agent.phone || "—"}</td>
                    <td className="py-3 px-4">
                      {agent.enabled ? (
                        <span className="text-green-600 font-medium">Enabled</span>
                      ) : (
                        <span className="text-red-500 font-medium">Disabled</span>
                      )}
                    </td>

                    <td className="py-3 px-4 flex gap-3">
                      {/* Edit */}
                      <button
                        className="px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                        onClick={() => navigate(`/edit-agent/${agent._id}`)}
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded-md"
                        onClick={() => deleteAgent(agent._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default MyAgents;
