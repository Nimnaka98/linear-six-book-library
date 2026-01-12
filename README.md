# Interactive Book Library Application

A responsive React-based book library application with full CRUD functionality, search capabilities, and modern UI design.

## 🚀 Features

### Core Functionality
- ✅ Display books with covers, titles, authors, and ratings
- ✅ Search/filter books by title or author (real-time)
- ✅ Add new books to the library
- ✅ Edit existing book details
- ✅ Delete books with confirmation dialog
- ✅ Toggle between grid and list view
- ✅ About page with project information

### Technical Features
- ✅ JSON Server as mock backend API
- ✅ React Router for navigation
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Component-based architecture
- ✅ Context API for state management
- ✅ Form validation for add/edit operations
- ✅ Error handling with user feedback
- ✅ Loading states for all operations

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nimnaka98/linear-six-book-library.git
   cd LinearSix-Book
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install JSON Server globally**
   ```bash
   npm install -g json-server
   ```

4. **Start JSON Server (in one terminal)**
   ```bash
   json-server --watch db.json --port 3001
   ```
   This will start the mock API server at `http://localhost:3001`

5. **Start the React application (in another terminal)**
   ```bash
   npm start
   ```
   This will start the React app at `http://localhost:3000`

### API Endpoints

The JSON Server provides these endpoints:
- `GET /books` - Fetch all books
- `POST /books` - Add a new book
- `PUT /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── UI/                    # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Modal.jsx
│   │   ├── Rating.jsx
│   │   ├── SearchBox.jsx
│   │   ├── ConfirmDialog.jsx
│   │   └── ErrorToast.jsx
│   ├── BookCard.jsx           # Grid view book component
│   ├── BookListItem.jsx       # List view book component
│   ├── BookForm.jsx           # Add/Edit form
│   ├── BookGrid.jsx           # Main book display container
│   ├── Header.jsx             # Navigation and search
│   └── HeroCarousel.jsx       # Hero section
├── contexts/
│   └── BookContext.jsx        # Global state management
├── services/
│   └── bookAPI.js            # API service layer
├── data/
│   └── mockData.js           # Fallback data
└── constants/
    └── index.js              # App constants
```

### State Management
- **Context API** with `useReducer` for global state
- **Actions**: ADD_BOOK, UPDATE_BOOK, DELETE_BOOK, SEARCH_BOOKS
- **Error handling** with user-friendly messages
- **Loading states** for all async operations

## 🎨 UI/UX Features

### Layout Components
1. **Header**
   - Application title and logo
   - Navigation with Home and About pages
   - Grid/List view toggle buttons (Home page only)
   - Real-time search functionality (Home page only)

2. **Home Page**
   - Hero carousel with featured content
   - Responsive book display (grid/list)
   - Book information: cover, title, author, rating, category
   - Hover effects with edit/delete actions

3. **About Page**
   - Project overview and features
   - Technology stack information
   - Architecture highlights
   - Development information

4. **Book Management**
   - "Add New Book" button with modal form
   - Form validation for all required fields
   - Confirmation dialog for delete operations

### Responsive Design
- **Mobile-first** approach
- **Breakpoints**: 768px (tablet), 1024px (desktop)
- **Touch-friendly** buttons and interactions
- **Optimized layouts** for all screen sizes

## 🔧 Development

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

### Form Validation
- Required fields: title, author, category, price, thumbnail
- Price validation (positive numbers)
- URL validation for book covers
- Real-time error feedback

### Error Handling
- API connection failures (fallback to mock data)
- Network errors with user notifications
- Form validation errors
- Loading states during operations

## 🚦 Usage

1. **Navigate**: Use Home and About links in the header
2. **View Books**: Books display in grid or list view (Home page)
3. **Search**: Type in the search box for real-time filtering (Home page)
4. **Add Book**: Click "+ Add Book" button, fill the form
5. **Edit Book**: Hover over a book card, click edit icon
6. **Delete Book**: Hover over a book card, click delete icon, confirm
7. **Toggle View**: Use grid/list buttons in header (Home page)
8. **Learn More**: Visit About page for project details

## 🎯 Technical Highlights

- **Clean Architecture**: Separation of concerns with services, contexts, and components
- **Error Boundaries**: Graceful error handling throughout the app
- **Performance**: Optimized re-renders with proper state management
- **Accessibility**: Semantic HTML and keyboard navigation
- **Modern React**: Hooks, Context API, and functional components

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Note**: Make sure both the JSON Server (port 3001) and React app (port 3000) are running for full functionality. The app will fallback to mock data if the API server is unavailable.
