import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-context-menu";
import { ArrowLeft, User, Calendar, Users, Globe, Mail, Phone, MapPin, BookOpen, School, GraduationCap, Award, FileText } from "lucide-react";
import { Suspense } from "react";
import { fetchApplicantById } from "@/lib/api";
import Link from "next/link";
import DocButtons from "@/components/DocButtons";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StudentDetailsPage({ params }: PageProps) {
  const  id  = (await params).id;
  const student = await fetchApplicantById(id);
  // Find the photo from uploaded documents
  const photoDocument = student?.OnlineUploadedDocuments?.find(doc => doc.fileName === "Photo");
  const photoUrl = photoDocument?.downloadURL;

  return <Suspense fallback={

    <div className="min-h-screen flex items-center justify-center">
      <Card className="bg-card/20 backdrop-blur-md border-border">
        <CardContent className="p-6">
          <p className="text-foreground">Loading student details...</p>
        </CardContent>
      </Card>
    </div>}>

    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Student Application Details
            </h1>
            <p className="text-muted-foreground text-lg">
              Complete scholarship application information and documents
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="bg-card/20 backdrop-blur-md border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Student Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                    <Avatar className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-1 border-primary">
                      <AvatarImage src={photoUrl} alt={student?.["Name English"]} />
                      <AvatarFallback>
                        {student?.["Name English"].charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  <h2 className="text-2xl font-bold text-foreground mb-1">{student?.["Name English"]}</h2>
                  <p className="text-muted-foreground mb-3">{student?.["Name Arabic"]}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary" className="bg-primary/30 text-primary-foreground border-primary/40">
                      ID: {student?.["Application Id"]}
                    </Badge>
                    <Badge variant="secondary" className="bg-green-600/30 text-green-200 border-green-500/40">
                      {student?.["Application Status"]}
                    </Badge>
                  </div>
                </div>

                <Separator className="bg-border" />

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-foreground font-semibold">Personal Information</h3>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-muted-foreground text-sm">Birth Date</p>
                        <p className="text-foreground font-medium">{student?.["Birth Date"]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Users className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-muted-foreground text-sm">Gender</p>
                        <p className="text-foreground font-medium">{student?.["Gender English"]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Globe className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-muted-foreground text-sm">Nationality</p>
                        <p className="text-foreground font-medium">{student?.["Nationality Country English"]}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-border" />

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-foreground font-semibold">Contact Information</h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Mail className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-muted-foreground text-sm">Email</p>
                        <p className="text-foreground font-medium break-all">{student?.["Email"]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-muted-foreground text-sm">Mobile</p>
                        <p className="text-foreground font-medium">{student?.["Mobile"]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-muted-foreground text-sm">Residence</p>
                        <p className="text-foreground font-medium">{student?.["Res Area English"]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Academic & Application Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Performance */}
            <Card className="bg-card/20 backdrop-blur-md border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Academic Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current High School Performance */}
                <div>
                  <h3 className="text-foreground font-semibold mb-4">Grade 12 - Current Performance</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <p className="text-muted-foreground text-sm">Overall Average</p>
                      <p className="text-foreground font-bold text-2xl">{student?.["High School Average"]}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <p className="text-muted-foreground text-sm">English</p>
                      <p className="text-foreground font-bold text-2xl">{student?.["High School English"]}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <p className="text-muted-foreground text-sm">Mathematics</p>
                      <p className="text-foreground font-bold text-2xl">{student?.["High School Maths"]}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <p className="text-muted-foreground text-sm">Physics</p>
                      <p className="text-foreground font-bold text-2xl">{student?.["High School Physics"]}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <p className="text-muted-foreground text-sm">Chemistry</p>
                      <p className="text-foreground font-bold text-xl">{student?.["High School Chemistry"]}</p>
                    </div>
                    {student?.["High School Biology"] && (
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-muted-foreground text-sm">Biology</p>
                        <p className="text-foreground font-bold text-xl">{student?.["High School Biology"]}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Term Performance (if available) */}
                {(student?.["High School Term2 Average"] || student?.["High School Term1 Average"]) && (
                  <div>
                    <h3 className="text-foreground font-semibold mb-4">Grade 12 - Term Performance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {student?.["High School Term2 Average"] && (
                        <div className="space-y-3">
                          <h4 className="text-muted-foreground font-medium">Term 2</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-muted/50 text-center">
                              <p className="text-muted-foreground text-xs">Average</p>
                              <p className="text-foreground font-bold">{student?.["High School Term2 Average"]}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50 text-center">
                              <p className="text-muted-foreground text-xs">English</p>
                              <p className="text-foreground font-bold">{student?.["High School Term2 English"]}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50 text-center">
                              <p className="text-muted-foreground text-xs">Maths</p>
                              <p className="text-foreground font-bold">{student?.["High School Term2 Maths"]}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50 text-center">
                              <p className="text-muted-foreground text-xs">Physics</p>
                              <p className="text-foreground font-bold">{student?.["High School Term2 Physics"]}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {student?.["High School Term1 Average"] && (
                        <div className="space-y-3">
                          <h4 className="text-muted-foreground font-medium">Term 1</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-muted/50 text-center">
                              <p className="text-muted-foreground text-xs">Average</p>
                              <p className="text-foreground font-bold">{student?.["High School Term1 Average"]}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50 text-center">
                              <p className="text-muted-foreground text-xs">English</p>
                              <p className="text-foreground font-bold">{student?.["High School Term1 English"]}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50 text-center">
                              <p className="text-muted-foreground text-xs">Maths</p>
                              <p className="text-foreground font-bold">{student?.["High School Term1 Maths"]}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50 text-center">
                              <p className="text-muted-foreground text-xs">Physics</p>
                              <p className="text-foreground font-bold">{student?.["High School Term1 Physics"]}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Grade 11 Performance */}
                {student?.["High School G11 Average"] && (
                  <div>
                    <h3 className="text-foreground font-semibold mb-4">Grade 11 Performance</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-muted-foreground text-sm">Average</p>
                        <p className="text-foreground font-bold text-xl">{student?.["High School G11 Average"]}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-muted-foreground text-sm">English</p>
                        <p className="text-foreground font-bold text-xl">{student?.["High School G11 English"]}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-muted-foreground text-sm">Maths</p>
                        <p className="text-foreground font-bold text-xl">{student?.["High School G11 Maths"]}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-muted-foreground text-sm">Physics</p>
                        <p className="text-foreground font-bold text-xl">{student?.["High School G11 Physics"]}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-muted-foreground text-sm">Chemistry</p>
                        <p className="text-foreground font-bold text-lg">{student?.["High School G11 Chemistry"]}</p>
                      </div>
                      {student?.["High School G11 Biology"] && (
                        <div className="p-4 rounded-lg bg-muted/50 text-center">
                          <p className="text-muted-foreground text-sm">Biology</p>
                          <p className="text-foreground font-bold text-lg">{student?.["High School G11 Biology"]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Grade 10 Performance */}
                {student?.["High School G10 Average"] && (
                  <div>
                    <h3 className="text-foreground font-semibold mb-4">Grade 10 Performance</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-muted-foreground text-sm">Average</p>
                        <p className="text-foreground font-bold text-xl">{student?.["High School G10 Average"]}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-muted-foreground text-sm">English</p>
                        <p className="text-foreground font-bold text-xl">{student?.["High School G10 English"]}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-muted-foreground text-sm">Maths</p>
                        <p className="text-foreground font-bold text-xl">{student?.["High School G10 Maths"]}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-muted-foreground text-sm">Physics</p>
                        <p className="text-foreground font-bold text-xl">{student?.["High School G10 Physics"]}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <p className="text-muted-foreground text-sm">Chemistry</p>
                        <p className="text-foreground font-bold text-lg">{student?.["High School G10 Chemistry"]}</p>
                      </div>
                      {student?.["High School G10 Biology"] && (
                        <div className="p-4 rounded-lg bg-muted/50 text-center">
                          <p className="text-muted-foreground text-sm">Biology</p>
                          <p className="text-foreground font-bold text-lg">{student?.["High School G10 Biology"]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Standardized Test Scores */}
                {(student?.["IELTS Overall Band"] || student?.["TOEFL iBT - Total"] || student?.["SAT Physics"]) && (
                  <div>
                    <h3 className="text-foreground font-semibold mb-4">Standardized Test Scores</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {student?.["IELTS Overall Band"] && (
                        <div className="p-4 rounded-lg bg-muted/50 text-center">
                          <p className="text-muted-foreground text-sm">IELTS Score</p>
                          <p className="text-foreground font-bold text-xl">{student?.["IELTS Overall Band"]} Band</p>
                        </div>
                      )}
                      {student?.["TOEFL iBT - Total"] && (
                        <div className="p-4 rounded-lg bg-muted/50 text-center">
                          <p className="text-muted-foreground text-sm">TOEFL iBT</p>
                          <p className="text-foreground font-bold text-xl">{student?.["TOEFL iBT - Total"]}</p>
                        </div>
                      )}
                      {student?.["SAT Physics"] && (
                        <div className="p-4 rounded-lg bg-muted/50 text-center">
                          <p className="text-muted-foreground text-sm">SAT Physics</p>
                          <p className="text-foreground font-bold text-xl">{student?.["SAT Physics"]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* School Information */}
            <Card className="bg-card/20 backdrop-blur-md border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <School className="h-5 w-5" />
                  School Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground text-sm">School Name</p>
                    <p className="text-foreground font-medium">{student?.["School Name English"]}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground text-sm">School Zone</p>
                    <p className="text-foreground font-medium">{student?.["School Zone"]}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground text-sm">Study Type</p>
                    <p className="text-foreground font-medium">{student?.["Study Type"]}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground text-sm">Study Program</p>
                    <p className="text-foreground font-medium">{student?.["Study Program"]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Institution Information */}
            <Card className="bg-card/20 backdrop-blur-md border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Applied Institution & Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-foreground font-bold text-lg">{student?.["Institution Name English"]}</p>
                    <Badge variant="secondary" className="bg-primary/30 text-primary-foreground border-primary/40">
                      {student?.["Application Category"]}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{student?.["Institution Campus English"]}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Major</p>
                      <p className="text-foreground font-medium">{student?.["Institution Major English - 1"]}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Program</p>
                      <p className="text-foreground font-medium">{student?.["Institution Program English - 1"]}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Status */}
            <Card className="bg-card/20 backdrop-blur-md border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Application Status & Approval
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground text-sm">Application Status</p>
                    <Badge variant="secondary" className="bg-green-600/30 text-green-200 border-green-500/40 mt-1">
                      {student?.["ITIMAD Status"]}
                    </Badge>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground text-sm">Reference Code</p>
                    <p className="text-foreground font-medium">{student?.["ITIMAD Reference Number"]}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground text-sm">Approval Date</p>
                    <p className="text-foreground font-medium">{student?.["ITIMAD Status Date"]}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground text-sm">University Offer</p>
                    <p className="text-foreground font-medium">{student?.["University Offer Letter"]}</p>
                  </div>
                </div>

                {student?.["Approval Status Remarks"] && (
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-muted-foreground text-sm">Approval Remarks</p>
                    <p className="text-foreground font-medium">{student?.["Approval Status Remarks"]}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="bg-card/20 backdrop-blur-md border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Uploaded Documents ({student?.OnlineUploadedDocuments?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {student?.OnlineUploadedDocuments?.length && student?.OnlineUploadedDocuments?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {student?.OnlineUploadedDocuments.map((doc, index) => (
                      <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-foreground font-medium">{doc.fileName}</h4>
                          <DocButtons doc={doc} />
                        </div>

                        {/* Document Preview */}
                        <div className="aspect-video rounded-lg overflow-hidden bg-muted/30">
                          {doc.downloadURL.endsWith(".pdf") ? (
                            <object data={doc.downloadURL} width="100%" height="600px" type="application/pdf">
                              <p>Your browser does not support PDFs. Please download the PDF to view it: <a href={doc.downloadURL} >Download PDF</a>.</p>
                            </object>
                          ) : (
                          <Image
                            src={doc.downloadURL}
                            alt={doc.fileName}
                            width={100}
                            height={600}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No documents uploaded</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </Suspense>
};