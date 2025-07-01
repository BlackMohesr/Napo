import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  interface AcademicResultsTableProps {
    results: Record<string, Record<string, string | null>>;
  }
  
  export function AcademicResultsTable({ results }: AcademicResultsTableProps) {
    const levels = ["Grade 10", "Grade 11", "Term 1", "Term 2", "Grade 12"];
  
    return (
      <Table>
        <TableCaption>High School Academic Results by Subject</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            {levels.map((level) => (
              <TableHead key={level}>{level}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(results).map(([subject, grades]) => (
            <TableRow key={subject}>
              <TableCell className="font-medium">{subject}</TableCell>
              {levels.map((level) => (
                <TableCell key={level}>
                  {grades[level] ?? "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  