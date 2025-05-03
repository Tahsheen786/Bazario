import React, { useEffect, useState } from "react";

// Importing images — adjust the paths based on your project folder structure
import "../assets/css/style.css";
import "../assets/css/styles-prefix.css";
import { IonIcon } from "@ionic/react";
import { closeOutline, addOutline, removeOutline } from "ionicons/icons";
import { Link, useNavigate } from "react-router-dom";

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const navigate = useNavigate();
  
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);

        // Split the fetched products into New Arrivals (first 5) and Trending (next 5)
        setNewArrivals(data.slice(0, 5)); // First 5 products for New Arrivals
        setTrendingProducts(data.slice(5, 10)); // Next 5 products for Trending Now
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
 
  
  return (
    <div className="product-box">
      <div className="product-minimal" style={{ marginLeft: '400px', marginTop: '-690px' }}>
        <div className="product-showcase" >
          
        <div className="showcase-sections-wrapper" >
        <div className="showcase-wrapper has-scrollbar" style={{ display: 'flex', gap: '1px', alignItems: 'flex-start', marginTop:"20px" }}>
          <div className="showcase-container">
          <h2 className="title">New Arrivals</h2>
              {newArrivals.map((product) => (
                <div className="showcase" key={product._id} style={{ width: '300px', padding: '10px', textAlign: 'center', cursor: "pointer" }}
                  onClick={() => handleProductClick(product._id)}>
                  <a href="#" className="showcase-img-box">
                    <img
                      src={product.images?.[0]?.large || "default-image.jpg"}
                      alt={product.title}
                      width={70}
                      className="showcase-img"
                    />
                  </a>
                  <div className="showcase-content">
                    <a href="#">
                      <h4 className="showcase-title">{product.title}</h4>
                    </a>
                    <div className="price-box">
                      <p className="price">₹{product.price}</p>
                      <del>₹{(product.price * 1.4).toFixed(2)}</del>
                    </div>
                    {product.average_rating && (
                      <p style={{ fontSize: "12px", color: "goldenrod" }}>
                        ⭐ {product.average_rating} / 5
                      </p>
                     
                    )}
                     </div>
                     </div>
              ))}
              </div>
            
            {/* Trending Now Section */}
            <div className="showcase-container">
              <h2 className="title">Trending Now</h2>
              {trendingProducts.map((product) => (
                <div className="showcase" key={product._id} style={{ width: '300px', padding: '10px', textAlign: 'center', cursor: "pointer" }}
                onClick={() => handleProductClick(product._id)}>
                  <a href="#" className="showcase-img-box">
                    <img
                      src={product.images?.[0]?.large || "default-image.jpg"}
                      alt={product.title}
                      width={70}
                      className="showcase-img"
                    />
                  </a>
                  <div className="showcase-content">
                    <a href="#">
                      <h4 className="showcase-title">{product.title}</h4>
                    </a>
                    <div className="price-box">
                      <p className="price">₹{product.price}</p>
                      <del>₹{(product.price * 1.4).toFixed(2)}</del>
                    </div>
                    {product.average_rating && (
                      <p style={{ fontSize: "12px", color: "goldenrod" }}>
                        ⭐ {product.average_rating} / 5
                      </p>
                    )}
                  </div>
                </div>
              ))}
              </div>
              </div>
              </div>
            </div>
          </div>
          </div>
  );
};

export default ProductShowcase;