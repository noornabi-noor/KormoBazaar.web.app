// src/pages/ContactPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [state, handleSubmit] = useForm(import.meta.env.VITE_formspree_key);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300 space-y-10 text-black py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-4xl font-bold text-primary mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-gray-700 dark:text-gray-200 text-center max-w-2xl mx-auto mb-8">
          Got questions or feedback about{" "}
          <span className="text-primary font-semibold">KormoBazaar</span>?  
          We’re always listening. Reach out and let’s connect!
        </p>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-10 text-center">
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-primary text-2xl mb-2" />
            <p className="text-gray-700 dark:text-gray-200">Email</p>
            <a
              href="mailto:noornabinoor1770@gmail.com"
              className="text-white hover:text-black px-2 py-2 bg-gray-500 mt-2"
            >
              noornabinoor1770@gmail.com
            </a>
          </div>
          <div className="flex flex-col items-center">
            <FaPhone className="text-primary text-2xl mb-2" />
            <p className="text-gray-700 dark:text-gray-200">Phone</p>
            <p className="text-white  px-2 py-2 bg-gray-500 mt-2">+880 1234 567 890</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-primary text-2xl mb-2" />
            <p className="text-gray-700 dark:text-gray-200">Address</p>
            <p className="text-white px-2 py-2 bg-gray-500 mt-2">Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
            {state.succeeded && (
              <div className="p-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md">
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}
          <div>
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg px-4 py-2 bg-slate-800 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg px-4 py-2 bg-slate-800 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                          />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 dark:text-gray-200 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full rounded-lg px-4 py-2 bg-slate-800 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                          />
          </div>

                      <button
              type="submit"
              disabled={state.submitting}
              className="btn btn-sm btn-primary w-full "
            >
              {state.submitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>


        </form>
      </motion.div>
    </div>
  );
}
