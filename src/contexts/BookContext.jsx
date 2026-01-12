import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { bookAPI } from '../services/bookAPI';
import { mockBooks } from '../data/mockData';

// Book Actions
const BOOK_ACTIONS = {
  SET_BOOKS: 'SET_BOOKS',
  ADD_BOOK: 'ADD_BOOK',
  UPDATE_BOOK: 'UPDATE_BOOK',
  DELETE_BOOK: 'DELETE_BOOK',
  SEARCH_BOOKS: 'SEARCH_BOOKS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_SUCCESS: 'SET_SUCCESS',
  CLEAR_SUCCESS: 'CLEAR_SUCCESS'
};

// Initial State
const initialState = {
  books: [],
  filteredBooks: [],
  searchTerm: '',
  loading: false,
  error: null,
  success: null
};

// Reducer
const bookReducer = (state, action) => {
  switch (action.type) {
    case BOOK_ACTIONS.SET_BOOKS:
      return { ...state, books: action.payload, filteredBooks: action.payload, loading: false };
    
    case BOOK_ACTIONS.ADD_BOOK:
      const newBooks = [...state.books, action.payload];
      return { 
        ...state, 
        books: newBooks,
        filteredBooks: filterBooks(newBooks, state.searchTerm),
        loading: false 
      };
    
    case BOOK_ACTIONS.UPDATE_BOOK:
      const updatedBooks = state.books.map(book => 
        book.id === action.payload.id ? action.payload : book
      );
      return {
        ...state,
        books: updatedBooks,
        filteredBooks: filterBooks(updatedBooks, state.searchTerm),
        loading: false
      };
    
    case BOOK_ACTIONS.DELETE_BOOK:
      const remainingBooks = state.books.filter(book => book.id !== action.payload);
      return {
        ...state,
        books: remainingBooks,
        filteredBooks: filterBooks(remainingBooks, state.searchTerm),
        loading: false
      };
    
    case BOOK_ACTIONS.SEARCH_BOOKS:
      return {
        ...state,
        searchTerm: action.payload,
        filteredBooks: filterBooks(state.books, action.payload)
      };
    
    case BOOK_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case BOOK_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case BOOK_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    case BOOK_ACTIONS.SET_SUCCESS:
      return { ...state, success: action.payload };
    
    case BOOK_ACTIONS.CLEAR_SUCCESS:
      return { ...state, success: null };
    
    default:
      return state;
  }
};

// Helper function to filter books
const filterBooks = (books, searchTerm) => {
  if (!searchTerm) return books;
  
  return books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Context
const BookContext = createContext();

// Provider Component
export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const [useAPI, setUseAPI] = useState(true);

  // Load books on mount
  useEffect(() => {
    const loadBooks = async () => {
      dispatch({ type: BOOK_ACTIONS.SET_LOADING, payload: true });
      try {
        const books = await bookAPI.getBooks();
        dispatch({ type: BOOK_ACTIONS.SET_BOOKS, payload: books });
        setUseAPI(true);
      } catch (error) {
        // Fallback to mock data if API fails
        console.warn('API failed, using mock data:', error.message);
        dispatch({ type: BOOK_ACTIONS.SET_BOOKS, payload: mockBooks });
        setUseAPI(false);
      }
    };

    loadBooks();
  }, []);

  // Actions
  const addBook = async (bookData) => {
    dispatch({ type: BOOK_ACTIONS.SET_LOADING, payload: true });
    if (useAPI) {
      try {
        const newBook = await bookAPI.addBook(bookData);
        dispatch({ type: BOOK_ACTIONS.ADD_BOOK, payload: newBook });
        dispatch({ type: BOOK_ACTIONS.SET_SUCCESS, payload: `"${bookData.title}" has been added successfully!` });
      } catch (error) {
        dispatch({ type: BOOK_ACTIONS.SET_ERROR, payload: error.message });
      }
    } else {
      // Local operation when API not available
      const newBook = { ...bookData, id: Date.now() };
      dispatch({ type: BOOK_ACTIONS.ADD_BOOK, payload: newBook });
      dispatch({ type: BOOK_ACTIONS.SET_SUCCESS, payload: `"${bookData.title}" has been added successfully!` });
    }
  };

  const updateBook = async (bookData) => {
    dispatch({ type: BOOK_ACTIONS.SET_LOADING, payload: true });
    if (useAPI) {
      try {
        const updatedBook = await bookAPI.updateBook(bookData.id, bookData);
        dispatch({ type: BOOK_ACTIONS.UPDATE_BOOK, payload: updatedBook });
        dispatch({ type: BOOK_ACTIONS.SET_SUCCESS, payload: `"${bookData.title}" has been updated successfully!` });
      } catch (error) {
        dispatch({ type: BOOK_ACTIONS.SET_ERROR, payload: error.message });
      }
    } else {
      // Local operation when API not available
      dispatch({ type: BOOK_ACTIONS.UPDATE_BOOK, payload: bookData });
      dispatch({ type: BOOK_ACTIONS.SET_SUCCESS, payload: `"${bookData.title}" has been updated successfully!` });
    }
  };

  const deleteBook = async (bookId, bookTitle) => {
    dispatch({ type: BOOK_ACTIONS.SET_LOADING, payload: true });
    if (useAPI) {
      try {
        await bookAPI.deleteBook(bookId);
        dispatch({ type: BOOK_ACTIONS.DELETE_BOOK, payload: bookId });
        dispatch({ type: BOOK_ACTIONS.SET_SUCCESS, payload: `"${bookTitle}" has been deleted successfully!` });
      } catch (error) {
        dispatch({ type: BOOK_ACTIONS.SET_ERROR, payload: error.message });
      }
    } else {
      // Local operation when API not available
      dispatch({ type: BOOK_ACTIONS.DELETE_BOOK, payload: bookId });
      dispatch({ type: BOOK_ACTIONS.SET_SUCCESS, payload: `"${bookTitle}" has been deleted successfully!` });
    }
  };

  const searchBooks = (searchTerm) => {
    dispatch({ type: BOOK_ACTIONS.SEARCH_BOOKS, payload: searchTerm });
  };

  const clearError = () => {
    dispatch({ type: BOOK_ACTIONS.CLEAR_ERROR });
  };

  const clearSuccess = () => {
    dispatch({ type: BOOK_ACTIONS.CLEAR_SUCCESS });
  };

  const value = {
    books: state.filteredBooks, // Use filtered books for display
    allBooks: state.books, // Keep reference to all books
    searchTerm: state.searchTerm,
    loading: state.loading,
    error: state.error,
    success: state.success,
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
    clearError,
    clearSuccess
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};

// Custom Hook
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export { BOOK_ACTIONS };