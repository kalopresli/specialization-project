//import { useState } from "react";
//import PasswordStrengthMeter from "./components/passwordStrengthMeter";
import PasswordManagerPage from "./pages/GeneratePassword";
import PasswordMeterPage from "./pages/passwordMeter";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Navbar from "./components/Navbar";
import AddPasswordPage from "./pages/AddPassword";
import ViewPasswordsPage from "./pages/ViewPasswords";

function App() {

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<PasswordMeterPage />} />
        <Route exact path="/create" element={<PasswordManagerPage />} />
        <Route exact path="/save" element={<AddPasswordPage />} />
        <Route exact path="/passwords" element={<ViewPasswordsPage />} />
      </Routes>
    </div>
  )

  //const [password, setPassword] = useState('');
  //console.log(password);

  /*return (
    <div className="container">
      <div className="col-md-6 mx-auto ">
        <h3 className="text-center my-5">Password Strength Meter</h3>
        <div className="form-group mb-1">
          <input
            type="password"
            className="form-control shadow-none"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <PasswordStrengthMeter password={password} />
      </div>
    </div>
  );*/
}

export default App;
