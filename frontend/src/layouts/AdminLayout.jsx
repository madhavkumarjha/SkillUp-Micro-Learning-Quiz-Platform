import React, { useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex">
        <Sidebar
          isOpen={isSidebarOpen}
          isClosed={() => setIsSidebarOpen(false)}
          role="admin"
        />
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AdminLayout;
