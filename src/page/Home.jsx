import React from 'react';
import Hero from '../components/Hero';
import StorySection from '../components/StorySection';
import BrandsSlider from '../components/BrandsSlider';
import Works from '../components/works';
import CallToAction from '../components/CallToAction';

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