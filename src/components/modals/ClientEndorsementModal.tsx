// src/components/modals/ClientEndorsementModal.tsx
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as CandidateTypes from "../../types/ICandidate";
import { Button, Modal, Input, Select, Textarea } from "@components/ui";

type ICandidate = CandidateTypes.ICandidate;

export type ClientEndorsementForm = {
  skills: { name: string; level: string; yearsOfExperience: number }[];
  education: {
    schoolName: string;
    degree: string;
    fieldOfStudy?: string;
    startYear?: number;
    endYear?: number;
  }[];
  experience: {
    companyName: string;
    position: string;
    startDate: string;
    endDate?: string;
    responsibilities?: string;
  }[];
  status: string;
};

interface ClientEndorsementModalProps {
  open: boolean;
  onClose: () => void;
  candidate: ICandidate;
  onSubmit: (data: ClientEndorsementForm) => Promise<void>;
}

const panel = "bg-white p-4 border border-gray-200 rounded-xl shadow-sm space-y-4";
const fieldGroup = "space-y-1";
const label = "font-medium text-sm text-gray-700";

const ClientEndorsementModal: React.FC<ClientEndorsementModalProps> = ({
  open,
  onClose,
  candidate,
  onSubmit,
}) => {
  if (!candidate) return null;

  const { control, handleSubmit, register } = useForm<ClientEndorsementForm>({
    defaultValues: {
      skills: candidate.skills?.length
        ? candidate.skills
        : [{ name: "", level: "Beginner", yearsOfExperience: 0 }],
      education: candidate.education?.length
        ? candidate.education
        : [{ schoolName: "", degree: "", fieldOfStudy: "", startYear: undefined, endYear: undefined }],
      experience: candidate.experience?.length
        ? candidate.experience
        : [{ companyName: "", position: "", startDate: "", endDate: "", responsibilities: "" }],
      status: candidate.endorsements?.[0]?.status || "Endorsed",
    },
  });

  const skills = useFieldArray({ control, name: "skills" });
  const edu = useFieldArray({ control, name: "education" });
  const exp = useFieldArray({ control, name: "experience" });

  return (
    <Modal isOpen={open} onClose={onClose} footer={null}>
      {/* Header */}
      <div className="-mx-6 -mt-6 flex justify-between items-center bg-amber-500 text-white px-4 py-3 rounded-t-xl">
        <h2 className="text-lg font-semibold">Client Endorsement</h2>
        <button
          onClick={onClose}
          className="text-white text-xl font-bold hover:text-gray-200"
        >
          ✖
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-18 max-h-[70vh] overflow-y-auto p-4">

        {/* Candidate Info */}
        <div className={panel}>
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Candidate Information</h2>
          <div className={fieldGroup}>
            <label className={label}>Full Name</label>
            <Input value={candidate.initialScreeningId.name || ""} readOnly />
          </div>
          <div className={fieldGroup}>
            <label className={label}>Position Applied</label>
            <Input value={candidate.initialScreeningId.positionApplied || ""} readOnly />
          </div>
        </div>

        {/* Skills */}
        <div className={panel}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
            <Button
              type="button"
              className="text-xl bg-sky-500 hover:bg-sky-600 text-black px-2 py-1"
              onClick={() => skills.append({ name: "", level: "Beginner", yearsOfExperience: 0 })}
            >
              +
            </Button>
          </div>

          {skills.fields.map((item, idx) => (
            <div key={item.id} className="p-4 bg-gray-50 border rounded-lg mb-3">
              {/* Skill Name row with inline remove button */}
              <div className="flex items-center justify-between mb-2">
                <label className={label}>Skill Name</label>
                <Button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white text-xl w-4 h-6 flex items-center justify-center"
                  onClick={() => skills.remove(idx)}
                >
                  -
                </Button>
              </div>
              <Input {...register(`skills.${idx}.name`)} placeholder="e.g. JavaScript" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div>
                  <label className={label}>Level</label>
                  <Select {...register(`skills.${idx}.level`)}>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </Select>
                </div>
                <div>
                  <label className={label}>Years of Experience</label>
                  <Input type="number" {...register(`skills.${idx}.yearsOfExperience`)} min={0} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className={panel}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Education</h2>
            <Button
              type="button"
              className="text-xl hover:bg-sky-600 text-black px-3 py-1"
              onClick={() => edu.append({ schoolName: "", degree: "", fieldOfStudy: "", startYear: undefined, endYear: undefined })}
            >
              +
            </Button>
          </div>

          {edu.fields.map((item, idx) => (
            <div key={item.id} className="p-4 bg-gray-50 border rounded-lg mb-3">
              {/* School Name row with inline remove button */}
              <div className="flex items-center justify-between mb-2">
                <label className={label}>School Name</label>
                <Button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full"
                  onClick={() => edu.remove(idx)}
                >
                  -
                </Button>
              </div>
              <Input {...register(`education.${idx}.schoolName`)} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div>
                  <label className={label}>Degree</label>
                  <Input {...register(`education.${idx}.degree`)} />
                </div>
                <div>
                  <label className={label}>Field of Study</label>
                  <Input {...register(`education.${idx}.fieldOfStudy`)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <label className={label}>Start Year</label>
                  <Input type="number" {...register(`education.${idx}.startYear`)} />
                </div>
                <div>
                  <label className={label}>End Year</label>
                  <Input type="number" {...register(`education.${idx}.endYear`)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className={panel}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
            <Button
              type="button"
              className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded"
              onClick={() => exp.append({ companyName: "", position: "", startDate: "", endDate: "", responsibilities: "" })}
            >
              + Add Experience
            </Button>
          </div>

          {exp.fields.map((item, idx) => (
            <div key={item.id} className="p-4 bg-gray-50 border rounded-lg mb-3">
              {/* Company Name row with inline remove button */}
              <div className="flex items-center justify-between mb-2">
                <label className={label}>Company Name</label>
                <Button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full"
                  onClick={() => exp.remove(idx)}
                >
                  -
                </Button>
              </div>
              <Input {...register(`experience.${idx}.companyName`)} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div>
                  <label className={label}>Position</label>
                  <Input {...register(`experience.${idx}.position`)} />
                </div>
                <div>
                  <label className={label}>Start Date</label>
                  <Input type="date" {...register(`experience.${idx}.startDate`)} />
                </div>
                <div>
                  <label className={label}>End Date</label>
                  <Input type="date" {...register(`experience.${idx}.endDate`)} />
                </div>
              </div>

              <div className={fieldGroup}>
                <label className={label}>Responsibilities</label>
                <Textarea {...register(`experience.${idx}.responsibilities`)} />
              </div>
            </div>
          ))}
        </div>

        {/* Candidate Status */}
        <div className={panel}>
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Candidate Status</h2>
          <div className={fieldGroup}>
            <label className={label}>Status</label>
            <Select {...register("status")}>
              {["Endorsed", "Client Feedback", "Hired", "Rejected"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2">
          Save Candidate Profile
        </Button>
      </form>
    </Modal>
  );
};

export default ClientEndorsementModal;
