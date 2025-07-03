"use client";

import { useFilterSort } from "@/lib/useFilterSort";
import  StudentFilters  from "@/components/StudentFilters";
import { ApplicationDataTable } from "@/components/ApplicationDataTable";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Globe, Users, GraduationCap, Download } from "lucide-react";
import { Suspense, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Application } from "@/types/applications";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { exportToCSV } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function ApplicationsClient({ apps }:{apps:Application[]}) {
  const [applicationNumbers, setApplicationNumbers] = useState("");
  const {
    filters,
    filteredAndSortedData,
    updateFilter,
    clearFilters,
    uniqueStatuses,
    uniqueApplicationCategories,
    uniqueSchoolZones,
    uniqueSchoolNames,
    uniqueStudyTypes,
    uniqueStudyPrograms
  } = useFilterSort(apps || [], applicationNumbers);

  // Show loading state if no apps are loaded
  if (!apps || apps.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  NAPO Student Applications Dashboard
                </h1>
                <p className="text-muted-foreground text-lg">
                  Ministry of Higher Education & Scientific Research - Student Data Portal
                </p>
              </div>
              <ThemeSwitcher />
            </div>
          </div>

          {/* Loading State */}
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Loading Applications</h2>
            <p className="text-muted-foreground">
              Please wait while we fetch the latest student application data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                NAPO Student Applications Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Ministry of Higher Education & Scientific Research - Student Data Portal
              </p>
            </div>
            <ThemeSwitcher />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/20 backdrop-blur-md border-border hover:bg-card/25">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Applications</p>
                  <p className="text-3xl font-bold text-foreground">{apps?.length || 0}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/20 backdrop-blur-md border-border hover:bg-card/25">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Filtered Results</p>
                  {/* <p className="text-3xl font-bold text-foreground">{filteredAndSortedData.length}</p> */}
                </div>
                <GraduationCap className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/20 backdrop-blur-md border-border hover:bg-card/25">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Current Page</p>
                  {/* <p className="text-3xl font-bold text-foreground">{currentPage} of {totalPages}</p> */}
                </div>
                <Globe className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/20 backdrop-blur-md border-border hover:bg-card/25">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">With Documents</p>
                  <p className="text-3xl font-bold text-foreground">
                    {apps ? apps.filter(s => s.OnlineUploadedDocuments?.length > 0).length : 0}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Filters */}
        <StudentFilters
          searchValue={filters.search}
          statusValue={filters.status}
          applicationCategoryValue={filters.applicationCategory}
          schoolZoneValue={filters.schoolZone}
          schoolNameValue={filters.schoolName}
          studyTypeValue={filters.studyType}
          studyProgramValue={filters.studyProgram}
          onSearchChange={(value) => updateFilter('search', value)}
          onStatusChange={(value) => updateFilter('status', value)}
          onApplicationCategoryChange={(value) => updateFilter('applicationCategory', value)}
          onSchoolZoneChange={(value) => updateFilter('schoolZone', value)}
          onSchoolNameChange={(value) => updateFilter('schoolName', value)}
          onStudyTypeChange={(value) => updateFilter('studyType', value)}
          onStudyProgramChange={(value) => updateFilter('studyProgram', value)}
          onClearFilters={clearFilters}
          uniqueStatuses={uniqueStatuses}
          uniqueApplicationCategories={uniqueApplicationCategories}
          uniqueSchoolZones={uniqueSchoolZones}
          uniqueSchoolNames={uniqueSchoolNames}
          uniqueStudyTypes={uniqueStudyTypes}
          uniqueStudyPrograms={uniqueStudyPrograms}
          hasUniversityApprovedDocValue={filters.hasUniversityApprovedDoc}
          onHasUniversityApprovedDocChange={(value) => updateFilter('hasUniversityApprovedDoc', value)}
          applicationNumbersValue={applicationNumbers}
          onApplicationNumbersChange={setApplicationNumbers}
        />

        {/* Export Button */}
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => {
              const filename = `napo_applications_${new Date().toISOString().split('T')[0]}.csv`;
              exportToCSV(filteredAndSortedData, filename);
            }}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Filtered Data (CSV)
          </Button>
        </div>
        <Suspense fallback={<div className="space-y-4 p-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-muted/30" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[200px] bg-muted/30" />
                <Skeleton className="h-4 w-[150px] bg-muted/30" />
              </div>
            </div>
          ))}
        </div>}>
          <ApplicationDataTable data={filteredAndSortedData} />
        </Suspense>
      </div>
    </div>
  );
} 