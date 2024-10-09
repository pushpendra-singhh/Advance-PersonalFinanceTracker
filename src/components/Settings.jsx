import React from 'react';
import { useFinanceContext } from '../context/FinanceContext';

const Settings = () => {
  const { settings, updateSettings } = useFinanceContext();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            id="currency"
            name="currency"
            value={settings.currency}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="$">USD ($)</option>
            <option value="₹">RUPEE (₹)</option>
          </select>
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            id="darkMode"
            name="darkMode"
            type="checkbox"
            checked={settings.darkMode}
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-900">
            Dark Mode
          </label>
        </div>

        <div>
          <label htmlFor="notificationEmail" className="block text-sm font-medium text-gray-700">Notification Email</label>
          <input
            type="email"
            id="notificationEmail"
            name="notificationEmail"
            value={settings.notificationEmail}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h3 className="text-lg font-semibold">Data Management</h3>
        <button
          onClick={() => {
            // Implement export functionality
            alert('Export functionality not implemented yet.');
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Export Data
        </button>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
              // Implement delete functionality
              alert('Delete functionality not implemented yet.');
            }
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete All Data
        </button>
      </div>
    </div>
  );
};

export default Settings;