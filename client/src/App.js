import './App.css';
import { useState } from 'react';
import { Route, Link, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from './components/navbar';
import Login from "./components/login";
import Home from "./components/home";
import Contact from "./components/contact";
import Aboutus from "./components/aboutus";
import Jobs from "./components/jobs";

function App() {
  var [isLoggedIn, setIsLoggedIn] = useState(false);
  var [profileEmail, setProfileEmail] = useState('');

  return (
    <div className="h-100">
      <Router>
        <Navbar isLoggedIn={isLoggedIn}></Navbar>
        <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setProfileEmail={setProfileEmail} />}>
            </Route>
            <Route path="home" element={<Home email={profileEmail} />}>
            </Route>
            <Route path="jobs" element={<Jobs email={profileEmail} />}>
            </Route>
            <Route path="about" element={<Aboutus email={profileEmail} />}>
            </Route>
            <Route path="contact" element={<Contact email={profileEmail} />}>
            </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
