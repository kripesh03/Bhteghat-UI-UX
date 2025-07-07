// DashboardLayout.jsx
import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import { HiPlus } from 'react-icons/hi';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left: Logo */}
            <Link to="/dashboard" className="flex items-center font-bold text-blue-600 text-lg">
              <p src="/fav-icon.png" alt="logo" className="w-6 h-6 mr-1" /> bhetghat
            </Link>

            {/* Center: Navigation */}
            <nav className="flex-1 flex justify-center space-x-6 text-gray-700 font-medium">
              <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
              <Link to="/dashboard/manage-product" className="hover:text-blue-600">Manage Events</Link>
            </nav>

            {/* Right: Actions */}
            <div className="flex space-x-4 items-center">
              <Link to="/dashboard/add-new-product" className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-md">
                <HiPlus className="w-5 h-5 mr-1" />
                Create Event
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-600 text-sm font-semibold border border-red-600 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;