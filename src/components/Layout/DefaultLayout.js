import { Suspense } from 'react';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';

function DefaultLayout({ children }) {
  return (
    <>
      <Sidebar />
      <main className="pl-70 min-h-screen bg-mainBg">
        <Topbar />
        <div>
          <Suspense>{children}</Suspense>
        </div>
      </main>
    </>
  );
}

export default DefaultLayout;
