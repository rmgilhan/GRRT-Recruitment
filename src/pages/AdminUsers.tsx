import React, { useEffect, useState } from "react";
import axios from "axios";
// import { User } from "../types/user";
import AddUserModal from "../components/users/UserRegisterModal";
import EditPrivilegeModal from "../components/users/EditPrivilegeModal";
import ChangePasswordModal from "../components/users/ChangePasswordModal";
import UpdateProfileModal from "../components/users/UpdateProfileModal";
import UserTable from "../components/users/UserTable";
import useUser from "@hooks/useUser";
import * as UserTypes from "../types/user.ts";
import Swal from "sweetalert2";

type User = UserTypes.User;
type UserContextType = UserTypes.UserContextType;

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminUsers() {
  // const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeModal, setActiveModal] = useState<
    "add" | "privilege" | "password" | "profile" | null
  >(null);
  const [activeTab, setActiveTab] = useState<"users" | "profile">("users");

  const { userProfile, 
    myProfile, 
    getAllUsers, 
    usersData,
    userPasswordUpdate, 
    setPrivilege, 
    removeUser, updateProfile } = useUser();

  // ✅ Fetch all users once on mount
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

  const handlePrivilegeUpdate = async (payload: { roles: string[] }) => {
  if (!selectedUser) return;

  const selectedRole = payload.roles[0]; // extract the first role

  await setPrivilege(selectedUser._id, selectedRole);

  // Refresh users list
  getAllUsers();

  handleModalClose();
};


  // ✅ Delete user with API + local sync

const handleDelete = async (id: string) => {
  const result = await Swal.fire({
    title: "Delete this user?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    await removeUser(id); // your existing removeUser handles success/error
    getAllUsers();        // refresh table
  }
};


  const handleModalClose = () => {
    setSelectedUser(null);
    setActiveModal(null);
  };

  //userProfile();
  console.log(myProfile);

  return (
    <div className="w-full p-0 md:p-6">
  {/* 👑 Admin Section Tabs */}
  <div className="w-full flex justify-start space-x-2 md:space-x-4 border-b md:w-5/6 md:mx-auto">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "users"
              ? "text-blue-600 bg-gray-200 rounded"
              : "text-gray-500 bg-white hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("users")}
        >
          👥 User Management
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "profile"
              ? "text-blue-600 bg-gray-200 rounded"
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
    <div className="w-full pt-10 pb-10 space-y-2">
      {myProfile && myProfile.roles?.includes("Admin") && (
      <div className="w-full flex justify-end space-x-2 md:w-3/4 md:mx-auto">
        <button
          onClick={handleAddUser}
          className="bg-amber-500 text-white px-2 py-1 rounded shadow hover:bg-amber-600"
        >
          + Add User
        </button>
      </div>
      )}

      {myProfile && (
      <UserTable
        users={usersData}
        onEditPrivilege={(user) => {
          setSelectedUser(user);
          setActiveModal("privilege");
        }}
        onDelete={handleDelete}
        account={myProfile}
      />
      )}
    </div> 
  </>       
)}          
{/* ------------------------ */}
{/* 🙍‍♂️ Personal Profile Tab */}
{/* ------------------------ */}
{activeTab === "profile" && (
  <>
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-4">
      <h2 className="text-xl font-semibold text-center mb-6 text-blue-600">
        My Profile
      </h2>

      {myProfile ? (
        <div className="space-y-4 font-openSans text-sm">
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
              onClick={() => {
                if (!myProfile) return; // guard against null
                setSelectedUser(myProfile); 
                setActiveModal("password");
              }}
              className="w-3/8 flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
              disabled={!myProfile} // optional, disables the button until profile loads
            >
              Change Password
            </button>
            <button
              onClick={() => {
                setSelectedUser(myProfile);  // ✅ set selectedUser
                setActiveModal("profile");   // ✅ open modal
              }}
              className="w-3/8 flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            >
              Update Profile
            </button>
            <span className="w-1/4 flex-none"></span>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading profile...</p>
      )}
    </div>
  </>
)}

      {/* ✅ Modals */}
      {activeModal === "add" && <AddUserModal onClose={handleModalClose} onRefresh={getAllUsers} />}
      
      {activeModal === "privilege" && selectedUser && (
        <EditPrivilegeModal
          userId={selectedUser._id}
          currentFullName={selectedUser.fullName}
          currentEmail={selectedUser.email}
          currentRoles={selectedUser.roles}
          onClose={handleModalClose}
          onSave={handlePrivilegeUpdate} // make sure this function exists
        />
      )}
      {activeModal === "password" && selectedUser && (
        <ChangePasswordModal user={selectedUser} onUpdate={userPasswordUpdate} onClose={handleModalClose} />
      )}
      {activeModal === "profile" && selectedUser && (
        <UpdateProfileModal user={selectedUser} onClose={handleModalClose} onSave={updateProfile} onRefresh={userProfile} />
      )}
    </div>
  );
}
