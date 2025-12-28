export interface IGRRTInterview {
  interviewer?: string;
  remarks?: string;
}

export interface IClientEndorsement {
  clientId?: string;
  clientName?: string;
  role?: string;
  status?: string;
  remarks?: string;
  endorsedAt?: string;
}

export interface ISkill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience: number;
}

export interface IEducation {
  schoolName: string;
  degree: string;
  fieldOfStudy?: string;
  startYear?: number;
  endYear?: number;
}

export interface IExperience {
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
  responsibilities?: string;
}

export interface ICandidate {
  _id: string;

  // Personal Info
  fullName: string;
  linkedInUrl?: string;
  email?: string;
  phone?: string;
  address?: string;

  // Application Info
  positionApplied?: string;
  currentSalary?: number;
  askingSalary?: number;

  // Stage & Status
  stage: "contact" | "screening" | "endorsement";
  status: string;

  // Interviews & Endorsements
  grrtInterview?: IGRRTInterview;
  clientEndorsement?: IClientEndorsement;
  endorsements?: IClientEndorsement[];

  // Arrays for modal form
  skills?: ISkill[];
  education?: IEducation[];
  experience?: IExperience[];

  // Stage IDs
  contactStageId?: string;
  initialScreeningId?: string;
  clientEndorsementId?: string;

  createdAt?: string;
  updatedAt?: string;
}
