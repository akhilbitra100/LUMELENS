import React from 'react';
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.jpg";
import pinterest from "../assets/pinterest.png";

function Footer() {
  return (
    <footer className="bg-gray-100 pt-10 pb-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">LumeLens</h3>
            <p className="text-gray-600 mb-4">Capturing moments that matter with precision and passion.</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" className="w-6 h-6 rounded hover:opacity-80 transition-opacity duration-300" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="Instagram" className="w-6 h-6 rounded hover:opacity-80 transition-opacity duration-300" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter" className="w-6 h-6 rounded hover:opacity-80 transition-opacity duration-300" />
              </a>
              <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
                <img src={pinterest} alt="Pinterest" className="w-6 h-6 rounded hover:opacity-80 transition-opacity duration-300" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors w-fit cursor-pointer">About Us</a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors w-fit cursor-pointer">Contact Us</a>
              <a className="text-gray-600 hover:text-blue-600 transition-colors w-fit cursor-pointer">Portfolio</a>
              <a className="text-gray-600 hover:text-blue-600 transition-colors w-fit cursor-pointer">Testimonials</a>
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">Contact Us</h3>
            <div className="space-y-2 text-gray-600">
              <p>123 Main Street, City, Country, 123 456</p>
              <p>lumelens@gmail.com</p>
              <p>+1 (123) 456-7890</p>
            </div>
          </div>
        </div>
        
        <hr className="border-gray-200 mb-6" />
        
        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
          <p className="mb-4 md:mb-0">Copyright © {new Date().getFullYear()} - All rights reserved by LumeLens</p>
          <div className="flex space-x-6">
            <a className="hover:text-blue-600 transition-colors cursor-pointer">Privacy Policy</a>
            <a className="hover:text-blue-600 transition-colors cursor-pointer">Terms of Use</a>
            <a className="hover:text-blue-600 transition-colors cursor-pointer">Careers</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;