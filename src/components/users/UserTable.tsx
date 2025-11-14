import React from "react";
// import { User } from "../../types/User";
import * as UserTypes from "../../types/user.ts";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

type User = UserTypes.User;
type UserContextType = UserTypes.UserContextType;

interface Props {
  users: User[];
  onEditPrivilege: (user: User) => void;
  onDelete: (id: string) => void;
  account: {
    roles?: string[];
  };
}


export default function UserTable({
  users,
  onEditPrivilege,
  onDelete,
  account,
}: Props) {

  console.log(account);

  const isAdmin = account.roles?.includes("Admin");

  return (
    <table className="w-full md:w-3/4 md:mx-auto border rounded-lg bg-white shadow">
      <thead className="bg-gray-100 text-left">
        <tr className="border border-1 border-blue-50">
          <th className="py-2 px-4">Full Name</th>
          <th className="hidden md:table-cell py-2 px-4">Email</th>
          {isAdmin && (
          <th className="hidden md:table-cell py-2 px-4">Roles</th>
          )}
          <th className="py-2 px-4">Status</th>
          {isAdmin && (
          <th className="py-2 px-4 text-center">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
  {users.map((u) => (
    <tr key={u.id ?? u._id} className="border-t hover:bg-gray-50 font-openSans text-sm">
      <td className="py-2 px-4">{u.fullName}</td>
      <td className="hidden py-2 px-4 md:table-cell">{u.email}</td>
      {isAdmin && (
      <td className="hidden md:table-cell py-2 px-4">{u.roles?.join(", ") || "N/A"}</td>
      )}
      <td className="py-2 px-4">
        <span
          className={`px-2 py-1 rounded-full text-normal font-medium ${
            u.isOnline
              ? "bg-green-100 text-emerald-500"  // Online
              : "bg-gray-200 text-gray-600"    // Offline
          }`}
        >
          {u.isOnline ? "Online" : "Offline"}
        </span>
      </td>
      {isAdmin && (
      <td className="py-2 px-4 text-center space-x-2">
        <button
          className="text-blue-600 hover:underline"
          onClick={() => onEditPrivilege(u)}
        >
        <FaEdit />
        </button>
        <button
          className="text-red-600 hover:underline"
          onClick={() => onDelete(u._id!)}
        >
          <FaTrash />
        </button>
      </td>
      )}
    </tr>
  ))}
</tbody>

    </table>
  );
}
