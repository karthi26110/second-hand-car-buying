import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          SecondHand Cars
        </Link>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              {currentUser.email?.includes('admin') && (
                <Link to="/admin" className="hover:text-gray-300">
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

