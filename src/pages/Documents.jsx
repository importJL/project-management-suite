import React, { useState, useEffect } from 'react';

const Documents = () => {
  const [notebooks, setNotebooks] = useState([]);
  const [currentNotebook, setCurrentNotebook] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [showPageForm, setShowPageForm] = useState(false);
  const [activeTab, setActiveTab] = useState('notebooks'); // 'notebooks' or 'confluence'

  useEffect(() => {
    // Mock data for notebooks
    setNotebooks([
      {
        id: 1,
        title: 'Project Documentation',
        description: 'Main documentation for the project',
        color: '#3b82f6',
        pages: [
          {
            id: 1,
            title: 'Project Overview',
            content: '# Project Overview\n\nThis document provides an overview of the project, including goals, timeline, and key stakeholders.\n\n## Project Goals\n- Deliver a high-quality product\n- Meet all deadlines\n- Stay within budget\n\n## Timeline\n- Phase 1: Planning (May 1-15)\n- Phase 2: Development (May 16 - July 30)\n- Phase 3: Testing (August 1-15)\n- Phase 4: Deployment (August 16-30)',
            lastModified: '2023-06-10T14:30:00',
            createdBy: 'John Doe'
          },
          {
            id: 2,
            title: 'Technical Requirements',
            content: '# Technical Requirements\n\nThis document outlines the technical requirements for the project.\n\n## Architecture\n- Frontend: React.js\n- Backend: Node.js\n- Database: PostgreSQL\n\n## APIs\n- RESTful API\n- GraphQL for complex queries\n\n## Security Requirements\n- HTTPS for all communications\n- JWT authentication\n- Input validation',
            lastModified: '2023-06-15T09:45:00',
            createdBy: 'Jane Smith'
          },
          {
            id: 3,
            title: 'User Stories',
            content: '# User Stories\n\n## As a user, I want to...\n\n- Log in to the application\n- View my dashboard\n- Create new tasks\n- Track my progress\n- Receive notifications for important events',
            lastModified: '2023-06-18T11:20:00',
            createdBy: 'Mike Johnson'
          }
        ]
      },
      {
        id: 2,
        title: 'Meeting Notes',
        description: 'Notes from team meetings',
        color: '#10b981',
        pages: [
          {
            id: 4,
            title: 'Kickoff Meeting',
            content: '# Kickoff Meeting - May 1, 2023\n\n## Attendees\n- Project Manager\n- Development Team\n- Design Team\n- Stakeholders\n\n## Agenda\n1. Project Introduction\n2. Team Introductions\n3. Project Goals and Objectives\n4. Timeline and Milestones\n5. Roles and Responsibilities\n\n## Key Decisions\n- Technology stack finalized\n- Initial timeline approved\n- Weekly sprint meetings scheduled for Mondays at 10:00 AM',
            lastModified: '2023-05-01T15:30:00',
            createdBy: 'John Doe'
          },
          {
            id: 5,
            title: 'Sprint Planning',
            content: '# Sprint Planning - June 5, 2023\n\n## Sprint Goals\n- Complete user authentication\n- Implement dashboard layout\n- Start task management functionality\n\n## Tasks Assigned\n- John: Authentication API\n- Jane: Dashboard UI\n- Mike: Task creation form\n- Sarah: Documentation setup',
            lastModified: '2023-06-05T11:15:00',
            createdBy: 'Jane Smith'
          }
        ]
      },
      {
        id: 3,
        title: 'Design Resources',
        description: 'Design assets and guidelines',
        color: '#f59e0b',
        pages: [
          {
            id: 6,
            title: 'Brand Guidelines',
            content: '# Brand Guidelines\n\n## Color Palette\n- Primary: #3b82f6\n- Secondary: #10b981\n- Accent: #f59e0b\n- Text: #1e293b\n- Background: #f8fafc\n\n## Typography\n- Headings: Inter, sans-serif\n- Body: Inter, sans-serif\n- Font Sizes: H1(24px), H2(20px), H3(18px), Body(16px)\n\n## UI Components\n- Buttons\n- Forms\n- Cards\n- Navigation',
            lastModified: '2023-05-20T13:45:00',
            createdBy: 'Sarah Williams'
          },
          {
            id: 7,
            title: 'Wireframes',
            content: '# Wireframes\n\n## Dashboard\n- Overview cards\n- Recent activity feed\n- Task progress chart\n\n## Task Management\n- Kanban view\n- List view\n- Gantt chart\n\n## User Profile\n- Personal information\n- Assigned tasks\n- Activity history',
            lastModified: '2023-05-25T10:30:00',
            createdBy: 'Sarah Williams'
          }
        ]
      }
    ]);

    // Set default notebook and page
    setCurrentNotebook(notebooks[0]);
    setCurrentPage(notebooks[0]?.pages[0]);
  }, []);

  const handleCreatePage = (notebookId, pageData) => {
    const newPage = {
      id: Date.now(),
      ...pageData,
      lastModified: new Date().toISOString(),
      createdBy: 'Current User'
    };

    setNotebooks(notebooks.map(notebook => 
      notebook.id === notebookId 
        ? { ...notebook, pages: [...notebook.pages, newPage] }
        : notebook
    ));

    // Set the new page as current page
    const updatedNotebook = notebooks.find(n => n.id === notebookId);
    if (updatedNotebook) {
      const updatedPages = [...updatedNotebook.pages, newPage];
      setCurrentPage(newPage);
    }

    setShowPageForm(false);
  };

  const handleUpdatePage = (notebookId, pageId, pageData) => {
    setNotebooks(notebooks.map(notebook => 
      notebook.id === notebookId 
        ? { 
            ...notebook, 
            pages: notebook.pages.map(page => 
              page.id === pageId 
                ? { ...page, ...pageData, lastModified: new Date().toISOString() }
                : page
            ) 
          }
        : notebook
    ));

    // Update current page if it's the one being edited
    if (currentPage && currentPage.id === pageId) {
      setCurrentPage({ 
        ...currentPage, 
        ...pageData, 
        lastModified: new Date().toISOString() 
      });
    }

    setShowPageForm(false);
  };

  const handleDeletePage = (notebookId, pageId) => {
    setNotebooks(notebooks.map(notebook => 
      notebook.id === notebookId 
        ? { 
            ...notebook, 
            pages: notebook.pages.filter(page => page.id !== pageId) 
          }
        : notebook
    ));

    // If current page was deleted, set a new current page
    if (currentPage && currentPage.id === pageId) {
      const updatedNotebook = notebooks.find(n => n.id === notebookId);
      if (updatedNotebook && updatedNotebook.pages.length > 1) {
        const remainingPages = updatedNotebook.pages.filter(p => p.id !== pageId);
        setCurrentPage(remainingPages[0]);
      } else {
        setCurrentPage(null);
      }
    }
  };

  const renderNotebooksView = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Notebooks List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-900">Notebooks</h3>
              <button className="text-primary hover:text-primary-dark">
                <i className="fa fa-plus"></i>
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {notebooks.map(notebook => (
                <div
                  key={notebook.id}
                  className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                    currentNotebook && currentNotebook.id === notebook.id 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setCurrentNotebook(notebook);
                    setCurrentPage(notebook.pages[0]);
                  }}
                >
                  <div className="flex items-center">
                    <div 
                      className="h-3 w-3 rounded-full mr-2" 
                      style={{ backgroundColor: notebook.color }}
                    ></div>
                    <h4 className="font-medium text-gray-900">{notebook.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{notebook.description}</p>
                  <p className="text-xs text-gray-400 mt-2">{notebook.pages.length} pages</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pages List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-900">Pages</h3>
              {currentNotebook && (
                <button 
                  className="text-primary hover:text-primary-dark"
                  onClick={() => setShowPageForm({ type: 'create', notebookId: currentNotebook.id })}
                >
                  <i className="fa fa-plus"></i>
                </button>
              )}
            </div>
            <div className="overflow-y-auto flex-1">
              {currentNotebook && currentNotebook.pages.map(page => (
                <div
                  key={page.id}
                  className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                    currentPage && currentPage.id === page.id 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  <h4 className="font-medium text-gray-900">{page.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{page.content.replace(/#/g, '').substring(0, 100)}...</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">{page.createdBy}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(page.lastModified).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
            {currentPage ? (
              <>
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{currentPage.title}</h3>
                  <div className="flex space-x-2">
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPageForm({ 
                        type: 'edit', 
                        notebookId: currentNotebook.id, 
                        pageId: currentPage.id 
                      })}
                    >
                      <i className="fa fa-pencil"></i>
                    </button>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => handleDeletePage(currentNotebook.id, currentPage.id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ 
                    __html: convertMarkdownToHtml(currentPage.content) 
                  }}></div>
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex justify-between">
                  <span>Created by {currentPage.createdBy}</span>
                  <span>Last modified {new Date(currentPage.lastModified).toLocaleString()}</span>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p>Select a page to view its content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderConfluenceView = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-medium text-gray-900 mb-4">Information Consolidation</h3>
        <p className="text-gray-600 mb-6">
          This page allows you to consolidate information from various sources into a centralized knowledge base.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Project Resources</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <i className="fa fa-file-text-o mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Project Charter</a>
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa fa-file-text-o mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Technical Documentation</a>
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa fa-file-text-o mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">User Guides</a>
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa fa-file-text-o mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">API Documentation</a>
              </li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Team Resources</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <i className="fa fa-users mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Team Directory</a>
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa fa-calendar mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Team Calendar</a>
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa fa-book mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Team Knowledge Base</a>
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa fa-tasks mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Standard Operating Procedures</a>
              </li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Meeting Notes</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <i className="fa fa-calendar-check-o mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Weekly Team Meeting - June 20, 2023</a>
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa fa-calendar-check-o mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Sprint Planning - June 15, 2023</a>
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa fa-calendar-check-o mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Client Demo - June 10, 2023</a>
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa fa-calendar-check-o mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Retrospective - June 5, 2023</a>
              </li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Reports</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <i className="fa fa-bar-chart mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Weekly Progress Report</a>
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa fa-bar-chart mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Monthly Status Report</a>
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa fa-bar-chart mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Risk Assessment</a>
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fa fa-bar-chart mr-2 text-primary"></i>
                <a href="#" className="hover:text-primary">Resource Allocation Report</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <i className="fa fa-plus mr-2"></i> Add New Resource
          </button>
        </div>
      </div>
    );
  };

  const renderPageForm = () => {
    if (!showPageForm) return null;

    const isEdit = showPageForm.type === 'edit';
    const notebookId = showPageForm.notebookId;
    const pageId = showPageForm.pageId;
    
    const initialFormData = isEdit && currentPage 
      ? { title: currentPage.title, content: currentPage.content }
      : { title: '', content: '' };
    
    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isEdit) {
        handleUpdatePage(notebookId, pageId, formData);
      } else {
        handleCreatePage(notebookId, formData);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {isEdit ? 'Edit Page' : 'Create New Page'}
              </h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowPageForm(false)}
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
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    id="content"
                    rows={10}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm font-mono"
                    placeholder="Use Markdown syntax for formatting"
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    Use Markdown syntax for formatting (headers, lists, links, etc.)
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPageForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {isEdit ? 'Update Page' : 'Create Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Simple markdown to HTML converter
  const convertMarkdownToHtml = (markdown) => {
    // Headers
    let html = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*)\*/g, '<em>$1</em>');
    
    // Unordered lists
    html = html.replace(/^\s*\*\s(.*$)/gim, '<li>$1</li>');
    
    // Convert list items to ul
    html = html.replace(/<li>(.*)<\/li>/g, function(match) {
      return '<ul>' + match + '</ul>';
    });
    
    // Paragraphs
    html = html.replace(/^(?!<[h|ul|li])(.*$)/gim, '<p>$1</p>');
    
    return html;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
        <div className="flex space-x-2">
          <div className="bg-white rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border border-gray-300 ${
                activeTab === 'notebooks'
                  ? 'bg-primary text-white border-primary rounded-l-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 rounded-l-md'
              }`}
              onClick={() => setActiveTab('notebooks')}
            >
              <i className="fa fa-book mr-2"></i> Notebooks
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border-t border-b border-r border-gray-300 ${
                activeTab === 'confluence'
                  ? 'bg-primary text-white border-primary rounded-r-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 rounded-r-md'
              }`}
              onClick={() => setActiveTab('confluence')}
            >
              <i className="fa fa-sitemap mr-2"></i> Confluence
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'notebooks' && renderNotebooksView()}
      {activeTab === 'confluence' && renderConfluenceView()}

      {renderPageForm()}
    </div>
  );
};

export default Documents;