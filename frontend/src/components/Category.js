import React from "react";
import "../assets/css/style.css";
import "../assets/css/styles-prefix.css";
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

const categories = [
  { title: "Embroided Kurtis", count: 53 },
  { title: "Pickles", count: 58 },
  { title: "Vegetables", count: 68 },
  { title: "Herbs", count: 84 },
  { title: "T-shirts", count: 35 },
  { title: "Jacket", count: 16 },
  { title: "Watch", count: 27 },
  { title: "Hat & caps", count: 39 },
];

const Category = () => {
  return (
    <div className="category">
      <div className="container">
        <div className="category-item-container has-scrollbar">
          {categories.map((item, index) => (
            <div className="category-item" key={index}>
              <div className="category-content-box">
                <div className="category-content-flex">
                  <h3 className="category-item-title">{item.title}</h3>
                  <p className="category-item-amount">({item.count})</p>
                </div>
                <a href="#" className="category-btn">
                  Show all
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
