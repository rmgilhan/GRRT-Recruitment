import React, { useEffect, useState } from "react";
import useJob from "@hooks/useJob";

interface Job {
  _id: string;
  title: string;
  description: string;
  requirements?: string[];
  employmentType: string;
  location: string;
  status: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const {
    user,
    jobsData,
    loading,
    listJobs,
    entryJob,
    deleteJob,
  } = useJob();

  // Simulate fetching data
  useEffect(() => {
    listJobs();
  }, []);

  return (
    <div>
      {jobsData.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No job postings found.</p>
      ) : (
       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {jobsData.map((job) => (
    <div
      key={job._id}
      className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-2">
        {job.title}
      </h2>

      {/* Job Description */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
        {job.description}
      </p>

      {/* Requirements */}
      {job.requirements && job.requirements.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Requirements:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {job.requirements.map((req: string, index: number) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Location */}
      <div className="text-sm text-gray-500 mb-2">📍 {job.location}</div>

      {/* Status + Type */}
      <div className="flex items-center justify-between mt-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            job.status === "Open"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {job.status}
        </span>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
          {job.employmentType}
        </span>
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  );
};

export default JobList;
