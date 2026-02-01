import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import AddUserModal from "../components/users/UserRegisterModal";
import EditPrivilegeModal from "../components/users/EditPrivilegeModal";
import ChangePasswordModal from "../components/users/ChangePasswordModal";
import UpdateProfileModal from "../components/users/UpdateProfileModal";
import UserTable from "../components/users/UserTable";
import useUser from "@hooks/useUser";
import * as UserTypes from "../types/user.ts";
import Swal from "sweetalert2";

type User = UserTypes.User;

export default function AdminUsers() {
  const { user } = useContext(UserContext)!;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeModal, setActiveModal] = useState<"add" | "privilege" | "password" | "profile" | null>(null);
  const [activeTab, setActiveTab] = useState<"users" | "profile">("users");

  const { 
    userProfile, 
    myProfile, 
    getAllUsers, 
    usersData, 
    userPasswordUpdate, 
    setPrivilege, 
    removeUser, 
    updateProfile 
  } = useUser();

    // Check permissions for Tab Visibility
  const isAdminOrManager = user?.roles?.includes("Admin") || user?.roles?.includes("Manager");
  
  useEffect(() => {
    getAllUsers();
    userProfile();
  }, []);

  useEffect(() => {
    if (user && !isAdminOrManager) {
      setActiveTab("profile");
    }
  }, [user, isAdminOrManager]);

  const handleModalClose = () => {
    setSelectedUser(null);
    setActiveModal(null);
  };

  const handlePrivilegeUpdate = async (payload: { roles: string[] }) => {
    if (!selectedUser) return;
    const selectedRole = payload.roles[0];
    await setPrivilege(selectedUser._id, selectedRole);
    getAllUsers();
    handleModalClose();
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete this user?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      await removeUser(id);
      getAllUsers();
    }
  };



  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-10">
      
      {/* 👑 Admin Section Tabs - Centered Wrapper */}
      <div className="w-full flex justify-start space-x-2 md:space-x-4 border-b border-gray-200 mb-8">
        {/* FIX: Replaced 'if' with logical AND '&&' */}
        {isAdminOrManager && (
          <button
            className={`px-6 py-3 font-bold transition-all ${
              activeTab === "users"
                ? "text-blue-600 border-b-2 border-blue-600 bg-gray-50"
                : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("users")}
          >
            👥 User Management
          </button>
        )}
        
        <button
          className={`px-6 py-3 font-bold transition-all ${
            activeTab === "profile"
              ? "text-blue-600 border-b-2 border-blue-600 bg-gray-50"
              : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          🙍‍♂️ Personal Profile
        </button>
      </div>

      {/* 👥 User Management Tab */}
      {activeTab === "users" && isAdminOrManager && (
        <div className="space-y-6 animate-fadeIn">
          {myProfile?.roles?.includes("Admin") && (
            <div className="flex justify-end">
              <button
                onClick={() => setActiveModal("add")}
                className="bg-amber-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-amber-600 transition-transform active:scale-95 flex items-center gap-2"
              >
                <span className="text-xl font-bold">+</span> Add User
              </button>
            </div>
          )}

          <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
            {myProfile && (
              <UserTable
                users={usersData}
                onEditPrivilege={(u) => {
                  setSelectedUser(u);
                  setActiveModal("privilege");
                }}
                onDelete={handleDelete}
                account={myProfile}
              />
            )}
          </div>
        </div>
      )}

      {/* 🙍‍♂️ Personal Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto mt-4 animate-fadeIn">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 border-b pb-4">
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

          <div className="flex flex-col sm:flex-row gap-3 pt-6">
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
            <div className="text-center py-20">
               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
               <p className="text-gray-400 mt-4 text-sm font-medium uppercase tracking-widest">Synchronizing Profile...</p>
            </div>
          )}
        </div>
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
          onSave={handlePrivilegeUpdate}
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