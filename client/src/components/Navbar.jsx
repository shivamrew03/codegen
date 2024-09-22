import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.info(
      <div className="text-center">
        <p className="text-lg font-semibold mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={async () => {
              const response = await logout();
              console.log(response);
              setTimeout(() => {
                toast.success(response.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
              }, 10);
              // Navigate to home page after the toast is shown
              // setTimeout(() => navigate('/'), 2000);
            }}
          >
            Yes, Logout
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        closeButton: false,
        className: "bg-white text-gray-800 p-6 rounded-lg shadow-xl border-t-4 border-indigo-500",
      }
    );
  };

  // const handleLogout = async () => {
  //   try {
  //     const response = await logout();
  //     toast.success(response.message || 'Logged out successfully', {
  //       position: "top-right",
  //       autoClose: 2000,
  //     });
  //     // Navigate to home page after the toast is shown
  //     setTimeout(() => navigate('/'), 2000);
  //   } catch (error) {
  //     toast.error('Logout failed. Please try again.');
  //   }
  // };


  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white font-bold text-xl">
              CodeGen
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {location.pathname !== '/' && (
                  <Link to="/" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                )}
                {user && location.pathname !== '/dashboard' && (
                  <Link to="/dashboard" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <>
                  <span className="text-white mr-4">Welcome, {user.username}</span>
                  <button onClick={handleLogout} className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                  <Link to="/signup" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;