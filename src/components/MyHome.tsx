import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Users, RefreshCw } from 'lucide-react';

// External, responsive placeholder images and icon paths
const PLACEHOLDER_IMG = 'https://placehold.co/600x400/10B981/ffffff?text=';
const HANDSHAKE_IMG = `https://images.unsplash.com/photo-1758518729706-b1810dd39cc6?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;

const STRENGTH_IMG = `https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
const ABOUT_IMG = `https://plus.unsplash.com/premium_photo-1658507041186-07e5948b4f69?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;

/**
 * Main application component for the landing page.
 * Uses Tailwind CSS for styling and responsiveness.
 */
const App = () => {
    // Simple state for the contact form (for demonstration)
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showJobs, setShowJobs] = useState(false);
    
    const navigate = useNavigate(); // ✅ Hook for routing
  	
  	 // ✅ Function to handle "Find Jobs" click
  	const handleFindJobs = () => {
    // Save a temporary flag (Navbar can check this)
    localStorage.setItem("showJobsMenu", "true");

    // Navigate to the Jobs page
    navigate("/Jobs");
  	};

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission logic
        console.log('Form Submitted:', formData);
        
        // In a real application, you would send data to a backend (like Firestore) here.
        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
            alert('Thank you for your message! We will be in touch shortly.');
        }, 1500);
    };

    const ServiceCard = ({ icon: Icon, title, description }) => (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl hover:shadow-emerald-300 transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center h-full">
            <div className="bg-emerald-100 p-4 rounded-full mb-6">
                <Icon className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">{title}</h3>
            <p className="text-gray-600 mb-6 flex-grow">{description}</p>
            <button
                type="button"
                className="bg-emerald-600 shadow-lg text-white py-2 px-8 rounded-full mt-4 hover:bg-emerald-700 transition-colors text-sm font-semibold"
            >
                Learn More
            </button>
        </div>
    );

	return (
		<main className="antialiased text-gray-800 bg-gray-50">
            {/* Hero Section */}
			<section className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					{/* Text Content (Order 2 on mobile, 1 on desktop) */}
					<div className="order-2 md:order-1 text-emerald-700 text-center md:text-left">
					  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-4">
					    <span className="block text-shadow-lg">Finding Right Talent</span>
					    <span className="block text-amber-500 mt-2 text-shadow-emboss">Build Your Future.</span>
					  </h1>

					  <p className="text-lg md:text-xl lg:text-2xl mt-6 md:mt-8 max-w-xl mx-auto md:mx-0 leading-relaxed text-gray-600">
					    We connect <strong>skilled professionals</strong> with top companies to create <strong>long-lasting careers</strong> in the Philippines.
					  </p>

					  <div className="flex mt-10 md:mt-12 justify-center md:justify-start">
					    <button
					      type="button"
					      onClick={handleFindJobs} // ✅ Now it triggers navigation and flag
					      className="text-lg bg-amber-500 text-white font-semibold shadow-xl py-3 px-10 rounded-full hover:bg-amber-600 transition-all duration-200 hover:scale-105"
					    >
					      Find Jobs
					    </button>
					  </div>
					</div>

                    {/* Image (Order 1 on mobile, 2 on desktop) */}
					<div className="order-1 md:order-2 flex justify-center pt-8 md:pt-0">
						<img src={HANDSHAKE_IMG} alt="Professional handshake" className="rounded-3xl shadow-2xl max-w-full h-auto object-cover" />
					</div>
				</div>
			</section>

            {/* About / Who We Are Section */}
			<section className="bg-amber-50 py-16 md:py-24 px-4 md:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image (Order 1 on mobile, 2 on desktop) */}
				    <div className="order-1 md:order-2 flex justify-center">
					    <img src={ABOUT_IMG} alt="Our team collaborating" className="rounded-3xl shadow-2xl max-w-full h-auto object-cover" />
				    </div>
                    {/* Text Content (Order 2 on mobile, 1 on desktop) */}
				    <div className="order-2 md:order-1 text-gray-700">
						<h2 className="text-3xl md:text-5xl font-extrabold text-emerald-800 mb-6">About / Who We Are</h2>
						<p className="text-lg leading-relaxed text-gray-600 mb-8">
						At **GRRT Recruitment Services**, we transform recruitment in the Philippines. 
						We provide tailored solutions, innovative strategies, and build meaningful, 
						long-term relationships with clients, partners, and talent across various industries.
						</p>
						<Link
						  to="AboutUs#Mission"
						 className="bg-amber-500 text-white font-semibold shadow-xl py-3 px-8 rounded-full hover:bg-amber-600 transition-colors"
						>
							Discover Our Mission
						</Link>
				    </div>
                </div>
			</section>

            {/* Services Section */}
			<section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-emerald-700">
				<h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12 md:mb-16 text-emerald-800">Our Services</h2>
				
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<ServiceCard
                        icon={Briefcase}
                        title="Business Consultancy"
                        description="Smart solutions to help you start and grow your business—even on a limited budget. We guide your strategic path to success."
                    />
                    <ServiceCard
                        icon={Users}
                        title="Head Hunting"
                        description="Connecting you with top local and global talent to build your dream team. We find the perfect match for your specialized needs."
                    />
                    <ServiceCard
                        icon={RefreshCw}
                        title="Business Continuity"
                        description="Keeping your business running smoothly and resilient in uncertain times. We ensure stability and operational excellence through careful planning."
                    />
				</div>
			</section>

            {/* Our Strength & Team Section */}
			<section className="bg-white py-16 md:py-24 px-4 md:px-8 border-t border-gray-200">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Text Content (Order 2 on mobile, 1 on desktop) */}
                    <div className="order-2 md:order-1 text-gray-700">
						<h2 className="text-3xl md:text-5xl font-extrabold text-emerald-800 mb-8">Our Strength</h2>
						<p className="text-lg leading-relaxed text-gray-600 mb-10">
						We combine **global best practices**, deep industry knowledge, and a flexible 
						service model to deliver recruitment solutions that truly fit our clients’ needs.
						Our commitment to continuous improvement ensures top performers, 
						innovative thinkers, and exceptional results.
						</p>
						
                        <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-800 mb-8 mt-12">Our Team</h2>
						<p className="text-lg leading-relaxed text-gray-600 mb-10">
						Our dedicated team bridges the gap between skilled professionals and leading 
						companies. With **focus, clear communication, accountability, and respect for 
						diversity**, we deliver recruitment solutions that make a real impact.
						</p>
						<Link
							to="/AboutUs#Strength"
							className="bg-emerald-600 text-white font-semibold shadow-xl py-3 px-8 rounded-full hover:bg-emerald-700 transition-colors"
						>
							Meet The Experts
						</Link>
				    </div>
                    {/* Image (Order 1 on mobile, 2 on desktop) */}
                    <div className="order-1 md:order-2 flex justify-center">
                        <img src={STRENGTH_IMG} alt="Team collaboration" className="rounded-3xl shadow-2xl max-w-full h-auto object-cover" /> 	
                    </div>
                </div>
			</section>

            {/* Contact & Footer Section */}
			<footer className="bg-gray-800 text-white py-16 md:py-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
			        {/* Column 1 - Visit Us & Map */}
			        <div className="inter">
			        	<h3 className="text-2xl font-bold mb-4 border-b border-emerald-600 pb-2">Visit Us</h3>
			        	<h4 className="text-lg font-medium text-emerald-400 mt-6">Office Address</h4>
			        	<p className="text-gray-300 mt-2 leading-relaxed">
			        	Unit C, 2/F, Burke House Bldg. 2439 Pedro Gil St., Sta. Ana, Manila, Philippines, 1009
			        	</p>
			        	<h4 className="text-lg font-medium text-emerald-400 pt-6">Office Hours</h4>
			        	<p className="text-gray-300 mt-2">
			        	Mon-Fri - 9:00 AM - 6:00 PM
			        	</p>
			        	<iframe
			        	  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.46894886174!2d121.00992497492363!3d14.581915585902168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9c13aff0a45%3A0x372eb70b1bb41225!2sBurke%20House%20No.%205%20Building!5e1!3m2!1sen!2sph!4v1758929716417!5m2!1sen!2sph"
			        	  width="100%"
			        	  height="200"
			        	  style={{ border: 0 }}
			        	  allowFullScreen=""
			        	  loading="lazy"
			        	  referrerPolicy="no-referrer-when-downgrade"
			        	  className="mt-6 rounded-lg shadow-xl"
			        	></iframe>
			        </div>

			        {/* Column 2 - Contact Us */}
			        <div className="inter">
			        	<h3 className="text-2xl font-bold mb-4 border-b border-emerald-600 pb-2">Contact Us</h3>
			        	<h4 className="text-lg font-medium text-emerald-400 mt-6">Phone</h4>
			        	<p className="text-gray-300 mt-2">(+63) 02-8756-7656</p>
			        	<p className="text-gray-300 mb-4">(+63) 02-8425-3262</p>
			        	<h4 className="text-lg font-medium text-emerald-400 pt-2">Mobile</h4>
			        	<p className="text-gray-300 mt-2">0921-583-8157</p>
			        </div>

			        {/* Column 3 - Tell Us Form */}
			        <div className="inter">
			        	<h3 className="text-2xl font-bold mb-4 border-b border-emerald-600 pb-2">Send Us a Message</h3>
			        	<form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-700 p-6 rounded-xl shadow-2xl">
			        	 	<input
			        	 	 	type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
			        	 		placeholder="Your Name"
			        	 		className="border-gray-600 bg-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
			        	 	/>
			        	 	<input
			        	 	 	type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
			        	 		placeholder="Your Email"
			        	 		className="border-gray-600 bg-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
			        	 	/>
			        	 	<input
			        	 	 	type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
			        	 		placeholder="Subject"
			        	 		className="border-gray-600 bg-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
			        	 	/>
			        	 	<textarea
			        	 	 	rows={4}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
			        	 		placeholder="Your message..."
			        	 		className="border-gray-600 bg-gray-600 text-white rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
			        	 	></textarea>

			        	 	<button
			        	 	 	type="submit"
			        	 	 	className={`mt-2 py-3 px-4 rounded-full font-bold transition-colors ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600'}`}
                                disabled={isSubmitting}
			        	 	>
			        	 	 	{isSubmitting ? 'Sending...' : 'Send Message'}
			        	 	</button>
			        	</form>
			        </div>
                </div>
                
			</footer>
		</main>
	);
};

export default App;
