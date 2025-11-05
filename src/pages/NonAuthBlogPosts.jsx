import React from "react";
import './NonAuthBlog.css'


function NonAuthBlogPosts() {
  const blogPosts = [
    {
      title: "5 Real-World Uses of MCPs in AI Technology",
      image: "https://example.com/mcps-ai.jpg",
      dateCreated: "2025-11-05"
    },
    {
      title: "The Rise of Autonomous Agents: How AI Systems Are Learning to Think for Themselves",
      image: "https://example.com/autonomous-agents.jpg",
      dateCreated: "2025-11-04"
    },
    {
      title: "From Code to Cognition: The Evolution of Neural Networks in 2025",
      image: "https://example.com/neural-networks.jpg",
      dateCreated: "2025-11-03"
    },
    {
      title: "How AI Infrastructure Is Powering the Next Wave of Startups",
      image: "https://example.com/ai-infrastructure.jpg",
      dateCreated: "2025-11-02"
    },
    {
      title: "Voice Intelligence: The Future of Human-AI Communication",
      image: "https://example.com/voice-intelligence.jpg",
      dateCreated: "2025-11-01"
    },
    {
      title: "The Hidden Layer: Understanding How Data Shapes Machine Learning Models",
      image: "https://example.com/machine-learning-data.jpg",
      dateCreated: "2025-10-31"
    }
  ];

  return (
    <div className="blog-container">
      {blogPosts.map((post, index) => (
        <div className="blog-card" key={index}>
          <img src={post.image} alt={post.title} className="blog-image" />
          <h3>{post.title}</h3>
          <p>{post.dateCreated}</p>
        </div>
      ))}
    </div>
  );
}

export default NonAuthBlogPosts;