import React, { useState } from 'react';

const Sidebar = ({ currentPage, onPageChange, isOpen, onToggle, user = { name: 'Guest', email: 'guest@example.com' } }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'fa-tachometer' },
    { id: 'tasks', name: 'Tasks', icon: 'fa-tasks' },
    { id: 'documents', name: 'Documents', icon: 'fa-file-text' },
    { id: 'finance', name: 'Finance', icon: 'fa-money' },
    { id: 'analytics', name: 'Analytics', icon: 'fa-bar-chart' },
    { id: 'settings', name: 'Settings', icon: 'fa-cog' },
  ];

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={`bg-white shadow-md relative z-20 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${isOpen ? 'block' : 'hidden'} md:block`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between h-16 border-b px-4">
          {!isCollapsed && <span className="text-xl font-bold text-primary">PMS</span>}
          <button
            onClick={handleToggle}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors duration-200"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <i className={`fa ${isCollapsed ? 'fa-angle-right' : 'fa-angle-left'}`}></i>
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.id} className="group relative">
              <button
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <i className={`fa ${item.icon} ${isCollapsed ? '' : 'mr-3'}`}></i>
                {!isCollapsed && item.name}
              </button>
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                  {item.name}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className={`p-4 border-t ${isCollapsed ? 'px-2' : ''}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
              <i className="fa fa-user"></i>
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;