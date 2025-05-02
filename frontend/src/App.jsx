import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-20 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : navigate("/signup")}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : navigate("/")}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : navigate("/")}
        />
        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : navigate("/login")}
        />
        <Route
          path="/profile"
          element={authUser ? <profilePage /> : navigate("/login")}
        />
      </Routes>
    </div>
  );
}

export default App;
