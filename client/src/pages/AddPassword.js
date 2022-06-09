import "./passwordManagerPage.css";
import { useState, useEffect } from "react";
import Axios from "axios";
function AddPasswordPage() {
    const [password, setPassword] = useState("");
    const [location, setlocation] = useState("");
    const [passwordList, setPasswordList] = useState([]);
    const [length, setlength] = useState();

    useEffect(() => {
        Axios.get("http://localhost:4040/password/").then((response) => {
            console.log(JSON.stringify(response.data));
        });
    }, []);

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
                    placeholder="Type your password"
                    onChange={(event) => {
                        setPassword(event.target.value);
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
