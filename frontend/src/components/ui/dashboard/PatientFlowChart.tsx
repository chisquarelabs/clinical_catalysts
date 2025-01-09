import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";

const patientData = [
  { name: "Mon", total: 4, dementia: 2 },
  { name: "Tue", total: 3, dementia: 1 },
  { name: "Wed", total: 6, dementia: 3 },
  { name: "Thu", total: 4, dementia: 2 },
  { name: "Fri", total: 8, dementia: 4 },
  { name: "Sat", total: 2, dementia: 1 },
  { name: "Sun", total: 4, dementia: 2 },
];

export const PatientFlowChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Weekly Patient Analysis</CardTitle>
        <CardDescription>Total patients vs Dementia cases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={patientData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-sm text-muted-foreground" />
              <YAxis className="text-sm text-muted-foreground" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Total
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Dementia
                            </span>
                            <span className="font-bold text-purple-500">
                              {payload[1].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
                name="Total Patients"
              />
              <Line
                type="monotone"
                dataKey="dementia"
                stroke="hsl(var(--purple-500, 276 74% 54%))"
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
                name="Dementia Cases"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}; 