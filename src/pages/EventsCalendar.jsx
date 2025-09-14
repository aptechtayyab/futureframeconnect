
import React, { useState, useEffect } from "react";
import eventsData from "../data/events.json"; 
import "../css/EventCalendar.css";
import useDocumentTitle from "../Hooks/useDocumentTitle";

const EventsCalendar = () => {
  useDocumentTitle("EventsCalendar - CampusConnect")
 const [year, setYear] = useState(null);
  const [category, setCategory] = useState("all");
  const [years, setYears] = useState([]);

  const events = eventsData.events || [];

  useEffect(() => {
    if (!events.length) return;
  
    // Extract unique years from events
    const eventYears = events.map(e => new Date(e.date).getFullYear());
    const currentYear = new Date().getFullYear();
  
    // Filter: sirf eventYears jo currentYear se zyada na ho
    const filteredYears = eventYears.filter(y => y <= currentYear);
  
    // Unique + sort ascending
    const uniqueYears = [...new Set(filteredYears)].sort((a, b) => a - b);
  
    setYears(uniqueYears);
    
    // Agar current year events me hai to usko default rakho
    if (uniqueYears.includes(currentYear)) {
      setYear(currentYear);
    } else {
      setYear(uniqueYears[0]);
    }
  }, [events]);

  const renderCalendar = () => {
    if (!year) return null;

    const filtered = events.filter(e => {
      const eYear = new Date(e.date).getFullYear();
      return eYear === year && (category === "all" || e.type === category);
    });

    const grouped = {};
    filtered.forEach(e => {
      const d = new Date(e.date);
      const month = d.toLocaleString("default", { month: "long" });
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(e);
    });

    return Object.keys(grouped).map(month => {
      const monthEvents = grouped[month];
      const daysInMonth = new Date(year, new Date(`${month} 1, ${year}`).getMonth() + 1, 0).getDate();
      let day = 1;
      const startDay = new Date(`${month} 1, ${year}`).getDay();

      const rows = [];
      for (let i = 0; i < 6; i++) {
        const cells = [];
        for (let j = 0; j < 7; j++) {
          if ((i === 0 && j < startDay) || day > daysInMonth) {
            cells.push(<td key={j}></td>);
          } else {
            const todaysEvents = monthEvents.filter(e => new Date(e.date).getDate() === day);
            cells.push(
              <td key={j}>
                <div className="event-cale-date">{day}</div>
                {todaysEvents.map(ev => (
                  <div key={ev.id} className={`event-cale-event ${ev.type}`}>
                    {ev.title}
                  </div>
                ))}
              </td>
            );
            day++;
          }
        }
        rows.push(<tr key={i}>{cells}</tr>);
        if (day > daysInMonth) break;
      }

      return (
        <table className="event-cale-table" key={month}>
          <caption style={{ fontSize: "1.2em", margin: "10px 0" }}>
            {month} {year}
         
            </caption>
          <thead>
            <tr>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    });
  };

  return (
    <div className="event-cale-body">
      <h1 className="event-cale-title">College Events Calendar</h1>

      <div className="event-cale-filters">
        <label htmlFor="yearFilter">Year:</label>
        <select
          id="yearFilter"
          value={year || ""}
          onChange={e => setYear(parseInt(e.target.value))}
        >
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Category:</label>
        <select
          id="categoryFilter"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="academic">Academic</option>
          <option value="technical">Technical</option>
          <option value="cultural">Cultural</option>
          <option value="sports">Sports</option>
        </select>
      </div>

      <div className="event-cale-tables">{renderCalendar()}</div>
    </div>
  );
};

export default EventsCalendar;
