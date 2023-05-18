import Sidebar from '../Sidebar';
import Topbar from '../Topbar';

function DefaultLayout({ children }) {
  return (
    <>
      <Sidebar />
      <main className="pl-70 h-screen bg-mainBg">
        <Topbar />
        <div>{children}</div>
      </main>
    </>
  );
}

export default DefaultLayout;
