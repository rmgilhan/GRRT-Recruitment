import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import useJob from "@hooks/useJob";
import JobModal from "@components/jobs/JobModal";

export interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  employmentType: string;
  location: string;
  status: string;
}

const ManageJobs: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editJob, setEditJob] = useState<Job | null>(null);

  const {
    jobsData,
    listJobs,
    entryJob,
    updateJob,
    deleteJob,
    loading
  } = useJob();

  useEffect(() => {
    listJobs();
  }, []);

  const openModal = (job?: Job) => {
    if (job) {
      setEditJob(job);
    } else {
      setEditJob(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditJob(null);
  };

  const handleSubmit = async (jobData: Omit<Job, "_id">) => {
    try {
      if (editJob) {
        // Update existing job
        await updateJob(editJob._id, jobData); // ✅ pass ID and updated data separately
      } else {
        // Create new job
        await entryJob(jobData);
      }
      handleCloseModal();
    } catch (error: any) {
      console.error("Error saving job:", error);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };


  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This job will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteJob(id);
        //Swal.fire("Deleted!", "The job has been removed.", "success");
      }
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Manage Jobs</h2>
        <button
          onClick={() => openModal()}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-sm"
        >
          <FaPlus /> Add Job
        </button>
      </div>

      {/* Job Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobsData.length > 0 ? (
              jobsData.map((job) => (
                <tr
                  key={job._id}
                  className="border-t hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="py-2 px-4">{job.title}</td>
                  <td className="py-2 px-4">{job.location}</td>
                  <td className="py-2 px-4">{job.employmentType}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => openModal(job)}
                      className="text-blue-600 hover:text-blue-800 mx-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-500 hover:text-red-700 mx-2"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No job postings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Job Modal */}
      <JobModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editJob={editJob}
      />
    </div>
  );
};

export default ManageJobs;
