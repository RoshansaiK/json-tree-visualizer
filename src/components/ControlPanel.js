import React from 'react';

const ControlPanel = ({ onClear, onDownloadImage, isDarkMode }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onClear}
        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
          isDarkMode
            ? 'bg-gray-700 hover:bg-gray-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
      >
        Clear/Reset
      </button>
      <button
        onClick={onDownloadImage}
        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
          isDarkMode
            ? 'bg-gray-700 hover:bg-gray-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
      >
        Download Image
      </button>
    </div>
  );
};

export default ControlPanel;
