import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
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
    <Provider store={store}>
      <Router>
        <NavBar userId={userId} updateFunc={setUserId}/>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          {/* <Route path="/about" element={<AboutPage />}/> */}
          <Route path="/login" element={<LoginPage userId={userId} updateFunc={setUserId}/>}/>
          <Route path="/signup" element={<SignUpPage userId={userId} updateFunc={setUserId}/>}/>
          <Route path="/profile" element={<ProfilePage userId={userId} updateFunc={setUserId}/>}/>
          <Route path="/reccs" element={<RecPage userId={userId} updateFunc={setUserId}/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}