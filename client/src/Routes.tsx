import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
import { Register } from "./pages/register";
export const AllRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <header>
        <nav >
          <ul style={{display: "flex", width: "100%", gap: "10px", listStyle: "none"}}>
            <li>
              {" "}
              <Link to=".">Home</Link>
            </li>
            <li>
              {" "}
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              {" "}
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};
