import { useState, useEffect } from 'react';

// Custom hook for managing sidebar state
export const useSidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  const closeSidebar = () => setSidebarVisible(false);

  useEffect(() => {
    if (isSidebarVisible) {
      document.body.style.overflow = 'hidden'; // Lock scroll when sidebar is visible
    } else {
      document.body.style.overflow = ''; // Unlock scroll
    }
  }, [isSidebarVisible]);

  return { isSidebarVisible, toggleSidebar, closeSidebar };
};
