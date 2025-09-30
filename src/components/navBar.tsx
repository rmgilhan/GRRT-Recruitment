import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Using Lucide React icons to avoid external dependency issues
import { 
    Briefcase, 
    Layers, // Used for Services 
    Info, 
    Mail, 
    Menu, 
    X 
} from 'lucide-react';

// IMPORTANT: Replace this placeholder URL with the direct link to your hosted logo image.
// const LOGO_URL = 'https://placehold.co/120x30/047857/ffffff?text=GRRT+LOGO'; 
import LOGO_URL from "../assets/grrt-logo.png"
/**
 * Optimized Navigation Bar Component
 * Reverted to the original "floating card" style with improved spacing and color harmony.
 * @param {object} props - Component props.
 * @param {function} props.onLogoClick - Handler for logo click, typically navigates to the landing page.
 */
export default function NavBar({ onLogoClick }) {
 const [isOpen, setIsOpen] = useState(false);
 // Defaulting location/navigate for standalone testing if React Router isn't fully configured
 const location = typeof useLocation === 'function' ? useLocation() : { pathname: '/Home' };
 const navigate = typeof useNavigate === 'function' ? useNavigate() : (path) => console.log('Navigating to:', path);

 // Function to handle route navigation (used for the logo)
 const handleNavigation = (path) => {
    if (typeof navigate === 'function') {
        navigate(path);
    }
    // Also call the prop function if it exists
    if (path === '/Home' && typeof onLogoClick === 'function') {
        onLogoClick();
    }
 };

 const navItems = [
  { to: "/", icon: Briefcase, label: "Home" }, 
  { to: "/Services", icon: Layers, label: "Services" },
  { to: "/AboutUs", icon: Info, label: "About" }, 
  { to: "/Contact", icon: Mail, label: "Contact" },
 ];

 const isActive = (path) => location.pathname === path;

 return (
  <div className="font-sans">
   {/* ✅ Desktop Navbar: Fixed, floating card style */}
   <header className="hidden md:flex fixed top-0 inset-x-0 w-full z-30 justify-center">
        {/* Inner container to hold the nav content and apply card styling */}
        <div className="w-full max-w-7xl **h-20** bg-white rounded-xl shadow-xl flex items-center justify-between px-8 border border-gray-100"> 
     {/* Logo Section */}
     <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation('/Home')}>
      <img 
                src={LOGO_URL} 
                alt="GRRT Logo" 
                className="w-36 h-auto" />
     </div>

     {/* Navigation Links: Simple background fill active state with better spacing */}
     <nav className="flex flex-row items-center gap-8 text-base md:text-lg font-medium h-full">
      {navItems.map((item) => {
       const Icon = item.icon;
       const active = isActive(item.to);

       return (
        <Link
         key={item.to}
         to={item.to}
         className={`
          flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-200
          ${
           active
            ? "bg-emerald-100 text-emerald-700 font-bold shadow-sm" // Active pill
            : "text-gray-600 hover:bg-gray-50 hover:text-emerald-500" // Hover effect
          }
         `}
        >
         <Icon className="w-4 h-4"/> 
         {item.label}
        </Link>
       );
      })}
     </nav>
       {/* Login Button: Prominent Pill shape */}
       <button
         type="button"
         className="ml-6 bg-emerald-500 text-white font-semibold text-sm py-2 px-6 rounded-full shadow-md transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg text-md md:text-lg"
       >
          Login
       </button>
     </div>
   </header>
      
      {/* Mobile Top Bar */}
   <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-white border-b px-4 py-3 shadow-md z-30">
    <div className="flex items-center gap-2">
     <img
      src={LOGO_URL}
      alt="GRRT Logo"
      className="w-28 cursor-pointer"
      onClick={() => handleNavigation('/Home')}
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

   {/* Mobile Slide-Out Menu */}
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
         className={`flex items-center w-full gap-4 px-4 py-3 rounded-lg transition-all
          ${active ? "bg-emerald-500 text-white font-bold shadow-md" : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"}
         `}
        >
         <Icon className="w-5 h-5"/>
         <span>
          {item.label}
         </span>
        </Link>
       );
      })}
     </nav>
            {/* Login Button in Mobile Menu */}
            <button
        type="button"
        className="mt-6 bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors hover:bg-emerald-600"
      >
       Login
      </button>
    </div>
   )}
  </div>
 );
}
