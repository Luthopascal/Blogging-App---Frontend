import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../lib/Authcontext'; 
import './NewPost.css';

const NewPost = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: ''
  });
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setMessage({ type: 'error', text: 'Please select a valid image file (JPEG, PNG, GIF, WEBP)' });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
        return;
      }

      setCoverImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMessage({ type: '', text: '' });
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setCoverImage(null);
    setImagePreview(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validation
    if (!formData.title.trim() || !formData.content.trim()) {
      setMessage({ type: 'error', text: 'Title and content are required' });
      setLoading(false);
      return;
    }

    try {
      // Create FormData object for multipart/form-data
      const postData = new FormData();
      postData.append('title', formData.title);
      postData.append('subtitle', formData.subtitle);
      postData.append('content', formData.content);
      
      // Append image if selected
      if (coverImage) {
        postData.append('coverImage', coverImage);
      }

      // Send POST request with JWT token
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/NewBlogPost',
        postData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Blog post created successfully!' });
        
        // Reset form
        setFormData({ title: '', subtitle: '', content: '' });
        setCoverImage(null);
        setImagePreview(null);
        
        // Reset file input
        document.getElementById('coverImage').value = '';
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to create blog post. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-post-container">
      <h1>Create New Blog Post</h1>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="new-post-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subtitle">Subtitle</label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Enter subtitle (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Cover Image</label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleImageChange}
          />
          <small>Max size: 5MB. Formats: JPEG, PNG, GIF, WEBP</small>
        </div>

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Cover preview" />
            <button type="button" onClick={handleRemoveImage} className="remove-image-btn">
              Remove Image
            </button>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            rows="12"
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Creating...' : 'Create Blog Post'}
        </button>
      </form>
    </div>
  );
};

export default NewPost;