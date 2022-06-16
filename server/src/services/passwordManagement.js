import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql';
import express from 'express';
import { encrypt, decrypt } from './encryptionHandler.js';

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'PasswordManager',
})

const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'
const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default function createPassword(length, hasNumbers = true, hasSymbols = true, location, username, userid) {
    let chars = alpha
    hasNumbers ? (chars += numbers) : ''
    hasSymbols ? (chars += symbols) : ''
    return generatePassword(length, chars, location, username, userid)
}

//add userid to controller
const generatePassword = async (length, chars, location, username, userid) => {
    let password = '';
    let passDict = {
        Location: location,
        Password: password,
        Username: username,
        UserId: userid
    }
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
    };
    passDict.Password = password;
    
    return passDict;
}

//add userid to controller
export const savePersPass = async (password, location, username, userid) => {
    const hashedPassword = encrypt(password);
    /*let Password = {
        password,
        location,
        username,
        userid
    }*/
    db.query("INSERT INTO passwords (password, location, username,userid, iv) VALUES (?,?,?,?,?)", 
    [hashedPassword.password, location, username, userid, hashedPassword.iv],
    (err, res) => {
        if (err) {console.log(err);}
        else {console.log(password.Location);};
    });
}

//add userid to controller
export const saveGenPass = async (length, hasNumbers = true, hasSymbols = true, location, username, userid) => {
    let password = await createPassword(
        length,
        hasNumbers,
        hasSymbols,
        location,
        username,
        userid
    )
    const hashedPassword = encrypt(password.Password);
    db.query("INSERT INTO passwords (password, location, username, userid, iv) VALUES (?,?,?,?,?)", 
    [hashedPassword.password, location, username, userid, hashedPassword.iv],
    (err, res) => {
        if (err) {console.log(err);}
        else {console.log(password.Username);};
    });
}
