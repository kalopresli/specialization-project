import { response } from 'express'
import Express from 'express';
import mysql from 'mysql';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verify } from 'crypto';
import NextFunction from 'express';
import bcrypt from 'bcrypt'

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

    if (typeof token !== "string") return res.sendStatus(403)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.tokenData = decoded;
        next();
    });

}

function generateAccessToken(username, userid) {
    return jwt.sign(
        {
            username,
            userid
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '1200s' }
    );
}

export default async function RegisterUser(username, password, confPassword) {


    if (password !== confPassword) return "Password and confirmation password must match", 403
    else {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        db.query("INSERT INTO users (username, password) VALUES (?,?)",
            [username, hashedPassword],
            (err, res) => {
                if (err) { return err }
                else { return console.log(hashedPassword) };
            });
    }

}

export async function LoginUser(username, userid) {
    //console.log(username);
    if (username) {
        const token = generateAccessToken(username, userid);

        if (!token) return SR.error(403, "Username or Password was incorrect");
        //console.log(token);
        return token;
    }
    else return 401;

}

export async function getUserFromDB(username, password) {

    /*db.query("SELECT * FROM passwordmanager.users WHERE username=? AND password=?",
        [username, password],
        (err, res) => {
            if (err) { console.log(err); return err }
            else {
                user.username = res.username;
                user.password = res.password;
                
            }
        }
    );*/

    let token
    var sql = 'SELECT * FROM passwordmanager.users WHERE username=? AND password=?';
    db.query(sql, [username, password], async function (err, res) {
        if (err) { console.log(err); return err }
        else {
            if (res.length > 0) {
                //console.log(res.length);
                //console.log(username);
                token = await LoginUser(username)

                return token

            }
            else
                return null
        }
    })

}