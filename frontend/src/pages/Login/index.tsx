import React from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    
    // For now, just navigate to the summary page
    navigate('/summary');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-slate-900">Welcome Back</h1>
            <p className="text-slate-500 mt-2">Please sign in to continue</p>
          </div>
          
          <div className="space-y-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Summary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 