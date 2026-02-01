import React from "react";
import { useForm } from "react-hook-form";

interface UpdateProfileModalProps {
  user: {
    _id: string;
    fullName: string;
    email: string;
    roles?: string[];
  };
  onClose: () => void;
  onSave: (data: UpdateProfileFormData) => Promise<void>; // ✅ added type for onSave
  onRefresh?: () => void;
}

export interface UpdateProfileFormData {
  fullName: string;
  email: string;
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
  user,
  onClose,
  onRefresh,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
    },
  });

  const onSubmit = async (data: UpdateProfileFormData) => {
    await onSave(data, onRefresh); // ✅ handled by parent
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white mx-2 rounded-xl shadow-lg p-6 w-full max-w-md md:mx-0">
        <div className="max-w-5xl p-2 -m-6 bg-emerald-500 text-lg font-medium rounded-t-xl text-center mb-4 text-gray-50">
          <h2>
            Update Profile
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              className="w-full border border-1 border-gray-400 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-1 border-gray-400 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
