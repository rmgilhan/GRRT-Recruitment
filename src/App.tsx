// src/App.tx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NavBar from "./components/navBar"
import Footer from "./components/footer"

function App() {
  return (
      <Router>
        <div className="w-full max-w-7xl mx-auto pt-28 px-4 min-h-screen flex flex-col bg-gray-50">
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />

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