import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { closeOutline, addOutline, removeOutline } from "ionicons/icons";
import A from "../assets/images/products/1.jpg";
import B from "../assets/images/products/2.jpg";
import C from "../assets/images/products/3.jpg";
import D from "../assets/images/products/4.jpg";
import "../assets/css/style.css";
import "../assets/css/styles-prefix.css";
const categories = [
  {
    name: "Kurtis",
    icon: "icon-path", // Replace with actual icon
    items: [
      { name: "Cotton Kurti", stock: 20 },
      { name: "Silk Kurti", stock: 5 },
    ],
  },
  {
    name: "Pickles",
    icon: "icon-path", // Replace with actual icon
    items: [
      { name: "Mango Pickle", stock: 10 },
      { name: "Lemon Pickle", stock: 8 },
    ],
  },
  {
    name: "Jams",
    icon: "icon-path", // Replace with actual icon
    items: [
      { name: "Strawberry Jam", stock: 15 },
      { name: "Mango Jam", stock: 12 },
    ],
  },
  {
    name: "Teas",
    icon: "icon-path", // Replace with actual icon
    items: [
      { name: "Green Tea", stock: 25 },
      { name: "Black Tea", stock: 8 },
    ],
  },
  {
    name: "Spices",
    icon: "icon-path", // Replace with actual icon
    items: [
      { name: "Turmeric Powder", stock: 30 },
      { name: "Coriander Powder", stock: 18 },
    ],
  },
  // Add more categories here as needed
];

const Sidebar = () => {
  const [openCategories, setOpenCategories] = useState({});

  const toggleDropdown = (categoryName) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }));
  };

  return (
    <div className="product-container">
      <div className="container"></div>
    <div className="sidebar has-scrollbar" data-mobile-menu=""
      style={{
        marginLeft: "40px", /* Shrinking the sidebar *//* Keep it fixed */
      }}
>
      <div className="sidebar-category" style={{ marginRight: "200px" }}>
        <div className="sidebar-top">
          <h2 className="sidebar-title">Category</h2>
          <button className="sidebar-close-btn" data-mobile-menu-close-btn="">
            <IonIcon icon={closeOutline} />
          </button>
        </div>
        <ul className="sidebar-menu-category-list">
          {categories.map((category) => (
            <li className="sidebar-menu-category" key={category.name}>
              <button
                className="sidebar-accordion-menu"
                onClick={() => toggleDropdown(category.name)}
              >
                <div className="menu-title-flex">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="menu-title-img"
                    width={20}
                    height={20}
                  />
                  <p className="menu-title">{category.name}</p>
                </div>
                <div>
                  <IonIcon
                    icon={addOutline}
                    className={`add-icon ${openCategories[category.name] ? "hidden" : ""}`}
                  />
                  <IonIcon
                    icon={removeOutline}
                    className={`remove-icon ${openCategories[category.name] ? "" : "hidden"}`}
                  />
                </div>
              </button>
              <ul
                className={`sidebar-submenu-category-list ${openCategories[category.name] ? "active" : ""}`}
              >
                {category.items.map((item) => (
                  <li className="sidebar-submenu-category" key={item.name}>
                    <a href="#" className="sidebar-submenu-title">
                      <p className="product-name">{item.name}</p>
                      <data value={item.stock} className="stock" title="Available Stock">
                        {item.stock}
                      </data>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Product Showcase */}
      <div className="product-showcase">
        <h3 className="showcase-heading">Best Sellers</h3>
        <div className="showcase-wrapper">
          <div className="showcase-container">
            {/* Product 1 */}
            <div className="showcase">
              <a href="#" className="showcase-img-box">
                <img src={A} alt="Organic Desi Ghee" width={75} height={75} className="showcase-img" />
              </a>
              <div className="showcase-content">
                <a href="#">
                  <h4 className="showcase-title">Organic Desi Ghee</h4>
                </a>
                <div className="showcase-rating">
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                </div>
                <div className="price-box">
                  <del>₹5.00</del>
                  <p className="price">₹4.00</p>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="showcase">
              <a href="#" className="showcase-img-box">
                <img src={B} alt="Multi-Floral Raw Honey" className="showcase-img" width={75} height={75} />
              </a>
              <div className="showcase-content">
                <a href="#">
                  <h4 className="showcase-title">Multi-Floral Raw Honey</h4>
                </a>
                <div className="showcase-rating">
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star-half-outline" />
                </div>
                <div className="price-box">
                  <del>₹17.00</del>
                  <p className="price">₹7.00</p>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="showcase">
              <a href="#" className="showcase-img-box">
                <img src={C} alt="Handmade Millet Cookies" className="showcase-img" width={75} height={75} />
              </a>
              <div className="showcase-content">
                <a href="#">
                  <h4 className="showcase-title">Handmade Millet Cookies</h4>
                </a>
                <div className="showcase-rating">
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star-half-outline" />
                </div>
                <div className="price-box">
                  <del>₹5.00</del>
                  <p className="price">₹3.00</p>
                </div>
              </div>
            </div>

            {/* Product 4 */}
            <div className="showcase">
              <a href="#" className="showcase-img-box">
                <img src={D} alt="Cold-Pressed Mustard Oil" className="showcase-img" width={75} height={75} />
              </a>
              <div className="showcase-content">
                <a href="#">
                  <h4 className="showcase-title">Cold-Pressed Mustard Oil</h4>
                </a>
                <div className="showcase-rating">
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                  <ion-icon name="star" />
                </div>
                <div className="price-box">
                  <del>₹15.00</del>
                  <p className="price">₹12.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
