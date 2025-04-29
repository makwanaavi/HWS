import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const MetricCard = ({ title, items, total, color, isLoading }) => {
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
      <h2 className="font-bold text-xl mb-4 text-gray-800 border-b border-gray-200/50 pb-2 flex items-center justify-between">
        {title}
        {isLoading && <FaSpinner className="text-gray-400 animate-spin" />}
      </h2>

      {items ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 hover:bg-white/40 transition"
            >
              <span className="text-gray-700">{item.name}</span>
              <span className="font-semibold bg-white/60 px-3 py-1 text-gray-800">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-4xl font-bold text-gray-800 text-center mt-4">
          {total}
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://api.example.com/dashboard-data", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im42cmpHN3FOYkZyIiwiZW1haWwiOiJyYWplc2hAd295Y2UuaW8iLCJwaG9uZSI6IjkxNDAxNTAxNDQ4OCIsInVzZXJuYW1lIjoiaHJuIiwidHlwZSI6Im5hdmlnYXRvcl91c2VyIiwibmFtZSI6IiBIYXJkaWsgQmlwaW5iaGFpIE5hdmlnYXRvciIsInRpbWV6b25lIjoiQXNpYS9DYWxjdXR0YSIsInN1YlR5cGUiOiJuYXZpZ2F0b3JfdXNlciIsInR3aWxpb1dvcmtlck5hbWUiOiJocm4iLCJzcGFjZV9pZCI6MSwiaXAiOiI6OmZmZmY6NTIuMjA0LjEyMC4xNjciLCJpYXQiOjE3NDU5MDg3MzAsImV4cCI6MTkwMzU4ODczMH0.EDuHsNG5J-Aru4P38u1b-cahqRcJkyxC_ebgTcC6MhY`,
          },
        });

        setData(response.data);
      } catch (error) {
        console.error("API fetch failed, using fallback data", error);
        setData(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {data.map((card, idx) => (
        <MetricCard
          key={idx}
          title={card.title}
          color={card.color}
          items={card.items}
          total={card.total}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default Dashboard;
