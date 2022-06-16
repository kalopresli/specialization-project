import { useState } from "react";
//import PasswordStrengthMeter from "./components/passwordStrengthMeter";
import PasswordStrengthMeter from "../components/passwordStrengthMeter";
import jwt_decode from 'jwt-decode'

function PasswordMeterPage() {

  const [password, setPassword] = useState('');
  console.log(password);

  return (
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
  );
}

export default PasswordMeterPage;
