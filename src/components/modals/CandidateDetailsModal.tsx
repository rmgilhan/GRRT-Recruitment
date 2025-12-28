import React from "react";
import { FaTimes } from "react-icons/fa";
import { Button } from "@components/ui/button";
interface CandidateDetailsModalProps {
  candidate: any;
  onClose: () => void;
}

const CandidateDetailsModal: React.FC<CandidateDetailsModalProps> = ({
  candidate,
  onClose,
}) => {
  if (!candidate) return null;

  const handleDownloadResume = async () => {
  if (!candidate?.resumeUrl) return;

      try {
        const token = localStorage.getItem("token"); // or wherever you store JWT
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/candidates/resume/${candidate.resumeUrl}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to download resume");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${candidate.fullName}_Resume.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(error);
        alert("Failed to download resume");
      }
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-600"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-amber-600">
          Candidate Details
        </h2>

        {/* BASIC INFO */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <p><strong>Name:</strong> {candidate.fullName}</p>
            <p><strong>Email:</strong> {candidate.email || "—"}</p>
            <p><strong>Phone:</strong> {candidate.phone || "—"}</p>
            <p><strong>Address:</strong> {candidate.address || "—"}</p>
            <p><strong>Position Applied:</strong> {candidate.positionApplied || "—"}</p>
            <p><strong>Current Salary:</strong> {candidate.currentSalary || "—"}</p>
            <p><strong>Asking Salary:</strong> {candidate.askingSalary || "—"}</p>
          </div>
        </div>

        {/* RESUME */}
        {candidate?.resumeUrl && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Resume</h3>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // prevent default link navigation
              handleDownloadResume();
            }}
            className="text-blue-600 hover:underline"
          >
            Download Resume
          </a>
        </div>
      )}


        {/* SKILLS */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          {candidate.skills?.length > 0 ? (
            <ul className="list-disc list-inside">
              {candidate.skills.map((skill: any) => (
                <li key={skill._id}>
                  <strong>{skill.name}</strong> — {skill.level} ({skill.yearsOfExperience} yrs)
                </li>
              ))}
            </ul>
          ) : (
            <p>—</p>
          )}
        </div>

        {/* EDUCATION */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          {candidate.education?.length > 0 ? (
            candidate.education.map((edu: any) => (
              <div key={edu._id} className="mb-3 p-3 bg-gray-100 rounded-lg">
                <p><strong>Level:</strong> {edu.level}</p>
                <p><strong>School:</strong> {edu.schoolName}</p>
                <p><strong>Address:</strong> {edu.address}</p>
                <p><strong>Degree:</strong> {edu.degree || "—"}</p>
                <p><strong>Field:</strong> {edu.fieldOfStudy || "—"}</p>
                <p><strong>Years:</strong> {edu.startYear} - {edu.endYear}</p>
                <p><strong>Completed:</strong> {edu.isCompleted ? "Yes" : "No"}</p>
              </div>
            ))
          ) : (
            <p>—</p>
          )}
        </div>

        {/* EXPERIENCE */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Experience</h3>
          {candidate.experience?.length > 0 ? (
            candidate.experience.map((exp: any) => (
              <div key={exp._id} className="mb-3 p-3 bg-gray-100 rounded-lg">
                <p><strong>Company:</strong> {exp.companyName}</p>
                <p><strong>Position:</strong> {exp.position}</p>
                <p><strong>Start:</strong> {new Date(exp.startDate).toLocaleDateString()}</p>
                <p><strong>End:</strong> {new Date(exp.endDate).toLocaleDateString()}</p>

                <p className="mt-2"><strong>Responsibilities:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  {exp.responsibilities?.map((r: string, idx: number) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>—</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsModal;
