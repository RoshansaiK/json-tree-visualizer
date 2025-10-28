# JSON Tree Visualizer

An interactive JSON tree visualizer built with React and React Flow that allows you to visualize JSON data structures in a beautiful, interactive tree format.

## Features

- 🌳 **Interactive Tree Visualization** - Visualize JSON data as an interactive tree structure
- 🔍 **Search Functionality** - Search for specific paths in your JSON data
- 🌙 **Dark/Light Mode** - Toggle between dark and light themes
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Beautiful UI** - Modern, clean interface with smooth animations
- 📋 **Copy Paths** - Click on nodes to copy their JSON paths
- 💾 **Export Data** - Download your JSON data as a text file

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RoshansaiK/json-tree-visualizer.git
cd json-tree-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Input JSON Data**: Paste or type your JSON data in the input field
2. **Generate Tree**: Click "Generate Tree" to visualize your data
3. **Search**: Use the search bar to find specific paths in your JSON
4. **Interact**: Click on nodes to copy their paths
5. **Toggle Theme**: Switch between dark and light modes
6. **Export**: Download your JSON data as a text file

## Example JSON

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "address": {
      "city": "New York",
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
}
```

## Technologies Used

- **React** - Frontend framework
- **React Flow** - Tree visualization library
- **Tailwind CSS** - Styling framework
- **React Hooks** - State management

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

**Roshan Sai Ketham**
- GitHub: [@RoshansaiK](https://github.com/RoshansaiK)
