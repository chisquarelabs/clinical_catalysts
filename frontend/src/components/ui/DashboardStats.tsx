import React from 'react';
import { ArrowUpIcon } from 'lucide-react';
import { BarChart3 } from 'lucide-react';

interface StatProps {
  label: string;
  value: string | number;
  trend: number;
  color: string;
}

function Stat({ label, value, trend, color }: StatProps) {
  return (
    <div className="flex-1 p-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <div className={`flex items-center ${color}`}>
          <ArrowUpIcon className="w-3 h-3" />
          <span className="text-xs">{trend}%</span>
        </div>
      </div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}

interface DashboardStatsProps {
  stats: {
    workload: number;
    urgent: number;
    pending: number;
    inProgress: number;
    completed: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="bg-[#d1e4e3] rounded-2xl p-6 flex">
      {/* First horizontal section */}
      <div className="flex border-gray-100 pb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-600">Total Patients</span>
            <div className="flex items-center text-blue-500">
              <ArrowUpIcon className="w-3 h-3" />
              <span className="text-xs">15%</span>
            </div>
          </div>
          <div className="text-5xl font-semibold mb-2">{stats.workload}</div>
          <p className="text-xs text-gray-500 max-w-[280px]">
            Total number of patients
          </p>
          <button className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <BarChart3 className="w-4 h-4" />
            View Queue
          </button>
        </div>
      </div>

      {/* Second horizontal section with vertical split */}
      <div className="flex border-gray-100 py-4 flex-col">
        <Stat 
          label="Urgent"
          value={stats.urgent}
          trend={10}
          color="text-yellow-500"
        />
        <Stat 
          label="Pending"
          value={stats.pending}
          trend={12}
          color="text-green-500"
        />
      </div>

      {/* Third horizontal section with vertical split */}
      <div className="flex py-4 flex-col">
        <Stat 
          label="In Progress"
          value={stats.inProgress}
          trend={14}
          color="text-blue-500"
        />
        <Stat 
          label="Completed"
          value={stats.completed}
          trend={8}
          color="text-purple-500"
        />
      </div>
    </div>
  );
} 