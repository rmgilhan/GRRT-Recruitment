import React, { useState, useRef } from "react";
import useJob from "@hooks/useJob";
import { X, Paperclip, Send, Loader2, FileText } from "lucide-react";

interface Job {
  _id: string;
  title: string;
}

interface ApplyModalProps {
  show: boolean;
  onClose: () => void;
  job: Job;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ show, onClose, job }) => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const { applyJob } = useJob();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!show) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("jobId", job._id!);
    formData.append("jobTitle", job.title);

    try {
      const result = await applyJob(formData);
      if (result && result.isConfirmed) {
        form.reset();
        setFileName("");
        onClose();
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-gray-800">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Email Header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between text-white">
          <h3 className="text-sm font-semibold tracking-wide">Compose Application</h3>
          <button 
            onClick={onClose} 
            className="hover:bg-gray-700 p-1 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Recipient / Subject Section */}
          <div className="px-5 border-b bg-gray-50/50">
            <div className="flex py-3 border-b border-gray-100 text-sm items-center">
              <span className="text-gray-400 w-16">To:</span>
              <span className="font-medium">Hiring Team • Recruitment</span>
            </div>
            <div className="flex py-3 text-sm items-center">
              <span className="text-gray-400 w-16">Subject:</span>
              <span className="font-semibold text-indigo-700">Application: {job.title}</span>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-5">
            <div className="relative">
              <input
                name="name"
                placeholder="Full Name"
                required
                className="w-full border-b border-gray-200 focus:border-indigo-600 outline-none py-2 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="w-full border-b border-gray-200 focus:border-indigo-600 outline-none py-2 transition-all"
              />
              <input
                name="phone"
                placeholder="Contact Number"
                required
                className="w-full border-b border-gray-200 focus:border-indigo-600 outline-none py-2 transition-all"
              />
            </div>

            <div className="pt-2 text-gray-500 text-sm">
              <p>Dear Hiring Manager,</p>
              <p className="mt-2 italic">I am writing to express my interest in the {job.title} position. Please find my resume attached below.</p>
            </div>
          </div>

          {/* Attachment Display Area */}
          <div className="px-6 min-h-[40px]">
            {fileName && (
              <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-2 rounded-lg w-fit text-sm text-indigo-700 animate-in slide-in-from-bottom-2">
                <FileText size={16} />
                <span className="max-w-[250px] truncate font-medium">{fileName}</span>
                <button 
                  type="button" 
                  onClick={() => { setFileName(""); if(fileInputRef.current) fileInputRef.current.value = ""; }}
                  className="ml-2 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="p-4 mt-2 flex items-center justify-between border-t bg-gray-50">
            <div className="flex items-center gap-2">
              <label className="cursor-pointer group flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition p-2 rounded-lg hover:bg-white border border-transparent hover:border-gray-200">
                <Paperclip size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-medium">Attach PDF</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="resume"
                  accept=".pdf"
                  required
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-indigo-200"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Application
                  <Send size={18} className="-rotate-12" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;