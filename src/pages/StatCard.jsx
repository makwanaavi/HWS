import React, { useState, useEffect } from "react";
import axios from "axios"; 

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

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

export default function Dashboard({ organizationId }) {
  const [state, setState] = useState({
    dashboardData: null,
    additionalData: null,
    loading: true,
    error: null
  });

  const API_BASE_URL = "https://api-uat.healthwealthsafe.link/api";

  const fetchDashboardData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yourAuthToken}`
      };

      const [dashboardResponse, additionalResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/getPhysicianDashboardTablesCount`, {
          params: { organizationId },
          headers
        }),
        axios.get(`${API_BASE_URL}/getDashboardCounts`, {
          params: { organizationId },
          headers
        })
      ]);

      setState({
        dashboardData: dashboardResponse.data,
        additionalData: additionalResponse.data,
        loading: false,
        error: null
      });

    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch dashboard data'
      }));
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    if (organizationId) {
      fetchDashboardData();
    }
  }, [organizationId]);

  const handleRetry = () => {
    fetchDashboardData();
  };

  if (state.loading) return <LoadingSpinner />;

  if (state.error) {
    return (
      <div className="text-center p-4">
        <div className="text-red-500 mb-4">Error: {state.error}</div>
        <button 
          onClick={handleRetry}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const { dashboardData, additionalData } = state;

  return (
    <div className="space-y-6">
      {/* First Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard 
          title="Population" 
          value={dashboardData?.totalPopulation || "0"} 
          color="text-blue-500" 
        />
        <StatCard 
          title="Escalation" 
          value={dashboardData?.escalationsTotal || "0"} 
          color="text-red-500" 
        />
        <StatCard 
          title="Needs Attention" 
          value={dashboardData?.needsAttention || "0"} 
          color="text-yellow-500" 
        />
        <StatCard 
          title="Patient Engagement" 
          value={dashboardData?.patientEngagement || "0"} 
          color="text-green-500" 
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="rounded-xl shadow-sm p-4 bg-white">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <select className="p-2 border rounded-lg text-sm w-full sm:w-auto">
            <option>All Care Manager</option>
          </select>
          <select className="p-2 border rounded-lg text-sm w-full sm:w-auto">
            <option>All Clinic</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-4">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
            Activity
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 ml-2 hover:text-blue-600">
            Health & Engagement
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Patient Statistics */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="text-blue-700 font-semibold mb-3">Patient Statistics</h3>
            <div className="grid grid-cols-1 gap-3">
              <MiniCard 
                title="Total Population" 
                value={dashboardData?.totalPopulation || "0"} 
              />
              <MiniCard 
                title="Active Population" 
                value={dashboardData?.activePopulation || "0"} 
              />
              <MiniCard 
                title="Archived Population" 
                value={dashboardData?.archivedPopulation || "0"} 
              />
            </div>
          </div>

          {/* Additional cards... */}
        </div>
      </div>
    </div>
  );
}
