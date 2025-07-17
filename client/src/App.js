import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {  useEffect } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Computers from './components/Computers/Computers';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from './store/authSlice';


function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(loginSuccess(JSON.parse(storedUser)))
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logout())
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/dashboard/home" /> : <Login />
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
