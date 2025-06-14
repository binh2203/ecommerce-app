import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell as Bell } from '@fortawesome/free-solid-svg-icons'; 
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons'; 
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
        <div className='navbar-top'>
            <div className='navbar-top-left'>
                <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                    <li><a href="/">Trang chủ</a></li>
                    <li className="separator">|</li>
                    <li><a href="/Register">Trở thành Người bán Shopee</a></li>
                    <li className="separator">|</li>
                    <li><a href="https://www.facebook.com/dcb2203">Liên hệ &nbsp; <FontAwesomeIcon icon={faSquareFacebook} /></a></li>
                </ul>
            </div>
            <div className='navbar-top-right'>
                <ul className="navbar-links">
                    <li>
                        <div class="notice-container">
                            <a href="/notice">Thông Báo &nbsp; <FontAwesomeIcon icon={Bell} /></a>
                            <div class="notice-popup">
                                <div class="arrow-up"></div>
                                <p>Đăng nhập để xem thông báo của bạn</p>
                            </div>
                        </div>  
                    </li>
                    <li>
                        <a href="/support">Hỗ Trợ &nbsp; <FontAwesomeIcon icon={faCircleInfo} /></a>
                    </li>
                    <li><a href="/register">Đăng ký</a></li>
                    <li className="separator">|</li>
                    <li><a href="/login">Đăng nhập</a></li>
                </ul>
            </div>
        </div>
        <div className="navbar-bottom">
            <Link to="/" className="navbar-logo">
                <img className="image-logo" src={`/assets/logo.png`} alt="logo" />
                <p>Mini Shopee</p>
            </Link>
            <div className="navbar-search">
                <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>
            <div class="cart-container">
                <a  href="/cart" className="navbar-cart">
                    <img className='shop-cart-img' src={`/assets/shop-cart.png`} alt="Giỏ hàng" /> 
                </a>
                <div class="cart-popup">
                    <div class="arrow-up"></div>
                    <p>Chưa Có Sản Phẩm</p>
                </div>
            </div>

        </div>
    </nav>
  );
}

export default Navbar;
