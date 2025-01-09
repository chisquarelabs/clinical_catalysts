import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DashboardLayout } from "../../components/ui/layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

interface Assessment {
  id: string;
  date: string;
  answers: {
    questionId: string;
    question: string;
    answer: string;
    category: string;
  }[];
  score: number;
  riskLevel: "High" | "Medium" | "Low";
}

interface PatientDetails {
  id: string;
  name: string;
  age: number;
  email: string;
  condition: string;
  assessments: Assessment[];
}

export default function AssessmentDetails() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<PatientDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/physician/patient/${patientId}/assessments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        // setPatient(response.data);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  const getRiskBadgeClass = (risk: Assessment["riskLevel"]) => {
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

  const handleLogout = () => {
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="p-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg">{patient.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Age</p>
                <p className="text-lg">{patient.age}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg">{patient.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Condition</p>
                <p className="text-lg">{patient.condition}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assessment History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patient.assessments.map((assessment) => (
                  <TableRow key={assessment.id}>
                    <TableCell>{assessment.date}</TableCell>
                    <TableCell>{assessment.score}</TableCell>
                    <TableCell>
                      <span className={getRiskBadgeClass(assessment.riskLevel)}>
                        {assessment.riskLevel}
                      </span>
                    </TableCell>
                    <TableCell>
                      <details className="cursor-pointer">
                        <summary className="text-sm text-blue-600 hover:text-blue-800">
                          View Answers
                        </summary>
                        <div className="mt-2 space-y-2">
                          {assessment.answers.map((answer, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-3 rounded-md"
                            >
                              <p className="text-sm font-medium text-gray-600">
                                {answer.category}: {answer.question}
                              </p>
                              <p className="text-sm mt-1">{answer.answer}</p>
                            </div>
                          ))}
                        </div>
                      </details>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 