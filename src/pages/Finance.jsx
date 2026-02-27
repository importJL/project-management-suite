import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Finance = () => {
  const [expenses, setExpenses] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [activeTab, setActiveTab] = useState('expenses'); // 'expenses' or 'budget'
  const expenseChartRef = useRef(null);

  // Chart reference
  const chartRef = useRef(null);

  useEffect(() => {
    // Mock data for expenses
    setExpenses([
      { 
        id: 1, 
        description: 'Server Infrastructure', 
        amount: 1200, 
        category: 'Infrastructure', 
        date: '2023-06-01',
        paymentMethod: 'Credit Card',
        receiptUrl: '#',
        notes: 'Monthly server rental for cloud infrastructure',
        approved: true
      },
      { 
        id: 2, 
        description: 'Design Software', 
        amount: 500, 
        category: 'Software', 
        date: '2023-06-05',
        paymentMethod: 'Credit Card',
        receiptUrl: '#',
        notes: 'Annual subscription to design software',
        approved: true
      },
      { 
        id: 3, 
        description: 'Marketing Campaign', 
        amount: 2000, 
        category: 'Marketing', 
        date: '2023-06-10',
        paymentMethod: 'Bank Transfer',
        receiptUrl: '#',
        notes: 'Digital marketing campaign for product launch',
        approved: true
      },
      { 
        id: 4, 
        description: 'Team Training', 
        amount: 800, 
        category: 'Training', 
        date: '2023-06-15',
        paymentMethod: 'Credit Card',
        receiptUrl: '#',
        notes: 'Online courses for team skill development',
        approved: true
      },
      { 
        id: 5, 
        description: 'Office Supplies', 
        amount: 300, 
        category: 'Office', 
        date: '2023-06-20',
        paymentMethod: 'Debit Card',
        receiptUrl: '#',
        notes: 'Basic office supplies for the team',
        approved: false
      },
      { 
        id: 6, 
        description: 'Client Meeting Lunch', 
        amount: 150, 
        category: 'Entertainment', 
        date: '2023-06-22',
        paymentMethod: 'Credit Card',
        receiptUrl: '#',
        notes: 'Lunch meeting with potential client',
        approved: false
      },
      { 
        id: 7, 
        description: 'Travel Expenses', 
        amount: 750, 
        category: 'Travel', 
        date: '2023-06-25',
        paymentMethod: 'Credit Card',
        receiptUrl: '#',
        notes: 'Airfare and accommodation for client visit',
        approved: false
      }
    ]);
  }, []);

  useEffect(() => {
    // Initialize chart when expenses data is loaded
    if (expenses.length > 0 && activeTab === 'expenses') {
      initExpenseChart();
    }

    // Cleanup chart when component unmounts
    return () => {
      if (expenseChartRef.current) {
        expenseChartRef.current.destroy();
      }
    };
  }, [expenses, activeTab]);

  const initExpenseChart = () => {
    // Destroy previous chart if it exists
    if (expenseChartRef.current) {
      expenseChartRef.current.destroy();
    }

    // Get canvas element
    const ctx = document.getElementById('expenseChart');
    if (!ctx) return;

    // Group expenses by category
    const categories = {};
    expenses.forEach(expense => {
      if (categories[expense.category]) {
        categories[expense.category] += expense.amount;
      } else {
        categories[expense.category] = expense.amount;
      }
    });

    // Prepare chart data
    const data = {
      labels: Object.keys(categories),
      datasets: [{
        label: 'Expense Amount ($)',
        data: Object.values(categories),
        backgroundColor: [
          '#3b82f6', // blue
          '#10b981', // green
          '#f59e0b', // yellow
          '#ef4444', // red
          '#8b5cf6', // purple
          '#ec4899', // pink
          '#14b8a6'  // teal
        ],
        borderWidth: 1
      }]
    };

    // Chart configuration
    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Expenses by Category',
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: $${value.toLocaleString()} (${percentage}%)`;
              }
            }
          }
        }
      }
    };

    // Create new chart
    const newChart = new Chart(ctx, config);
    expenseChartRef.current = newChart;
  };

  const handleExpenseCreate = (expenseData) => {
    const newExpense = {
      id: expenses.length + 1,
      ...expenseData,
      approved: false
    };
    setExpenses([...expenses, newExpense]);
    setShowExpenseForm(false);
    setCurrentExpense(null);
  };

  const handleExpenseUpdate = (expenseId, expenseData) => {
    setExpenses(expenses.map(expense => 
      expense.id === expenseId ? { ...expense, ...expenseData } : expense
    ));
    setShowExpenseForm(false);
    setCurrentExpense(null);
  };

  const handleExpenseDelete = (expenseId) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId));
  };

  const handleExpenseApprove = (expenseId) => {
    setExpenses(expenses.map(expense => 
      expense.id === expenseId ? { ...expense, approved: true } : expense
    ));
  };

  const openExpenseForm = (expense = null) => {
    setCurrentExpense(expense);
    setShowExpenseForm(true);
  };

  const closeExpenseForm = () => {
    setShowExpenseForm(false);
    setCurrentExpense(null);
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const approvedExpenses = expenses.filter(expense => expense.approved).reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = totalExpenses - approvedExpenses;

  // Get monthly expenses
  const monthlyExpenses = expenses.reduce((acc, expense) => {
    const month = expense.date.substring(0, 7); // YYYY-MM
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += expense.amount;
    return acc;
  }, {});

  const renderExpensesView = () => {
    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-light rounded-md p-3">
                  <i className="fa fa-money text-primary text-xl"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Expenses</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">${totalExpenses.toLocaleString()}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-success-light rounded-md p-3">
                  <i className="fa fa-check-circle text-success text-xl"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Approved</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">${approvedExpenses.toLocaleString()}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-success">
                        {Math.round((approvedExpenses / totalExpenses) * 100)}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-warning-light rounded-md p-3">
                  <i className="fa fa-clock-o text-warning text-xl"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">${pendingExpenses.toLocaleString()}</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-warning">
                        {Math.round((pendingExpenses / totalExpenses) * 100)}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-info-light rounded-md p-3">
                  <i className="fa fa-calendar text-info text-xl"></i>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">This Month</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        ${monthlyExpenses[new Date().toISOString().substring(0, 7)]?.toLocaleString() || '0'}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart and Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expense Chart */}
          <div className="bg-white shadow rounded-lg p-6 lg:col-span-1">
            <div className="h-64">
              <canvas id="expenseChart"></canvas>
            </div>
          </div>

          {/* Expense Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden lg:col-span-2">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Expense List</h3>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => openExpenseForm()}
              >
                <i className="fa fa-plus mr-2"></i> Add Expense
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{expense.description}</div>
                        <div className="text-xs text-gray-500 mt-1">{expense.notes}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${expense.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          expense.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {expense.approved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-primary hover:text-primary-dark mr-3"
                          onClick={() => openExpenseForm(expense)}
                        >
                          Edit
                        </button>
                        {!expense.approved && (
                          <button 
                            className="text-green-600 hover:text-green-800 mr-3"
                            onClick={() => handleExpenseApprove(expense.id)}
                          >
                            Approve
                          </button>
                        )}
                        <button 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleExpenseDelete(expense.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{expenses.length}</span> of <span className="font-medium">{expenses.length}</span> expenses
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBudgetView = () => {
    // Mock budget data
    const budgets = [
      { category: 'Infrastructure', allocated: 5000, spent: 1200, remaining: 3800 },
      { category: 'Software', allocated: 2000, spent: 500, remaining: 1500 },
      { category: 'Marketing', allocated: 3000, spent: 2000, remaining: 1000 },
      { category: 'Training', allocated: 1500, spent: 800, remaining: 700 },
      { category: 'Office', allocated: 1000, spent: 300, remaining: 700 },
      { category: 'Entertainment', allocated: 500, spent: 150, remaining: 350 },
      { category: 'Travel', allocated: 2000, spent: 750, remaining: 1250 }
    ];

    const totalBudget = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
    const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
    const totalRemaining = budgets.reduce((sum, budget) => sum + budget.remaining, 0);

    return (
      <div className="space-y-6">
        {/* Budget Summary */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">${totalBudget.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">${totalSpent.toLocaleString()}</p>
              <div className="mt-1 flex items-baseline text-sm font-medium text-red-600">
                {Math.round((totalSpent / totalBudget) * 100)}% of total budget
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Remaining</p>
              <p className="text-2xl font-bold text-gray-900">${totalRemaining.toLocaleString()}</p>
              <div className="mt-1 flex items-baseline text-sm font-medium text-green-600">
                {Math.round((totalRemaining / totalBudget) * 100)}% of total budget
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="h-4 rounded-full bg-blue-500" 
                style={{ width: `${(totalSpent / totalBudget) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Budget by Category */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Budget by Category</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allocated
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remaining
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {budgets.map((budget, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {budget.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${budget.allocated.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${budget.spent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${budget.remaining.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            (budget.spent / budget.allocated) * 100 > 90 
                              ? 'bg-red-500' 
                              : (budget.spent / budget.allocated) * 100 > 70 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                          }`} 
                          style={{ width: `${(budget.spent / budget.allocated) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {Math.round((budget.spent / budget.allocated) * 100)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Budget Forecast */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Forecast</h3>
          <div className="h-64">
            <canvas id="forecastChart"></canvas>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700">Projected Expenses</h4>
              <p className="text-xl font-bold text-gray-900 mt-2">${(totalSpent * 1.5).toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Based on current spending trends</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700">Budget Variance</h4>
              <p className="text-xl font-bold text-green-600 mt-2">${(totalBudget - totalSpent * 1.5).toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Expected remaining budget at project completion</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExpenseForm = () => {
    if (!showExpenseForm) return null;

    const initialFormData = currentExpense || {
      description: '',
      amount: '',
      category: 'Office',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'Credit Card',
      notes: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [receipt, setReceipt] = useState(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (currentExpense) {
        handleExpenseUpdate(currentExpense.id, formData);
      } else {
        handleExpenseCreate(formData);
      }
    };

    const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setReceipt(e.target.files[0]);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {currentExpense ? 'Edit Expense' : 'Add New Expense'}
              </h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={closeExpenseForm}
              >
                <i className="fa fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      id="amount"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || '' })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Software">Software</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Training">Training</option>
                      <option value="Office">Office</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Travel">Travel</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                      Payment Method
                    </label>
                    <select
                      id="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                      <option value="Check">Check</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="receipt" className="block text-sm font-medium text-gray-700">
                    Receipt
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <i className="fa fa-cloud-upload text-gray-400 text-3xl"></i>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="receipt-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                          <span>Upload a file</span>
                          <input 
                            id="receipt-upload" 
                            name="receipt-upload" 
                            type="file" 
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeExpenseForm}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {currentExpense ? 'Update Expense' : 'Add Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Finance</h2>
        <div className="flex space-x-2">
          <div className="bg-white rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border border-gray-300 ${
                activeTab === 'expenses'
                  ? 'bg-primary text-white border-primary rounded-l-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 rounded-l-md'
              }`}
              onClick={() => setActiveTab('expenses')}
            >
              <i className="fa fa-list-ul mr-2"></i> Expenses
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b border-r border-gray-300 ${
                activeTab === 'budget'
                  ? 'bg-primary text-white border-primary rounded-r-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 rounded-r-md'
              }`}
              onClick={() => setActiveTab('budget')}
            >
              <i className="fa fa-pie-chart mr-2"></i> Budget
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'expenses' && renderExpensesView()}
      {activeTab === 'budget' && renderBudgetView()}

      {renderExpenseForm()}
    </div>
  );
};

export default Finance;