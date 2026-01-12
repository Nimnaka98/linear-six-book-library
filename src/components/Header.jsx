import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTh, FaList } from 'react-icons/fa';
import SearchBox from './UI/SearchBox';
import MegaDropdown from './UI/MegaDropdown';
import logoImage from '../assets/book-library.png';
import './Header.css';

const Header = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleViewChange = (isGrid) => {
    setIsGridView(isGrid);
    // Dispatch custom event for BookGrid to listen
    window.dispatchEvent(new CustomEvent('viewModeChange', {
      detail: { viewMode: isGrid ? 'grid' : 'list' }
    }));
  };

  const categoryItems = [
    { 
      label: 'Fiction', 
      description: 'Explore imaginative stories and novels from various genres',
      image: '/images/categories/fiction.jpg'
    },
    { 
      label: 'Non-Fiction', 
      description: 'Discover factual books, biographies, and educational content',
      image: '/images/categories/non-fiction.jpg'
    },
    { 
      label: 'Science', 
      description: 'Dive into scientific discoveries and research publications',
      image: '/images/categories/science.jpg'
    },
    { 
      label: 'Biography', 
      description: 'Read inspiring life stories of remarkable people',
      image: '/images/categories/biography.jpg'
    },
    { 
      label: 'Mystery', 
      description: 'Unravel thrilling mysteries and detective stories',
      image: '/images/categories/mystery.jpg'
    },
    { 
      label: 'Romance', 
      description: 'Experience heartwarming love stories and relationships',
      image: '/images/categories/romance.jpg'
    }
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Left Side - Logo & Nav */}
          <div className="header-left">
            <Link to="/" className="logo">
              <img src={logoImage} alt="Book Library" className="logo-image" />
              <span className="logo-text">Book Library</span>
            </Link>
            
            <nav className="nav desktop-nav">
              <Link to="/" className={`nav-item ${isHomePage ? 'active' : ''}`}>Home</Link>
              <MegaDropdown 
                title="Categories" 
                items={categoryItems}
                className="nav-dropdown"
              />
              <Link to="/about" className={`nav-item ${!isHomePage ? 'active' : ''}`}>About</Link>
            </nav>
          </div>

          {/* Right Side - Search & Toggle */}
          <div className="header-right">
            {isHomePage && <SearchBox onToggle={setIsSearchOpen} />}
            
            {isHomePage && (
              <div className="view-toggle">
                <button 
                  className={`toggle-btn ${isGridView ? 'active' : ''}`}
                  onClick={() => handleViewChange(true)}
                  title="Grid View"
                >
                  <FaTh />
                </button>
                <button 
                  className={`toggle-btn ${!isGridView ? 'active' : ''}`}
                  onClick={() => handleViewChange(false)}
                  title="List View"
                >
                  <FaList />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;