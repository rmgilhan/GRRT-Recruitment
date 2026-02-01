// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import NavBar from "./components/navBar";
import Footer from "./components/footer";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Users from "./pages/AdminUsers";
import Jobs from "./pages/JobsPage";
import LinkedlnSearch from "./pages/LinkedlnPageSearch";
import Candidates from "./pages/Candidates";
import CandidateProfile from "./pages/CandidateProfile";
import { UserProvider } from '@context/UserContext';
import TawkChat from './components/TawkChat';

function App() {
  useEffect(() => {
    // Fire and forget: Wake up the Render instance immediately
    const wakeServer = async () => {
      // Use env variable if available, otherwise fallback to the hardcoded URL
      const apiUrl = import.meta.env.VITE_API_URL || "https://grrt-backend.onrender.com";
      
      try {
        // Pinging a public route to trigger the Render "Cold Start" wake-up
        await fetch(`${apiUrl}/GRRT/jobs`); 
        console.log("Backend warming up...");
      } catch (err) {
        // We don't need to alert the user here, this is just a background task
        console.warn("Backend warm-up ping initiated.");
      }
    };

    wakeServer();
  }, []);

  return (    
    <Router>
      <UserProvider>
        {/* Added h-full and flex-grow to ensure footer stays at the bottom */}
        <div className="w-full max-w-7xl mx-auto pt-28 px-4 min-h-screen flex flex-col bg-gray-50">
          <ScrollToTop />
          <TawkChat />
          <NavBar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/Services" element={<Services />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/Jobs" element={<Jobs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/LinkedlnSearch" element={<LinkedlnSearch />} />
              <Route path="/Candidates" element={<Candidates />} />
              <Route path="/candidateProfile/:id" element={<CandidateProfile />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;