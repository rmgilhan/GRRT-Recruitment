// src/pages/ClientEndorsementPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { Button, Input, Select, Textarea } from "@components/ui";
import useCandidates from "@hooks/useCandidates";

const API_URL = import.meta.env.VITE_API_URL;
const panel = "bg-white p-6 border border-gray-200 rounded-xl shadow-sm space-y-4";
const fieldGroup = "space-y-1";
const label = "font-medium text-sm text-gray-700";

/* --------------------------------------------------
      CHILD COMPONENT FOR EXPERIENCE (WITH HOOKS)
-------------------------------------------------- */
const ExperienceItem = ({ idx, item, control, register, removeExp }: any) => {
  const respArray = useFieldArray({
    control,
    name: `experience.${idx}.responsibilities`,
  });

  return (
    <div className="p-4 bg-gray-50 border rounded-lg mb-3">
      <div className="flex justify-between items-center">
        <label className={label}>Company Name</label>
        <Button
          type="button"
          className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full mb-2"
          onClick={() => removeExp(idx)}
        >
          -
        </Button>
      </div>

      <Input
        {...register(`experience.${idx}.companyName`)}
        placeholder="Company Name"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
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

      {/* Responsibilities */}
      <div className="mt-2 space-y-2">
        <label className={label}>Responsibilities</label>

        {respArray.fields.map((resp, rIdx) => (
          <div key={resp.id} className="flex items-center gap-2">
            <Input
              {...register(`experience.${idx}.responsibilities.${rIdx}`)}
              placeholder="Responsibility"
            />
            <Button
              type="button"
              className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
              onClick={() => respArray.remove(rIdx)}
            >
              -
            </Button>
          </div>
        ))}

        <Button
          type="button"
          className="bg-sky-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
          onClick={() => respArray.append("")}
        >
          +
        </Button>
      </div>
    </div>
  );
};

