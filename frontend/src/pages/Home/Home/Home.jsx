import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import LiveStats from "../LiveStats/LiveStats";
import CommunitySection from "../CommunitySection/CommunitySection";
import WeeklyPaymentSection from "../WeeklyPaymentSection/WeeklyPaymentSection";
import TopWorkers from "../TopWorkers/TopWorkers";
import TestimonialSection from "../TestimonialSection/TestimonialSection";
import FaqPage from "../FaqPage/FaqPage";
import TaskList from "../../Worker/TaskList/TaskList";
import AvailableTasks from "../AvailableTasks";

const Home = () => {
  return (
    <div>
      <Banner />
      <CommunitySection />
      <AvailableTasks/>
      <WeeklyPaymentSection />
      <TopWorkers />
      <LiveStats />
      <HowItWorks />
      <FaqPage/>
      <TestimonialSection />
      
    </div>
  );
};

export default Home;
