import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products';
import '../styles/Shop.css';

function Shop() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // --- Filter State ---
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedLicense, setSelectedLicense] = useState('All');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  // --- Extract unique values for filter options ---
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const platforms = ['Unity', 'Unreal', 'Godot', 'General'];
  const licenses = ['All', 'Royalty-free', 'Editorial', 'Extended'];

  // --- Filtering Logic ---
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category
      if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;

      // Platforms (OR logic: product must include at least one selected)
      if (selectedPlatforms.length > 0) {
        const hasPlatform = selectedPlatforms.some(plat => product.platforms.includes(plat));
        if (!hasPlatform) return false;
      }

      // License
      if (selectedLicense !== 'All' && product.license !== selectedLicense) return false;

      // Price Range
      const min = priceMin === '' ? -Infinity : parseFloat(priceMin);
      const max = priceMax === '' ? Infinity : parseFloat(priceMax);
      if (product.price < min || product.price > max) return false;

      return true;
    });
  }, [selectedCategory, selectedPlatforms, selectedLicense, priceMin, priceMax]);

  // --- Handlers ---
  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedPlatforms([]);
    setSelectedLicense('All');
    setPriceMin('');
    setPriceMax('');
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent navigating to detail page
    addToCart(product);
    // Optional: a small success feedback – you can expand later
  };

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="shop-container">
      {/* --- FILTER BAR --- */}
      <div className="filter-bar">
        <div className="filter-left">
          <span className="result-count">
            Showing {filteredProducts.length} of {products.length} items
          </span>
        </div>

        <div className="filter-options">
          {/* Category Pills */}
          <div className="filter-group category-group">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Platform Toggles */}
          <div className="filter-group platform-group">
            <span className="filter-label">Platform:</span>
            {platforms.map(plat => (
              <button
                key={plat}
                className={`filter-toggle ${selectedPlatforms.includes(plat) ? 'active' : ''}`}
                onClick={() => handlePlatformToggle(plat)}
              >
                {plat}
              </button>
            ))}
          </div>

          {/* License Dropdown (or buttons) */}
          <div className="filter-group license-group">
            <span className="filter-label">License:</span>
            {licenses.map(lic => (
              <button
                key={lic}
                className={`filter-pill ${selectedLicense === lic ? 'active' : ''}`}
                onClick={() => setSelectedLicense(lic)}
              >
                {lic}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="filter-group price-group">
            <span className="filter-label">Price:</span>
            <input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="price-input"
            />
            <span>–</span>
            <input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="price-input"
            />
          </div>

          {/* Clear Filters */}
          <button className="clear-filters" onClick={clearFilters}>
            Clear All
          </button>
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>No products match your filters. Try adjusting your criteria.</p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleCardClick(product.id)}
            >
              {/* Thumbnail with Emoji */}
              <div className="product-thumbnail">
                <span className="product-emoji">{product.emoji}</span>
                <span className="product-category-badge">{product.category}</span>
              </div>

              {/* Card Body */}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Shop;