import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import './Login.css'; 
import Footer from '../components/Footer';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert('Đăng nhập thành công!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi đăng nhập!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-navbar">
        <Link to="/" className="login-logo">
          <img src={`/assets/logo-login.png`} alt="logo-login" />
          <span>Mini Shopee</span>
        </Link>
        <p>Đăng Nhập</p>
      </div>
      <div className="login-page">
        <div className="login-info">
          <img src={`/assets/Login-Logo.png`} alt="logo" />
        </div>
        <div className="login-form">
          <p className="login-title">Đăng Nhập</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin} className="login-form-content">
            <div className="form-group">
              <div className="input-group">
                <EnvelopeIcon className="input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <LockClosedIcon className="input-icon" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>
            </div>
            <div className="login-options">
              <button
                type="submit"
                disabled={isLoading}
                className={`login-button ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? (
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle className="spinner-path" cx="12" cy="12" r="10" />
                  </svg>
                ) : 'ĐĂNG NHẬP'}
              </button>
              <Link to="/forgot-password" className="forgot-password-link">
                Quên mật khẩu?
              </Link>
            </div>
            <div className="or-divider">
              <span>HOẶC</span>
            </div>
            <div className="social-login">
              <button className="social-button google-button">
                <img src={`/assets/google-icon.png`} alt="Google" />
                Google
              </button>
              <button className="social-button facebook-button">
                <img src={`/assets/facebook-icon.png`} alt="Facebook" />
                Facebook
              </button>
            </div>
          </form>
          <p className="login-footer">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="register-link">
              Đăng Ký
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
