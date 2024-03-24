import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import './ProfilePage.css';
import "aos/dist/aos.css";
AOS.init({
  duration: 2000,
});

const LandingPage = () => {
  return (
    <div className="row landing">
      <div className="col-md-12 text-center landingBox">
        <h2 className="heading" data-aos="zoom-in">
          MY ROOMS BOOKING
        </h2>
        <h1 data-aos="zoom-out" style={{ color: "white" }}>
          There is only one boss. The Guest.
        </h1>
        <Link to="/home" className="btnlink">
          <button data-aos="zoom-out" className="btn btn-primary landingBtn">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
