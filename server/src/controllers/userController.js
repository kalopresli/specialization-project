import express from 'express'
import RegisterUser, { LoginUser } from '../services/userManagement.js'
import {validateToken} from '../services/userManagement.js'

const router = express.Router();
router.use(express.json());

router.post('/register', async (req, res) =>{
    const response = await RegisterUser(req.body.username, req.body.password, req.body.confPassword)
    res.send(response);
});

router.post('/login', async (req, res) =>{
    const response = await LoginUser(req.body.username, req.body.password);
    res.send(response);
})

router.get('/', validateToken, async (req, res) => {
    res.send("Hello")
})


export default router;