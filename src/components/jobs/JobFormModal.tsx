import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Job } from "../types/Job";

interface JobFormModalProps {
  job: Job | null;
  onSave: (job: Job) => void;
  onClose: () => void;
}

export default function JobFormModal({ job, onSave, onClose }: JobFormModalProps) {
  const [form, setForm] = useState<Job>({
    title: "",
    description: "",
    requirements: [""],
    employmentType: "Full-time",
    location: "",
    status: "Open",
  });

  useEffect(() => {
    if (job) setForm(job);
  }, [job]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReqChange = (index: number, value: string) => {
    const updated = [...form.requirements];
    updated[index] = value;
    setForm({ ...form, requirements: updated });
  };

  const addRequirement = () =>
    setForm({ ...form, requirements: [...form.requirements, ""] });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const method = job?._id ? "PUT" : "POST";
    const url = job?._id ? `/api/jobs/${job._id}` : "/api/jobs";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const savedJob: Job = await res.json();
    onSave(savedJob);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px]">
        <div className="bg-emerald-500 px-4 py-2">
          <h2 className="text-lg font-semibold mb-4">
            {job ? "Edit Job" : "Add New Job"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full p-2 border rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="w-full p-2 border rounded"
          />

          <div>
            <label className="font-medium">Requirements</label>
            {form.requirements.map((req, i) => (
              <input
                key={i}
                value={req}
                onChange={(e) => handleReqChange(i, e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder={`Requirement ${i + 1}`}
              />
            ))}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={addRequirement}
            >
              + Add Requirement
            </button>
          </div>

          <input
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
            placeholder="Employment Type"
            className="w-full p-2 border rounded"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 border rounded"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
              {job ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
