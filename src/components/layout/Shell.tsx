import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Shell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zoho-slate-bg dark:bg-zoho-slate-darkBg transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-56 flex flex-col min-h-screen">
        {/* Topbar Header */}
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

        {/* Page Viewport */}
        <main className="flex-1 p-3 sm:p-4 lg:p-5 max-w-7xl w-full mx-auto animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
