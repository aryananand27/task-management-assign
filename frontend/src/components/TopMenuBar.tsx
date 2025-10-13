import React, { useState, useEffect, useRef } from 'react';
import profile from '../assets/icons/profile.png';
import logout from '../assets/icons/logout.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/services/authServices';
import { logout as logoutAction } from '../store/slices/authSlices';
import type { AppDispatch, RootState } from '../store';
import {toast} from 'react-toastify'

const TopMenuBar: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeMenus = () => {
    setIsProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    if (user?.id) {
      try {
        await dispatch(logoutUser(user.id)).unwrap();
        dispatch(logoutAction());
        toast.success("Logout Successful")
        navigate('/'); 
      } catch (err: any) {
        toast.error('Logout failed');
      }
    } else {
      toast.warn('No user ID found for logout');
      dispatch(logoutAction()); 
      navigate('/');
    }
  };

  return (
    <div ref={menuRef} className="relative">
      <div ref={topBarRef} className="bg-white p-4 shadow flex justify-between items-center w-full relative z-10">
        <div className="text-[#1F1F1F] text-2xl font-poppins font-medium px-2"></div>
        <div className="relative flex space-x-4">
          <button
            onClick={toggleProfileMenu}
            className="focus:outline-none p-1 bg-white relative"
            aria-label="Profile"
          >
            <img src={profile} alt="Profile" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 w-80 bg-white shadow-2xl border border-gray-200 rounded-b-lg transition-all duration-300 ease-in-out transform origin-top ${
          isProfileOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
        style={{
          zIndex: 50,
          top: topBarRef.current ? `${topBarRef.current.offsetHeight}px` : '64px',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {isProfileOpen && (
          <div className="min-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 bg-white">
              <div className="flex justify-end items-center">
                <button
                  onClick={closeMenus}
                  className="text-gray-500 p-1 rounded-full bg-white"
                  aria-label="Close profile"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-light text-[#E0E0E0] mb-2">Username</label>
                  <div
                    className="w-full p-3 rounded-md bg-[#FFF5F5] text-[#6B6B6B] cursor-not-allowed text-sm"
                    aria-disabled="true"
                  >
                    {user?.username || 'Gaurav Kumar Sen'}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-light text-[#E0E0E0] mb-2">Password</label>
                  <div
                    className="w-full p-3 rounded-md bg-[#FFF5F5] text-[#6B6B6B] cursor-not-allowed text-sm"
                    aria-disabled="true"
                  >
                    ********
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white">
              <button
                onClick={handleLogout}
                className="w-full flex items-center text-[#6B6B6B] bg-white font-poppins text-sm font-medium hover:text-red-500 transition-colors"
              >
                <img src={logout} alt="Logout Icon" className="h-6 w-6 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {isProfileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300"
          style={{ zIndex: 40 }}
          onClick={closeMenus}
        />
      )}
    </div>
  );
};

export default TopMenuBar;