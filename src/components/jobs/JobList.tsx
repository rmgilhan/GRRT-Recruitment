import React, { useEffect, useState } from "react";
import useJob from "@hooks/useJob";
import ApplyModal from "@components/modals/ApplyModal";

interface Job {
  _id: string;
  title: string;
  description: string;
  keyResponsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  employmentType: string;
  location: string;
  status: string;
}

const MAX_VISIBLE_ITEMS = 3;

type ExpandState = {
  keyResponsibilities: boolean;
  requirements: boolean;
  benefits: boolean;
};

const JobList: React.FC = () => {
  const { jobsData, listJobs } = useJob();

  const [expandedJobs, setExpandedJobs] = useState<
    Record<string, ExpandState>
  >({});

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    listJobs();
  }, []);

  const toggleExpand = (
    jobId: string,
    field: keyof ExpandState
  ) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: {
        ...prev[jobId],
        [field]: !prev[jobId]?.[field],
      },
    }));
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  if (!jobsData || jobsData.length === 0) {
    return (
      <p className="text-gray-500 text-center py-10">
        No job postings found.
      </p>
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        {jobsData.map((job: Job) => {
          const expanded: ExpandState = expandedJobs[job._id] || {
            keyResponsibilities: false,
            requirements: false,
            benefits: false,
          };

          return (
            <div
              key={job._id}
              className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              {/* Title */}
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {job.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {job.description}
              </p>

              {/* Responsibilities / Requirements / Benefits */}
              {(
                [
                  "keyResponsibilities",
                  "requirements",
                  "benefits",
                ] as const
              ).map((field) => {
                const items = job[field];
                if (!items || items.length === 0) return null;

                const labelMap: Record<typeof field, string> = {
                  keyResponsibilities: "Key Responsibilities",
                  requirements: "Requirements",
                  benefits: "Benefits",
                };

                const isExpanded = expanded[field];
                const visibleItems = isExpanded
                  ? items
                  : items.slice(0, MAX_VISIBLE_ITEMS);

                return (
                  <div key={field} className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">
                      {labelMap[field]}:
                    </h3>

                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {visibleItems.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>

                    {items.length > MAX_VISIBLE_ITEMS && (
                      <button
                        className="text-xs text-blue-600 hover:underline mt-1"
                        onClick={() => toggleExpand(job._id, field)}
                      >
                        {isExpanded
                          ? "Show less"
                          : `+${items.length - MAX_VISIBLE_ITEMS} more`}
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Location */}
              <div className="text-sm text-gray-500 mb-2">
                📍 {job.location}
              </div>

              {/* Status + Employment Type */}
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

              {/* Apply Button */}
              {job.status === "Open" && (
                <div className="flex justify-center mt-5">
                  <button
                    className="w-1/2 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
                    onClick={() => handleApply(job)}
                  >
                    Apply Now
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Apply Modal */}
      {showModal && selectedJob && (
        <ApplyModal
          show={showModal}
          onClose={handleCloseModal}
          job={selectedJob}
        />
      )}
    </>
  );
};

export default JobList;
