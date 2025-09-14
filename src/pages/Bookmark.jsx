import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import "../css/Cards.css";
import "../css/events.css";
import useDocumentTitle from "../Hooks/useDocumentTitle";

const Bookmark = () => {
  useDocumentTitle("BookMark - CampusConnect") 
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarkedEvents")) || [];
    setBookmarks(saved);
  }, []);

  const removeBookmark = (id) => {
    const updated = bookmarks.filter((event) => event.id !== id);
    localStorage.setItem("bookmarkedEvents", JSON.stringify(updated));
    setBookmarks(updated);
  };

  const clearAll = () => {
    localStorage.removeItem("bookmarkedEvents");
    setBookmarks([]);
  };

  // ✅ Navigate to Event Detail
  const openEvent = (id) => {
    navigate(`/event/${id}`);
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>⭐ Your Bookmarked Events</h2>
        {bookmarks.length > 0 && (
          <button className="btn btn-danger" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      <div className="row">
        {bookmarks.length > 0 ? (
          bookmarks.map((edata) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={edata.id}>
              <div className="card h-100 position-relative">
                <div className="venue-tag">{edata.venue}</div>

                <div className="ei">
                  <img
                    src={edata.image}
                    alt={edata.title}
                    className="card-img-top"
                  />
                </div>

                <div className="card-content p-3">
                  <h2 className="card-title">{edata.title}</h2>
                  <p className="card-text">{edata.description}</p>

                  <div className="card-details d-flex justify-content-between">
                    <span>{edata.time}</span>
                    <span>{edata.date}</span>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => openEvent(edata.id)}
                    >
                      <FaExternalLinkAlt className="me-2" /> Open
                    </button>
                    <button
                      className="btn btn-outline-danger mx-2"
                      onClick={() => removeBookmark(edata.id)}
                    >
                      <FaTrash className="me-2" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <h4 className="text-muted">📭 No Bookmarks Found</h4>
            <p className="text-secondary">
              Save events from Home or Events page to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
