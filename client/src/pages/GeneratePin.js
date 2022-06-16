import "./passwordManagerPage.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Popup from "../components/Popup";
import jwt_decode from 'jwt-decode'

function GeneratePin() {
    const [pin, setPin] = useState("");
    const [location, setlocation] = useState("");
    const [length, setlength] = useState();
    const [buttonPopup, setButtonPopup] = useState(false);
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);


    const addGenPin = async () => {
        const response = await Axios.post("http://localhost:4040/pin/savegen", {
            length: length,
            location: location,
            userid: decoded.userid
        }, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `token ${token}`
            }
        });
        setPin(response.data.pin);
        console.log(decoded);
    };

    const generatePin = async () => {
        const response = await Axios.post("http://localhost:4040/pin/create", {
            length: length,
            location: location,
            userid: decoded.userid
        }, { headers: { 'content-type': 'application/json', 'Authorization': `token ${token}` } });
        setPin(response.data.pin);
    };


    return (
        <div className="App">

            <div className="AddingPassword">
                <p>
                    Create a new PIN
                </p>
                <input
                    type="text"
                    placeholder="Choose PIN length"
                    onChange={(event) => {
                        setlength(event.target.value);
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
                    addGenPin();
                    setButtonPopup(true);
                }}> Save PIN</button>

                <button onClick={() => {
                    generatePin();
                    setButtonPopup(true);
                }}>
                    Generate PIN</button>

            </div>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h5>Your Location: {location}</h5>
                <h5>Your PIN: {pin}</h5>
            </Popup>
        </div>
    );
}

export default GeneratePin;
