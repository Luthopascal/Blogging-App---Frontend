// src/pages/homePage.jsx
import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';
import './homePage.css';

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await api.get('/AllBlogs');
        console.log('AllBlogs response:', res.data);
        
        let blogData = [];
        // Enhanced logic to extract blog array from various API response structures
        if (Array.isArray(res.data)) {
          blogData = res.data;
        } else if (res.data?.blogs && Array.isArray(res.data.blogs)) {
          blogData = res.data.blogs;
        } else if (res.data?.data && Array.isArray(res.data.data)) {
          blogData = res.data.data;
        } else if (res.data?.message && Array.isArray(res.data.message)) {
          blogData = res.data.message;
        }
        
        if (mounted) {
          setBlogs(blogData);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        if (err.response) {
          console.error('Server response:', err.response.status, err.response.data);
        }
        
        if (mounted) {
          const errorMsg = err.response?.data?.message || err.message || 'Failed to load blogs';
          setError(errorMsg);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    
    fetchBlogs();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="blog-container">
        <p className="loading-text">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-container">
        <div className="error-container">
          <h3 className="error-title">Error loading blogs</h3>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      {/* This title is full-width and centered by the CSS you provided */}
      <h1 className="page-title">My Blogs</h1> 
      
      <div className="blog-card-container">
        {blogs.length === 0 ? (
          <p className="no-posts-message">No blog posts found.</p>
        ) : (
          blogs.map((blog, index) => (
            <div className="blog-card-1" key={blog._id || blog.id || index}>
              {blog.image && (
                <img 
                  src={blog.image} 
                  alt={blog.title || 'Blog post'} 
                  className="blog-image" 
                />
              )}
              {/* NEW WRAPPER for content to help Flexbox manage spacing */}
              <div className="blog-content-wrapper"> 
                  <h2 className="blog-title">{blog.title || 'Untitled'}</h2>
                  <p className="blog-date">{blog.dateCreated || blog.createdAt || 'No date'}</p>
                  {blog.content && (
                      <p className="blog-excerpt">{blog.content.substring(0, 100)}...</p>
                  )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;