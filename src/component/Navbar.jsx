import React, { useState } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="logo-link">
        <div className="logo">
          <div className="logo-icon">CC</div>
          <div className="logo-text">Campus Connect</div>
        </div>
      </Link>

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Nav Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/event">EventsDetail</Link></li>
        <li><Link to="/eventcalendar">EventsCalendar</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        {/* <li><Link to="/bookmark">Bookmarks</Link></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
