import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./containers/main-page.js";
import AboutPage from "./containers/about-page.js";
import LoginPage from "./containers/login-page.js";
import SignUpPage from "./containers/sign-up-page.js";
import ProfilePage from "./containers/profile-page.js";
import NavBar from './components/navbar.js';
import RecPage from './containers/recommendation-page.js';

export default function App() {
  return (
    // <div className="App">
    //   <MainPage />
    // </div>

    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/reccs" element={<RecPage />}/>
      </Routes>
    </Router>
  );
}
