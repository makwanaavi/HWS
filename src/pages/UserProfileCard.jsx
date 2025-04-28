import {
    Mail,
    Phone,
    MapPin,
    Info,
    BadgeCheck,
    UserCircle2,
  } from "lucide-react";
  
  const UserProfileCard = () => {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-md shadow-sm border border-gray-200 gap-4">
        {/* Profile Section */}
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-sm">
            IMG
          </div>
  
          {/* User Details */}
          <div className="flex flex-col min-w-0">
            {/* Name & Role */}
            <div className="flex flex-wrap items-center space-x-1 font-semibold text-sm">
              <BadgeCheck className="w-4 h-4 text-teal-400" />
              <span className="truncate">Hardik Bipinbhai Navigator</span>
              <span className="text-gray-500 font-normal truncate">
                (HWS Care Manager)
              </span>
            </div>
  
            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 mt-1">
              <div className="flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span>+91 (401) 501-4488</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-3 h-3" />
                <span className="break-words cursor-pointer">avi@woyce.io</span>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer">
                <MapPin className="w-3 h-3" />
                <span>any, KA, IN</span>
              </div>
              <div className="flex items-center space-x-1">
                <Info className="w-3 h-3" />
                <span className="break-words cursor-pointer"> 
                  Associated with: AHCDemo Athens
                </span>
              </div>
            </div>
          </div>
        </div>
  
        {/* My Profile Button */}
        <div className="flex sm:justify-end">
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 text-xs rounded-md hover:bg-blue-600 w-full sm:w-auto">
            <UserCircle2 className="w-4 h-4" />
            <span>My Profile</span>
          </button>
        </div>
      </div>
    );
  };
  
  export default UserProfileCard;
  