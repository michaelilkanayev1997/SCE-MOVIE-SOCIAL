import React from "react";
import "../scss/footer.scss";
import { Link } from "react-router-dom";
import bg from "../assets/footer-bg.jpg";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo"></div>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">Home</Link>
            <Link to="/termsandpolicies">Terms and Policies</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/aboutus">About us</Link>
            <Link to="/contactus">Contact us</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/faq">FAQ</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
      <div className="last">
        &copy;{new Date().getFullYear()} SCE MOVIE SOCIAL - All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
