import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import {
  AlertCircle,
  Heart,
  Brain,
  Stethoscope,
  Loader2,
  User,
} from "lucide-react";

export const HighRiskPatientsCard = ({ answers }: { answers: any }) => {
  const isLoading = !answers?.cancer && !answers?.stroke && !answers?.cardiac;

  const LoadingSpinner = () => (
    <div className="h-4 w-4 animate-spin">
      <Loader2 className="h-4 w-4 text-muted-foreground" />
    </div>
  );

  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center text-red-600">
          <AlertCircle className="h-4 w-4 mr-2" />
          Medical Flags
        </CardTitle>
        {/* <CardDescription>Immediate Attention Required</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="flex items-center">
              <Stethoscope className="h-4 w-4 mr-2 text-rose-500" />
              Cancer
            </span>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <span className="font-semibold text-red-600">
                {answers.cancer}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center">
              <Brain className="h-4 w-4 mr-2 text-purple-500" />
              Stroke / Cerebrovascular Attack
            </span>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <span className="font-semibold text-red-600">
                {answers.stroke}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center">
              <Heart className="h-4 w-4 mr-2 text-red-500" />
              Cardiac Problems
            </span>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <span className="font-semibold text-red-600">
                {answers.cardiac}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-2 text-purple-500" />
              Need Assistance with Personal Care
            </span>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <span className="font-semibold text-red-600">
                {answers.functional_clothes}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-2 text-red-500" />
              Suicide Attempt
            </span>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <span className="font-semibold text-red-600">
                {answers.behavioral_suicide_attempt}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-2 text-red-500" />
              Suicidal Thoughts
            </span>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <span className="font-semibold text-red-600">
                {answers.behavioral_suicidal_thoughts}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
