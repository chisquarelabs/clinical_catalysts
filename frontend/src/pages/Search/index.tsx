import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Input from "../../components/ui/Input";
import { Button } from "../../components/ui/buttonshd";
import { Search as SearchIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { DashboardLayout } from "../../components/ui/layouts/DashboardLayout";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import moment from "moment";
import toast from "react-hot-toast";

interface Patient {
  id: string;
  name: string;
  followUp: string;
}

const mockPatients: Patient[] = [
  // Add more mock data as needed
];

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientEmail, setPatientEmail] = useState("");
  const [generatedId, setGeneratedId] = useState("");
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).id : null;

  const fetchPatients = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/physician/userList/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const patients = response.data?.map((patient: any) => ({
      id: patient.user_id,
      name: patient.f_name ? patient.f_name + " " + patient.l_name : ' - - ',
      followUp: patient.appointment_date,
    }));
    setPatients(patients);
  };
  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/");
  };

  const generate5digitId = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const handleAddPatient = async () => {
    try {
      const token = localStorage.getItem("token");
      const gdId = generate5digitId();
      setGeneratedId(gdId);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user/createUser`,
        {
          physician_id: userId,
          user_id: gdId,
          email: patientEmail,
          password: "123456",
          role: "patient",
          otp: "000000",
          is_first_time: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Patient added successfully with ID: ${gdId}`);
      setIsModalOpen(false);
      setPatientEmail("");
      // Refresh the patient list
      fetchPatients();
    } catch (error) {
      console.error("Failed to add patient:", error);
      // You might want to show an error message to the user
    }
  };

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="p-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Patient Records</CardTitle>
              <Button onClick={() => setIsModalOpen(true)}>Add Patient</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: "2rem" }}
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Follow Up</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">
                        {patient.id}
                      </TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>
                        {patient.followUp
                          ? moment(patient.followUp).format("DD-MM-YYYY")
                          : ""}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/assessment/${patient.id}`)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="patientEmail">Patient Email</Label>
              <Input
                id="patientEmail"
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                placeholder="Enter patient email"
              />
              <div className="text-sm text-gray-500">
                Generated ID: {generatedId}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPatient}>Add Patient</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Search;
