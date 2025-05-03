import React, { useEffect } from 'react';
import logo from "../assets/images/logo/logo.jpg";  // Update with your actual logo path
import electronicsBanner from "../assets/images/electronics-banner-1.jpg";
import electronicsBanner2 from "../assets/images/electronics-banner-2.jpg";
import menFashion from "../assets/images/mens-banner.jpg"
import WomenFashion from "../assets/images/womens-banner.jpg" // Update path
import "../assets/css/style.css";
import "../assets/css/styles-prefix.css";
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import Banner from './Banner'; 


const Header = () => {
    useEffect(() => {
        // Function to handle scroll events
        const handleScroll = () => {
          const header = document.getElementById('header');
          if (window.scrollY > 50) { // If page is scrolled down 50px or more
            header.style.top = '-60px'; // Hide the header when scrolling down
          } else {
            header.style.top = '0'; // Show the header when at the top of the page
          }
        };
    
        // Add event listener for scroll
        window.addEventListener('scroll', handleScroll);
    
        // Clean up event listener on component unmount
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
  return (
    <div>
     <header
      id="header"
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        zIndex: 1000,
        backgroundColor: 'white',
        transition: 'top 0.3s',
      }}
    >
    <div className="header-top">
      <div className="container">
        <ul className="header-social-container">
          <li>
            <a href="#" className="social-link">
              <ion-icon name="logo-facebook" />
            </a>
          </li>
          <li>
            <a href="#" className="social-link">
              <ion-icon name="logo-twitter" />
            </a>
          </li>
          <li>
            <a href="#" className="social-link">
              <ion-icon name="logo-instagram" />
            </a>
          </li>
          <li>
            <a href="#" className="social-link">
              <ion-icon name="logo-linkedin" />
            </a>
          </li>
        </ul>
        <div className="header-alert-news">
          <p>
            <b>Free Shipping</b>
            This Week Order Over - ₹150
          </p>
        </div>
        <div className="header-top-actions">
        <select name="language">
          <option value="en">English</option>
          <option value="hi">हिन्दी (Hindi)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          </select>

        </div>
      </div>
    </div>
    <div className="header-main">
      <div className="container">
        <a href="#" className="header-logo">
          <img
            src={logo}
            alt="Anon's logo"
            width={80}
            height={40}
          />
        </a>
        <div className="header-search-container">
          <input
            type="search"
            name="search"
            className="search-field"
            placeholder="Enter your product name..."
          />
          <button className="search-btn">
            <ion-icon name="search-outline" />
          </button>
        </div>
        <div className="header-user-actions">
          <button className="action-btn">
            <ion-icon name="person-outline" />
          </button>
          <button className="action-btn">
            <ion-icon name="heart-outline" />
            <span className="count">0</span>
          </button>
          <button className="action-btn">
            <ion-icon name="bag-handle-outline" />
            <span className="count">0</span>
          </button>
        </div>
      </div>
    </div>
    <nav className="desktop-navigation-menu">
      <div className="container">
        <ul className="desktop-menu-category-list">
          <li className="menu-category">
            <a href="#" className="menu-title">
              Home
            </a>
          </li>
          <li className="menu-category">
            <a href="#" className="menu-title">
              Categories
            </a>
            <div className="dropdown-panel">
              <ul className="dropdown-panel-list">
                <li className="menu-title">
                  <a href="#">Fresh Farm Produce</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Fruits</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Vegetables</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Seasonal Produce</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Dry Fruits</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Exotic Produce</a>
                </li>
                <li className="panel-list-item">
                <a href="#">
      <img
        src={electronicsBanner}
        alt="Headphone Collection"
        width={250}
        height={119}
      />
    </a>
                </li>
              </ul>
              <ul className="dropdown-panel-list">
                <li className="menu-title">
                  <a href="#">Dairy & Eggs</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Fresh Cow/Buffalo Milk</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Paneer & Cheese</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Butter & Ghee</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Curd & Buttermilk</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Farm Fresh Eggs</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">
                    <img
                      src={menFashion}
                      alt="men's fashion"
                      width={250}
                      height={119}
                    />
                  </a>
                </li>
              </ul>
              <ul className="dropdown-panel-list">
                <li className="menu-title">
                  <a href="#">Handmade Snacks & Sweets</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Regional Snacks</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Traditional Sweets</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Healthy Snacks</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Pickles & Chutneys</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Pure Honey</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">
                    <img
                      src={WomenFashion}
                      alt="women's fashion"
                      width={250}
                      height={119}
                    />
                  </a>
                </li>
              </ul>
              <ul className="dropdown-panel-list">
                <li className="menu-title">
                  <a href="#">Artisanal & Handcrafted Items</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Pottery & Terracotta Products</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Wooden Handicrafts</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Bamboo Products</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Handmade Jewelry</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">Crochet & Embroidery Items</a>
                </li>
                <li className="panel-list-item">
                  <a href="#">
                  <img src={electronicsBanner2} alt="Mouse Collection" width={250} height={119} />
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="menu-category">
            <a href="#" className="menu-title">
            Fresh Farm Produce
            </a>
            <ul className="dropdown-list">
              <li className="dropdown-item">
                <a href="#">Fruits & Berries</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Vegetables & Leafy Greens</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Regional & Seasonal Produce</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Medicinal Herbs</a>
              </li>
            </ul>
          </li>
          <li className="menu-category">
            <a href="#" className="menu-title">
            Artisanal & Handcrafted Items
            </a>
            <ul className="dropdown-list">
              <li className="dropdown-item">
                <a href="#">Handmade Home Décor</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Ethnic & Sustainable Fashion</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Handmade Jewelry & Accessories</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Spiritual & Wellness Products </a>
              </li>
            </ul>
          </li>
          <li className="menu-category">
            <a href="#" className="menu-title">
            Natural & Herbal Products
            </a>
            <ul className="dropdown-list">
              <li className="dropdown-item">
                <a href="#">Organic Skincare & Haircare</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Ayurvedic & Herbal Medicines</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Handmade Essential Oils & Fragrances</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Traditional Health & Wellness Superfoods</a>
              </li>
            </ul>
          </li>
          <li className="menu-category">
            <a href="#" className="menu-title">
            Traditional Handloom & Textiles
            </a>
            <ul className="dropdown-list">
              <li className="dropdown-item">
                <a href="#">Ethnic Handwoven Sarees</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Handcrafted Fabrics & Yardage</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Artisanal Apparel & Accessories</a>
              </li>
              <li className="dropdown-item">
                <a href="#">Home Furnishings & Decor</a>
              </li>
            </ul>
          </li>
          <li className="menu-category">
            <a href="#" className="menu-title">
              Blog
            </a>
          </li>
          <li className="menu-category">
            <a href="#" className="menu-title">
              Hot Offers
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div className="mobile-bottom-navigation">
      <button className="action-btn" data-mobile-menu-open-btn="">
        <ion-icon name="menu-outline" />
      </button>
      <button className="action-btn">
        <ion-icon name="bag-handle-outline" />
        <span className="count">0</span>
      </button>
      <button className="action-btn">
        <ion-icon name="home-outline" />
      </button>
      <button className="action-btn">
        <ion-icon name="heart-outline" />
        <span className="count">0</span>
      </button>
      <button className="action-btn" data-mobile-menu-open-btn="">
        <ion-icon name="grid-outline" />
      </button>
    </div>
    <nav className="mobile-navigation-menu  has-scrollbar" data-mobile-menu="">
      <div className="menu-top">
        <h2 className="menu-title">Menu</h2>
        <button className="menu-close-btn" data-mobile-menu-close-btn="">
          <ion-icon name="close-outline" />
        </button>
      </div>
      <ul className="mobile-menu-category-list">
        <li className="menu-category">
          <a href="#" className="menu-title">
            Home
          </a>
        </li>
        <li className="menu-category">
          <button className="accordion-menu" data-accordion-btn="">
            <p className="menu-title">Fresh Farm Produce</p>
            <div>
              <ion-icon name="add-outline" className="add-icon" />
              <ion-icon name="remove-outline" className="remove-icon" />
            </div>
          </button>
          <ul className="submenu-category-list" data-accordion="">
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Fruits & Berries
              </a>
            </li>
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Vegetables & Leafy Greens
              </a>
            </li>
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Regional & Seasonal Produce
              </a>
            </li>
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Medicinal Herbs
              </a>
            </li>
          </ul>
        </li>
        <li className="menu-category">
          <button className="accordion-menu" data-accordion-btn="">
            <p className="menu-title">Artisanal & Handcrafted Items</p>
            <div>
              <ion-icon name="add-outline" className="add-icon" />
              <ion-icon name="remove-outline" className="remove-icon" />
            </div>
          </button>
          <ul className="submenu-category-list" data-accordion="">
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Handmade Home Décor
              </a>
            </li>
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Ethnic & Sustainable Fashion
              </a>
            </li>
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Handmade Jewelry & Accessories
              </a>
            </li>
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Spiritual & Wellness Products
              </a>
            </li>
          </ul>
        </li>
        <li className="menu-category">
          <button className="accordion-menu" data-accordion-btn="">
            <p className="menu-title">Natural & Herbal Products</p>
            <div>
              <ion-icon name="add-outline" className="add-icon" />
              <ion-icon name="remove-outline" className="remove-icon" />
            </div>
          </button>
          <ul className="submenu-category-list" data-accordion="">
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Organic Skincare & Haircare
              </a>
            </li>
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Ayurvedic & Herbal Medicines
              </a>
            </li>
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Handmade Essential Oils & Fragrances
              </a>
            </li>
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Traditional Health & Wellness Superfoods
              </a>
            </li>
          </ul>
        </li>
        <li className="menu-category">
          <button className="accordion-menu" data-accordion-btn="">
            <p className="menu-title">Traditional Handloom & Textiles</p>
            <div>
              <ion-icon name="add-outline" className="add-icon" />
              <ion-icon name="remove-outline" className="remove-icon" />
            </div>
          </button>
          <ul className="submenu-category-list" data-accordion="">
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Ethnic Handwoven Sarees
              </a>
            </li>
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Handcrafted Fabrics & Yardage
              </a>
            </li>
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Artisanal Apparel & Accessories
              </a>
            </li>
            <li className="submenu-category">
              <a href="#" className="submenu-title">
              Home Furnishings & Decor
              </a>
            </li>
          </ul>
        </li>
        <li className="menu-category">
          <a href="#" className="menu-title">
            Blog
          </a>
        </li>
        <li className="menu-category">
          <a href="#" className="menu-title">
            Hot Offers
          </a>
        </li>
      </ul>
      <div className="menu-bottom">
        <ul className="menu-category-list">
          <li className="menu-category">
            <button className="accordion-menu" data-accordion-btn="">
              <p className="menu-title">Language</p>
              <ion-icon name="caret-back-outline" className="caret-back" />
            </button>
            <ul className="submenu-category-list" data-accordion="">
              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  English
                </a>
              </li>
              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Hindi
                </a>
              </li>
              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Tamil                </a>
              </li>
            </ul>
          </li>
        </ul>
        <ul className="menu-social-container">
          <li>
            <a href="#" className="social-link">
              <ion-icon name="logo-facebook" />
            </a>
          </li>
          <li>
            <a href="#" className="social-link">
              <ion-icon name="logo-twitter" />
            </a>
          </li>
          <li>
            <a href="#" className="social-link">
              <ion-icon name="logo-instagram" />
            </a>
          </li>
          <li>
            <a href="#" className="social-link">
              <ion-icon name="logo-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
 
  </div>
  );
}

export default Header;
