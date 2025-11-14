import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface EditPrivilegeModalProps {
  userId: string;
  currentFullName: string;
  currentEmail: string;
  currentRoles: string[];
  onClose: () => void;
  onSave: (payload: { roles: string[] }) => Promise<void>;
}

// Form type
interface FormData {
  roles: string;
}

// Validation schema
const schema = yup.object().shape({
  roles: yup
    .string()
    .oneOf(["Admin", "Manager", "User"], "Invalid role selected")
    .required("Role is required"),
});

const EditPrivilegeModal: React.FC<EditPrivilegeModalProps> = ({
  currentFullName,
  currentEmail,
  currentRoles,
  onClose,
  onSave,
}) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Prefill role
  useEffect(() => {
    reset({ roles: currentRoles[0] || "" });
  }, [currentRoles, reset]);

  const onSubmit = async (data: FormData) => {
    await onSave({ roles: [data.roles] }); // convert string to array
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
        <div className="text-xl font-medium mb-4 -m-6 bg-emerald-600 px-4 py-2 rounded-t-lg text-white">
          <h2>Edit User Privilege</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Full Name (read-only) */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text" 
              value={currentFullName}
              disabled
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={currentEmail}
              disabled
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Roles (editable) */}
          <div>
            <label className="block font-medium mb-1">Role</label>
            <select
              {...register("roles")}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
            {errors.roles && <p className="text-red-500 text-sm">{errors.roles.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md bg-gray-300 hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditPrivilegeModal;