/* --------------------------------------------------
               MAIN PAGE COMPONENT
-------------------------------------------------- */
const ClientEndorsementPage: React.FC = () => {
  const token = localStorage.getItem("token");
  const authHeaders = { Authorization: `Bearer ${token}` };
  const { createCandidateProfile } = useCandidates();

  const { id } = useParams();
  const location = useLocation();

  const [candidate, setCandidate] = useState<any>(location.state?.candidate || null);
  const searchStage = location.state?.searchStage;

  const [loading, setLoading] = useState(!candidate);
  const [error, setError] = useState<string | null>(null);

  /* --------------------------------------------
            FETCH CANDIDATE ON REFRESH
  -------------------------------------------- */
  useEffect(() => {
    if (candidate || !searchStage) return;

    const fetchCandidate = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/candidates/${searchStage}`, {
          headers: authHeaders,
        });

        const found = res.data.data?.find((c: any) => c._id === id);

        if (!found) {
          setError("Candidate not found in this stage.");
          return;
        }
        setCandidate(found);
      } catch {
        setError("Failed to load candidate.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading candidate...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!candidate) return <div className="p-6 text-center">No profile found.</div>;

  /* --------------------------------------------
                    FORM SETUP
  -------------------------------------------- */
  const { control, handleSubmit, register, watch } = useForm({
    defaultValues: {
      skills: candidate.skills?.length
        ? candidate.skills
        : [{ name: "", level: "Beginner", yearsOfExperience: 0 }],

      education: candidate.education?.length
        ? candidate.education
        : [
            {
              level: "",
              schoolName: "",
              address: "",
              degree: "",
              fieldOfStudy: "",
              courseName: "",
              startYear: undefined,
              endYear: undefined,
              isCompleted: true,
            },
          ],

      experience: candidate.experience?.length
        ? candidate.experience
        : [
            {
              companyName: "",
              position: "",
              startDate: "",
              endDate: "",
              responsibilities: [""],
            },
          ],

      // status: candidate.endorsements?.[0]?.status || "Endorsed",
    },
  });

  const skills = useFieldArray({ control, name: "skills" });
  const edu = useFieldArray({ control, name: "education" });
  const exp = useFieldArray({ control, name: "experience" });

  const onSubmit = async (data: any) => {
    if (!candidate?._id) {
      console.error("Candidate ID missing");
      return;
    }

    console.log("Selected Candidate ID:", candidate._id);
    await createCandidateProfile(candidate._id, data);
    console.log("Final submit:", data);
  };


  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Candidate Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* =========================== CANDIDATE INFO ============================== */}
        <div className={panel}>
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
            Candidate Information
          </h2>
          <div className={fieldGroup}>
            <label className={label}>Full Name</label>
            <Input value={candidate.initialScreeningId?.name} readOnly />
          </div>
          <div className={fieldGroup}>
            <label className={label}>Position Applied</label>
            <Input value={candidate.initialScreeningId?.positionApplied} readOnly />
          </div>
        </div>

        {/* =========================== SKILLS ============================== */}
        <div className={panel}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
          </div>

          {skills.fields.map((item, idx) => (
            <div key={item.id} className="p-4 bg-gray-50 border rounded-lg mb-3">
              <div className="flex justify-between items-center mb-2">
                <label className={label}>Skill Name</label>
                <Button
                  type="button"
                  className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
                  onClick={() => skills.remove(idx)}
                >
                  -
                </Button>
              </div>

              <Input {...register(`skills.${idx}.name`)} placeholder="e.g. JavaScript" />

              <div className="mt-2 flex flex-col gap-2">
                <div>
                  <label className={label}>Level</label>
                  <Select
                    {...register(`skills.${idx}.level`)}
                    className="border border-1 border-gray-500 py-1 block my-2"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </Select>
                </div>
                <div>
                  <label className={label}>Years of Experience</label>
                  <Input type="number" {...register(`skills.${idx}.yearsOfExperience`)} />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            className="bg-sky-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
            onClick={() =>
              skills.append({ name: "", level: "Beginner", yearsOfExperience: 0 })
            }
          >
            +
          </Button>
        </div>

        {/* =========================== EDUCATION ============================== */}
        <div className={panel}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Education</h2>
          </div>

          {edu.fields.map((item, idx) => {
            const level = watch(`education.${idx}.level`);

            return (
              <div key={item.id} className="p-4 bg-gray-50 border rounded-lg mb-3">
                <div className="flex justify-between items-center">
                  <label className={label}>School Name</label>
                  <Button
                    type="button"
                    className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full mb-2"
                    onClick={() => edu.remove(idx)}
                  >
                    -
                  </Button>
                </div>

                <Input {...register(`education.${idx}.schoolName`)} placeholder="School name" />

                <div className="mt-2">
                  <label className={label}>Education Level</label>
                  <Select
                    {...register(`education.${idx}.level`)}
                    className="my-2 py-1 block border borde-1 border-gray-500"
                  >
                    <option value="">Select Level</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Senior High">Senior High</option>
                    <option value="College">College</option>
                    <option value="Vocational">Vocational</option>
                    <option value="Training/Short Course">Training/Short Course</option>
                    <option value="Masters">Masters</option>
                    <option value="Doctorate">Doctorate</option>
                    <option value="Other">Other</option>
                  </Select>
                </div>

                <div className="mt-2">
                  <label className={label}>Address</label>
                  <Input {...register(`education.${idx}.address`)} placeholder="Address" />
                </div>

                {(level === "College" || level === "Masters" || level === "Doctorate") && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div>
                      <label className={label}>Degree</label>
                      <Input {...register(`education.${idx}.degree`)} placeholder="Degree" />
                    </div>
                    <div>
                      <label className={label}>Field of Study</label>
                      <Input
                        {...register(`education.${idx}.fieldOfStudy`)}
                        placeholder="Field of Study"
                      />
                    </div>
                  </div>
                )}

                {level === "Training/Short Course" && (
                  <div className="mt-2">
                    <label className={label}>Course / Short Training</label>
                    <Input
                      {...register(`education.${idx}.courseName`)}
                      placeholder="Course name"
                    />
                  </div>
                )}

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
            );
          })}

          <Button
            type="button"
            className="bg-sky-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
            onClick={() =>
              edu.append({
                level: "",
                schoolName: "",
                address: "",
                degree: "",
                fieldOfStudy: "",
                courseName: "",
                startYear: undefined,
                endYear: undefined,
                isCompleted: true,
              })
            }
          >
            +
          </Button>
        </div>

        {/* =========================== EXPERIENCE ============================== */}
        <div className={panel}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
          </div>

          {exp.fields.map((item, idx) => (
            <ExperienceItem
              key={item.id}
              idx={idx}
              item={item}
              control={control}
              register={register}
              removeExp={exp.remove}
            />
          ))}

          <Button
            type="button"
            className="bg-sky-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
            onClick={() =>
              exp.append({
                companyName: "",
                position: "",
                startDate: "",
                endDate: "",
                responsibilities: [""],
              })
            }
          >
            +
          </Button>
        </div>

        {/* =========================== SUBMIT ============================== */}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2">
          Save Candidate Profile
        </Button>
      </form>
    </div>
  );
};

export default ClientEndorsementPage;
