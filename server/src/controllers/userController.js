import express from 'express'
import RegisterUser, { LoginUser } from '../services/userManagement.js'
import { validateToken, getUserFromDB } from '../services/userManagement.js'
import mysql from 'mysql';
import bcrypt from 'bcrypt'

const router = express.Router();
router.use(express.json());
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'PasswordManager',
})


router.post('/register', async (req, res) => {
    const { username, password, confPassword } = req.body;
    const response = await RegisterUser(username, password, confPassword);
    res.send(response);
});

router.post('/login', async (req, res) => {
    //const response = await getUserFromDB(req.body.username, req.body.password);
    //console.log(req.body.password);
    let token;
    const { username, password } = req.body;
    var sql = 'SELECT * FROM passwordmanager.users WHERE username=?';
    db.query(sql, [username], async function (err, result) {
        if (err) { console.log(err); return err }
        else {
            if (result.length > 0) {
                //console.log(res.length);
                //console.log(result[0].id);
                if (!await bcrypt.compare(password, result[0].password)) {
                    res.send("Username or password do not match", 404);
                }
                else res.send(await LoginUser(username, result[0].id));

                //token = await LoginUser(req.body.username);

            }
            else
                res.sendStatus(401)
        }
    })
    //console.log(token);
    //res.send(token);

})

router.get('/', validateToken, async (req, res) => {
    res.send("Hello")
})


export default router;