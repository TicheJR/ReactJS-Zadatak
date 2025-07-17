import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import './Navbar.css';
import { logout } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user)

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>MyApp</h2>
      </div>
      <div className="navbar-right">
        <div className="profile" onClick={toggleMenu}>
          <FaUserCircle size={28} />
          <span>{user?.username}</span>
        </div>
        {menuOpen && (
          <div className="dropdown">
            <button onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
