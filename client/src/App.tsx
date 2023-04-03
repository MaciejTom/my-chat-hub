import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./routers/PrivateRoute";
import { AuthUserProvider } from "./contexts/AuthUserContext";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import Login from "./pages/LoginPage";
import { Home } from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import { ChatPage } from "./pages/ChatPage";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <div className="bg-[url('/public/background.png')] bg-cover text-white">
      <AuthUserProvider>
        <WebSocketProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/chat"
                element={<PrivateRoute children={<ChatPage />} />}
              />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<div>not found</div>} />
            </Route>
          </Routes>
          <ToastContainer position="bottom-right" />
        </WebSocketProvider>
      </AuthUserProvider>
    </div>
  );
}

export default App;
