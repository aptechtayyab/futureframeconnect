import React from "react";
import { useParams, Link } from "react-router-dom";
import upcomingevents from "../data/upcomingevents.json";
import Countdown from "../component/Countdown";
import "../css/UpcomingDetails.css";
import useDocumentTitle from "../Hooks/useDocumentTitle";

const UpcomingDetails = () => {
  useDocumentTitle("Detail Page - CampusConnect")
  const { id } = useParams();
  const event = upcomingevents.find((e) => e.id === parseInt(id));

  if (!event) return <div className="eventdetail-error">Event not found!</div>;

  return (
    <div className="eventdetail-wrapper">
      <div className="eventdetail-card">
        <div className="eventdetail-img">
         <img src={`/${event.image}`} alt={event.title} />

        </div>

        <div className="eventdetail-body">
          <h1 className="eventdetail-title">{event.title}</h1>
          <p className="eventdetail-desc">{event.description}</p>

          <div className="eventdetail-info">
            <p>
              <strong>📍 Venue:</strong> {event.venue}
            </p>
            <p>
              <strong>📅 Date:</strong>{" "}
              {new Date(event.date).toLocaleDateString()} <br />
              <strong>⏰ Time:</strong>{" "}
              {new Date(event.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="eventdetail-countdown">
            <Countdown date={event.date} />
          </div>

          <div className="eventdetail-actions">
           
            <Link to="/register" className="reg-btn text-center">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDetails;
