import React, { useState } from "react";
import "../styles/landingPage.css";
import pic1 from "../Assets/1.jpg";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import "../styles/register.css";

const LandingPage = () => {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  return (
    <>
      <header>
        <img src={logo} alt="logo" className="logo" />
        <div className="toggle" onClick={toggleNav}></div>
        <nav className={navActive ? "active" : ""}>
          <ul className="navitem">
            <li>
              <a href="tel:+91 95000 95000">
                <button className="btn btn-light">
                  <i className="fa-solid fa-phone"></i> Inquiry
                </button>
              </a>
            </li>
            <li>
              <Link to="/register">
                <button className="btn btn-light">Register Now</button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <img src={pic1} alt="main" className="img1" />
        <div className="overlay"></div>
        <div className="text">
          <h2>Welcome to Blissful Yoga</h2>
          <h3>Discover Peace, Balance, and Wellness</h3>
          <p>
            Experience the transformative power of yoga. Join our community and
            embark on a journey to a healthier, happier you.
          </p>
          <button className="textoverflow">Explore</button>
        </div>
        <ul className="social_icons">
          <li>
            <a href="https://www.facebook.com/groups/habuild/">
              <img src="https://i.ibb.co/x7P24fL/facebook.png" alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="https://x.com/Yoga_Journal?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
              <img src="https://i.ibb.co/Wnxq2Nq/twitter.png" alt="Twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/yoga/">
              <img
                src="https://i.ibb.co/ySwtH4B/instagram.png"
                alt="Instagram"
              />
            </a>
          </li>
        </ul>
      </main>
    </>
  );
};

export default LandingPage;
