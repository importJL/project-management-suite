import React, { useState, useEffect } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [activeView, setActiveView] = useState('kanban'); // 'kanban', 'gantt', 'list'
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium',
    startDate: '',
    dueDate: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  useEffect(() => {
    // Initialize formData when opening the form
    if (showTaskForm) {
      setFormData(currentTask || {
        title: '',
        description: '',
        assignee: '',
        priority: 'medium',
        startDate: '',
        dueDate: '',
        tags: []
      });
      setNewTag('');
    }
  }, [showTaskForm, currentTask]);

  useEffect(() => {
    // Mock data for tasks
    setTasks([
      { 
        id: 1, 
        title: 'Website Redesign', 
        description: 'Redesign the company website with new branding and improved UX.',
        status: 'completed', 
        progress: 100, 
        dueDate: '2023-06-15',
        assignee: 'John Doe',
        priority: 'high',
        startDate: '2023-05-15',
        tags: ['Design', 'Website']
      },
      { 
        id: 2, 
        title: 'API Integration', 
        description: 'Integrate third-party API for payment processing.',
        status: 'in-progress', 
        progress: 65, 
        dueDate: '2023-06-25',
        assignee: 'Jane Smith',
        priority: 'high',
        startDate: '2023-06-01',
        tags: ['Development', 'API']
      },
      { 
        id: 3, 
        title: 'User Testing', 
        description: 'Conduct user testing sessions to gather feedback on the new features.',
        status: 'in-progress', 
        progress: 40, 
        dueDate: '2023-07-05',
        assignee: 'Mike Johnson',
        priority: 'medium',
        startDate: '2023-06-15',
        tags: ['UX', 'Testing']
      },
      { 
        id: 4, 
        title: 'Documentation', 
        description: 'Update project documentation for new features and API changes.',
        status: 'pending', 
        progress: 0, 
        dueDate: '2023-07-15',
        assignee: 'Sarah Williams',
        priority: 'medium',
        startDate: '2023-07-01',
        tags: ['Documentation']
      },
      { 
        id: 5, 
        title: 'Deployment', 
        description: 'Deploy the latest version to production environment.',
        status: 'pending', 
        progress: 0, 
        dueDate: '2023-07-25',
        assignee: 'David Brown',
        priority: 'high',
        startDate: '2023-07-20',
        tags: ['DevOps', 'Deployment']
      },
      { 
        id: 6, 
        title: 'Bug Fixes', 
        description: 'Fix critical bugs reported in the current production version.',
        status: 'in-progress', 
        progress: 75, 
        dueDate: '2023-06-30',
        assignee: 'Jane Smith',
        priority: 'high',
        startDate: '2023-06-10',
        tags: ['Development', 'Bug']
      },
      { 
        id: 7, 
        title: 'Performance Optimization', 
        description: 'Optimize database queries and improve application performance.',
        status: 'pending', 
        progress: 0, 
        dueDate: '2023-08-05',
        assignee: 'John Doe',
        priority: 'low',
        startDate: '2023-07-25',
        tags: ['Development', 'Performance']
      }
    ]);
  }, []);

  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleTaskProgressChange = (taskId, newProgress) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, progress: newProgress } : task
    ));
  };

  const handleTaskCreate = (taskData) => {
    const newTask = {
      id: tasks.length + 1,
      ...taskData,
      status: 'pending',
      progress: 0,
      startDate: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, newTask]);
    setShowTaskForm(false);
    setCurrentTask(null);
  };

  const handleTaskUpdate = (taskId, taskData) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...taskData } : task
    ));
    setShowTaskForm(false);
    setCurrentTask(null);
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const openTaskForm = (task = null) => {
    setCurrentTask(task);
    setShowTaskForm(true);
  };

  const closeTaskForm = () => {
    setShowTaskForm(false);
    setCurrentTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderKanbanView = () => {
    const columns = [
      { id: 'pending', title: 'To Do', tasks: tasks.filter(task => task.status === 'pending') },
      { id: 'in-progress', title: 'In Progress', tasks: tasks.filter(task => task.status === 'in-progress') },
      { id: 'completed', title: 'Completed', tasks: tasks.filter(task => task.status === 'completed') },
      { id: 'blocked', title: 'Blocked', tasks: tasks.filter(task => task.status === 'blocked') }
    ];

    const handleDragStart = (e, task) => {
      setDraggedTask(task);
      e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, columnId) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setDragOverColumn(columnId);
    };

    const handleDragLeave = () => {
      setDragOverColumn(null);
    };

    const handleDrop = (e, newStatus) => {
      e.preventDefault();
      if (draggedTask && draggedTask.status !== newStatus) {
        handleTaskStatusChange(draggedTask.id, newStatus);
      }
      setDraggedTask(null);
      setDragOverColumn(null);
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(column => (
          <div 
            key={column.id} 
            className={`bg-white rounded-lg shadow-sm border-2 transition-all ${dragOverColumn === column.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">{column.title}</h3>
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {column.tasks.length}
              </span>
            </div>
            <div className="p-3 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
              {column.tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`bg-white p-3 rounded-md border shadow-sm hover:shadow-md transition-shadow cursor-pointer ${draggedTask?.id === task.id ? 'opacity-50' : 'border-gray-200'}`}
                  onClick={() => openTaskForm(task)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">{task.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                        {task.assignee.charAt(0)}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">{task.assignee}</span>
                    </div>
                    <span className="text-xs text-gray-500">{task.dueDate}</span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-blue-500" 
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {task.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderGanttView = () => {
    // Calculate the project timeline based on all tasks
    const tasksWithDates = tasks.filter(t => t.startDate && t.dueDate);
    
    if (tasksWithDates.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No tasks with start and due dates to display in Gantt chart.</p>
          <p className="text-sm text-gray-400 mt-2">Add start dates to your tasks to see them in the Gantt view.</p>
        </div>
      );
    }

    // Find the earliest start date and latest due date
    let minStartDate = new Date(Math.min(...tasksWithDates.map(t => new Date(t.startDate).getTime())));
    let maxEndDate = new Date(Math.max(...tasksWithDates.map(t => new Date(t.dueDate).getTime())));
    
    // Add padding to the timeline
    minStartDate.setDate(minStartDate.getDate() - 7);
    maxEndDate.setDate(maxEndDate.getDate() + 14);

    const totalDays = Math.ceil((maxEndDate - minStartDate) / (1000 * 60 * 60 * 24));
    
    // Generate date labels for the Gantt chart header (one per day)
    const dateLabels = [];
    for (let i = 0; i <= totalDays; i++) {
      const date = new Date(minStartDate);
      date.setDate(minStartDate.getDate() + i);
      dateLabels.push({
        date,
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      });
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <div className="min-w-max">
          {/* Gantt chart header */}
          <div className="flex border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="w-64 p-3 border-r border-gray-200 font-medium text-gray-900 flex-shrink-0">Tasks</div>
            <div className="flex">
              {dateLabels.map((item, index) => (
                <div 
                  key={index} 
                  className={`w-10 p-3 text-center text-xs text-gray-500 border-r border-gray-200 flex-shrink-0 ${item.isWeekend ? 'bg-gray-50' : ''}`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          
          {/* Gantt chart tasks */}
          <div className="divide-y divide-gray-200">
            {tasksWithDates.map(task => {
              // Calculate task position and width
              const taskStart = new Date(task.startDate);
              const taskEnd = new Date(task.dueDate);
              const taskStartDays = Math.ceil((taskStart - minStartDate) / (1000 * 60 * 60 * 24));
              const taskDurationDays = Math.ceil((taskEnd - taskStart) / (1000 * 60 * 60 * 24)) + 1; // Include end date
              
              const startPosition = Math.max(0, taskStartDays);
              const width = Math.max(1, taskDurationDays); // Minimum width of 1 day
              
              return (
                <div key={task.id} className="flex items-center hover:bg-gray-50">
                  <div className="w-64 p-3 border-r border-gray-200 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{task.title}</h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority)} ml-2`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{task.assignee}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(task.startDate).toLocaleDateString()} - {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex-1 relative h-14">
                    {/* Background grid lines */}
                    <div className="absolute inset-0 flex">
                      {dateLabels.map((item, index) => (
                        <div 
                          key={index} 
                          className={`w-10 flex-shrink-0 border-r border-gray-100 ${item.isWeekend ? 'bg-gray-50' : ''}`}
                        />
                      ))}
                    </div>
                    {/* Task bar */}
                    <div 
                      className={`absolute top-2 h-10 rounded-md border cursor-pointer transition-all hover:shadow-md z-10 ${
                        task.status === 'completed' ? 'bg-green-100 border-green-300' : 
                        task.status === 'in-progress' ? 'bg-blue-100 border-blue-300' : 
                        task.status === 'blocked' ? 'bg-red-100 border-red-300' : 'bg-yellow-100 border-yellow-300'
                      }`}
                      style={{ 
                        left: `${startPosition * 40}px`, 
                        width: `${width * 40}px` 
                      }}
                      onClick={() => openTaskForm(task)}
                      title={`${task.title}: ${task.progress}% complete`}
                    >
                      <div className="h-full w-full flex items-center justify-between px-2 overflow-hidden">
                        <span className="text-xs font-medium text-gray-900 truncate">{task.title}</span>
                        <span className="text-xs text-gray-600 ml-1 whitespace-nowrap">{task.progress}%</span>
                      </div>
                      {/* Progress bar */}
                      <div className="absolute bottom-0 left-0 h-1 bg-blue-500" style={{ width: `${task.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{task.description}</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {task.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                        {task.assignee.charAt(0)}
                      </div>
                      <span className="ml-3 text-sm text-gray-900">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full bg-blue-500" 
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{task.progress}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-primary hover:text-primary-dark mr-3"
                      onClick={() => openTaskForm(task)}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleTaskDelete(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTaskForm = () => {
    if (!showTaskForm) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (currentTask) {
        handleTaskUpdate(currentTask.id, formData);
      } else {
        handleTaskCreate(formData);
      }
    };

    const handleAddTag = () => {
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData({ ...formData, tags: [...formData.tags, newTag] });
        setNewTag('');
      }
    };

    const handleRemoveTag = (tagToRemove) => {
      setFormData({
        ...formData,
        tags: formData.tags.filter(tag => tag !== tagToRemove)
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {currentTask ? 'Edit Task' : 'Create New Task'}
              </h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={closeTaskForm}
              >
                <i className="fa fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">
                      Assignee
                    </label>
                    <input
                      type="text"
                      id="assignee"
                      value={formData.assignee}
                      onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                      Priority
                    </label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={formData.startDate || ''}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <div className="mt-1 flex flex-wrap gap-2 mb-2">
                    {formData.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-2 py-1 rounded text-sm bg-gray-100 text-gray-600">
                        {tag}
                        <button 
                          type="button"
                          className="ml-1 text-gray-500 hover:text-gray-700"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="flex-1 block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="Add a tag"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                {currentTask && (
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </div>
                )}
                
                {currentTask && (
                  <div>
                    <label htmlFor="progress" className="block text-sm font-medium text-gray-700">
                      Progress ({formData.progress}%)
                    </label>
                    <input
                      type="range"
                      id="progress"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeTaskForm}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {currentTask ? 'Update Task' : 'Create Task'}
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-md border border-gray-300 ${
                activeView === 'kanban'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveView('kanban')}
            >
              <i className="fa fa-columns mr-2"></i> Kanban
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b border-gray-300 ${
                activeView === 'gantt'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveView('gantt')}
            >
              <i className="fa fa-bar-chart mr-2"></i> Gantt
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-md border border-gray-300 ${
                activeView === 'list'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveView('list')}
            >
              <i className="fa fa-list mr-2"></i> List
            </button>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={() => openTaskForm()}
          >
            <i className="fa fa-plus mr-2"></i> Add Task
          </button>
        </div>
      </div>

      {/* Task Views */}
      {activeView === 'kanban' && renderKanbanView()}
      {activeView === 'gantt' && renderGanttView()}
      {activeView === 'list' && renderListView()}

      {/* Task Form Modal */}
      {renderTaskForm()}
    </div>
  );
};

export default Tasks;