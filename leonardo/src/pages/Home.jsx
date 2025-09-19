import React from "react";
import HomeStart from "../components/home/HomeStart";
import InfoSection from "../components/home/InfoSection";
import TopCategories from "../components/home/TopCategories";
import DoorSlider from "../components/home/DoorSlider";
import Modern from "../components/repeats/Modern";
import ProductGrid from "../components/home/ProductGrid";

const Home = () => {
  return (
    <div>
      <HomeStart />
      <InfoSection />
      <TopCategories />
      <DoorSlider />
      <Modern />
      <ProductGrid />
    </div>
  );
};

export default Home;
