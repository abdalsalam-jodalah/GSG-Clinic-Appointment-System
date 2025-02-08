export interface Appointment {
  id: string;
  patientName: string;
  contact: string;
  age: number;
  gender: "Male" | "Female";
  date: Date; 
  symptoms: string;
  status: "Pending" | "Confirmed" | "Completed";
  notes: string; 
}
