import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Briefcase, Users, RefreshCw, MapPin, Phone, Mail } from 'lucide-react';
import { HashLink as HasLink } from 'react-router-hash-link';

const HANDSHAKE_IMG = `https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1331&auto=format&fit=crop`;
const STRENGTH_IMG = `https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&auto=format&fit=crop`;
const ABOUT_IMG = `https://plus.unsplash.com/premium_photo-1658507041186-07e5948b4f69?q=80&w=1170&auto=format&fit=crop`;

const App = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleFindJobs = () => {
        localStorage.setItem("showJobsMenu", "true");
        navigate("/Jobs");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
            alert('Thank you! We will be in touch shortly.');
        }, 1500);
    };

    // Updated Service Card for the Dark Section
    const ServiceCard = ({ icon: Icon, title, description, linkTo }) => (
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/20 transition-all duration-300 group flex flex-col h-full">
            <div className="bg-amber-400/20 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-emerald-50/70 mb-8 flex-grow leading-relaxed">{description}</p>
            <HasLink
                to={linkTo}
                smooth
                className="text-amber-400 font-bold flex items-center gap-2 hover:gap-4 transition-all"
            >
                Explore Service <span>→</span>
            </HasLink>
        </div>
    );

    return (
        <main className="antialiased text-gray-800 bg-white">
            {/* --- HERO SECTION --- */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-16 md:py-24 px-4 md:px-8">
                {/* Decorative Elements */}
                <div className="absolute top-0 -left-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 -right-20 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="text-center md:text-left">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-6">
                            Est. Recruitment Experts
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] text-emerald-900">
                            Finding Right <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Talent</span>
                            <br />
                            <span className="text-amber-500">Build Your Future.</span>
                        </h1>
                        <p className="text-lg md:text-xl mt-8 text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
                            Connecting high-caliber professionals with industry leaders. We build the teams that power the Philippines' future.
                        </p>
                        <div className="flex flex-col sm:flex-row mt-10 gap-4 justify-center md:justify-start">
                            <button onClick={handleFindJobs} className="px-10 py-4 bg-emerald-600 text-white font-bold rounded-full shadow-xl hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95">
                                Find Jobs
                            </button>
                            <HasLink to="/AboutUs" className="px-10 py-4 bg-white text-emerald-700 font-bold rounded-full border-2 border-emerald-100 hover:bg-emerald-50 transition-all shadow-sm">
                                Our Solutions
                            </HasLink>
                        </div>
                    </div>

                    <div className="flex justify-center relative">
                        <div className="absolute -inset-6 bg-gradient-to-tr from-emerald-400 to-amber-400 rounded-[3rem] blur-2xl opacity-20"></div>
                        <img 
                            src={HANDSHAKE_IMG} 
                            alt="Professional Handshake" 
                            className="relative rounded-[2.5rem] shadow-2xl max-h-[480px] w-full object-cover border-[12px] border-white" 
                        />
                    </div>
                </div>
            </section>

            {/* --- ABOUT SECTION --- */}
            <section id="OurTeam" className="py-20 lg:py-32 px-4 md:px-8 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <img src={ABOUT_IMG} alt="Teamwork" className="rounded-3xl shadow-2xl h-[450px] w-full object-cover" />
                        <div className="absolute -bottom-6 -right-6 bg-amber-500 p-8 rounded-2xl shadow-xl hidden lg:block">
                            <p className="text-white font-black text-4xl">10+</p>
                            <p className="text-amber-100 text-sm font-bold uppercase tracking-tighter">Years of Excellence</p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-emerald-900 mb-4">Who We Are</h2>
                            <div className="h-2 w-20 bg-amber-500 rounded-full"></div>
                        </div>
                        <p className="text-xl text-gray-700 leading-relaxed font-medium">
                            At GRRT Recruitment Services, we don't just find employees—we source the DNA of your company's future success.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Based in Manila, we provide tailored recruitment strategies and business consultancy that bridge the gap between global best practices and local market expertise.
                        </p>
                        <HasLink to="/AboutUs#Mission" className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-700 px-6 py-3 rounded-xl font-bold hover:bg-emerald-100 transition-colors">
                            Discover Our Mission <span>→</span>
                        </HasLink>
                    </div>
                </div>
            </section>

            {/* --- SERVICES SECTION --- */}
            <section className="bg-emerald-950 py-24 px-4 md:px-8 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-center md:text-left">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Our Core Services</h2>
                            <p className="text-emerald-100/60 text-lg leading-relaxed">
                                From executive headhunting to operational continuity, we offer a full suite of business growth tools.
                            </p>
                        </div>
                        <HasLink to="/Services#_top" className="px-8 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-all font-bold">
                            View All Services
                        </HasLink>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ServiceCard 
                            icon={Briefcase} 
                            title="Business Consultancy" 
                            description="Strategic solutions for startups and growing enterprises to navigate complex market terrains."
                            linkTo="/Services#BusinessConsultancy"
                        />
                        <ServiceCard 
                            icon={Users} 
                            title="Head Hunting" 
                            description="Deep-search recruitment for specialized roles and executive leadership that drives innovation."
                            linkTo="/Services#HeadHunting"
                        />
                        <ServiceCard 
                            icon={RefreshCw} 
                            title="Business Continuity" 
                            description="Robust planning and risk management to ensure your operations never miss a beat."
                            linkTo="/Services#BusinessContinuity"
                        />
                    </div>
                </div>
            </section>

            {/* --- STRENGTH SECTION --- */}
            <section className="py-20 lg:py-32 px-4 md:px-8 bg-amber-50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 space-y-10">
                        <div>
                            <h2 className="text-4xl font-black text-emerald-900 mb-6">Our Strength</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                We combine global recruitment standards with a deep understanding of the Filipino workforce. Our methodology is data-driven yet human-centric.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-4xl font-black text-emerald-900 mb-6">Our Team</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                A collective of industry veterans, talent scouts, and strategic advisors dedicated to one goal: Your Growth.
                            </p>
                        </div>
                        <HasLink to="/AboutUs#Strength" className="px-10 py-4 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 shadow-lg inline-block">
                            Meet The Experts
                        </HasLink>
                    </div>
                    <div className="order-1 md:order-2">
                        <img src={STRENGTH_IMG} alt="Collaboration" className="rounded-[3rem] shadow-2xl h-[500px] w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            {/*<footer className="bg-gray-900 text-gray-400 py-20 px-4 md:px-8 border-t border-gray-800">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-16">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black text-white">GRRT</h2>
                        <p className="text-sm leading-relaxed italic">"Excellence in every placement, integrity in every partnership."</p>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer text-white">FB</div>
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer text-white">LN</div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Quick Links</h3>
                        <ul className="space-y-4 text-sm">
                            <li><HasLink to="/#top" className="hover:text-emerald-400 transition-colors">Home</HasLink></li>
                            <li><HasLink to="/AboutUs#_top" className="hover:text-emerald-400 transition-colors">About Us</HasLink></li>
                            <li><HasLink to="/Services#_top" className="hover:text-emerald-400 transition-colors">Our Services</HasLink></li>
                            <li><HasLink to="/Jobs" className="hover:text-emerald-400 transition-colors">Career Portal</HasLink></li>
                        </ul>
                    </div>

                    <div className="space-y-6 text-sm">
                        <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Reach Us</h3>
                        <div className="flex items-start gap-4">
                            <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                            <p>Unit C, 2/F, Burke House Bldg. 2439 Pedro Gil St., Sta. Ana, Manila</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                            <p>(+63) 02-8756-7656</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                            <p>contact@grrt-services.ph</p>
                        </div>
                    </div>

                    <div>
                        <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700">
                            <h3 className="text-white font-bold mb-6">Send an Inquiry</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Name" className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none transition-all" required />
                                <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Email" className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none transition-all" required />
                                <textarea name="message" onChange={handleChange} value={formData.message} placeholder="How can we help?" className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-sm h-24 outline-none focus:border-emerald-500 transition-all" required />
                                <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all">
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 text-center text-xs uppercase tracking-widest text-gray-600">
                    &copy; 2026 GRRT Recruitment Services. All Rights Reserved.
                </div>
            </footer>*/}
        </main>
    );
};

export default App;