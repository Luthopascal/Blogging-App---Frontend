import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../lib/Authcontext';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewPost.css';

const ViewBlogPost = () => {
  const { id } = useParams(); // Get post ID from URL
  const { token, user } = useAuth();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Fetch the blog post when component mounts
  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    setLoading(true);
    setError('');

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
        setPost(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(err.response?.data?.message || 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  // Check if current user is the author
  const authorId = typeof post?.author === 'object' ? post?.author?._id : post?.author;
  const userId = user?._id || user?.id;
  const isAuthor = userId && authorId && (userId === authorId || userId.toString() === authorId.toString());

  // Handle edit navigation
  const handleEdit = () => {
    navigate(`/Edit-Post/${id}`);
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    setDeleting(true);

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/auth/DeletePost/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        alert('Post deleted successfully!');
        navigate('/home-page'); // Redirect to homepage
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post: ' + (err.response?.data?.message || 'Unknown error'));
    } finally {
      setDeleting(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate('/home-page');
  };

  if (loading) {
    return (
      <div className="view-post-container">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-post-container">
        <div className="error-message">{error}</div>
        <button onClick={handleBack} className="btn-back">
          Back to Blog Posts
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="view-post-container">
        <div className="error-message">Blog post not found</div>
        <button onClick={handleBack} className="btn-back">
          Back to Blog Posts
        </button>
      </div>
    );
  }

  return (
    <div className="view-post-container">
      <button onClick={handleBack} className="btn-back">
        ← Back to All Posts
      </button>

      <article className="blog-post-full">
        {/* Cover Image */}
        {post.imageUrl && (
          <div className="blog-post-cover">
            <img 
              src={`http://localhost:3000${post.imageUrl}`} 
              alt={post.title}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Post Header */}
        <header className="blog-post-header">
          <h1 className="blog-post-title-full">{post.title}</h1>
          {post.subtitle && (
            <h2 className="blog-post-subtitle-full">{post.subtitle}</h2>
          )}
          
          <div className="blog-post-meta-full">
            <span className="blog-post-author-full">
              By: {post.author?.username || post.author?.email || 'Unknown'}
            </span>
            <span className="blog-post-date-full">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </header>

        {/* Post Content */}
        <div className="blog-post-body">
          <p className="blog-post-content-full">{post.content}</p>
        </div>

        {/* Action Buttons (Only for Author) */}
        {isAuthor && (
          <div className="blog-post-actions-full">
            <button 
              onClick={handleEdit} 
              className="btn-action-full btn-edit-action"
              disabled={deleting}
            >
              ✏️ Edit Post
            </button>
            <button 
              onClick={handleDelete} 
              className="btn-action-full btn-delete-action"
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : '🗑️ Delete Post'}
            </button>
          </div>
        )}

        {/* Post Footer */}
        <footer className="blog-post-footer">
          <p className="last-updated">
            Last updated: {new Date(post.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </footer>
      </article>
    </div>
  );
};

export default ViewBlogPost;