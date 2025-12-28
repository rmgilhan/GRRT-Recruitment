import axios from "axios";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import UserContext from "@context/UserContext";
import * as UserTypes from "../types/user";

const API_URL = import.meta.env.VITE_API_URL;

// ⭐ Updated to match backend model
export interface Job {
  _id?: string;
  title: string;
  description: string;

  // NEW FIELDS
  keyResponsibilities?: string[];
  requirements?: string[];
  benefits?: string[];

  employmentType: string;
  location: string;
  status: string;
  datePosted?: string;
}

type User = UserTypes.User;
type UserContextType = UserTypes.UserContextType;

export default function useJob() {
  const { user } = useContext(UserContext) as UserContextType;

  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /**
   * 🧩 Add new Job (Admin only)
   */
  const entryJob = async (jobData: Job): Promise<void> => {
    try {
      if (!user?.id) {
        Swal.fire("Unauthorized", "You must be logged in to post a job.", "warning");
        return;
      }

      setLoading(true);

      const response = await axios.post(`${API_URL}/jobs/createJob`, jobData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { feedback, message, job } = response.data;

      if (feedback === "Success") {
        setJobsData((prev) => [...prev, job]);
        Swal.fire("Success", message || "Job posted successfully.", "success");
      } else {
        Swal.fire("Warning", message || "Something went wrong.", "warning");
      }
    } catch (error: any) {
      console.error("Error posting job:", error.response?.data || error.message);
      Swal.fire("Error", error.response?.data?.message || "Failed to post job.", "error");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 📋 Fetch all Jobs
   */
  const listJobs = async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/jobs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setJobsData(response.data.jobPosted || []);
    } catch (error: any) {
      console.error("Error fetching job details:", error.response?.data || error.message);
      Swal.fire("Error", "Unable to fetch job listings.", "error");
    } finally {
      setLoading(false);
    }
  };

  /**
   * ✏️ Update Job
   */
  const updateJob = async (jobId: string, updatedData: Partial<Job>): Promise<void> => {
    try {
      const response = await axios.put(
        `${API_URL}/jobs/${jobId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // backend returns { message, jobUpdate }
      const updatedJob = response.data.jobUpdate;

      // Update state
      setJobsData((prev) =>
        prev.map((job) => (job._id === jobId ? updatedJob : job))
      );

      Swal.fire("Updated", "Job has been updated.", "success");
    } catch (error: any) {
      console.error("Error updating job:", error.response?.data || error.message);
      Swal.fire("Error", "Failed to update job.", "error");
    }
  };

  /**
   * 🗑 Delete Job
   */
  const deleteJob = async (jobId: string): Promise<void> => {
    try {
      const confirm = await Swal.fire({
        title: "Delete Job?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Delete",
      });

      if (!confirm.isConfirmed) return;

      await axios.delete(`${API_URL}/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setJobsData((prev) => prev.filter((job) => job._id !== jobId));
      Swal.fire("Deleted", "Job has been removed.", "success");
    } catch (error: any) {
      console.error("Error deleting job:", error.response?.data || error.message);
      Swal.fire("Error", "Failed to delete job.", "error");
    }
  };

  /**
   * 🔍 LinkedIn-like Search
   */
  const linkedlnSearch = async (
    q: string,
    page = 1,
    perPage = 10,
    position?: string,
    location?: string
  ) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized. Please log in.");
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_URL}/jobs/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q,
          page,
          perPage,
          ...(position && { position }),
          ...(location && { location }),
        },
      });

      setResults(response.data.results || []);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.page || 1);

      return response.data.cached;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Unknown error");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 📨 Apply for a Job
   */
 const applyJob = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `${API_URL}/applications/apply`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 201 && response.data.success) {
      return Swal.fire({
        icon: "success",
        title: "Application Submitted",
        text: "Your application has been sent successfully.",
        confirmButtonText: "OK",
      });
    }

    return Swal.fire({
      icon: "warning",
      title: "Submission Failed",
      text: response.data.message || "Unable to submit application.",
    });
  } catch (error: any) {
    return Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Something went wrong.",
    });
  }
};


  return {
    user,
    jobsData,
    loading,
    listJobs,
    entryJob,
    updateJob,
    deleteJob,
    results,
    currentPage,
    totalPages,
    error,
    linkedlnSearch,
    setCurrentPage,
    setTotalPages,
    setResults,
    setError,
    applyJob, // ✅ added method
  };
}