import React, { useState, useEffect } from 'react';
import Button from './UI/Button';
import ConfirmDialog from './UI/ConfirmDialog';
import './BookForm.css';

const BookForm = ({ book, onSubmit, onCancel, isLoading, onUnsavedChangesCheck }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    // price: '',
    // originalPrice: '',
    thumbnail: '',
    rating: 4.0
  });

  const [errors, setErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [initialFormData, setInitialFormData] = useState({});

  // Categories for dropdown
  const categories = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science', 'Biography'];

  // Populate form if editing
  useEffect(() => {
    const initialData = {
      title: book?.title || '',
      author: book?.author || '',
      category: book?.category || '',
      thumbnail: book?.thumbnail || '',
      rating: book?.rating || 4.0
    };
    
    setFormData(initialData);
    setInitialFormData(initialData);
    setHasUnsavedChanges(false);
  }, [book]);

  // Check for unsaved changes
  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialFormData);
    setHasUnsavedChanges(hasChanges);
  }, [formData, initialFormData]);

  // Expose unsaved changes to parent via callback
  useEffect(() => {
    if (onUnsavedChangesCheck) {
      onUnsavedChangesCheck(() => () => hasUnsavedChanges);
    }
  }, [hasUnsavedChanges, onUnsavedChangesCheck]);

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    // if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.rating || formData.rating <= 0) newErrors.rating = 'Rating is required';
    // if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    // if (formData.originalPrice && formData.originalPrice <= formData.price) {
    //   newErrors.originalPrice = 'Original price must be higher than current price';
    // }
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Book cover URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const bookData = {
        ...formData,
        // price: parseFloat(formData.price),
        // originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        rating: parseFloat(formData.rating)
      };
      
      if (book) {
        bookData.id = book.id;
      }
      
      onSubmit(bookData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setShowDiscardDialog(true);
    } else {
      onCancel();
    }
  };

  const handleDiscardChanges = () => {
    setShowDiscardDialog(false);
    onCancel();
  };

  const handleKeepEditing = () => {
    setShowDiscardDialog(false);
  };

  return (
    <>
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Book Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
            placeholder="Enter book title"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={errors.author ? 'error' : ''}
            placeholder="Enter author name"
          />
          {errors.author && <span className="error-message">{errors.author}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating *</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className={errors.rating ? 'error' : ''}
              min="1"
              max="5"
              step="0.1"
            />
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>
        </div>

        {/* <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? 'error' : ''}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="originalPrice">Original Price ($)</label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              className={errors.originalPrice ? 'error' : ''}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.originalPrice && <span className="error-message">{errors.originalPrice}</span>}
          </div>
        </div> */}

        <div className="form-group">
          <label htmlFor="thumbnail">Book Cover URL *</label>
          <input
            type="url"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className={errors.thumbnail ? 'error' : ''}
            placeholder="https://example.com/book-cover.jpg"
          />
          {errors.thumbnail && <span className="error-message">{errors.thumbnail}</span>}
        </div>

        <div className="form-actions">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : (book ? 'Update Book' : 'Add Book')}
          </Button>
        </div>
      </form>

      {/* Discard Changes Confirmation */}
      <ConfirmDialog
        isOpen={showDiscardDialog}
        onClose={handleKeepEditing}
        onConfirm={handleDiscardChanges}
        title="Discard Changes?"
        message="You have unsaved changes. Are you sure you want to discard them?"
        confirmText="Discard Changes"
        cancelText="Keep Editing"
        type="warning"
      />
    </>
  );
};

export default BookForm;