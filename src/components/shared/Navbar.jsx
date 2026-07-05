import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        <img src="/images/image-logo.png" alt="Fraye Logo" />
        <span>Fraye</span>
      </Link>

      <button
        className={`nav-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Shop</Link></li>
        <li><Link to="/survey" onClick={closeMenu}>Survey</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li>
          <Link to="/signup" className="nav-btn" onClick={closeMenu}>
            Get Started
          </Link>
        </li>
      </ul>

      <div className="navbar-actions">
        <button aria-label="Search">Search</button>
        <Link to="/checkout">
          <button aria-label="Cart">Cart</button>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;