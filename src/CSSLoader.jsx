import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function CSSLoader() {
  const location = useLocation();

  useEffect(() => {
    const appCSS = document.getElementById('app-css');
    const healthHistoryCSS = document.getElementById('health-history-css');

    if (appCSS) {
      console.log('Removing App.css');
      appCSS.remove();
    }

    if (healthHistoryCSS) {
      console.log('Removing HealthHistory.css');
      healthHistoryCSS.remove();
    }

    if (location.pathname === '/') {
      console.log('Adding App.css');
      const link = document.createElement('link');
      link.id = 'app-css';
      link.rel = 'stylesheet';
      link.href = '/App.css';
      document.head.appendChild(link);
    } else if (location.pathname === '/health-history') {
      console.log('Adding HealthHistory.css');
      const link = document.createElement('link');
      link.id = 'health-history-css';
      link.rel = 'stylesheet';
      link.href = '/HealthHistory.css';
      document.head.appendChild(link);
    }

    return () => {
      if (appCSS) appCSS.remove();
      if (healthHistoryCSS) healthHistoryCSS.remove();
    };
  }, [location.pathname]);

  return null;
}

export default CSSLoader;

