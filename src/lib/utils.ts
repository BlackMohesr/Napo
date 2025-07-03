import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Application } from "@/types/applications"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for passing application data via URL parameters
export function encodeApplicationData(app: Application): string {
  try {
    // Create a minimal version of the application data to reduce URL size
    const minimalData = {
      "Application Id": app["Application Id"],
      "Name English": app["Name English"],
      "Name Arabic": app["Name Arabic"],
      "Application Status": app["Application Status"],
      "Birth Date": app["Birth Date"],
      "Gender English": app["Gender English"],
      "Nationality Country English": app["Nationality Country English"],
      "Email": app["Email"],
      "Mobile": app["Mobile"],
      "Res Area English": app["Res Area English"],
      "High School Average": app["High School Average"],
      "High School English": app["High School English"],
      "High School Maths": app["High School Maths"],
      "High School Physics": app["High School Physics"],
      "High School Chemistry": app["High School Chemistry"],
      "High School Biology": app["High School Biology"],
      "High School Term2 Average": app["High School Term2 Average"],
      "High School Term2 English": app["High School Term2 English"],
      "High School Term2 Maths": app["High School Term2 Maths"],
      "High School Term2 Physics": app["High School Term2 Physics"],
      "High School Term1 Average": app["High School Term1 Average"],
      "High School Term1 English": app["High School Term1 English"],
      "High School Term1 Maths": app["High School Term1 Maths"],
      "High School Term1 Physics": app["High School Term1 Physics"],
      "High School G11 Average": app["High School G11 Average"],
      "High School G11 English": app["High School G11 English"],
      "High School G11 Maths": app["High School G11 Maths"],
      "High School G11 Physics": app["High School G11 Physics"],
      "High School G11 Chemistry": app["High School G11 Chemistry"],
      "High School G11 Biology": app["High School G11 Biology"],
      "High School G10 Average": app["High School G10 Average"],
      "High School G10 English": app["High School G10 English"],
      "High School G10 Maths": app["High School G10 Maths"],
      "High School G10 Physics": app["High School G10 Physics"],
      "High School G10 Chemistry": app["High School G10 Chemistry"],
      "High School G10 Biology": app["High School G10 Biology"],
      "IELTS Overall Band": app["IELTS Overall Band"],
      "TOEFL iBT - Total": app["TOEFL iBT - Total"],
      "SAT Physics": app["SAT Physics"],
      "School Name English": app["School Name English"],
      "School Zone": app["School Zone"],
      "Study Type": app["Study Type"],
      "Study Program": app["Study Program"],
      "Institution Name English": app["Institution Name English"],
      "Institution Campus English": app["Institution Campus English"],
      "Institution Major English - 1": app["Institution Major English - 1"],
      "Institution Program English - 1": app["Institution Program English - 1"],
      "Application Category": app["Application Category"],
      "ITIMAD Status": app["ITIMAD Status"],
      "ITIMAD Reference Number": app["ITIMAD Reference Number"],
      "ITIMAD Status Date": app["ITIMAD Status Date"],
      "University Offer Letter": app["University Offer Letter"],
      "Approval Status Remarks": app["Approval Status Remarks"],
      "OnlineUploadedDocuments": app["OnlineUploadedDocuments"],
    };
    
    return encodeURIComponent(JSON.stringify(minimalData));
  } catch (error) {
    console.error('Error encoding application data:', error);
    return '';
  }
}

export function decodeApplicationData(encodedData: string): Application | null {
  try {
    const decodedData = decodeURIComponent(encodedData);
    const app = JSON.parse(decodedData) as Application;
    
    // Basic validation
    if (!app["Application Id"]) {
      throw new Error('Invalid application data: missing Application Id');
    }
    
    return app;
  } catch (error) {
    console.error('Error decoding application data:', error);
    return null;
  }
}

// CSV Export functionality
export function exportToCSV(data: Application[], filename: string = 'applications.csv') {
  try {
    // Define the columns to export
    const columns = [
      'Application Id',
      'Name English',
      'Name Arabic',
      'Application Status',
      'Birth Date',
      'Gender English',
      'Nationality Country English',
      'Email',
      'Mobile',
      'Res Area English',
      'High School Average',
      'High School English',
      'High School Maths',
      'High School Physics',
      'High School Chemistry',
      'School Name English',
      'School Zone',
      'Study Type',
      'Study Program',
      'Institution Name English',
      'Institution Campus English',
      'Institution Major English - 1',
      'Institution Program English - 1',
      'Application Category',
      'ITIMAD Status',
      'ITIMAD Reference Number',
      'ITIMAD Status Date',
      'University Offer Letter',
      'Documents Count'
    ];

    // Create CSV header
    const csvHeader = columns.join(',');

    // Create CSV rows
    const csvRows = data.map(app => {
      return columns.map(column => {
        let value = app[column as keyof Application];
        
        // Handle special cases
        if (column === 'Documents Count') {
          value = app.OnlineUploadedDocuments?.length || 0;
        }
        
        // Escape commas and quotes in the value
        if (typeof value === 'string') {
          value = value.replace(/"/g, '""'); // Escape quotes
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            value = `"${value}"`; // Wrap in quotes if needed
          }
        }
        
        return value || '';
      }).join(',');
    });

    // Combine header and rows
    const csvContent = [csvHeader, ...csvRows].join('\n');

    // Create and download the file
    const csvContentWithBOM = '\uFEFF' + csvContent;
    const blob = new Blob([csvContentWithBOM], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    alert('Failed to export CSV. Please try again.');
  }
}

// Simple download function for existing zip files
export function downloadZipFile(zipUrl: string, filename: string = 'documents.zip') {
  try {
    const link = document.createElement('a');
    link.setAttribute('href', zipUrl);
    link.setAttribute('download', filename);
    link.setAttribute('target', '_blank');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading zip file:', error);
    alert('Failed to download zip file. Please try again.');
  }
}
