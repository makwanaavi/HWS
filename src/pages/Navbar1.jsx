import {
    Home,
    Clock,
    Users,
    ClipboardList,
    BarChart2,
    User,
    MessageSquare,
    Grid,
    Link,
    FileText,
    AlertOctagon,
    Menu,
    X,
  } from "lucide-react";
  import { useState } from "react";
  
  const Navbar1 = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navItems = [
      { icon: <Home className="w-4 h-4 md:mr-4" />, label: "Dashboard" },
      { icon: <Clock className="w-4 h-4 md:mr-4" />, label: "Schedule" },
      { icon: <Users className="w-4 h-4 md:mr-4" />, label: "Patient" },
      { icon: <Home className="w-4 h-4 md:mr-4" />, label: "Clinical Forms" },
      { icon: <ClipboardList className="w-4 h-4 md:mr-4" />, label: "Billing" },
      { icon: <BarChart2 className="w-4 h-4 md:mr-4" />, label: "Reports" },
      { icon: <User className="w-4 h-4 md:mr-4" />, label: "Staff" },
      { icon: <MessageSquare className="w-4 h-4 md:mr-4" />, label: "Messaging" },
      { icon: <Grid className="w-4 h-4 md:mr-4" />, label: "Applications" },
      { icon: <Link className="w-4 h-4 md:mr-4" />, label: "Voice Call" },
      { icon: <FileText className="w-4 h-4 md:mr-4" />, label: "External Link" },
    ];
  
    return (
      <div className="flex flex-col md:flex-row items-center border-b bg-white text-sm">
        {/* Mobile menu header */}
        <div className="flex w-full md:hidden items-center justify-between p-2 border-b border-gray-300">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="ml-2 font-medium">Menu</span>
          </div>
          <div className="text-red-400">
            <AlertOctagon className="w-5 h-5" />
          </div>
        </div>
  
        {/* Desktop nav items */}
        <div className="hidden md:flex w-full">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-2 border-r border-gray-300 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
          <div className="ml-auto px-4 py-2 text-red-400">
            <AlertOctagon className="w-5 h-5" />
          </div>
        </div>
  
        {/* Mobile menu items */}
        {isMobileMenuOpen && (
          <div className="w-full md:hidden">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Navbar1;