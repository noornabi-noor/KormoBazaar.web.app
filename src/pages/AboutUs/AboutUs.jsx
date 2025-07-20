import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">About Us</h1>

      <section className="text-gray-700 text-lg leading-relaxed">
        <p>
          Welcome to <strong className="text-blue-600">KormoBazaar</strong> — a platform designed to connect buyers and workers seamlessly. Whether you're posting a task or earning through your skills, our goal is to empower users with secure transactions, transparent workflows, and flexible earning opportunities.
        </p>
        <p className="mt-4">
          We believe in fair economics. Buyers exchange coins to access talent, and workers earn valuable rewards for real contributions. With features like role-based dashboards, Stripe payments, withdrawal tools, and smart coin conversion — our app is more than just functional. It's designed to scale with you.
        </p>
      </section>

      <section className="bg-gray-100 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Vision 🌟</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Empower digital freelancers through transparent earnings</li>
          <li>Create a reliable bridge between task creators and talent</li>
          <li>Champion secure, scalable, and user-friendly systems</li>
        </ul>
      </section>

      <section className="text-center text-gray-600">
        <p>
          Built with React, MongoDB, Express, and Stripe — our stack reflects our commitment to performance, stability, and clean user experience.
        </p>
        <p className="mt-2">
          Have questions or feedback? Reach out — we’re always listening.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;