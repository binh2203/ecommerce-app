import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell as Bell, faCircleInfo, faBars, faXmark, faHeadset,
    faBriefcase ,faRightToBracket, faUser, faShoppingBag, faCartShopping  } from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons'; 
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    setUser(JSON.parse(storedUser));
  }, []); 
  const isLogin = user !== null;
  return (
    <nav className="navbar">
        <div className='navbar-top'>
            <div className='navbar-top-left'>
                <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                    <li><a href="/">Trang chủ</a></li>
                    <li className="separator">|</li>
                    <li>
                        {isLogin ? (
                            <a href="/seller">Kênh người bán</a>
                        ) : (
                            <a href="/register">Trở thành Người bán Shopee</a>
                        )}
                    </li>
                    <li className="separator">|</li>
                    <li><a href="https://www.facebook.com/dcb2203">Liên hệ &nbsp; <FontAwesomeIcon icon={faSquareFacebook} /></a></li>
                </ul>
            </div>
            <div className='navbar-top-right'>
                <ul className="navbar-links">
                    <li>
                        <div className="notice-container">
                            <a href="/notice">Thông Báo &nbsp; <FontAwesomeIcon icon={Bell} /></a>
                            <div className="notice-popup">
                                <div className="arrow-up"></div>
                                <p>Đăng nhập để xem thông báo của bạn</p>
                            </div>
                        </div>  
                    </li>
                    <li>
                        <a href="/support">Hỗ Trợ &nbsp; <FontAwesomeIcon icon={faCircleInfo} /></a>
                    </li>
                    { isLogin ?  (
                        <li className='user-container'>
                            <a className="navbar-user">
                                <img className="image-avatar" src={`http://127.0.0.1:8000/avatars/${user.picture}`} alt="avatar" /> 
                                <p>{user.name}</p>     
                            </a>
                            <div className="user-popup">
                                <div className="arrow-up"></div>
                                <a href="/user">Thông tin cá nhân</a>
                                <a href="/orders">Đơn hàng của tôi</a> 
                                <a href="/" onClick={() => {
                                    localStorage.removeItem('user');
                                    setUser(null);
                                }}>Đăng xuất</a>
                            </div>
                        </li>
                    ) : (
                        
                        <><li><a href="/register">Đăng ký</a></li>
                        <li className="separator">|</li>
                        <li><a href="/login">Đăng nhập</a></li></>
                    )}
                </ul>
            </div>
        </div>
        <div className="navbar-bottom">
            <Link to="/" className="navbar-logo">
                <img className="image-logo" src={`/assets/logo.png`} alt="logo" />
                <p>Mini Shopee</p>
            </Link>
            <div className="notice-mobile">
                <a href="/notice"><FontAwesomeIcon icon={Bell} /></a>
            </div>
            <div className="navbar-search">
                <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                <button aria-label="submit" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>
            <div className="cart-container">
                <a  href="/cart" className="navbar-cart">
                    <FontAwesomeIcon  className='shop-cart-icon' icon={faCartShopping} />
                </a>
                <div className="cart-popup">
                    <div className="arrow-up"></div>
                    <p>Chưa Có Sản Phẩm</p>
                </div>
            </div>
            <label htmlFor="bars_open" className='nav_bars_icon'><FontAwesomeIcon icon={faBars} /></label>
            <input className="nav_bars_open" id="bars_open" type="checkbox"/>
            <label htmlFor="bars_open" className="nav_overlay"></label>
            {/* navbar-mobile */}
            <div className='navbar-mobile'>
                <label htmlFor="bars_open" className='nav_bars_close'><FontAwesomeIcon icon={faXmark} /></label>       
                { isLogin ?  (
                    <>
                        <div className="navbar-user-mobile">
                            <img className="image-avatar-mobile" src={`http://127.0.0.1:8000/avatars/${user.picture}`} alt="avatar" /> 
                            <p>{user.name}</p>     
                        </div>
                        <div className='line_nav_mobile'></div>
                    </>
                    ) : (     
                    <>          
                    <div className="link_register_mobile">
                        <a href="/register">Đăng ký</a>
                        <a href="/login">Đăng nhập</a>
                    </div>
                    <div className='line_nav_mobile'></div>
                    </>
                )}

                <ul className="navbar-mobile-links">
                        <li>
                            <FontAwesomeIcon icon={faUser} />
                            <a href="/user">Thông tin cá nhân</a>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faShoppingBag} />
                            <a href="/orders">Đơn hàng của tôi</a> 
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faHeadset} />
                            <a href="/support">Hỗ trợ</a> 
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            <a href="https://www.facebook.com/dcb2203">Liên hệ</a> 
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faBriefcase} />
                        {isLogin ? (
                                <a href="/seller">Kênh người bán</a>
                            ) : (
                                <a href="/register">Trở thành Người bán Shopee</a>
                            )}
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faRightToBracket} />
                            <a href="/" onClick={() => {
                                localStorage.removeItem('user');
                                setUser(null);
                            }}>Đăng xuất</a>                            
                        </li>
                </ul>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;
