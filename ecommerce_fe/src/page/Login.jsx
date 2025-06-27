import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faCalendar, faNewspaper} from '@fortawesome/free-solid-svg-icons';;
import './Login.css'; 
import Footer from '../components/Footer';
import { useEffect } from 'react';


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
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  
  useEffect(() => {
    setError(null);
  }, [location.pathname]);

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password
      });
      localStorage.setItem('user', JSON.stringify(response.data.user));                 
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Lỗi đăng nhập!'); 
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault(); 
    if (!passwordRegex.test(password)) {
      setError("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/register', { 
        email,
        name,
        gender,
        date_of_birth: dateOfBirth,
        password
      });
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
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
                  <FontAwesomeIcon icon={faNewspaper} className="input-icon" />
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
                    <FontAwesomeIcon icon={faCalendar} className="input-icon" />
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
                  <FontAwesomeIcon icon={faUser} className="input-icon" />
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-input"
                    required
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div></>
            )}
            <div className="form-group">
              <div className="input-group">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
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
                <FontAwesomeIcon icon={faLock} className="input-icon" />
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
          </form>
          <div className="or-divider">
            <span>HOẶC</span>
          </div>
          <div className="social-login">
            <button className="social-button google-button"
              onClick={() => {
                window.location.href = 'http://127.0.0.1:8000/api/auth/google/login';
              }}>
              <img src={`/assets/google-icon.png`} alt="Google" />
              Google
            </button>
            <button className="social-button facebook-button"  onClick={() => setError("Tính năng đang phát triển")}>
              <img src={`/assets/facebook-icon.png`} alt="Facebook" />
              Facebook
            </button>
          </div>
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
