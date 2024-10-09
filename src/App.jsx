import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Home, PieChart, DollarSign, Upload, Settings as SettingsIcon } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Budget from './components/Budget';
import DataUpload from './components/DataUpload';
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">Finance Tracker</h1>
          </div>
          <ul className="mt-4">
            <NavItem to="/" icon={<Home />} text="Dashboard" />
            <NavItem to="/transactions" icon={<DollarSign />} text="Transactions" />
            <NavItem to="/budget" icon={<PieChart />} text="Budget" />
            <NavItem to="/upload" icon={<Upload />} text="Data Upload" />
            <NavItem to="/settings" icon={<SettingsIcon />} text="Settings" />
          </ul>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/upload" element={<DataUpload />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function NavItem({ to, icon, text }) {
  return (
    <li>
      <Link to={to} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
        {icon}
        <span className="ml-2">{text}</span>
      </Link>
    </li>
  );
}

export default App;