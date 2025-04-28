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

  // Fetch data for available workers and voicemails
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [callsResponse, voiceMailsResponse] = await Promise.all([
          fetch("https://api-uat.healthwealthsafe.link/api/getAvailableWorkersCount"),
          fetch("https://api-uat.healthwealthsafe.link/api/getVoiceMailsCount")
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

  // Function to fetch unread notifications
  const fetchUnreadNotifications = async () => {
    try {
      const response = await fetch(
        "https://api-uat.healthwealthsafe.link/api/newGetUnreadNotification?userId=n6rjG7qNbFr&notificationGroupType=staff&pageSize=10&pageNumber=1"
      );
      const data = await response.json();
      setUnreadNotifications(data.count || 0); // Assuming 'count' gives the number of unread notifications
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between bg-white shadow px-4 py-3 md:px-6 md:py-4 w-full">
      <div className="flex items-center justify-between w-full md:w-auto">
        {/* Logo */}
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
        {/* Top Text and Refresh Icon */}
        <div className="flex justify-between items-center">
          <div className="text-center w-full text-sm font-semibold text-yellow-600">
            Good Connection
          </div>
          <RefreshCcw className="absolute top-2 right-2 h-4 w-4 text-gray-400 cursor-pointer" />
        </div>

        {/* Main Stats */}
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
            <div className="text-xl text-yellow-500 font-bold mt-1">{voiceMailsCount}</div>
          </div>

          <div className="flex flex-col items-center">
            <span>MISSED CALLS</span>
            <div className="text-xl text-yellow-500 font-bold mt-1">0</div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Icons and User Profile */}
      <div
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } md:flex items-center justify-between w-full md:w-auto space-y-4 md:space-y-0 flex-col md:flex-row md:space-x-8`}
      >
        {/* Icons - Now in a row for mobile and column for desktop */}
        <div className="flex items-center justify-center space-x-6 md:space-x-8 text-blue-500">
          <ShieldCheck className="h-6 w-6 cursor-pointer" />
          <Calendar className="h-6 w-6 cursor-pointer" />
          <PhoneOutgoing className="h-6 w-6 cursor-pointer" />
          <PhoneIncoming className="h-6 w-6 cursor-pointer" />
          <UserPlus className="h-6 w-6 cursor-pointer" />
          <Bell
            className="h-6 w-6 cursor-pointer"
            onClick={fetchUnreadNotifications}
          />
          {unreadNotifications > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
              {unreadNotifications}
            </span>
          )}
        </div>

        {/* User Profile */}
        <div className="relative inline-block text-left mt-4 md:mt-0">
          <div
            className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-md cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src="/user-avatar.png"
              alt="User Avatar"
              className="h-10 w-10 rounded-full bg-black"
            />
            <div className="text-sm text-gray-700">
              <div className="font-semibold">Hardik Bipinbhai Navigator</div>
              <div className="text-xs text-gray-400">(hrn)</div>
            </div>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1 text-sm text-gray-700">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  <span className="mr-2"></span> My Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  <span className="mr-2"></span> Settings
                </a>
                <a
                  href="#"
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      const response = await fetch(
                        "https://api-uat.healthwealthsafe.link/api/logout",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          credentials: "include",
                        }
                      );

                      if (response.ok) {
                        navigate("/login");
                      } else {
                        console.error("Logout failed");
                      }
                    } catch (error) {
                      console.error("Error logging out:", error);
                    }
                  }}
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  <span className="mr-2"></span> Logout
                  <span className="ml-auto text-xs text-gray-400">
                    (ctrl + shift + L)
                  </span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
