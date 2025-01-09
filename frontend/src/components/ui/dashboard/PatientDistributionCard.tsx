import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Activity } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export const PatientDistributionCard = () => {
  const data = [
    { name: 'Dementia', value: 25, color: '#818cf8' },      // Indigo
    { name: 'Depression', value: 20, color: '#f87171' },    // Red
    { name: 'Anxiety', value: 15, color: '#4ade80' },       // Green
    { name: 'Suicidal', value: 10, color: '#fb7185' },      // Rose
    { name: 'PTSD', value: 12, color: '#fbbf24' },          // Yellow
    { name: 'Stress', value: 18, color: '#60a5fa' },        // Blue
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          Mental Health Distribution
        </CardTitle>
        <CardDescription>Patient conditions overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {data.name}
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {data.value}%
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-xs text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-[#fb7185] mr-2" />
                High Risk
              </span>
              <span className="font-medium">10%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-[#f87171] mr-2" />
                Moderate
              </span>
              <span className="font-medium">35%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-[#4ade80] mr-2" />
                Stable
              </span>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-[#60a5fa] mr-2" />
                New Cases
              </span>
              <span className="font-medium">10%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 