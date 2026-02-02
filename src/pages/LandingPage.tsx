import React from 'react';
import Home from '../components/MyHome';
import SEO from '../components/SEO'; // Import your new component

export default function LandingPage() {
	return (
	<>
		<SEO 
		  title="Home" 
		  description="Connecting top talent with leading companies in the Philippines."
		  image="https://grrt-recruitment.vercel.app/social-preview.jpg" 
		/>
		<Home />
	</>		
	); 	
}