import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./containers/main-page.js";
import AboutPage from "./containers/about-page.js";
import LoginPage from "./containers/login-page.js";
import SignUpPage from "./containers/sign-up-page.js";
import ProfilePage from "./containers/profile-page.js";
import { NavBar } from './components/index.js';

export default function App() {
  const [userId, setUserId] = useState("-1");

  return (
    <Router>
      <NavBar userId={userId} updateFunc={setUserId}/>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/login" element={<LoginPage userId={userId} updateFunc={setUserId}/>}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/profile" element={<ProfilePage userId={userId} updateFunc={setUserId}/>}/>
      </Routes>
    </Router>
  );
}
