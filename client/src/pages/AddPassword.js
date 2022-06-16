import "./passwordManagerPage.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from 'jwt-decode';

function AddPasswordPage() {
    const [password, setPassword] = useState("");
    const [location, setlocation] = useState("");
    const [passwordList, setPasswordList] = useState([]);
    const [length, setlength] = useState();
    const [username, setusername] = useState();
    var token = localStorage.getItem('token');
    const decoded = jwt_decode(token);

    const addPersPassword = async () => {
        const response = await Axios.post("http://localhost:4040/password/savepers", {
            password: password,
            location: location,
            username: username,
            userid: decoded.userid
        }, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `token ${token}`
            }
        });
        console.log(response);
    };

    return (
        <div className="App">

            <div className="AddingPassword">
                <p>
                    Add a password
                </p>
                <input
                    type="text"
                    placeholder="Type your password"
                    onChange={(event) => {
                        setPassword(event.target.value);
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
                <button onClick={addPersPassword}> Add Password</button>
            </div>

        </div>
    );
}

export default AddPasswordPage;
