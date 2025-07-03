import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="bg-card/20 backdrop-blur-md border-border max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
              <UserX className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Student Not Found
          </h1>
          
          <p className="text-muted-foreground mb-6">
            The student application you're looking for doesn't exist or may have been removed.
          </p>
          
          <div className="space-y-3">
            <Link href="/" className="w-full">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            
            <p className="text-sm text-muted-foreground">
              If you believe this is an error, please contact support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 