import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import RegisterForm from "./component/Registerform";
import ParticlesComponent from "./component/Particles";
import "./App.css";
import RegisterUserDetails from "./component/RegisterUserDetails";

const App = () => {
  return (
    <Router>
      <div className="App">
        <ParticlesComponent id="particles" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/users" element={<RegisterUserDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
