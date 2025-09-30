// src/App.tx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NavBar from "./components/navBar"
import Footer from "./components/footer"
import Services from "./components/Services"
import AboutUs from "./components/AboutUs"
import Contact from "./components/Contact"

function App() {
  return (
      <Router>
        <div className="w-full max-w-7xl mx-auto pt-28 px-4 min-h-screen flex flex-col bg-gray-50">
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Contact" element={<Contact />} />

            {/* Authenticated Pages with NavBar */}
            {/*<Route element={<AppLayout />}>
              <Route path="/Home" element={<Home />} />
  ]          </Route>*/}
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;