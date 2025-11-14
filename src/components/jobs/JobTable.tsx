import React from "react";
import { Job } from "../types/Job";

interface JobTableProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

export default function JobTable({ jobs, onEdit, onDelete }: JobTableProps) {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="py-2 px-3">Title</th>
          <th className="py-2 px-3">Location</th>
          <th className="py-2 px-3">Employment Type</th>
          <th className="py-2 px-3">Status</th>
          <th className="py-2 px-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job._id} className="border-t">
            <td className="py-2 px-3">{job.title}</td>
            <td className="py-2 px-3">{job.location}</td>
            <td className="py-2 px-3">{job.employmentType}</td>
            <td className="py-2 px-3">{job.status}</td>
            <td className="py-2 px-3 text-center space-x-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => onEdit(job)}
              >
                Edit
              </button>
              {job._id && (
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onDelete(job._id!)}
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
