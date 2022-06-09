import express from 'express';
import passwordController from './controllers/passwordController.js';
import cors from 'cors'

const app = express()
app.use(cors())
app.use("/password", passwordController);

const port = process.env.PORT || 4040;
app.listen(port, () => console.log('listening on port ' + port))