import mysql from "mysql";
import gpc from 'generate-pincode';



const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'PasswordManager',
})

export default async function generatePin(length, location, userid) {
    const pin = {
        pin: gpc(length),
        location: location,
        userid: userid
    }
    return pin;
}

export async function saveGenPin(length, location, userid) {
    const pin = {
        pin: gpc(length),
        location: location,
        userid: userid
    }
    db.query("INSERT INTO pins (pin, location, userid) VALUES (?,?,?)",
        [pin.pin, pin.location, userid],
        (err, res) => {
            if (err) { console.log(err); }
            else { console.log(pin.location); };
        });
    return pin;
}

export async function savePersPin(pin, location, userid) {
    const pinObj = {
        pin: pin,
        location: location,
        userid: userid
    }
    db.query("INSERT INTO pins (pin, location, userid) VALUES (?,?,?)",
        [pinObj.pin, pinObj.location, userid],
        (err, res) => {
            if (err) { console.log(err); }
            else { console.log(pinObj.location); };
        });
}

