import { useEffect } from 'react';

function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  return <div className="text-teal-400">Hello from Dashboard Page</div>;
}

export default Dashboard;
