import React, { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

export const useFinanceContext = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinanceContext must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [settings, setSettings] = useState({
    currency: '$',
    language: 'en',
    darkMode: false,
    notificationEmail: '',
  });

  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }

    const storedBudgets = localStorage.getItem('budgets');
    if (storedBudgets) {
      setBudgets(JSON.parse(storedBudgets));
    }

    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addBudget = (budget) => {
    setBudgets(prev => [...prev, budget]);
  };

  const updateBudget = (id, amount) => {
    setBudgets(prev => prev.map(b => b.id === id ? { ...b, amount } : b));
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    budgets,
    addBudget,
    updateBudget,
    settings,
    updateSettings,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

export default FinanceContext;