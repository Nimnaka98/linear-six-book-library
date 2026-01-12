const API_BASE_URL = 'http://localhost:3001';

// API service for book operations
export const bookAPI = {
  // Get all books
  getBooks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      throw new Error('Failed to fetch books. Please check your connection.');
    }
  },

  // Add new book
  addBook: async (bookData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding book:', error);
      throw new Error('Failed to add book. Please try again.');
    }
  },

  // Update book
  updateBook: async (id, bookData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating book:', error);
      throw new Error('Failed to update book. Please try again.');
    }
  },

  // Delete book
  deleteBook: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw new Error('Failed to delete book. Please try again.');
    }
  },
};