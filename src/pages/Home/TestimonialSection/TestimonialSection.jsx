import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Akbar Ali",
    photo: "https://i.postimg.cc/TYpT4W9t/young-handsome-hipster-man-posing-street-it-businessman-plaid-shirt-sunglasses-europe-city-center.jpg",
    quote: "KormoBazaar helped me earn steadily and grow my freelancing skills.",
  },
  {
    name: "Kadir Hossen",
    photo: "https://i.postimg.cc/ZKGzss0q/young-handsome-stylish-businessman-wearing-suit-220507-756.avif",
    quote: "A trusted platform with smooth payment and respectful buyers.",
  },
  {
    name: "Kajol",
    photo: "https://i.postimg.cc/JzRCWDcw/beautiful-young-woman-posing-park.jpg",
    quote: "Tasks were clear, communication was easy. Highly recommend!",
  },
  {
    name: "Afrina",
    photo: "https://i.postimg.cc/NFRS3BKf/girl-with-bike.jpg",
    quote: "KormoBazaar gave me flexibility and financial freedom.",
  },
  {
    name: "Younus",
    photo: "https://i.postimg.cc/vT4C35s9/handsome-young-serious-man-standing-isolated.jpg",
    quote: "I've completed over 50 tasks — payouts are always on time!",
  },
  {
    name: "Tanjil",
    photo: "https://i.postimg.cc/kG8P7WpC/portrait-attractive-young-man-straightening-his-jacket.jpg",
    quote: "It feels good to be valued for the work you deliver.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-blue-50 mt-12 rounded-2xl">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">💬 What Our Users Say</h2>

        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          modules={[Pagination, Autoplay]}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center h-full flex flex-col justify-between">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-30 h-30 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800">{t.name}</h3>
                <p className="text-gray-600 italic mt-2">“{t.quote}”</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;