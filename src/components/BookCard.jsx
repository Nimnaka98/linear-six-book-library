import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Rating from './UI/Rating';
import './BookCard.css';

const BookCard = ({ book, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(book);
  };

  const handleDelete = () => {
    onDelete(book);
  };

  return (
    <div className="book-card">
      <div className="book-image-container">
        <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />
        <div className="book-overlay">
          <button className="action-btn edit-btn" onClick={handleEdit}>
            <FaEdit />
          </button>
          <button className="action-btn delete-btn" onClick={handleDelete}>
            <FaTrash />
          </button>
        </div>
        <span className="book-category">{book.category}</span>
      </div>
      
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        
        <div className="book-rating-center">
          <Rating rating={book.rating} />
        </div>
      </div>
    </div>
  );
};

export default BookCard;