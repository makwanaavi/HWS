import React, { useState, useEffect } from "react";

const tabs = ["General Metrics", "Call Distribution", "Missed Calls", "Voice Mails", "Call Feedback"];

const MetricCard = ({ title, data }) => {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <div className="bg-blue-100 px-4 py-3 font-semibold text-blue-800 text-sm">{title}</div>
      <div className="divide-y divide-gray-200">
        {data.map((item, index) => (
          <div key={index} className="px-4 py-3 flex justify-between text-sm">
            <span className="text-gray-700">{item.label}</span>
            <span className={`font-medium ${item.valueClass || ""}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SimpleCard = ({ title }) => {
  return (
    <div className="bg-blue-100 text-blue-700 font-semibold px-4 py-3 rounded-lg shadow-sm text-sm">
      {title}
    </div>
  );
};

export default function CallDashboard() {
  const [activeTab, setActiveTab] = useState("General Metrics");
  const [callData, setCallData] = useState(null);

  useEffect(() => {
    fetch("https://api-uat.healthwealthsafe.link/api/getIncomingCallDetails?fromDate=2025-03-24&toDate=2025-04-24&callType=all")
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.status === "success" && resData?.total_details?.length > 0) {
          setCallData(resData.total_details[0]);
        }
      })
      .catch((error) => {
        console.error("API fetch error:", error);
      });
  }, []);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">From Date</label>
          <input type="date" className="border p-2 rounded-lg w-full text-sm" defaultValue="2025-03-24" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To Date</label>
          <input type="date" className="border p-2 rounded-lg w-full text-sm" defaultValue="2025-04-24" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Call Type</label>
          <select className="border p-2 rounded-lg w-full text-sm">
            <option>All Call Type</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto">
        <div className="flex border-b space-x-4 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 text-sm ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      {activeTab === "General Metrics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <MetricCard
            title="Incoming Calls"
            data={[
              { label: "Total Incoming Calls", value: callData?.total_incoming_calls || "0" },
              { label: "Total Bounced Calls", value: callData?.incoming_bounced_calls || "0" },
              { label: "Call Completed By Transfer", value: callData?.call_completed_transfer || "0" },
            ]}
          />

          <MetricCard
            title="Outgoing Calls"
            data={[
              { label: "Total Outgoing Calls", value: callData?.total_outgoing_calls || "0" },
            ]}
          />

          <MetricCard
            title="Call Rating"
            data={[
              { label: "Total Call Ratings", value: callData?.total_call_ratings || "0" },
              { label: "Average Call Rating", value: callData?.average_call_rating ?? "0" },
            ]}
          />

          <MetricCard
            title="Pickup Time"
            data={[
              {
                label: "Average Pickup Time (hh:mm:ss)",
                value: callData?.avg_pickup_time_seconds || "00:00:00",
                valueClass: "text-blue-500",
              },
            ]}
          />

          <SimpleCard title="Average Handle Time" />
          <SimpleCard title="Occupancy Rate" />
          <SimpleCard title="Call Abandonment Rate" />
        </div>
      )}
    </div>
  );
}
