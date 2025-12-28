import React, { useState } from "react";
import { FaEye, FaTrash, FaPen } from "react-icons/fa";
import CandidateDetailsModal from "@components/modals/CandidateDetailsModal";
import { useNavigate } from "react-router-dom";

interface CandidateEndorsementTabProps {
  candidates: any[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => void;
}

const CandidateEndorsementTab: React.FC<CandidateEndorsementTabProps> = ({
  candidates,
  loading,
  error,
  onDelete,
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  /** Open modal preview */
  const handleViewModal = (candidate: any) => {
    setSelectedCandidate(candidate);
    setOpenModal(true);
  };

  /** Navigate to full candidate profile/edit page */
  const handleNavigateProfile = (candidate: any) => {
    navigate(`/candidateProfile/${candidate._id}`, { state: { candidate } });
  };

  /** Call parent's delete handler */
  const handleDelete = (id: string) => {
    onDelete(id); // parent handles Swal confirm + deletion + refresh
  };

  return (
    <div className="w-full mt-4">
      {loading && <p>Loading candidates…</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Candidate Name</th>
              <th className="p-3 text-left">Position Applied</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {candidates.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No candidates found.
                </td>
              </tr>
            ) : (
              candidates.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 border-b transition">
                  <td className="p-3">{c.fullName}</td>
                  <td className="p-3">{c.positionApplied || "—"}</td>

                  <td className="p-3 text-center flex justify-center gap-3">
                    {/* Modal Preview */}
                    <button
                      onClick={() => handleViewModal(c)}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      title="Quick View"
                    >
                      <FaEye size={16} />
                    </button>

                    {/* Full Page Edit/Profile */}
                    <button
                      onClick={() => handleNavigateProfile(c)}
                      className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      title="Open Full Profile"
                    >
                      <FaPen size={16} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      title="Delete Candidate"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Preview */}
      {openModal && selectedCandidate && (
        <CandidateDetailsModal
          candidate={selectedCandidate}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default CandidateEndorsementTab;
