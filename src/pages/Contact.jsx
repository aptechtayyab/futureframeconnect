import React, { useState } from "react";
import Navbar from "../component/Navbar";
import faculty from "../data/faculty.json";
import students from "../data/students.json";
import "../css/Contact.css";
import useDocumentTitle from "../Hooks/useDocumentTitle";
const Contact = () => {
  useDocumentTitle("Contact Us - CampusConnect");
  const [activeTab, setActiveTab] = useState("faculty");

  // ------------------- Live Input Validation -------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Regex Rules
  const nameRegex = /^[\p{L}\s]{3,50}$/u;
  const emailRegex =
    /^(?!\.)(?!.*\.\.)([A-Za-z0-9._%+-]{1,64})@(?!-)([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;
  const msgRegex = /^(?!.*<\s*script)(?=.*[A-Za-z0-9]).{10,500}$/i;

  const validateField = (field, value) => {
    switch (field) {
      case "name":
        return nameRegex.test(value)
          ? ""
          : "Name must be 3–50 letters (alphabets only).";
      case "email":
        return emailRegex.test(value)
          ? ""
          : "Enter a valid email (e.g. user@example.com).";
      case "message":
        return msgRegex.test(value)
          ? ""
          : "Message must be 10–500 characters, no scripts allowed.";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // validate live
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // ------------------- Submit Validation -------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    Object.keys(formData).forEach((field) => {
      newErrors[field] = validateField(field, formData[field].trim());
    });
    setErrors(newErrors);

    // check if any error exists
    const hasError = Object.values(newErrors).some((err) => err !== "");
    if (!hasError) {
      alert("🚀 Form submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
      setErrors({ name: "", email: "", message: "" });
    }
  };

  // ------------------- Coordinators Data -------------------

  const coordinators = activeTab === "faculty" ? faculty : students;

  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero d-flex align-items-center justify-content-center text-center text-white mb-5">
        <div className="contact-hero-overlay p-4 rounded">
          <h1 className="display-4 fw-bold">Contact Us</h1>
          <p className="lead">Stay connected with CampusConnect Team</p>
        </div>
      </section>

      {/* Tabs */}
      <div className="text-center mb-5">
        <button
          className={` mx-2 contact-tab-btn ${
            activeTab === "faculty" ? "contact-active" : "contact-inactive"
          }`}
          onClick={() => setActiveTab("faculty")}
        >
          Faculty Coordinators
        </button>

        <button
          className={` mx-2 contact-tab-btn ${
            activeTab === "student" ? "contact-active" : "contact-inactive"
          }`}
          onClick={() => setActiveTab("student")}
        >
          Student Coordinators
        </button>
      </div>

      {/* Cards */}
      <div className="container-fluid">
        <div className="row g-4 justify-content-center">
          {coordinators.map((c, index) => (
            <div
              className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center"
              key={index}
            >
              <div className="contact-card">
                <img src={c.image} alt={c.name} />
                <div className="contact-card-content">
                  <h2>{c.name}</h2>
                  <p>{c.designation}</p>
                  <div className="contact-card-details d-flex flex-column">
                    <span>🕒 {c.hours}</span>
                    <span>📞 {c.phone}</span>
                  </div>
                  <button
                    onClick={() => (window.location.href = `mailto:${c.email}`)}
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form + Working Hours */}
      <section className="container py-5">
        <div className="row g-4">
          {/* Form */}
          <div className="col-lg-6">
            <div className="shadow border-0 h-100 p-5">
              <div className="card-body">
                <h3 className="mb-4 contact-head fw-bold">Send a Message</h3>
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name
                          ? "is-invalid"
                          : formData.name
                          ? "is-valid"
                          : ""
                      }`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                    <div className="invalid-feedback">{errors.name}</div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email
                          ? "is-invalid"
                          : formData.email
                          ? "is-valid"
                          : ""
                      }`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label fw-semibold">
                      Your Message
                    </label>
                    <textarea
                      className={`form-control ${
                        errors.message
                          ? "is-invalid"
                          : formData.message
                          ? "is-valid"
                          : ""
                      }`}
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      required
                    ></textarea>
                    <div className="invalid-feedback">{errors.message}</div>
                  </div>

                  <button
                    type="submit"
                    className="contact-tab-submit w-100 fw-bold reg-btn"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="col-lg-6">
            <div className="shadow border-0 h-100 p-5">
              <div className="card-body">
                <h3 className="mb-4 contact-head fw-bold">
                  ABC College of Engineering
                </h3>
                <h6 className="mb-3">
                  <b>Phone: </b>+91 11 2345 6789 (Main Office)
                </h6>
                <h6>
                  <b>Email: </b>
                  <a href="mailto:info@college.edu">info@college.edu</a>
                </h6>
                <h6>
                  <b>Facebook:</b>{" "}
                  <a
                    href="https://www.facebook.com/CampusConnectOfficial"
                    target="_blank"
                    rel="noreferrer"
                  >
                    CampusConnect
                  </a>
                </h6>
                <h6>
                  <b>Instagram:</b>{" "}
                  <a
                    href="https://www.instagram.com/CampusConnectOfficial"
                    target="_blank"
                    rel="noreferrer"
                    className="me-3 text-danger"
                  >
                    CampusConnect
                  </a>
                </h6>
                <h6>
                  <b>Twitter:</b>{" "}
                  <a
                    href="https://www.twitter.com/CampusConnectTeam"
                    target="_blank"
                    rel="noreferrer"
                    className="me-3 text-info"
                  >
                    CampusConnect
                  </a>
                </h6>

                <h3 className="mb-2 mt-4 fw-bold">Working Hours</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Mon - Fri: 9:00 AM - 6:00 PM
                  </li>
                  <li className="list-group-item">Sat: 10:00 AM - 4:00 PM</li>
                  <li className="list-group-item">Sun: Closed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="container py-5">
        <div className="shadow border-0">
          <div className="card-body">
            <h3 className="mb-3 contact-head fw-bold">Our Location</h3>
            <iframe
              title="Campus Location"
              className="contact-map"
              src="https://maps.google.com/maps?q=Lahore&t=&z=13&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
