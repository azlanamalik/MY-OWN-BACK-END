import express from "express"
import userdetails from "../data/data.js"
import jsonwebtoken from "jsonwebtoken"
import userBalance from "../data/user_balance.js"
//"/register route"
const router = express.Router()
router.use(express.json())

router.post("/", (req,res)=>{
    const {username, password} = req.body
    if (!username || !password){
        return res.status(401).json("Error : Must fill in Username or Password")
    }
    if (userdetails.has(username)){
        return res.status(409).json("Error: user exists already")
    }
    userdetails.set(username, password)//add to set
    userBalance.set(username, 0)
    //create the json webtoken
    const jwt = jsonwebtoken.sign({username} , process.env.JWT_KEY , {expiresIn: '1h'})
    
    res.status(201).json({ "message": "User registered", "token" :jwt})
})



export default router
