// Footer.jsx
import React from "react";
import "../css/Footer.css";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { href: "https://www.facebook.com/campusconnectofficial/", icon: <Facebook size={24} /> },
    { href: "https://x.com/CampusConnectTeam", icon: <Twitter size={24} /> },
    { href: "https://www.instagram.com/CampusConnectOfficial/#", icon: <Instagram size={24} /> },
    { href: "https://linkedin.com", icon: <Linkedin size={24} /> },
    { href: "https://github.com", icon: <Github size={24} /> },
  ];

  // Internal links using React Router
  const productLinks = [
    { name: "Home", to: "/" },
    { name: "EventDetail", to: "/event" },
    { name: "EventsCalendar", to: "/eventcalendar" },
    { name: "Gallery", to: "/gallery" },
  ];

  const usefulLinks = [
    { name: "About", to: "/about" },
    { name: "Register", to: "/register" },
    { name: "FeedBack", to: "/feedback" },
    { name: "Contact Us", to: "/contact" },
  ];

  const contactInfo = [
    { icon: <MapPin size={20} />, text: "New York, NY 10012, US" },
    {
      icon: <Mail size={20} />,
      text: "info@campusconnect.com",
      href: "mailto:info@campusconnect.com",
    },
    {
      icon: <Phone size={20} />,
      text: "+1 234 567 890",
      href: "tel:+1234567890",
    },
  ];

  return (
    <footer
      // style={{
      //   backgroundColor: "#071a3b",
      //   color: "#fff",
      //   padding: "40px 20px",
      // }}
    >
      {/* Social Section */}
      <section
        className="d-flex justify-content-center justify-content-lg-between p-1 border-bottom"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="me-4 text-reset"
              style={{ color: "#ffffff", transition: "color 0.3s" }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </section>

      {/* Main Content Section */}
      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            {/* Company Info */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-3">
              <h5
                className="text-uppercase fw-bold mb-4"
                style={{ color: "#ffffff" }}
              >
                CampusConnect
              </h5>
              <p style={{ color: "#ffffff" }}>
                Campus Connect is your gateway to all campus events, news, and
                updates. Stay informed, stay engaged, and be part of our vibrant
                student community.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: "#ffffff" }}
              >
                Quick Links
              </h6>
              {productLinks.map((product, index) => (
                <p key={index}>
                  <Link
                    to={product.to}
                    className="text-reset"
                    style={{ color: "#ffffff", textDecoration: "none" }}
                  >
                    {product.name}
                  </Link>
                </p>
              ))}
            </div>

            {/* Useful Links */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: "#ffffff" }}
              >
                Useful Links
              </h6>
              {usefulLinks.map((link, index) => (
                <p key={index}>
                  <Link
                    to={link.to}
                    className="text-reset"
                    style={{ color: "#ffffff", textDecoration: "none" }}
                  >
                    {link.name}
                  </Link>
                </p>
              ))}
            </div>

            {/* Contact Info */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: "#ffffff" }}
              >
                Contact
              </h6>
              {contactInfo.map((info, index) => (
                <p
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#ffffff",
                  }}
                >
                  {info.icon}
                  <span style={{ marginLeft: "10px" }}>
                    {info.href ? (
                      <a
                        href={info.href}
                        style={{ color: "#ffffff", textDecoration: "none" }}
                      >
                        {info.text}
                      </a>
                    ) : (
                      info.text
                    )}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div
        className="text-center p-4"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          fontSize: "14px",
          color: "#ffffff",
          opacity: 0.8,
        }}
      >
        © 2025 Copyright:
        <Link
          to="/"
          className="text-reset fw-bold"
          style={{ marginLeft: "5px", color: "#ffffff", textDecoration: "none" }}
        >
          CampusConnect.com
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

