import { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import Login from "./Login";

export default function Logout() {
    useEffect(() => {
        localStorage.clear('token');
        window.location.href = '/';
    }, [])

}