import React from 'react';
import Hero from '../components/Home/Hero';
import StorySection from '../components/Home/StorySection';
import BrandsSlider from '../components/Home/BrandsSlider';
import Works from '../components/Home/Works';
import CallToAction from '../components/Home/CallToAction';

function Home() {
    return (
        <div className="Home">
            <Hero />
            <StorySection />
            <BrandsSlider />
            <Works />
            <CallToAction />
        </div>
    );
}

export default Home;