import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUserModal from "../components/UserRegisterModal";
import EditPrivilegeModal from "../components/EditPrivilegeModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import UpdateProfileModal from "../components/UpdateProfileModal";
import UserTable from "../components/UserTable";
import useUser from "@hooks/useUser";
import * as UserTypes from "../types/user.ts";

type User = UserTypes.User;

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminUsers() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeModal, setActiveModal] = useState<
    "add" | "privilege" | "password" | "profile" | null
  >(null);
  const [activeTab, setActiveTab] = useState<"users" | "profile">("users");

  const { getAllUsers, usersData, myProfile, userProfile } = useUser();

  // ✅ Fetch all users and profile once
  useEffect(() => {
    getAllUsers();
    userProfile();
  }, []);

  const handleAddUser = () => setActiveModal("add");
  const handleEditPrivilege = (user: User) => {
    setSelectedUser(user);
    setActiveModal("privilege");
  };
  const handleChangePassword = (user: User) => {
    setSelectedUser(user);
    setActiveModal("password");
  };
  const handleUpdateProfile = (user: User) => {
    setSelectedUser(user);
    setActiveModal("profile");
  };

  // ✅ Delete user with API + local sync
  const handleDelete = async (id: string) => {
    if (confirm("Delete this user?")) {
      try {
        await axios.delete(`${API_URL}/users/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        getAllUsers(); // refresh list after delete
        alert("✅ User deleted successfully.");
      } catch (error: any) {
        console.error("Error deleting user:", error.response?.data || error.message);
        alert("❌ Failed to delete user. Try again.");
      }
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setActiveModal(null);
  };

  return (
    <div className="p-6 space-y-10">
      {/* --------------------- */}
      {/* 👑 Admin Section Tabs */}
      {/* --------------------- */}
      <div className="flex justify-center space-x-4 border-b pb-2">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "users"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("users")}
        >
          👥 User Management
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "profile"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          🙍‍♂️ Personal Profile
        </button>
      </div>

      {/* ------------------------ */}
      {/* 👥 User Management Tab */}
      {/* ------------------------ */}
      {activeTab === "users" && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">User Management</h1>
            <button
              onClick={handleAddUser}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              + Add User
            </button>
          </div>

          <UserTable
            users={usersData}
            onEditPrivilege={handleEditPrivilege}
            onDelete={handleDelete}
            onChangePassword={handleChangePassword}
            onUpdateProfile={handleUpdateProfile}
          />
        </>
      )}

      {/* ------------------------ */}
      {/* 🙍‍♂️ Personal Profile Tab */}
      {/* ------------------------ */}
      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-4">
          <h2 className="text-xl font-semibold text-center mb-6 text-blue-600">
            My Profile
          </h2>

          {myProfile ? (
            <div className="space-y-4">
              <div>
                <label className="font-semibold text-gray-700">Full Name:</label>
                <p className="border rounded px-4 py-2">{myProfile.fullName}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Email:</label>
                <p className="border rounded px-4 py-2">{myProfile.email}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Role:</label>
                <p className="border rounded px-4 py-2">
                  {myProfile.roles?.join(", ")}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setActiveModal("password")}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                >
                  Change Password
                </button>
                <button
                  onClick={() => setActiveModal("profile")}
                  className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                >
                  Update Profile
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading profile...</p>
          )}
        </div>
      )}

      {/* ------------------------ */}
      {/* ⚙️ Modals */}
      {/* ------------------------ */}
      {activeModal === "add" && <AddUserModal onClose={handleModalClose} />}
      {activeModal === "privilege" && selectedUser && (
        <EditPrivilegeModal user={selectedUser} onClose={handleModalClose} />
      )}
      {activeModal === "password" && selectedUser && (
        <ChangePasswordModal user={selectedUser} onClose={handleModalClose} />
      )}
      {activeModal === "profile" && selectedUser && (
        <UpdateProfileModal user={selectedUser} onClose={handleModalClose} />
      )}
    </div>
  );
}
