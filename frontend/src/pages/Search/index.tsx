import { useState } from "react";
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

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="p-8">
        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
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
                          onClick={() => {
                            /* Handle view details */
                          }}
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
    </DashboardLayout>
  );
};

export default Search;
