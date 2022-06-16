import "./passwordManagerPage.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Popup from "../components/Popup";
import jwt_decode from 'jwt-decode'

function PasswordManagerPage() {
    const [password, setPassword] = useState("");
    const [location, setlocation] = useState("");
    const [passwordList, setPasswordList] = useState([]);
    const [length, setlength] = useState();
    const [username, setusername] = useState();
    const [buttonPopup, setButtonPopup] = useState(false);
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);


    const addGenPass = async () => {
        const response = await Axios.post("http://localhost:4040/password/save", {
            length: length,
            location: location,
            username: username,
            userid: decoded.userid
        }, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `token ${token}`
            }
        });
        setPassword(response.data.Password);

    };

    const generatePass = async () => {
        const response = await Axios.post("http://localhost:4040/password/create", {
            length: length,
            location: location,
            username: username,
            userid: decoded.userid
        }, { headers: { 'content-type': 'application/json', 'Authorization': `token ${token}` } });
        setPassword(response.data.Password);
    };


    return (
        <div className="App">

            <div className="AddingPassword">
                <p>
                    Create a new password
                </p>
                <input
                    type="text"
                    placeholder="Choose password length"
                    onChange={(event) => {
                        setlength(event.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(event) => {
                        setusername(event.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Website"
                    onChange={(event) => {
                        setlocation(event.target.value);
                    }}
                />
                <button onClick={() => {
                    addGenPass();
                    setButtonPopup(true);
                }}> Save Password</button>

                <button onClick={() => {
                    generatePass();
                    setButtonPopup(true);
                }}>
                    Generate Password</button>

            </div>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h5>Your Location: {location}</h5>
                <h5>Your Password: {password}</h5>
            </Popup>
        </div>
    );
}

export default PasswordManagerPage;
