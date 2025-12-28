import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface JobFormData {
  title: string;
  description: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  status: "Open" | "Closed" | "Draft";
  requirements?: string[];
  keyResponsibilities?: string[];
  benefits?: string[];
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
    requirements: [],
    keyResponsibilities: [],
    benefits: [],
  });

  // Fill form when editing
  useEffect(() => {
    if (editJob) {
      setFormData({
        title: editJob.title,
        description: editJob.description,
        location: editJob.location,
        employmentType: editJob.employmentType,
        status: editJob.status,
        requirements: editJob.requirements || [],
        keyResponsibilities: editJob.keyResponsibilities || [],
        benefits: editJob.benefits || [],
      });
    } else {
      setFormData({
        title: "",
        description: "",
        location: "",
        employmentType: "Full-time",
        status: "Open",
        requirements: [],
        keyResponsibilities: [],
        benefits: [],
      });
    }
  }, [editJob, show]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    field: "requirements" | "keyResponsibilities" | "benefits",
    index: number,
    value: string
  ) => {
    const updated = [...(formData[field] || [])];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field: "requirements" | "keyResponsibilities" | "benefits") => {
    setFormData((prev) => ({ ...prev, [field]: [...(prev[field] || []), ""] }));
  };

  const removeArrayItem = (field: "requirements" | "keyResponsibilities" | "benefits", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Clean empty strings before sending
    const cleanedData: JobFormData = {
      ...formData,
      requirements: formData.requirements?.filter((x) => x.trim() !== "") || [],
      keyResponsibilities: formData.keyResponsibilities?.filter((x) => x.trim() !== "") || [],
      benefits: formData.benefits?.filter((x) => x.trim() !== "") || [],
    };

    onSubmit(cleanedData);
  };

  if (!show) return null;

  const renderArrayField = (
    label: string,
    field: "requirements" | "keyResponsibilities" | "benefits",
    placeholderPrefix: string
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {(formData[field] || []).map((item, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(field, index, e.target.value)}
            placeholder={`${placeholderPrefix} ${index + 1}`}
            className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
          />
          {formData[field]?.length! > 0 && (
            <button
              type="button"
              onClick={() => removeArrayItem(field, index)}
              className="text-red-500 hover:text-red-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem(field)}
        className="text-blue-600 text-sm hover:underline"
      >
        + Add {label.slice(0, -1)}
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-lg max-h-[90vh] flex flex-col">

        {/* Header */}
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
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Job Description"
              rows={3}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
            />

            {renderArrayField("Requirements", "requirements", "Requirement")}
            {renderArrayField("Key Responsibilities", "keyResponsibilities", "Responsibility")}
            {renderArrayField("Benefits", "benefits", "Benefit")}

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
              <option value="Internship">Internship</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Draft">Draft</option>
            </select>
          </form>
        </div>

        {/* Footer */}
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
