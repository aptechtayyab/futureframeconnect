import "../css/Cards.css"

function Cards() {
    function seeMore() {
      alert("More details coming soon!");
    }
  return (
    <>
  <div className="card">
    <div className="venue-tag">Lahore Stadium</div>
    <img src="https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=80" alt="Event Image" />
    <div className="card-content">
      <h2>Music Festival</h2>
      <p>An exhilarating celebration of music</p>
      <div className="card-details">
        <span>6:00 PM</span>
        <span>July 22, 2023</span>
      </div>
      <button onclick="seeMore()">See More</button>
    </div>
  </div>
</>
  )
}

export default Cards
