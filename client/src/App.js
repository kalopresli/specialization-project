//import { useState } from "react";
//import PasswordStrengthMeter from "./components/passwordStrengthMeter";
import PasswordManagerPage from "./pages/GeneratePassword";
import PasswordMeterPage from "./pages/passwordMeter";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Navbar from "./components/Navbar";
import AddPasswordPage from "./pages/AddPassword";
import ViewPasswordsPage from "./pages/ViewPasswords";
import Login from "./pages/Login";
import useToken from './components/useToken';
import Logout from "./pages/Logout";
import GeneratePincode from "generate-pincode";
import GeneratePin from "./pages/GeneratePin";
import ViewPinsPage from "./pages/ViewPins";

function App() {

  const { token, setToken } = useToken();
  
  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<PasswordMeterPage />} />
        <Route exact path="/create" element={<PasswordManagerPage />} />
        <Route exact path="/save" element={<AddPasswordPage />} />
        <Route exact path="/passwords" element={<ViewPasswordsPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/generatepin" element={<GeneratePin />} />
        <Route exact path="/pins" element={<ViewPinsPage />} />

      </Routes>
    </div>
  )
}

export default App;
