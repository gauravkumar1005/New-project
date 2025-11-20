import { useState } from "react";
// Ensure 'cn' utility is available, typically from 'clsx' and 'tailwind-merge'
import { cn } from "../lib/utils";

// Define a primary color (e.g., a nice blue)
const PRIMARY_COLOR_CLASSES = "text-indigo-600 hover:text-indigo-700";
const HOVER_BG_CLASS = "hover:bg-indigo-50";

export default function Navbar() {
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const toggleDesktopDropdown = (name) => {
    // Close mobile menu when a desktop dropdown is opened for a cleaner interaction
    setMobileMenuOpen(false);
    setDesktopDropdown(desktopDropdown === name ? null : name);
  };

  const toggleMobileDropdown = (name) => {
    setMobileDropdown(mobileDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 w-full bg-white shadow-lg z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo - Enhanced with Primary Color */}
        <a href="/" className="flex items-center space-x-2">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684L10.5 9l2.5 2.5L15 9l2.5 2.5L19 10.5l4.316 1.816A1 1 0 0123 13.72V19a2 2 0 01-2 2h-4M5 5v14a2 2 0 002 2h4M5 5a2 2 0 00-2 2v10a2 2 0 002 2"></path></svg>
            <h1 className="text-gray-900 text-xl font-extrabold tracking-tight">
                Call Assistant
            </h1>
        </a>

        {/* Desktop Menu - Refined Look */}
        <ul className="hidden md:flex space-x-6 lg:space-x-10 items-center">

          <li>
            <a 
                href="/" 
                className={cn("font-semibold transition duration-150", PRIMARY_COLOR_CLASSES, "text-gray-600")}
            >
              Dashboard
            </a>
          </li>

          {/* Agents Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleDesktopDropdown("agents")}
              className={cn("font-semibold flex items-center gap-1 transition duration-150 py-2", PRIMARY_COLOR_CLASSES, desktopDropdown === "agents" ? PRIMARY_COLOR_CLASSES : "text-gray-600")}
            >
              Agents
              <span className="text-xs transition-transform transform duration-200">
                {desktopDropdown === "agents" ? "▲" : "▼"}
              </span>
            </button>

            {/* Dropdown Style - Added border, rounded-lg, subtle shadow */}
            {desktopDropdown === "agents" && (
              <div className="absolute top-10 -left-2 bg-white border border-gray-100 shadow-xl rounded-lg w-40 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1">
                <a href="/my-agents" className={cn("block px-4 py-2 text-gray-700 text-sm", HOVER_BG_CLASS)}>
                  My Agents
                </a>
                <a href="/create-agents" className={cn("block px-4 py-2 text-gray-700 text-sm", HOVER_BG_CLASS)}>
                  Create New Agent
                </a>
              </div>
            )}
          </li>

          {/* Phone Numbers Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleDesktopDropdown("numbers")}
              className={cn("font-semibold flex items-center gap-1 transition duration-150 py-2", PRIMARY_COLOR_CLASSES, desktopDropdown === "numbers" ? PRIMARY_COLOR_CLASSES : "text-gray-600")}
            >
              Phone Numbers
              <span className="text-xs transition-transform transform duration-200">
                {desktopDropdown === "numbers" ? "▲" : "▼"}
              </span>
            </button>

            {desktopDropdown === "numbers" && (
              <div className="absolute top-10 -left-2 bg-white border border-gray-100 shadow-xl rounded-lg w-48 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1">
                <a href="/my-phone-numbers" className={cn("block px-4 py-2 text-gray-700 text-sm", HOVER_BG_CLASS)}>
                  My Phone Numbers
                </a>
                <a href="/purchase-phone-number" className={cn("block px-4 py-2 text-gray-700 text-sm", HOVER_BG_CLASS)}>
                  Purchase Phone Number
                </a>
              </div>
            )}
          </li>

          <li>
            <a 
                href="/billing" 
                className={cn("font-semibold transition duration-150", PRIMARY_COLOR_CLASSES, "text-gray-600")}
            >
              Billing
            </a>
          </li>

          <li>
            <a 
                href="/people" 
                className={cn("font-semibold transition duration-150", PRIMARY_COLOR_CLASSES, "text-gray-600")}
            >
              People
            </a>
          </li>
          
          {/* Added a Call-to-Action Button */}
          {/* <li>
            <a 
                href="/start-trial" 
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition duration-150"
            >
              Start Trial
            </a>
          </li> */}

        </ul>

        {/* Mobile Menu Button - Styled */}
        <button
          className="md:hidden text-indigo-600 hover:text-indigo-800 text-2xl p-2 rounded-md hover:bg-gray-100 transition duration-150"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          {/* Changed to a more standard icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </nav>

      {/* Mobile Overlay - Darker for better contrast */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-900/60 z-40 transition-opacity duration-300 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-in Menu - Better shadow and focus */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button 
            className="text-gray-500 hover:text-indigo-600 text-3xl p-1" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            &times;
          </button>
        </div>

        {/* Mobile Menu - Enhanced Spacing and Hover */}
        <nav className="px-6 py-4 space-y-2">

          <a href="/" className={cn("block py-3 text-lg font-semibold text-gray-700 rounded-lg px-2", PRIMARY_COLOR_CLASSES, HOVER_BG_CLASS)}>
            Dashboard
          </a>

          {/* Agents (Mobile) */}
          <div className="py-3">
            <button
              onClick={() => toggleMobileDropdown("agents")}
              className={cn("w-full flex justify-between items-center text-lg font-semibold rounded-lg px-2", PRIMARY_COLOR_CLASSES, mobileDropdown === "agents" ? PRIMARY_COLOR_CLASSES : "text-gray-700")}
            >
              Agents
              <span className="text-sm transition-transform transform duration-200">
                {mobileDropdown === "agents" ? "▲" : "▼"}
              </span>
            </button>

            {mobileDropdown === "agents" && (
              <div className="ml-4 mt-2 space-y-1 border-l-2 border-indigo-100 pl-4 py-1 animate-in fade-in slide-in-from-top-1">
                <a href="/my-agents" className={cn("block text-gray-600 py-1", HOVER_BG_CLASS, "rounded-md")}>My Agents</a>
                <a href="/create-agents" className={cn("block text-gray-600 py-1", HOVER_BG_CLASS, "rounded-md")}>Create Agent</a>
              </div>
            )}
          </div>

          {/* Phone Numbers (Mobile) */}
          <div className="py-3">
            <button
              onClick={() => toggleMobileDropdown("numbers")}
              className={cn("w-full flex justify-between items-center text-lg font-semibold rounded-lg px-2", PRIMARY_COLOR_CLASSES, mobileDropdown === "numbers" ? PRIMARY_COLOR_CLASSES : "text-gray-700")}
            >
              Phone Numbers
              <span className="text-sm transition-transform transform duration-200">
                {mobileDropdown === "numbers" ? "▲" : "▼"}
              </span>
            </button>

            {mobileDropdown === "numbers" && (
              <div className="ml-4 mt-2 space-y-1 border-l-2 border-indigo-100 pl-4 py-1 animate-in fade-in slide-in-from-top-1">
                <a href="/my-phone-numbers" className={cn("block text-gray-600 py-1", HOVER_BG_CLASS, "rounded-md")}>My Phone Number</a>
                <a href="/purchase-phone-number" className={cn("block text-gray-600 py-1", HOVER_BG_CLASS, "rounded-md")}>Purchase Phone Number</a>
              </div>
            )}
          </div>

          <a href="/billing" className={cn("block py-3 text-lg font-semibold text-gray-700 rounded-lg px-2", PRIMARY_COLOR_CLASSES, HOVER_BG_CLASS)}>Billing</a>
          <a href="/people" className={cn("block py-3 text-lg font-semibold text-gray-700 rounded-lg px-2", PRIMARY_COLOR_CLASSES, HOVER_BG_CLASS)}>People</a>
        </nav>
      </div>
    </header>
  );
}