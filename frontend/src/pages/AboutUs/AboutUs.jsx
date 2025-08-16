import React from "react";

const AboutUs = () => {
  return (
    <div className="mt-12  px-6 py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300 space-y-10">
      <div className="max-w-5xl mx-auto ">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            ✨ About Us
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Learn what makes{" "}
            <strong className="text-blue-600 dark:text-blue-400">
              KormoBazaar
            </strong>{" "}
            work for you
          </p>
        </div>

        {/* Mission */}
        <section className="text-lg text-gray-700 dark:text-gray-200 space-y-4 leading-relaxed">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              KormoBazaar
            </span>{" "}
            — a platform designed to connect buyers and workers seamlessly.
            Whether you're posting a task or earning through your skills, our
            goal is to empower users with secure transactions, transparent
            workflows, and flexible earning opportunities.
          </p>
          <p>
            We believe in fair economics. Buyers exchange coins to access
            talent, and workers earn valuable rewards for real contributions.
            With features like role-based dashboards, Stripe payments,
            withdrawal tools, and smart coin conversion — our app isn’t just
            functional. It’s built to scale with you.
          </p>
        </section>

        {/* Vision Card */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow transition">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4 text-center">
            🌟 Our Vision
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-200">
            <li>Empower digital freelancers through transparent earnings</li>
            <li>Create a reliable bridge between task creators and talent</li>
            <li>Champion secure, scalable, and user-friendly systems</li>
          </ul>
        </section>

        {/* Tech & Contact */}
        <section className="text-center text-gray-600 dark:text-gray-400 space-y-2">
          <p>
            Built with <span className="font-semibold">React</span>,{" "}
            <span className="font-semibold">MongoDB</span>,{" "}
            <span className="font-semibold">Express</span>, and{" "}
            <span className="font-semibold">Stripe</span> — our stack reflects
            our commitment to performance, stability, and clean user experience.
          </p>
          <p>Got questions or feedback? Reach out — we’re always listening.</p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
