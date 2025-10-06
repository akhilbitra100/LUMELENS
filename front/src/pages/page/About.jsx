import React from 'react';
import logo from '../../assets/logo.jpeg';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-6">
      <div className="max-w-5xl bg-white shadow-2xl rounded-3xl p-10 text-gray-800"> {/* Removed text-center from this div for better layout control*/}
        <div className="text-center mb-8"> {/* Added a wrapper for centered elements */}
          <img src={logo} alt="LumeLens Logo" className="mx-auto w-64 h-48 mb-6" />
          <h1 className="text-5xl font-extrabold text-indigo-800 mb-6 tracking-wide uppercase">Welcome to LumeLens</h1>
          <p className="text-xl text-gray-600 mb-6 italic">"An Independent Company for Independent Artists"</p>
          <div className="bg-indigo-100 text-indigo-800 py-3 px-6 rounded-lg shadow-sm">
          <p className="font-medium">Where Art Meets Opportunity: Discover, Buy, and Sell Photography.</p>
        </div>
        </div>
        <div className="text-lg leading-relaxed text-gray-700"> {/* Added a wrapper for left-aligned text */}
          <p className="mb-6 ">
            Creativity is boundless, and so is your potential. At <span className="font-bold text-gray-900">LumeLens</span>, we craft a space where
            visionaries thrive, where every artist owns their journey. Whether you're capturing fleeting moments,
            painting dreams, or designing the future, we provide the platform to turn your passion into impact.
          </p>
          <p className="mb-6 text-indigo-800">
            We stand for <span className="font-semibold text-indigo-800">freedom, authenticity, and artistic excellence.</span>
            Join us in reshaping the creative landscape—because art deserves independence.
          </p>
          <p className="mb-6">
            Our platform is built with a deep understanding of the challenges faced by independent artists. We prioritize
            fair compensation, creative freedom, and a supportive community. At LumeLens, you’re not just another artist—you
            are part of a movement that values artistic integrity and originality.
          </p>
          <p>
            We believe in fostering meaningful connections between artists and their audiences. Through our platform, artists
            can engage with buyers, share their creative stories, and find inspiration from a global network of like-minded individuals.
            With intuitive tools and transparent policies, LumeLens makes it easy to showcase and sell your work without barriers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;