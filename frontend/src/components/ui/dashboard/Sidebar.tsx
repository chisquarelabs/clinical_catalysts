import {
  User,
  LayoutDashboard,
  ClipboardList,
  Settings,
  LogOut,
  Search,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { useUser } from "../../../context/UserContext";

export const Sidebar = ({ onLogout }: { onLogout: () => void }) => {
  const { user } = useUser();
  const isPatient = user?.role === "patient";

  return (
    <div className="w-64 h-full flex flex-col">
      <div className="flex-1 px-4 py-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-6">
            {user?.profileImage ? (
              <img
                src={user?.profileImage}
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold">
                {user?.f_name} {user?.l_name}
              </h2>
              <p className="text-sm text-muted-foreground">{user?.role}</p>
            </div>
          </div>

          {user?.hospital && (
            <div className="px-3 py-2 bg-accent/10 rounded-md mb-6">
              <p className="text-sm text-muted-foreground">Hospital</p>
              <p className="font-medium">{user.hospital}</p>
            </div>
          )}

          <nav className="">
            <Link to="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Button>
            </Link>
            {isPatient && (
              <>
                <Link to="/questionnaire">
                  <Button variant="ghost" className="w-full justify-start">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Questionnaire
                  </Button>
                </Link>
              </>
            )}
            <Link to="/search">
              <Button variant="ghost" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Search Records
              </Button>
            </Link>
            <Link to="/follow-up">
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Follow-up Appointment
              </Button>
            </Link>
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};
