import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Activity } from "lucide-react";

export const TreatmentProgressCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          Treatment Progress
        </CardTitle>
        <CardDescription>Patient Recovery Status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-green-600">Improving</span>
            <span className="font-semibold">45%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-yellow-600">Stable</span>
            <span className="font-semibold">35%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-red-600">Needs Attention</span>
            <span className="font-semibold">20%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 