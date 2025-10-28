import React from 'react';

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {isDarkMode ? 'Dark' : 'Light'} Mode
      </span>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            isDarkMode ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
