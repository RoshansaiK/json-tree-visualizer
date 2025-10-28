import React, { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import JsonTreeVisualizer from "./components/JsonTreeVisualizer";
import JsonInput from "./components/JsonInput";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import ControlPanel from "./components/ControlPanel";

const initialJsonData = {
  user: {
    id: 1,
    name: "John Doe",
    address: {
      city: "New York",
      country: "USA",
    },
    items: [
      {
        name: "item1",
      },
      {
        name: "item2",
      },
    ],
  },
};

function App() {
  const [jsonData, setJsonData] = useState(initialJsonData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchPath, setSearchPath] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleJsonChange = (newJsonData) => {
    setJsonData(newJsonData);
    setSearchResult(null);
    setSearchPath("");
  };

  const handleSearch = (path) => {
    setSearchPath(path);
  };

  const handleClear = () => {
    setJsonData({});
    setSearchResult(null);
    setSearchPath("");
  };

  const handleCopyPath = (path) => {
    navigator.clipboard.writeText(path);
  };

  const handleDownloadImage = () => {
    const treeElement = document.querySelector(".json-tree-container");
    if (treeElement) {
      const textContent = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([textContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "json-tree.txt";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            JSON Tree Visualizer
          </h1>
          <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <JsonInput
              jsonData={jsonData}
              onJsonChange={handleJsonChange}
              isDarkMode={isDarkMode}
            />
            <ControlPanel
              onClear={handleClear}
              onDownloadImage={handleDownloadImage}
              isDarkMode={isDarkMode}
            />
          </div>

          <div className="space-y-4">
            <SearchBar
              onSearch={handleSearch}
              searchPath={searchPath}
              isDarkMode={isDarkMode}
            />
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 h-96 json-tree-container">
              <ReactFlowProvider>
                <JsonTreeVisualizer
                  jsonData={jsonData}
                  searchPath={searchPath}
                  onSearchResult={setSearchResult}
                  onCopyPath={handleCopyPath}
                  isDarkMode={isDarkMode}
                />
              </ReactFlowProvider>
            </div>

            {searchResult !== null && (
              <div
                className={`p-3 rounded-lg ${
                  searchResult
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                }`}
              >
                {searchResult ? "Match found!" : "No match found"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
