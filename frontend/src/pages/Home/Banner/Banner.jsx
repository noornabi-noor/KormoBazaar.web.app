import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const [slides, setSlides] = useState([]);

  // Fetch JSON stored in public/banners.json
  useEffect(() => {
    fetch("/banners.json")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Error loading banners:", err));
  }, []);

  return (
    <div className="relative mt-12 rounded-2xl overflow-hidden transition-colors duration-300">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-[80vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 dark:bg-black/50 backdrop-brightness-75"></div>

              {/* Slide Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <motion.h1
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-sky-600 via-blue-500 to-sky-600 bg-clip-text text-transparent drop-shadow-xl"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  className="mt-4 text-lg md:text-xl font-medium max-w-2xl text-blue-200 dark:text-gray-100 drop-shadow-md"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.button
                  initial={{ scale: 0, rotate: -10, opacity: 0 }}
                  whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  className="mt-6 px-6 py-2 btn-secondary"
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
