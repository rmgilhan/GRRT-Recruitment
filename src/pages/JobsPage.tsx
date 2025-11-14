import React, { useState, useContext } from "react";
import JobList from "../components/jobs/JobList";
import ManageJobs from "../components/jobs/ManageJobs";
import UserContext from "@context/UserContext";
import * as UserTypes from "../types/user";

type User = UserTypes.User;
type UserContextType = UserTypes.UserContextType;

const JobsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"list" | "manage">("list");
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Page Title */}
      

      {user?.id ? (
        <>
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Jobs Management</h1>
          {/* Tabs */}
          <div className="flex space-x-4 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("list")}
              className={`pb-2 px-3 text-sm font-semibold ${
                activeTab === "list"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Job Listings
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`pb-2 px-3 text-sm font-semibold ${
                activeTab === "manage"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Manage Jobs
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white shadow rounded-lg p-4">
            {activeTab === "list" ? <JobList /> : <ManageJobs />}
          </div>
        </>
      ) : (
        <>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Jobs Vacancy</h1>
        <JobList />
        </>
      )}
    </div>
  );
};

export default JobsPage;
