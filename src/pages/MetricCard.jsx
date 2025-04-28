import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

// MetricCard Component
const MetricCard = ({ title, items, total, color, isLoading }) => {
  const gradientMap = {
    "bg-amber-50": "from-amber-50 to-amber-100",
    "bg-indigo-100": "from-indigo-100 to-indigo-200",
    "bg-pink-100": "from-pink-100 to-pink-200",
    "bg-teal-100": "from-teal-100 to-teal-200",
  };

  return (
    <div
      className={` shadow-lg p-6 bg-gradient-to-br ${
        gradientMap[color] || "from-gray-50 to-gray-100"
      } 
      max-h-[300px] overflow-y-auto transition-all duration-300  hover:shadow-xl`}
    >
      <h2
        className="font-bold text-xl mb-4 text-gray-800 border-b border-gray-200/50 pb-2
        flex items-center justify-between"
      >
        {title}
        {isLoading && <FaSpinner className=" text-gray-400" />}
      </h2>

      {items ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 
                hover:bg-white/40 transition-colors"
            >
              <span className="text-gray-700">{item.name}</span>
              <span className="font-semibold bg-white/60 px-3 py-1 text-gray-800">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-4xl font-bold text-gray-800 text-center mt-4 ]">
          {total}
        </div>
      )}
    </div>
  );
};

// Dashboard Component
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        { name: "RPM,CCM and RTM", value: 0 },
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

  useEffect(() => {
    fetch(
      "https://api-uat.healthwealthsafe.link/api/getActionsByType?actionType"
    )
      .then((res) => res.json())
      .then((apiData) => {
        if (!Array.isArray(apiData)) {
          setData(fallbackData);
          setIsLoading(false);
          return;
        }

        const grouped = apiData.reduce((acc, curr) => {
          const { actionName, actionType, actionCount } = curr;

          const found = acc.find((item) => item.title === actionName);
          if (found && found.items) {
            found.items.push({ name: actionType, value: actionCount });
          } else {
            if (actionType) {
              acc.push({
                title: actionName,
                color: "bg-indigo-100",
                items: [{ name: actionType, value: actionCount }],
              });
            } else {
              acc.push({
                title: actionName,
                color: "bg-indigo-100",
                total: actionCount,
              });
            }
          }
          return acc;
        }, []);

        setData(grouped);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data from API, using fallback:", err);
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
}
