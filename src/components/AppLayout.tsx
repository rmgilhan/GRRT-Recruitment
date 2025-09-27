// src/AppLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Header from './Header';

export default function AppLayout() {
  // Use state to manage a key for the Outlet
  const [dashboardKey, setDashboardKey] = useState(0);

  // Function to force a re-render of the dashboard
  const resetDashboard = () => {
    setDashboardKey(prevKey => prevKey + 1);
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Pass the reset function to the NavBar component */}
      <NavBar onLogoClick={resetDashboard} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {/*
            The key prop here is the magic.
            When `dashboardKey` changes, React will destroy the old
            DashBoard component and create a new one, resetting all its state.
          */}
          <Outlet key={dashboardKey} />
        </main>
      </div>
    </div>
  );
}