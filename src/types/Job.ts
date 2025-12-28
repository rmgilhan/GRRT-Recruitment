export interface Job {
  _id?: string;
  title: string;
  description: string;
  requirements?: string[];
  keyResponsibilities?: string[];
  benefits?: string[];
  employmentType: string;
  location: string;
  status: string;
  datePosted?: string;
}
