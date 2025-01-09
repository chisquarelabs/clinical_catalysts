import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 h-16">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center">
            <span className="text-white font-semibold">M</span>
          </div>
          <h1 className="text-xl font-semibold text-slate-800">EMAT</h1>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Sign out</span>
        </button>
      </div>
    </header>
  );
} 