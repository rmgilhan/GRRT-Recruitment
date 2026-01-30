import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { X, Briefcase, MapPin, ClipboardList, Plus, Trash2, CheckCircle2 } from "lucide-react";

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

  useEffect(() => {
    if (editJob) {
      setFormData({ ...editJob });
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: "requirements" | "keyResponsibilities" | "benefits", index: number, value: string) => {
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
    const cleanedData: JobFormData = {
      ...formData,
      requirements: formData.requirements?.filter((x) => x.trim() !== "") || [],
      keyResponsibilities: formData.keyResponsibilities?.filter((x) => x.trim() !== "") || [],
      benefits: formData.benefits?.filter((x) => x.trim() !== "") || [],
    };
    onSubmit(cleanedData);
  };

  if (!show) return null;

  const renderArrayField = (label: string, field: "requirements" | "keyResponsibilities" | "benefits", icon: React.ReactNode) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
        {icon}
        <span>{label}</span>
      </div>
      <div className="space-y-2">
        {(formData[field] || []).map((item, index) => (
          <div key={index} className="group flex items-center gap-2 animate-in slide-in-from-left-2 duration-200">
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange(field, index, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()} item...`}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <button
              type="button"
              onClick={() => removeArrayItem(field, index)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => addArrayItem(field)}
        className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors py-1"
      >
        <Plus size={14} /> Add {label.slice(0, -1)}
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 transition-all">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Briefcase size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300">
                {editJob ? "Update Listing" : "Create Posting"}
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">Internal Job Management</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-slate-800 p-1.5 rounded-lg transition-all active:scale-90">
            <X size={20} />
          </button>
        </div>

        <form id="jobForm" onSubmit={handleSubmit} className="flex flex-col max-h-[80vh]">
          {/* Main Content Area */}
          <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
            
            {/* Title & Description */}
            <div className="space-y-6">
              <div className="relative group">
                <input
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full border-b-2 border-slate-200 bg-transparent py-2 outline-none transition-all focus:border-indigo-600"
                />
                <label className="absolute left-0 -top-3.5 text-xs font-bold text-slate-400 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-indigo-600">
                  Job Title
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Summary</label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe the role and ideal candidate..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all text-sm resize-none"
                />
              </div>
            </div>

            {/* Dynamic Lists */}
            <div className="grid grid-cols-1 gap-8 pt-4 border-t border-slate-100">
              {renderArrayField("Requirements", "requirements", <ClipboardList size={14} className="text-indigo-500" />)}
              {renderArrayField("Key Responsibilities", "keyResponsibilities", <CheckCircle2 size={14} className="text-emerald-500" />)}
            </div>

            {/* Location & Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Location</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Employment</label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-600 appearance-none cursor-pointer"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg text-sm font-bold outline-none cursor-pointer appearance-none ${
                    formData.status === 'Open' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 
                    formData.status === 'Closed' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-slate-50/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:border-slate-300 border border-transparent transition-all active:scale-95"
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-10 py-2.5 rounded-xl font-bold tracking-tight hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95 shadow-md"
            >
              {editJob ? "Save Changes" : "Post Job Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;