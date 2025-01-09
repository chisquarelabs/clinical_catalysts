import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/ui/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/buttonshd";
import { NewAppointmentModal } from "../../components/ui/dashboard/NewAppointmentModal";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";

interface Appointment {
  id: string;
  patientName: string;
  date: Date;
  time: string;
  type: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "John Doe",
    date: new Date(2025, 0, 7),
    time: "10:00 AM",
    type: "Follow-up",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    date: new Date(2025, 0, 9),
    time: "2:30 PM",
    type: "Initial Consultation",
  },
  {
    id: "3",
    patientName: "Alice Johnson",
    date: new Date(2025, 0, 7),
    time: "2:00 PM",
    type: "Check-up",
  },
  {
    id: "4",
    patientName: "Bob Wilson",
    date: new Date(2025, 0, 8),
    time: "11:00 AM",
    type: "Follow-up",
  }
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const FollowUp = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments] = useState<Appointment[]>(mockAppointments);

  const handleLogout = () => {
    navigate("/");
  };

  // Get week days starting from current date
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = [...Array(7)].map((_, i) => addDays(weekStart, i));

  const getAppointmentsForDateAndTime = (date: Date, time: string) => {
    return appointments.filter(apt => {
      // Check if dates match
      const sameDay = isSameDay(apt.date, date);
      
      // Convert "2:30 PM" format to "2:00 PM" format for comparison
      const appointmentHour = apt.time.split(':')[0];
      const appointmentPeriod = apt.time.includes('PM') ? 'PM' : 'AM';
      const slotHour = time.split(':')[0];
      const slotPeriod = time.includes('PM') ? 'PM' : 'AM';
      
      const sameTimeSlot = appointmentHour === slotHour && appointmentPeriod === slotPeriod;
      
      return sameDay && sameTimeSlot;
    });
  };

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Follow-up Appointments</h1>
            <p className="text-sm text-slate-500 mt-1">
              Week of {format(weekStart, "MMMM d, yyyy")}
            </p>
          </div>
          <NewAppointmentModal />
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-8 divide-x divide-slate-200 border-b">
              <div className="p-4 font-medium text-slate-500">Time</div>
              {weekDays.map((day) => (
                <div
                  key={day.toString()}
                  className="p-4 text-center"
                >
                  <div className="font-medium">{format(day, "EEE")}</div>
                  <div className="text-sm text-slate-500">{format(day, "MMM d")}</div>
                </div>
              ))}
            </div>

            <div className="divide-y divide-slate-200">
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-8 divide-x divide-slate-200">
                  <div className="p-4 text-sm text-slate-500">{time}</div>
                  {weekDays.map((day) => {
                    const dayAppointments = getAppointmentsForDateAndTime(day, time);
                    return (
                      <div key={day.toString()} className="p-2 min-h-[100px]">
                        {dayAppointments.map((apt) => (
                          <div
                            key={apt.id}
                            className="mb-2 p-2 rounded-md bg-blue-50 border border-blue-100"
                          >
                            <div className="text-sm font-medium">{apt.patientName}</div>
                            <div className="text-xs text-slate-500">{apt.type}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FollowUp; 