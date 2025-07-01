import { fetchApplications } from "@/lib/api";
import ApplicationsClient from "./ApplicationsClient";

export default async function ApplicationsPage() {
  const applications = await fetchApplications();
  const apps = Array.isArray(applications) ? applications : [];

  return <ApplicationsClient apps={apps} />;
} 