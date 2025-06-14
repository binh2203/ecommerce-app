import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Mini Shopee. All rights reserved.</p>
        <p>Liên hệ: diemcongbinh@gmail.com | Zalo: 0853 387 787 | Facebook: <a href="https://www.facebook.com/dcb2203" target="_blank" rel="noopener noreferrer">fb.com/dcb2203</a></p>
        <p>Phát triển bởi: Diêm Công Bình</p>
      </div>
    </footer>
  );
}

export default Footer;
