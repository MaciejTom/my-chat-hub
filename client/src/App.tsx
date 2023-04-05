import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./routers/PrivateRoute";
import { AuthUserProvider } from "./contexts/AuthUserContext";
import Login from "./pages/LoginPage";
import { Home } from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import { ChatPage } from "./pages/ChatPage";
import { Layout } from "./components/layout/Layout";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="bg-[url('/public/background.png')] bg-cover text-white">
      <AuthUserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/chat"
              element={<PrivateRoute children={<ChatPage />} />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthUserProvider>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
