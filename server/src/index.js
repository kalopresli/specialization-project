import express from 'express';
import passwordController from './controllers/passwordController.js';
import pinController from './controllers/pinController.js'
import userController from './controllers/userController.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use("/password", passwordController);
app.use("/pin", pinController);
app.use("/user", userController)

const port = process.env.PORT || 4040;
app.listen(port, () => console.log('listening on port ' + port))