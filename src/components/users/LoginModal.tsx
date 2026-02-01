import React, { useEffect, useContext, useState, FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "@context/UserContext";
import useUser from "@hooks/useUser";
import * as UserTypes from "../../types/user.ts"; // ✅ your working pattern
import Swal from "sweetalert2";

type User = UserTypes.User;
type UserContextType = UserTypes.UserContextType;

interface LoginModalProps {
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export default function LoginModal({ onClose, onSwitchToSignUp }: LoginModalProps) {
  const { user, updateUser } = useContext(UserContext)!;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // 👈 Track loading state
  const [isWakingUp, setIsWakingUp] = useState<boolean>(false); // 👈 Track Render delay

  const { authenticate } = useUser();
  const navigate = useNavigate();

  // 1. Warm up the server the moment the modal opens
  useEffect(() => {
    fetch("https://grrt-backend.onrender.com/GRRT/jobs").catch(() => {});
  }, []);

  useEffect(() => {
    setIsActive(email.trim() !== "" && password !== "");
  }, [email, password]);
 
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // 2. If backend doesn't respond in 4s, show the "Waking up" message
    const wakeTimer = setTimeout(() => {
      setIsWakingUp(true);
    }, 4000);

    try {
      await authenticate(email, password);
      clearTimeout(wakeTimer);
      navigate("/");
      onClose();
    } catch (error) {
      clearTimeout(wakeTimer);
      setIsWakingUp(false);
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg p-8 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-emerald-600 mb-6">
          Login to GRRT-Recruitment
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400 text-xs hover:text-emerald-600"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!isActive || loading}
              className={`w-full py-2 rounded text-white font-bold shadow-md transition-all transform active:scale-95 flex justify-center items-center gap-2 ${
                isActive && !loading ? "bg-amber-500 hover:bg-amber-600" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
