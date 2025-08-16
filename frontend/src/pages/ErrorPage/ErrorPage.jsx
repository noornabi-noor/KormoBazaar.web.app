// import React from "react";
// import { motion } from "framer-motion";

// export default function ErrorPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-gray-100 p-6">
//       <motion.main
//         initial={{ opacity: 0, y: 16 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="relative z-10 w-full max-w-4xl mx-auto"
//         aria-labelledby="notfound-heading"
//       >
//         <div className="bg-gradient-to-br from-white/6 via-white/3 to-white/4 backdrop-blur-md border border-white/6 rounded-2xl p-8 shadow-2xl">
//           <div className="flex flex-col md:flex-row items-center gap-6">
//             <motion.div
//               className="flex-shrink-0"
//               initial={{ scale: 0.96 }}
//               animate={{ scale: [1, 1.03, 1] }}
//               transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
//               aria-hidden
//             >
//               <svg
//                 width="160"
//                 height="160"
//                 viewBox="0 0 200 200"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 role="img"
//                 aria-label="calming eye illustration"
//               >
//                 <defs>
//                   <radialGradient id="g1" cx="50%" cy="40%">
//                     <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
//                     <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.08" />
//                     <stop
//                       offset="100%"
//                       stopColor="#0ea5a4"
//                       stopOpacity="0.02"
//                     />
//                   </radialGradient>
//                   <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
//                     <feGaussianBlur stdDeviation="6" />
//                   </filter>
//                 </defs>

//                 <g filter="url(#f1)">
//                   <ellipse cx="100" cy="100" rx="84" ry="48" fill="url(#g1)" />
//                 </g>

//                 <motion.path
//                   d="M20 100C50 50 150 50 180 100C150 150 50 150 20 100Z"
//                   fill="none"
//                   stroke="rgba(255,255,255,0.12)"
//                   strokeWidth="6"
//                   initial={{ pathLength: 0 }}
//                   animate={{ pathLength: 1 }}
//                   transition={{ duration: 1.2, ease: "easeOut" }}
//                 />

//                 <motion.circle
//                   cx="100"
//                   cy="100"
//                   r="26"
//                   fill="#0ea5a4"
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: [0.98, 1.02, 0.98] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 3,
//                     ease: "easeInOut",
//                   }}
//                 />
//                 <motion.circle
//                   cx="100"
//                   cy="100"
//                   r="12"
//                   fill="#053e3e"
//                   initial={{ scale: 0.9 }}
//                   animate={{ scale: [1, 0.94, 1] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2.6,
//                     ease: "easeInOut",
//                   }}
//                 />
//                 <circle cx="92" cy="92" r="4" fill="#ffffff" opacity="0.9" />
//                 <ellipse
//                   cx="100"
//                   cy="126"
//                   rx="44"
//                   ry="12"
//                   fill="rgba(14,165,164,0.06)"
//                 />
//               </svg>
//             </motion.div>
//             <div className="flex-1">
//               <h1
//                 id="notfound-heading"
//                 className="text-4xl md:text-5xl font-extrabold text-white leading-tight"
//               >
//                 Oops — Page not found
//               </h1>
//               <p className="mt-3 text-slate-300 max-w-xl">
//                 The page you tried to reach doesn’t exist (anymore?) — but don’t
//                 worry, we designed this page to be relaxing while you decide
//                 your next move.
//               </p>

//               <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
//                 <a
//                   href="/"
//                   className="inline-flex items-center justify-center rounded-lg px-5 py-3 btn-secondary shadow-md text-white font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
//                 >
//                   Go home
//                 </a>

//                 <a
//                   href="/allArtifacts"
//                   className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-white/10 bg-white/3 text-white hover:bg-white/6 transition"
//                 >
//                   Browse artifacts
//                 </a>
//               </div>

//               <p className="mt-4 text-sm text-slate-400">
//                 If you think this is a mistake,{" "}
//                 <a href="/contact" className="underline text-slate-200">
//                   contact support
//                 </a>{" "}
//                 and we’ll help you find what you need.
//               </p>
//             </div>
//           </div>

//           <div className="mt-6 text-center text-xs text-slate-400">
//             Return to{" "}
//             <a href="/" className="underline">
//               homepage
//             </a>{" "}
//             · or try our{" "}
            
//               sitemap
           
//           </div>
//         </div>
//       </motion.main>
//     </div>
//   );
// }



import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaCompass, FaEnvelope } from "react-icons/fa";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 via-slate-800 to-black text-gray-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl p-10 text-center"
      >
        {/* Animated "404" */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-8xl font-extrabold text-indigo-400 drop-shadow-md"
        >
          404
        </motion.h1>

        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
          Page Not Found
        </h2>
        <p className="mt-3 text-slate-300">
          Oops! The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back on track.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition text-white font-semibold shadow-lg"
          >
            <FaHome /> Home
          </a>
          <a
            href="/alltasks"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition text-white font-semibold shadow-lg"
          >
            <FaCompass /> Explore
          </a>
          <a
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-500 text-slate-300 hover:bg-slate-800 transition font-semibold shadow"
          >
            <FaEnvelope /> Contact
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          Or try visiting {" "}
          <a href="/about" className="underline hover:text-indigo-300">
            about us
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}
