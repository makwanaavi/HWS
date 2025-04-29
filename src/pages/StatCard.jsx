import React, { useState, useEffect } from "react";

// StatCard and MiniCard components as they are
const StatCard = ({ title, value, color }) => (
  <div className="rounded-xl shadow-sm p-4 bg-white flex flex-col items-center">
    <h2 className="text-sm font-medium text-gray-600">{title}</h2>
    <div className={`text-3xl font-bold mt-2 ${color}`}>{value}</div>
  </div>
);

const MiniCard = ({ title, value }) => (
  <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
    <div className="bg-gray-50 p-2 text-sm font-semibold text-gray-600">{title}</div>
    <div className="p-3 text-center text-blue-600 font-medium text-lg">{value}</div>
  </div>
);

export default function Dashboard({ organizationId }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from both APIs concurrently
        const [dashboardResponse, additionalResponse] = await Promise.all([
          fetch(
            `https://api-uat.healthwealthsafe.link/api/getPhysicianDashboardTablesCount?organizationId=${organizationId}`
          ),
          fetch(
            `https://api-uat.healthwealthsafe.link/api/getDashboardCounts?organizationId=${organizationId}`
          ),
        ]);

        const dashboardData = await dashboardResponse.json();
        const additionalData = await additionalResponse.json();

        setDashboardData(dashboardData); // Data from first API
        setAdditionalData(additionalData); // Data from second API
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [organizationId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Population" value={dashboardData?.totalPopulation || "0"} color="text-blue-500" />
        <StatCard title="Escalation" value={dashboardData?.escalationsTotal || "0"} color="text-red-500" />
        <StatCard title="Needs Attention" value={dashboardData?.needsAttention || "0"} color="text-yellow-500" />
        <StatCard title="Patient Engagement" value={dashboardData?.patientEngagement || "0"} color="text-green-500" />
      </div>

      <div className="rounded-xl shadow-sm p-4 bg-white">
        <div className="flex flex-wrap gap-4 mb-4">
          <select className="p-2 border rounded-lg text-sm w-full sm:w-auto">
            <option>All Care Manager</option>
          </select>
          <select className="p-2 border rounded-lg text-sm w-full sm:w-auto">
            <option>All Clinic</option>
          </select>
        </div>

        <div className="border-b border-gray-200 mb-4">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 cursor-pointer">
            Activity
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 ml-2 cursor-pointer hover:text-blue-600">
            Health & Engagement
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="text-blue-700 font-semibold mb-3">Patient Statistics</h3>
            <div className="grid grid-cols-1 gap-3">
              <MiniCard title="Total Population" value={dashboardData?.totalPopulation || "0"} />
              <MiniCard title="Active Population" value={dashboardData?.activePopulation || "0"} />
              <MiniCard title="Archived Population" value={dashboardData?.archivedPopulation || "0"} />
            </div>
          </div>

          <div className="bg-red-50 rounded-xl p-4">
            <h3 className="text-red-600 font-semibold mb-3">Escalations (Previous 30 Days)</h3>
            <div className="grid grid-cols-1 gap-3">
              <MiniCard title="Total" value={dashboardData?.escalationsTotal || "0"} />
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="text-blue-700 font-semibold mb-3">Practice Follow Up</h3>
            <div className="grid grid-cols-1 gap-3">
              <MiniCard title="Total (Registered)" value={dashboardData?.practiceFollowUpRegistered || "0"} />
              <MiniCard title="Total (Registered-EMR)" value={dashboardData?.practiceFollowUpEmr || "0"} />
              <MiniCard title="Discuss" value={dashboardData?.practiceFollowUpDiscuss || "0"} />
            </div>
          </div>
        </div>
      </div>

      {/* Second API Data */}
      <div className="rounded-xl shadow-sm p-4 bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard title="Population" value={additionalData?.totalPopulation || "0"} color="text-blue-500" />
          <StatCard title="Escalation" value={additionalData?.escalationsTotal || "0"} color="text-red-500" />
          <StatCard title="Needs Attention" value={additionalData?.needsAttention || "0"} color="text-yellow-500" />
          <StatCard title="Patient Engagement" value={additionalData?.patientEngagement || "0"} color="text-green-500" />
        </div>
      </div>

      <div className="rounded-xl shadow-sm p-4 bg-white">
        <h3 className="text-gray-700 font-semibold mb-3">Global Search</h3>
        <input
          placeholder="Search By Name"
          className="w-full p-2 border rounded-lg mb-3 text-sm"
        />
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
          {[ 
            "04-01-2025 (rtm-billing)", 
            "display configuration (device-utilization)", 
            // ... other tags
          ].map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 px-3 py-1 text-xs rounded-full border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
