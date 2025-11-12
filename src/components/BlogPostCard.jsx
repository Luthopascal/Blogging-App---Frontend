
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../lib/Authcontext';
import { useNavigate } from 'react-router-dom';
import './BlogPostCard.css';

const BlogPostCard = ({ post, onDelete }) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if current user is the author of this post
  const isAuthor = user && post.author && (user._id === post.author._id || user._id === post.author);
  
  // Debug: Log to see what we're comparing
  console.log('Debug Info:', {
    userId: user?._id,
    postAuthorId: post.author?._id || post.author,
    postAuthor: post.author,
    isAuthor: isAuthor
  });

  // TEMPORARY: Show buttons for all posts (remove this after debugging!)
  const showButtons = true; // Change back to: isAuthor

  // Handle delete with confirmation
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/auth/DeletePost/${post._id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        alert('Post deleted successfully!');
        if (onDelete) onDelete(post._id);
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      setError(err.response?.data?.message || 'Failed to delete post');
      alert('Failed to delete post: ' + (err.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Handle edit - navigate to edit page
  const handleEdit = () => {
    navigate(`/Edit-Post/${post._id}`);
  };

  // Truncate content to show preview
  const getPreview = (content, maxLength = 150) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="blog-card">
      {/* Display cover image if exists */}
      {post.imageUrl && (
        <div className="blog-post-image">
          <img 
            src={`http://localhost:3000${post.imageUrl}`} 
            alt={post.title}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="blog-post-content">
        <h2 className="blog-post-title">{post.title}</h2>
        {post.subtitle && (
          <h3 className="blog-post-subtitle">{post.subtitle}</h3>
        )}
        <p className="blog-post-preview">{getPreview(post.content)}</p>
        
        <div className="blog-post-meta">
          <span className="blog-post-author">
            By: {post.author?.username || post.author?.email || 'Unknown'}
          </span>
          <span className="blog-post-date">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Show Edit/Delete buttons at bottom ONLY if user is the author */}
        {showButtons && (
          <div className="blog-post-buttons">
            <button 
              onClick={handleEdit} 
              className="btn-action btn-edit-full"
              disabled={loading}
            >
              ✏️ Edit
            </button>
            <button 
              onClick={handleDelete} 
              className="btn-action btn-delete-full"
              disabled={loading}
            >
              🗑️ Delete
            </button>
          </div>
        )}
        
        {error && <div className="error-message-small">{error}</div>}
      </div>
    </div>
  );
};

export default BlogPostCard;