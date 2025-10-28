import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, searchPath, isDarkMode }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(searchPath || '');
  }, [searchPath]);

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search by path (e.g., user.id, user.name.city)"
        className={`flex-1 px-3 py-2 border rounded-lg ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
