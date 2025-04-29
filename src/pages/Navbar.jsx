import React, { useState, useEffect } from "react";
import logo from "/src/assets/logo.png";
import {
  Bell,
  UserPlus,
  PhoneIncoming,
  PhoneOutgoing,
  Calendar,
  ShieldCheck,
  RefreshCcw,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [onlineCalls, setOnlineCalls] = useState({ incoming: 0, outgoing: 0 });
  const [voiceMailsCount, setVoiceMailsCount] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im42cmpHN3FOYkZyIiwiZW1haWwiOiJyYWplc2hAd295Y2UuaW8iLCJwaG9uZSI6IjkxNDAxNTAxNDQ4OCIsInVzZXJuYW1lIjoiaHJuIiwidHlwZSI6Im5hdmlnYXRvcl91c2VyIiwibmFtZSI6IiBIYXJkaWsgQmlwaW5iaGFpIE5hdmlnYXRvciIsInRpbWV6b25lIjoiQXNpYS9DYWxjdXR0YSIsInN1YlR5cGUiOiJuYXZpZ2F0b3JfdXNlciIsInR3aWxpb1dvcmtlck5hbWUiOiJocm4iLCJzcGFjZV9pZCI6MSwiaXAiOiI6OmZmZmY6NTIuMjA0LjEyMC4xNjciLCJpYXQiOjE3NDU4NTA2ODAsImV4cCI6MTkwMzUzMDY4MH0.e1SW5zvERiSOeMejpsvV3w5b0_No_Go0-";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [callsResponse, voiceMailsResponse] = await Promise.all([
          fetch(
            "https://api-uat.healthwealthsafe.link/api/getAvailableWorkersCount"
          ),
          fetch(
            "https://api-uat.healthwealthsafe.link/api/getVoiceMailsCount"
          ),
        ]);

        const callsData = await callsResponse.json();
        const voiceMailsData = await voiceMailsResponse.json();

        setOnlineCalls({
          incoming: callsData.incoming || 0,
          outgoing: callsData.outgoing || 0,
        });
        setVoiceMailsCount(voiceMailsData.count || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchUnreadNotifications = async () => {
    try {
      const response = await fetch(
        "https://api-uat.healthwealthsafe.link/api/getNotificationCountSubCategory?pageNumber=1&pageSize=10&searchFor=c&sortBy=email&sortOrder=desc&organizationWise",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );

      const data = await response.json();
      setUnreadNotifications(data?.count || 0);
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between bg-white shadow px-4 py-3 md:px-6 md:py-4 w-full">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-16 w-20 md:h-20 md:w-24" />
        </div>

        <button
          className="md:hidden text-gray-500 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } md:flex flex-col justify-center px-4 py-3 w-full md:w-[380px] rounded-xl border-yellow-200 bg-white relative my-3 md:my-0`}
        style={{ boxShadow: "0 0 20px rgba(255, 204, 0, 0.3)" }}
      >
        <div className="flex justify-between items-center">
          <div className="text-center w-full text-sm font-semibold text-yellow-600">
            Good Connection
          </div>
          <RefreshCcw
            className="absolute top-2 right-2 h-4 w-4 text-gray-400 cursor-pointer"
          />
        </div>

        <div className="flex justify-between space-x-3 text-sm text-yellow-500 font-medium mt-2">
          <div className="flex flex-col items-center">
            <span>ONLINE</span>
            <div className="flex items-center space-x-2 mt-1 text-blue-500 font-semibold">
              <PhoneIncoming className="h-4 w-4" />
              <span className="text-black">{onlineCalls.incoming}</span>
              <PhoneOutgoing className="h-4 w-4" />
              <span className="text-black">{onlineCalls.outgoing}</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span>VOICE MAILS</span>
            <div className="text-xl text-yellow-500 font-bold mt-1">
              {voiceMailsCount}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span>MISSED CALLS</span>
            <div className="text-xl text-yellow-500 font-bold mt-1">0</div>
          </div>
        </div>
      </div>

      <div
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } md:flex items-center justify-between w-full md:w-auto space-y-4 md:space-y-0 flex-col md:flex-row md:space-x-8`}
      >
        <div className="flex items-center justify-center space-x-6 md:space-x-8 text-blue-500 relative">
          <ShieldCheck className="h-6 w-6 cursor-pointer" />
          <Calendar className="h-6 w-6 cursor-pointer" />
          <PhoneOutgoing className="h-6 w-6 cursor-pointer" />
          <PhoneIncoming className="h-6 w-6 cursor-pointer" />
          <UserPlus className="h-6 w-6 cursor-pointer" />
          <div className="relative">
            <Bell
              className="h-6 w-6 cursor-pointer"
              onClick={fetchUnreadNotifications}
            />
            {unreadNotifications > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {unreadNotifications}
              </span>
            )}
          </div>
        </div>

        <div className="relative inline-block text-left mt-4 md:mt-0">
          <div
            className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-md cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-sm">
              IMG
            </div>
            <div className="text-sm text-gray-700">
              <div className="font-semibold">Hardik Bipinbhai</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
