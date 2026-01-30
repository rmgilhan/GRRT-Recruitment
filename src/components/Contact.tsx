import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const CONTACTUS_IMG = `https://plus.unsplash.com/premium_photo-1743940551213-e062ca626e15?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;

export default function Contact() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${CONTACTUS_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-emerald-950/60" /> {/* Emerald tint for brand consistency */}
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl font-black mb-6 tracking-tight">Connect With Us</h1>
          <p className="text-lg text-emerald-50 leading-relaxed">
            Whether you are looking for your next career move or searching for top-tier talent, 
            our team is ready to assist you. Let's start a conversation.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Email */}
          <div className="group p-8 bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
            <p className="text-gray-500 font-medium">info@grrt.com</p>
            <p className="text-gray-400 text-sm mt-1">Response within 24 hours</p>
          </div>

          {/* Call */}
          <div className="group p-8 bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
            <div className="space-y-1">
              <p className="text-gray-500 font-medium">(02) 8756-7656</p>
              <p className="text-gray-500 font-medium">+63 921-583-8157</p>
            </div>
          </div>

          {/* Location */}
          <div className="group p-8 bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Us</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Unit C, 2/F, Burke House Bldg. 2439 Pedro Gil St., Sta. Ana, Manila
            </p>
          </div>
        </div>
      </section>

      {/* Map Section - Replaces the Form */}
      {/* Map Section */}
      <section className="pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="bg-gray-100 rounded-[2rem] overflow-hidden border border-gray-200 h-[450px] relative shadow-lg">
          <iframe
            title="GRRT Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.325674345678!2d121.0103112758!3d14.5819155859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ad413aff0b45%3A0x372eb70b1bb41225!2sBurke%20House%20No.%205%20Building!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
            className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <a 
            href="https://maps.app.goo.gl/ChIJRQr_OsHJlzMRJRK0Gwu3Ljc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-600 font-bold hover:underline"
          >
            View on Google Maps <ExternalLink size={16} />
          </a>
        </div>
      </section>
      
    </div>
  );
}