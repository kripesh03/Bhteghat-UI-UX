import React from 'react';
import Banner from './Banner';
import { TopSellers } from './TopSellers';
import Recommened from './Recommended';
import MidSection from './MidSection';

const Home = () => {
  return (
    <div className="bg-gray-50">
      <Banner />
      <Recommened />
      <MidSection />
      <TopSellers />
    </div>
  );
};

export default Home;
