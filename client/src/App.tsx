import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AuthProvider } from "./contexts/authContext";
import Register from "./components/auth/AuthContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path="/Login&Register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
