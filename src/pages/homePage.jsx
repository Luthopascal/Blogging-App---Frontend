import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../lib/Authcontext';
import BlogPostCard from '../components/BlogPostCard';
import './homePage.css'; // Using your existing CSS file name

const HomePage = () => {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/auth/AllBlogs',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setBlogs(response.data.blogs);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.response?.data?.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete - remove from UI
  const handleDelete = (postId) => {
    setBlogs(blogs.filter(blog => blog._id !== postId));
  };

  // Handle update - update in UI
  const handleUpdate = (updatedPost) => {
    setBlogs(blogs.map(blog => 
      blog._id === updatedPost._id ? updatedPost : blog
    ));
  };

  if (loading) {
    return (
      <div className="blog-container">
        <div className="loading">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-container">
        <div className="error-message">{error}</div>
        <button onClick={fetchBlogs} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <h1 className="page-title">My Blogs</h1>
      <p className="blog-count">{blogs.length} {blogs.length === 1 ? 'post' : 'posts'} available</p>

      {blogs.length === 0 ? (
        <div className="no-blogs">
          <h2>No blog posts yet</h2>
          <p>Be the first to create a blog post!</p>
        </div>
      ) : (
        <div className="blog-card-container">
          {blogs.map((blog) => (
            <BlogPostCard
              key={blog._id}
              post={blog}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;