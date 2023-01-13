import React from 'react';

import Header from '../../components/web/Header';
import HeroHome from '../../components/web/HeroHome';
import FeaturesHome from '../../components/web/Features';
import FeaturesBlocks from '../../components/web/FeaturesBlocks';
import Testimonials from '../../components/web/Testimonials';
// import Newsletter from '../../components/web/Newsletter';
import Footer from '../../components/web/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <HeroHome />
        <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials />
        {/* <Newsletter /> */}

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;