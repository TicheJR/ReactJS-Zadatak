import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok) {
        onLoginSuccess(data.user);
        navigate('/dashboard');
      } else {
        setMessage(`${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error');
    }
  };

  return (
    <div className="main">
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="sub-form">
        <input className="input" name="username" placeholder="Username" onChange={handleChange} required />
        <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button className="log-btn" type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
    </div>
  );
}

export default Login;
