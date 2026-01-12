import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import BookListItem from './BookListItem';
import BookForm from './BookForm';
import Button from './UI/Button';
import Modal from './UI/Modal';
import ConfirmDialog from './UI/ConfirmDialog';
import ErrorToast from './UI/ErrorToast';
import SuccessToast from './UI/SuccessToast';
import { useBooks } from '../contexts/BookContext';
import './BookGrid.css';

const BookGrid = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, book: null });
  
  const { books, loading, error, success, addBook, updateBook, deleteBook, searchBooks, clearError, clearSuccess } = useBooks();

  // Listen for view mode changes from Header component
  useEffect(() => {
    const handleViewChange = (event) => {
      setViewMode(event.detail.viewMode);
    };

    const handleSearch = (event) => {
      searchBooks(event.detail.searchTerm);
    };

    window.addEventListener('viewModeChange', handleViewChange);
    window.addEventListener('searchBooks', handleSearch);
    
    return () => {
      window.removeEventListener('viewModeChange', handleViewChange);
      window.removeEventListener('searchBooks', handleSearch);
    };
  }, [searchBooks]);

  const handleClearError = () => {
    clearError();
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (bookData) => {
    if (editingBook) {
      updateBook(bookData);
    } else {
      addBook(bookData);
    }
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const handleDeleteBook = (book) => {
    setDeleteConfirm({ isOpen: true, book });
  };

  const confirmDelete = () => {
    if (deleteConfirm.book) {
      deleteBook(deleteConfirm.book.id, deleteConfirm.book.title);
    }
    setDeleteConfirm({ isOpen: false, book: null });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBook(null);
  };

  return (
    <section className="book-grid-section">
      <div className="container">
        <div className="section-header">
          <div className="section-header-content">
            <h2 className="section-title">Featured Books</h2>
            <p className="section-subtitle">Discover our handpicked collection of bestsellers and literary gems</p>
          </div>
          <Button 
            variant="primary" 
            size="medium" 
            className="add-book-btn"
            onClick={handleAddBook}
          >
            + Add Book
          </Button>
        </div>
        
        <div key={viewMode} className={`book-display ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
          {books.map(book => (
            viewMode === 'grid' ? (
              <BookCard key={book.id} book={book} onEdit={handleEditBook} onDelete={handleDeleteBook} />
            ) : (
              <BookListItem key={book.id} book={book} onEdit={handleEditBook} onDelete={handleDeleteBook} />
            )
          ))}
        </div>
        
        <div className="grid-footer">
          <Button variant="secondary" size="large">
            View All Books
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingBook ? 'Edit Book' : 'Add New Book'}
        size="medium"
      >
        <BookForm
          book={editingBook}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
          isLoading={loading}
        />
      </Modal>
      <SuccessToast 
        message={success} 
        onClose={clearSuccess}
      />

      <ErrorToast 
        error={error} 
        onClose={handleClearError}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, book: null })}
        onConfirm={confirmDelete}
        title="Delete Book"
        message={`Are you sure you want to delete "${deleteConfirm.book?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </section>
  );
};

export default BookGrid;