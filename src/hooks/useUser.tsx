import axios from "axios";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import UserContext from "@context/UserContext";
import * as UserTypes from "../types/user.ts";

type User = UserTypes.User;
type UserContextType = UserTypes.UserContextType;

const API_URL = import.meta.env.VITE_API_URL;

export default function useUser() {
  const { user, setUser, updateUser } = useContext(UserContext) as UserContextType;
  const [myProfile, setMyProfile] = useState<User | null>(null);
  const [usersData, setUsersData] = useState<User[]>([]); // ✅ fix type

  // ✅ Login / Authenticate
  const authenticate = async (email: string, password: string): Promise<void> => {
    try {
      const response = await axios.post<{ accessToken: string }>(
        `${API_URL}/users/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.accessToken) {
        const token = response.data.accessToken;
        localStorage.setItem("token", token);
        await retrieveUserDetails(token);

        Swal.fire({
          title: "Login Successful",
          icon: "success",
          text: "Welcome to GRRT Recruitment.",
        });
      } else {
        Swal.fire({
          title: "Authentication failed",
          icon: "error",
          text: "Check your login details and try again",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Login Failed",
        icon: "error",
        text: error.response?.data?.message || "An error occurred. Please try again.",
      });
    }
  };

  // ✅ Retrieve user details
  const retrieveUserDetails = async (token: string): Promise<void> => {
    try {
      const response = await axios.get<{ user: User }>(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { user } = response.data;
      setUser({
        id: user._id,
        fullName: user.fullName,
        roles: user.roles,
      });
    } catch (error: any) {
      console.error("Error fetching user details:", error.response?.data || error.message);
    }
  };

  // ✅ Get user profile
  const userProfile = async (): Promise<void> => {
    try {
      const response = await axios.get<{ user: User }>(`${API_URL}/users/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMyProfile(response.data.user);
    } catch (error: any) {
      console.error("Unable to extract user profile. Try Again!", error.response?.data || error.message);
    }
  };

  // ✅ Update password
  const userPasswordUpdate = async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      const response = await axios.patch<{ message: string }>(
        `${API_URL}/users/update-password`,
        { currentPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { message } = response.data;
      if (message === "Success") {
        Swal.fire({
          title: "Password Update",
          icon: "success",
          text: "Password successfully updated.",
        });
      } else {
        Swal.fire({
          title: "Password update failed",
          icon: "error",
          text: message || "Update failed. Try again.",
        });
      }
    } catch (error: any) {
      console.error("Unable to update password!", error.response?.data || error.message);
    }
  };

  // ✅ Register new user (roles now array)
  const registerUser = async (
    data: {
      fullName: string;
      email: string;
      password: string;
      roles: string[];
    },
    resetFn?: () => void
  ): Promise<boolean> => {
    try {
      await axios.post(`${API_URL}/users/register`, data, {
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire({
        title: "Registration Successful",
        icon: "success",
        text: "Welcome to GRRT-Recruitment!",
      });

      if (resetFn) resetFn();
      return true;
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: error.response?.data?.error || "Something went wrong.",
      });
      return false;
    }
  };

  // ✅ Update profile
  const updateProfile = async (
  newProfile: Partial<User>,
  onRefresh?: () => void
): Promise<void> => {
  try {
    const response = await axios.put<{ message: string }>(
      `${API_URL}/users/updateProfile`,
      newProfile,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const { message } = response.data;

    if (message === "Success") {
      Swal.fire({
        title: "Profile Update",
        icon: "success",
        text: "User profile updated successfully.",
      });
      onRefresh?.(); // ✅ trigger refresh if passed
    } else {
      Swal.fire({
        title: "Update Error",
        icon: "error",
        text: "User profile update failed.",
      });
    }
  } catch (error: any) {
    console.error("Unable to update user profile!", error.response?.data || error.message);
    Swal.fire({
      title: "Error",
      icon: "error",
      text: error.response?.data?.error || "Something went wrong.",
    });
  }
};


  // ✅ Get all users (no export inside)
  const getAllUsers = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("Raw Data", response.data);

    // Use the nested `data` array
    if (response.data && Array.isArray(response.data.data)) {
      setUsersData(response.data.data);
    } else {
      console.warn("Unexpected response format:", response.data);
      setUsersData([]);
    }
  } catch (error: any) {
    console.error(
      "❌ Unable to extract user list. Try Again!",
      error.response?.data || error.message
    );
  }
};
  
  const setPrivilege = async (userId: string, selectedRole: string): Promise<void> => {
    try {
      const response = await axios.patch(
        `${API_URL}/users/${userId}/setPrivilege`, 
        { roles: [selectedRole] }, // must be array
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire({
        title: "Set new Privilege",
        icon: "success",
        text: "Privilege successfully updated.",
      });
    } catch (error: any) {
      console.error(
        "Unable to update new user privilege. Try again!",
        error.response?.data || error.message
      );
      Swal.fire({
        title: "Error",
        icon: "error",
        text: error.response?.data?.message || "Failed to update privilege.",
      });
    }
  };

  const removeUser = async (id: string): Promise<void> => {
    try {
      const response = await axios.delete(
        `${API_URL}/users/${id}`, // ✅ use the correct variable
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire({
        title: "Delete User",
        icon: "success",
        text: "User is successfully deleted.",
      });
    } catch (error: any) {
      console.error(
        "Unable to delete user account. Try again!",
        error.response?.data || error.message
      );
      Swal.fire({
        title: "Error",
        icon: "error",
        text: error.response?.data?.message || "Failed to delete user.",
      });
    }
  };

  return {
    authenticate,
    registerUser,
    userProfile,
    myProfile,
    userPasswordUpdate,
    updateProfile,
    getAllUsers,
    usersData,
    setPrivilege,
    removeUser,
  };
}
