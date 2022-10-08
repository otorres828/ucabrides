import React from 'react';

import Header from '../../partials/web/Header';
import HeroHome from '../../partials/web/HeroHome';
import FeaturesHome from '../../partials/web/Features';
import FeaturesBlocks from '../../partials/web/FeaturesBlocks';
import Testimonials from '../../partials/web/Testimonials';
import Newsletter from '../../partials/web/Newsletter';
import Footer from '../../partials/web/Footer';

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
        <Newsletter />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;