import logo from './logo.svg';
//import './App.css';
import MainPage from './containers/main-page.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}
