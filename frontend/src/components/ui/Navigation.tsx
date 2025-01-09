import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, BarChart2, Settings, User } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
//   { icon: FileText, label: 'Questionnaire', path: '/questionnaire' },
  { icon: BarChart2, label: 'Summary', path: '/summary' },
  { icon: User, label: 'Add Patient', path: '/add-patient' },
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.nav 
      className="bg-white shadow-sm mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center px-3 py-4 text-sm font-medium ${
                  isActive 
                    ? 'text-blue-600 ' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Icon className="h-5 w-5 mr-2" />
                {item.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
} 