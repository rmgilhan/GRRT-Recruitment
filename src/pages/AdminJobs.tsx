import React, { useState, useEffect } from "react";
import JobFormModal from "../components/JobFormModal";
import JobTable from "../components/JobTable";
import { Job } from "../types/Job";

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data.jobPosted || []);
    };
    fetchJobs();
  }, []);

  const handleAddJob = () => {
    setSelectedJob(null);
    setShowModal(true);
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleDeleteJob = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      setJobs(jobs.filter((j) => j._id !== id));
    }
  };

  const handleSave = (savedJob: Job) => {
    if (selectedJob) {
      // Update existing
      setJobs((prev) =>
        prev.map((j) => (j._id === savedJob._id ? savedJob : j))
      );
    } else {
      // Add new
      setJobs((prev) => [...prev, savedJob]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Job Postings</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddJob}
        >
          + Add Job
        </button>
      </div>

      <JobTable jobs={jobs} onEdit={handleEditJob} onDelete={handleDeleteJob} />

      {showModal && (
        <JobFormModal
          job={selectedJob}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
