import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

// Simple Card component to show each box
const MetricCard = ({ title, items, total, color, isLoading }) => {
  // Background color settings
  const backgroundColors = {
    "bg-amber-50": "from-amber-50 to-amber-100",
    "bg-indigo-100": "from-indigo-100 to-indigo-200",
    "bg-pink-100": "from-pink-100 to-pink-200",
    "bg-teal-100": "from-teal-100 to-teal-200",
  };

  return (
    <div
      className={`shadow-lg p-6 bg-gradient-to-br ${backgroundColors[color] || "from-gray-50 to-gray-100"} 
      max-h-[300px] overflow-y-auto transition-all duration-300 hover:shadow-xl`}
    >
      {/* Title */}
      <h2 className="font-bold text-xl mb-4 text-gray-800 border-b border-gray-200/50 pb-2 flex items-center justify-between">
        {title}
        {/* Loading spinner */}
        {isLoading && <FaSpinner className="text-gray-400 animate-spin" />}
      </h2>

      {/* List of items */}
      {items ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center p-2 hover:bg-white/40 transition">
              <span className="text-gray-700">{item.name}</span>
              <span className="font-semibold bg-white/60 px-3 py-1 text-gray-800">{item.value}</span>
            </li>
          ))}
        </ul>
      ) : (
        // If no items, show total number
        <div className="text-4xl font-bold text-gray-800 text-center mt-4">
          {total}
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [data, setData] = useState([]); // To store cards data
  const [isLoading, setIsLoading] = useState(true); // To show loading spinner

  // If API fails, use this default data
  const fallbackData = [
    {
      title: "Registration",
      color: "bg-amber-50",
      items: [
        { name: "RPM", value: 0 },
        { name: "CCM", value: 0 },
        { name: "RTM", value: 0 },
        { name: "RPM and CCM", value: 0 },
        { name: "RPM and RTM", value: 0 },
        { name: "RTM and CCM", value: 0 },
        { name: "RPM, CCM and RTM", value: 0 },
      ],
    },
    {
      title: "Call Complete",
      color: "bg-indigo-100",
      items: [
        { name: "RPM", value: 0 },
        { name: "CCM", value: 0 },
        { name: "RTM", value: 0 },
      ],
    },
    {
      title: "First Follow-up Complete",
      color: "bg-pink-100",
      items: [
        { name: "RPM", value: 0 },
        { name: "CCM", value: 0 },
        { name: "RTM", value: 0 },
      ],
    },
    {
      title: "First Follow-up Incomplete",
      color: "bg-teal-100",
      items: [
        { name: "RPM", value: 0 },
        { name: "CCM", value: 0 },
        { name: "RTM", value: 0 },
      ],
    },
    {
      title: "Call Incomplete",
      color: "bg-amber-50",
      items: [
        { name: "RPM", value: 0 },
        { name: "CCM", value: 0 },
        { name: "RTM", value: 0 },
      ],
    },
    {
      title: "Verbal Consent",
      color: "bg-indigo-100",
      total: 0,
    },
    {
      title: "Billing Entries Reviewed",
      color: "bg-pink-100",
      total: 0,
    },
    {
      title: "Incoming Calls Accepted",
      color: "bg-teal-100",
      total: 0,
    },
    {
      title: "Device Shipped",
      color: "bg-amber-50",
      total: 0,
    },
    {
      title: "Device Restocked",
      color: "bg-indigo-100",
      total: 0,
    },
  ];

  // Fetch data when page loads
  useEffect(() => {
    fetch("https://api-uat.healthwealthsafe.link/api/getActionsByType?actionType", {
      method: "GET",
      headers: {
        "Authorization":
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im42cmpHN3FOYkZyIiwiZW1haWwiOiJyYWplc2hAd295Y2UuaW8iLCJwaG9uZSI6IjkxNDAxNTAxNDQ4OCIsInVzZXJuYW1lIjoiaHJuIiwidHlwZSI6Im5hdmlnYXRvcl91c2VyIiwibmFtZSI6IiBIYXJkaWsgQmlwaW5iaGFpIE5hdmlnYXRvciIsInRpbWV6b25lIjoiQXNpYS9DYWxjdXR0YSIsInN1YlR5cGUiOiJuYXZpZ2F0b3JfdXNlciIsInR3aWxpb1dvcmtlck5hbWUiOiJocm4iLCJzcGFjZV9pZCI6MSwiaXAiOiI6OmZmZmY6NTIuMjA0LjEyMC4xNjciLCJpYXQiOjE3NDU0MTUxNTMsImV4cCI6MTkwMzA5NTE1M30.eX3ugoAgaeSurLd8GZcdLfjhbS-5tFxCOMEs9GZckHU",
      },
    })
      .then((res) => res.json())
      .then((apiData) => {
        // If API does not give list, use fallback data
        if (!Array.isArray(apiData)) {
          setData(fallbackData);
          setIsLoading(false);
          return;
        }

        // Group API data nicely
        const groupedData = apiData.reduce((groups, item) => {
          const { actionName, actionType, actionCount } = item;

          const existing = groups.find((g) => g.title === actionName);

          if (existing && existing.items) {
            existing.items.push({ name: actionType, value: actionCount });
          } else {
            if (actionType) {
              groups.push({
                title: actionName,
                color: "bg-indigo-100",
                items: [{ name: actionType, value: actionCount }],
              });
            } else {
              groups.push({
                title: actionName,
                color: "bg-indigo-100",
                total: actionCount,
              });
            }
          }
          return groups;
        }, []);

        setData(groupedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("API error, showing fallback data:", error);
        setData(fallbackData);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((section, index) => (
        <div key={index} className="overflow-hidden">
          <MetricCard
            title={section.title}
            items={section.items}
            total={section.total}
            color={section.color}
            isLoading={isLoading}
          />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
