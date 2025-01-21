import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Settings, Users, CreditCard, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { logout } from '../store/slices/authSlice';

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">AppHub</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
              <Link to="/settings" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-blue-600">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
              <Link to="/users" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-blue-600">
                <Users className="w-4 h-4 mr-2" />
                User Manage
              </Link>
            </div>
          </div>

          <div className="flex items-center" ref={menuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                {user?.name?.[0].toUpperCase()}
              </div>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-40 mr-4 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                <Link
                  to="/subscription"
                  className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment & Subscription
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}