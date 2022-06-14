import { response } from 'express'
import Express from 'express';
import mysql from 'mysql';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verify } from 'crypto';
import NextFunction from 'express';
dotenv.config();

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'PasswordManager',
})

export function validateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(typeof token !== "string") return res.sendStatus(403)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err)  return res.sendStatus(403);
        req.tokenData = decoded;
        next();
    });

}

function generateAccessToken(username) {
    return jwt.sign(
        { username },
        process.env.TOKEN_SECRET,
        { expiresIn: '300s' }
    );
}

export default async function RegisterUser(username, password, confPassword) {

    if (password !== confPassword) return "Password and confirmation password must match", 403
    else
        db.query("INSERT INTO users (username, password) VALUES (?,?)",
            [username, password],
            (err, res) => {
                if (err) { return err }
                else { console.log(username) };
            });

}

export const LoginUser = async (username, password) => {
    const user = getUserFromDB({ username, password });
    if (user) {
        const token = generateAccessToken(user?.username);
        if (!token) return SR.error(403, "Username or Password was incorrect");
        return token;
    }
    else return 401;

}

const getUserFromDB = (username, password) => {
    const user = {
        username,
        password
    }

    db.query("SELECT * FROM passwordmanager.users WHERE username=username && password=password VALUES (?, ?)",
        [username, password],
        (err, res) => {
            if (err) { return err }
            else {
                user.username = res.username;
                user.password = res.password
            }
        }
    )
    return user;
}