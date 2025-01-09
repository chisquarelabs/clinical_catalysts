import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Users } from "lucide-react";

export const PatientDemographicsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Demographics
        </CardTitle>
        <CardDescription>Active Patients</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total Active</span>
            <span className="font-semibold">156</span>
          </div>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Adult</span>
              <span>124</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pediatric</span>
              <span>32</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 