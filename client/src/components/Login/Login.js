import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import './Login.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, handleSubmit, formState: { errors }} = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (formData) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (res.ok) {
        console.log('Dispatching loginSuccess...');

        dispatch(loginSuccess(data.user))
        console.log('Dashboard ?');
        navigate('/dashboard');
      } else {
        setMessage(data.message);
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

        <form onSubmit={handleSubmit(onSubmit)} className="sub-form">
          <input
            className="input"
            {...register('username', { required: 'Username is required' })}
            placeholder="Username"
          />
          {errors.username && <p className="error">{errors.username.message}</p>}

          <input
            className="input"
            type="password"
            {...register('password', { required: 'Password is required' })}
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <button className="log-btn" type="submit">Login</button>
        </form>

        {message && <p className="error">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
