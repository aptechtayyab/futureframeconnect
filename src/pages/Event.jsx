import { useState, useEffect } from "react";
import "../css/Cards.css";
import "../css/events.css";
import EventData from "../data/events.json";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toggleBookmark, isBookmarked } from "../utils/bookmarkUtils";
import useDocumentTitle from "../Hooks/useDocumentTitle";

function Event() {
  useDocumentTitle("EventDetail - CampusConnect")
  const [events, setEvents] = useState(EventData.events);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Navigate to Event Detail
  const seeMore = (id) => {
    navigate(`/event/${id}`);
  };

  // Realtime Search
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    if (term === "") {
      setEvents(EventData.events);
    } else {
      const filtered = EventData.events.filter((edata) => {
        const title = edata.title.toLowerCase();
        const description = edata.description.toLowerCase();
        return title.includes(term) || description.includes(term);
      });
      setEvents(filtered);
    }
  }, [searchTerm]);

  //  Category Filter
  const handleCategoryFilter = (filter) => {
    if (filter === "all") {
      setEvents(EventData.events);
    } else {
      setEvents(EventData.events.filter((e) => e.type === filter));
    }
  };

  //  Department Filter
  const handleDepartmentFilter = (dept) => {
    if (dept === "all") {
      setEvents(EventData.events);
    } else {
      setEvents(EventData.events.filter((e) => e.department === dept));
    }
  };

  // Date Sort
  const handleDateSort = (e) => {
    const type = e.target.value;
    let sortedEvents = [...events];
    if (type === "upcoming") {
      sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (type === "recent") {
      sortedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setEvents(sortedEvents);
  };

  //  Alphabetical Sort
  const handleAlphaSort = (e) => {
    const order = e.target.value;
    let sortedEvents = [...events];
    if (order === "asc") {
      sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "desc") {
      sortedEvents.sort((a, b) => b.title.localeCompare(a.title));
    }
    setEvents(sortedEvents);
  };

  //  Category Sort Dropdown
  const handleCategorySort = (e) => {
    const category = e.target.value;
    if (category === "") {
      setEvents(EventData.events);
      return;
    }
    setEvents(EventData.events.filter((edata) => edata.type === category));
  };

  return (
    <>
      {/* Page Header */}
      <header className="bg-primary text-white text-center py-5 m-5">
        <div className="container">
          <h1>College Events</h1>
          <p className="lead">
            Discover and participate in various events happening across the campus
          </p>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          {/* Category Filters */}
          <div className="row mb-4">
            <div className="col-12">
              <h4>Filter by Category:</h4>
              <div className="filter-buttons">
                <button className="btn btn-primary filter-btn" onClick={() => handleCategoryFilter("all")}>
                  All Events
                </button>
                <button className="btn btn-outline-primary filter-btn" onClick={() => handleCategoryFilter("academic")}>
                  Academic Events
                </button>
                <button className="btn btn-outline-primary filter-btn" onClick={() => handleCategoryFilter("technical")}>
                  Technical
                </button>
                <button className="btn btn-outline-primary filter-btn" onClick={() => handleCategoryFilter("cultural")}>
                  Cultural
                </button>
                <button className="btn btn-outline-primary filter-btn" onClick={() => handleCategoryFilter("sports")}>
                  Sports
                </button>
              </div>
            </div>
          </div>

          {/* Department Filters */}
          <div className="row mb-4">
            <div className="col-12">
              <h4>Filter by Department:</h4>
              <div className="filter-buttons">
                <button className="btn btn-outline-secondary filter-btn" onClick={() => handleDepartmentFilter("Computer Science")}>
                  Computer Science
                </button>
                <button className="btn btn-outline-secondary filter-btn" onClick={() => handleDepartmentFilter("Fine Arts")}>
                  Fine Arts
                </button>
                <button className="btn btn-outline-secondary filter-btn" onClick={() => handleDepartmentFilter("Physical Education")}>
                  Physical Education
                </button>
                <button className="btn btn-outline-secondary filter-btn" onClick={() => handleDepartmentFilter("Business Administration")}>
                  Business Administration
                </button>
                <button className="btn btn-outline-secondary filter-btn" onClick={() => handleDepartmentFilter("Physics")}>
                  Physics
                </button>
                <button className="btn btn-outline-secondary filter-btn" onClick={() => handleDepartmentFilter("English")}>
                  English
                </button>
                <button className="btn btn-outline-secondary filter-btn" onClick={() => handleDepartmentFilter("all")}>
                  All Departments
                </button>
              </div>
            </div>
          </div>

          {/* Search & Sort */}
          <div className="row mb-4 align-items-center">
            <div className="col-md-3 mb-3 mb-md-0">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={() => setSearchTerm("")}>
                  <i className="bi bi-x-circle" />
                </button>
              </div>
            </div>

            <div className="col-md-3 mb-3 mb-md-0">
              <select className="form-select sort-select" onChange={handleDateSort}>
                <option value="">Sort by Date</option>
                <option value="upcoming">Upcoming First</option>
                <option value="recent">Most Recent First</option>
              </select>
            </div>

            <div className="col-md-3 mb-3 mb-md-0">
              <select className="form-select sort-select" onChange={handleAlphaSort}>
                <option value="">Sort by Event Name</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
              </select>
            </div>

            <div className="col-md-3">
              <select className="form-select sort-select" onChange={handleCategorySort}>
                <option value="">Sort by Category</option>
                <option value="academic">Academic Events</option>
                <option value="technical">Technical</option>
                <option value="cultural">Cultural</option>
                <option value="sports">Sports</option>
              </select>
            </div>
          </div>

          {/* Event Cards */}
          <div className="row m-0">
            {events.length > 0 ? (
              events.map((edata) => (
                <div className="col-lg-4 col-md-6 col-sm-12 my-4" key={edata.id}>
                  <div className="card position-relative">
                    <div className="venue-tag">{edata.venue}</div>

                    {/* Bookmark Button */}
                    <div
                      className="bookmark-icon"
                      onClick={() => {
                        toggleBookmark(edata);
                        setEvents([...events]); // re-render
                      }}
                    >
                      {isBookmarked(edata.id) ? <FaBookmark /> : <FaRegBookmark />}
                    </div>

                    <div className="ei">
                      <img src={edata.image} alt={edata.title} className="card-img-top" />
                    </div>
                    <div className="card-content p-3">
                      <h2 className="card-title">{edata.title}</h2>
                      <p className="card-text">{edata.description}</p>
                      <div className="card-details d-flex justify-content-between">
                        <span>{edata.time}</span>
                        <span>{edata.date}</span>
                      </div>
                      <button className="btn btn-primary mt-3" onClick={() => seeMore(edata.id)}>
                        See More
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-5">
                <h4 className="text-muted">🚫 No Records Found</h4>
                <p className="text-secondary">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Event;
