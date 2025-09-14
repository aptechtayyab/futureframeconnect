import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Navbar from './component/Navbar.jsx'
import { BrowserRouter } from 'react-router-dom'
import Footer from './component/Footer.jsx';
import './global.css'
createRoot(document.getElementById('root')).render(
  <>
  <StrictMode>
    <BrowserRouter>
    <Navbar/>
    <App />
    <Footer/>
    </BrowserRouter>
  </StrictMode>,
  </>
)
