import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "@components/users/LoginModal";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";

import {
  Home,
  Briefcase,
  Layers,
  Info,
  Mail,
  Menu,
  X,
  UserPlus,
} from "lucide-react";
import LOGO_URL from "../assets/grrt-logo-removebg.png";

interface NavItem {
  to: string;
  icon: React.ComponentType<any>;
  label: string;
}

const NavBar: React.FC = ({ onLogoClick }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { user, unsetUser } = useContext(UserContext)!;

  const location = useLocation();
  const navigate = useNavigate();

  const isAdminLoginPage = location.pathname === "/adminLogin";

  const handleNavigation = (path: string) => {
    navigate(path);
    if (path === "/" && onLogoClick) onLogoClick();
  };

  const showJobsMenu = localStorage.getItem("showJobsMenu") === "true";

useEffect(() => {
  // Paths that should clear the "showJobsMenu" flag
  const resetPaths = ["/", "/Services", "/AboutUs", "/Contact"];

  if (resetPaths.includes(location.pathname)) {
    localStorage.removeItem("showJobsMenu");
  }
}, [location.pathname]);

  // ✅ Determine which nav items to render
  let navItems: NavItem[] = [];

  console.log(user);

  if (!user?.id) {
  // Regular visitor / job seeker
     navItems = [
      { to: "/", icon: Home, label: "Home" },
      ...(showJobsMenu ? [{ to: "/Jobs", icon: Briefcase, label: "Jobs" }] : []),
      { to: "/Services", icon: Layers, label: "Services" },
      { to: "/AboutUs", icon: Info, label: "About" },
      { to: "/Contact", icon: Mail, label: "Contact" },
    ];
  }
  else if (user?.roles?.includes("Admin") || user?.roles?.includes("Manager")) {
    // Admin / Manager only
    // console.log("I'm here..");
    navItems = [
      { to: "/", icon: Home, label: "Dashboard" },
      { to: "/Jobs", icon: Briefcase, label: "Jobs" },
      // { to: "/Candidates", icon: Layers, label: "Candidates" },
      { to: "/Users", icon: UserPlus, label: "Users" },
    ];
  } else {
    // Logged-in regular user (optional, can reuse visitor items)
    navItems = [
      { to: "/", icon: Home, label: "Home" },
      { to: "/Jobs", icon: Briefcase, label: "Jobs" },
    ];
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="font-sans">
        {/* ✅ Desktop Navbar - Floating & Glassmorphism */}
        <header className="hidden md:flex fixed top-4 inset-x-0 w-full z-50 justify-center px-4">
          <div className="w-full max-w-7xl h-20 bg-white/80 backdrop-blur-lg rounded-2xl shadow-[0_8px_32px_0_rgba(16,185,129,0.1)] flex items-center justify-between px-8 border border-white/20">
            
            {/* Logo with Hover Scale */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => handleNavigation("/")}
            >
              <img src={LOGO_URL} alt="GRRT Logo" className="w-32 lg:w-40 h-auto" />
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-row items-center gap-2 lg:gap-6 font-semibold">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 py-2.5 px-5 rounded-xl transition-all duration-300 group ${
                      active
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                        : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? "animate-pulse" : "group-hover:scale-110"}`} />
                    <span className="text-sm lg:text-base">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* ✅ Login / Logout - High Contrast Action */}
            <div className="flex items-center">
              {user?.id ? (
                <button
                  type="button"
                  onClick={async () => {
                    await unsetUser();
                    setShowLogin(false);
                    Swal.fire({
                      title: "Logged Out",
                      text: "See you again soon!",
                      icon: "info",
                      confirmButtonColor: "#10b981"
                    });
                  }}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm py-2.5 px-8 rounded-full shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Logout
                </button>
              ) : (
                isAdminLoginPage && (
                  <button
                    type="button"
                    onClick={() => setShowLogin(true)}
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-bold text-sm py-2.5 px-8 rounded-full shadow-lg shadow-emerald-200 transition-all hover:-translate-y-0.5 active:scale-95"
                  >
                    Login
                  </button>
                )
              )}
            </div>

          </div>
        </header>

        {/* ✅ Mobile Navbar - Clean & Integrated */}
        <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-white/90 backdrop-blur-md px-6 py-4 border-b border-gray-100 shadow-sm z-50">
          <img
            src={LOGO_URL}
            alt="GRRT Logo"
            className="w-28 cursor-pointer"
            onClick={() => handleNavigation("/")}
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-emerald-600 p-2 rounded-xl bg-emerald-50 border border-emerald-100 transition-all"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ✅ Mobile Menu Sidebar - Animated Overlay */}
        <div 
          className={`md:hidden fixed inset-0 z-40 transition-visibility duration-300 ${isOpen ? "visible" : "invisible"}`}
        >
          {/* Dark Backdrop */}
          <div 
            className={`absolute inset-0 bg-emerald-950/20 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className={`absolute top-0 left-0 w-72 h-full bg-white shadow-2xl transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="p-8 flex flex-col h-full">
              <div className="mb-10">
                 <img src={LOGO_URL} alt="Logo" className="w-32" />
              </div>

              <nav className="flex flex-col gap-3 flex-grow">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                        active
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                          : "text-gray-700 hover:bg-emerald-50"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-bold">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-gray-100">
                 {user?.id ? (
                  <button
                    onClick={() => { unsetUser(); setIsOpen(false); }}
                    className="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl shadow-md"
                  >
                    Logout
                  </button>
                 ) : (
                  <button
                    onClick={() => { setShowLogin(true); setIsOpen(false); }}
                    className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-md"
                  >
                    Login
                  </button>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default NavBar;
