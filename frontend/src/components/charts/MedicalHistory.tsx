import React from 'react';

interface HistoryItem {
  condition: string;
  date: string;
  details: string;
}

interface MedicalHistoryProps {
  history: HistoryItem[];
}

export function MedicalHistory({ history }: MedicalHistoryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Medical History</h3>
      <div className="space-y-4">
        {history.map((item, index) => (
          <div key={index} className="border-l-2 border-blue-500 pl-4">
            <div className="flex justify-between items-start">
              <span className="font-medium text-gray-900">{item.condition}</span>
              <span className="text-sm text-gray-500">{item.date}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 