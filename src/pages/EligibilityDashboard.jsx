import React, { useEffect, useState } from "react";

const EligibilityDashboard = () => {
  const [dashboardCounts, setDashboardCounts] = useState({
    populationDashboard: 0,
    escalationDashboard: 0,
    needAttentionDashboard: 0,
    engagementDashboard: 0,
  });

  useEffect(() => {
    fetch("https://api-uat.healthwealthsafe.link/api/getDashboardCounts")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.data) {
          setDashboardCounts({
            populationDashboard: data.data.populationDashboard || 0,
            escalationDashboard: data.data.escalationDashboard || 0,
            needAttentionDashboard: data.data.needAttentionDashboard || 0,
            engagementDashboard: data.data.engagementDashboard || 0,
          });
        }
      })
      .catch((err) => {
        console.error("Dashboard data fetch failed:", err);
      });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Main Content */}
      <div className="w-full lg:w-3/4 bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Care Manager
              </label>
              <select className="w-full p-2 border rounded-lg text-sm">
                <option>Hardik Bipinbhai Navigator</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Clinic</label>
              <select className="w-full p-2 border rounded-lg text-sm">
                <option>All Clinic</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-6 text-sm font-semibold border-b min-w-max">
              {[
                "Eligibility",
                "Population",
                "RPM",
                "CCM",
                "RTM",
                "Engagement",
                "Others",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 px-1 border-b-2 ${
                    tab === "Eligibility"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Complete Information",
              "Pending Review - Commercial",
              "Pending Review - Medicare",
              "Pending Review - Medicaid",
              "Pending Review - Other",
              "Reviewed",
              "Total Eligible",
            ].map((item) => (
              <div
                key={item}
                className="bg-purple-50 p-4 rounded-lg shadow-sm text-center"
              >
                <p className="text-blue-500 text-xs mb-2">{item}</p>
                <p className="text-xl font-bold">0</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Stats */}
      <div className="w-full lg:w-1/4 flex flex-col gap-4">
        {[
          {
            label: "Population",
            value: dashboardCounts.populationDashboard,
            color: "text-blue-500",
          },
          {
            label: "Escalation",
            value: dashboardCounts.escalationDashboard,
            color: "text-red-500",
          },
          {
            label: "Needs Attention",
            value: dashboardCounts.needAttentionDashboard,
            color: "text-yellow-500",
          },
          {
            label: "Patient Engagement",
            value: dashboardCounts.engagementDashboard,
            color: "text-green-500",
          },
        ].map(({ label, value, color, imgSrc }) => (
          <div
            key={label}
            className="bg-white rounded-lg shadow-sm p-4 text-center"
          >
            <p className="text-gray-700 text-sm font-semibold">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm font-semibold mb-2">Global Search</p>
          <input
            type="text"
            placeholder="Search By Name"
            className="w-full p-2 border rounded-lg mb-2 text-sm"
          />
          <div className="flex flex-wrap gap-2">
            {[
              "04-01-2025 (rtm-billing)",
              "display configuration (device-utilization)",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-200 rounded-full px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityDashboard;
