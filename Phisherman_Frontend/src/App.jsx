import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import PhishingDetector from "./pages/PhishingDetector";
import Login from "./pages/Login";
import Forum from "./pages/Forum";
import SignUp from "./pages/SignUp";
import RealityMode from "./pages/RealityMode";
import AboutUs from "./pages/AboutUs";
import NavBar from "./components/NavBar";
import "./App.css";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<PhishingDetector />} />
          <Route path="/predict" element={<PhishingDetector />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/education" element={<RealityMode />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
