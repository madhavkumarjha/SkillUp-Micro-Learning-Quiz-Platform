import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function InstructorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex">
        <Sidebar
          isOpen={isSidebarOpen}
          isClosed={() => setIsSidebarOpen(false)}
          role="instructor"
        />
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
          {/* 👇 This is where nested routes render */}
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default InstructorLayout;
