import React from 'react';

interface Score {
  category: string;
  value: number;
  maxValue: number;
}

interface ScoreChartProps {
  scores: Score[];
}

export function ScoreChart({ scores }: ScoreChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Assessment Scores</h3>
      <div className="space-y-4">
        {scores.map((score, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">{score.category}</span>
              <span className="text-gray-900 font-medium">{score.value}/{score.maxValue}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(score.value / score.maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 