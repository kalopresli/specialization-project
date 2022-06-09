import "./passwordManagerPage.css";
import { useState, useEffect } from "react";
import Axios from "axios";
function ViewPasswordsPage() {
    //const [password, setPassword] = useState("");
    //const [location, setlocation] = useState("");
    //const [passwordList, setPasswordList] = useState([]);
    const [length, setlength] = useState();
    let passwordList = []

    useEffect(() => {
        Axios.get("http://localhost:4040/password/").then((response) => {

            let data = response.data;
            data.forEach(element => {
                passwordList.push(element)
            });
            console.log(passwordList[0]);
            //passwordList = response.data;
        });
    }, []);


    return (
        <div>
            <ul>
                {
                    passwordList.forEach(element => {
                        return <li key={element.password}>{element.password}</li>;
                    })
                }
            </ul>
        </div>
    );
}

export default ViewPasswordsPage;
