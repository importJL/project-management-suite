import React, { useState, useEffect, useRef } from 'react';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'tasks', 'resources', 'expenses'
  
  // References for chart canvases
  const taskCompletionRef = useRef(null);
  const resourceUtilizationRef = useRef(null);
  const expenseTrendRef = useRef(null);
  const projectTimelineRef = useRef(null);
  const chartInstancesRef = useRef({});

  useEffect(() => {
    // Initialize charts when component mounts or tab changes
    if (activeTab === 'overview') {
      initProjectTimelineChart();
    } else if (activeTab === 'tasks') {
      initTaskCompletionChart();
    } else if (activeTab === 'resources') {
      initResourceUtilizationChart();
    } else if (activeTab === 'expenses') {
      initExpenseTrendChart();
    }

    // Cleanup charts when component unmounts or tab changes
    return () => {
      Object.values(chartInstancesRef.current).forEach(chart => {
        if (chart) chart.destroy();
      });
      chartInstancesRef.current = {};
    };
  }, [activeTab]);

  const initProjectTimelineChart = () => {
    const ctx = projectTimelineRef.current;
    if (!ctx) return;

    // Destroy previous chart if it exists
    if (chartInstancesRef.current.projectTimeline) {
      chartInstancesRef.current.projectTimeline.destroy();
    }

    // Mock data for project timeline
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Planned Progress',
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 100, 100],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Actual Progress',
          data: [8, 15, 25, 35, 48, 65, null, null, null, null, null, null],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }
      ]
    };

    // Chart configuration
    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Project Timeline',
            font: {
              size: 16
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    };

    // Create new chart
    const newChart = new Chart(ctx, config);
    chartInstancesRef.current.projectTimeline = newChart;
  };

  const initTaskCompletionChart = () => {
    const ctx = taskCompletionRef.current;
    if (!ctx) return;

    // Destroy previous chart if it exists
    if (chartInstancesRef.current.taskCompletion) {
      chartInstancesRef.current.taskCompletion.destroy();
    }

    // Mock data for task completion
    const data = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
      datasets: [
        {
          label: 'Tasks Completed',
          data: [5, 8, 12, 7, 10, 15, 12, 8],
          backgroundColor: '#3b82f6',
          borderColor: '#2563eb',
          borderWidth: 1
        },
        {
          label: 'Tasks Added',
          data: [7, 5, 8, 10, 6, 8, 5, 3],
          backgroundColor: '#f59e0b',
          borderColor: '#d97706',
          borderWidth: 1
        }
      ]
    };

    // Chart configuration
    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Task Completion Trend',
            font: {
              size: 16
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Tasks'
            }
          }
        }
      }
    };

    // Create new chart
    const newChart = new Chart(ctx, config);
    chartInstancesRef.current.taskCompletion = newChart;
  };

  const initResourceUtilizationChart = () => {
    const ctx = resourceUtilizationRef.current;
    if (!ctx) return;

    // Destroy previous chart if it exists
    if (chartInstancesRef.current.resourceUtilization) {
      chartInstancesRef.current.resourceUtilization.destroy();
    }

    // Mock data for resource utilization
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'Development',
          data: [80, 85, 90, 85, 75, 80, 85, 90],
          backgroundColor: '#3b82f6',
          borderColor: '#2563eb',
          borderWidth: 1
        },
        {
          label: 'Design',
          data: [90, 85, 75, 65, 60, 65, 70, 75],
          backgroundColor: '#ec4899',
          borderColor: '#db2777',
          borderWidth: 1
        },
        {
          label: 'Testing',
          data: [40, 45, 50, 55, 60, 70, 75, 80],
          backgroundColor: '#10b981',
          borderColor: '#059669',
          borderWidth: 1
        },
        {
          label: 'Management',
          data: [70, 70, 70, 70, 70, 70, 70, 70],
          backgroundColor: '#f59e0b',
          borderColor: '#d97706',
          borderWidth: 1
        }
      ]
    };

    // Chart configuration
    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Resource Utilization',
            font: {
              size: 16
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    };

    // Create new chart
    const newChart = new Chart(ctx, config);
    chartInstancesRef.current.resourceUtilization = newChart;
  };

  const initExpenseTrendChart = () => {
    const ctx = expenseTrendRef.current;
    if (!ctx) return;

    // Destroy previous chart if it exists
    if (chartInstancesRef.current.expenseTrend) {
      chartInstancesRef.current.expenseTrend.destroy();
    }

    // Mock data for expense trend
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'Actual Expenses',
          data: [1200, 1500, 1800, 2000, 2500, 3000, null, null],
          backgroundColor: '#3b82f6',
          borderColor: '#2563eb',
          borderWidth: 1,
          type: 'bar'
        },
        {
          label: 'Budget',
          data: [1500, 1500, 2000, 2000, 2500, 2500, 3000, 3000],
          borderColor: '#f59e0b',
          borderWidth: 2,
          type: 'line',
          fill: false,
          tension: 0.1
        }
      ]
    };

    // Chart configuration
    const config = {
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Expense Trend',
            font: {
              size: 16
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount ($)'
            }
          }
        }
      }
    };

    // Create new chart
    const newChart = new Chart(ctx, config);
    chartInstancesRef.current.expenseTrend = newChart;
  };

  const renderOverviewTab = () => {
    // Mock data for project health
    const projectHealth = {
      status: 'On Track',
      healthScore: 85,
      risks: 3,
      issues: 5,
      milestones: {
        completed: 4,
        total: 8
      }
    };

    // Mock data for recent activities
    const recentActivities = [
      { id: 1, user: 'John Doe', action: 'completed task', target: 'Website Redesign', time: '2 hours ago' },
      { id: 2, user: 'Jane Smith', action: 'updated task', target: 'API Integration', time: '4 hours ago' },
      { id: 3, user: 'Mike Johnson', action: 'created task', target: 'User Testing', time: 'Yesterday' },
      { id: 4, user: 'Sarah Williams', action: 'uploaded document', target: 'Technical Requirements', time: 'Yesterday' },
      { id: 5, user: 'David Brown', action: 'approved expense', target: 'Server Infrastructure', time: '2 days ago' }
    ];

    return (
      <div className="space-y-6">
        {/* Project Health Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Project Health</h3>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-green-100 flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-600">{projectHealth.healthScore}</span>
                </div>
                <div className="absolute top-0 right-0 bg-white rounded-full p-1 shadow">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    projectHealth.status === 'On Track' 
                      ? 'bg-green-100 text-green-800' 
                      : projectHealth.status === 'At Risk' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {projectHealth.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Risks</p>
                <p className="text-xl font-bold text-gray-900">{projectHealth.risks}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Issues</p>
                <p className="text-xl font-bold text-gray-900">{projectHealth.issues}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Task Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Completed</span>
                  <span className="text-sm font-medium text-gray-700">12/30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-green-500" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">In Progress</span>
                  <span className="text-sm font-medium text-gray-700">8/30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-blue-500" style={{ width: '27%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Pending</span>
                  <span className="text-sm font-medium text-gray-700">10/30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: '33%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button className="text-sm font-medium text-primary hover:text-primary-dark">
                View detailed task report
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Milestones</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-blue-100 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">{projectHealth.milestones.completed}/{projectHealth.milestones.total}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-700">Project Kickoff</span>
                <span className="ml-auto text-xs text-green-600">Completed</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-700">Requirements Gathering</span>
                <span className="ml-auto text-xs text-green-600">Completed</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-700">Design Phase</span>
                <span className="ml-auto text-xs text-green-600">Completed</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-700">Prototype Review</span>
                <span className="ml-auto text-xs text-green-600">Completed</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-700">Development Phase</span>
                <span className="ml-auto text-xs text-blue-600">In Progress</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Resource Allocation</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Development</span>
                  <span className="text-sm font-medium text-gray-700">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-blue-500" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Design</span>
                  <span className="text-sm font-medium text-gray-700">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-pink-500" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Testing</span>
                  <span className="text-sm font-medium text-gray-700">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-green-500" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Management</span>
                  <span className="text-sm font-medium text-gray-700">10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Timeline Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Project Timeline</h3>
          <div className="h-80">
            <canvas ref={projectTimelineRef}></canvas>
          </div>
        </div>

        {/* Recent Activities and Upcoming Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                    <i className="fa fa-user"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="text-sm font-medium text-primary hover:text-primary-dark">
                View all activities
              </button>
            </div>
          </div>

          {/* Upcoming Milestones */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Milestones</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {/* Timeline items */}
              <div className="space-y-6">
                <div className="relative pl-10">
                  <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-blue-500 border-4 border-white"></div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900">Development Phase Completion</h4>
                    <p className="text-sm text-gray-500 mt-1">July 15, 2023</p>
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: '65%' }}></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">65%</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-yellow-500 border-4 border-white"></div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900">Testing Phase</h4>
                    <p className="text-sm text-gray-500 mt-1">August 1, 2023</p>
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: '10%' }}></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">10%</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-gray-300 border-4 border-white"></div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900">User Acceptance Testing</h4>
                    <p className="text-sm text-gray-500 mt-1">August 15, 2023</p>
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-gray-300" style={{ width: '0%' }}></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">0%</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-gray-300 border-4 border-white"></div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900">Project Launch</h4>
                    <p className="text-sm text-gray-500 mt-1">September 1, 2023</p>
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-gray-300" style={{ width: '0%' }}></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTasksTab = () => {
    // Mock data for task distribution
    const taskDistribution = [
      { category: 'Development', count: 15 },
      { category: 'Design', count: 8 },
      { category: 'Testing', count: 5 },
      { category: 'Documentation', count: 3 },
      { category: 'Management', count: 4 }
    ];

    // Mock data for task completion by assignee
    const taskCompletionByAssignee = [
      { name: 'John Doe', completed: 8, total: 12 },
      { name: 'Jane Smith', completed: 6, total: 10 },
      { name: 'Mike Johnson', completed: 4, total: 8 },
      { name: 'Sarah Williams', completed: 3, total: 6 },
      { name: 'David Brown', completed: 2, total: 4 }
    ];

    return (
      <div className="space-y-6">
        {/* Task Completion Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Task Completion Trend</h3>
          <div className="h-80">
            <canvas ref={taskCompletionRef}></canvas>
          </div>
        </div>

        {/* Task Distribution and Completion by Assignee */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Distribution */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Task Distribution by Category</h3>
            <div className="h-80">
              <canvas id="taskDistributionChart"></canvas>
            </div>
          </div>

          {/* Task Completion by Assignee */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Task Completion by Assignee</h3>
            <div className="space-y-4">
              {taskCompletionByAssignee.map((assignee, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{assignee.name}</span>
                    <span className="text-sm font-medium text-gray-700">{assignee.completed}/{assignee.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-blue-500" 
                      style={{ width: `${(assignee.completed / assignee.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Status Summary */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Task Status Summary</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Completion Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Overdue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    12
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-green-500" style={{ width: '40%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">40%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    4.5 days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      In Progress
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    8
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-blue-500" style={{ width: '27%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">27%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    N/A
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    10
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: '33%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">33%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    N/A
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Task Priority Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Task Priority Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-red-800">High Priority</h4>
                <span className="text-2xl font-bold text-red-800">8</span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-red-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-red-500" style={{ width: '60%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-red-700">
                  <span>Completed: 5</span>
                  <span>Remaining: 3</span>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-yellow-800">Medium Priority</h4>
                <span className="text-2xl font-bold text-yellow-800">15</span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-yellow-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-yellow-500" style={{ width: '40%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-yellow-700">
                  <span>Completed: 6</span>
                  <span>Remaining: 9</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-green-800">Low Priority</h4>
                <span className="text-2xl font-bold text-green-800">7</span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '14%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-green-700">
                  <span>Completed: 1</span>
                  <span>Remaining: 6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResourcesTab = () => {
    // Mock data for team utilization
    const teamUtilization = [
      { name: 'John Doe', utilization: 90 },
      { name: 'Jane Smith', utilization: 85 },
      { name: 'Mike Johnson', utilization: 75 },
      { name: 'Sarah Williams', utilization: 65 },
      { name: 'David Brown', utilization: 80 }
    ];

    // Mock data for resource allocation by project
    const resourceAllocationByProject = [
      { project: 'E-commerce Platform', allocation: 45 },
      { project: 'Mobile App', allocation: 30 },
      { project: 'Internal Tools', allocation: 15 },
      { project: 'Maintenance', allocation: 10 }
    ];

    return (
      <div className="space-y-6">
        {/* Resource Utilization Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resource Utilization Trend</h3>
          <div className="h-80">
            <canvas ref={resourceUtilizationRef}></canvas>
          </div>
        </div>

        {/* Team Utilization and Resource Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Utilization */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Team Utilization</h3>
            <div className="space-y-4">
              {teamUtilization.map((member, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{member.name}</span>
                    <span className="text-sm font-medium text-gray-700">{member.utilization}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        member.utilization > 85 
                          ? 'bg-red-500' 
                          : member.utilization > 70 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                      }`} 
                      style={{ width: `${member.utilization}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Allocation by Project */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Resource Allocation by Project</h3>
            <div className="h-80">
              <canvas id="resourceAllocationChart"></canvas>
            </div>
          </div>
        </div>

        {/* Resource Capacity Planning */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resource Capacity Planning</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Allocation
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available Hours
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Over allocation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                        JD
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Senior Developer
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-red-500" style={{ width: '90%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">90% (36h/40h)</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    4h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    0h
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm">
                        JS
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Frontend Developer
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">85% (34h/40h)</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    6h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    0h
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
                        MJ
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Mike Johnson</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    UI/UX Designer
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-green-500" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">75% (30h/40h)</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    10h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    0h
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm">
                        SW
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Sarah Williams</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Technical Writer
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-green-500" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">65% (26h/40h)</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    14h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    0h
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-yellow-500 text-white flex items-center justify-center text-sm">
                        DB
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">David Brown</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    QA Engineer
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: '80%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">80% (32h/40h)</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    8h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    0h
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderExpensesTab = () => {
    // Mock data for expense by category
    const expenseByCategory = [
      { category: 'Infrastructure', amount: 1200 },
      { category: 'Software', amount: 500 },
      { category: 'Marketing', amount: 2000 },
      { category: 'Training', amount: 800 },
      { category: 'Office', amount: 300 },
      { category: 'Entertainment', amount: 150 },
      { category: 'Travel', amount: 750 }
    ];

    // Mock data for monthly expenses
    const monthlyExpenses = [
      { month: 'January', budget: 1500, actual: 1200 },
      { month: 'February', budget: 1500, actual: 1500 },
      { month: 'March', budget: 2000, actual: 1800 },
      { month: 'April', budget: 2000, actual: 2000 },
      { month: 'May', budget: 2500, actual: 2500 },
      { month: 'June', budget: 2500, actual: 3000 },
      { month: 'July', budget: 3000, actual: 0 },
      { month: 'August', budget: 3000, actual: 0 }
    ];

    return (
      <div className="space-y-6">
        {/* Expense Trend Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Trend</h3>
          <div className="h-80">
            <canvas ref={expenseTrendRef}></canvas>
          </div>
        </div>

        {/* Expense by Category and Monthly Expenses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense by Category */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Expense by Category</h3>
            <div className="h-80">
              <canvas id="expenseByCategoryChart"></canvas>
            </div>
          </div>

          {/* Monthly Expenses */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Expenses vs Budget</h3>
            <div className="space-y-4">
              {monthlyExpenses.map((month, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{month.month}</span>
                    <span className="text-sm font-medium text-gray-700">${month.actual.toLocaleString()} / ${month.budget.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        month.actual > month.budget 
                          ? 'bg-red-500' 
                          : 'bg-green-500'
                      }`} 
                      style={{ width: `${(month.actual / month.budget) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expense Summary */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Summary</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actual
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Variance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenseByCategory.map((expense, index) => {
                  const budget = expense.amount * 1.2; // Mock budget value
                  const variance = budget - expense.amount;
                  const percentage = (expense.amount / budget) * 100;
                  
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {expense.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${budget.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${expense.amount.toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                        variance >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {variance >= 0 ? '+' : ''}${variance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              percentage > 90 
                                ? 'bg-red-500' 
                                : percentage > 70 
                                  ? 'bg-yellow-500' 
                                  : 'bg-green-500'
                            }`} 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{Math.round(percentage)}%</span>
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Total
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${expenseByCategory.reduce((sum, exp) => sum + exp.amount * 1.2, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${expenseByCategory.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    +${expenseByCategory.reduce((sum, exp) => sum + exp.amount * 0.2, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-green-500" style={{ width: '83%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">83%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <div className="flex space-x-2">
          <div className="bg-white rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border border-gray-300 ${
                activeTab === 'overview'
                  ? 'bg-primary text-white border-primary rounded-l-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 rounded-l-md'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="fa fa-dashboard mr-2"></i> Overview
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-300 ${
                activeTab === 'tasks'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('tasks')}
            >
              <i className="fa fa-tasks mr-2"></i> Tasks
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-300 ${
                activeTab === 'resources'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('resources')}
            >
              <i className="fa fa-users mr-2"></i> Resources
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b border-r border-gray-300 ${
                activeTab === 'expenses'
                  ? 'bg-primary text-white border-primary rounded-r-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 rounded-r-md'
              }`}
              onClick={() => setActiveTab('expenses')}
            >
              <i className="fa fa-money mr-2"></i> Expenses
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'tasks' && renderTasksTab()}
      {activeTab === 'resources' && renderResourcesTab()}
      {activeTab === 'expenses' && renderExpensesTab()}
    </div>
  );
};

export default Analytics;