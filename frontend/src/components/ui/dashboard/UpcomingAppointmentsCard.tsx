import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Calendar, Clock, User as UserIcon } from "lucide-react";

export const UpcomingAppointmentsCard = () => {
  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      time: "09:00 AM",
      date: "Today",
      type: "Follow-up",
    },
    {
      id: 2,
      patientName: "Sarah Smith",
      time: "02:30 PM",
      date: "Today",
      type: "New Patient",
    },
    {
      id: 3,
      patientName: "Mike Johnson",
      time: "11:00 AM",
      date: "Tomorrow",
      type: "Follow-up",
    },
  ];

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          Upcoming Appointments
        </CardTitle>
        <CardDescription>Next 48 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-start space-x-3 border-l-2 border-primary pl-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{appointment.patientName}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {appointment.date}
                  </span>
                </div>
                <div className="mt-1 flex items-center space-x-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    {appointment.time}
                  </p>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {appointment.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 