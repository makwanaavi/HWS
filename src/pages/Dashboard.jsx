import React, { useState } from "react";
import Navbar from "./Navbar";
import Navbar1 from "./Navbar1";
import UserProfileCard from "./UserProfileCard";
import MetricCard from "./MetricCard";
import StatCard from "./StatCard";
import EligibilityDashboard from "./EligibilityDashboard";
import CallDashboard from "./CallDashboard";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("activity");

  const tabs = [
    { key: "activity", label: "Activity", className: "cursor-pointer" },    
    {
      key: "health",
      label: "Health & Engagement",
      className: "cursor-pointer",
    },
    {
      key: "live",
      label: "Live Health & Engagement",
      className: "cursor-pointer",
    },
    { key: "call", label: "Call Center", className: "cursor-pointer" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "activity":
        return (
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <MetricCard />
          </section>
        );
      case "health":
        return (
          <section>
            <h2 className="text-xl font-semibold mb-4">Health & Engagement</h2>
            <StatCard />
          </section>
        );
      case "live":
        return (
          <section>
            <h2 className="text-xl font-semibold mb-4 ">
              Live Engagement Data
            </h2>
            <EligibilityDashboard />
          </section>
        );
      case "call":
        return (
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Call Center Dashboard
            </h2>
            <CallDashboard />
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />
      <Navbar1 />

      {/* Content */}
      <main className="p-4 md:p-6 space-y-4 md:space-y-6">
        <UserProfileCard />

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 mt-4 md:mt-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-2 text-xs md:text-sm md:px-4 md:py-2 rounded-md font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4 md:mt-6 bg-white p-4 md:p-6 rounded-lg shadow-sm overflow-x-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
