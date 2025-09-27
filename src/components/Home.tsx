import React from 'react';
import handShake from "../assets/handshake.jpg"
import ourTeam from "../assets/Team.jpeg"
import Bconsultancy from "../assets/conversation.png"
import HeadHunting from "../assets/headhunting.png"
import Bcontinuity from "../assets/pdca.png"
import Team from "../assets/OurTeam.jpg"

export default function Home() {
	return(
		<main>	
			<div className="grid grid-cols-1 md:flex md:flex-row md:mx-[5%]">
				<div className="col-span-1 flex justify-center items-center md:flex md:flex-row order-1 md:order-2 w-full md:w-1/2 mt-[20%] md:my-[10%]">
					<img src={handShake} className="rounded-2xl shadow w-5/6 md:w-full" />
				</div>
				<div className="text-emerald-700 my-[2%] md:my-[10%] w-full md:w-1/2 px-4 order-2 md:order-1">
					<h1 className="text-step-3 md:text-6xl inter font-bold text-center mt-6 md:my-4 text-shadow-lg">Finding Right Talent</h1>
					<h1 className="text-step-3 md:text-6xl inter font-bold text-center text-shadow-lg md:mb-8">Build Your Future.</h1>
					<p className="text-lg md:text-2xl openSans mt-4 md:mt-12 ms-8 leading-8">
					We connect professional with top companies to create long lasting careers.
					</p>
					<div className="flex mt-8 md:mt-16 justify-center gap-4 openSans">
						<button
						 type="button"
						 className="text-base md:text-lg bg-amber-500 text-white font-semibold  shadow-lg py-2 px-6 rounded-3xl hover:bg-amber-600"
						>
						Find Jobs		
						</button>
						<button
						 type="button"
						 className="text-base md:text-lg bg-gray-200 text-emerald-800 font-semibold shadow-lg py-2 px-6 rounded-3xl hover:bg-gray-300"
						>
						Hire Talents		
						</button>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 md:mx-[4%] md:mb-[2%]">
				<div className="col-span-1 flex justify-center items-center md:flex md:flex-row order-1 md:order-2 w-full md:w-5/6 mt-[20%] md:my-[4%]">
					<img src={ourTeam} className="rounded-2xl shadow w-3/4" />
				</div>
				<div className="order-2 md:order-1 my-2 md:my-10 md:mx-[2%] text-base md:text-lg leading-7 md:leading-8">
						<h3 className="text-3xl md:text-4xl font-bold text-emerald-700 ps-4 md:ps-8  py-6 md:py-2 mt-8 inter">About / Who We Are</h3>
						<p className="md:mt-8 w-full px-4 md:ps-8 text-emerald-700 openSans">
						At GRRT Recruitment Services, we transform recruitment in the Philippines. 
						We provide tailored solutions, innovative strategies, and build meaningful, 
						long-term relationships with clients, partners, and talent.	
						</p>
						<button
						 type="button"
						 className="bg-emerald-600 shadow-lg text-white py-1 px-6 rounded-3xl mt-10 ms-4 md:ms-8 hover:bg-emerald-800"
						>
							Learn more
						</button>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:mx-[6%] md:mb-[4%] text-emerald-700">
				<div className="col-span-3 my-8 mx-6">

					<h3 className="text-3xl text-left md:text-4xl font-bold py-2 mt-6 inter">Our Services</h3>
				</div>
				<div className="px-4 col-span-3 md:col-span-1 text-center md:text-left mb-8">
					
					<img src={Bconsultancy} className="mx-[20%] mx-auto w-1/6 md:w-1/5" />
					<h3 className="text-2xl md:text-3xl inter font-semibold">Business Consultancy</h3>
					<p className="text-base md:text-lg openSans leading-7 md:leading-8 py-8">
						Smart solutions to help you start and grow your business—even on a limited 
						budget.
					</p>
					<button
					 type="button"
					 className="bg-emerald-600 shadow-lg text-white py-2 px-6 rounded-3xl mt-10 ms-4 md:ms-8 hover:bg-emerald-800"
					>
						Learn more
					</button>
				</div>

				<div className="px-4 col-span-3 md:col-span-1 text-center md:text-left mb-8">
					<img src={HeadHunting} className="mx-[20%] mx-auto w-1/6 md:w-1/5" />
					<h3 className="text-2xl md:text-3xl inter font-semibold">Head Hunting</h3>
					<p className="text-base md:text-lg openSans leading-7 md:leading-8 py-8">
						Connecting you with top local and global talent to build your dream team.
					</p>
					<button
					 type="button"
					 className="bg-emerald-600 shadow-lg text-white py-2 px-6 rounded-3xl mt-10 ms-4 md:ms-8 hover:bg-emerald-800"
					>
						Learn more
					</button>	
				</div>

				<div className="px-4 col-span-3 md:col-span-1 text-center md:text-left">
					<img src={Bcontinuity} className="mx-[20%] mx-auto w-1/6 md:w-1/5" />
					<h3 className="text-2xl md:text-3xl inter font-semibold">Business Continuity</h3>
					<p className="text-base md:text-lg openSans leading-7 md:leading-8 py-8">
						Keeping your business running smoothly and resilient in uncertain times.
					</p>
					<button
					 type="button"
					 className="bg-emerald-600 shadow-lg text-white py-2 px-6 rounded-3xl mt-10 ms-4 md:ms-8 hover:bg-emerald-800"
					>
						Learn more
					</button>	
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 md:mx-[8%] md:mb-[2%] gap-4">
				<div className="col-span-1 flex justify-center items-center md:flex md:flex-row order-1 md:order-2 mt-[20%] md:my-[4%]">
					<img src={Team} className="rounded-2xl w-5/6" /> 	
				</div>
				<div className="text-base md:text-lg leading-7 md:leading-8 text-emerald-700 order-2 md:order-1 text-center md:text-left mt-[4%]">
					<h3 className="text-3xl md:text-4xl font-bold inter">Our Strength</h3>
					<p className="my-8 text-left ps-4">
					We combine global best practices, deep industry knowledge, and a flexible 
					service model to deliver recruitment solutions that truly fit our clients’ needs.
					Our commitment to continuous improvement ensures top performers, 
					innovative thinkers, and exceptional results.	
					</p>
					<h3 className="text-3xl md:text-4xl font-bold inter">Our Team</h3>
					<p className="mt-8 text-left ps-4">
					Our dedicated team bridges the gap between skilled professionals and leading 
					companies. With focus, clear communication, accountability, and respect for 
					diversity, we deliver recruitment solutions that make a real impact.
					</p>
					<button
						 type="button"
						 className="bg-emerald-600 shadow-lg text-white py-1 px-6 rounded-3xl mt-10 ms-2 hover:bg-emerald-800"
						>
							Learn more
					</button>
				</div>		
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:mx-[6%]">
			  {/* Column 1 - Visit Us */}
			  <div className="text-emerald-700 ps-2 inter">
			    <h3 className="text-xl md:text-2xl font-bold mb-2 pb-4">Visit Us</h3>
			    <h4 className="text-md md:text-lg font-medium text-emerald-700">Office Address</h4>
			    <p className="text-emerald-800 mt-1 openSans pt-2">
			      Unit C, 2/F, Burke House Bldg. 2439 Pedro Gil St., Sta. Ana, Manila, Philippines, 1009
			    </p>
			    <h4 className="text-md md:text-lg font-medium text-emerald-700 pt-4">Office Hours</h4>
			    <p className="text-emerald-800 mt-1 openSans leading-7 md:leading-8 md:pb-8">
			      Mon-Fri - 9:00AM - 6:00AM
			    </p>
			    <iframe
			      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.46894886174!2d121.00992497492363!3d14.581915585902168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9c13aff0a45%3A0x372eb70b1bb41225!2sBurke%20House%20No.%205%20Building!5e1!3m2!1sen!2sph!4v1758929716417!5m2!1sen!2sph"
			      width="100%"
			      height="200"
			      style={{ border: 0 }}
			      allowFullScreen=""
			      loading="lazy"
			      referrerPolicy="no-referrer-when-downgrade"
			      className="mt-4 rounded shadow"
			    ></iframe>
			  </div>

			  {/* Column 2 - Contact Us */}
			  <div className="text-emerald-700 ps-4 inter">
			    <h3 className="text-xl md:text-2xl font-bold mb-2 pb-4">Contact Us</h3>
			    <h4 className="text-md md:text-lg font-medium text-emerald-700">Phone</h4>
			    <p className="text-emerald-600 openSans pt-4">(+63) 02-8756-7656</p>
			    <p className="text-emerald-600 mb-2 openSans">(+63) 02-8425-3262</p>
			    <h4 className="text-md md:text-lg font-medium text-emerald-700 pt-2">Mobile</h4>
			    <p className="text-emerald-600 openSans leading-8">0921-583-8157</p>
			  </div>

			  {/* Column 3 - Tell Us Form */}
			  <div className="text-emerald-700 ps-2 inter">
			    <h3 className="text-xl md:text-2xl font-bold mb-2 pb-2">Tell Us</h3>
			    <form className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6">
			      <div className="flex flex-col">
			        <label className="text-sm font-medium text-emerald-700 mb-1">Name</label>
			        <input
			          type="text"
			          placeholder="Your name"
			          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
			        />
			      </div>

			      <div className="flex flex-col">
			        <label className="text-sm font-medium text-emerald-700-700 mb-1">Email</label>
			        <input
			          type="email"
			          placeholder="Your email"
			          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
			        />
			      </div>

			      <div className="flex flex-col">
			        <label className="text-sm font-medium text-emerald-700 mb-1">Subject</label>
			        <input
			          type="text"
			          placeholder="Subject"
			          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
			        />
			      </div>

			      <div className="flex flex-col">
			        <label className="text-sm font-medium text-emerald-700 mb-1">Message</label>
			        <textarea
			          rows={4}
			          placeholder="Your message..."
			          className="border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
			        ></textarea>
			      </div>

			      <button
			        type="submit"
			        className="mt-2 bg-emerald-600 text-white py-2 px-4 rounded-3xl hover:bg-emerald-700 transition-colors mx-[25%]"
			      >
			        Send Message
			      </button>
			    </form>
			  </div>
			</div>
		</main>
	)
}
