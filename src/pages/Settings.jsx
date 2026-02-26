import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general'); // 'general', 'notifications', 'users', 'integrations'

  // Mock user data
  const currentUser = {
    id: 1,
    name: 'Project Manager',
    email: 'admin@example.com',
    role: 'Admin',
    avatar: null,
    timezone: 'UTC-5:00',
    language: 'English'
  };

  // Mock project settings
  const projectSettings = {
    name: 'Project Management Suite',
    description: 'A comprehensive project management solution',
    startDate: '2023-05-01',
    endDate: '2023-09-30',
    status: 'Active',
    visibility: 'Private',
    defaultView: 'Kanban'
  };

  // Mock notification settings
  const notificationSettings = {
    email: true,
    push: true,
    taskAssignments: true,
    taskComments: true,
    taskDueDates: true,
    taskStatusChanges: true,
    projectUpdates: true,
    expenseApprovals: true,
    weeklyDigest: true
  };

  // Mock users
  const users = [
    { id: 1, name: 'Project Manager', email: 'admin@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'Active' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'Active' },
    { id: 4, name: 'Mike Johnson', email: 'mike@example.com', role: 'Designer', status: 'Active' },
    { id: 5, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Writer', status: 'Active' }
  ];

  // Mock integrations
  const integrations = [
    { id: 1, name: 'Slack', status: 'Connected', lastSync: '2023-06-20T10:30:00' },
    { id: 2, name: 'Google Drive', status: 'Connected', lastSync: '2023-06-20T09:15:00' },
    { id: 3, name: 'GitHub', status: 'Connected', lastSync: '2023-06-20T08:45:00' },
    { id: 4, name: 'Jira', status: 'Disconnected', lastSync: null },
    { id: 5, name: 'Trello', status: 'Disconnected', lastSync: null }
  ];

  const [formData, setFormData] = useState({
    ...projectSettings
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    alert('Settings saved successfully!');
  };

  const renderGeneralTab = () => {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-gray-700 mb-4">Project Information</h4>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Project Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Project Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Project Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="Planning">Planning</option>
                      <option value="Active">Active</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
                      Project Visibility
                    </label>
                    <select
                      id="visibility"
                      name="visibility"
                      value={formData.visibility}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                      <option value="Team">Team</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-base font-medium text-gray-700 mb-4">Display Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="defaultView" className="block text-sm font-medium text-gray-700">
                      Default Task View
                    </label>
                    <select
                      id="defaultView"
                      name="defaultView"
                      value={formData.defaultView}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="Kanban">Kanban Board</option>
                      <option value="List">List View</option>
                      <option value="Gantt">Gantt Chart</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderNotificationsTab = () => {
    const [notifications, setNotifications] = useState({...notificationSettings});

    const handleNotificationChange = (e) => {
      const { name, checked } = e.target;
      setNotifications({
        ...notifications,
        [name]: checked
      });
    };

    const handleNotificationSave = () => {
      // Here you would typically send the notification settings to your backend
      alert('Notification settings saved successfully!');
    };

    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-medium text-gray-700 mb-4">Notification Preferences</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Email Notifications</h5>
                    <p className="text-xs text-gray-500">Receive notifications via email</p>
                  </div>
                  <button
                    type="button"
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                      notifications.email ? 'bg-primary' : 'bg-gray-200'
                    }`}
                    onClick={() => setNotifications({...notifications, email: !notifications.email})}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ease-in-out duration-200 ${
                      notifications.email ? 'translate-x-5' : 'translate-x-0'
                    }`}></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Push Notifications</h5>
                    <p className="text-xs text-gray-500">Receive notifications in the app</p>
                  </div>
                  <button
                    type="button"
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                      notifications.push ? 'bg-primary' : 'bg-gray-200'
                    }`}
                    onClick={() => setNotifications({...notifications, push: !notifications.push})}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ease-in-out duration-200 ${
                      notifications.push ? 'translate-x-5' : 'translate-x-0'
                    }`}></span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-base font-medium text-gray-700 mb-4">Notification Types</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Task Assignments</h5>
                    <p className="text-xs text-gray-500">When tasks are assigned to you</p>
                  </div>
                  <input
                    type="checkbox"
                    id="taskAssignments"
                    name="taskAssignments"
                    checked={notifications.taskAssignments}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Task Comments</h5>
                    <p className="text-xs text-gray-500">When someone comments on your tasks</p>
                  </div>
                  <input
                    type="checkbox"
                    id="taskComments"
                    name="taskComments"
                    checked={notifications.taskComments}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Task Due Dates</h5>
                    <p className="text-xs text-gray-500">When tasks are due or overdue</p>
                  </div>
                  <input
                    type="checkbox"
                    id="taskDueDates"
                    name="taskDueDates"
                    checked={notifications.taskDueDates}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Task Status Changes</h5>
                    <p className="text-xs text-gray-500">When task status changes</p>
                  </div>
                  <input
                    type="checkbox"
                    id="taskStatusChanges"
                    name="taskStatusChanges"
                    checked={notifications.taskStatusChanges}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Project Updates</h5>
                    <p className="text-xs text-gray-500">When project details are updated</p>
                  </div>
                  <input
                    type="checkbox"
                    id="projectUpdates"
                    name="projectUpdates"
                    checked={notifications.projectUpdates}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Expense Approvals</h5>
                    <p className="text-xs text-gray-500">When expenses are approved or rejected</p>
                  </div>
                  <input
                    type="checkbox"
                    id="expenseApprovals"
                    name="expenseApprovals"
                    checked={notifications.expenseApprovals}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">Weekly Digest</h5>
                    <p className="text-xs text-gray-500">Weekly summary of project activities</p>
                  </div>
                  <input
                    type="checkbox"
                    id="weeklyDigest"
                    name="weeklyDigest"
                    checked={notifications.weeklyDigest}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Reset to Default
              </button>
              <button
                type="button"
                onClick={handleNotificationSave}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderUsersTab = () => {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">User Management</h3>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <i className="fa fa-plus mr-2"></i> Add User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary-dark mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Remove
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
              Showing <span className="font-medium">{users.length}</span> of <span className="font-medium">{users.length}</span> users
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
    );
  };

  const renderIntegrationsTab = () => {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Integrations</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.map(integration => (
                <div key={integration.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <i className="fa fa-plug text-gray-500"></i>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-gray-900">{integration.name}</h4>
                        <p className="text-xs text-gray-500">
                          {integration.lastSync 
                            ? `Last synced: ${new Date(integration.lastSync).toLocaleString()}` 
                            : 'Not synced'}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      integration.status === 'Connected' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {integration.status}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    {integration.status === 'Connected' ? (
                      <>
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                          Sync Now
                        </button>
                        <button className="px-3 py-1 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          Disconnect
                        </button>
                      </>
                    ) : (
                      <button className="px-3 py-1 border border-transparent rounded-md text-xs font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-base font-medium text-gray-700 mb-4">Available Integrations</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                    <i className="fa fa-slack text-gray-500 text-xl"></i>
                  </div>
                  <h5 className="mt-3 text-sm font-medium text-gray-900">Slack</h5>
                  <p className="mt-1 text-xs text-gray-500">Team communication</p>
                  <button className="mt-4 w-full px-3 py-2 border border-transparent rounded-md text-xs font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Install
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                    <i className="fa fa-google text-gray-500 text-xl"></i>
                  </div>
                  <h5 className="mt-3 text-sm font-medium text-gray-900">Google Drive</h5>
                  <p className="mt-1 text-xs text-gray-500">File storage and sharing</p>
                  <button className="mt-4 w-full px-3 py-2 border border-transparent rounded-md text-xs font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Install
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                    <i className="fa fa-github text-gray-500 text-xl"></i>
                  </div>
                  <h5 className="mt-3 text-sm font-medium text-gray-900">GitHub</h5>
                  <p className="mt-1 text-xs text-gray-500">Code repository</p>
                  <button className="mt-4 w-full px-3 py-2 border border-transparent rounded-md text-xs font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Install
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <div className="flex space-x-2">
          <div className="bg-white rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border border-gray-300 ${
                activeTab === 'general'
                  ? 'bg-primary text-white border-primary rounded-l-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 rounded-l-md'
              }`}
              onClick={() => setActiveTab('general')}
            >
              <i className="fa fa-cog mr-2"></i> General
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-300 ${
                activeTab === 'notifications'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <i className="fa fa-bell mr-2"></i> Notifications
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-300 ${
                activeTab === 'users'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('users')}
            >
              <i className="fa fa-users mr-2"></i> Users
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b border-r border-gray-300 ${
                activeTab === 'integrations'
                  ? 'bg-primary text-white border-primary rounded-r-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 rounded-r-md'
              }`}
              onClick={() => setActiveTab('integrations')}
            >
              <i className="fa fa-plug mr-2"></i> Integrations
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'general' && renderGeneralTab()}
      {activeTab === 'notifications' && renderNotificationsTab()}
      {activeTab === 'users' && renderUsersTab()}
      {activeTab === 'integrations' && renderIntegrationsTab()}
    </div>
  );
};

export default Settings;