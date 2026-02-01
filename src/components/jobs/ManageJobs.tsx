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
        await updateJob(editJob._id, jobData);
      } else {
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
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteJob(id);
      }
    });
  };

  return (
  /* Added 'max-w-6xl mx-auto' to center the entire component */
  <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
    
    {/* Header - Stays centered with the content */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Manage Jobs</h2>
        <p className="text-sm text-gray-500">Create and manage your organization's job postings.</p>
      </div>
      <button
        onClick={() => openModal()}
        className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-lg flex justify-center items-center gap-2 shadow-md hover:shadow-lg transition-all transform active:scale-95"
      >
        <FaPlus /> Add Job
      </button>
    </div>

    {/* Main Container - Added mx-auto here too for extra safety */}
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden mx-auto">
      
      {/* 🖥️ DESKTOP VIEW */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b">
              <th className="py-4 px-6 text-left font-semibold">Title</th>
              <th className="py-4 px-6 text-left font-semibold">Location</th>
              <th className="py-4 px-6 text-left font-semibold">Type</th>
              <th className="py-4 px-6 text-left font-semibold">Status</th>
              <th className="py-4 px-6 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobsData.length > 0 ? (
              jobsData.map((job) => (
                <tr key={job._id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{job.title}</td>
                  <td className="py-4 px-6 text-gray-600">{job.location}</td>
                  <td className="py-4 px-6 text-gray-600">{job.employmentType}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.status === "Open" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${job.status === "Open" ? "bg-green-500" : "bg-gray-400"}`}></span>
                      {job.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => openModal(job)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"><FaEdit /></button>
                      <button onClick={() => handleDelete(job._id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="text-center py-16 text-gray-400 italic">No job postings available.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📱 MOBILE VIEW */}
      <div className="md:hidden divide-y divide-gray-100">
        {jobsData.length > 0 ? (
          jobsData.map((job) => (
            <div key={job._id} className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-gray-900 leading-tight">{job.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{job.location}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{job.employmentType}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter ${
                  job.status === "Open" ? "bg-green-100 text-green-700 border border-green-200" : "bg-gray-100 text-gray-500 border border-gray-200"
                }`}>
                  {job.status}
                </span>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => openModal(job)} 
                  className="flex-1 bg-white text-blue-600 py-2 rounded-lg flex justify-center items-center gap-2 text-sm font-semibold border border-blue-200 shadow-sm active:bg-blue-50"
                >
                  <FaEdit /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(job._id)} 
                  className="flex-1 bg-white text-red-500 py-2 rounded-lg flex justify-center items-center gap-2 text-sm font-semibold border border-red-200 shadow-sm active:bg-red-50"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400 italic">No job postings available.</div>
        )}
      </div>
    </div>

    <JobModal show={showModal} onClose={handleCloseModal} onSubmit={handleSubmit} editJob={editJob} />
  </div>
);
};

export default ManageJobs;