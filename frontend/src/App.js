import React, { useState } from "react";
import Login from "./components/Login";
import Modal from "./components/Modal"; // adjust the path as needed
import "./assets/css/style.css";
import "./assets/css/styles-prefix.css";
import { IonIcon } from '@ionic/react';
import { addOutline, removeOutline, closeOutline } from "ionicons/icons";
import Toast from "./components/Toast";
import Header from './components/Header';  // Make sure to adjust the path accordingly
import Home from "./pages/Home";
import ProductDetails from "./components/ProductDetails";
import Checkout from './components/Checkout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [isToastVisible, setIsToastVisible] = useState(true); // Show toast// show modal once after login
  const closeToast = () => {
    setIsToastVisible(false);
  };
  return (
    <div className="App">
      {!isAuthenticated ? (
        <Login setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <>
          {/* Show modal after login */}
          <Header />
          <Modal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
          {isToastVisible && (
            <Toast
              message="Someone new just bought"
              title="Pure Organic Honey"
              imageSrc="./assets/images/honey-product.jpg" // Provide correct image source
              onClose={closeToast}
            />
          )}
          <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
          
        </>
      )}
    </div>
  );
}

export default App;