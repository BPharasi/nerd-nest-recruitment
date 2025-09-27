// src/types/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Employer" | "Admin";
}