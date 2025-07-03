import { Application } from "../types/applications";

const API_URL = "https://napo-api.mohesr.gov.ae/schapi/api/StudentApplications/V2/GetNapoStudents/2025";

// In-memory cache to avoid repeated API calls
let applicationsCache: Application[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function loadApplications(): Promise<Application[]> {
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (applicationsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return applicationsCache;
    }

    const res = await fetch(API_URL, { 
      cache: "no-store", // Disable Next.js caching due to large response size
      next: { revalidate: 0 } // Ensure dynamic behavior
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch applications: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    const applications = data.data || [];
    
    // Update cache
    applicationsCache = applications;
    cacheTimestamp = now;
    
    return applications;
  } catch (error) {
    console.error('Error loading applications:', error);
    throw new Error('Failed to fetch applications. Please try again later.');
  }
}

export async function fetchApplications(): Promise<Application[]> {
  return await loadApplications();
}

// Function to fetch a single student
export async function fetchApplicantById(id: string | number): Promise<Application | null> {
  try {
    const applications = await loadApplications();
    const student = applications.find((a) => String(a["Application Id"]) === String(id));
    
    if (!student) {
      console.warn(`Student with ID ${id} not found`);
      return null;
    }
    
    return student;
  } catch (error) {
    console.error(`Error fetching student with ID ${id}:`, error);
    throw new Error('Failed to fetch student details. Please try again later.');
  }
}

// Function to clear cache (useful for testing or manual refresh)
export function clearApplicationsCache() {
  applicationsCache = null;
  cacheTimestamp = 0;
}
