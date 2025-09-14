import React, { useState } from "react";
import "../css/Feedback.css"
import useDocumentTitle from "../Hooks/useDocumentTitle";


const Feedback = () => {
  useDocumentTitle("FeedBack - CampusConnect")
  const [formData, setFormData] = useState({
    fname: "",
    sid: "",
    userType: "",
    email: "",
    dept: "",
    year: "",
    event: "",
    feedback: "",
    consent: false,
  });

  // Track which fields the user has touched (so we don't show errors immediately)
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // Regex patterns
  const patterns = {
    // trim before testing; disallow double spaces; 3-50 characters
    fname: /^(?!.*\s{2,})[A-Za-z ]{3,50}$/,
    // S followed by 4-10 digits (example: S12345)
    sid: /^S\d{4,10}$/,
    // ends with .edu (case-insensitive)
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/i,
    // alphabets and spaces 2-30 chars
    dept: /^(?!.*\s{2,})[A-Za-z ]{2,30}$/,
    // Accepts:
    // - "Year 1" .. "Year 8"
    // - "Semester 1" .. "Semester 8"
    // - "1" .. "8"
    // - numeric "Y-M" where Y = 1..8 and M = 1..12 (example: 1-12 where 1 = year, 12 = month)
    year: /^(?:Year\s?[1-8]|Semester\s?[1-8]|[1-8]|[1-8]-(?:[1-9]|1[0-2]))$/,
  };

  // Validate a single field and return a human-friendly error or empty string
  const validateField = (name, rawValue) => {
    const value = typeof rawValue === "string" ? rawValue.trim() : rawValue;

    switch (name) {
      case "fname":
        if (!value) return "Full name is required.";
        if (!patterns.fname.test(value)) return "Invalid full name — use letters and spaces (3–50 characters).";
        return "";
      case "sid":
        if (!value) return "Student ID is required.";
        if (!patterns.sid.test(value)) return "Invalid student ID — must start with 'S' followed by 4–10 digits (e.g., S12345).";
        return "";
      case "userType":
        if (!value) return "Please select a user type.";
        return "";
      case "email":
        if (!value) return "Email is required.";
        if (!patterns.email.test(value)) return "Invalid email — use your university email ending with .edu (e.g., you@uni.edu).";
        return "";
      case "dept":
        if (!value) return "Department is required.";
        if (!patterns.dept.test(value)) return "Invalid department — alphabets and spaces only (e.g., Computer Science).";
        return "";
      case "year":
        if (!value) return "Year / Semester is required.";
        if (!patterns.year.test(value)) return "Invalid Year/Semester — examples: 'Year 1', 'Semester 2', or numeric '1-12' where 1=year (1–8) and 12=month (1–12).";
        return "";
      case "event":
        if (!value) return "Please select an event.";
        return "";
      case "feedback":
        if (!value) return "Feedback is required.";
        if (value.length < 5) return "Feedback is too short — please write at least 5 characters.";
        return "";
      case "consent":
        if (!value) return "You must agree before submitting.";
        return "";
      default:
        return "";
    }
  };

  // Validate entire form -> return errors object
  const validateAll = (data) => {
    const all = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, data[key]);
      if (err) all[key] = err;
    });
    return all;
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    // if the field was touched already, re-validate it live
    if (touched[name]) {
      const err = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // mark all fields as touched so errors are displayed
    const newTouched = Object.keys(formData).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(newTouched);

    // validate all
    const newErrors = validateAll(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // success
      const nameForMsg = formData.fname || "Friend";
      alert(`✅ Thank you, ${nameForMsg}! Your feedback has been submitted.`);

      // reset form
      setFormData({
        fname: "",
        sid: "",
        userType: "",
        email: "",
        dept: "",
        year: "",
        event: "",
        feedback: "",
        consent: false,
      });
      setTouched({});
      setErrors({});
    } else {
      // focus first invalid field (nice UX)
      const firstInvalid = Object.keys(newErrors)[0];
      const el = document.getElementsByName(firstInvalid)[0];
      if (el && el.focus) el.focus();
    }
  };

  // helper to compute the bootstrap classes for inputs
  const fieldClass = (name) => {
    if (!touched[name]) return "form-control";
    return errors[name] ? "form-control is-invalid" : "form-control is-valid";
  };

  const selectClass = (name) => {
    if (!touched[name]) return "form-select";
    return errors[name] ? "form-select is-invalid" : "form-select is-valid";
  };

  return (
    <main id="page-root">
      <section className="hero">
        <div className="hero-card">
          <h1 className="mb-3 text-center">Campus Connect</h1>
          <p className="text-center text-muted mb-4">
            Connecting events, faculties, student coordinators &amp; more
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              {/* Full Name */}
              <div className="col-md-6">
                <label className="form-label" htmlFor="fname">Full Name</label>
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  className={fieldClass("fname")}
                  placeholder="Your full name"
                  value={formData.fname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.fname}
                  required
                />
                <div className="invalid-feedback">{errors.fname}</div>
              </div>

              {/* Student ID */}
              <div className="col-md-6">
                <label className="form-label" htmlFor="sid">Student ID</label>
                <input
                  id="sid"
                  name="sid"
                  type="text"
                  className={fieldClass("sid")}
                  placeholder="e.g. S12345"
                  value={formData.sid}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.sid}
                  required
                />
                <div className="invalid-feedback">{errors.sid}</div>
              </div>

              {/* User Type */}
              <div className="col-md-6">
                <label className="form-label" htmlFor="userType">User Type</label>
                <select
                  id="userType"
                  name="userType"
                  className={selectClass("userType")}
                  value={formData.userType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.userType}
                  required
                >
                  <option value="">-- Select user type --</option>
                  <option value="student">Student</option>
                  <option value="guest">Guest</option>
                  <option value="faculty">Faculty</option>
                </select>
                <div className="invalid-feedback">{errors.userType}</div>
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={fieldClass("email")}
                  placeholder="you@uni.edu"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.email}
                  required
                />
                <div className="invalid-feedback">{errors.email}</div>
              </div>

              {/* Department */}
              <div className="col-md-6">
                <label className="form-label" htmlFor="dept">Department</label>
                <input
                  id="dept"
                  name="dept"
                  type="text"
                  className={fieldClass("dept")}
                  placeholder="Department (e.g. Computer Science)"
                  value={formData.dept}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.dept}
                  required
                />
                <div className="invalid-feedback">{errors.dept}</div>
              </div>

              {/* Year / Semester */}
              <div className="col-md-6">
                <label className="form-label" htmlFor="year">Year / Semester</label>
                <input
                  id="year"
                  name="year"
                  type="text"
                  className={fieldClass("year")}
                  placeholder='e.g. Year 1, Semester 2, or "1-12"'
                  value={formData.year}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.year}
                  required
                />
                <div className="form-text">
                  Acceptable formats: <strong>Year 1</strong>, <strong>Semester 2</strong>, or numeric <strong>Y-M</strong> like <em>1-12</em> (here 1 = year, 12 = month).
                </div>
                <div className="invalid-feedback">{errors.year}</div>
              </div>

              {/* Event */}
              <div className="col-md-12">
                <label className="form-label" htmlFor="event">Event Attended</label>
                <select
                  id="event"
                  name="event"
                  className={selectClass("event")}
                  value={formData.event}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.event}
                  required
                >
                  <option value="">-- Select an event --</option>
                  <option>Orientation</option>
                  <option>Workshop</option>
                  <option>Seminar</option>
                  <option>Sports Event</option>
                  <option>Career Fair</option>
                  <option>Other</option>
                </select>
                <div className="invalid-feedback">{errors.event}</div>
              </div>

              {/* Feedback */}
              <div className="col-md-12">
                <label className="form-label" htmlFor="feedback">Detailed Feedback</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  className={fieldClass("feedback")}
                  rows="5"
                  placeholder="Share your thoughts..."
                  value={formData.feedback}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.feedback}
                  required
                />
                <div className="invalid-feedback">{errors.feedback}</div>
              </div>
            </div>

            {/* Consent */}
            <div className="form-check my-3">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                className={`form-check-input ${touched.consent ? (errors.consent ? "is-invalid" : "is-valid") : ""}`}
                checked={formData.consent}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.consent}
                required
              />
              <label className="form-check-label" htmlFor="consent">I agree to submit this feedback</label>
              <div className="invalid-feedback">{errors.consent}</div>
            </div>

            {/* Submit */}
            <button id="submit-feedback" className="btn btn-primary w-100" type="submit">
              Submit Feedback
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Feedback;
