import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import LiveStats from '../LiveStats/LiveStats';
import CommunitySection from '../CommunitySection/CommunitySection';
import WeeklyPaymentSection from '../WeeklyPaymentSection/WeeklyPaymentSection';
import TopWorkers from '../TopWorkers/TopWorkers';

const Home = () => {
    return (
        <div>
            <Banner/>
            <TopWorkers/>
            <CommunitySection/>
            <WeeklyPaymentSection/>
            <HowItWorks/>
            <LiveStats/>
        </div>
    );
};

export default Home;