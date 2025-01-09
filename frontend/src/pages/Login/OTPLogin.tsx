import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OTPInput } from "../../components/ui/OTPInput";
import toast from 'react-hot-toast';

export default function OTPLogin() {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    if (otp === '000000') {
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/create-password');
    } else {
      setOTP(''); // Clear OTP input
      toast.error('Invalid OTP. Please try again.', {
        duration: 3000,
        style: {
          background: '#f44336',
          color: '#fff',
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Verify OTP
        </h2>
        <div className="mt-2 text-center text-sm text-gray-600">
          We've sent a verification code to your mobile
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter verification code
              </label>
              <div className="mt-2">
                <OTPInput value={otp} onChange={setOTP} length={6} />
              </div>
            </div>

            <div>
              <button
                onClick={handleVerify}
                disabled={otp.length !== 6}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify & Continue
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Didn't receive code? Resend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 