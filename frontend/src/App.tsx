import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  LoginPage  from './pages/Login/EmailLogin';
import Dashboard from './pages/Dashboard';
import SummaryPage from './pages/Summary';
import OTPLogin from './pages/Login/OTPLogin';
import CreatePassword from './pages/Login/CreatePassword';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './pages/Login/ForgotPassword';
import Questionnaire from './pages/Questionnaire';
import { UserProvider } from './context/UserContext';
import Summary from './pages/Summary';
import Search from './pages/Search';
import ProtectedRoute from './components/ProtectedRoute';
import FollowUp from './pages/FollowUp';
import AssessmentDetails from './pages/AssessmentDetails';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route 
            path="/questionnaire" 
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Questionnaire />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/summary" 
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Summary />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<OTPLogin />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/follow-up" element={<FollowUp />} />
          <Route path="/assessment/:patientId" element={<AssessmentDetails />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App; 