import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./containers/main-page.js";
import AboutPage from "./containers/about-page.js";
import LoginPage from "./containers/login-page.js";
import SignUpPage from "./containers/sign-up-page.js";
import ProfilePage from "./containers/profile-page.js";
import { NavBar } from './components/index.js';
import RecPage from './containers/recc-page.js';

export default function App() {
  const [userId, setUserId] = useState("-1");
  const [spotifyId, setSpotifyId] = useState("-1");

  useEffect(() => {
    const index = document.cookie.search("user=");
    if(index !== -1) {
      let value = document.cookie.substring(index + 6);
      const otherQuoteIndex = value.search("\"");
      value = value.substring(0, otherQuoteIndex);
      setUserId(value);
      console.log(value);
    }
  }, []);

  return (
    <Router>
      <NavBar userId={userId} updateFunc={setUserId}/>
      <Routes>
        <Route path="/" element={<MainPage />} spotifyId={spotifyId}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/login" element={<LoginPage userId={userId} updateFunc={setUserId}/>}/>
        <Route path="/signup" element={<SignUpPage userId={userId} updateFunc={setUserId}/>}/>
        <Route path="/profile" element={<ProfilePage userId={userId} updateFunc={setUserId}/>} spotifyUpdate={setSpotifyId}/>
        <Route path="/reccs" element={<RecPage />}/>
      </Routes>
    </Router>
  );
}
