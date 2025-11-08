import React from "react";
import './Welcome.css';
import NonAuthBlogPosts from "./NonAuthBlogPosts";
import Footer from "../components/Footer";


function Welcome() {
    return(
        <div>
        <div className="Welcome-container">
            <h2 className="gradient-text"> TRENDING BLOGS</h2>
             <h3>Discover the latest trends, best practices, and technical deep-dives from developers worldwide</h3>
             </div>

             <div>
             <NonAuthBlogPosts/>
             </div>

             <div style={{ marginTop: '50px', }}></div>

        
          <div className="Footer">
            <Footer/>
          </div>


        </div>
    )
}


export default Welcome;