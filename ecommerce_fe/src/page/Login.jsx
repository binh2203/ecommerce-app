import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserIcon, EnvelopeIcon, LockClosedIcon, CalendarDaysIcon, NewspaperIcon} from '@heroicons/react/24/solid';
import './Login.css'; 
import Footer from '../components/Footer';

function Login() {
  const location = useLocation();
  const isRegister = location.pathname === '/register';
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [name, setName] = useState(''); 
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password
      });
      localStorage.setItem('user', response.data.user);  
      alert(response.data.message);                     
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Lỗi đăng nhập!'); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/register', { 
        name,
        email,
        password,
        date_of_birth: dateOfBirth,
        gender,
      });
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Lỗi đăng ký!');
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
        <p>{isRegister ? 'Đăng Ký' : 'Đăng Nhập'}</p>
      </div>

      <div className="login-page">
        <div className="login-info">
          <img src={`/assets/Login-Logo.png`} alt="logo" />
        </div>

        <div className="login-form">
          <p className="login-title">{isRegister ? 'Đăng Ký' : 'Đăng Nhập'}</p>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={isRegister ? handleRegister : handleLogin} className="login-form-content">
            
            {isRegister &&(
              <><div className="form-group">
                <div className="input-group">
                  <NewspaperIcon className="input-icon" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    placeholder="Nhập họ và tên"
                    required />
                </div>
              </div>
              <div className="form-group">
                  <div className="input-group">
                    <CalendarDaysIcon className="input-icon" />
                    <input
                      id="date_of_birth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="form-input"
                      required />
                  </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <UserIcon className="input-icon" />
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-input"
                    required
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div></>
            )}
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
                ) : isRegister ? 'ĐĂNG KÝ' : 'ĐĂNG NHẬP'}
              </button>

              {!isRegister && (
                <Link to="/forgot-password" className="forgot-password-link">
                  Quên mật khẩu?
                </Link>
              )}
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
            {isRegister ? (
              <>
                Đã có tài khoản?{' '}
                <Link to="/login" className="register-link">
                  Đăng Nhập
                </Link>
              </>
            ) : (
              <>
                Chưa có tài khoản?{' '}
                <Link to="/register" className="register-link">
                  Đăng Ký
                </Link>
              </>
            )}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
