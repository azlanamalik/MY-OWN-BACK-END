import express from "express"
import registerRoute from "../routes/register.js"
import loginRoute from "../routes/login.js"
import UserFunctions from "../routes/userFunctions.js"
import AuthMiddleware from "../middleware/authMiddleware.js"
//builds the app (middleware + routes) without starting it, so tests can import it
const app = express()

app.use(express.json())

app.use('/register' , registerRoute)//register route
app.use('/login' , loginRoute)

//auth rest should have an JWT TOKEN

app.use('/userFunction', AuthMiddleware ,UserFunctions)


export default app
