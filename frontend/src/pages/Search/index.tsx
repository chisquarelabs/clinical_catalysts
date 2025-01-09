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

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastAssessment: string;
  risk: "High" | "Medium" | "Low";
  status: "Active" | "Inactive";
}

const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "John Doe",
    age: 65,
    condition: "Dementia",
    lastAssessment: "2024-03-15",
    risk: "High",
    status: "Active",
  },
  {
    id: "P002",
    name: "Jane Smith",
    age: 55,
    condition: "Hypertension",
    lastAssessment: "2024-02-20",
    risk: "Medium",
    status: "Inactive",
  },
  {
    id: "P003",
    name: "Alice Johnson",
    age: 45,
    condition: "Asthma",
    lastAssessment: "2024-01-10",
    risk: "Low",
    status: "Active",
  },
  {
    id: "P004",
    name: "Bob Brown",
    age: 35,
    condition: "Diabetes",
    lastAssessment: "2024-04-05",
    risk: "Medium",
    status: "Active",
  },
  // Add more mock data as needed
];

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientEmail, setPatientEmail] = useState("");
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).id : null;

  const fetchPatients = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/physician/userList/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // setPatients(response.data);
  };
  useEffect(() => {
    fetchPatients();
  }, []);

  const getRiskBadgeClass = (risk: Patient["risk"]) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (risk) {
      case "High":
        return `${baseClasses} bg-red-100 text-red-700`;
      case "Medium":
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case "Low":
        return `${baseClasses} bg-green-100 text-green-700`;
      default:
        return baseClasses;
    }
  };

  const getStatusBadgeClass = (status: Patient["status"]) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    return status === "Active"
      ? `${baseClasses} bg-blue-100 text-blue-700`
      : `${baseClasses} bg-gray-100 text-gray-700`;
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/");
  };

  const handleAddPatient = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/physician/addPatient`,
        {
          physicianId: userId,
          patientEmail: patientEmail
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
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
              <Button onClick={() => setIsModalOpen(true)}>
                Add Patient
              </Button>
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
                    <TableHead>Age</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Last Assessment</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.condition}</TableCell>
                      <TableCell>{patient.lastAssessment}</TableCell>
                      <TableCell>
                        <span className={getRiskBadgeClass(patient.risk)}>
                          {patient.risk}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={getStatusBadgeClass(patient.status)}>
                          {patient.status}
                        </span>
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
