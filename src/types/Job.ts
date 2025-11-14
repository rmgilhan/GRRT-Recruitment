export interface Job {
  _id?: string;
  title: string;
  description: string;
  requirements: string[];
  employmentType: string;
  location: string;
  status: "Open" | "Closed";
}
