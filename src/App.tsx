// src/App.tsx
import React from 'react';
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
  return (    
    <Router>
      <UserProvider>
        <div className="w-full max-w-7xl mx-auto pt-28 px-4 min-h-screen flex flex-col bg-gray-50">
          <ScrollToTop />
          <TawkChat />
          <NavBar />
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

            {/* Dynamic route for Client Endorsement by candidate ID */}
            <Route path="/candidateProfile/:id" element={<CandidateProfile />} />
            {/*<Route path="*" element={<NotFound />} />*/}
            {/* Authenticated Pages with NavBar */}
            {/*<Route element={<AppLayout />}>
              <Route path="/Home" element={<Home />} />
            </Route>*/}
          </Routes>
          <Footer />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
