import React from 'react'
import { Briefcase, Users, RefreshCw, Target, 
        TrendingUp, Search, BarChart3, 
        Globe, Handshake, Zap, Shield, Settings, 
        FileText, Lightbulb } from "lucide-react";
import OurServices from "../assets/OurServices.jpg";

export default function Services() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section  className="relative h-[70vh] flex items-center justify-center text-center text-white"
          style={{
            backgroundImage: `url(${OurServices})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
         {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
              At GRRT Recruitment Services, we go beyond traditional recruitment. 
              Our solutions are designed to empower businesses, strengthen teams, 
              and ensure operational resilience. Explore how we can help your 
              business grow and thrive.
            </p>
            <a
              href="#services"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold shadow-lg transition"
            >
              Explore Services
            </a>
        </div>
      </section>

      <div id="services" className="container mx-auto px-6 py-16 space-y-16">
        {/* Business Consultancy */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="text-green-700 w-8 h-8" />
            <h2 className="text-2xl font-semibold text-green-700">
              Business Consultancy
            </h2>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Every business is unique. Whether you are just starting out or 
            looking to expand, our consultancy services help you identify 
            priorities, streamline operations, and create strategies for 
            sustainable growth. With our guidance, you can stay focused on 
            achieving your goals while we handle the groundwork.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <li className="flex items-center">
            <TrendingUp className="w-5 h-5 text-primary mr-2" />
            Strategic planning and growth roadmaps</li>
            <li className="flex items-center">
            <Briefcase className="w-5 h-5 text-primary mr-2" />
            Streamlined business operations for efficiency</li>
            <li className="flex items-center">
            <Search className="w-5 h-5 text-primary mr-2" />
            Market and competitor insights</li>
            <li className="flex items-center">
            <BarChart3 className="w-5 h-5 text-primary mr-2" />
            Financial planning and risk advisory</li>
            <li className="flex items-center">
            <Users className="w-5 h-5 text-primary mr-2" />
            People management and HR guidance</li>
          </ul>
        </section>

        {/* Head Hunting */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-green-700 w-8 h-8" />
            <h2 className="text-2xl font-semibold text-green-700">
              Head Hunting
            </h2>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Building your dream team requires more than just filling roles—it’s 
            about finding people who share your vision. With our extensive 
            local and international network, we deliver highly qualified 
            professionals who bring long-term value to your organization.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <li className="flex items-center">
            <Target className="w-5 h-5 text-primary mr-2" />
            Executive search for key leadership positions</li>
            <li className="flex items-center">
            <Globe className="w-5 h-5 text-primary mr-2" />
            Access to international and specialized talent pools</li>
            <li className="flex items-center">
            <Handshake className="w-5 h-5 text-primary mr-2" />
            Personalized candidate matching to fit your culture</li>
            <li className="flex items-center">
            <Zap className="w-5 h-5 text-primary mr-2" />
            Faster, more efficient hiring processes</li>
          </ul>
        </section>

        {/* Business Continuity */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="text-green-700 w-8 h-8" />
            <h2 className="text-2xl font-semibold text-green-700">
              Business Continuity Support
            </h2>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Disruptions shouldn’t derail your business. From unexpected crises 
            to shifting regulations, our continuity support ensures you remain 
            stable, adaptable, and future-ready.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <li className="flex items-center">
              <Shield className="w-5 h-5 text-primary mr-2" />
              Risk assessment and mitigation planning</li>
            <li className="flex items-center">
              <Settings className="w-5 h-5 text-primary mr-2" />
              Crisis and emergency management strategies</li>
            <li className="flex items-center">
              <FileText className="w-5 h-5 text-primary mr-2" />
              Compliance and regulatory readiness</li>
            <li className="flex items-center">
              <Lightbulb className="w-5 h-5 text-primary mr-2" />
              Operational continuity planning</li>
            <li className="flex items-center">💡 Disaster recovery and backup solutions</li>
          </ul>
        </section>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-200 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Ready to take your business further?
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Whether you need strategic guidance, exceptional talent, or long-term 
          resilience planning, we are here to help. Let’s work together to 
          build the future of your business.
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition"
        >
          Contact Us Today
        </a>
      </section>
    </div>
  );
}
