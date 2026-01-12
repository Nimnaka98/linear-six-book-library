import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Rating from './UI/Rating';
import './BookListItem.css';

const BookListItem = ({ book, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(book);
  };

  const handleDelete = () => {
    onDelete(book);
  };

  return (
    <div className="book-list-item">
      <div className="book-list-image">
        <img src={book.thumbnail} alt={book.title} className="book-list-thumbnail" />
      </div>
      
      <div className="book-list-content">
        <div className="book-list-info">
          <div className="book-list-header">
            <h3 className="book-list-title">{book.title}</h3>
            <span className="book-list-category-inline">{book.category}</span>
          </div>
          <p className="book-list-author">from {book.author}</p>
          <div className="book-list-rating">
            <Rating rating={book.rating} size="small" />
          </div>
        </div>
        
        <div className="book-list-actions">
          <button className="list-action-btn edit-btn" onClick={handleEdit}>
            <FaEdit />
          </button>
          <button className="list-action-btn delete-btn" onClick={handleDelete}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookListItem;