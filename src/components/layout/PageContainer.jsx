import React from 'react';

const PageContainer = ({ children }) => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
      {children}
    </main>
  );
};

export default PageContainer;