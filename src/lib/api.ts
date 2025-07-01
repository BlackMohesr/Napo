import { cache } from "react";
import { Application } from "../types/applications";

const API_URL = "https://napo-api.mohesr.gov.ae/schapi/api/StudentApplications/V2/GetNapoStudents/2025";

export const loadApplications = cache(async (): Promise<Application[]> => {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  const data = await res.json();
  return data.data;
});

export async function fetchApplications(): Promise<Application[]> {
  return await loadApplications();
}

export async function fetchApplicantById(id: string | number): Promise<Application | null> {
  const applications = await loadApplications();
  return applications.find((a) => String(a["Application Id"]) === String(id)) || null;
}
