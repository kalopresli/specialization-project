import express from "express";
import bodyParser from 'body-parser';
import mysql from 'mysql';
import createPassword, { allPasswords, saveGenPass, savePersPass } from "../services/passwordManagement.js";
import generatePin from "../services/pinManagement.js";

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'PasswordManager',
})

const router = express.Router();
router.use(express.json())
var jsonParser = bodyParser.json();


router.post('/create', async (req, res) => {
    //let location =  req.body.password;
    const { length, location } = req.body
    const newPass = await createPassword(
        length,
        true,
        true,
        location
    )
    //console.log(req.body.length);
    res.send(newPass);
    //res.end();
});

router.post('/savepers', async(req, res) => {
    const {password, location} = req.body;
    const savePass = await savePersPass(
        password,
        location
    )
    res.send(savePass)
})

router.post('/save', async (req, res) => {
    //let location =  req.body.password;
    const { length, location } = req.body;
    const savePass = await saveGenPass(
        length,
        true,
        true,
        location
    )

    console.log(req.body.length);
    res.send(savePass);
    //res.end(); 
});

router.get('/', async (req, res) => {
    db.query("SELECT * FROM passwords", function (err, result) {
        if (err)
            throw err;
        res.send(result)
    })
    //res.send(allPasswords())
    //generatePin(6, 'pc')
})

//module.exports = router;
export default router;