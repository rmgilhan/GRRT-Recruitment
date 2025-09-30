import React from 'react'
import { Target, Users, Lightbulb, Handshake, Star, Shield  } from "lucide-react";
import About from '../assets/AboutUs.jpg'

const GLOBEHAND_IMG = `https://static.wixstatic.com/media/11062b_e2b580dab01e420aa08572ba02916d7f~mv2_d_5580_4160_s_4_2.jpg/v1/fill/w_1225,h_616,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_e2b580dab01e420aa08572ba02916d7f~mv2_d_5580_4160_s_4_2.jpg`;
const COREVALUES_IMG=`https://static.wixstatic.com/media/9139dbe3848c4b339ac0763787936575.jpg/v1/fill/w_1225,h_616,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9139dbe3848c4b339ac0763787936575.jpg`;
const MISSION_IMG=`https://static.wixstatic.com/media/2479ac233f0c4152af5805d671706fac.jpg/v1/fill/w_1225,h_616,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2479ac233f0c4152af5805d671706fac.jpg;`

export default function AboutUs() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${About})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About GRRT Recruitment Services
          </h1>
          <p className="text-lg">
            Delivering recruitment solutions that build lasting connections
            since 2017.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Driven by a strong passion to revolutionize recruitment in the
            country, GRRT Recruitment Services delivers quality solutions
            through strategic planning and process innovation. Since our launch
            in 2017, we’ve partnered with top companies across industries,
            helping them find the right people to drive success.
          </p>
        </div>
      </section>

      {/* Our Strengths */}
      <section className="py-16 bg-gray-50 px-6 md:px-12 lg:px-24">
        <div id="Strength" className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Strengths
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-3">
              <Target className="w-10 h-10 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Focused Strategies</h3>
              <p className="text-gray-600">
                Tailored recruitment approaches that match your unique needs.
              </p>
            </div>
            <div className="text-center space-y-3">
              <Users className="w-10 h-10 text-success mx-auto" />
              <h3 className="text-xl font-semibold">People-First</h3>
              <p className="text-gray-600">
                Building strong relationships with clients and talents alike.
              </p>
            </div>
            <div className="text-center space-y-3">
              <Lightbulb className="w-10 h-10 text-warning mx-auto" />
              <h3 className="text-xl font-semibold">Innovation</h3>
              <p className="text-gray-600">
                Adapting global best practices for local recruitment excellence.
              </p>
            </div>
            <div className="text-center space-y-3">
              <Handshake className="w-10 h-10 text-indigo-600 mx-auto" />
              <h3 className="text-xl font-semibold">Trusted Partner</h3>
              <p className="text-gray-600">
                A reliable recruitment partner to top companies across industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Core Values */}
      <div className="flex flex-col">
      {/* Mission Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${MISSION_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div id="Mission" className="relative z-10 max-w-3xl px-6">
          <div className="flex items-center justify-center mb-4">
            <Target className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            To empower businesses and individuals by providing smart, sustainable, and affordable
            solutions. We are committed to guiding our clients toward growth, resilience, and lasting
            success in a competitive world.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${GLOBEHAND_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-3xl px-6">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            To be a trusted partner in innovation and business growth, helping organizations thrive
            through strategic guidance, world-class talent, and future-ready solutions.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${COREVALUES_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl px-6">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
          <ul className="text-lg leading-relaxed space-y-3 text-left mx-auto max-w-2xl">
            <li>🔹 Integrity – Acting with honesty and transparency.</li>
            <li>🔹 Excellence – Striving for the highest standards in all we do.</li>
            <li>🔹 Innovation – Embracing creativity and forward-thinking solutions.</li>
            <li>🔹 Collaboration – Building strong partnerships for success.</li>
            <li>🔹 Resilience – Adapting and thriving in changing environments.</li>
          </ul>
        </div>
      </section>
    </div>
    </div>
  );
}
