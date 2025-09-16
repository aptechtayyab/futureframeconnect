import React from "react";
import "../css/About.css";
import Navbar from "../component/Navbar";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import eventsData from "../data/events.json"; // Import your events JSON

const About = () => {
  useDocumentTitle("About - CampusConnect");
  const eventsByYear = eventsData.events.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear();
    if (!acc[year]) acc[year] = 0;
    acc[year]++;
    return acc;
  }, {});

  const sortedYears = Object.keys(eventsByYear).sort((a, b) => b - a);
  return (
    <>
      <div className="about-page overflow-hidden">
        {/* Hero Section */}
        <section className="hero-sections d-flex align-items-center justify-content-center text-center text-white">
          <div className="hero-overlay p-4 rounded animate-fade">
            <h1 className="display-4 fw-bold">About CampusConnect</h1>
            <p className="lead">
              Connecting Students, Celebrating Events, Empowering Colleges
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="container-fluid py-5">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6 animate-slide">
              <img
                src="/main-banner1.jpg"
                alt="Campus Events"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-12 col-lg-6 animate-slide">
              <h2 className="head fw-bold mb-3">Who We Are</h2>
              <p>
                <strong>CampusConnect</strong> is a{" "}
                <em>College Event Information System</em> designed to streamline
                event management in colleges and universities. It helps
                students, faculty, and organizers stay connected with real-time
                updates of events, cultural programs, seminars, workshops, and
                competitions.
              </p>
              <p>
                With CampusConnect, colleges can showcase talent, foster
                collaboration, and build stronger communities through events.
              </p>
            </div>
          </div>
        </section>

        {/* College Info */}
        <section className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-6 p-3 p-lg-5">
              <h1 className="head">Excellence in Education Since 1985</h1>
              <p className="mt-3">
                <b>CampusConnect</b> is a premier educational institution
                affiliated with XYZ College, located in the heart of the city.
                We are committed to providing world-class education and
                fostering innovation among our students.
              </p>
              <p>
                Our campus spans over 50 acres and houses state-of-the-art
                facilities including modern laboratories, a well-equipped
                library, sports complex, and comfortable hostels. We pride
                ourselves on our diverse community of over 5,000 students and
                300+ faculty members.
              </p>
              <h6>💎 123 Education Street, Tech City, State 12345</h6>
            </div>

            <div className="col-12 col-md-3 mt-4">
              <div className="can1 m-auto">
                <h2 className="head">5000+</h2>
                <h5>Students</h5>
              </div>
              <div className="can2 mt-4 m-auto">
                <h2 className="head">15</h2>
                <h5>Departments</h5>
              </div>
            </div>

            <div className="col-12 col-md-3 mt-4">
              <div className="can3 m-auto">
                <h2 className="head">300+</h2>
                <h5>Faculty</h5>
              </div>
              <div className="can4 mt-4 m-auto">
                <h2 className="head">50+</h2>
                <h5>Acres Campus</h5>
              </div>
            </div>
          </div>
          <hr />
        </section>

        {/* Mission & Vision */}
        <section className="container-fluid py-5 color">
          <div className="row text-center g-4">
            <div className="col-12 col-md-6 animate-slide">
              <div className="shadow border-0 h-100 p-3">
                <div className="card-body">
                  <h3 className="head fw-bold mb-3">Our Mission</h3>
                  <p>
                    Our mission at CampusConnect is to empower colleges with a
                    modern digital platform that makes event management
                    seamless, transparent, and impactful.
                  </p>
                  <p>
                    <i>
                      “Great institutions are built not just by classrooms, but
                      by the events that shape minds and connect hearts.”
                    </i>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 animate-slide">
              <div className="shadow border-0 h-100 p-3">
                <div className="card-body">
                  <h3 className="head fw-bold mb-3">Our Vision</h3>
                  <p>
                    Our vision at CampusConnect is to become the leading
                    platform for college event management, setting a benchmark
                    for innovation, efficiency, and collaboration in academic
                    communities.
                  </p>
                  <p>
                    <i>
                      “A vision is not just about seeing the future—it’s about
                      creating it together.”
                    </i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="container py-5 text-center">
          <h2 className="head fw-bold mb-4 animate-fade">Meet Our Team</h2>
          <div className="row g-4">
            {[
              {
                img: "https://t4.ftcdn.net/jpg/01/13/31/65/360_F_113316547_q9wiDxadvidz5UvKITGbJMvzqrDw45Kl.jpg",
                name: "Ayesha Khan",
                role: "Project Lead",
              },
              {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJjgv1L0jaUEXkPCapKUrR8pHoBfGsthg3CA&s",
                name: "Bilal Ahmed",
                role: "Backend Developer",
              },
              {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr_ngH-b19o0ISDWFaJZhHxOpS2LZYCa-xJg&s",
                name: "Sara Ahmed",
                role: "UI/UX Designer",
              },
              {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGbe_XfdE-h4zpiL-eGdTxWhsEmupZZ64p9A&s",
                name: "Ali Raza",
                role: "Frontend Developer",
              },
            ].map((member, index) => (
              <div
                className="col-12 col-sm-6 col-md-3 animate-slide"
                key={index}
              >
                <div className="shadow border-0 h-100">
                  <img
                    src={member.img}
                    className="card-img-top"
                    alt={member.name}
                  />
                  <div className="card-body">
                    <h5 className="fw-bold">{member.name}</h5>
                    <p className="text-muted">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Events Calendar */}
        <section className="container-fluid pb-5">
          <div className="year text-center">
            <h1 className="head">Annual Events Calendar</h1>
            <h5>
              Throughout the year, we host various events that showcase talent,
              foster learning, and build community
            </h5>

            <div className="row g-4 mt-3">
              {[
                {
                  month: "March",
                  type: "Technical",
                  title: "TechFest",
                  desc: "Annual technical festival featuring coding competitions, robotics, and innovation showcases",
                },
                {
                  month: "July",
                  type: "Cultural",
                  title: "Annual Day",
                  desc: "Grand celebration with awards ceremony and cultural performances",
                },
                {
                  month: "August",
                  type: "Cultural",
                  title: "Cultural Week",
                  desc: "Week-long celebration of arts, music, dance, and cultural diversity",
                },
                {
                  month: "September",
                  type: "Academic",
                  title: "Science Fair",
                  desc: "Exhibition of innovative science and research projects",
                },
                {
                  month: "November",
                  type: "Sports",
                  title: "Sports Championship",
                  desc: "Inter-departmental and inter-college sports competitions",
                },
                {
                  month: "December",
                  type: "Social",
                  title: "Alumni Meet",
                  desc: "Networking event connecting current students with alumni",
                },
              ].map((event, index) => (
                <div className="col-12 col-sm-6 col-md-4" key={index}>
                  <div className="do1 p-3">
                    <div className="d-flex justify-content-between">
                      <h6 className="head">{event.month}</h6>
                      <button className="buttons">{event.type}</button>
                    </div>
                    <h5>{event.title}</h5>
                    <p>{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="container py-5 text-center">
          <h2 className="head fw-bold mb-4">Events Timeline</h2>
          <div className="row justify-content-center g-4">
            {sortedYears.map((year) => (
              <div key={year} className="col-12 col-md-3">
                <div className="shadow p-3 h-100">
                  <h3 className="fw-bold">{year}</h3>
                  <p className="mb-0">{eventsByYear[year]} Events</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="container my-5">
          <hr />
          <h1 className="text-center head mt-5">
            Campus Highlights & Recognitions
          </h1>
          <div className="row g-4 mt-4">
            {[
              {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu3WP2VyJ2EqDENMRg7sqiitghMFAFRD8QVA&s",
                title: "NAAC A+ Accredited",
                desc: "Honored for excellence in higher education standards, with a strong commitment to innovation, learning, and student success.",
              },
              {
                img: "https://cdn-icons-png.freepik.com/512/8696/8696731.png",
                title: "Top 50 Engineering Colleges",
                desc: "Ranked among the best engineering institutions in the state",
              },
              {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ_v-F2PGIF1Trc6J-b-4PwstsICwQMLDuTA&s",
                title: "95% Placement Rate",
                desc: "Excellent career opportunities for our graduates",
              },
            ].map((card, index) => (
              <div className="col-lg-4 col-md-6 col-12" key={index}>
                <div className="box text-center h-100 p-3">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="icon-img mb-3"
                  />
                  <h3 className="head">{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
