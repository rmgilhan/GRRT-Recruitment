import React, { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, MapPin, Clock } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  location: string;
  datePosted: string;
  description: string;
  requirements: string[];
  employmentType: string;
  status: string;
}

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/jobs");
        setJobs(res.data.jobPosted);
        
        // ✅ Add this here: Force scroll to top after data is loaded and rendered
        window.scrollTo(0, 0); 
        
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading jobs...</div>;
  }

  return (
    <div id="_top" className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-emerald-700">
        Available Job Openings
      </h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No job postings found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="w-5 h-5 text-emerald-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  {job.title}
                </h2>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-3 gap-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />{" "}
                  {new Date(job.datePosted).toLocaleDateString()}
                </div>
              </div>

              <p className="text-gray-700 mb-4">{job.description}</p>

              <h3 className="text-sm font-semibold mb-1">Requirements:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>

              <div className="flex justify-between items-center text-sm">
                <span
                  className={`px-3 py-1 rounded-full ${
                    job.status === "Open"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {job.status}
                </span>
                <span className="text-emerald-600 font-medium">
                  {job.employmentType}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
