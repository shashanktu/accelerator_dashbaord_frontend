import { useState, useEffect } from 'react';
import SimpleLogin from './SimpleLogin';
import Dashboard from './Dashboard';
import Manage from './Manage';

function SimpleRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  if (currentPath === '/dashboard') {
    return <Dashboard />;
  }

  if (currentPath.startsWith('/manage')) {
    return <Manage />;
  }

  if (currentPath === '/resume-analyzer') {
    window.location.href = 'https://resumeanalyzer-ggezh7b8b0b5cwat.canadacentral-01.azurewebsites.net/';
    return null;
  }

  return <SimpleLogin onLogin={() => navigateTo('/dashboard')} />;
}

export default SimpleRouter;