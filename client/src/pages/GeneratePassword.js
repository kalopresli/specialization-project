import "./passwordManagerPage.css";
import { useState, useEffect } from "react";
import Axios from "axios";
function PasswordManagerPage() {
    const [password, setPassword] = useState("");
    const [location, setlocation] = useState("");
    const [passwordList, setPasswordList] = useState([]);
    const [length, setlength] = useState();

    useEffect(() => {
        Axios.get("http://localhost:4040/password/").then((response) => {
            console.log(JSON.stringify(response.data));
        });
    }, []);

    const addGenPass = async () => {
        const response = await Axios.post("http://localhost:4040/password/save", {
            length: length,
            location: location,
        }, { headers: { 'content-type': 'application/json' } });
        console.log(response);
    };

    const addPersPassword = async () => {
        const response = await Axios.post("http://localhost:4040/password/savepers", {
            password: password,
            location: location,
        }, { headers: { 'content-type': 'application/json' } });
        console.log(response);
    };

    const decryptPassword = (encryption) => {
        Axios.post("http://localhost:3001/decryptpassword", {
            password: encryption.password,
            iv: encryption.iv,
        }).then((response) => {
            setPasswordList(
                passwordList.map((val) => {
                    return val.id === encryption.id
                        ? {
                            id: val.id,
                            password: val.password,
                            location: response.data,
                            iv: val.iv,
                        }
                        : val;
                })
            );
        });
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
                    placeholder="Website"
                    onChange={(event) => {
                        setlocation(event.target.value);
                    }}
                />
                <button onClick={addGenPass}> Add Password</button>
            </div>
        </div>
    );
}

export default PasswordManagerPage;
