import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <NavLink to="/dashboard/home" activeClassName="active">Home</NavLink>
      <NavLink to="/dashboard/computers" activeClassName="active">Computers</NavLink>
    </div>
  );
}

export default Sidebar;
