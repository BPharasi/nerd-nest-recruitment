// src/lib/api.ts
import axios from "axios";
import { AcademicData } from "@/types/AcademicData";

export const fetchAcademicData = async (studentId: string): Promise<AcademicData> => {
  const response = await axios.get(`/api/academic/marks?studentId=${studentId}`);
  return response.data;
};