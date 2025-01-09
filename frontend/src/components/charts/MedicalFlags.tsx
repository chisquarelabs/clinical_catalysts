import React from 'react';

export interface Flag {
  condition: string;
  severity: 'low' | 'medium' | 'high';
}

interface MedicalFlagsProps {
  flags: Flag[];
}

export function MedicalFlags({ flags }: MedicalFlagsProps) {
  const getSeverityColor = (severity: Flag['severity']) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Medical Flags</h3>
      <div className="space-y-3">
        {flags.map((flag, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-gray-700">{flag.condition}</span>
            <span className={`px-3 py-1 rounded-full text-white text-sm ${getSeverityColor(flag.severity)}`}>
              {flag.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 