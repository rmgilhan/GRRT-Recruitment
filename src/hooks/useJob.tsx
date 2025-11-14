import axios from "axios";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import UserContext from "@context/UserContext";
import * as UserTypes from "../types/user"; // ✅ cleaner import path

const API_URL = import.meta.env.VITE_API_URL;

export interface Job {
  _id?: string;
  title: string;
  description: string;
  requirements: string[];
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
      // Optionally add the new job to local state
      setJobsData((prev) => [...prev, job]);
      Swal.fire("Success", message || "Job has been successfully posted.", "success");
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
   * Update Job
   */

  const updateJob = async (jobId: string, updatedData: Partial<JobFormData>): Promise<void> => {
	  try {
	    const response = await axios.put(
	      `${API_URL}/jobs/${jobId}`,
	      updatedData, // ✅ send the data to update
	      {
	        headers: {
	          Authorization: `Bearer ${localStorage.getItem("token")}`,
	        },
	      }
	    );

	    // ✅ Update the job in local state
	    setJobsData((prev) =>
	      prev.map((job) => (job._id === jobId ? response.data : job))
	    );

	    Swal.fire("Updated", "Job has been updated.", "success");
	  } catch (error: any) {
	    console.error("Error updating job:", error.response?.data || error.message);
	    Swal.fire("Error", "Failed to update job.", "error");
	  }
	};


  /**
   * 🗑️ Delete Job
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

  return {
    user,
    jobsData,
    loading,
    listJobs,
    entryJob,
    updateJob,
    deleteJob,
  };
}
