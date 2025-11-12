import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../lib/Authcontext';
import { useParams, useNavigate } from 'react-router-dom';
import './editPost.css';

const EditPost = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch the blog post when component mounts
  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/auth/BlogPost/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        const post = response.data.data;
        setFormData({
          title: post.title,
          subtitle: post.subtitle || '',
          content: post.content
        });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to load blog post' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    // Validation
    if (!formData.title.trim() || !formData.content.trim()) {
      setMessage({ type: 'error', text: 'Title and content are required' });
      setSaving(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/auth/UpdatePost/${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Blog post updated successfully!' });
        
        // Redirect to homepage after 1.5 seconds
        setTimeout(() => {
          navigate('/home-page');
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update blog post' 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/home-page');
  };

  if (loading) {
    return (
      <div className="edit-post-container">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="edit-post-container">
      <h1>Edit Blog Post</h1>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="edit-post-form">
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

        <div className="form-buttons">
          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={handleCancel} className="btn-cancel" disabled={saving}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;