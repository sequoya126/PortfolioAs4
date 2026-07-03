// src/components/shared/Navbar.jsx
function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">Fraye</div>
      <nav className="navbar-links">
        <a href="#shop">Shop</a>
        <a href="#categories">Categories</a>
        <a href="#about">About</a>
      </nav>
      <div className="navbar-actions">
        <button aria-label="Search">Search</button>
        <button aria-label="Cart">Cart</button>
      </div>
    </header>
  );
}

export default Navbar;