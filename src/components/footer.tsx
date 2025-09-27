import React from 'react';
import twitter from '../assets/twitter.png';
import facebook from '../assets/facebook.png';
import linkedln from '../assets/linkedln.png';
import instagram from '../assets/instagram.png';
import smartphone from '../assets/smartphone.png';
import email from '../assets/email.png';
import grrtLogo from '../assets/grrt-logo.png';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <img src={grrtLogo} alt="GRRT Logo" className="w-32 mb-4" />
          <h4 className="text-lg font-semibold">GRRT Recruitment Services</h4>
          <p className="text-sm mt-2">
            Driven by a strong passion to revolutionize Recruitment.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold mb-2">Company</h5>
            <ul className="space-y-1 text-sm">
              <li>About Us</li>
              <li>Career</li>
              <li>Team</li>
              <li>Job</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Services</h5>
            <ul className="space-y-1 text-sm">
              <li>Our Services</li>
              <li>Highlights</li>
            </ul>
          </div>
        </div>

        {/* Resources & Social */}
        <div>
          <h5 className="font-semibold mb-2">Resources</h5>
          <ul className="space-y-1 text-sm mb-4">
            <li>Site Map</li>
            <li>Confidentiality</li>
            <li>Disclaimer</li>
            <li>Let Us Know</li>
          </ul>
          <h5 className="font-semibold mb-2">Connect</h5>
          <div className="flex space-x-3">
            <img src={linkedln} alt="LinkedIn" className="w-5 h-5" />
            <img src={facebook} alt="Facebook" className="w-5 h-5" />
            <img src={twitter} alt="Twitter" className="w-5 h-5" />
            <img src={instagram} alt="Instagram" className="w-5 h-5" />
          </div>
        </div>

        {/* Contact & Legal */}
        <div>
          <h5 className="font-semibold mb-2">Contact</h5>
          <div className="flex items-start space-x-2 mb-2">
            <img src={smartphone} alt="Phone" className="w-5 h-5 mt-1" />
            <p className="text-sm">0921-583-8157</p>
          </div>
          <div className="flex items-start space-x-2 mb-4">
            <img src={email} alt="Email" className="w-5 h-5 mt-1" />
            <p className="text-sm">info@grrt.com</p>
          </div>

          <div className="text-xs text-gray-500 space-y-1 mt-4">
            <p>© 2005 GRRT Recruitment Services. All rights reserved.</p>
            <p>Privacy Policy | Site Map</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
