import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-10 w-96 mb-2" />
              <Skeleton className="h-6 w-80" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-card/20 backdrop-blur-md border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <div className="h-8 w-8 bg-muted/30 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Skeleton */}
        <Card className="bg-card/20 backdrop-blur-md border-border mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-20 ml-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Table Skeleton */}
        <Card className="bg-card/20 backdrop-blur-md border-border">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-4 border-b border-border">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
              
              {/* Table Rows */}
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-12 gap-4 py-4 border-b border-border/50">
                  {Array.from({ length: 12 }).map((_, colIndex) => (
                    <Skeleton key={colIndex} className="h-4 w-full" />
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 