import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useUserValidation from "../../validations/userValidations";
import useUser from "@hooks/useUser";
import UserContext from "../../context/UserContext";

interface UserRegisterModalProps {
  onClose: () => void;
}

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: string[]; // ✅ send as array for backend
}

const UserRegisterModal: React.FC<UserRegisterModalProps> = ({ onClose, onRefresh }) => {
  const { register, handleSubmit, reset, errors } = useUserValidation<RegisterFormData>();
  const { registerUser } = useUser();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

 // ✅ No SubmitHandler import needed
const onSubmit = async (data: RegisterFormData) => {
  try {
    // Convert single role string to array
    const payload = {
      ...data,
      roles: Array.isArray(data.roles) ? data.roles : [data.roles],
    };

    // 🧹 Remove confirmPassword before sending to backend
    const { confirmPassword, ...finalPayload } = payload;

    const success = await registerUser(finalPayload, reset);
    if (success) {
      onRefresh?.(); 
      onClose(); // ✅ Close Add User modal
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

  const cancel = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
        <div className="max-w-5xl p-2 -m-6 bg-emerald-600 mb-4 rounded-t-lg">
          <button
            onClick={onClose}
            className="absolute top-1 right-5 text-gray-50 hover:text-black text-xl font-bold"
          >
            &times;
          </button>

          <h2 className="text-xl font-small text-gray-50 text-left indent-5">
            Add New User
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-1 border-gray-300 rounded px-4 py-2 focus:outline-pink-400"
            {...register("fullName")}
          />
          <p className="text-sm text-red-500">{errors.fullName?.message}</p>

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-1 border-gray-300 rounded px-4 py-2 focus:outline-pink-400"
            {...register("email")}
          />
          <p className="text-sm text-red-500">{errors.email?.message}</p>

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-1 border-gray-300 rounded px-4 py-2 focus:outline-pink-400"
            {...register("password")}
          />
          <p className="text-sm text-red-500">{errors.password?.message}</p>

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-1 border-gray-300 rounded px-4 py-2 focus:outline-pink-400"
            {...register("confirmPassword")}
          />
          <p className="text-sm text-red-500">{errors.confirmPassword?.message}</p>

          <select
            className="w-full border border-1 border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-pink-400" 
            {...register("roles")}
          >
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
          <p className="text-sm text-red-500">{errors.roles?.message}</p>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-amber-500 text-white font-semibold py-2 rounded hover:bg-amber-600 transition"
            >
              Add User
            </button>

            <button
              type="button"
              onClick={cancel}
              className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegisterModal;
