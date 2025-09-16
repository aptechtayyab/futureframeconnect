import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import UpcomingDetails from './pages/UpcomingDetails'; // ✅ new page
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import RegisterForm from './pages/Register';
import EventsCalendar from './pages/EventsCalendar';
import Bookmark from './pages/Bookmark';
import Event from './pages/Event';
import ScrollToTop from './Hooks/ScrollToTop';

function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/event' Component={Event} />
      <Route path='/event/:id' Component={EventDetail} /> 
      <Route path='/eventcalendar' Component={EventsCalendar} /> 
      <Route path='/upcoming/:id' Component={UpcomingDetails} /> 
      <Route path='/gallery' Component={Gallery} />
      <Route path='/about' Component={About} />
      <Route path='/contact' Component={Contact} />
      <Route path='/feedback' Component={Feedback} />
      <Route path='/register' Component={RegisterForm} />
      <Route path='/bookmark' Component={Bookmark} />
    </Routes>
    </>
  );
}

export default App;
