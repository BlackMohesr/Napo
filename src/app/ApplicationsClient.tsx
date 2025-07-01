"use client";

import { useFilterSort } from "@/lib/useFilterSort";
import  StudentFilters  from "@/components/StudentFilters";
import { ModeToggle } from "@/components/ModeToggle";
import { ApplicationDataTable } from "@/components/ApplicationDataTable";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Globe, Users, GraduationCap } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Application } from "@/types/applications";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function ApplicationsClient({ apps }:{apps:Application[]}) {
  const {
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
    uniqueStudyPrograms
  } = useFilterSort(apps || []);

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
            <ModeToggle />
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
        />
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