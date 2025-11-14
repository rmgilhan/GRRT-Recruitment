import React from "react";
import { useForm } from "react-hook-form";

interface ChangePasswordModalProps {
  user: {
    _id: string;
    fullName: string;
    email: string;
  };
  onUpdate: (currentPassword: string, newPassword: string) => Promise<void>;
  onClose: () => void;
}

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  user,
  onUpdate,
  onClose,
}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ChangePasswordFormData>();

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }

    await onUpdate(data.currentPassword, data.newPassword);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-100 mx-2 rounded-xl shadow-lg p-6 w-full max-w-md md:mx-0">
        <div className="max-w-5xl p-2 -m-6 bg-emerald-600 text-lg rounded-t-xl font-medium text-center mb-4 text-gray-50">
          <h2>
          Change Password
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Current Password</label>
            <input
              type="password"
              {...register("currentPassword", { required: true })}
              className="w-full border border-1 border-gray-400 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
            {errors.currentPassword && <p className="text-red-500 text-sm mt-1">Current password required</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">New Password</label>
            <input
              type="password"
              {...register("newPassword", { required: true })}
              className="w-full  border border-1 border-gray-400 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">New password required</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", { required: true })}
              className="w-full  border border-1 border-gray-400 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">Confirm your new password</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:opacity-50">
              {isSubmitting ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
