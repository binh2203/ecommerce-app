import './User.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faPencil}  from '@fortawesome/free-solid-svg-icons';

 
function Profile() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    setUser(JSON.parse(storedUser));
  }, []); 
  const toggleDropdown = (menuId) => {
    setOpenMenuId(prev => (prev === menuId ? null : menuId));
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-content">
        <div className="content-left">
          <div className="profile-avatar">
            {user && (
              <a href="" className='edit-profile'>
                <img src={`http://127.0.0.1:8000/avatars/${user.picture}`} alt="avatar_user" />
                <div>
                  <span>{user.name}</span>
                  <div className='content-icon-edit'>
                    <FontAwesomeIcon icon={faPencil} className='icon-edit' />
                    <p>Sửa Hồ Sơ</p>
                  </div>
                </div>
              </a>
            )}
          </div>
          <div className="profile-menu">
            {/* Avatar Section */}
            {/* Dropdown 1 */}
            <div className="dropdown">
              <button className="dropdown-button" onClick={() => toggleDropdown(1)}>
                <FontAwesomeIcon icon={faUser} className="menu-icon" />
                Tài khoản của tôi
              </button>
              {openMenuId === 1 && (
                <div className="dropdown-menu">
                  <a href="/user/profile">Hồ Sơ</a>
                  <a href="#">Địa Chỉ</a>
                  <a href="#">Đổi mật khẩu</a>
                </div>
              )}
            </div>

            {/* Dropdown 2 */}
            <div className="dropdown">
              <button className="dropdown-button" onClick={() => toggleDropdown(2)}>
                <FontAwesomeIcon icon={faClock} className='menu-icon' />
                Lịch sử mua hàng
              </button>
              {openMenuId === 2 && (
                <div className="dropdown-menu">
                  <a href="#">Tất cả đơn</a>
                  <a href="#">Đơn đã giao</a>
                  <a href="#">Đơn đã hủy</a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='content-right'>
            <div className='profile'>
              <div className='profile-head'>
                <h3>Hồ Sơ Của Tôi</h3>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
              </div>
              <div className="profile-info">
                <div className='profile-left'>  
                  {user && (
                    <div className="grid-container">
                    <div className="grid-item right">Email</div>
                    <div className="grid-item">{user.email}</div>
                    <div className="grid-item right">Name</div>
                    <div className="grid-item">{user.name}</div>
                    <div className="grid-item right">Giới Tính</div>
                    <div className="grid-item">{user.gender}</div>
                    <div className="grid-item right">Ngày Sinh</div>
                    <div className="grid-item">{user.date_of_birth}</div>                  
                    </div>
                  )}
                </div>
                <div className='profile-right'>
                  {user &&
                    (<a href="">
                      <img src={`http://127.0.0.1:8000/avatars/${user.picture}`} alt="avatar_user" />
                    </a>
                  )};
                </div>
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
