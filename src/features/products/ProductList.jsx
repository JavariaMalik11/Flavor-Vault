import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, toggleFavorite } from './productSlice';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import ThemeToggle from '../../components/ThemeToggle';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timeout);
  }, []);

  const filteredProducts = [...products]
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return (b.favorite === true) - (a.favorite === true);
      }
    });

  return (
    <>
      <header className="site-header">
        <h1>Flavor Vault</h1>
        <div className="header-right">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input header-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link to="/auth">
            <span className="user-icon" title="Login or Signup">👻</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h2>Welcome to Flavor Vault</h2>
          <p>Smart. Simple. Stylish. Manage your products with ease.</p>
          <Link to="/add">
            <button className="hero-cta">+ Add New Product</button>
          </Link>
        </div>
      </section>

      <div className="product-list-container">

        {/* 👇 Header section with title and sort dropdown */}
        <div className="product-header">
          <h2 className="product-list-title">Product List</h2>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-dropdown aligned-dropdown"
          >
            <option value="default">Sort: Favorites First</option>
            <option value="name-asc">Sort: Name (A–Z)</option>
            <option value="name-desc">Sort: Name (Z–A)</option>
            <option value="price-asc">Sort: Price (Low to High)</option>
            <option value="price-desc">Sort: Price (High to Low)</option>
          </select>
        </div>

        {isLoading ? (
          <Loader />
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2718/2718224.png"
              alt="Empty - Food"
            />
            <p>No products added yet. Click "Add New Product" to get started!</p>
          </div>
        ) : (
          <ul className="product-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="fade-wrapper">
                <li className={`product-card ${product.favorite ? 'favorite' : ''}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/150x150?text=No+Image';
                    }}
                  />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price}</p>
                  <div className="product-actions">
                    <button onClick={() => dispatch(toggleFavorite(product.id))}>
                      {product.favorite ? '❤️' : '🤍'}
                    </button>
                    <Link to={`/edit/${product.id}`}>
                      <button className="edit-button">Edit</button>
                    </Link>
                    <button
                      onClick={() => dispatch(deleteProduct(product.id))}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ProductList;
