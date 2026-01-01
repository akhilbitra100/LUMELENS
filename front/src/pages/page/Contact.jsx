import React from "react";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.jpg";
import pinterest from "../../assets/pinterest.png";

const Contact = () => {
  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Get In Touch</h1>
          <p className="text-gray-600 mx-auto">
            We'd love to hear from you! Whether you have a question about our products, need technical support, or just want to say hello, our team is here to help.
          </p>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 pb-4 border-b border-gray-100">Contact Information</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-red-600 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Our Office
              </h3>
              <p className="text-gray-700 ml-7">123 Main Street, City</p>
              <p className="text-gray-700 ml-7">Country, 123 456</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-red-600 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Email Us
              </h3>
              <p className="ml-7">
                <a href="mailto:lumelens@gmail.com" className="text-blue-600 hover:underline">lumelens@gmail.com</a>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-red-600 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                Call Us
              </h3>
              <p className="text-gray-700 ml-7">+1 (123) 456-7890</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-red-600 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Business Hours
              </h3>
              <p className="text-gray-700 ml-7">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-700 ml-7">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-gray-700 ml-7">Sunday: Closed</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-red-600 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
                Connect With Us
              </h3>
              <div className="flex items-center gap-4 ml-7">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                  <img src={facebook} alt="Facebook" className="w-6 h-6 rounded-md" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                  <img src={instagram} alt="Instagram" className="w-6 h-6 rounded-md" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                  <img src={twitter} alt="Twitter" className="w-6 h-6 rounded-md" />
                </a>
                <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                  <img src={pinterest} alt="Pinterest" className="w-6 h-6 rounded-md" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;