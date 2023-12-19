import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Landing from './components/Landing';
import Login from './components/Login';
import Profile from './components/Profile';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet
} from "react-router-dom";

function App() {
  const user = useSelector(selectUser);

  return (
    <div className="App">
      <BrowserRouter>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

const ProtectedRoute = ({ user, redirectPath = "/" }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }
  return <Outlet />
}