import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as UserTypes from "../types/user";

const API_URL = import.meta.env.VITE_API_URL;

type User = UserTypes.User;
type UserContextType = UserTypes.UserContextType;

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { id: null, fullName: null, roles: null };
  });

  const navigate = useNavigate();

  const updateUser = (newData: Partial<User>) => {
    setUser((prevUser) => {
      const updated = { ...prevUser, ...newData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  const unsetUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          `${API_URL}/users/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Logout failed:", error.response?.data || error.message);
      } else {
        console.error("Unexpected logout error:", error);
      }
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("showJobsMenu");
      navigate("/", { replace: true });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, unsetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
