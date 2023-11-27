import React from 'react';
import '../../style/header.css'; 

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="menu">
          <li><a href="/" className="menu-item">Home</a></li>
          <li><a href="/about" className="menu-item">About</a></li>
          <li><a href="/services" className="menu-item">Services</a></li>
          <li><a href="/contact" className="menu-item">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
