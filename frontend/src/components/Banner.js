import React from 'react';

// Importing images
import bannerImage from "../assets/images/banner-1.jpg"; // Adjust the path if needed
import bannerImage2 from "../assets/images/banner-2.jpg";
import bannerImage3 from "../assets/images/banner-3.jpg";
import "../assets/css/style.css";
import "../assets/css/styles-prefix.css";
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

const Banner = () => {
  return (
    <div className="banner" style={{ paddingTop: "200px" }}>
      <div className="container">
        <div className="slider-container has-scrollbar">
          <div className="slider-item">
            <img
              src={bannerImage}
              alt="Women's Latest Fashion Sale"
              className="banner-img"
            />
            <div className="banner-content">
              <p className="banner-subtitle">Trending item</p>
              <h2 className="banner-title">Fresh & Affordable – Shop Fruits & Veggies Now!</h2>
              <p className="banner-text">
                starting at ₹ <b>50</b>
              </p>
              <a href="#" className="banner-btn">
                Shop now
              </a>
            </div>
          </div>
          <div className="slider-item">
            <img
              src={bannerImage2}
              alt="Modern Sunglasses"
              className="banner-img"
            />
            <div className="banner-content">
              <p className="banner-subtitle">Trending</p>
              <h2 className="banner-title">Elegant Stitches, Timeless Beauty!</h2>
              <p className="banner-text">
                starting at ₹ <b>150</b>
              </p>
              <a href="#" className="banner-btn">
                Shop now
              </a>
            </div>
          </div>
          <div className="slider-item">
            <img
              src={bannerImage3}
              alt="New Fashion Summer Sale"
              className="banner-img"
            />
            <div className="banner-content">
              <p className="banner-subtitle">Sale Offer</p>
              <h2 className="banner-title">Homemade Goodness, Authentic Taste!</h2>
              <p className="banner-text">
                starting at ₹ <b>30</b>
              </p>
              <a href="#" className="banner-btn">
                Shop now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
