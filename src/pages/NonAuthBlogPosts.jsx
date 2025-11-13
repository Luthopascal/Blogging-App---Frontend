import React from "react";
import './NonAuthBlog.css'


function NonAuthBlogPosts() {
  const blogPosts = [
    {
      title: "5 Real-World Uses of MCPs in AI Technology",
      image: "https://www.upskillist.com/blog/content/images/size/w1200/2025/03/image-1742555893822.jpeg",
      dateCreated: "2025-11-05"
    },
    {
      title: "The Rise of Autonomous Agents: How AI Systems Are Learning to Think for Themselves",
      image: "https://ars.els-cdn.com/content/image/1-s2.0-S2666389923001447-gr2.jpg",
      dateCreated: "2025-11-04"
    },
    {
      title: "From Code to Cognition: The Evolution of Neural Networks in 2025",
      image: "https://science.iirs.gov.in/wp-content/uploads/2025/06/vandita_june_25_feature.png",
      dateCreated: "2025-11-03"
    },
    {
      title: "How AI Infrastructure Is Powering the Next Wave of Startups",
      image: "https://www.meritalk.com/wp-content/uploads/2025/11/shutterstock_2271093095-1.jpg",
      dateCreated: "2025-11-02"
    },
    {
      title: "Voice Intelligence: The Future of Human-AI Communication",
      image: "https://www.almawave.com/wp-content/uploads/2023/09/L_ArgomentiSeo_NLPArtedellaComunicazione-scaled.webp",
      dateCreated: "2025-11-01"
    },
    {
      title: "The Hidden Layer: Understanding How Data Shapes Machine Learning Models",
      image: "https://www.ibm.com/content/dam/worldwide-content/creative-assets/s-migr/ul/g/aa/22/deep-neural-network-diagram.component.crop-2by1-xl.ts=1761941265666.png/content/adobe-cms/us/en/think/topics/deep-learning/jcr:content/root/table_of_contents/body-article-8/image",
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