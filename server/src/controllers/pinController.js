import express from "express";
import generatePin from "../services/pinManagement.js";
import { saveGenPin } from "../services/pinManagement.js";
import { savePersPin } from "../services/pinManagement.js";
import mysql from 'mysql';

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'PasswordManager',
})

const router = express.Router();
router.use(express.json());

router.post('/create', async (req, res) => {

    //res.send(allPasswords()) 
    res.send(await generatePin(parseInt(req.body.length), req.body.location, req.body.userid))
})

router.post('/savegen', async (req, res) => {

    //res.send(allPasswords())
    res.send(await saveGenPin(parseInt(req.body.length), req.body.location, req.body.userid))
})

router.post('/savepers', async (req, res) => {

    //res.send(allPasswords())
    res.send(await savePersPin(req.body.pin, req.body.location, req.body.userid))
})

router.post('/', async (req, res) => {
    db.query("SELECT * FROM pins WHERE userid=?", [req.body.userid], function (err, result) {
        if (err)
            console.log(err);
        let allPin = []
        result.map((pass) => {
            allPin.push({
                pin: pass.pin,
                location: pass.location
            })
        })
        res.send(allPin)
    })
})

export default router