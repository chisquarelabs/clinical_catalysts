import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Clock } from "lucide-react";

export const RecentAssessmentsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Recent Assessments
        </CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Total Assessments</span>
            <span className="font-semibold">24</span>
          </div>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Completed Today</span>
            <span>8</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 