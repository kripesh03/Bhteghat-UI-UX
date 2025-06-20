import React from 'react';
import footerLogo from "../assets/div.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10 px-6 md:px-20 border-t">
      <div className="max-w-screen-2xl pl-32 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo and Description */}
        <div>
          <img src={footerLogo} alt="Logo" className="mb-4 w-32" />
          <p className="text-sm text-gray-600">
            Bringing Nepali people together, one event at a time.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="text-md font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/browse" className="hover:text-blue-600">Events</a></li>
            <li><a href="/admin" className="hover:text-blue-600">Organize</a></li>
            <li><a href="/about" className="hover:text-blue-600">About</a></li>
            <li><a href="/faq" className="hover:text-blue-600">FAQs</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-md font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <HiOutlineMail className="text-blue-600" />
              hello@bhetghat.com
            </li>
            <li className="flex items-center gap-2">
              <IoLocationOutline className="text-blue-600" />
              Kathmandu, Nepal
            </li>
          </ul>
          <div className="flex gap-4 mt-4 text-gray-600">
            <a href="#" className="hover:text-blue-600"><FaFacebook size={18} /></a>
            <a href="#" className="hover:text-blue-600"><FaInstagram size={18} /></a>
            <a href="#" className="hover:text-blue-600"><FaTwitter size={18} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs text-gray-400 mt-10">
        © 2024 Bhetghat. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
