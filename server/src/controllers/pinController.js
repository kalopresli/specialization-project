import express from "express";
import generatePin from "../services/pinManagement.js";
import { saveGenPin } from "../services/pinManagement.js";
import { savePersPin } from "../services/pinManagement.js";
const router = express.Router();
router.use(express.json());

router.get('/create', async (req, res) => {
    
    //res.send(allPasswords())
    res.send( await generatePin(req.body.length, req.body.location))
})

router.get('/savegen', async (req, res) => {
    
    //res.send(allPasswords())
    res.send( await saveGenPin(req.body.length, req.body.location))
})

router.get('/savepers', async (req, res) => {
    
    //res.send(allPasswords())
    res.send( await savePersPin(req.body.pin, req.body.location))
})

export default router