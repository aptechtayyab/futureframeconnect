import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import EventData from "../data/events.json";
import "../css/Detail.css";
import useDocumentTitle from "../Hooks/useDocumentTitle";

const EventDetail = () => {
  useDocumentTitle("Detail Page - CampusConnect")
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate();

  // Find the event by ID
  const event = EventData.events.find((e) => e.id.toString() === id);

  if (!event) {
    return (
      <div className="container my-5 text-center">
        <h2>Event not found 🚫</h2>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/event")}
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5" id="event-detail">
      <div className="row event-card align-items-center">
        {/* Image Section */}
        <div className="col-md-6 col-12 mb-3 mb-md-0 text-center">
          <img
            src={`/${event.image}`}
            alt={event.title}
            className="event-img img-fluid"
          />
        </div>

        {/* Event Info Section */}
        <div className="col-md-6 col-12">
          <h1 className="event-title">{event.title}</h1>
          <h3 className="event-category">{event.type}</h3>
          <p className="event-description">{event.longdescription}</p>

          <div className="event-info d-flex justify-content-between flex-wrap">
            <h5>📍 {event.venue}</h5>
            <h5>
              📅 {event.date} at {event.time}
            </h5>
          </div>
          <Link to="/register"> 
            <button
              className="register-btn mt-3"
            >
              Register Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
