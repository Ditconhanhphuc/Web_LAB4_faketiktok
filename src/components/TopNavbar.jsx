import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './TopNavbar.css';

const TopNavbar = ({ setSearchQuery, searchQuery }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState(searchQuery);

  // Handle search submit
  const handleSearchSubmit = () => {
    setSearchVisible(false);
    setSearchQuery(query.trim()); // Set the query to parent component
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const openSearch = () => {
    setSearchVisible(true);
  };

  const closeSearch = () => {
    setSearchVisible(false);
    setQuery('');
  };

  return (
    <div className="top-navbar">
      {/* Default Navbar */}
      {!searchVisible && (
        <div className="navbar-content">
          <FontAwesomeIcon icon={faTv} className="icon" />
          <h2>Following | <span>For You</span></h2>
          <FontAwesomeIcon icon={faSearch} className="icon" onClick={openSearch} />
        </div>
      )}

      {/* Navbar when search input is visible */}
      {searchVisible && (
        <div className="search-container">
          <FontAwesomeIcon 
            icon={faArrowLeft} 
            className="back-icon" 
            onClick={closeSearch} 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search by hashtag..."
            autoFocus
          />
          <FontAwesomeIcon icon={faSearch} className="icon" onClick={handleSearchSubmit} />
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
