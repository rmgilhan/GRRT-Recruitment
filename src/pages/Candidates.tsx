// src/pages/CandidatesPage.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";
import useCandidates from "@hooks/useCandidates";
import LinkedInSearchPage from "./LinkedlnPageSearch";
import ContactStageModal from "@components/modals/ContactStageModal";
import EndorseClientModal from "@components/modals/EndorseClientModal";
import CandidateEndorsementTab from "@components/candidates/CandidateEndorsementTab";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type Stage =
  | "contact"
  | "screening"
  | "endorsement"
  | "candidateEndorsement";

export default function CandidatesPage() {
  const {
    setCandidates,
    candidates,
    loading,
    error,
    fetchCandidates,
    moveToContactStage,
    moveToFirstScreening,
    deleteCandidateProfile,
  } = useCandidates();

  const [activeStage, setActiveStage] = useState<Stage>("contact");
  const [showLinkedInTool, setShowLinkedInTool] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showEndorseModal, setShowEndorseModal] = useState(false);

  const navigate = useNavigate();

  /** Fetch candidates when switching tab */
  useEffect(() => {
    setCandidates([]);
    fetchCandidates(activeStage);
  }, [activeStage]);

  /** Handling next-step button */
  const handleMoveToNextStage = (candidate: any) => {
    setSelectedCandidate(candidate);

    switch (activeStage) {
      case "contact":
        setShowContactModal(true);
        break;

      case "screening":
        setShowEndorseModal(true);
        break;

      case "endorsement":
        navigate(`/candidateProfile/${candidate._id}`, {
          state: {
            candidate,
            searchStage: "screening",
          },
        });
        break;

      case "candidateEndorsement":
        navigate(`/candidateEndorsement/${candidate._id}`, {
          state: {
            candidate,
            searchStage: "candidateEndorsement",
          },
        });
        break;
    }
  };

  /** Stage Tabs */
  const stageTabs = [
    { key: "contact", label: "Contact Stage" },
    { key: "screening", label: "First Screening" },
    { key: "endorsement", label: "Candidate Profile" },
    { key: "candidateEndorsement", label: "Candidate Endorsement" },
  ];

  /** CTA Buttons */
  const nextActionLabel = {
    contact: "Move to First Screening",
    screening: "Screen Candidate",
    endorsement: "Create Profile",
    candidateEndorsement: "Endorse Candidate",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Candidates Dashboard</h1>

      {/* LinkedIn Search */}
      <div className="text-right">
        <Button
          onClick={() => setShowLinkedInTool(true)}
          className="bg-amber-400 hover:bg-amber-500"
        >
          🔍 LinkedIn Search Tool
        </Button>
      </div>

      {/* Stage Tabs */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {stageTabs.map((tab) => (
          <Button
            key={tab.key}
            onClick={() => setActiveStage(tab.key as Stage)}
            className={`px-4 py-2 ${
              activeStage === tab.key
                ? "bg-sky-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Loading / Error */}
      {loading && (
        <p className="text-center text-gray-500">Loading candidates...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* ===================================================== */}
      {/* 🚀 RENDER TABLE FOR "Candidate Endorsement" TAB ONLY */}
      {/* ===================================================== */}
      {activeStage === "candidateEndorsement" ? (
        <CandidateEndorsementTab
          candidates={candidates}
          onDelete={async (id) => {
            const result = await Swal.fire({
              title: "Are you sure?",
              text: "Do you really want to delete this candidate?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete",
              cancelButtonText: "Cancel",
              confirmButtonColor: "#dc2626",
              cancelButtonColor: "#6b7280",
            });

            if (result.isConfirmed) {
              await deleteCandidateProfile(id);
              fetchCandidates("candidateEndorsement");
            }
          }}
        />

      ) : (
        /* ===================================================== */
        /* OTHERWISE — render the old card layout                */
        /* ===================================================== */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {candidates.map((c) => {
            const base = c.initialScreeningId || c;

            return (
              <Card
                key={c._id}
                className="p-4 shadow flex flex-col justify-between h-full"
              >
                <CardContent className="space-y-2">
                  <h2 className="font-semibold text-xl">
                    {base.name || base.fullName}
                  </h2>

                  {/* Contact Stage */}
                  {activeStage === "contact" && base.linkedInUrl && (
                    <a
                      href={base.linkedInUrl}
                      target="_blank"
                      className="text-blue-600 underline text-sm"
                    >
                      View LinkedIn
                    </a>
                  )}

                  {/* Screening Stage */}
                  {activeStage === "screening" && (
                    <>
                      <p>Email: {c.email}</p>
                      <p>Phone: {c.phone}</p>
                      <p>Address: {c.address}</p>
                    </>
                  )}

                  {/* Candidate Profile Stage */}
                  {activeStage === "endorsement" && (
                    <>
                      <p>Current Salary: {c.currentSalary}</p>
                      <p>Asking Salary: {c.askingSalary}</p>
                      <p>
                        Interviewer: {c.grrtInterview?.interviewer || "-"}
                      </p>
                      <p>Remarks: {c.grrtInterview?.remarks || "-"}</p>
                    </>
                  )}

                  {/* Candidate Endorsement Stage (Card View) */}
                  {activeStage === "candidateEndorsement" && (
                    <>
                      <p className="text-sm font-medium">
                        Ready for Candidate Endorsement
                      </p>
                      <p className="text-xs text-gray-500">
                        Ensure the candidate profile is complete before
                        endorsing.
                      </p>
                    </>
                  )}

                  <p className="text-sm font-semibold">Status: {c.status}</p>
                </CardContent>

                <Button
                  onClick={() => handleMoveToNextStage(c)}
                  className="mt-2 bg-green-600 hover:bg-green-700"
                >
                  {nextActionLabel[activeStage]}
                </Button>
              </Card>
            );
          })}
        </div>
      )}

      {/* ================= Modals ================= */}

      {/* Contact Modal */}
      {selectedCandidate && (
        <ContactStageModal
          open={showContactModal}
          onClose={() => setShowContactModal(false)}
          candidate={selectedCandidate}
          onSubmit={async (form) => {
            await moveToContactStage(form);
            fetchCandidates(activeStage);
            setShowContactModal(false);
          }}
        />
      )}

      {/* First Screening Modal */}
      {selectedCandidate && (
        <EndorseClientModal
          open={showEndorseModal}
          onClose={() => setShowEndorseModal(false)}
          candidate={selectedCandidate}
          onSubmit={async (form) => {
            await moveToFirstScreening(form);
            fetchCandidates(activeStage);
            setShowEndorseModal(false);
          }}
        />
      )}

      {/* LinkedIn Modal */}
      {showLinkedInTool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowLinkedInTool(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <LinkedInSearchPage />
          </div>
        </div>
      )}
    </div>
  );
}
