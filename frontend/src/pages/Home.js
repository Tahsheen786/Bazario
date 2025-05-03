import React from "react";
import Category from "../components/Category";
import "../assets/css/style.css";
import "../assets/css/styles-prefix.css";
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import Sidebar from "../components/Sidebar"; // Adjust the path based on your project structure
import ProductShowcase from "../components/ProductShowcase";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div>
       <Banner />
      <Category />
      <Sidebar/>
      <ProductShowcase/>
      
    </div>
  );
};

export default Home;
