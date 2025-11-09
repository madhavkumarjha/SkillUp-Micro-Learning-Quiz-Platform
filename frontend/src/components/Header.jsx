import React from "react";
import { LogOut, Menu } from "lucide-react";

function Header({ toggleSidebar }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex justify-between items-center">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-xl font-semibold text-blue-600">SkillUp</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="text-gray-700 dark:text-gray-300">Madhav Kumar</span>
        <button
          onClick={() => console.log("Logout clicked")}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}

export default Header;
