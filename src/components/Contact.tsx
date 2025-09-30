import React from 'react';
import { Mail, Phone, MapPin } from "lucide-react";

const CONTACTUS_IMG=`https://plus.unsplash.com/premium_photo-1743940551213-e062ca626e15?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;

export default function Contact() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${CONTACTUS_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg">
            Have questions or want to collaborate? We’d love to hear from you.  
            Reach out today and let’s build something great together.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white shadow-md rounded-2xl">
          <Mail className="w-10 h-10 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Email Us</h3>
          <p className="text-gray-600">info@grrt.com</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-2xl">
          <Phone className="w-10 h-10 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Call Us</h3>
          <p className="text-gray-600">(+63) 02-8756-7656</p>
          <p className="text-gray-600">(+63) 02-8425-3262</p>
          <p className="text-gray-600">+63 921-583-8157</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-2xl">
          <MapPin className="w-10 h-10 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
          <p className="text-gray-600">Unit C, 2/F, Burke House Bldg. 2439 Pedro Gil St., Sta. Ana, Manila, Philippines, 1009</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            {/* Email */}
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            {/* Subject */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                placeholder="Enter subject"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            {/* Message */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              ></textarea>
            </div>
            {/* Submit */}
            <div className="col-span-2 text-center">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
