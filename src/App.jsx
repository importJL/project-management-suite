import React, { useState } from 'react';
import NavBar from './components/layout/NavBar';
import Sidebar from './components/layout/Sidebar';
import PageContainer from './components/layout/PageContainer';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Documents from './pages/Documents';
import Finance from './pages/Finance';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <Tasks />;
      case 'documents':
        return <Documents />;
      case 'finance':
        return <Finance />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavBar onToggleSidebar={toggleSidebar} />
        <PageContainer>
          {renderPage()}
        </PageContainer>
      </div>
    </div>
  );
}

export default App;