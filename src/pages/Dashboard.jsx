import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Mock data for tasks
    setTasks([
      { id: 1, title: 'Website Redesign', status: 'completed', progress: 100, dueDate: '2023-06-15' },
      { id: 2, title: 'API Integration', status: 'in-progress', progress: 65, dueDate: '2023-06-25' },
      { id: 3, title: 'User Testing', status: 'in-progress', progress: 40, dueDate: '2023-07-05' },
      { id: 4, title: 'Documentation', status: 'pending', progress: 0, dueDate: '2023-07-15' },
      { id: 5, title: 'Deployment', status: 'pending', progress: 0, dueDate: '2023-07-25' },
    ]);

    // Mock data for expenses
    setExpenses([
      { id: 1, description: 'Server Infrastructure', amount: 1200, category: 'Infrastructure', date: '2023-06-01' },
      { id: 2, description: 'Design Software', amount: 500, category: 'Software', date: '2023-06-05' },
      { id: 3, description: 'Marketing Campaign', amount: 2000, category: 'Marketing', date: '2023-06-10' },
      { id: 4, description: 'Team Training', amount: 800, category: 'Training', date: '2023-06-15' },
      { id: 5, description: 'Office Supplies', amount: 300, category: 'Office', date: '2023-06-20' },
    ]);

    // Mock data for projects
    setProjects([
      { id: 1, name: 'E-commerce Platform', status: 'in-progress', completion: 65, startDate: '2023-05-01', endDate: '2023-08-15' },
      { id: 2, name: 'Mobile App Development', status: 'in-progress', completion: 40, startDate: '2023-05-15', endDate: '2023-09-30' },
      { id: 3, name: 'Internal Tools Upgrade', status: 'planning', completion: 10, startDate: '2023-07-01', endDate: '2023-10-15' },
    ]);
  }, []);

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'completed').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    pending: tasks.filter(task => task.status === 'pending').length,
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Prepare data for task status chart
  const taskStatusData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [taskStats.completed, taskStats.inProgress, taskStats.pending],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  // Prepare data for expense chart
  const expenseData = {
    labels: expenses.map(expense => expense.description),
    datasets: [
      {
        label: 'Expense Amount ($)',
        data: expenses.map(expense => expense.amount),
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Recent Expenses',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Chart references
  const taskStatusChartRef = useRef(null);
  const expenseChartRef = useRef(null);
  const taskStatusChartInstance = useRef(null);
  const expenseChartInstance = useRef(null);

  // Initialize charts when data is loaded
  useEffect(() => {
    if (tasks.length > 0 && expenses.length > 0) {
      // Task Status Chart
      const taskStatusCtx = document.getElementById('taskStatusChart');
      if (taskStatusCtx) {
        // Destroy previous chart instance if it exists
        if (taskStatusChartInstance.current) {
          taskStatusChartInstance.current.destroy();
        }

        taskStatusChartInstance.current = new Chart(taskStatusCtx, {
          type: 'pie',
          data: taskStatusData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
          },
        });
      }

      // Expense Chart
      const expenseCtx = document.getElementById('expenseChart');
      if (expenseCtx) {
        // Destroy previous chart instance if it exists
        if (expenseChartInstance.current) {
          expenseChartInstance.current.destroy();
        }

        expenseChartInstance.current = new Chart(expenseCtx, {
          type: 'bar',
          data: expenseData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: 'Recent Expenses',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    // Cleanup function
    return () => {
      if (taskStatusChartInstance.current) {
        taskStatusChartInstance.current.destroy();
      }
      if (expenseChartInstance.current) {
        expenseChartInstance.current.destroy();
      }
    };
  }, [tasks, expenses]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <i className="fa fa-download mr-2"></i> Export
          </button>
          <button className="px-4 py-2 bg-primary border border-transparent rounded-md text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <i className="fa fa-plus mr-2"></i> Add New
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-light rounded-md p-3">
                <i className="fa fa-tasks text-primary text-xl"></i>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Tasks</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{taskStats.total}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary-dark">
                View all tasks <i className="fa fa-arrow-right ml-1"></i>
              </a>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed Tasks</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{taskStats.completed}</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-success">
                      <i className="fa fa-arrow-up"></i>
                      <span className="sr-only">Increased</span>
                      {Math.round((taskStats.completed / taskStats.total) * 100)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-success hover:text-success-dark">
                View completed tasks <i className="fa fa-arrow-right ml-1"></i>
              </a>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{taskStats.inProgress}</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-warning">
                      {Math.round((taskStats.inProgress / taskStats.total) * 100)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-warning hover:text-warning-dark">
                View in-progress tasks <i className="fa fa-arrow-right ml-1"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-danger-light rounded-md p-3">
                <i className="fa fa-money text-danger text-xl"></i>
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
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-danger hover:text-danger-dark">
                View all expenses <i className="fa fa-arrow-right ml-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Task Status Overview</h3>
          <div className="h-64">
            <canvas id="taskStatusChart"></canvas>
          </div>
        </div>

        {/* Expense Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Breakdown</h3>
          <div className="h-64">
            <canvas id="expenseChart"></canvas>
          </div>
        </div>
      </div>

      {/* Recent Tasks and Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Tasks</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : task.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            task.status === 'completed'
                              ? 'bg-green-500'
                              : task.status === 'in-progress'
                              ? 'bg-blue-500'
                              : 'bg-yellow-500'
                          }`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{task.progress}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.dueDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
              View all tasks <i className="fa fa-arrow-right ml-1"></i>
            </a>
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Projects</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : project.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            project.completion >= 75
                              ? 'bg-green-500'
                              : project.completion >= 40
                              ? 'bg-blue-500'
                              : 'bg-yellow-500'
                          }`}
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{project.completion}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.endDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
              View all projects <i className="fa fa-arrow-right ml-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;