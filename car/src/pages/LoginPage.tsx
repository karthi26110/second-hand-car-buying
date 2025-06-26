import React from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <button
          onClick={loginWithGoogle}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.546 12.356c0 .675.06 1.343.177 1.988h-6.423v-3.736h3.612c.21 1.92 2.007 3.38 4.119 3.38 2.35 0 4.28-1.885 4.28-4.258 0-2.352-1.93-4.258-4.28-4.258-1.924 0-3.52 1.35-4.103 3.216h-.079l1.172-4.497h4.709c3.313 0 6 2.687 6 6 0 3.312-2.687 6-6 6-3.313 0-6-2.688-6-6z"/>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

