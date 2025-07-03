import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudentFiltersProps {
  searchValue: string;
  statusValue: string;
  applicationCategoryValue: string;
  schoolZoneValue: string;
  schoolNameValue: string;
  studyTypeValue: string;
  studyProgramValue: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onApplicationCategoryChange: (value: string) => void;
  onSchoolZoneChange: (value: string) => void;
  onSchoolNameChange: (value: string) => void;
  onStudyTypeChange: (value: string) => void;
  onStudyProgramChange: (value: string) => void;
  onClearFilters: () => void;
  uniqueStatuses: string[];
  uniqueApplicationCategories: string[];
  uniqueSchoolZones: string[];
  uniqueSchoolNames: string[];
  uniqueStudyTypes: string[];
  uniqueStudyPrograms: string[];
  hasUniversityApprovedDocValue: string;
  onHasUniversityApprovedDocChange: (value: string) => void;
  onApplicationNumbersChange: (value: string) => void;
  applicationNumbersValue: string;
}

export default function StudentFilters({
  searchValue,
  statusValue,
  applicationCategoryValue,
  schoolZoneValue,
  schoolNameValue,
  studyTypeValue,
  studyProgramValue,
  onSearchChange,
  onStatusChange,
  onApplicationCategoryChange,
  onSchoolZoneChange,
  onSchoolNameChange,
  onStudyTypeChange,
  onStudyProgramChange,
  onClearFilters,
  uniqueStatuses,
  uniqueApplicationCategories,
  uniqueSchoolZones,
  uniqueSchoolNames,
  uniqueStudyTypes,
  uniqueStudyPrograms,
  hasUniversityApprovedDocValue,
  onHasUniversityApprovedDocChange,
  onApplicationNumbersChange,
  applicationNumbersValue,
}: StudentFiltersProps) {
  return (
    <Card className="bg-card backdrop-blur-md border-border mb-6">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-foreground font-semibold">Filters & Search</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="ml-auto text-muted-foreground hover:text-foreground hover:bg-muted/20"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Application Numbers Filter */}
          <div className="relative col-span-full">
            <textarea
              placeholder="Paste application numbers (one per line)"
              value={applicationNumbersValue}
              onChange={(e) => onApplicationNumbersChange(e.target.value)}
              className="w-full min-h-[60px] max-h-32 resize-y bg-muted/10 border border-border rounded-md p-2 text-foreground placeholder:text-muted-foreground text-sm"
            />
          </div>

          {/* Application Numbers Filter */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-muted/10 border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <Select
            value={statusValue || "all"}
            onValueChange={(value) =>
              onStatusChange(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="bg-muted/10 border-border text-foreground w-full">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {uniqueStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={applicationCategoryValue || "all"}
            onValueChange={(value) =>
              onApplicationCategoryChange(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="bg-muted/10 border-border text-foreground w-full">
              <SelectValue placeholder="Application Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueApplicationCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={schoolZoneValue || "all"}
            onValueChange={(value) =>
              onSchoolZoneChange(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="bg-muted/10 border-border text-foreground w-full">
              <SelectValue placeholder="School Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              {uniqueSchoolZones.map((zone) => (
                <SelectItem key={zone} value={zone}>
                  {zone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={schoolNameValue || "all"}
            onValueChange={(value) =>
              onSchoolNameChange(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="bg-muted/10 border-border text-foreground w-full">
              <SelectValue placeholder="School Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schools</SelectItem>
              {uniqueSchoolNames.map((school) => (
                <SelectItem key={school} value={school}>
                  {school}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={studyTypeValue || "all"}
            onValueChange={(value) =>
              onStudyTypeChange(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="bg-muted/10 border-border text-foreground w-full">
              <SelectValue placeholder="Study Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniqueStudyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={studyProgramValue || "all"}
            onValueChange={(value) =>
              onStudyProgramChange(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="bg-muted/10 border-border text-foreground w-full">
              <SelectValue placeholder="Study Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              {uniqueStudyPrograms.map((program) => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={hasUniversityApprovedDocValue || "all"}
            onValueChange={(value) =>
              onHasUniversityApprovedDocChange(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="bg-muted/10 border-border text-foreground w-full">
              <SelectValue placeholder="University Approved Document" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Offers</SelectItem>
              <SelectItem value="yes">With Offer</SelectItem>
              <SelectItem value="no">Without Offer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
