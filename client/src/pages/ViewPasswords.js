import "./passwordManagerPage.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';



function ViewPasswordsPage() {
    //const [password, setPassword] = useState("");
    //const [location, setlocation] = useState("");
    const [passwordList, setPasswordList] = useState([]);
    const [userId, setUserId] = useState();
    const url = 'http://localhost:4040/password/';
    //let passwordList = []


    useEffect(() => {
        var token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        setUserId(decoded.userid)
        //var userid = decoded.userid;
        Axios.post(url,
            {
                "userid": decoded.userid
            },
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `token ${token}`
                }
            }
        ).then((response) => {

            const data = response.data;

            setPasswordList(data)
            console.log(data);
        });
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        }}>
            <div>
                <Row xl={5} className="g-3">
                    {
                        passwordList.map((password) => (

                            <Col md={{ span: 5, offset: 1 }} >
                                <Card style={{ width: `${1050 / 4}px` }}>
                                    <Card.Img variant="top" />
                                    <Card.Body>
                                        <Card.Title style={{ "color": "#060b26", "textAlign": "center" }}>{password.location}</Card.Title>
                                        <Card.Link style={{ "textAlign": "center" }} href={'https://www.' + password.location}>{password.location}</Card.Link>
                                        <Card.Text>
                                            Password<br />{password.password}
                                        </Card.Text>
                                        <Card.Text>
                                            Username<br />{password.username}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                        ))
                    }
                </Row>
            </div>
        </div>
    )
}

export default ViewPasswordsPage;
