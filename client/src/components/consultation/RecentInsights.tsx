import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Activity, Calendar } from "lucide-react";
import { format } from "date-fns";
import { type Consultation } from "@shared/schema";

interface RecentInsightsProps {
  consultations?: Consultation[];
}

export default function RecentInsights({ consultations }: RecentInsightsProps) {
  if (!consultations?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent Medical Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No recent consultations found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Medical Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <Card key={consultation.id} className="p-4 bg-muted/5">
                <div className="space-y-3">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(consultation.createdAt || new Date()), 'MMM d, yyyy h:mm a')}
                  </div>

                  {/* Primary Diagnosis */}
                  {consultation.diagnoses?.[0] && (
                    <div>
                      <Badge variant="destructive" className="mb-2">
                        Primary Diagnosis
                      </Badge>
                      <p className="text-sm font-medium">{consultation.diagnoses[0].condition}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {consultation.diagnoses[0].description}
                      </p>
                    </div>
                  )}

                  {/* Assessment Summary */}
                  {consultation.soapNote?.assessment && (
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Assessment
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {consultation.soapNote.assessment}
                      </p>
                    </div>
                  )}

                  {/* Key Recommendations */}
                  {consultation.clinicalPathway?.recommendations && (
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Key Recommendations
                      </Badge>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {consultation.clinicalPathway.recommendations.slice(0, 2).map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}