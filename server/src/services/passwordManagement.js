import fs from 'fs';
import path from 'path';
import os from 'os';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import mysql from 'mysql';
import express from 'express';

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
//import passwordsFile from '../passwords.json' assert {type: 'json'};


export default function createPassword(length, hasNumbers = true, hasSymbols = true, location) {
    let chars = alpha
    hasNumbers ? (chars += numbers) : ''
    hasSymbols ? (chars += symbols) : ''
    /*if (location === null) {
        passDict.Location += ' No chosen location'
    }
    else passDict.Location = location;*/
    //console.log(passDict.Location);
    return generatePassword(length, chars, location)
}

const generatePassword = async (length, chars, location) => {
    let password = '';
    let passDict = {
        Location: location,
        Password: password
    }
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
    };
    passDict.Password = password;
    
    /*if (location === null) {
        passDict.Location = ' No chosen location'
    }
    else*/ //passDict.Location = location;
    //password += location
    return passDict;
}

export const savePersPass = async (password, location) => {
    let Password = {
        password,
        location
    }
    db.query("INSERT INTO passwords (password, location) VALUES (?,?)", 
    [Password.password, Password.location],
    (err, res) => {
        if (err) {console.log(err);}
        else {console.log(password.Location);};
    });
}

export const saveGenPass = async (length, hasNumbers = true, hasSymbols = true, location) => {
    let password = await createPassword(
        length,
        hasNumbers,
        hasSymbols,
        location
    )
    db.query("INSERT INTO passwords (password, location) VALUES (?,?)", 
    [password.Password, password.Location],
    (err, res) => {
        if (err) {console.log(err);}
        else {console.log(password.Password);};
    });
    // const salt = bcrypt.genSalt();
    //const hashedPassword = bcrypt.hash(password.Password, parseInt(salt));
    //password.Password = hashedPassword;

    /*let passJSON = JSON.stringify(password);


    fs.open(path.join(__dirname, '../', 'passwords.json'), 'a', 666, (e, id) => {
        fs.write(id, passJSON + os.EOL, null, 'utf-8', () => {
            fs.close(id, () => {
                console.log('password saved to passwords.txt');
            });
        });
    });*/
    //return true

}

export const allPasswords = async () => {
    let passwords = []
    db.query("SELECT * FROM passwords", function (err, result) {
        if (err)
            throw err;
        Object.keys(result).forEach(function (key) {
            var row = result[key];
            console.log(row.password);
            //passwords.push(row);
            //return row;
            passwords.push(row);
            //return passwords;
        });
        //return result;
    }); 
    //console.log(passwords);
    return await passwords;
    

    /*fs.readFile('./passwords.json', (err, data) => {
        if (err) throw err;

        passwords = data/*.toString();
        const jpass = toJSON(passwords)
        console.log(jpass);
        console.log(passwords);
        
    });*/
    //console.log(passwords);
    //return passwords;
}
