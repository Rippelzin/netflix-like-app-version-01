import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    const handleMenuToggle = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  
    return (
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">App</Link>
        </div>
        <div className={styles.hamburger} onClick={handleMenuToggle}>
          ☰
        </div>
        <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.open : ''}`}>
          <li>
            <Link to="/" onClick={handleMenuToggle}>Home</Link>
          </li>
          <li>
            <Link to="/my-list" onClick={handleMenuToggle}>My List</Link>
          </li>
          <li>
            <Link to="/login" onClick={handleMenuToggle}>Minha conta</Link>
          </li>
          
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
