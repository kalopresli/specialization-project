import "./passwordManagerPage.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';


function ViewPasswordsPage() {
    //const [password, setPassword] = useState("");
    //const [location, setlocation] = useState("");
    const [passwordList, setPasswordList] = useState([]);
    const [length, setlength] = useState();
    //let passwordList = []


    useEffect(() => {
        Axios.get("http://localhost:4040/password/").then((response) => {

            const data = response.data;
            /*data.forEach(element => {
                passwordList.push(element);

            });*/
            setPasswordList(data)

            //passwordList = response.data;
        });
    }, []);
    //let width = `${100 / passwordList.length}%`
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        }}>

            <Row xl={4} className="g-3">
                {
                    passwordList.map((password) => (
                        <Col md={{ span: 3, offset: 1 }} >
                            <Card style={{width: `${1050 / passwordList.length}px`}}>
                                <Card.Img variant="top" />
                                <Card.Body>
                                    <Card.Title style={{ "color": "#060b26", "textAlign": "center" }}>Location</Card.Title>
                                    <Card.Link href={'https://www.'+password.location}>{password.location}</Card.Link>
                                    <Card.Text>
                                        Your password<br />{password.password}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default ViewPasswordsPage;
