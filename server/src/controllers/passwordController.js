import express from "express";
import bodyParser from 'body-parser';
import mysql from 'mysql';
import createPassword, { saveGenPass, savePersPass } from "../services/passwordManagement.js";
import { validateToken } from "../services/userManagement.js";
import { decrypt } from '../services/encryptionHandler.js';


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'PasswordManager',
})

const router = express.Router();
router.use(express.json())
var jsonParser = bodyParser.json();

//works
router.post('/create', validateToken, async (req, res) => {
    //let location =  req.body.password;
    const { length, location, username, userid } = req.body
    const newPass = await createPassword(
        length,
        true,
        true,
        location,
        username,
        userid
    )
    //console.log(req.body.length);
    res.send(newPass);
    //res.end();
});

//works
router.post('/savepers', validateToken, async (req, res) => {
    const { password, location, username, userid } = req.body;
    const savePass = await savePersPass(
        password,
        location,
        username,
        userid
    )
    console.log(req.body.userid);
    res.send(savePass)
});

//works
router.post('/save', validateToken, async (req, res) => {
    //let location =  req.body.password;
    const { length, location, username, userid } = req.body;
    const savePass = await saveGenPass(
        length,
        true,
        true,
        location,
        username,
        userid
    )

    console.log(req.body.userid);
    res.send(savePass);
});

//works
router.post('/', validateToken, async (req, res) => {
    db.query("SELECT * FROM passwords WHERE userid=?", [req.body.userid], function (err, result) {
        if (err)
            console.log(err);
        console.log(result[0].iv);
        console.log(decrypt({password: result[0].password, iv: result[0].iv}))
        let allPass = []
        result.map((pass) => {
            allPass.push({
                password: decrypt({ password: pass.password, iv: pass.iv }),
                location: pass.location,
                username: pass.username
            })
        })
        res.send(allPass)
    })
})

export default router;