import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>MyApp</h2>
      </div>
      <div className="navbar-right">
        <div className="profile" onClick={toggleMenu}>
          <FaUserCircle size={28} />
          <span>{user.username}</span>
        </div>
        {menuOpen && (
          <div className="dropdown">
            <button onClick={onLogout}>
              <FiLogOut /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
