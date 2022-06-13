import mysql from "mysql";
import gpc from 'generate-pincode';



const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'PasswordManager',
})

export default async function generatePin(length, location) {
    const pin = {
        pin: gpc(length),
        location: location
    }
    console.log(pin);
    return pin;
}

export async function saveGenPin(length, location) {
    const pin = {
        pin: gpc(length),
        location: location
    }
    db.query("INSERT INTO pins (pin, location) VALUES (?,?)", 
    [pin.pin, pin.location],
    (err, res) => {
        if (err) {console.log(err);}
        else {console.log(pin.location);};
    });
    
    return pin;
}

export async function savePersPin(pin, location) {
    const pinObj = {
        pin: pin,
        location: location
    }
    db.query("INSERT INTO pins (pin, location) VALUES (?,?)", 
    [pinObj.pin, pinObj.location],
    (err, res) => {
        if (err) {console.log(err);}
        else {console.log(pinObj.location);};
    });
}

