import { fetchApplications } from "@/lib/api";
import ApplicationsClient from "./ApplicationsClient";

// Force dynamic rendering to prevent build-time API calls
export const dynamic = 'force-dynamic';

export default async function ApplicationsPage() {
  try {
    const applications = await fetchApplications();
    const apps = Array.isArray(applications) ? applications : [];

    return <ApplicationsClient apps={apps} />;
  } catch (error) {
    console.error('Error loading applications:', error);
    // Return empty state if API fails
    return <ApplicationsClient apps={[]} />;
  }
} 