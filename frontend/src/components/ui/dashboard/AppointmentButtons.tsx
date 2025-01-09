import { UserCog } from "lucide-react";
import { Button } from "../buttonshd";
import { NewAppointmentModal } from "./NewAppointmentModal";

export const AppointmentButtons = () => {
  return (
    <div className="flex gap-4 mb-8">
      <NewAppointmentModal />
      <Button className="flex items-center" variant="outline">
        <UserCog className="mr-2 h-4 w-4" />
        Follow-up Appointment
      </Button>
    </div>
  );
};
