"use client";
import { useState, useMemo } from 'react';
import { Application } from '@/types/applications';

type SortField = keyof Application;
type SortDirection = 'asc' | 'desc';

interface FilterState {
  search: string;
  status: string;
  applicationCategory: string;
  schoolZone: string;
  schoolName: string;
  studyType: string;
  studyProgram: string;
  hasUniversityApprovedDoc: string; // '' | 'With Offer' | 'Without Offer'
}

export const useFilterSort = (data: Application[]) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    applicationCategory: '',
    schoolZone: '',
    schoolName: '',
    studyType: '',
    studyProgram: '',
    hasUniversityApprovedDoc: '',
  });
  
  const [sortField, setSortField] = useState<SortField>('Application Id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];
    
    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(student => 
        student["Name English"].toLowerCase().includes(searchLower) ||
        student["Name Arabic"].toLowerCase().includes(searchLower) ||
        student["Application Id"].toString().includes(searchLower) ||
        student["Email"].toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.status) {
      result = result.filter(student => student["Application Status"] === filters.status);
    }
    
    if (filters.applicationCategory) {
      result = result.filter(student => student["Application Category"] === filters.applicationCategory);
    }
    
    if (filters.schoolZone) {
      result = result.filter(student => student["School Zone"] === filters.schoolZone);
    }
    
    if (filters.schoolName) {
      result = result.filter(student => student["School Name English"] === filters.schoolName);
    }
    
    if (filters.studyType) {
      result = result.filter(student => student["Study Type"] === filters.studyType);
    }
    
    if (filters.studyProgram) {
      result = result.filter(student => student["Study Program"] === filters.studyProgram);
    }
    
    if (filters.hasUniversityApprovedDoc) {
      result = result.filter(student => {
        const hasDoc = student.OnlineUploadedDocuments?.some(doc =>
          doc.fileName.toLowerCase().includes('university approved document')
        );
        return filters.hasUniversityApprovedDoc === 'yes' ? hasDoc : !hasDoc;
      });
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      // Handle null/undefined values
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      // Convert to string for comparison
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      
      if (sortDirection === 'asc') {
        return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
      } else {
        return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
      }
    });
    
    return result;
  }, [data, filters, sortField, sortDirection]);
  
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      applicationCategory: '',
      schoolZone: '',
      schoolName: '',
      studyType: '',
      studyProgram: '',
      hasUniversityApprovedDoc: '',
    });
  };
  
  const updateSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get unique values for filter dropdowns
  const uniqueStatuses = [...new Set(data.map(s => s["Application Status"]))].filter(Boolean);
  const uniqueApplicationCategories = [...new Set(data.map(s => s["Application Category"]))].filter(Boolean);
  const uniqueSchoolZones = [...new Set(data.map(s => s["School Zone"]))].filter(Boolean);
  const uniqueSchoolNames = [...new Set(data.map(s => s["School Name English"]))].filter(Boolean);
  const uniqueStudyTypes = [...new Set(data.map(s => s["Study Type"]))].filter(Boolean);
  const uniqueStudyPrograms = [...new Set(data.map(s => s["Study Program"]))].filter(Boolean);
  
  return {
    filters,
    sortField,
    sortDirection,
    filteredAndSortedData,
    updateFilter,
    clearFilters,
    updateSort,
    uniqueStatuses,
    uniqueApplicationCategories,
    uniqueSchoolZones,
    uniqueSchoolNames,
    uniqueStudyTypes,
    uniqueStudyPrograms,
  };
};
