import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

export interface Candidate {
  _id: string;
  name: string;
  linkedInUrl: string;
  positionApplied: string;
  status: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface ContactStageInput {
  initialScreeningId: string;
  email: string;
  phone: string;
  address: string;
}

export interface ContactStageResponse {
  _id: string;
  initialScreeningId: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface FirstScreeningForm {
  candidateId: string;
  resume: File;
  currentSalary: number;
  askingSalary: number;
  interviewer: string;
  remarks: string;
}

// -------------------- Candidate Model Types --------------------
export type Skill = {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience: number;
};

export type Education = {
  level: string;
  schoolName: string;
  address?: string;
  degree?: string;
  fieldOfStudy?: string;
  courseName?: string;
  startYear?: number;
  endYear?: number;
  isCompleted?: boolean;
};

export type Experience = {
  companyName: string;
  position: string;
  startDate: string | Date;
  endDate?: string | Date;
  responsibilities: string[];
};

export type CandidateProfilePayload = {
  skills?: Skill[];
  education?: Education[];
  experience?: Experience[];
};


// -------------------- useCandidates Hook --------------------
export default function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const authHeaders = { Authorization: `Bearer ${token}` };

  if (!token) console.warn("No auth token found. Some actions will fail.");

  // -------------------- Fetch candidates --------------------
  const fetchCandidates = async (stage: "contact" | "screening" | "endorsement") => {
    setLoading(true);
    setError(null);

    let page: string;
    switch (stage) {
      case "contact":
        page = "/initial-screening";
        break;
      case "screening":
        page = "/contact";
        break;
      case "endorsement":
        page = "/screening";
        break;
      case "candidateEndorsement":
        page = "/";
        break;
      default:
        setError("Invalid stage");
        setLoading(false);
        return;
    }

    try {
      const response = await axios.get(`${API_URL}/candidates${page}`, { headers: authHeaders });
      // console.log(response.data.data)
      setCandidates(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Add to Initial Screening --------------------
  const addToInitial = async (candidate: Partial<Candidate>) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(`${API_URL}/candidates/initial-screening`, candidate, {
        headers: authHeaders,
      });
      setCandidates((prev) => [response.data.data, ...prev]);
      setSuccessMessage("Candidate added to Initial Screening.");
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Move to Contact Stage --------------------
  const moveToContactStage = async (data: ContactStageInput & { name: string }) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post<ContactStageResponse>(`${API_URL}/candidates/contact`, data, {
        headers: authHeaders,
      });
      setSuccessMessage("Candidate moved to Contact Stage.");
      setCandidates((prev) => prev.filter((c) => c.name !== data.name));
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Move to First Screening --------------------
  const moveToFirstScreening = async (formData: FirstScreeningForm) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const data = new FormData();
      data.append("resume", formData.resume);
      data.append("candidateId", formData.candidateId);
      data.append("currentSalary", String(formData.currentSalary));
      data.append("askingSalary", String(formData.askingSalary));
      data.append("interviewer", formData.interviewer);
      data.append("remarks", formData.remarks);

      const response = await axios.post(`${API_URL}/candidates/screening`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage("Candidate moved to First Screening.");
      setCandidates((prev) => prev.filter((c) => c._id !== formData.candidateId));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createCandidateProfile = async (
  candidateId: string,
  payload: CandidateProfilePayload
) => {
  setLoading(true);
  setError(null);

  try {
    const response = await axios.post(
      `${API_URL}/candidates/candidateProfile/${candidateId}`,
      payload,
      { headers: authHeaders }
    );

    // SUCCESS POPUP
    Swal.fire({
      title: "Success",
      text: "Candidate profile created successfully.",
      icon: "success",
      confirmButtonColor: "#2563eb" // optional styling
    });

    // Remove candidate from list if _id exists
    if (payload._id) {
      setCandidates((prev) => prev.filter((c) => c._id !== payload._id));
    }

    return response.data;
  } catch (err: any) {
    const message =
      err.response?.data?.error ||
      err.response?.data?.message ||
      err.message ||
      "Unknown error";

    setError(message);

    // ERROR POPUP
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonColor: "#dc2626"
    });

    return null;
  } finally {
    setLoading(false);
  }
};


const deleteCandidateProfile = async (candidateId: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/candidates/${candidateId}`,
      {
        headers: authHeaders,
      }
    );

    const { deletedCandidate, message } = response.data;

    if (!deletedCandidate) {
      Swal.fire("Warning", message || "Something went wrong.", "warning");
      return;
    }

    Swal.fire("Success", message || "Candidate has been successfully deleted.", "success");
  } catch (err: any) {
    setError(err.response?.data?.error || err.message || "Unknown error");
    return null;
  }
};

  return {
    candidates,
    setCandidates,
    loading,
    error,
    successMessage,
    fetchCandidates,
    addToInitial,
    moveToContactStage,
    moveToFirstScreening,
    // endorseCandidateToClient,
    createCandidateProfile,
    deleteCandidateProfile
  };
}
