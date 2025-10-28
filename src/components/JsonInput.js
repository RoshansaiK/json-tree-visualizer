import React, { useState } from "react";

const JsonInput = ({ jsonData, onJsonChange, isDarkMode }) => {
  const [inputValue, setInputValue] = useState(
    JSON.stringify(jsonData, null, 2)
  );
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    try {
      if (value.trim()) {
        const parsed = JSON.parse(value);
        onJsonChange(parsed);
        setError("");
      }
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  const handleGenerateTree = () => {
    try {
      const parsed = JSON.parse(inputValue);
      onJsonChange(parsed);
      setError("");
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Paste or type JSON data
      </label>

      <textarea
        value={inputValue}
        onChange={handleInputChange}
        className={`w-full h-64 p-3 border rounded-lg resize-none font-mono text-sm ${
          isDarkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        placeholder={`Example JSON:
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "address": {
      "city": "Sri",
      "country": "USA"
    },
    "items": [
      {
        "name": "item1"
      },
      {
        "name": "item2"
      }
    ]
  }
}`}
      />

      {error && (
        <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
      )}

      <button
        onClick={handleGenerateTree}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
      >
        Generate Tree
      </button>
    </div>
  );
};

export default JsonInput;
