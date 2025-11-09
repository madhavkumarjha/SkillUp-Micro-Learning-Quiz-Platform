import React, { useState } from "react";
import { Menu, X, Home, Book, Users, ClipboardList } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ role, isOpen, isClosed }) => {
  const location = useLocation();

  // Sidebar menu items per role
  const menuItems = {
    student: [
      { name: "Dashboard", icon: Home, path: "/student/dashboard" },
      { name: "My Courses", icon: Book, path: "/student/courses" },
      { name: "Quizzes", icon: ClipboardList, path: "/student/quizzes" },
    ],
    instructor: [
      { name: "Dashboard", icon: Home, path: "/instructor/dashboard" },
      { name: "Courses", icon: Book, path: "/instructor/courses" },
      {
        name: "Manage Quizzes",
        icon: ClipboardList,
        path: "/instructor/quizzes",
      },
      { name: "Students", icon: Users, path: "/instructor/students" },
    ],
    admin: [
      { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
      { name: "Users", icon: Users, path: "/admin/users" },
      { name: "Reports", icon: ClipboardList, path: "/admin/reports" },
    ],
  };

  const currentMenu = menuItems[role] || menuItems.student;

  return (
    <>
      {/* Sidebar container */}
      <aside
        className={`fixed lg:static top-0 left-0 z-40 h-full lg:h-auto w-64 bg-white dark:bg-gray-800 shadow-sm transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <nav className="p-4 space-y-2">
          <button
            className="lg:hidden text-gray-600 dark:text-gray-200 z-30"
            onClick={isClosed}
          >
            <X size={20} />
          </button>
          {currentMenu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                  isActive
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={isClosed} // auto close on mobile
              >
                <Icon size={18} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
