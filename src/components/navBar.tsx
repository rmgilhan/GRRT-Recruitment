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
import LOGO_URL from "../assets/grrt-logo.png";

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
      { to: "/Candidates", icon: Layers, label: "Candidates" },
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
        {/* ✅ Desktop Navbar */}
        <header className="hidden md:flex fixed top-0 inset-x-0 w-full z-30 justify-center">
          <div className="w-full max-w-7xl h-20 bg-white rounded-xl shadow-xl flex items-center justify-between px-8 border border-gray-100">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              <img src={LOGO_URL} alt="GRRT Logo" className="w-36 h-auto" />
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-row items-center gap-8 text-base md:text-lg font-medium h-full">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-emerald-100 text-emerald-700 font-bold shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-emerald-500"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* ✅ Login / Logout */}
            {user?.id ? (
              <button
                type="button"
                onClick={async () => {
                await unsetUser();
                setShowLogin(false);
                Swal.fire({
                  title: "Logged Out",
                  text: "You’ve been successfully logged out.",
                  icon: "info",
                });
              }}
                className="ml-6 bg-red-500 text-white font-semibold text-sm py-2 px-6 rounded-full shadow-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowLogin(true)}
                className="ml-6 bg-emerald-500 text-white font-semibold text-sm py-2 px-6 rounded-full shadow-md transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg"
              >
                Login
              </button>
            )}
          </div>
        </header>

        {/* ✅ Mobile Navbar */}
        <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-white border-b px-4 py-3 shadow-md z-30">
          <div className="flex items-center gap-2">
            <img
              src={LOGO_URL}
              alt="GRRT Logo"
              className="w-28 cursor-pointer"
              onClick={() => handleNavigation("/")}
            />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`text-2xl text-emerald-600 bg-white rounded-lg p-2 transition-all focus:outline-none 
              border-2 ${isOpen ? "border-emerald-500" : "border-gray-200 hover:border-emerald-400"}`}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* ✅ Mobile Menu Items */}
        {isOpen && (
          <div className="md:hidden fixed top-[60px] left-0 w-full max-w-xs bg-white border-r shadow-xl h-[calc(100vh-60px)] z-40 p-4 flex flex-col transition-transform duration-300">
            <nav className="flex flex-col gap-2 font-medium text-lg">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center w-full gap-4 px-4 py-3 rounded-lg transition-all ${
                      active
                        ? "bg-emerald-500 text-white font-bold shadow-md"
                        : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* ✅ Mobile Login / Logout */}
            {user?.id ? (
              <button
                type="button"
                onClick={() => {
                  unsetUser();
                  setShowLogin(false);
                  Swal.fire({
                    title: "Logged Out",
                    text: "You’ve been successfully logged out.",
                    icon: "info",
                  });
                }}
                className="mt-4 bg-red-500 text-white font-semibold text-sm py-2 px-6 rounded-full shadow-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowLogin(true)}
                className="mt-4 bg-emerald-500 text-white font-semibold text-sm py-2 px-6 rounded-full shadow-md transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>

      {/* ✅ Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default NavBar;
