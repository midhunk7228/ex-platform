import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { fetchApps } from '../store/slices/appsSlice';
import { Grid as AppGrid } from 'lucide-react';

export default function Home() {
  const dispatch = useAppDispatch();
  const { apps, loading, error } = useAppSelector(state => state.apps);

  useEffect(() => {
    dispatch(fetchApps());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Apps</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Add New App
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map(app => (
          <div key={app.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                <AppGrid className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{app.name}</h2>
                <p className="text-sm text-gray-500">{app.description}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{app.features.length} Features</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}