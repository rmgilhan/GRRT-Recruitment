import React, { useState, useEffect } from "react";
import {Button} from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";

interface Props {
  open: boolean;
  onClose: () => void;
  candidate: any;
  onSubmit: (formData: any) => Promise<void>;
}

export default function EndorseClientModal({ open, onClose, candidate, onSubmit }: Props) {
  const [form, setForm] = useState<{
    resume?: File;
    currentSalary: string;
    askingSalary: string;
    interviewer: string;
    remarks: string;
  }>({
    currentSalary: "",
    askingSalary: "",
    interviewer: "",
    remarks: "",
  });


  // Reset form when candidate changes
  useEffect(() => {
    if (candidate) {
      setForm({
        resume: undefined,
        currentSalary: "",
        askingSalary: "",
        interviewer: "",
        remarks: "",
      });
    }
  }, [candidate]);


  if (!open || !candidate) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    if (!form.resume) {
      alert("Please upload a resume PDF.");
      return;
    }

    const payload: FirstScreeningForm = {
      candidateId: candidate._id,
      resume: form.resume, // File object
      currentSalary: Number(form.currentSalary),
      askingSalary: Number(form.askingSalary),
      interviewer: form.interviewer,
      remarks: form.remarks,
    };

    await onSubmit(payload);
    onClose();
  };


  return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg flex flex-col max-h-[90vh] overflow-hidden">

      {/* HEADER (FIXED) */}
      <div className="p-2 border-b bg-emerald-500">
        <h2 className="text-xl font-lg text-center text-white">First Screening Form</h2>
      </div>

      {/* BODY — scrollable */}
      <div className="overflow-y-auto p-4 space-y-3">

        {/* Read-only Fields */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            value={candidate.initialScreeningId.name}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Position Applied</label>
          <input
            value={candidate.initialScreeningId.positionApplied}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* Editable Fields */}
        <div>
          <label className="block text-sm font-medium">Resume (PDF)</label>
         <input
          type="file"
          name="resume"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />
        </div>


        <div>
          <label className="block text-sm font-medium">Current Salary</label>
          <input
            name="currentSalary"
            type="number"
            value={form.currentSalary}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="42000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Asking Salary</label>
          <input
            name="askingSalary"
            type="number"
            value={form.askingSalary}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="55000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Interviewer</label>
          <input
            name="interviewer"
            value={form.interviewer}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="John Cruz"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Remarks</label>
          <textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Write interview notes..."
            required
          />
        </div>
      </div>

      {/* FOOTER (FIXED) */}
      <div className="p-4 border-t flex justify-end gap-2 bg-white">
        <Button className="bg-gray-400 hover:bg-gray-500" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-amber-500 hover:bg-amber-600" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

    </div>
  </div>
);

}
