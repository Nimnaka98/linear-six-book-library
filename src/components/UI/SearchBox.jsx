import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './SearchBox.css';

const SearchBox = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle(newState);
    if (!newState) {
      setSearchTerm('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Dispatch search event for BookGrid to listen
    window.dispatchEvent(new CustomEvent('searchBooks', {
      detail: { searchTerm: searchTerm.trim() }
    }));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Real-time search as user types
    window.dispatchEvent(new CustomEvent('searchBooks', {
      detail: { searchTerm: value.trim() }
    }));
  };

  return (
    <>
      <div className="search-container">
        <div className="search-icon" onClick={handleToggle} title="Search Books">
          <FaSearch />
        </div>
      </div>
      
      {isOpen && (
        <div className="search-overlay">
          <div className="container">
            <form onSubmit={handleSearch} className="search-form">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search books by title or author..."
                className="search-input"
              />
              <button type="submit" className="search-btn">Go</button>
              <button type="button" className="close-btn" onClick={handleToggle}>
                <FaTimes />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBox;