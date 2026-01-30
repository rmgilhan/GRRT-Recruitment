import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { HashLink as HasLink } from 'react-router-hash-link';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import useJob from "@hooks/useJob"; // Or useInquiry

// Assets
import grrtLogo from '../assets/grrt-logo-black.png'; // Ensure this logo looks good on dark or has no background
import smartphone from '../assets/smartphone.png';
import emailIcon from '../assets/email.png';
import linkedln from '../assets/linkedln.png';
import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';
import instagram from '../assets/instagram.png';

export default function Footer({ isDashboard = false }) {
  
  const { sendInquiry } = useJob(); // Extract the function
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const socialLinks = [
  { icon: linkedln, url: "https://www.linkedin.com/company/grrt-recruitment-services/" },
  { icon: facebook, url: "https://www.facebook.com/GRRTRS/" },
  { icon: twitter, url: "https://x.com/grrtrs" },
  { icon: instagram, url: "https://www.instagram.com/grrtrs" }
];

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("I'm clicked.")
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const result = await sendInquiry(formData);
      if (result?.success) {
        // Success! Clear the form
        setFormData({ name: '', email: '', message: '' });
        alert("Thank you! Your inquiry has been sent."); 
      }
    } catch (error) {
       alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     setFormData({ name: '', email: '', message: '' });
  //     alert("Inquiry Sent Successfully!");
  //   }, 1500);
  // };

  return (
    <footer className="w-full bg-[#0a0a0a] text-gray-400 py-16 px-6 md:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* SECTION 1: Brand (Logo Fixed) */}
      <div className="space-y-6">
        {/* Removed the invert/brightness filters to restore your logo's true colors */}
        <div className="bg-white/5 p-1 rounded-xl inline-block">
          <img 
            src={grrtLogo} 
            alt="GRRT Logo" 
            className="w-40 h-auto object-contain hover:scale-105 transition-transform" 
          />
        </div>
        
        {!isDashboard && (
          <>
            <h4 className="text-xl font-bold text-white">GRRT Recruitment Services</h4>
            <p className="text-sm leading-relaxed text-gray-500 italic">
              "Excellence in every placement, integrity in every partnership."
            </p>
          </>
        )}
        
        <div className="flex gap-4 pt-2">
          {socialLinks.map((social, idx) => (
            <a 
              key={idx} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all cursor-pointer group"
            >
              <img 
                src={social.icon} 
                alt="Social" 
                className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" 
              />
            </a>
          ))}
        </div>
      </div>
        {/* SECTION 2 & 3: Navigation (Hidden on Dashboard) */}
        {!isDashboard ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Company</h5>
                <ul className="space-y-4 text-sm">
                  <li><HasLink to="/AboutUs#_top" className="hover:text-emerald-400 transition-colors">About Us</HasLink></li>
                  <li><HasLink to="/Jobs" className="hover:text-emerald-400 transition-colors">Career</HasLink></li>
                  <li><HasLink to="/#OurTeam" className="hover:text-emerald-400 transition-colors">Team</HasLink></li>
                  <li><HasLink to="/Jobs" className="hover:text-emerald-400 transition-colors">Jobs</HasLink></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Services</h5>
                <ul className="space-y-4 text-sm">
                  <li><HasLink to="/Services#_top" className="hover:text-emerald-400 transition-colors">Our Services</HasLink></li>
                  <li><HasLink to="/Services#services" className="hover:text-emerald-400 transition-colors">Highlights</HasLink></li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h5 className="font-bold text-white uppercase tracking-widest text-xs">Reach Us</h5>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3 items-start">
                  <MapPin size={18} className="text-emerald-500 shrink-0" />
                  <p>Unit C, 2/F, Burke House Bldg. Sta. Ana, Manila</p>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone size={18} className="text-emerald-500 shrink-0" />
                  <p>0921-583-8157</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="lg:col-span-2 hidden lg:block"></div>
        )}

        {/* SECTION 4: Inquiry Form (The "Dashboard-Style" Card) */}
        <div className="relative">
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-800 shadow-2xl">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Send size={18} className="text-emerald-400" />
              Send an Inquiry
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Name" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 text-sm text-gray-300 focus:border-emerald-500 outline-none transition-all"
              />
              <input 
                type="email" 
                placeholder="Email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 text-sm text-gray-300 focus:border-emerald-500 outline-none transition-all"
              />
              <textarea 
                placeholder="How can we help?" 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl p-3 text-sm text-gray-300 h-24 focus:border-emerald-500 outline-none transition-all resize-none"
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[3px] text-gray-600">
        <p>© 2026 GRRT Recruitment Services. All Rights Reserved.</p>
        <div className="flex gap-8">
          <span className="hover:text-emerald-400 cursor-pointer transition-colors">
            <Link to="/privacy-policy" className="hover:text-emerald-400">Privacy Policy</Link>
          </span>
          <span className="hover:text-emerald-400 cursor-pointer transition-colors">
            <Link to="/terms-of-service" className="hover:text-emerald-400">Terms of Service</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}