import "./passwordManagerPage.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Popup from "../components/Popup";

function PasswordManagerPage() {
    const [password, setPassword] = useState("");
    const [location, setlocation] = useState("");
    const [passwordList, setPasswordList] = useState([]);
    const [length, setlength] = useState();
    const [username, setusername] = useState();
    const [buttonPopup, setButtonPopup] = useState(false);

    useEffect(() => {
        Axios.get("http://localhost:4040/password/").then((response) => {
            console.log(JSON.stringify(response.data));
        });
    }, []);

    const addGenPass = async () => {
        const response = await Axios.post("http://localhost:4040/password/save", {
            length: length,
            location: location,
            username: username
        }, { headers: { 'content-type': 'application/json' } });

    };

    const generatePass = async () => {
        const response = await Axios.post("http://localhost:4040/password/create", {
            length: length,
            location: location,
            username: username
        }, { headers: { 'content-type': 'application/json' } });
        console.log(response);
        setPassword(response.data.Password);
    };

    const addPersPassword = async () => {
        const response = await Axios.post("http://localhost:4040/password/savepers", {
            password: password,
            location: location,
        }, { headers: { 'content-type': 'application/json' } });
        console.log(response);
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
                <button onClick={addGenPass}> Save Password</button>
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
