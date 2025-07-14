import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

function DashboardLayout({ user, onLogout }) {
  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ padding: '20px', flex: 1 }}>
          <h1>Welcome, {user.username}!</h1>
          <Outlet /> {}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
