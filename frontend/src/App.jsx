import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Addcar from "./pages/Addcar";

function App() {
  return (
    <div className="grid grid-cols-1 place-content-center h-[100%] w-[100%]">
      <center>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/addcar" element={<Addcar />} />
          </Routes>
        </BrowserRouter>
      </center>
    </div>
  );
}

export default App;
