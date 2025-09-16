import React, { useEffect, useRef, useState } from "react";
import "../css/Home.css";
import "../css/Modal.css";
import slides from "../data/slides.json";
import testimonials from "../data/testimonials.json";
import faculty from "../data/faculty.json";
import upcomingevents from "../data/upcomingevents.json";
import Countdown from "../component/Countdown";
import { Link, useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toggleBookmark, isBookmarked } from "../utils/bookmarkUtils";
import useDocumentTitle from "../Hooks/useDocumentTitle";


const Home = () => {
  
  useDocumentTitle("Home - CampusConnect");
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [, setTimeLeft ] = useState({});
  const [showModal, setShowModal] = useState(true);

  //  input name aur confirmed name alag state
  const [username, setUsername] = useState(""); 
  const [savedName, setSavedName] = useState(""); 
  const [userType, setUserType] = useState("");
  const [error, setError] = useState(""); 

  useEffect(() => {
    fetch("/upcomingevents.json")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  // live update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      const countdowns = {};
      events.forEach((event) => {
        countdowns[event.title] = getCountdown(event.date);
      });
      setTimeLeft(countdowns);
    }, 1000);

    return () => clearInterval(timer);
  }, [events]);

  const getCountdown = (eventDate) => {
    const eventTime = new Date(eventDate).getTime();
    const now = new Date().getTime();
    const diff = eventTime - now;

    if (diff <= 0) return "Event Started!";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
  };

  // Stats counters
  const stats = [
    { label: "Events Organized", target: 120 },
    { label: "Students Registered", target: 5000 },
    { label: "Faculty Coordinators", target: 200 },
    { label: "Universities Connected", target: 50 },
  ];
  const [counters, setCounters] = useState(stats.map(() => 0));
  const countersRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = countersRef.current.indexOf(entry.target);
            animateCounter(index, stats[index].target, 1200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    countersRef.current.forEach((el) => el && observer.observe(el));
  }, []);

  const animateCounter = (index, end, duration) => {
    let start = 0;
    const stepTime = Math.max(Math.floor(duration / end), 10);
    const inc = Math.max(1, Math.floor(end / (duration / stepTime)));
    const timer = setInterval(() => {
      start += inc;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCounters((prev) => {
        const newVals = [...prev];
        newVals[index] = start;
        return newVals;
      });
    }, stepTime);
  };

  // Regex validation function
  const validateName = (name) => {
    const regex = /^[A-Za-z\s]+$/; 
    if (!regex.test(name)) {
      setError("Name must contain only alphabets.");
      return false;
    }
    setError("");
    return true;
  };

  // Handle save
  const handleSave = () => {
    if (username.trim() && validateName(username)) {
      setSavedName(username); 
      setShowModal(false); 
    }
  };

  // Live input validation
  const handleChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    validateName(value);
  };

  return (
    <main id="home">
      {/* ---------------- Modal ---------------- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Welcome to CampusConnect</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={handleChange} 
            />
            {error && <p className="input-error">{error}</p>}
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="">Select user type</option>
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
              <option value="Guest">Guest</option>
            </select>
            <button onClick={handleSave} disabled={!!error || !username.trim()}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* ----------------------- Welcome Section ----------------------- */}
      <section className="home-welcome-section">
        <h1 className="home-welcome-subtitle mt-3">
          {savedName
            ? `Welcome ${savedName} As A ${userType} To CampusConnect`
            : "Welcome to Campus Connect"}
        </h1>
         {/* <p className="home-welcome-subtitle">
          Event Hub – Stay Updated, Stay Involved!
        </p>  */}
      </section>

      {/* ----------------------- Banner Section ----------------------- */}
      <div className="home-banner-wrapper">
        <div
          id="homeCarousel"
          className="carousel slide home-banner"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {slides.map((_, i) => (
              <button
                type="button"
                key={i}
                data-bs-target="#homeCarousel"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-current={i === 0 ? "true" : undefined}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="carousel-inner">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`carousel-item ${i === 0 ? "active" : ""}`}
              >
                <div
                  className="carousel-img"
                  style={{
                    backgroundImage: `url(${slide.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "500px",
                    position: "relative",
                  }}
                >
                  <div className="carousel-overlay"></div>
                  <div className="carousel-caption d-none d-md-block">
                    <h2>{slide.title}</h2>
                    <p>{slide.desc}</p>
                    {i === 0 && (
                      <Link to="/event">
                        <button className="home-slide-btn">Explore Now</button>
                      </Link>
                    )}
                    {i === 1 && (
                      <Link to="/register">
                        <button className="home-slide-btn">Join Us</button>
                      </Link>
                    )}
                    {i === 2 && (
                      <Link to="/contact">
                        <button className="home-slide-btn">Contact Us</button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* ----------------------- Upcoming Events ----------------------- */}
      <section className="home-events-section">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="event-grid">
          {upcomingevents.map((event, index) => (
            <EventCard key={index} event={event} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* ----------------------- About Section ----------------------- */}
      <section id="about" aria-labelledby="aboutTitle">
        <h2 id="aboutTitle" className="home-section-title">
          About Campus Connect
        </h2>
        <div className="home-about-card">
          <p>
            Campus Connect is the ultimate platform to discover, organize, and
            participate in university events. We help students, staff and guests
            connect with campus life via event calendars, registration,
            volunteer programs and live updates. Our goal is to build stronger
            campus communities across institutions.
          </p>
          <div className="home-about-grid">
            <div className="home-about-item">
              <strong>Who we serve</strong>
              <div className="home-muted">Students • Staff • Guests</div>
            </div>
            <div className="home-about-item">
              <strong>Why use it</strong>
              <div className="home-muted">
                Centralized events & easy registration
              </div>
            </div>
            <div className="home-about-item">
              <strong>How it works</strong>
              <div className="home-muted">Browse, register & get reminders</div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------- Stats Section ----------------------- */}
      <section aria-labelledby="statsTitle">
        <h2 id="statsTitle" className="home-section-title">
          By The Numbers
        </h2>
        <div className="home-stats-grid">
          {stats.map((s, i) => (
            <div className="home-stat" key={i}>
              <h3 ref={(el) => (countersRef.current[i] = el)}>{counters[i]}</h3>
              <div className="home-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------- Testimonials ----------------------- */}
      <section aria-labelledby="testTitle">
        <h2 id="testTitle" className="home-section-title">
          Student Feedback
        </h2>
        <div className="home-testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="home-test-card" key={i}>
              <div className="home-author">
                <img className="home-avatar" src={t.img} alt={t.name} />
                <div>
                  <strong>{t.name}</strong>
                  <div className="home-muted">{t.role}</div>
                </div>
              </div>
              <p>"{t.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------- Faculty ----------------------- */}
      <section aria-labelledby="facultyTitle">
        <h2 id="facultyTitle" className="home-section-title">
          Meet Our Coordinators
        </h2>
        <div className="home-faculty-grid">
          {faculty.map((f, i) => (
            <div className="home-faculty-card" key={i}>
              <img
                src={f.image}
                alt={f.name}
                style={{
                  width: "110px",
                  height: "100px",
                  borderRadius: "50%",
                  display: "block",
                  margin: "0 auto 12px",
                }}
              />
              <strong>{f.name}</strong>
              <div className="home-muted">{f.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------- Gallery ----------------------- */}
      <section id="gallery" aria-labelledby="galleryTitle">
        <h2 id="galleryTitle" className="home-section-title">
          Event Gallery
        </h2>
        <div className="home-gallery-grid">
          <img src="WorkshopAI.jpg" alt="gallery1" />
          <img src="BasketballLeague.jpg" alt="gallery2" />
          <img src="BusinessStrategySummit.jpg" alt="gallery3" />
          <img src="DebateCompetition.jpg" alt="gallery4" />
        </div>
      </section>

      {/* ----------------------- Highlights ----------------------- */}
      <section aria-labelledby="highTitle">
        <h2 id="highTitle" className="home-section-title">
          Special Announcements
        </h2>
        <div className="home-highlights-grid">
          <div className="home-highlight">
            <h4>Annual Tech Competition</h4>
            <p className="home-muted">
              Register now for inter-university tech competitions next month —
              limited seats.
            </p>
          </div>
          <div className="home-highlight">
            <h4>Music Festival Tickets</h4>
            <p className="home-muted">
              Tickets going fast for the grand music festival at Lahore Stadium.
            </p>
          </div>
          <div className="home-highlight">
            <h4>Volunteer Call</h4>
            <p className="home-muted">
              Volunteer and earn certificates &amp; experience for your CV.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

// ---------------- EventCard Component with Bookmark ----------------
const EventCard = ({ event, navigate }) => {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(event.id));
  }, [event.id]);

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark(event);
    setBookmarked(isBookmarked(event.id));
  };

  return (
    <article className="home-event-card">
      <div className="home-event-media">
        <img src={event.image} alt={event.title} />
        <div className="bookmark-icon" onClick={handleBookmark}>
          {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </div>
      </div>
      <div className="home-venue-pill">{event.venue}</div>
      <div className="home-event-body">
        <h3>{event.title}</h3>
        <p className="home-muted">{event.description}</p>
        <div className="home-card-details">
          <span>
            {new Date(event.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span>{new Date(event.date).toDateString()}</span>
        </div>
        <Countdown date={event.date} />
        <button
          className="home-btn"
          onClick={() => navigate(`/upcoming/${event.id}`)}
        >
          Learn More
        </button>
      </div>
    </article>
  );
};

export default Home;
