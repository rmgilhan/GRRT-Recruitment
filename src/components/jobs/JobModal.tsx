import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface JobFormData {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  status: string;
  requirements: string[];
}

interface JobModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (formData: JobFormData) => void;
  editJob?: JobFormData | null;
}

const JobModal: React.FC<JobModalProps> = ({ show, onClose, onSubmit, editJob }) => {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    description: "",
    location: "",
    employmentType: "Full-time",
    status: "Open",
    requirements: [""],
  });

  // ✅ Fill form when editJob changes
  useEffect(() => {
    if (editJob) {
      setFormData({
        title: editJob.title || "",
        description: editJob.description || "",
        location: editJob.location || "",
        employmentType: editJob.employmentType || "Full-time",
        status: editJob.status || "Open",
        requirements: editJob.requirements.length ? editJob.requirements : [""],
      });
    } else {
      // Reset for new job
      setFormData({
        title: "",
        description: "",
        location: "",
        employmentType: "Full-time",
        status: "Open",
        requirements: [""],
      });
    }
  }, [editJob, show]);

  // 🔹 Handle input/select/textarea changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Requirements handlers
  const handleRequirementChange = (index: number, value: string) => {
    const updatedReqs = [...formData.requirements];
    updatedReqs[index] = value;
    setFormData((prev) => ({ ...prev, requirements: updatedReqs }));
  };

  const addRequirement = () => {
    setFormData((prev) => ({ ...prev, requirements: [...prev.requirements, ""] }));
  };

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-lg max-h-[90vh] flex flex-col">

        {/* Header - fixed */}
        <div className="bg-emerald-600 px-4 py-3 rounded-t-xl text-center text-gray-50 font-medium text-lg">
          {editJob ? "Edit Job" : "Add New Job"}
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">

          <form id="jobForm" onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Job Title"
              required
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Job Description"
              rows={3}
              required
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requirements
              </label>

              {formData.requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder={`Requirement ${index + 1}`}
                    className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="text-red-500 hover:text-red-600 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addRequirement}
                className="text-blue-600 text-sm hover:underline"
              >
                + Add Requirement
              </button>
            </div>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              required
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
            />

            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </form>
        </div>

        {/* Footer - fixed */}
        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="jobForm"
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md"
          >
            {editJob ? "Update" : "Create"}
          </button>
        </div>

      </div>
    </div>

  );
};

export default JobModal;
