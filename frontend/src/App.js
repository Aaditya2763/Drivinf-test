import './App.css';
import Signup from './components/auth/signup';
import Signin from "./components/auth/Signin"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from './redux/store/store';
import { Provider } from 'react-redux';

import Registartion from './pages/registration.js/registration';

import Home from './pages/home/home';
import Dashboard from './pages/dashboard/Dashboard';

import ScoreBoard from './pages/Scoreboard/ScoreBoard';
import Profile from './pages/profile/Profile';
import ForgetPassword from './components/auth/forgotPassword';
import TestPage from './pages/test/test';


function App() {
  return (
    <div>
   <Provider store={store}>
      <BrowserRouter>
        <div className="d-flex flex-column" style={{ overflow: "hidden" }}>

          <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Signin/>} />
            <Route exact path="/signup" element={< Signup/>} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/test" element={<TestPage />} />

            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/change-password" element={<ForgetPassword />} />
            <Route exact path="/account" element={<ForgetPassword />} />
            <Route exact path="/register" element={<Registartion />} />
            <Route exact path="/scoreboard" element={<ScoreBoard />} />
          </Routes>
        </div>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
