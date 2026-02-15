import React from "react";
import SliderBanner from "@/root/Components/SliderBanner/SliderBanner";
import UgCakesSearchFeatures from "@/root/Components/UgCakesSearchFeatures/UgCakesSearchFeatures";
import BestSellers from "@/components/BestSellers/BestSellers";

const Home = () => {
  return (
    <div className="">
      <SliderBanner />
      <UgCakesSearchFeatures />
      <BestSellers />
    </div>
  );
};

export default Home;
