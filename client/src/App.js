import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Computers from './components/Computers/Computers';
import DashboardLayout from './components/Dashboard/DashboardLayout';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/dashboard/home" /> : <Login onLoginSuccess={handleLoginSuccess} />
          }
        />

        {user && (
          <Route path="/dashboard" element={<DashboardLayout user={user} onLogout={handleLogout} />}>
            <Route path="home" element={<Home />} />
            <Route path="computers" element={<Computers />} />
            <Route index element={<Navigate to="home" />} />
          </Route>
        )}

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
